import { useState, useEffect, useRef } from "react";

const features = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 44, height: 44 }}>
        <rect x="6" y="8" width="28" height="36" rx="3" fill="#C3DA70" fillOpacity="0.18" stroke="#C3DA70" strokeWidth="2"/>
        <path d="M12 18h16M12 24h12M12 30h8" stroke="#C3DA70" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="34" r="8" fill="#073B5A" stroke="#AA7BD9" strokeWidth="2"/>
        <path d="M33 34l2 2 4-4" stroke="#AA7BD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tag: "AI-Powered",
    title: "Build Your Resume",
    subtitle: "with Artificial Intelligence",
    description:
      "Let our AI craft a tailored, ATS-optimized resume from your experience. Highlights your strengths, fills gaps, and adapts to each job — in seconds.",
    accent: "#C3DA70",
    glow: "rgba(195,218,112,0.18)",
    pill: "#C3DA70",
    pillText: "#073B5A",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 44, height: 44 }}>
        <circle cx="24" cy="24" r="16" fill="#AA7BD9" fillOpacity="0.13" stroke="#AA7BD9" strokeWidth="2"/>
        <circle cx="24" cy="19" r="5" fill="#AA7BD9" fillOpacity="0.3" stroke="#AA7BD9" strokeWidth="2"/>
        <path d="M14 36c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#AA7BD9" strokeWidth="2" strokeLinecap="round"/>
        <rect x="30" y="9" width="10" height="7" rx="2" fill="#073B5A" stroke="#AA7BD9" strokeWidth="1.5"/>
        <circle cx="35" cy="12.5" r="1.2" fill="#AA7BD9"/>
      </svg>
    ),
    tag: "Mock Interview",
    title: "AI Interview",
    subtitle: "Practice & Perform",
    description:
      "Simulate real interviews with an AI that adapts to your industry and role. Get instant feedback on your answers, tone, and confidence — no judgment, just growth.",
    accent: "#AA7BD9",
    glow: "rgba(170,123,217,0.18)",
    pill: "#AA7BD9",
    pillText: "#fff",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 44, height: 44 }}>
        <path d="M8 36V14a2 2 0 012-2h28a2 2 0 012 2v16a2 2 0 01-2 2H16l-8 6z" fill="#C3DA70" fillOpacity="0.10" stroke="#C3DA70" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="17" cy="22" r="2" fill="#C3DA70"/>
        <circle cx="24" cy="22" r="2" fill="#C3DA70"/>
        <circle cx="31" cy="22" r="2" fill="#C3DA70"/>
      </svg>
    ),
    tag: "Expert Guidance",
    title: "Interview Tips",
    subtitle: "& Smart Advice",
    description:
      "Access curated, role-specific strategies from hiring experts. From body language to salary negotiation — be fully prepared before you walk in.",
    accent: "#C3DA70",
    glow: "rgba(195,218,112,0.13)",
    pill: "#C3DA70",
    pillText: "#073B5A",
  },
];

const shimmer = `
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(170,123,217,0); }
  50% { box-shadow: 0 0 32px 6px rgba(170,123,217,0.13); }
}
@keyframes scanline {
  0% { top: 0%; }
  100% { top: 100%; }
}
`;

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) setVisible(true); 
      },
      { threshold: 0.18 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onTouchStart={() => setIsMobile(true)}
      style={{
        position: "relative",
        background: "rgba(10,10,20,0.88)",
        borderRadius: "clamp(16px, 4vw, 20px)",
        padding: "clamp(1.5rem, 5vw, 2.2rem) clamp(1.2rem, 4vw, 2rem) clamp(1.2rem, 4vw, 2rem)",
        border: hovered
          ? `1.5px solid ${feature.accent}`
          : "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 8px 48px ${feature.glow}, 0 2px 8px rgba(0,0,0,0.25)`
          : "0 2px 16px rgba(0,0,0,0.18)",
        cursor: "default",
        transition:
          "transform 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.32s ease, border-color 0.28s ease, background 0.32s ease",
        transform: hovered && !isMobile
          ? "translateY(-10px) scale(1.025)"
          : visible
          ? "translateY(0) scale(1)"
          : "translateY(36px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.13}s` : "0s",
        overflow: "hidden",
        minHeight: "clamp(280px, 50vh, 310px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(0.75rem, 3vw, 1rem)",
      }}
    >
      {/* Glow top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: "80%",
          height: 2,
          borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Scanline effect - disabled on mobile for performance */}
      {hovered && !isMobile && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: 60,
            background: `linear-gradient(to bottom, transparent, ${feature.glow}, transparent)`,
            pointerEvents: "none",
            animation: "scanline 2.2s linear infinite",
            zIndex: 0,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "clamp(48px, 12vw, 64px)",
          height: "clamp(48px, 12vw, 64px)",
          borderRadius: "clamp(12px, 3vw, 16px)",
          background: `${feature.glow}`,
          border: `1.5px solid ${feature.accent}22`,
          animation: hovered && !isMobile ? "floatY 2.2s ease-in-out infinite" : "none",
          transition: "background 0.3s",
          zIndex: 1,
        }}
      >
        {feature.icon}
      </div>

      {/* Pill tag */}
      <div style={{ zIndex: 1 }}>
        <span
          style={{
            display: "inline-block",
            background: feature.pill,
            color: feature.pillText,
            fontSize: "clamp(0.6rem, 2vw, 0.68rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: 100,
            padding: "clamp(2px, 1vw, 3px) clamp(8px, 3vw, 12px)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {feature.tag}
        </span>
      </div>

      {/* Text */}
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            marginBottom: "0.25rem",
          }}
        >
          {feature.title}
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)",
            fontWeight: 600,
            color: feature.accent,
            marginBottom: "clamp(0.4rem, 2vw, 0.55rem)",
            lineHeight: 1.3,
          }}
        >
          {feature.subtitle}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.85rem, 3vw, 0.93rem)",
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 400,
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        ${shimmer}
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 3vw, 1.5rem);
        }
        
        @media (max-width: 1024px) {
          .features-grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 1.25rem;
          }
        }
        
        @media (max-width: 640px) {
          .features-grid { 
            grid-template-columns: 1fr; 
            gap: 1rem;
          }
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
          button, 
          [role="button"],
          .clickable {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Smooth scrolling for better mobile experience */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
        
        /* Optimize animations for mobile */
        @media (max-width: 768px) {
          @keyframes floatY {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
        }
      `}</style>
      
      <section
        style={{
          background: "#0a1628",
          minHeight: "100vh",
          padding: "clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 1.5rem) clamp(3rem, 8vw, 5rem)",
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "clamp(300px, 50vw, 480px)",
            height: "clamp(300px, 50vw, 480px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(170,123,217,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "clamp(240px, 40vw, 360px)",
            height: "clamp(240px, 40vw, 360px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(195,218,112,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ 
          maxWidth: "min(1080px, 100%)", 
          margin: "0 auto", 
          position: "relative",
          padding: "0 clamp(0.5rem, 2vw, 1rem)",
        }}>
          {/* Header */}
          <div
            ref={titleRef}
            style={{
              textAlign: "center",
              marginBottom: "clamp(2rem, 8vw, 3.5rem)",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(6px, 2vw, 8px)",
                background: "rgba(195,218,112,0.09)",
                border: "1px solid rgba(195,218,112,0.22)",
                borderRadius: 100,
                padding: "clamp(4px, 1.5vw, 5px) clamp(12px, 4vw, 18px)",
                marginBottom: "clamp(0.8rem, 3vw, 1.2rem)",
              }}
            >
              <span
                style={{
                  width: "clamp(6px, 1.5vw, 7px)",
                  height: "clamp(6px, 1.5vw, 7px)",
                  borderRadius: "50%",
                  background: "#C3DA70",
                  display: "inline-block",
                  boxShadow: "0 0 6px #C3DA70",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(0.65rem, 2vw, 0.72rem)",
                  color: "#C3DA70",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Everything you need
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.8rem, 8vw, 3.2rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 clamp(0.5rem, 2vw, 0.8rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                padding: "0 0.5rem",
              }}
            >
              Your Career,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #C2D96F, #7c6af7)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s linear infinite",
                  display: "inline-block",
                }}
              >
                Supercharged by AI
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "min(520px, 90%)",
                margin: "0 auto",
                lineHeight: 1.7,
                padding: "0 0.5rem",
              }}
            >
              From crafting your first resume to acing the final round — we've
              built the tools that get you hired.
            </p>
          </div>

          {/* Cards */}
          <div className="features-grid">
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}