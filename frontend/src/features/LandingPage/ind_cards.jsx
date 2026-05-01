import { useEffect, useRef, useState, useCallback } from "react";
import {FiBox, FiCode, FiStar, FiSun, FiShield, FiTool, FiBriefcase, FiPieChart } from "react-icons/fi";

const industries = [
  { 
    id: "sw", 
    name: "Software", 
    sub: "Algorithms, system design, fullstack & DevOps basics.", 
    Icon: FiCode 
  },
  { 
    id: "cs", 
    name: "Cybersecurity", 
    sub: "Pen testing, SOC operations & threat analysis.", 
    Icon: FiShield 
  },
  { 
    id: "dev", 
    name: "Development", 
    sub: "Frontend & backend web/app development.", 
    Icon: FiTool 
  },
  { 
    id: "bu", 
    name: "Business", 
    sub: "Operations, management & strategy.", 
    Icon: FiBriefcase 
  },
  { 
    id: "ds", 
    name: "Data Science", 
    sub: "ML, analytics & data-driven decision making.", 
    Icon: FiPieChart 
  },
  { 
    id: "pr", 
    name: "Product", 
    sub: "Roadmaps, discovery, delivery & systems thinking.", 
    Icon: FiBox 
  },
 
];

function getCardPositions(stageW, stageH, isMobile) {
  const cx = stageW / 2;
  const cy = stageH / 2;
  
  // Responsive radii and angles based on screen size
  const baseRadius = Math.min(stageW, stageH) * (isMobile ? 0.32 : 0.38);
  const cardSize = isMobile ? 160 : 200;
  
  const RADII = isMobile 
    ? [baseRadius * 0.9, baseRadius, baseRadius * 0.95, baseRadius * 1.1, baseRadius * 0.85, baseRadius]
    : [290, 290, 290, 290, 290, 290];
  
  const ANGLES = isMobile
    ? [-60, 0, 60, 120, 180, -120]
    : [-72, -10, 50, 110, 175, -135];
  
  return industries.map((_, i) => {
    const r = RADII[i];
    const a = (ANGLES[i] * Math.PI) / 180;
    const x = cx + r * Math.cos(a) - cardSize / 2;
    const y = cy + r * Math.sin(a) - cardSize / 2;
    return { x, y, cx: x + cardSize / 2, cy: y + cardSize / 2, cardSize };
  });
}

function Spark({ sx, sy, ex, ey }) {
  const elRef = useRef(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const dur = (2 + Math.random() * 2) * 1000;
    const delay = Math.random() * 3000;
    let rafId, start = null;
    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) { rafId = requestAnimationFrame(step); return; }
      const t = (elapsed % dur) / dur;
      el.style.left = sx + (ex - sx) * t + "px";
      el.style.top  = sy + (ey - sy) * t + "px";
      el.style.opacity = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 0.85;
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [sx, sy, ex, ey]);

  return (
    <div ref={elRef} style={{
      position: "absolute", width: 5, height: 5, borderRadius: "50%",
      background: "#C2D96F", pointerEvents: "none", zIndex: 4, opacity: 0,
      left: sx, top: sy,
    }} />
  );
}

function FloatingCard({ industry, position, index, onSelect, hoveredId, setHoveredId, visible, isMobile }) {
  const isHovered = hoveredId === industry.id;
  const { Icon } = industry;
  const cardSize = position.cardSize;

  return (
    <div style={{
      position: "absolute",
      left: position.x,
      top: position.y,
      width: cardSize,
      zIndex: isHovered ? 50 : 30,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(32px)",
      transition: `opacity 0.65s ease ${0.12 + index * 0.13}s, transform 0.65s ease ${0.12 + index * 0.13}s`,
      animation: visible ? `bob ${isMobile ? "3s" : "4s"} ${index * 0.2}s ease-in-out infinite` : "none",
      willChange: "transform",
    }}>
      <div
        onClick={() => onSelect(industry.name)}
        onMouseEnter={() => setHoveredId(industry.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          width: "100%",
          transform: isHovered ? "scale(1.07)" : "scale(1)",
          background: isHovered ? "#131f38" : "#0f1e35",
          border: `1px solid ${isHovered ? "rgba(194,217,111,0.45)" : "rgb(255, 255, 255)"}`,
          borderRadius: isMobile ? 16 : 20,
          padding: isMobile ? "16px 14px 14px" : "22px 20px 18px",
          cursor: "pointer",
          transition: "transform 0.25s cubic-bezier(.4,0,.2,1), border-color 0.25s, background 0.25s",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{
          width: isMobile ? 44 : 54,
          height: isMobile ? 44 : 54,
          background: isHovered
            ? "rgba(194,217,111,0.12)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${
            isHovered ? "rgba(194,217,111,0.35)" : "rgb(255, 255, 255)"
          }`,
          borderRadius: isMobile ? 12 : 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: isMobile ? 12 : 14,
          transition: "background 0.25s, border-color 0.25s, color 0.25s",
          color: isHovered ? "#C2D96F" : "#63a2ff",
        }}>
          <Icon size={isMobile ? 20 : 24} />
        </div>

        <h3 style={{
          fontFamily: "'Istok Web', sans-serif", 
          fontSize: isMobile ? 13 : 14, 
          fontWeight: 700,
          color: "#f0f4ff", 
          marginBottom: 6, 
          lineHeight: 1.3,
        }}>
          {industry.name}
        </h3>
        <p style={{ 
          fontSize: isMobile ? 11 : 12, 
          color: "#7a8fae", 
          lineHeight: 1.55, 
          margin: 0 
        }}>
          {industry.sub}
        </p>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          borderRadius: isMobile ? "0 0 16px 16px" : "0 0 20px 20px",
          background: "linear-gradient(90deg, #C2D96F, #7c6af7)",
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        }} />
      </div>
    </div>
  );
}

export default function IndustrySelector({ onSelect }) {
  const stageRef  = useRef(null);
  const sceneRef  = useRef(null);
  const [dims, setDims]           = useState({ w: 800, h: 740 });
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible]     = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  const handleSelect = useCallback((name) => {
    if (onSelect) onSelect(name);
  }, [onSelect]);

  // Check mobile and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const positions = getCardPositions(dims.w, dims.h, isMobile);
  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const coreSize = isMobile ? 140 : 210;
  const coreRadius = isMobile ? 70 : 105;

  const connectors = positions.map((p, i) => {
    const dx = p.cx - cx, dy = p.cy - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return {
      x1: cx + (dx / dist) * coreRadius,
      y1: cy + (dy / dist) * coreRadius,
      x2: p.cx - (dx / dist) * (p.cardSize / 2 + 5),
      y2: p.cy - (dy / dist) * (p.cardSize / 2 + 5),
      color: i === 0 ? "rgba(124,106,247,0.35)" : "rgba(194,217,111,0.18)",
    };
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes coreGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,106,247,0); }
          50%       { box-shadow: 0 0 44px 10px rgba(124,106,247,0.22); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          @keyframes bob {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-5px); }
          }
        }
      `}</style>

      <div
        ref={sceneRef}
        style={{
          background: "#0a1628",
          fontFamily: "Istok Web, sans-serif",
          padding: isMobile ? "40px 16px 60px" : "70px 20px 90px",
          overflow: "hidden",
          position: "relative",
          minHeight: isMobile ? 700 : 960,
        }}
      >
        {/* Hero */}
        <div style={{
          textAlign: "center", position: "relative", zIndex: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(194,217,111,0.08)",
            border: "1px solid rgba(194,217,111,0.22)",
            borderRadius: 100,
            padding: isMobile ? "5px 12px" : "6px 16px",
            fontSize: isMobile ? 10 : 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#C2D96F",
            marginBottom: isMobile ? 16 : 22,
          }}>
            <FiStar
              size={isMobile ? 10 : 12}
              style={{
                animation: "spin 2s linear infinite",
                display: "inline-block",
              }}
            />
            Career Intelligence
          </div>

          <h1 style={{
            fontFamily: "'Istok Web', sans-serif",
            fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(30px, 5vw, 54px)",
            fontWeight: 700,
            color: "#f0f4ff",
            lineHeight: 1.15,
            marginBottom: isMobile ? 10 : 14,
            padding: isMobile ? "0 10px" : 0,
          }}>
            Choose Your{" "}
            <em style={{
              background: "linear-gradient(90deg, #7c6af7, #C2D96F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "normal",
              display: "inline-block"
            }}>
              Industry
            </em>
          </h1>
          <p style={{ 
            fontSize: isMobile ? 14 : 16, 
            color: "#7a8fae", 
            maxWidth: isMobile ? 300 : 500, 
            margin: "0 auto", 
            lineHeight: 1.7,
            padding: isMobile ? "0 16px" : 0,
          }}>
            Questions built for your career. Pick an industry and the AI crafts every interview question around your exact path.
          </p>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          style={{ 
            position: "relative", 
            width: "100%", 
            height: isMobile ? 550 : 740, 
            marginTop: isMobile ? 10 : 20 
          }}
        >
          {/* Rings - Responsive sizes */}
          {[isMobile ? 240 : 360, isMobile ? 380 : 560, isMobile ? 520 : 720].map((size, ri) => (
            <div key={size} style={{
              position: "absolute", top: "50%", left: "50%",
              width: size, height: size, borderRadius: "50%",
              border: "1px dashed rgba(255,255,255,0.07)",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
              animation: `ringPulse ${4.5 + ri * 1.2}s ease-in-out ${ri * 0.9}s infinite`,
              opacity: visible ? 1 : 0,
              transition: `opacity 0.9s ease ${0.3 + ri * 0.15}s`,
            }} />
          ))}

          {/* Connectors */}
          <svg style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 5, overflow: "visible",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}>
            {connectors.map((c, i) => (
              <line key={i}
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={c.color} strokeWidth={isMobile ? "1" : "1.2"} strokeDasharray="4 7"
              />
            ))}
          </svg>

          {/* Sparks */}
          {visible && !isMobile && connectors.map((c, i) => (
            <Spark key={i} sx={c.x1} sy={c.y1} ex={c.x2} ey={c.y2} />
          ))}

          {/* Core */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: coreSize, height: coreSize,
            borderRadius: "50%",
            background: "rgba(124,106,247,0.13)",
            border: "1.5px solid rgba(124,106,247,0.38)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", zIndex: 20,
            animation: "coreGlow 3.5s ease-in-out infinite",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.2s",
          }}>
            <FiSun size={isMobile ? 32 : 44} color="#7c6af7" style={{ marginBottom: isMobile ? 6 : 10 }} />
            <div style={{
              fontFamily: "'Istok Web', sans-serif", 
              fontSize: isMobile ? 13 : 15,
              fontWeight: 700, 
              color: "#f0f4ff", 
              lineHeight: 1.35,
            }}>
              Your Career<br />Path
            </div>
            <div style={{ 
              fontSize: isMobile ? 11 : 12, 
              color: "#7a8fae", 
              marginTop: 5 
            }}>
              AI-tailored
            </div>
          </div>

          {/* Cards */}
          {industries.map((ind, i) => (
            <FloatingCard
              key={ind.id}
              industry={ind}
              position={positions[i]}
              index={i}
              onSelect={handleSelect}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              visible={visible}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </>
  );
}