import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FiBriefcase,
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiStar,
  FiCheckCircle,
  FiZap,
  FiClock,
} from "react-icons/fi";
import Mascot from "../../assets/Images/mascot2.gif";

// ─── Quotes pool ─────────────────────────────────────────────────────────────
const QUOTES = [
  {
    icon: FiBriefcase,
    title: "Own Your Story",
    body: "Every job on your CV is a chapter. Make sure the interviewer is hooked by page one.",
  },
  {
    icon: FiTarget,
    title: "Research Wins Rooms",
    body: "Candidates who know the company walk in as insiders. Spend 20 minutes — it shows.",
  },
  {
    icon: FiAward,
    title: "STAR Power",
    body: "Situation → Task → Action → Result. Structure your answers and watch the panel lean in.",
  },
  {
    icon: FiTrendingUp,
    title: "Numbers Talk",
    body: "\"Improved efficiency\" is nice. \"Cut processing time by 40%\" lands a job. Quantify everything.",
  },
  {
    icon: FiStar,
    title: "First Impressions",
    body: "Hiring managers form an opinion in 7 seconds. Posture, eye contact, and a firm handshake are half the interview.",
  },
  {
    icon: FiCheckCircle,
    title: "Tailor Every CV",
    body: "A generic CV is a deleted CV. Mirror the job description's keywords — ATS robots and humans both love it.",
  },
  {
    icon: FiZap,
    title: "Silence is Power",
    body: "Don't rush to fill pauses. A thoughtful 3-second pause before answering shows confidence, not weakness.",
  },
  {
    icon: FiClock,
    title: "Follow Up Always",
    body: "Send a thank-you email within 24 hours. Most candidates don't — and that's exactly why you should.",
  },
];

// ─── Page configs ─────────────────────────────────────────────────────────────
const PAGE_CONFIGS = {
  "/home2":   { corner: "bottom-right", from: "bottom-right" },
  "/advices": { corner: "bottom-left",  from: "bottom-left"  },
  "/tool":    { corner: "top-right",    from: "top-right"    },
  "/resume":  { corner: "top-left",     from: "top-left"     },
  "/pricing": { corner: "bottom-right", from: "bottom-right" },
};

function getConfig(pathname) {
  for (const [path, config] of Object.entries(PAGE_CONFIGS)) {
    if (pathname.startsWith(path)) return config;
  }
  return null;
}

function getCornerStyle(corner) {
  const base = { position: "fixed", zIndex: 9999 };
  switch (corner) {
    case "bottom-right": return { ...base, bottom: 24, right: 24 };
    case "bottom-left":  return { ...base, bottom: 24, left: 24 };
    case "top-right":    return { ...base, top: 24, right: 24 };
    case "top-left":     return { ...base, top: 24, left: 24 };
    default:             return { ...base, bottom: 24, right: 24 };
  }
}

// Diagonal slide transforms — hidden state
function getHiddenTransform(from) {
  switch (from) {
    case "bottom-right": return "translate(100px, 100px) rotate(12deg)";
    case "bottom-left":  return "translate(-100px, 100px) rotate(-12deg)";
    case "top-right":    return "translate(100px, -100px) rotate(-12deg)";
    case "top-left":     return "translate(-100px, -100px) rotate(12deg)";
    default:             return "translate(100px, 100px) rotate(12deg)";
  }
}

const VISIBLE_TRANSFORM = "translate(0, 0) rotate(0deg)";

// Pick a random quote, different from the last one shown
function pickQuote(lastIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * QUOTES.length);
  } while (idx === lastIndex && QUOTES.length > 1);
  return { idx, quote: QUOTES[idx] };
}

const REPEAT_INTERVAL_MS = 7 * 60 * 1000; // 7 minutes
const FIRST_SHOW_DELAY_MS = 5000;
const AUTO_HIDE_MS = 5000;

export default function MascotQuote({ user }) {
  const location = useLocation();

  const [show, setShow]           = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [config, setConfig]       = useState(null);
  const [quote, setQuote]         = useState(QUOTES[0]);

  const lastQuoteIdx  = useRef(-1);
  const autoHideTimer = useRef(null);
  const showTimer     = useRef(null);
  const repeatTimer   = useRef(null);

  const clearAll = () => {
    clearTimeout(autoHideTimer.current);
    clearTimeout(showTimer.current);
    clearInterval(repeatTimer.current);
  };

  const triggerShow = () => {
    const { idx, quote: q } = pickQuote(lastQuoteIdx.current);
    lastQuoteIdx.current = idx;
    setQuote(q);
    setShow(true);

    autoHideTimer.current = setTimeout(() => {
      setShow(false);
    }, AUTO_HIDE_MS);
  };

  useEffect(() => {
    const cfg = getConfig(location.pathname);

    clearAll();
    setShow(false);
    setOpenModal(false);
    setConfig(cfg);

    if (!cfg) return;

    // First appearance after 1 s
    showTimer.current = setTimeout(() => {
      triggerShow();

      // Then repeat every 5 min
      repeatTimer.current = setInterval(() => {
        setOpenModal(false); // close modal if open before reshowing
        triggerShow();
      }, REPEAT_INTERVAL_MS);
    }, FIRST_SHOW_DELAY_MS);

    return () => clearAll();
  }, [location.pathname]);

  const handleMascotClick = () => {
    clearTimeout(autoHideTimer.current);
    setOpenModal(true);
    setShow(false);
  };

  const handleCloseModal = () => setOpenModal(false);

  const cornerStyle      = config ? getCornerStyle(config.corner) : {};
  const hiddenTransform  = config ? getHiddenTransform(config.from) : "translate(100px,100px) rotate(12deg)";
  const currentTransform = show ? VISIBLE_TRANSFORM : hiddenTransform;

  const QuoteIcon = quote.icon;

  return (
    <>
      <style>{`
        /* ── Mascot ── */
        .mq-mascot-wrap {
          width: 150px;
          height: 150px;
          cursor: pointer;
          transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.4s ease;
          will-change: transform, opacity;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));
          transform-origin: bottom center;
        }
        .mq-mascot-wrap:hover {
          filter: drop-shadow(0 14px 32px rgba(99,102,241,0.5));
          transform: translate(0,0) rotate(0deg) scale(1.1) !important;
        }
        .mq-mascot-img {
          width: 320px;
        //   height: 100%;
          object-fit: contain;
          display: block;
        }

        /* ── Overlay ── */
        .mq-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: mq-fade-in 0.22s ease forwards;
        }
        @keyframes mq-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal box ── */
        .mq-box {
          width: 320px;
          background: linear-gradient(160deg, #12121f 0%, #1e1e35 60%, #252542 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 32px 28px 28px;
          text-align: center;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
          color: #fff;
          animation: mq-pop-in 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          position: relative;
          overflow: hidden;
        }
        .mq-box::before {
          content: "";
          position: absolute;
          top: -60px;
          right: -60px;
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        @keyframes mq-pop-in {
          from { transform: translateY(36px) scale(0.88); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* ── Icon badge ── */
        .mq-icon-badge {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(99,102,241,0.45);
        }
        .mq-icon-badge svg {
          width: 26px;
          height: 26px;
          color: #fff;
          stroke-width: 2.2;
        }

        /* ── Text ── */
        .mq-title {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.01em;
          margin: 0 0 10px;
          color: #ffffff;
        }
        .mq-body {
          font-size: 13.5px;
          color: rgb(255, 255, 255);
          line-height: 1.65;
          margin: 0 0 22px;
        }

        /* ── Button ── */
        .mq-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          padding: 11px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 18px rgba(99,102,241,0.45);
          letter-spacing: 0.02em;
        }
        .mq-btn:hover {
          transform: scale(1.06) translateY(-1px);
          box-shadow: 0 8px 26px rgba(99,102,241,0.6);
        }

        /* ── Divider accent line ── */
        .mq-accent {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 99px;
          margin: 0 auto 16px;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .mq-mascot-wrap { width: 76px; height: 76px; }
          .mq-box { width: 90%; padding: 26px 20px 22px; }
        }
      `}</style>

      {/* ── Mascot ── */}
      {config && (
        <div
          style={{
            ...cornerStyle,
            opacity: show ? 1 : 0,
            pointerEvents: show ? "auto" : "none",
          }}
        >
          <div
            className="mq-mascot-wrap"
            onClick={handleMascotClick}
            style={{ transform: currentTransform }}
          >
            <img src={Mascot} alt="Mascot" className="mq-mascot-img" />
          </div>
        </div>
      )}

      {/* ── Modal ── */}
      {openModal && (
        <div className="mq-overlay" onClick={handleCloseModal}>
          <div className="mq-box" onClick={(e) => e.stopPropagation()}>
            <div className="mq-icon-badge">
  <QuoteIcon />
</div>

<div className="mq-accent" />

{/* 1. Intro line */}
<p className="mq-body" style={{ marginBottom: "10px", fontWeight: 600, color: "#fff" }}>
  Remember, {user?.name ?? "user"}:
</p>

{/* 2. Quote title */}
<h2 className="mq-title">{quote.title}</h2>

{/* 3. Quote body */}
<p className="mq-body">{quote.body}</p>

{/* 4. Close button */}
<button className="mq-btn" onClick={handleCloseModal}>
  Got it
</button>
          </div>
        </div>
      )}
    </>
  );
}