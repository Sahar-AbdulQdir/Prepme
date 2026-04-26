import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(180, 240, 80, 0.45); }
    70% { box-shadow: 0 0 0 18px rgba(180, 240, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(180, 240, 80, 0); }
  }
  @keyframes particle-float {
    0% { opacity: 0; transform: translateY(0px) scale(0); }
    20% { opacity: 1; }
    80% { opacity: 0.5; }
    100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
  }
  @keyframes word-reveal {
    0% { opacity: 0; transform: translateY(24px) rotateX(-30deg); filter: blur(6px); }
    100% { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
  }
  @keyframes badge-pop {
    0% { opacity: 0; transform: scale(0.75) translateY(-6px); }
    60% { transform: scale(1.06) translateY(0); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.6; }
    100% { transform: translateY(900%); opacity: 0; }
  }
  @keyframes orb-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, -15px) scale(1.05); }
    66% { transform: translate(-10px, 10px) scale(0.97); }
  }
  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUpModal {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 768px) {
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    @keyframes particle-float {
      0% { opacity: 0; transform: translateY(0px) scale(0); }
      20% { opacity: 0.8; }
      80% { opacity: 0.3; }
      100% { opacity: 0; transform: translateY(-40px) scale(1.1); }
    }
  }
`;

const COLORS = ["rgba(180,240,80,0.85)", "rgba(130,170,255,0.7)", "rgba(170,130,255,0.7)", "rgba(100,230,200,0.65)"];

function Particle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: style.size,
        height: style.size,
        borderRadius: "50%",
        background: style.color,
        left: style.left,
        bottom: style.bottom,
        animation: `particle-float ${style.duration}s linear ${style.delay}s infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

// ── Redirect Modal ──
function RedirectModal({ onClose, onRedirect }) {
  const [seconds, setSeconds] = useState(5);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (seconds <= 0) {
      onRedirect();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
      setProgress((p) => p - 20);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onRedirect]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(12, 30, 48, 0.7)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
      animation: "fadeInOverlay 0.25s ease",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 420,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        animation: "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Icon */}
        <div style={{
          width: 68, height: 68, borderRadius: "50%",
          background: "linear-gradient(135deg, #e8f4fd, #d0e9f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.5c-3.5 0-6.6-1.793-8.464-4.5C7.56 16.693 12 15.5 16 15.5s8.44 1.193 8.464 3.5C22.6 21.707 19.5 23.5 16 23.5z" fill="#4a7fa5"/>
          </svg>
        </div>

        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#0c1e30", textAlign: "center" }}>
          Sign Up Required
        </h2>
        <p style={{ margin: "0 0 4px", fontSize: 15, color: "#4a5568", lineHeight: 1.6, textAlign: "center" }}>
          You need a free account to start your 3 practice sessions.
        </p>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: "#718096", textAlign: "center" }}>
          Redirecting you to the sign-up page…
        </p>

        {/* Countdown ring */}
        <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 16px" }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r="30" fill="none" stroke="#e2e8f0" strokeWidth="6" />
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke="#4a7fa5"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 30}`}
              strokeDashoffset={`${2 * Math.PI * 30 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.9s ease" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 700, color: "#0c1e30"
          }}>
            {seconds}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#a0aec0", margin: "0 0 24px", textAlign: "center" }}>
          Redirecting in {seconds} second{seconds !== 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 10,
              border: "1.5px solid #e2e8f0", background: "#fff",
              color: "#4a5568", fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={onRedirect}
            style={{
              flex: 2, padding: "12px 0", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #4a7fa5, #2d5f84)",
              color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer"
            }}
          >
            Go Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CTASection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [burstParticles, setBurstParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const burstId = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseParticles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: `${Math.random() * 3 + 2}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 35}%`,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
    }))
  );

  useEffect(() => {
    baseParticles.current = Array.from({ length: isMobile ? 12 : 20 }, (_, i) => ({
      id: i,
      size: `${Math.random() * 3 + 2}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 35}%`,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
    }));
  }, [isMobile]);

  const handleBtnHover = () => {
    setHovered(true);
    const particleCount = isMobile ? 4 : 6;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: `burst-${burstId.current++}-${i}`,
      size: `${Math.random() * 5 + 3}px`,
      color: "rgba(180,240,80,0.95)",
      left: `${30 + Math.random() * 40}%`,
      bottom: isMobile ? "35%" : "28%",
      duration: 1.5 + Math.random() * 2,
      delay: 0,
    }));
    setBurstParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setBurstParticles((prev) => prev.filter((p) => !newParticles.find((n) => n.id === p.id)));
    }, 3500);
  };

  const handleStartFree = () => {
    setShowRedirectModal(true);
  };

  const handleRedirect = useCallback(() => {
    setShowRedirectModal(false);
    navigate("/login");
  }, [navigate]);

  // Styles (unchanged from original)
  const containerStyle = {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#eef2f8", padding: isMobile ? "1rem" : "2rem",
    fontFamily: "'Istok Web', sans-serif",
  };

  const cardStyle = {
    position: "relative", width: "100%", maxWidth: 1000,
    background: "linear-gradient(140deg, #0c1e30 0%, #091527 45%, #0e2244 100%)",
    borderRadius: isMobile ? 20 : 28,
    padding: isMobile ? "2.5rem 1.5rem" : "4rem 3rem",
    textAlign: "center", overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    animation: "float 6s ease-in-out infinite",
  };

  const badgeStyle = {
    display: "inline-flex", alignItems: "center", gap: isMobile ? 5 : 7,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 100, padding: isMobile ? "4px 12px" : "6px 16px",
    marginBottom: isMobile ? "1.25rem" : "1.5rem",
    animation: "badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
  };

  const headlineStyle = {
    fontSize: isMobile ? "clamp(28px, 8vw, 42px)" : "clamp(32px, 5.5vw, 54px)",
    fontWeight: 800, lineHeight: 1.15, margin: isMobile ? "0 0 1rem" : "0 0 1.25rem",
    color: "#fff", perspective: 900,
  };

  const subtextStyle = {
    fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.42)",
    maxWidth: isMobile ? "100%" : 460,
    margin: isMobile ? "0 auto 2rem" : "0 auto 2.75rem",
    lineHeight: 1.6, fontFamily: "'Istok Web', sans-serif",
    animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 0.9s both",
    padding: isMobile ? "0 0.5rem" : 0,
  };

  const buttonContainerStyle = {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: isMobile ? 10 : 12, flexWrap: "wrap",
    animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 1.1s both",
  };

  const primaryButtonStyle = {
    position: "relative", display: "inline-flex", alignItems: "center",
    gap: isMobile ? 6 : 10,
    padding: isMobile ? "0 1.25rem 0 1rem" : "0 1.75rem 0 1.5rem",
    height: isMobile ? 50 : 58, borderRadius: 100, border: "none", cursor: "pointer",
    fontSize: isMobile ? 14 : 15, fontWeight: 700, color: "#0c1e30",
    background: "#c8f050",
    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
    animation: "pulse-ring 2.8s ease-out 2.5s infinite",
    transform: hovered ? "scale(1.05) translateY(-2px)" : "scale(1)",
    boxShadow: hovered
      ? "0 14px 44px rgba(180,240,80,0.38), 0 0 0 1px rgba(180,240,80,0.2)"
      : "none",
    overflow: "hidden",
    whiteSpace: isMobile ? "normal" : "nowrap",
    width: isMobile ? "100%" : "auto",
    justifyContent: "center",
  };

  const socialProofStyle = {
    marginTop: isMobile ? "1.75rem" : "2.25rem",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: isMobile ? 8 : 10, flexWrap: isMobile ? "wrap" : "nowrap",
    animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 1.3s both",
  };

  const avatarStyle = {
    width: isMobile ? 24 : 26, height: isMobile ? 24 : 26,
    borderRadius: "50%", border: "2.5px solid #091527",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: isMobile ? 9 : 10, fontWeight: 700, color: "#fff",
  };

  return (
    <>
      <style>{keyframes}</style>

      {showRedirectModal && (
        <RedirectModal onClose={() => setShowRedirectModal(false)} onRedirect={handleRedirect} />
      )}

      <div style={containerStyle}>
        <div style={cardStyle}>
          {/* Scanline */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: isMobile ? 2 : 3,
            background: "linear-gradient(90deg, transparent, rgba(140,190,255,0.18), transparent)",
            animation: "scanline 9s linear infinite", pointerEvents: "none",
          }} />

          {/* Glow orbs */}
          {[
            { w: isMobile ? 200 : 320, h: isMobile ? 200 : 320, color: "rgba(90,130,255,0.13)", top: isMobile ? -60 : -100, right: isMobile ? -40 : -80 },
            { w: isMobile ? 140 : 220, h: isMobile ? 140 : 220, color: "rgba(160,100,255,0.1)", bottom: isMobile ? -40 : -70, left: isMobile ? -30 : -50 },
            { w: isMobile ? 120 : 180, h: isMobile ? 120 : 180, color: "rgba(180,240,80,0.07)", bottom: isMobile ? 5 : 10, right: isMobile ? 20 : 40 },
          ].map((orb, i) => (
            <div key={i} style={{
              position: "absolute", width: orb.w, height: orb.h, borderRadius: "50%",
              background: orb.color, filter: "blur(60px)",
              top: orb.top, bottom: orb.bottom, left: orb.left, right: orb.right,
              animation: `orb-drift ${7 + i * 2}s ease-in-out ${i}s infinite`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Particles */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: isMobile ? 20 : 28 }}>
            {baseParticles.current.map((p) => <Particle key={p.id} style={p} />)}
            {burstParticles.map((p) => <Particle key={p.id} style={p} />)}
          </div>

          {/* Grid texture */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: isMobile ? 20 : 28,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: isMobile ? "30px 30px" : "40px 40px", pointerEvents: "none",
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Badge */}
            <div style={badgeStyle}>
              <span style={{ width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: "50%", background: "#c8f050", display: "inline-block" }} />
              <span style={{
                fontSize: isMobile ? 10 : 11, fontWeight: 500, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "rgba(180,210,255,0.7)",
                fontFamily: "'Istok Web', sans-serif",
              }}>
                {isMobile ? "Start your journey" : "Your next interview starts here"}
              </span>
            </div>

            {/* Headline */}
            <h1 style={headlineStyle}>
              <span style={{ display: "inline-block", animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 0.4s both" }}>
                Stop practicing&nbsp;
              </span>
              <span style={{ display: "inline-block", animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 0.56s both" }}>
                in the
              </span>
              <br />
              <span style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #7c6af7, #C2D96F)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "word-reveal 0.55s cubic-bezier(0.22,1,0.36,1) 0.72s both, shimmer 4s linear 2s infinite",
              }}>
                mirror.
              </span>
            </h1>

            {/* Subtext */}
            <p style={subtextStyle}>
              Get real AI feedback that transforms how you answer, present,
              and connect in every interview.
            </p>

            {/* Button */}
            <div style={buttonContainerStyle}>
              <button
                onMouseEnter={handleBtnHover}
                onMouseLeave={() => setHovered(false)}
                onClick={handleStartFree}
                style={primaryButtonStyle}
              >
                <div style={{
                  position: "absolute", top: "-50%", left: hovered ? "130%" : "-60%",
                  width: "40%", height: "200%", background: "rgba(255,255,255,0.22)",
                  transform: "skewX(-20deg)", transition: "left 0.55s ease", pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 100,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%)",
                  pointerEvents: "none",
                }} />
                <span style={{ position: "relative" }}>Start free — 3 sessions</span>
                <span style={{
                  position: "relative", width: isMobile ? 28 : 30, height: isMobile ? 28 : 30,
                  borderRadius: "50%", background: "rgba(12,30,48,0.16)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isMobile ? 14 : 15, transition: "transform 0.2s ease",
                  transform: hovered ? "translateX(2px)" : "translateX(0)",
                }}>
                  →
                </span>
              </button>
            </div>

            {/* Social proof */}
            <div style={socialProofStyle}>
              <div style={{ display: "flex" }}>
                {["#6366f1", "#8b5cf6", "#0ea5e9", "#10b981"].map((color, i) => (
                  <div key={i} style={{ ...avatarStyle, background: color, marginLeft: i === 0 ? 0 : -7 }}>
                    {["J", "M", "S", "K"][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: isMobile ? 11 : 12, color: "rgba(255,255,255,0.35)" }}>
                <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                  {isMobile ? "2.4k+" : "2,400+"}
                </strong> interviews aced this month
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}