import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Pricing", "Blog"];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#AA7BD9" strokeWidth="2" />
        <path d="M9 14l3.5 3.5L19 10" stroke="#AA7BD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Strategy",
    title: "Precision-built solutions",
    desc: "We architect end-to-end systems that scale — from prototype to production — without compromise.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="13" rx="2" stroke="#C3DA70" strokeWidth="2" />
        <path d="M10 8V6a4 4 0 018 0v2" stroke="#C3DA70" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    tag: "Security",
    title: "Enterprise-grade trust",
    desc: "Bank-level encryption, zero-trust architecture, and full compliance baked in from day one.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v6M14 18v6M4 14h6M18 14h6" stroke="#AA7BD9" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" stroke="#C3DA70" strokeWidth="2" />
      </svg>
    ),
    tag: "Growth",
    title: "Data-driven momentum",
    desc: "Real-time dashboards and intelligent analytics that turn raw signals into decisions that matter.",
  },
];

const STATS = [
  { value: "98%", label: "Satisfaction rate" },
  { value: "12K+", label: "Active users" },
  { value: "24/7", label: "Support uptime" },
  { value: "3x", label: "Avg. growth" },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [featVisible, setFeatVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFeatVisible(true); },
      { threshold: 0.15 }
    );
    if (featuresRef.current) obs.observe(featuresRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#FFFFFF", color: "#073B5A", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.22s; }
        .fade-up.d3 { transition-delay: 0.34s; }
        .fade-up.d4 { transition-delay: 0.46s; }
        .fade-up.d5 { transition-delay: 0.58s; }

        .nav-link {
          color: #073B5A;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.01em;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 1; }

        .btn-primary {
          background: #073B5A;
          color: #FFFFFF;
          border: none;
          padding: 13px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover { background: #0a4f7a; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.97); }

        .btn-outline {
          background: transparent;
          color: #073B5A;
          border: 1.5px solid #073B5A;
          padding: 12px 26px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 400;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-outline:hover { background: #073B5A; color: #fff; transform: translateY(-1px); }

        .btn-hero {
          background: #AA7BD9;
          color: #fff;
          border: none;
          padding: 16px 38px;
          border-radius: 100px;
          font-size: 17px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
          box-shadow: 0 4px 28px rgba(170,123,217,0.25);
        }
        .btn-hero:hover { background: #9966cc; transform: translateY(-2px); box-shadow: 0 8px 36px rgba(170,123,217,0.35); }
        .btn-hero:active { transform: scale(0.97); }

        .feature-card {
          background: #fff;
          border: 1.5px solid rgba(7,59,90,0.10);
          border-radius: 20px;
          padding: 36px 32px 32px;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(170,123,217,0.04), rgba(195,218,112,0.04));
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
        }
        .feature-card:hover { border-color: #AA7BD9; transform: translateY(-5px); box-shadow: 0 16px 48px rgba(170,123,217,0.12); }
        .feature-card:hover::before { opacity: 1; }
        .feature-card.active { border-color: #C3DA70; box-shadow: 0 16px 48px rgba(195,218,112,0.18); transform: translateY(-5px); }

        .tag-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 18px;
        }

        .stat-item {
          text-align: center;
          padding: 24px 16px;
        }

        .orb {
          border-radius: 50%;
          position: absolute;
          filter: blur(60px);
          pointer-events: none;
        }

        .footer-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #C3DA70; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float-anim { animation: float 5s ease-in-out infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(7,59,90,0.08)" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#073B5A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, background: "#C3DA70", borderRadius: "50%" }} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em", color: "#073B5A" }}>Nexus</span>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline" style={{ padding: "9px 20px", fontSize: 14 }}>Log in</button>
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 5% 80px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Orbs */}
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(170,123,217,0.12)", top: "5%", left: "-10%" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(195,218,112,0.12)", bottom: "5%", right: "-8%" }} />
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(7,59,90,0.06)", top: "40%", left: "40%" }} />

        {/* Decorative spinning ring */}
        <div className="float-anim" style={{ position: "absolute", top: "12%", right: "8%", width: 80, height: 80, opacity: 0.5 }}>
          <svg className="spin-slow" viewBox="0 0 80 80" fill="none" width="80" height="80">
            <circle cx="40" cy="40" r="36" stroke="#AA7BD9" strokeWidth="1.5" strokeDasharray="8 6" />
            <circle cx="40" cy="40" r="6" fill="#AA7BD9" opacity="0.4" />
          </svg>
        </div>
        <div className="float-anim" style={{ position: "absolute", bottom: "15%", left: "6%", width: 56, height: 56, opacity: 0.45, animationDelay: "2s" }}>
          <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
            <rect x="8" y="8" width="40" height="40" rx="8" stroke="#C3DA70" strokeWidth="1.5" />
            <rect x="20" y="20" width="16" height="16" rx="4" fill="#C3DA70" opacity="0.3" />
          </svg>
        </div>

        {/* Badge */}
        <div className={`fade-up d1 ${heroVisible ? "visible" : ""}`} style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(195,218,112,0.15)",
            border: "1px solid rgba(195,218,112,0.4)",
            color: "#3d5a00",
            fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 100,
            letterSpacing: "0.02em",
          }}>
            <span style={{ width: 6, height: 6, background: "#C3DA70", borderRadius: "50%", display: "inline-block" }} />
            Now in public beta — join 12,000+ teams
          </span>
        </div>

        {/* Headline */}
        <h1 className={`fade-up d2 ${heroVisible ? "visible" : ""}`} style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(42px, 6.5vw, 88px)",
          lineHeight: 1.06,
          letterSpacing: "-0.03em",
          color: "#073B5A",
          maxWidth: 820,
          marginBottom: 28,
        }}>
          Build products that
          <span style={{ color: "#AA7BD9" }}> move</span> the<br />
          world <span style={{ color: "#C3DA70" }}>forward.</span>
        </h1>

        {/* Subheading */}
        <p className={`fade-up d3 ${heroVisible ? "visible" : ""}`} style={{
          fontSize: "clamp(16px, 1.8vw, 19px)",
          color: "rgba(7,59,90,0.6)",
          maxWidth: 520,
          lineHeight: 1.65,
          marginBottom: 44,
          fontWeight: 300,
        }}>
          Nexus empowers teams to design, build, and ship extraordinary digital experiences — with speed, security, and scale.
        </p>

        {/* CTAs */}
        <div className={`fade-up d4 ${heroVisible ? "visible" : ""}`} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
          <button className="btn-hero">Start for free →</button>
          <button className="btn-outline" style={{ padding: "14px 30px", fontSize: 16 }}>Watch demo</button>
        </div>

        {/* Stats row */}
        <div className={`fade-up d5 ${heroVisible ? "visible" : ""}`} style={{
          display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
          background: "rgba(7,59,90,0.03)",
          border: "1px solid rgba(7,59,90,0.08)",
          borderRadius: 16,
          overflow: "hidden",
          width: "100%", maxWidth: 640,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-item" style={{
              flex: "1 1 130px",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(7,59,90,0.08)" : "none",
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: "#073B5A", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(7,59,90,0.5)", marginTop: 3, fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} style={{ padding: "100px 5% 110px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up ${featVisible ? "visible" : ""}`} style={{ marginBottom: 60, textAlign: "center" }}>
            <span style={{
              display: "inline-block",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#AA7BD9", marginBottom: 14,
            }}>Why Nexus</span>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)",
              color: "#073B5A", letterSpacing: "-0.025em",
              lineHeight: 1.12,
            }}>
              Everything you need.<br />
              <span style={{ color: "rgba(7,59,90,0.35)" }}>Nothing you don't.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-card fade-up d${i + 1} ${featVisible ? "visible" : ""} ${activeFeature === i ? "active" : ""}`}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div style={{ marginBottom: 20 }}>{f.icon}</div>
                <span className="tag-pill" style={{
                  background: i === 1 ? "rgba(195,218,112,0.15)" : "rgba(170,123,217,0.1)",
                  color: i === 1 ? "#3d5a00" : "#6b3fa0",
                  border: `1px solid ${i === 1 ? "rgba(195,218,112,0.35)" : "rgba(170,123,217,0.25)"}`,
                }}>{f.tag}</span>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: 21,
                  color: "#073B5A", marginBottom: 12, letterSpacing: "-0.02em",
                }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(7,59,90,0.58)", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
                <div style={{
                  marginTop: 28, display: "flex", alignItems: "center", gap: 6,
                  color: "#AA7BD9", fontSize: 13, fontWeight: 500,
                }}>
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="#AA7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: "80px 5%",
        background: "#073B5A",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(170,123,217,0.18)", top: "-30%", left: "20%" }} />
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(195,218,112,0.12)", bottom: "-20%", right: "10%" }} />
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)",
          color: "#fff", letterSpacing: "-0.025em",
          marginBottom: 18, position: "relative",
        }}>
          Ready to build something<br />
          <span style={{ color: "#C3DA70" }}>remarkable?</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, marginBottom: 36, fontWeight: 300, position: "relative" }}>
          Join thousands of teams already shipping with Nexus.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <button className="btn-hero">Get started free →</button>
          <button style={{
            background: "transparent", color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.25)",
            padding: "14px 28px", borderRadius: 100,
            fontSize: 16, cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.background = "transparent"; }}
          >
            Talk to sales
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#051e2e", padding: "60px 5% 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 52, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 26, height: 26, background: "#AA7BD9", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 9, height: 9, background: "#C3DA70", borderRadius: "50%" }} />
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>Nexus</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7, maxWidth: 240, fontWeight: 300 }}>
                Building the next generation of digital infrastructure — fast, secure, and human.
              </p>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>{col.heading}</p>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 11 }}>
                    <a href="#" className="footer-link">{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>© 2026 Nexus, Inc. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Twitter", "GitHub", "LinkedIn"].map(s => (
                <a key={s} href="#" className="footer-link" style={{ fontSize: 13 }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}