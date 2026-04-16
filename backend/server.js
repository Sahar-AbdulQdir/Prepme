const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ──────────────────────────────────────────────
// MongoDB Connection (FIXED)
// ──────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ──────────────────────────────────────────────
// OpenAI Clients
// ──────────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const openaiResume = new OpenAI({ apiKey: process.env.OPENAI_API_KEY_RESUME });

// ──────────────────────────────────────────────
// Mongoose Schemas
// ──────────────────────────────────────────────

// --- User Schema ---
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.model("User", userSchema);

// --- Message Sub-Schema ---
const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["system", "user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

// --- Evaluation Sub-Schema ---
const evaluationSchema = new mongoose.Schema(
  {
    overallScore: Number,
    summary: String,
    strengths: [String],
    improvements: [String],
    suggestions: [String],
    questionScores: [
      {
        question: String,
        score: Number,
        note: String,
        _id: false,
      },
    ],
  },
  { _id: false }
);

// --- Session Schema ---
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, default: "Untitled Session" },
    field: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intern", "advanced"],
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["behavioral", "technical", "hr", "case study"],
      required: true,
    },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    messages: [messageSchema],
    evaluation: { type: evaluationSchema, default: null },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

// --- Resume Schema (with userId and timestamps) ---
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    personal: {
      firstName:   { type: String, trim: true },
      lastName:    { type: String, trim: true },
      jobTitle:    { type: String, trim: true },
      jobApplying: { type: String, trim: true },
      summary:     String,
      photo:       String,
    },
    contact: {
      email:    String,
      phone:    String,
      city:     String,
      country:  String,
      linkedin: String,
      website:  String,
    },
    objective: { text: String },
    experience: [{
      role:        String,
      company:     String,
      startDate:   String,
      endDate:     String,
      location:    String,
      description: String,
    }],
    education: [{
      degree:      String,
      institution: String,
      field:       String,
      startYear:   String,
      endYear:     String,
      gpa:         String,
    }],
    skills: {
      technical: [String],
      soft:      [String],
    },
    projects: [{
      name:        String,
      tech:        String,
      link:        String,
      description: String,
    }],
    languages: [{
      name:  String,
      level: String,
    }],
    certifications: [{
      name:   String,
      issuer: String,
      date:   String,
    }],
    interests: [String],
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const Resume = mongoose.model("Resume", resumeSchema);

// ──────────────────────────────────────────────
// JWT Helpers & Auth Middleware
// ──────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

function signToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided. Please log in." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

// ──────────────────────────────────────────────
// Prompt Builder (unchanged)
// ──────────────────────────────────────────────
function buildSystemPrompt({ field, level, interviewType }) {
  const levelMap = {
    beginner: "someone with little to no professional experience, possibly a student or career changer",
    intern: "an intern or junior-level candidate with 0–2 years of experience",
    advanced: "an experienced professional with 3+ years of relevant experience",
  };

  const typeMap = {
    behavioral: "behavioral interview focusing on past experiences, soft skills, and situational judgment (STAR method encouraged)",
    technical: "technical interview covering domain-specific knowledge, problem-solving, and practical skills",
    hr: "HR screening interview covering motivation, culture fit, salary expectations, and career goals",
    "case study": "case study interview requiring structured problem analysis, business acumen, and logical frameworks",
  };

  return `You are a senior ${field} hiring manager conducting a realistic ${
    typeMap[interviewType] || interviewType
  } for ${levelMap[level] || level}.

ROLE RULES:
- You are the INTERVIEWER only. Never play the candidate.
- Ask ONE question at a time. Wait for the user's answer before proceeding.
- After the user answers, provide brief inline feedback (2–3 sentences) on their response, then ask a natural follow-up or the next question.
- Tailor questions to the ${field} field and ${level} experience level.
- Keep a professional but conversational tone.
- After 5–7 questions, offer to wrap up the interview and provide a comprehensive evaluation.

EVALUATION FORMAT (only when wrapping up):
Return a JSON block wrapped in <evaluation>...</evaluation> tags with:
{
  "overallScore": <number 1–10>,
  "summary": "<2–3 sentence summary>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>"],
  "suggestions": ["<actionable tip 1>", "<actionable tip 2>"],
  "questionScores": [{ "question": "<question>", "score": <1–10>, "note": "<note>" }]
}

Start the interview now with a warm greeting and your first question.`;
}

function sanitizeSession(session) {
  const publicMessages = session.messages.filter((m) => m.role !== "system");
  return {
    id: session._id,
    title: session.title,
    field: session.field,
    level: session.level,
    interviewType: session.interviewType,
    status: session.status,
    evaluation: session.evaluation || null,
    messageCount: publicMessages.length,
    messages: publicMessages,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}

// ══════════════════════════════════════════════
// AUTH ROUTES
// ══════════════════════════════════════════════

app.post("/auth/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
    });
    const token = signToken(user._id);
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("REGISTER ERROR FULL:", err);
    return res.status(500).json({
      error: "Registration failed",
      details: err.message,
    });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required." });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = signToken(user._id);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
});

app.get("/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found." });
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user." });
  }
});

// ══════════════════════════════════════════════
// SESSION ROUTES (protected)
// ══════════════════════════════════════════════

app.post("/sessions", requireAuth, async (req, res) => {
  try {
    const { field, level, interviewType } = req.body;
    if (!field || !level || !interviewType) {
      return res.status(400).json({ error: "field, level, and interviewType are required." });
    }
    const systemPrompt = buildSystemPrompt({ field, level, interviewType });
    const count = await Session.countDocuments({ userId: req.userId });
    const title = `${field} – ${interviewType} #${count + 1}`;
    const messages = [{ role: "system", content: systemPrompt }];

    let aiMessage;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.8,
        max_tokens: 500,
      });
      aiMessage = completion.choices[0].message;
    } catch (err) {
      console.error("❌ OpenAI error FULL:", err);
      return res.status(500).json({ error: err.message || "Failed to start interview with AI." });
    }

    messages.push({ role: aiMessage.role, content: aiMessage.content });

    let session;
    try {
      session = await Session.create({
        userId: req.userId,
        title,
        field,
        level,
        interviewType,
        messages,
      });
    } catch (err) {
      console.error("❌ Session create error FULL:", err);
      return res.status(500).json({ error: err.message || "Failed to save session." });
    }

    return res.status(201).json({
      sessionId: session._id,
      session: sanitizeSession(session),
      aiMessage: aiMessage.content,
    });
  } catch (err) {
    console.error("❌ FULL /sessions ERROR:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

app.post("/api/interview", requireAuth, async (req, res) => {
  const { sessionId, userMessage } = req.body;
  if (!sessionId || !userMessage) {
    return res.status(400).json({ error: "sessionId and userMessage are required." });
  }

  const session = await Session.findOne({ _id: sessionId, userId: req.userId });
  if (!session) {
    return res.status(404).json({ error: "Session not found or does not belong to you." });
  }
  if (session.status === "completed") {
    return res.status(400).json({ error: "This session has already been completed." });
  }

  session.messages.push({ role: "user", content: userMessage });

  let aiMessage;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: session.messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.75,
      max_tokens: 700,
    });
    aiMessage = completion.choices[0].message;
  } catch (err) {
    console.error("OpenAI error:", err);
    session.messages.pop();
    return res.status(500).json({ error: "AI request failed." });
  }

  session.messages.push({ role: aiMessage.role, content: aiMessage.content });

  let evaluation = null;
  const evalMatch = aiMessage.content.match(/<evaluation>([\s\S]*?)<\/evaluation>/);
  if (evalMatch) {
    try {
      evaluation = JSON.parse(evalMatch[1]);
      session.status = "completed";
      session.evaluation = evaluation;
    } catch (e) {
      console.warn("Could not parse evaluation JSON:", e);
    }
  }

  try {
    await session.save();
  } catch (err) {
    console.error("Session save error:", err);
    return res.status(500).json({ error: "Failed to persist session." });
  }

  return res.json({
    aiMessage: aiMessage.content,
    evaluation,
    session: sanitizeSession(session),
  });
});

app.get("/sessions", requireAuth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select("-messages");
    return res.json(
      sessions.map((s) => ({
        id: s._id,
        title: s.title,
        field: s.field,
        level: s.level,
        interviewType: s.interviewType,
        status: s.status,
        evaluation: s.evaluation || null,
        messageCount: s.messages?.length || 0,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch sessions." });
  }
});

app.get("/sessions/:id", requireAuth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.userId });
    if (!session) return res.status(404).json({ error: "Session not found or does not belong to you." });
    return res.json(sanitizeSession(session));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch session." });
  }
});

app.patch("/sessions/:id", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const session = await Session.findOne({ _id: req.params.id, userId: req.userId });
    if (!session) {
      return res.status(404).json({ error: "Session not found or does not belong to you." });
    }
    if (status) session.status = status;
    await session.save();
    return res.json({ success: true, session: sanitizeSession(session) });
  } catch (err) {
    console.error("PATCH session error:", err);
    return res.status(500).json({ error: "Failed to update session." });
  }
});

app.delete("/sessions/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Session.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: "Session not found or does not belong to you." });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete session." });
  }
});

// ══════════════════════════════════════════════
// RESUME ROUTES (protected, linked to user)
// ══════════════════════════════════════════════

// POST /api/resumes — save a new resume
app.post("/api/resumes", requireAuth, async (req, res) => {
  try {
    const resumeData = { ...req.body, userId: req.userId };
    const resume = new Resume(resumeData);
    await resume.save();
    res.status(201).json({ success: true, id: resume._id, message: "Resume saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to save resume." });
  }
});

// GET /api/resumes — list all resumes for the logged-in user
app.get("/api/resumes", requireAuth, async (req, res) => {
  try {
    const resumes = await Resume.find(
      { userId: req.userId },
      "personal.firstName personal.lastName personal.jobApplying createdAt updatedAt"
    ).sort({ updatedAt: -1 });
    res.json({ success: true, resumes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch resumes." });
  }
});

// GET /api/resumes/:id — get a single resume (only if owned by user)
app.get("/api/resumes/:id", requireAuth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });
    if (!resume) return res.status(404).json({ success: false, error: "Resume not found." });
    res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch resume." });
  }
});

// PUT /api/resumes/:id — update a resume (only if owned by user)
app.put("/api/resumes/:id", requireAuth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!resume) return res.status(404).json({ success: false, error: "Resume not found." });
    res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update resume." });
  }
});

// DELETE /api/resumes/:id — delete a resume (only if owned by user)
app.delete("/api/resumes/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ success: false, error: "Resume not found." });
    res.json({ success: true, message: "Resume deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to delete resume." });
  }
});

// ══════════════════════════════════════════════
// AI RESUME ENHANCEMENT ROUTES (protected)
// ══════════════════════════════════════════════

// POST /api/enhance — AI-enhance a text section
app.post("/api/enhance", requireAuth, async (req, res) => {
  const { section, content, jobTitle } = req.body;
  if (!content || content.trim().length < 10) {
    return res.status(400).json({ success: false, error: "Content too short to enhance." });
  }

  const prompts = {
    objective: `You are a professional resume writer. Enhance this professional summary/objective for someone applying for "${jobTitle || "a professional role"}". 
Make it: concise (3-4 sentences), impactful, ATS-friendly, and action-verb driven. 
Keep the core message but elevate the language significantly.

Original: "${content}"

Return ONLY the enhanced text, no preamble.`,
    experience: `You are a professional resume writer. Rewrite this job description to be more impactful for a resume. 
Use strong action verbs, quantify achievements where possible (add realistic estimates if none exist), and follow the STAR format.
Make it ATS-optimized.

Original: "${content}"

Return ONLY the enhanced bullet points, starting each with a •`,
    project: `Enhance this project description for a resume. Make it technical, results-focused, and impressive.

Original: "${content}"

Return ONLY the enhanced description.`,
  };

  const prompt = prompts[section] || prompts.objective;

  try {
    const completion = await openaiResume.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });
    const enhanced = completion.choices[0].message.content.trim();
    res.json({ success: true, enhanced });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ success: false, error: "AI enhancement failed." });
  }
});

// POST /api/generate — generate a full resume using AI
app.post("/api/generate", requireAuth, async (req, res) => {
  const { data } = req.body;
  const { personal, contact, objective, experience, education, skills } = data;

  const prompt = `You are an expert resume writer. Based on the following user data, generate a professional, ATS-optimized resume summary and suggest improvements.

User Info:
- Name: ${personal.firstName} ${personal.lastName}
- Applying For: ${personal.jobApplying || personal.jobTitle}
- Location: ${contact.city}, ${contact.country}
- Current Summary: ${objective.text || "None provided"}
- Experience: ${experience.map(e => `${e.role} at ${e.company}`).join(", ") || "None"}
- Education: ${education.map(e => `${e.degree} in ${e.field} from ${e.institution}`).join(", ") || "None"}
- Skills: ${skills.technical.join(", ") || "None"}

Generate:
1. An enhanced professional summary (3-4 sentences)
2. Three specific tips to improve this resume

Return as JSON: { "summary": "...", "tips": ["tip1", "tip2", "tip3"] }`;

  try {
    const completion = await openaiResume.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    let result;
    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      return res.status(500).json({ success: false, error: "AI response was not valid JSON." });
    }

    res.json({ success: true, ...result });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ success: false, error: "Generation failed." });
  }
});

// POST /api/suggest-skills — AI suggest skills based on job title
app.post("/api/suggest-skills", requireAuth, async (req, res) => {
  const { jobTitle, existingSkills = [] } = req.body;
  if (!jobTitle) {
    return res.status(400).json({ success: false, error: "Job title required." });
  }

  const prompt = `List the top 12 most in-demand technical skills for a "${jobTitle}" role in 2024.
Exclude these already listed: ${existingSkills.join(", ") || "none"}.
Return JSON: { "skills": ["skill1", "skill2", ...] }`;

  try {
    const completion = await openaiResume.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });
    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, skills: result.skills });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ success: false, error: "Skill suggestion failed." });
  }
});

// Backend: /api/enhance-all
app.post("/api/enhance-all", requireAuth, async (req, res) => {
  const { texts, jobTitle } = req.body;
  if (!texts || !Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ message: "No texts provided" });
  }

  // Build a prompt that lists each text with an index
  let prompt = `You are an expert resume editor. Enhance the following text snippets for a ${jobTitle ? jobTitle + " " : ""}resume.
Improve grammar, clarity, impact, and professionalism. Use strong action verbs and keep the original meaning.
Return ONLY a JSON object where keys are the original strings (exactly as given) and values are the enhanced versions.

`;
  texts.forEach((item, idx) => {
    prompt += `\n[${idx}] Original: "${item.content}"\n`;
  });
  prompt += `\nRespond with valid JSON only, no extra text. Example: {"original text": "enhanced text", ...}`;

  try {
    const completion = await openaiResume.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const enhancedMap = JSON.parse(completion.choices[0].message.content);
    
    // Map back to the original paths
    const enhanced = texts.map(item => ({
      path: item.path,
      enhancedText: enhancedMap[item.content] || item.content // fallback to original
    }));

    res.json({ enhanced });
  } catch (err) {
    console.error("OpenAI batch enhance error:", err);
    res.status(500).json({ message: "AI enhancement failed" });
  }
});

function enhanceText(text, jobTitle) {
  if (!text) return "";

  let t = text.trim();

  if (!t.endsWith(".") && !t.endsWith("!") && !t.endsWith("?")) {
    t += ".";
  }

  t = t.charAt(0).toUpperCase() + t.slice(1);
  t = t.replace(/\bi\b/g, "I");

  // optional: make it more job-aware
  if (jobTitle && !t.toLowerCase().includes(jobTitle.toLowerCase())) {
    // no forced injection, just future hook
  }

  return t;
}


// ──────────────────────────────────────────────
// Health Check
// ──────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 PrepMe API running on http://localhost:${PORT}`)
);