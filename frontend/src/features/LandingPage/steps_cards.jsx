import { useState } from "react";
<link href="https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap" rel="stylesheet"></link>

const cards = [
  {
    num: "01",
    title: "Choose Your Role",
    desc: "Select your target industry and job title. The AI tailors every question to your specific career path.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7C6AF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Practice Interview",
    desc: "Answer 5–10 AI-generated, role-specific questions at your own pace. Speak or type your answers.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Get Instant Feedback",
    desc: "Receive multimodal analysis: STAR method, filler words, confidence scoring and tone assessment.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EF9F27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const stackedStyles = [
  { left: "calc(50% - 68px)", top: "50%", transform: "translate(-50%,-50%) translateX(-68px) rotate(-5deg) scale(0.9)",  zIndex: 1, opacity: 0.62 },
  { left: "50%",              top: "50%", transform: "translate(-50%,-50%) scale(1)",                                     zIndex: 3, opacity: 1  },
  { left: "calc(50% + 68px)", top: "50%", transform: "translate(-50%,-50%) translateX(68px) rotate(5deg) scale(0.9)",    zIndex: 1, opacity: 0.62 },
];

const expandedStyles = [
  { left: "calc(50% - 355px)", top: "50%", transform: "translate(-50%,-50%) rotate(0deg) scale(1)", zIndex: 2, opacity: 1 },
  { left: "50%",               top: "50%", transform: "translate(-50%,-50%) scale(1)",               zIndex: 2, opacity: 1 },
  { left: "calc(50% + 355px)", top: "50%", transform: "translate(-50%,-50%) rotate(0deg) scale(1)", zIndex: 2, opacity: 1 },
];

const T = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), left 0.55s cubic-bezier(0.34,1.56,0.64,1), top 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.55s cubic-bezier(0.34,1.56,0.64,1), border-color 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.55s cubic-bezier(0.34,1.56,0.64,1)";

export default function HowItWorks() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section style={{ 
      padding: "clamp(40px, 8vw, 60px) clamp(16px, 5vw, 5vw) clamp(60px, 10vw, 80px)", 
      textAlign: "center", 
      fontFamily: "Istok Web, sans-serif" 
    }}>
      <p style={{ 
        fontSize: "clamp(0.7rem, 2vw, 0.82rem)", 
        fontWeight: 500, 
        letterSpacing: "0.18em", 
        textTransform: "uppercase", 
        color: "#7C6AF7", 
        marginBottom: "clamp(10px, 2vw, 14px)" 
      }}>
        How It Works
      </p>
      <h2 style={{ 
        fontSize: "clamp(1.5rem, 5vw, 3rem)", 
        fontWeight: 800, 
        color: "#fff", 
        lineHeight: 1.18, 
        marginBottom: "clamp(32px, 6vw, 64px)",
        paddingLeft: "clamp(8px, 2vw, 16px)",
        paddingRight: "clamp(8px, 2vw, 16px)"
      }}>
        Three steps to{" "}
        <span style={{
          background: "linear-gradient(90deg, #7c6af7 0%, #C2D96F 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          interview mastery
        </span>
      </h2>

      {/* Mobile: Vertical stack layout */}
      {isMobile ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 4vw, 32px)",
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                minHeight: "auto",
                background: "rgba(10,10,20,0.88)",
                border: "1.5px solid rgb(255, 255, 255)",
                borderRadius: "clamp(16px, 3vw, 22px)",
                padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 30px) clamp(28px, 5vw, 40px)",
                textAlign: "left",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "clamp(16px, 3vw, 22px)", pointerEvents: "none",
                background: "linear-gradient(135deg, rgba(124,106,247,0.09) 0%, transparent 55%)",
                opacity: hoveredIdx === i ? 1 : 0, transition: "opacity 0.35s ease",
              }} />

              {/* Bottom gradient line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                borderRadius: "0 0 22px 22px",
                background: "linear-gradient(90deg, #7C6AF7, #1D9E75)",
                transform: hoveredIdx === i ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s ease",
              }} />

              {/* Header row */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start", 
                marginBottom: "clamp(16px, 3vw, 22px)" 
              }}>
                <div style={{ 
                  fontSize: "clamp(1.6rem, 4vw, 2rem)", 
                  fontWeight: 900, 
                  color: "rgba(255,255,255,0.08)", 
                  lineHeight: 1, 
                  letterSpacing: "0.06em" 
                }}>
                  {card.num}
                </div>
                <div style={{
                  border: `1.5px solid ${hoveredIdx === i ? "#7C6AF7" : "rgba(255,255,255,0.14)"}`,
                  borderRadius: "clamp(10px, 2vw, 12px)", 
                  padding: "clamp(7px, 1.5vw, 9px)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  transform: hoveredIdx === i ? "scale(1.1) rotate(-5deg)" : "none",
                }}>
                  {card.icon}
                </div>
              </div>

              <h3 style={{ 
                fontSize: "clamp(1rem, 3vw, 1.2rem)", 
                fontWeight: 800, 
                color: "#fff", 
                marginBottom: "clamp(10px, 2vw, 14px)", 
                textTransform: "uppercase", 
                letterSpacing: "0.06em" 
              }}>
                {card.title}
              </h3>
              <p style={{ 
                color: "rgba(200,200,220,0.58)", 
                fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", 
                lineHeight: 1.72 
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Stacked/Expanded cards layout */
        <div
          style={{ 
            position: "relative", 
            maxWidth: 1060, 
            margin: "0 auto", 
            height: 420, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => { setExpanded(false); setHoveredIdx(null); }}
        >
          {cards.map((card, i) => {
            const base = expanded ? expandedStyles[i] : stackedStyles[i];
            const isHovered = expanded && hoveredIdx === i;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 330,
                  minHeight: 360,
                  background: "rgba(10,10,20,0.88)",
                  border: `1.5px solid ${isHovered ? "rgba(124,106,247,0.55)" : "rgb(255, 255, 255)"}`,
                  borderRadius: 22,
                  padding: "36px 30px 40px",
                  textAlign: "left",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  willChange: "transform, left, opacity",
                  transition: T,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: isHovered ? "0 32px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,106,247,0.28)" : "none",
                  ...base,
                  ...(isHovered ? { transform: "translate(-50%, calc(-50% - 14px)) scale(1.045)", zIndex: 10 } : {}),
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Top glow */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none",
                  background: "linear-gradient(135deg, rgba(124,106,247,0.09) 0%, transparent 55%)",
                  opacity: isHovered ? 1 : 0, transition: "opacity 0.35s ease",
                }} />

                {/* Bottom gradient line */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                  borderRadius: "0 0 22px 22px",
                  background: "linear-gradient(90deg, #7C6AF7, #1D9E75)",
                  transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                }} />

                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "rgba(255,255,255,0.08)", lineHeight: 1, letterSpacing: "0.06em" }}>
                    {card.num}
                  </div>
                  <div style={{
                    border: `1.5px solid ${isHovered ? "#7C6AF7" : "rgba(255,255,255,0.14)"}`,
                    borderRadius: 12, padding: 9, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                    transform: isHovered ? "scale(1.1) rotate(-5deg)" : "none",
                  }}>
                    {card.icon}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {card.title}
                </h3>
                <p style={{ color: "rgba(200,200,220,0.58)", fontSize: "0.95rem", lineHeight: 1.72 }}>
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}