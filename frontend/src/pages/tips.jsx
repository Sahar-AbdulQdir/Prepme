import { useState, useEffect, useRef } from "react";
import "../styles/tips.css";

// ─── DATA ────────────────────────────────────────────────────────
const TIPS = [
  {
    icon: "👔",
    title: "Dress to Impress",
    body: "Wear clean, well-fitted professional attire. Opt for neutral colors — navy, grey, or white. Avoid flashy accessories. Your outfit should say 'I'm serious about this role.'",
    tags: ["Attire", "First Impression"],
  },
  {
    icon: "🗣️",
    title: "Speak with Confidence",
    body: "Project your voice, speak at a measured pace, and eliminate filler words like 'um' and 'like.' Pause deliberately instead of filling silence with noise.",
    tags: ["Communication", "Tone"],
  },
  {
    icon: "👁️",
    title: "Body Language",
    body: "Maintain natural eye contact, sit upright without stiffness, and smile genuinely. Lean slightly forward to signal engagement. Avoid crossing your arms.",
    tags: ["Non-verbal", "Confidence"],
  },
  {
    icon: "⭐",
    title: "Use the STAR Method",
    body: "Structure every behavioral answer: Situation, Task, Action, Result. This framework makes your answers clear, concise, and compelling to interviewers.",
    tags: ["Answers", "Framework"],
  },
  {
    icon: "🔬",
    title: "Research the Company",
    body: "Know the company's mission, recent news, products, and competitors. Reference specific details during the interview — it shows initiative and genuine interest.",
    tags: ["Preparation", "Research"],
  },
  {
    icon: "❓",
    title: "Ask Smart Questions",
    body: "Prepare 3–5 thoughtful questions for your interviewer. Ask about team culture, growth paths, or challenges the role will tackle. Never say you have no questions.",
    tags: ["Engagement", "Initiative"],
  },
];

const CHECKLIST = [
  { id: 1, title: "Updated Resume (2 copies)", desc: "Print on quality paper. Bring extras for panel interviews." },
  { id: 2, title: "Cover Letter Tailored to Role", desc: "Customize for this specific position and company." },
  { id: 3, title: "Portfolio or Work Samples", desc: "Bring tangible proof of your accomplishments." },
  { id: 4, title: "List of References", desc: "3 professional references with current contact info." },
  { id: 5, title: "Pen and Notepad", desc: "Take notes — it shows attentiveness and professionalism." },
  { id: 6, title: "ID and Interview Confirmation", desc: "Screenshot or printout of the interview invite." },
  { id: 7, title: "Questions for the Interviewer", desc: "At least 3 pre-written thoughtful questions." },
  { id: 8, title: "Breath Mints / Water Bottle", desc: "Small but essential for confidence and comfort." },
];

const DOCS = [
  { icon: "📄", iconClass: "purple", name: "Resume Template", meta: "Professional · ATS-Friendly" },
  { icon: "✉️", iconClass: "lime",   name: "Cover Letter Guide", meta: "Role-specific · Persuasive" },
  { icon: "🧾", iconClass: "blue",   name: "Reference Sheet", meta: "Formatted · Print-ready" },
  { icon: "📋", iconClass: "purple", name: "STAR Answer Worksheet", meta: "Behavioral prep · Fillable" },
  { icon: "🗂️", iconClass: "lime",   name: "Research Checklist", meta: "Company deep-dive · PDF" },
];

const FEATURES = [
  { icon: "🏭", title: "Industry-Specific Questions", desc: "Choose from 30+ industries. The AI generates 5–10 role-specific questions tailored to your target position." },
  { icon: "🧠", title: "AI Feedback Engine", desc: "Real-time analysis of your answers — structure, clarity, confidence, and relevance — scored instantly after each response." },
  { icon: "💬", title: "Filler Word Tracker", desc: "The AI counts your 'um', 'like', and 'you know' usage and teaches you to pause with intention instead." },
  { icon: "🎯", title: "Personalized Improvement Plan", desc: "After each session, receive a custom roadmap highlighting your weak areas with targeted practice questions." },
  { icon: "🎙️", title: "Voice Confidence Analysis", desc: "Speech-to-text AI evaluates your modulation, assertiveness, and speaking pace to coach better delivery." },
  { icon: "📈", title: "Progress Dashboard", desc: "Track improvement across sessions with visual scores. Watch your confidence score climb week over week." },
];

const VIDEO_TABS = [
  { title: "Before the Interview", desc: "Research, attire, and mental prep" },
  { title: "During the Interview", desc: "Body language, answers, and pacing" },
  { title: "After the Interview", desc: "Follow-up emails and reflection" },
];

const FAQS = [
  {
    q: "Is Interview Coach AI suitable for all industries?",
    a: "Yes! We support 30+ industries including tech, finance, healthcare, marketing, retail, education, and more. The AI customizes questions and feedback based on your selected industry and role level.",
  },
  {
    q: "How many free sessions do I get?",
    a: "New users get 3 full free sessions — enough to practice, receive detailed feedback, and experience a personalized improvement plan. No credit card required to start.",
  },
  {
    q: "What makes this different from reading interview tips online?",
    a: "Generic tips don't adapt to your weaknesses. Our AI actually listens to your answers, analyzes your speech patterns, tracks filler words, and builds a personalized coaching plan — something a static article simply cannot do.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Absolutely. Our platform is fully responsive and works on mobile, tablet, and desktop. Practice during your commute or anywhere you have a few minutes.",
  },
  {
    q: "What does the premium subscription include?",
    a: "Premium unlocks unlimited sessions, advanced multi-dimensional feedback, industry-specific question packs, downloadable session reports, and priority access to new features.",
  },
  {
    q: "How does the AI analyze my answers?",
    a: "Your spoken answers are transcribed in real-time using Speech-to-Text APIs, then processed by our NLP modules for content relevance, STAR structure adherence, and tone analysis — all within seconds of you finishing your response.",
  },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const dur = 1600;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / dur, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── HERO CARD (animated chat) ───────────────────────────────────
function HeroCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [1000, 2500, 4000, 5500].map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    const loop = setInterval(() => setStep(0), 7000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="hero-card-wrap">
      <div className="floating-badge badge-1">
        <span className="badge-icon">✨</span> AI Feedback Ready
      </div>

      <div className="hero-card">
        <div className="card-header">
          <span className="card-title">Live Interview Session</span>
          <span className="card-badge">● Recording</span>
        </div>

        {step >= 1 && (
          <div className="chat-bubble" key={`ai-${step}`}>
            <strong>AI Coach</strong>
            Tell me about a time you handled a conflict at work.
          </div>
        )}
        {step >= 2 && (
          <div className="chat-bubble user-bubble" key="user">
            <strong>You</strong>
            In my previous role, I mediated a disagreement between two teammates by scheduling a structured session where both could share perspectives…
          </div>
        )}
        {step >= 3 && step < 4 && (
          <div className="typing-indicator">
            <span /><span /><span />
          </div>
        )}
        {step >= 4 && (
          <div className="chat-bubble" key="feedback">
            <strong>AI Coach</strong>
            Great use of the STAR method! Consider adding the specific outcome — how did it affect team performance?
          </div>
        )}

        <div className="score-row">
          <div className="score-chip">
            <div className="val">92</div>
            <div className="lbl">Clarity</div>
          </div>
          <div className="score-chip">
            <div className="val">87</div>
            <div className="lbl">Confidence</div>
          </div>
          <div className="score-chip">
            <div className="val">3</div>
            <div className="lbl">Fillers</div>
          </div>
        </div>
      </div>

      <div className="floating-badge badge-2">
        <span className="badge-icon">🎯</span> STAR Score: 94%
      </div>
    </div>
  );
}

// ─── CHECKLIST ───────────────────────────────────────────────────
function Checklist() {
  const [checked, setChecked] = useState(new Set());

  const toggle = (id) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const pct = Math.round((checked.size / CHECKLIST.length) * 100);

  return (
    <div>
      <div className="checklist-grid">
        {CHECKLIST.map(item => (
          <div
            key={item.id}
            className={`check-item${checked.has(item.id) ? " checked" : ""}`}
            onClick={() => toggle(item.id)}
          >
            <div className="check-box">{checked.has(item.id) && "✓"}</div>
            <div className="check-content">
              <div className="check-title">{item.title}</div>
              <div className="check-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="checklist-progress">
        <div className="progress-header">
          <span className="progress-title">Interview Readiness</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
          <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
            <span className="faq-q">{item.q}</span>
            <span className="faq-chevron">▾</span>
          </button>
          <div className="faq-body">
            <p className="faq-a">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MODAL ───────────────────────────────────────────────────────
function Modal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Start Practicing Free</div>
        <div className="modal-sub">3 free sessions, no credit card needed. Join 12,000+ job seekers.</div>
        <input className="modal-input" type="text"    placeholder="Your full name" />
        <input className="modal-input" type="email"   placeholder="Email address" />
        <select className="modal-input" style={{ cursor: 'pointer' }}>
          <option value="">Select your target industry</option>
          <option>Software Development</option>
          <option>Marketing & Growth</option>
          <option>Finance & Accounting</option>
          <option>Healthcare</option>
          <option>Retail & Customer Service</option>
          <option>Engineering</option>
          <option>Education</option>
        </select>
        <button className="modal-btn">Get Started Free →</button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function InterviewCoach() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTip, setActiveTip] = useState(null);
  const [modal, setModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="noise-overlay" />

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none" }}>
        <div className="nav-logo">
          <span>⚡</span> Interview<span>Coach</span>AI
        </div>
        <ul className="nav-links">
          <li><a href="#tips">Tips</a></li>
          <li><a href="#checklist">Checklist</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <button className="nav-cta" onClick={() => setModal(true)}>Start Free</button>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="hero">
        <div className="orb-1 hero-bg-orb" />
        <div className="orb-2 hero-bg-orb" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              AI-Powered Interview Coaching
            </div>
            <h1 className="hero-headline">
              Ace Every Interview
              <br />
              <span className="accent">Before</span> You Walk<br />
              <span className="accent-v">Through the Door</span>
            </h1>
            <p className="hero-sub">
              Practice with an AI coach that gives real-time feedback on your answers, body language cues, filler words, and confidence. Built for job seekers who want results — not generic tips.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setModal(true)}>
                Practice Free Now →
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
                See How It Works
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num"><AnimatedNumber target={12} suffix="K+" /></div>
                <div className="stat-label">Users Coached</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><AnimatedNumber target={94} suffix="%" /></div>
                <div className="stat-label">Felt More Confident</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><AnimatedNumber target={30} suffix="+" /></div>
                <div className="stat-label">Industries Supported</div>
              </div>
            </div>
          </div>
          <HeroCard />
        </div>
      </section>

      {/* ── TIPS SECTION ───────────────────────────────── */}
      <section className="tips-section" id="tips">
        <div className="container">
          <div className="tips-header">
            <div className="section-label">Interview Tips</div>
            <h2 className="section-title">Everything You Need to Walk In Ready</h2>
            <p className="section-sub">
              From what to wear to how to answer behavioral questions — master every dimension of your interview performance.
            </p>
          </div>
          <div className="tips-grid">
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className={`tip-card${activeTip === i ? " active" : ""}`}
                onClick={() => setActiveTip(activeTip === i ? null : i)}
              >
                <div className="tip-icon">{tip.icon}</div>
                <div>
                  <div className="tip-title">{tip.title}</div>
                  <div className="tip-body">{tip.body}</div>
                </div>
                <div className="tip-tags">
                  {tip.tags.map(tag => <span key={tag} className="tip-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ──────────────────────────────── */}
      <section className="video-section">
        <div className="video-section-inner container">
          <div>
            <div className="video-player">
              {/* Gradient placeholder mimicking a video thumbnail */}
              <div style={{
                width: '100%', height: '100%', minHeight: 260,
                background: 'linear-gradient(135deg, #0f1e35 0%, #1a2f50 50%, #0a1628 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(45deg, rgba(124,106,247,0.04) 0px, rgba(124,106,247,0.04) 1px, transparent 1px, transparent 40px)',
                }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Interview Masterclass</div>
                </div>
              </div>
              <div className="video-overlay">
                <div className="play-btn">▶</div>
              </div>
              <div className="video-label">{VIDEO_TABS[activeTab].title}</div>
            </div>
          </div>

          <div>
            <div className="section-label">Video Guides</div>
            <h2 className="section-title">Watch. Learn. Apply.</h2>
            <p className="section-sub" style={{ marginBottom: '2rem' }}>
              Our step-by-step video guides walk you through the entire interview journey — from your pre-interview checklist to the perfect follow-up email.
            </p>
            <div className="video-tabs">
              {VIDEO_TABS.map((tab, i) => (
                <div
                  key={i}
                  className={`video-tab${activeTab === i ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  <div className="tab-num">0{i + 1}</div>
                  <div className="tab-info">
                    <div className="tab-title">{tab.title}</div>
                    <div className="tab-desc">{tab.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHECKLIST SECTION ──────────────────────────── */}
      <section className="checklist-section" id="checklist">
        <div className="checklist-inner container">
          <div>
            <div className="checklist-header">
              <div className="section-label">Interview Day Checklist</div>
              <h2 className="section-title">Never Forget a Thing</h2>
              <p className="section-sub">
                Tick off every item before you head out. A prepared candidate radiates confidence from the moment they walk in.
              </p>
            </div>
            <Checklist />
          </div>

          <div className="papers-panel">
            <div className="panel-title">📁 Documents to Bring</div>
            {DOCS.map((doc, i) => (
              <div key={i} className="doc-card">
                <div className={`doc-icon ${doc.iconClass}`}>{doc.icon}</div>
                <div>
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-meta">{doc.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ───────────────────────────── */}
      <section className="features-section" id="features">
        <div className="features-inner container">
          <div className="features-header">
            <div>
              <div className="section-label">Platform Features</div>
              <h2 className="section-title">Your AI Interview Coach Does More Than You Think</h2>
            </div>
            <p className="section-sub">
              Every feature is designed around one goal: turning nervous job seekers into confident, well-prepared candidates.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────── */}
      <section className="faq-section" id="faq">
        <div className="faq-inner container">
          <div className="faq-header">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Got Questions?</h2>
            <p className="section-sub">Everything you need to know before your first session.</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-card container">
          <h2 className="cta-title">
            Your Dream Job Is<br />
            <span style={{ color: 'var(--lime)' }}>One Practice Away</span>
          </h2>
          <p className="cta-sub">
            Join 12,000+ job seekers who stopped winging it and started winning interviews.
          </p>
          <div className="cta-actions">
            <button className="btn-primary" onClick={() => setModal(true)}>Start Free — 3 Sessions</button>
            <button className="btn-secondary">View Pricing</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer>
        <div className="footer">
          <div className="footer-logo">
            ⚡ Interview<span>Coach</span>AI
          </div>
          <div className="footer-copy">© 2025 InterviewCoachAI. Empowering careers.</div>
          <div className="sdg-badges">
            <span className="sdg-badge">SDG 4</span>
            <span className="sdg-badge">SDG 8</span>
          </div>
        </div>
      </footer>

      {/* ── MODAL ──────────────────────────────────────── */}
      {modal && <Modal onClose={() => setModal(false)} />}
    </div>
  );
}