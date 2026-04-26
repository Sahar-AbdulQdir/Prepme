import { useState, useRef, useEffect } from "react";
import { FaUser, FaStar, FaMicrophone, FaUserTie, FaClipboardCheck, FaExclamationTriangle } from "react-icons/fa";

<link href="https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap" rel="stylesheet"></link>

const GREEN = "#AA7BD9";
const DARK_BG = "#0a1527";
const CARD_BG = "#ffffff";
const CARD_BORDER = "rgba(255,255,255,0.08)";
const TEXT_MAIN = "#000000";
const TEXT_MUTED = "#000000";

const items = [
  {
    num: "01",
    title: "Body Language",
    desc: "Non-verbal cues account for a majority of first impressions. How you carry yourself speaks before you say a word.",
    detail: "Maintain eye contact without staring, sit up straight with open posture, offer a firm handshake, and nod actively to show engagement.",
    tips: ["Mirror the interviewer's energy subtly", "Keep your hands visible and relaxed", "Lean slightly forward to show interest"],
    side: "right",
    icon: <FaUser size={160} />,
  },
  {
    num: "02",
    title: "STAR Method",
    desc: "A proven framework for answering behavioural questions with clarity, structure, and measurable impact.",
    detail: "Situation, Task, Action, Result. Frame every answer as a real story and quantify your results whenever possible.",
    tips: ["Prepare 6–8 STAR stories beforehand", "Keep each story under 2 minutes", "Always end with a measurable outcome"],
    side: "left",
    icon: <FaStar size={160} />,
  },
  {
    num: "03",
    title: "Confidence & Tone",
    desc: "Your vocal delivery shapes how your answers are perceived. A steady, clear voice conveys authority and calm.",
    detail: "Speak at a moderate pace. Use pauses strategically — silence is not weakness. Vary your pitch to keep the listener engaged.",
    tips: ["Record yourself answering questions", "Breathe deeply before tough questions", "Smile naturally — it changes your vocal tone"],
    side: "right",
    icon: <FaMicrophone size={160} />,
  },
  {
    num: "04",
    title: "Professional Attire",
    desc: "Dressing appropriately signals respect for the opportunity and awareness of the company culture.",
    detail: "Research the company's dress code. When in doubt, dress one level above the everyday standard. Ensure clothes are clean and well-fitted.",
    tips: ["Business casual is always the safe fallback", "Avoid strong fragrances", "Comfortable shoes help you walk in confidently"],
    side: "left",
    icon: <FaUserTie size={160} />,
  },
  {
    num: "05",
    title: "Preparation",
    desc: "Thorough preparation is the single biggest differentiator between good and great candidates.",
    detail: "Study the job description word-for-word. Research the company's mission and recent news. Prepare 3–5 thoughtful questions to ask.",
    tips: ["Read the company's latest blog or report", "Research your interviewers on LinkedIn", "Do a mock interview with a friend"],
    side: "right",
    icon: <FaClipboardCheck size={160} />,
  },
  {
    num: "06",
    title: "Common Mistakes",
    desc: "Knowing what not to do is just as important as knowing what to do. Avoid these costly pitfalls.",
    detail: "Top mistakes: badmouthing past employers, being vague, failing to ask questions, arriving late, and not tailoring answers to the role.",
    tips: ["Never lie — interviewers verify answers", "Avoid salary talk unless they raise it", "Send a thank-you email within 24 hours"],
    side: "left",
    icon: <FaExclamationTriangle size={160} />,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function PlusIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={GREEN} strokeWidth="2"
      style={{ transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>
      <line x1="7" y1="1" x2="7" y2="13" />
      <line x1="1" y1="7" x2="13" y2="7" />
    </svg>
  );
}

function ItemRow({ item, index, openIdx, onToggle }) {
  const isLeft = item.side === "left";
  const isOpen = openIdx === index;
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [rowRef, visible] = useInView(0.12);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveredIcon, setIsHoveredIcon] = useState(false); // <-- new state

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (bodyRef.current) setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);

  const delay = `${index * 0.08}s`;

  const cardAnim = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : isLeft && !isMobile
        ? "rotate(-6deg)"
        : !isMobile
          ? "translateX(32px)"
          : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
  };

  const illustAnim = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : isLeft && !isMobile
        ? "rotate(345deg)"
        : !isMobile
          ? "translateX(-32px)"
          : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
  };

  const card = (
    <div style={{ flex: 1, minWidth: 0, ...cardAnim }}>
      <div style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 16,
        padding: isMobile ? "20px 18px" : "26px 24px"
      }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: GREEN, letterSpacing: "0.06em", marginBottom: 10 }}>{item.num}</div>
        <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 500, color: TEXT_MAIN, marginBottom: 10 }}>{item.title}</div>
        <div style={{ fontSize: isMobile ? 13 : 14, color: TEXT_MUTED, lineHeight: 1.65, marginBottom: 20 }}>{item.desc}</div>
        <button
          onClick={() => onToggle(index)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "none", border: `2px solid #AA7BD9`,
            color: GREEN, borderRadius: 8, padding: isMobile ? "6px 12px" : "7px 14px",
            fontSize: isMobile ? 12 : 13, fontWeight: 500, cursor: "pointer",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          Learn more <PlusIcon open={isOpen} />
        </button>
        <div style={{ overflow: "hidden", height, transition: "height 0.35s ease" }}>
          <div ref={bodyRef}>
            <div style={{
              marginTop: 16,
              borderLeft: `2px solid ${GREEN}`,
              padding: isMobile ? "10px 12px" : "12px 14px",
              background: "rgba(198,241,53,0.05)",
              borderRadius: "0 8px 8px 0"
            }}>
              <p style={{ fontSize: isMobile ? 12 : 13, color: "#a8bbd0", lineHeight: 1.7, marginBottom: 8 }}>{item.detail}</p>
              <ul style={{ fontSize: isMobile ? 12 : 13, color: "#a8bbd0", lineHeight: 1.8, paddingLeft: 16 }}>
                {item.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Illustration with hover effect
  const illus = (
    <div style={{ flex: isMobile ? "0 0 auto" : 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", ...illustAnim }}>
      <div
        onMouseEnter={() => setIsHoveredIcon(true)}
        onMouseLeave={() => setIsHoveredIcon(false)}
        style={{
          transform: isMobile ? "scale(0.8)" : (isHoveredIcon ? "scale(1.15)" : "scale(1)"),
          transition: "transform 0.3s, filter 0.3s, color 0.3s",
          filter: isHoveredIcon ? `drop-shadow(0 0 12px ${GREEN})` : "none",
          color: isHoveredIcon ? "#ffffff" : GREEN, // changes icon color
          cursor: "default",
        }}
      >
        {item.icon}
      </div>
    </div>
  );

  const dotAnim = {
    transition: `border-color 0.4s ease ${delay}, background 0.4s ease ${delay}`,
  };

  const dot = (
    <div style={{
      width: isMobile ? 40 : 80,
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      paddingTop: isMobile ? 20 : 30,
      position: "relative",
      zIndex: 2
    }}>
      <div style={{
        width: isMobile ? 24 : 28,
        height: isMobile ? 24 : 28,
        borderRadius: "50%",
        border: `2px solid ${visible ? GREEN : "rgba(198,241,53,0.18)"}`,
        background: DARK_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...dotAnim,
      }}>
        <div style={{
          width: isMobile ? 8 : 10,
          height: isMobile ? 8 : 10,
          borderRadius: "50%",
          background: visible ? GREEN : "rgba(198,241,53,0.18)",
          ...dotAnim,
        }} />
      </div>
    </div>
  );

  // Mobile layout
  if (isMobile) {
    return (
      <div ref={rowRef} style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {dot}
          <div style={{ flex: 1 }}>
            {illus}
          </div>
        </div>
        {card}
      </div>
    );
  }

  // Desktop layout
  return (
    <div ref={rowRef} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      {isLeft ? illus : card}
      {dot}
      {isLeft ? card : illus}
    </div>
  );
}

function ScrollLine() {
  const lineRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      const fill = lineRef.current;
      if (!track || !fill) return;
      const rect = track.getBoundingClientRect();
      const winH = window.innerHeight;
      const pct = Math.min(Math.max((winH - rect.top) / rect.height, 0), 1);
      fill.style.height = `${pct * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={trackRef} style={{
      position: "absolute",
      left: isMobile ? "20px" : "50%",
      top: 0,
      bottom: 0,
      transform: isMobile ? "translateX(0)" : "translateX(-50%)",
      width: 2,
      pointerEvents: "none",
      zIndex: 1,
    }}>
      <div style={{ width: "100%", height: "100%", background: "rgba(198,241,53,0.12)" }}>
        <div ref={lineRef} style={{ width: "100%", height: "0%", background: GREEN, transition: "height 0.08s linear" }} />
      </div>
    </div>
  );
}

export default function InterviewFundamentals() {
  const [openIdx, setOpenIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      background: DARK_BG,
      padding: isMobile ? "40px 20px 60px" : "60px 32px 80px",
      fontFamily: "'Istok Web', sans-serif",
      minHeight: "100vh",
    }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgb(255, 255, 255)", color: GREEN,
          border: "1px solid rgba(255, 255, 255, 0.28)", borderRadius: 20,
          fontSize: isMobile ? 10 : 12, fontWeight: 500, padding: isMobile ? "4px 10px" : "5px 14px",
          letterSpacing: "0.05em", marginBottom: 16,
        }}>
          <svg width={isMobile ? "11" : "13"} height={isMobile ? "11" : "13"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
          EXPERT GUIDANCE
        </div>
        <h2 style={{
          fontSize: isMobile ? 28 : 34,
          fontWeight: 500,
          color: "#ffffff",
          margin: "0 0 12px",
          padding: isMobile ? "0 16px" : 0,
        }}>
          Interview Fundamentals
        </h2>
        <p style={{
          fontSize: isMobile ? 14 : 15,
          color: "#ffffff",
          maxWidth: 420,
          margin: "0 auto",
          lineHeight: 1.6,
          padding: isMobile ? "0 20px" : 0,
        }}>
          Master these core principles to stand out and walk into every interview with confidence.
        </p>
      </div>

      <div style={{
        maxWidth: isMobile ? "100%" : 920,
        margin: "0 auto",
        position: "relative",
        paddingLeft: isMobile ? "40px" : 0,
      }}>
        <ScrollLine />
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 40 : 56 }}>
          {items.map((item, i) => (
            <ItemRow key={i} item={item} index={i} openIdx={openIdx} onToggle={toggle} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-stack {
            flex-direction: column !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .tablet-adjust {
            max-width: 720px;
          }
        }
      `}</style>
    </div>
  );
}