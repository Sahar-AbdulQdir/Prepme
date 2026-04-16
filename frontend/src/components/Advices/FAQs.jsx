import { useState } from "react";
import {
  FiUser,
  FiList,
  FiMic,
  FiBriefcase,
  FiClock,
  FiAlertCircle,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";

const tips = [
  // ... your tips data remains exactly the same
  {
    id: 1,
    icon: FiUser,
    iconBg: "#7cb518",
    title: "Body Language",
    content: [
      {
        heading: "Maintain Eye Contact",
        text: "Keep steady, natural eye contact with your interviewer — aim for about 70% of the time. This signals confidence and genuine engagement without feeling like a stare-down.",
      },
      {
        heading: "Sit Up Straight",
        text: "Lean slightly forward in your chair to show attentiveness. Avoid slouching or crossing your arms, which can read as disinterest or defensiveness.",
      },
      {
        heading: "Use Open Gestures",
        text: "Keep your hands visible and use natural hand gestures to emphasize points. A firm handshake at the start and end of the interview leaves a lasting first and final impression.",
      },
      {
        heading: "Mirror Positively",
        text: "Subtly matching the interviewer's energy and posture builds rapport. Smile genuinely when appropriate — warmth is a competitive advantage.",
      },
    ],
  },
  {
    id: 2,
    icon: FiList,
    iconBg: "#1a1a2e",
    title: "Answer Structure (STAR Method)",
    content: [
      {
        heading: "Situation",
        text: "Set the scene concisely. Describe the context or challenge you faced — keep it brief, just enough for the interviewer to understand the stakes.",
      },
      {
        heading: "Task",
        text: "Explain your specific responsibility. What were you accountable for in that situation? Clarify your role so your contribution stands apart from the team's.",
      },
      {
        heading: "Action",
        text: "This is the heart of your answer. Detail the exact steps YOU took, the decisions you made, and why. Use 'I' not 'we' to own your contribution clearly.",
      },
      {
        heading: "Result",
        text: "Quantify the outcome whenever possible. 'Reduced onboarding time by 30%' is far more compelling than 'improved the process.' End on impact.",
      },
    ],
  },
  {
    id: 3,
    icon: FiMic,
    iconBg: "#7cb518",
    title: "Confidence & Tone",
    content: [
      {
        heading: "Speak at a Measured Pace",
        text: "Nervousness speeds up speech. Consciously slow down, pause before answering complex questions, and let silence work for you — it signals thoughtfulness.",
      },
      {
        heading: "Eliminate Filler Words",
        text: "Replace 'um', 'like', and 'you know' with a brief pause or a breath. Record yourself practicing to catch these habits before the real interview.",
      },
      {
        heading: "Project Your Voice",
        text: "Speak clearly and with enough volume to be heard comfortably. A voice that trails off at the end of sentences undermines even the best content.",
      },
      {
        heading: "Reframe Nervousness as Excitement",
        text: "Physiologically, anxiety and excitement feel similar. Telling yourself 'I'm excited' rather than 'I'm nervous' has been shown to improve performance under pressure.",
      },
    ],
  },
  {
    id: 4,
    icon: FiBriefcase,
    iconBg: "#1a1a2e",
    title: "Professional Attire",
    content: [
      {
        heading: "Research the Company Culture",
        text: "Dress one level above the company's everyday standard. A startup may be casual, but an investment firm expects formal. When in doubt, err toward business professional.",
      },
      {
        heading: "Fit Matters Most",
        text: "Clothes that fit properly always look more polished than expensive clothes that don't. Ensure your outfit is clean, pressed, and free of loose threads or missing buttons.",
      },
      {
        heading: "Keep Accessories Minimal",
        text: "Subtle accessories complement rather than distract. Avoid anything that makes noise, is overly flashy, or draws attention away from what you're saying.",
      },
      {
        heading: "Comfort Builds Confidence",
        text: "Wear something you feel genuinely good in — discomfort shows. Test your interview outfit beforehand, including sitting down and moving around naturally.",
      },
    ],
  },
  {
    id: 5,
    icon: FiClock,
    iconBg: "#7cb518",
    title: "Before the Interview",
    content: [
      {
        heading: "Research Thoroughly",
        text: "Go beyond the company website. Read recent news, understand their products, know their competitors, and be ready to discuss how your background fits their current priorities.",
      },
      {
        heading: "Prepare Your Stories",
        text: "Identify 5–7 strong examples from your experience that cover achievement, challenge, leadership, failure, and teamwork. Adapt them to different questions on the fly.",
      },
      {
        heading: "Prepare Thoughtful Questions",
        text: "Arrive with 3–5 genuine questions about the role, team, or company direction. Asking nothing signals a lack of interest; asking great questions signals serious intent.",
      },
      {
        heading: "Logistics First",
        text: "Confirm the location (or video link), plan your route, and arrive 10–15 minutes early. Have copies of your resume, a notebook, and a pen. Remove unknowns so you can focus entirely on the conversation.",
      },
    ],
  },
  {
    id: 6,
    icon: FiAlertCircle,
    iconBg: "#1a1a2e",
    title: "Common Mistakes to Avoid",
    content: [
      {
        heading: "Badmouthing Past Employers",
        text: "Even if justified, criticizing previous employers raises red flags. Interviewers wonder if you'll speak about them the same way. Reframe negatives into neutral, growth-focused language.",
      },
      {
        heading: "Failing to Listen",
        text: "Interviews are conversations, not monologues. If you're not actively listening to the question asked, you'll give impressive answers to the wrong questions.",
      },
      {
        heading: "Vague or Rambling Answers",
        text: "Aim for 1–2 minutes per answer unless asked to elaborate. Unfocused answers suggest unclear thinking. Structure every response — even off-the-cuff ones.",
      },
      {
        heading: "Not Following Up",
        text: "Send a brief, personalized thank-you note within 24 hours. Reference something specific from the conversation. It's a simple step that most candidates skip.",
      },
    ],
  },
];

export default function InterviewTips() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <FiCheckCircle size={13} />
            <span>Expert Guidance</span>
          </div>
          <h1 style={styles.title}>Interview Tips &amp; Strategies</h1>
          <p style={styles.subtitle}>
            Expert advice to help you ace your next interview. Master these
            fundamentals to stand out from other candidates.
          </p>
        </div>

        {/* Accordion */}
        <div style={styles.accordion}>
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            const isOpen = openId === tip.id;

            return (
              <div
                key={tip.id}
                style={{
                  ...styles.card,
                  ...(isOpen ? styles.cardOpen : {}),
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => toggle(tip.id)}
                  style={styles.cardHeader}
                  aria-expanded={isOpen}
                >
                  <div style={styles.left}>
                    <span
                      style={{
                        ...styles.iconWrap,
                        background: tip.iconBg,
                      }}
                    >
                      <Icon size={18} color="#fff" />
                    </span>
                    <span style={styles.cardTitle}>{tip.title}</span>
                  </div>

                  <span
                    style={{
                      ...styles.chevron,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <FiChevronDown size={20} color={isOpen ? "#7cb518" : "#9ca3b0"} />
                  </span>
                </button>

                {/* Body */}
                <div
                  style={{
                    ...styles.body,
                    maxHeight: isOpen ? "800px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "24px" : "0px",
                  }}
                >
                  <div style={styles.divider} />
                  <div style={styles.grid}>
                    {tip.content.map((item, i) => (
                      <div key={i} style={styles.tipItem}>
                        <div style={styles.tipDot} />
                        <div>
                          <p style={styles.tipHeading}>{item.heading}</p>
                          <p style={styles.tipText}>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&family=DM+Serif+Display&display=swap');
        
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }

        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(18px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        button:focus-visible {
          outline: 2px solid #7cb518;
          outline-offset: 2px;
          border-radius: 14px;
        }

        @media (max-width: 640px) {
          button {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0c1b33",
    fontFamily: "'Istok Web', sans-serif",
    position: "relative",
    padding: "clamp(32px, 8vw, 48px) clamp(16px, 5vw, 20px) clamp(48px, 10vw, 64px)",
    overflow: "hidden",
  },
  container: {
    maxWidth: "780px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  header: {
    marginBottom: "clamp(32px, 6vw, 40px)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgb(255, 255, 255)",
    border: "1px solid rgba(124,181,24,0.3)",
    color: "#a4d43a",
    fontSize: "clamp(10px, 3vw, 11px)",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "clamp(3px, 1.5vw, 4px) clamp(10px, 3vw, 12px)",
    borderRadius: "100px",
    marginBottom: "clamp(12px, 3vw, 16px)",
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(24px, 6vw, 42px)",
    color: "#ffffff",
    lineHeight: 1.15,
    marginBottom: "clamp(8px, 2vw, 12px)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: "clamp(13px, 3.5vw, 15px)",
    lineHeight: 1.7,
    maxWidth: "560px",
    fontWeight: 300,
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 2.5vw, 12px)",
  },
  card: {
    background: "rgb(255, 255, 255)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "clamp(12px, 3vw, 16px)",
    overflow: "hidden",
    transition: "border-color 0.25s ease, background 0.25s ease",
    animation: "fadeUp 0.45s ease both",
  },
  cardOpen: {
    background: "rgb(255, 255, 255)",
    border: "1px solid rgba(124,181,24,0.22)",
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "clamp(14px, 3.5vw, 18px) clamp(16px, 4vw, 22px)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    WebkitTapHighlightColor: "transparent",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 3vw, 14px)",
    flex: 1,
  },
  iconWrap: {
    width: "clamp(32px, 8vw, 38px)",
    height: "clamp(32px, 8vw, 38px)",
    borderRadius: "clamp(8px, 2vw, 10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    color: "#000000",
    fontSize: "clamp(14px, 3.5vw, 16px)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  chevron: {
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  body: {
    overflow: "hidden",
    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, padding-bottom 0.3s ease",
    paddingLeft: "clamp(16px, 4vw, 22px)",
    paddingRight: "clamp(16px, 4vw, 22px)",
    paddingTop: "0px",
  },
  divider: {
    height: "1px",
    background: "rgba(0,0,0,0.07)",
    marginBottom: "clamp(18px, 4vw, 22px)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
    gap: "clamp(12px, 3vw, 16px)",
  },
  tipItem: {
    display: "flex",
    gap: "clamp(8px, 2.5vw, 12px)",
    alignItems: "flex-start",
  },
  tipDot: {
    width: "clamp(6px, 1.5vw, 7px)",
    height: "clamp(6px, 1.5vw, 7px)",
    borderRadius: "50%",
    background: "#7cb518",
    flexShrink: 0,
    marginTop: "clamp(5px, 1.5vw, 6px)",
  },
  tipHeading: {
    color: "#000000",
    fontSize: "clamp(12px, 3vw, 13px)",
    fontWeight: 600,
    marginBottom: "clamp(3px, 1vw, 4px)",
    letterSpacing: "0.01em",
    lineHeight: 1.4,
  },
  tipText: {
    color: "#6e8090",
    fontSize: "clamp(12px, 3vw, 13px)",
    lineHeight: 1.65,
    fontWeight: 300,
  },
};