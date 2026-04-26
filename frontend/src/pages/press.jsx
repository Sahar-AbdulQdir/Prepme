import { useState, useEffect, useRef } from "react";
import {
  FiDownload, FiMail, FiChevronDown, FiChevronUp,
  FiImage, FiFileText, FiPackage, FiUsers, FiBarChart2,
  FiInfo, FiCheckCircle, FiTrendingUp, FiGlobe, FiAward,
  FiZap, FiTarget, FiBriefcase, FiCpu, FiMessageSquare,
  FiLayout, FiClock, FiPlay, FiFlag
} from "react-icons/fi";
import Mascot from "../assets/Images/mascot2.png";

// ─── Product screenshots – swap these import paths for your real images ───────
import InterviewImg from "../../src/assets/Images/pressInterview.png";
import ResumeImg    from "../../src/assets/Images/pressResume.png";
import SkillsImg    from "../../src/assets/Images/pressSkills.png";
import RoadmapImg   from "../../src/assets/Images/pressDashboard.png";
// ──────────────────────────────────────────────────────────────────────────────

const COLORS = {
  primary:   "#0d5671",
  secondary: "#B87CFB",
  lime:      "#bacb6f",
  bg:        "#f7f8f5",
  text:      "#0d1a20",
  cardBg:    "#FFFFFF",
  border:    "#e0e3d8",
  muted:     "#4d6470",
  accent:    "#0f7a9d",
  light:     "#e8f3f8",
};

// ── Intersection-observer hook ────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]); // ✅ fixed missing dependency
  return [ref, inView];
};

// ── Scroll-triggered animation wrapper ───────────────────────────────────────
const AnimWrap = ({ children, delay = 0, style = {}, dir = "up" }) => {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(36px)", down: "translateY(-36px)", left: "translateX(-36px)", right: "translateX(36px)" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[dir],
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
};

// ── Button ────────────────────────────────────────────────────────────────────
const Btn = ({ children, icon: Icon, variant = "primary", href, style = {}, onClick }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "11px 22px", borderRadius: 10, fontFamily: "'Sora', 'Istok Web', sans-serif",
    fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "none",
    transition: "all 0.22s ease", border: "none", ...style
  };
  const variants = {
    primary: { background: COLORS.primary, color: "#fff" },
    outline: { background: "transparent", color: COLORS.primary, border: `1.5px solid ${COLORS.primary}` },
    ghost:   { background: COLORS.light, color: COLORS.primary },
    purple:  { background: COLORS.secondary, color: "#fff" },
    lime:    { background: COLORS.lime, color: COLORS.primary },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
      {Icon && <Icon size={15} />}{children}
    </Tag>
  );
};

// ── Card ──────────────────────────────────────────────────────────────────────
const Card = ({ children, style = {}, hover = true }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: COLORS.cardBg, borderRadius: 18, padding: "28px 26px",
        border: `1px solid ${COLORS.border}`,
        boxShadow: hovered ? "0 14px 44px rgba(13,86,113,0.13)" : "0 2px 14px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.28s ease", ...style
      }}>
      {children}
    </div>
  );
};

const Badge = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: COLORS.light, color: COLORS.primary,
    padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700,
    border: `1px solid rgba(13,86,113,0.18)`, letterSpacing: "0.04em"
  }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(184,124,251,0.12)", color: COLORS.secondary,
    padding: "5px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14
  }}>{children}</div>
);

const H2 = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: "'Sora', 'Istok Web', sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", color: COLORS.primary, margin: "0 0 14px", lineHeight: 1.2, ...style }}>{children}</h2>
);

// ── Image map helper – uses imported images directly to avoid lint warnings ──
const getScreenshotImage = (label) => {
  switch (label) {
    case "Interview Practice": return InterviewImg;
    case "Resume Builder":     return ResumeImg;
    case "Skill Tracker":      return SkillsImg;
    case "Career Roadmap":     return RoadmapImg;
    default:                   return InterviewImg; // fallback
  }
};

// ── Data ──────────────────────────────────────────────────────────────────────
const statCards = [
  { icon: FiTrendingUp, stat: "63%",  label: "of graduates feel unprepared for the job market",             color: COLORS.primary },
  { icon: FiGlobe,      stat: "2.4B", label: "global EdTech market projected by 2027",                     color: COLORS.secondary },
  { icon: FiTarget,     stat: "85%",  label: "of job success depends on soft skills & EQ",                 color: COLORS.accent },
  { icon: FiBarChart2,  stat: "3×",   label: "more likely to be hired with AI-coached interview prep",      color: COLORS.primary },
];

const mockScreens = [
  { label: "Interview Practice",  icon: FiPlay,      desc: "AI-powered live feedback",            gradient: "linear-gradient(135deg,#0d5671 0%,#0f7a9d 100%)" },
  { label: "Resume Builder",      icon: FiLayout,    desc: "Smart ATS-optimized templates",       gradient: "linear-gradient(135deg,#1a3a52 0%,#0d5671 100%)" },
  { label: "Skill Tracker",       icon: FiBarChart2, desc: "Progress dashboard",                  gradient: "linear-gradient(135deg,#0d5671 0%,#B87CFB 100%)" },
  { label: "Career Roadmap",      icon: FiTarget,    desc: "Personalized growth paths",           gradient: "linear-gradient(135deg,#0f7a9d 0%,#bacb6f 60%)" },
];

const sdgs = [
  {
    num: "SDG 4",
    title: "Quality Education",
    color: "#C31F33",
    icon: `<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M4 4h6l2 3 2-3h6v14H4V4zm2 2v10h3l2-3 2 3h3V6h-3l-2 3-2-3H6z"/>
          </svg>`,
    body: "Providing accessible career education and skill development tools to bridge the gap between academia and industry."
  },
  {
    num: "SDG 5",
    title: "Gender Equality",
    color: "#FF3A21",
    icon: `<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <circle cx="12" cy="7" r="3"/>
            <path d="M12 10v5M10 13h4"/>
            <path d="M16 4l-2 2h1.5l-3 3 1.5 1.5 3-3V9l2-2-3-3z"/>
          </svg>`,
    body: "Supporting equal access to career preparation tools for all genders, removing barriers to professional growth."
  },
  {
    num: "SDG 8",
    title: "Decent Work & Economic Growth",
    color: "#8F1838",
    icon: `<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <rect x="5" y="17" width="3" height="3"/>
            <rect x="10" y="12" width="3" height="8"/>
            <rect x="15" y="7" width="3" height="13"/>
            <path d="M2 18l4-4H3l8-8-1.5-1.5-8 8H4l-4 4z"/>
          </svg>`,
    body: "Helping users improve employability and access better job opportunities, contributing to inclusive economic growth."
  },
  {
    num: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    color: "#F36D25",
    icon: `<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M17.8 4.3l-1.3 1.3a6 6 0 0 0-9 0L6.2 4.3a1 1 0 0 0-1.6 1.1l1 1.7a6 6 0 0 0 0 5.8l-1 1.7a1 1 0 0 0 1.6 1.1l1.3-1.3a6 6 0 0 0 9 0l1.3 1.3a1 1 0 0 0 1.6-1.1l-1-1.7a6 6 0 0 0 0-5.8l1-1.7a1 1 0 0 0-1.6-1.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
          </svg>`,
    body: "Using AI to innovate career development and recruitment preparation with cutting-edge, scalable technology."
  },
  {
    num: "SDG 10",
    title: "Reduced Inequalities",
    color: "#DD1367",
    icon: `<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <rect x="5" y="9" width="14" height="2"/>
            <rect x="5" y="13" width="14" height="2"/>
          </svg>`,
    body: "Making career support accessible regardless of background, geography, or income — levelling the playing field."
  },
  {
    num: "SDG 17",
    title: "Partnerships for the Goals",
    color: "#19486A",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="24" height="24">
            <circle cx="9" cy="9" r="4"/>
            <circle cx="15" cy="15" r="4"/>
          </svg>`,
    body: "Enabling collaboration between students, educators, and employers through shared platforms and open ecosystems."
  }
];

const faqs = [
  { q: "What is PrepMe?",                         a: "PrepMe is an AI-powered career readiness platform that helps graduates and young professionals practice interviews, strengthen soft skills, and build standout resumes — all in one digital workspace." },
  { q: "Who is PrepMe for?",                      a: "PrepMe is built for university students, recent graduates, and early-career professionals who want to close the gap between academic preparation and real-world employability." },
  { q: "Is PrepMe currently live?",               a: "PrepMe is in its launch phase. We are actively onboarding early users and building partnerships with universities and career services teams." },
  { q: "How is PrepMe different from other career tools?", a: "Unlike generic job boards or one-size-fits-all resources, PrepMe combines AI-driven personalized feedback, structured practice sessions, and resume coaching in a single seamless platform." },
  { q: "How can journalists access more information?", a: "Reach out directly at press@prepme.io. We respond to all media inquiries within 24 hours and can arrange founder interviews, demos, and access to our full press kit." },
];

const brandColors = [
  { name: "Navy Primary",      hex: "#0d5671", light: false },
  { name: "Violet Accent",     hex: "#B87CFB", light: false },
  { name: "Olive Lime",        hex: "#bacb6f", light: true  },
  { name: "Ocean Blue",        hex: "#0f7a9d", light: false },
  { name: "Soft Background",   hex: "#f7f8f5", light: true  },
  { name: "Card White",        hex: "#FFFFFF", light: true  },
  { name: "Border Gray",       hex: "#e0e3d8", light: true  },
];

// ── Download & contact links ─────────────────────────────────────────────────
const EMAIL = "prepme.cc@gmail.com";
const PRESS_EMAIL = `mailto:${EMAIL}`;

// Replace these placeholder paths with the actual URLs of your downloadable assets
const PRESS_KIT_URL  = "/press/Prepme_pressKit.zip";
const LOGO_PACK_URL  = "/press/Prepme_Logo_Pack.zip";
const TEAM_BIOS_URL  = "/press/PrepMe_Founding_Team.pdf";
const FACT_SHEET_URL = "/press/PrepMe — Fact Sheet.pdf";

// ── Main Component ────────────────────────────────────────────────────────────
export default function Press() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&display=swap";
    document.head.appendChild(link);
  }, []);

  const INSTA_URL   = "https://www.instagram.com/prepme.io";
  const TIKTOK_URL  = "https://www.tiktok.com/@prepme.io";

  return (
    <div style={{ fontFamily: "'Sora', 'Istok Web', sans-serif", background: COLORS.bg, color: COLORS.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(184,124,251,0.25); }
        @keyframes floatY   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes fadeSlide{ from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseRing{ 0%{box-shadow:0 0 0 0 rgba(184,124,251,.45)} 70%{box-shadow:0 0 0 14px rgba(184,124,251,0)} 100%{box-shadow:0 0 0 0 rgba(184,124,251,0)} }
        .mascot-float { animation: floatY 3.5s ease-in-out infinite; }
        .pulse { animation: pulseRing 2.4s infinite; }
        a { color: inherit; }
        .sdg-card:hover { transform: translateY(-5px) !important; box-shadow: 0 18px 48px rgba(0,0,0,0.18) !important; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(247,248,245,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.3s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FiZap size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.primary, letterSpacing: "-0.02em" }}>PrepMe</span>
          <span style={{ fontSize: 11, color: COLORS.muted, background: COLORS.border, padding: "2px 8px", borderRadius: 50, fontWeight: 600 }}>Press Room</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" icon={FiDownload} style={{ padding: "8px 16px", fontSize: 13 }}
            href={PRESS_KIT_URL} download>
            Press Kit (Request)
          </Btn>
          <Btn icon={FiMail} style={{ padding: "8px 16px", fontSize: 13 }}
            href={PRESS_EMAIL}>Contact Press</Btn>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "140px 5% 80px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        {/* BG deco */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "15%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,124,251,0.13) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,86,113,0.09) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(186,203,111,0.07) 0%, transparent 65%)" }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill={COLORS.border} /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, animation: "fadeSlide 0.9s ease both" }}>
          <div style={{ marginBottom: 20 }}>
            <Badge><FiAward size={12} /> For Journalists &amp; Investors</Badge>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 6vw, 74px)", color: COLORS.primary, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: 22 }}>
            PrepMe Press &amp;<br />Media Room
          </h1>
          <p style={{ fontSize: "clamp(16px,2vw,20px)", color: COLORS.muted, maxWidth: 580, margin: "0 auto 38px", lineHeight: 1.7 }}>
            Everything you need to cover PrepMe — brand assets, company story, and media resources — all in one place.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn icon={FiDownload} style={{ fontSize: 15, padding: "13px 28px" }}
              href={PRESS_KIT_URL} download>
              Request Press Kit
            </Btn>
            <Btn variant="outline" icon={FiMail} style={{ fontSize: 15, padding: "13px 28px" }}
              href={PRESS_EMAIL}>Contact Press</Btn>
          </div>

          {/* Quick stats strip */}
          <div style={{ marginTop: 60, display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap", borderTop: `1px solid ${COLORS.border}`, paddingTop: 36 }}>
            {[["Founded","2026"],["HQ","UAE"],["Stage","Launch"],["Focus","EdTech"]].map(([label, val]) => (
              <div key={label} style={{ padding: "0 28px", borderRight: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.primary }}>{val}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot floating */}
        <div className="mascot-float pulse" style={{ position: "absolute", bottom: 40, right: "8%", opacity: 0.95, zIndex: 1 }}>
          <div style={{ width: 108, height: 108, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(13,86,113,0.28)" }}>
            <img src={Mascot} alt="PrepBot mascot" style={{ width: 72, height: 72, objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.primary, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "rgba(184,124,251,0.15)", transform: "translate(30%,-30%)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(186,203,111,0.1)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimWrap>
            <SectionLabel><FiInfo size={12} /> About PrepMe</SectionLabel>
            <H2 style={{ color: "#fff" }}>Democratizing Career Success</H2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 560, lineHeight: 1.7, marginBottom: 50 }}>
              PrepMe is an AI-powered career readiness platform built for the next generation of professionals.
            </p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: FiBriefcase, title: "The Problem", body: "63% of graduates leave university without the practical soft skills, interview readiness, or personal branding needed to secure meaningful employment in a competitive market." },
              { icon: FiCpu,       title: "Our Solution", body: "An AI-driven coaching platform with interview practice, real-time feedback, ATS-optimized resume building, and personalized career roadmaps — accessible to anyone, anywhere." },
              { icon: FiTarget,    title: "Our Mission", body: "To level the playing field. Every graduate — regardless of institution, background, or network — deserves access to world-class career preparation tools." },
            ].map(({ icon: Icon, title, body }, i) => (
              <AnimWrap key={title} delay={i * 0.13}>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 26px", border: "1px solid rgba(255,255,255,0.12)", height: "100%" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(184,124,251,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={20} color={COLORS.secondary} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{body}</p>
                </div>
              </AnimWrap>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS KIT ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimWrap>
            <SectionLabel><FiPackage size={12} /> Press Kit</SectionLabel>
            <H2>Core Media Assets</H2>
            <p style={{ color: COLORS.muted, fontSize: 16, marginBottom: 50, maxWidth: 520 }}>Approved brand materials and resources ready for editorial and publication use.</p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {/* Logo Pack */}
            <AnimWrap delay={0.05}>
              <Card style={{ height: "100%" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `rgba(13,86,113,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <FiImage size={22} color={COLORS.primary} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 12 }}>Logo Pack</h3>
                <ul style={{ listStyle: "none", marginBottom: 22 }}>
                  {["Full color PNG","White reverse logo","Black print PDF","SVG vector file","Icon only version"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.muted, padding: "4px 0" }}>
                      <FiCheckCircle size={13} color={COLORS.secondary} />{item}
                    </li>
                  ))}
                </ul>
                <Btn icon={FiDownload} variant="ghost" style={{ width: "100%", justifyContent: "center" }}
                  href={LOGO_PACK_URL} download>
                  Request Logo Pack
                </Btn>
              </Card>
            </AnimWrap>

            {/* Team */}
            <AnimWrap delay={0.1}>
              <Card style={{ height: "100%" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `rgba(184,124,251,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <FiUsers size={22} color={COLORS.secondary} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 12 }}>Founding Team</h3>
                {[
                  { initials: "FH", name: "Founder",    role: "CEO & Product Strategy" },
                  { initials: "TM", name: "Co-Founder", role: "AI & Engineering Lead" },
                ].map(({ initials, name, role }) => (
                  <div key={initials} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>{name}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{role}</div>
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginBottom: 20 }}>A multidisciplinary team united by one mission: making career success accessible to all.</p>
                <Btn icon={FiDownload} variant="ghost" style={{ width: "100%", justifyContent: "center" }}
                  href={TEAM_BIOS_URL} download>
                  Request Team Bios
                </Btn>
              </Card>
            </AnimWrap>

            {/* Fact Sheet */}
            <AnimWrap delay={0.15}>
              <Card style={{ height: "100%" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `rgba(15,122,157,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <FiFileText size={22} color={COLORS.accent} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 12 }}>Fact Sheet</h3>
                {[
                  ["Platform Type",  "AI Career Coach"],
                  ["Primary Users",  "Graduates & Students"],
                  ["Core Features",  "Interview, Resume, Skills"],
                  ["Market Focus",   "MENA & Global"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontSize: 12, color: COLORS.muted }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary }}>{v}</span>
                  </div>
                ))}
                <Btn icon={FiDownload} variant="ghost" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
                  href={FACT_SHEET_URL} download>
                  Request Fact Sheet
                </Btn>
              </Card>
            </AnimWrap>

            {/* Press Contact */}
            <AnimWrap delay={0.2}>
              <Card style={{ height: "100%", border: `1.5px solid ${COLORS.secondary}` }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(184,124,251,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <FiMail size={22} color={COLORS.secondary} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 8 }}>Press Contact</h3>
                <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 18, lineHeight: 1.6 }}>For interviews, partnerships, and media inquiries. We respond within 24 hours.</p>
                <div style={{ background: COLORS.light, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 2 }}>Media Inquiries</div>
                  <div style={{ fontWeight: 700, color: COLORS.primary, fontSize: 14 }}>prepme.cc@gmail.com</div>
                </div>
                <Btn icon={FiMail} variant="purple" style={{ width: "100%", justifyContent: "center" }}
                  href={PRESS_EMAIL}>Email Us</Btn>
              </Card>
            </AnimWrap>
          </div>
        </div>
      </section>

      {/* ── PRESS RELEASE ──────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <AnimWrap>
            <SectionLabel><FiFileText size={12} /> Featured Press Release</SectionLabel>
          </AnimWrap>
          <AnimWrap delay={0.08}>
            <Card style={{ padding: "46px 48px" }} hover={false}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: COLORS.primary, padding: "4px 12px", borderRadius: 50 }}>OFFICIAL RELEASE</span>
                <span style={{ fontSize: 13, color: COLORS.muted, display: "flex", alignItems: "center", gap: 6 }}><FiClock size={13} /> UAE — April 2024</span>
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(20px,3vw,30px)", color: COLORS.primary, lineHeight: 1.3, marginBottom: 22 }}>
                PrepMe Launches AI Platform to Tackle Graduate Employability Crisis
              </h2>
              <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.75, marginBottom: 22 }}>
                PrepMe, a UAE-based EdTech startup, today announced the launch of its AI-powered career readiness platform designed to bridge the widening gap between academic achievement and workplace preparedness. The platform offers structured interview practice, personalized resume building, and soft skills coaching powered by advanced AI models.
              </p>
              <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.75, marginBottom: 30 }}>
                With over 63% of graduates reporting inadequate career preparation and global youth unemployment continuing to rise, PrepMe addresses a critical need in the market by making high-quality career coaching accessible and affordable for every student, regardless of background or institution.
              </p>
              <div style={{ background: COLORS.light, borderLeft: `4px solid ${COLORS.secondary}`, borderRadius: "0 12px 12px 0", padding: "22px 24px", marginBottom: 32 }}>
                <p style={{ fontSize: 17, color: COLORS.primary, fontStyle: "italic", lineHeight: 1.7, marginBottom: 12 }}>
                  "Our goal is to democratize access to career success tools. Every graduate deserves the same preparation advantage — not just those with access to elite networks or expensive coaching."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>FH</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>Founder, PrepMe</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>CEO &amp; Product Strategy</div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimWrap>
        </div>
      </section>

      {/* ── MARKET DATA ────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.primary, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(184,124,251,0.12)" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(186,203,111,0.1)" }} />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimWrap>
            <SectionLabel><FiBarChart2 size={12} /> Market Data</SectionLabel>
            <H2 style={{ color: "#fff" }}>The Problem We're Solving</H2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 500, marginBottom: 50, lineHeight: 1.65 }}>
              The employability gap is not a perception problem — it's a structural crisis backed by data.
            </p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {statCards.map(({ icon: Icon, stat, label }, i) => (
              <AnimWrap key={stat} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "30px 24px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon size={20} color={COLORS.lime} />
                  </div>
                  <div style={{ fontSize: 46, fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 10 }}>{stat}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{label}</p>
                </div>
              </AnimWrap>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SCREENSHOTS ────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimWrap>
            <SectionLabel><FiImage size={12} /> Media Gallery</SectionLabel>
            <H2>Product Screenshots &amp; UI</H2>
            <p style={{ color: COLORS.muted, fontSize: 15, marginBottom: 10 }}>Approved images for editorial use.</p>
            <p style={{ fontSize: 12, color: COLORS.muted, marginBottom: 44, display: "flex", alignItems: "center", gap: 6 }}>
              <FiInfo size={12} /> All images are cleared for press and editorial use. Credit: PrepMe.
            </p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {mockScreens.map(({ label, icon: Icon, desc, gradient }, i) => (
              <AnimWrap key={label} delay={i * 0.09}>
                <div style={{
                  borderRadius: 18, overflow: "hidden", border: `1px solid ${COLORS.border}`,
                  background: COLORS.cardBg, cursor: "pointer",
                  transition: "transform 0.28s, box-shadow 0.28s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(13,86,113,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <img
                    src={getScreenshotImage(label)}   // ✅ using imported images directly
                    alt={label}
                    style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                  />
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary, marginBottom: 5 }}>{label}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{desc}</div>
                  </div>
                </div>
              </AnimWrap>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND IDENTITY ─────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimWrap>
            <SectionLabel><FiLayout size={12} /> Brand Identity</SectionLabel>
            <H2>Brand Identity System</H2>
            <p style={{ color: COLORS.muted, fontSize: 16, marginBottom: 50, maxWidth: 500 }}>Our visual language — purposefully minimal, confident, and accessible.</p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
            {/* Color palette */}
            <AnimWrap>
              <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary, marginBottom: 20 }}>Color Palette</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {brandColors.map(({ name, hex, light }) => (
                    <div key={hex} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 10, background: hex, border: `1px solid ${COLORS.border}`, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>{name}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "monospace" }}>{hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimWrap>

            {/* Typography + Usage */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <AnimWrap delay={0.08}>
                <Card>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary, marginBottom: 16 }}>Typography</h3>

                  {/* Sora */}
                  <div style={{ background: COLORS.bg, borderRadius: 10, padding: "18px 20px", marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, fontWeight: 600 }}>PRIMARY TYPEFACE</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: COLORS.primary, lineHeight: 1.1 }}>Sora</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: COLORS.muted, marginTop: 8 }}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: COLORS.muted }}>a b c d e f g h i j k l m n o p q r s t u v w x y z</div>
                  </div>

                  {/* Istok Web */}
                  <div style={{ background: COLORS.bg, borderRadius: 10, padding: "18px 20px" }}>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, fontWeight: 600 }}>SECONDARY TYPEFACE</div>
                    <div style={{ fontFamily: "'Istok Web', sans-serif", fontSize: 32, fontWeight: 700, color: COLORS.primary, lineHeight: 1.1 }}>Istok Web</div>
                    <div style={{ fontFamily: "'Istok Web', sans-serif", fontSize: 13, color: COLORS.muted, marginTop: 8 }}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                    <div style={{ fontFamily: "'Istok Web', sans-serif", fontSize: 13, color: COLORS.muted }}>a b c d e f g h i j k l m n o p q r s t u v w x y z</div>
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                    {[["Heading","Sora Bold 700",24],["Body","Istok Regular 400",15]].map(([label, weight, size]) => (
                      <div key={label} style={{ flex: 1, background: COLORS.light, borderRadius: 8, padding: "12px 14px" }}>
                        <div style={{ fontSize: size, fontWeight: label === "Heading" ? 700 : 400, fontFamily: label === "Heading" ? "'Sora', sans-serif" : "'Istok Web', sans-serif", color: COLORS.primary, marginBottom: 4 }}>Aa</div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>{label}</div>
                        <div style={{ fontSize: 10, color: COLORS.muted }}>{weight}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimWrap>
              <AnimWrap delay={0.12}>
                <Card>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary, marginBottom: 14 }}>Logo Usage Guidelines</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { icon: FiCheckCircle, color: "#22c55e", text: "Always maintain clear space around the logo equal to the cap-height of the wordmark." },
                      { icon: FiCheckCircle, color: "#22c55e", text: "Use on white, light grey (#f7f8f5), or primary navy backgrounds only." },
                    ].map(({ icon: Icon, color, text }) => (
                      <div key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Icon size={15} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimWrap>
            </div>
          </div>
        </div>
      </section>

      {/* ── SDGs (Social Impact) ────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.bg, position: "relative", overflow: "hidden" }}>
        {/* subtle bg elements */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(186,203,111,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimWrap>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(186,203,111,0.15)", color: COLORS.lime, padding: "5px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
              <FiGlobe size={12} /> Social Impact
            </div>
            <H2 style={{ color: "#0d5671" }}>Our UN SDG Commitments</H2>
            <p style={{ fontSize: 16, color: "#0d5671", maxWidth: 560, marginBottom: 56, lineHeight: 1.7 }}>
              PrepMe aligns with six of the United Nations Sustainable Development Goals — because building careers is also building a better world.
            </p>
          </AnimWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {sdgs.map((item, i) => (
              <AnimWrap key={item.num} delay={i * 0.08} dir={i % 2 === 0 ? "left" : "right"}>
                <div
                  className="sdg-card"
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "-1px 6px 19px -4px rgba(0,0,0,0.75)",
                    WebkitBoxShadow: "-1px 6px 19px -4px rgba(0,0,0,0.75)",
                    MozBoxShadow: "-1px 6px 19px -4px rgba(0,0,0,0.75)",
                    background: "rgba(255,255,255,0.04)",
                    height: "100%"
                  }}
                >
                  {/* Header */}
                  <div style={{
                    background: item.color,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                        {item.num}
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
                        {item.title}
                      </div>
                    </div>

                    {/* ✅ White SDG icon (SVG string rendered via dangerouslySetInnerHTML) */}
                    <div
                      style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>

                  {/* Body */}
                  <div style={{ padding: "22px 24px" }}>
                    <p style={{ fontSize: 14, color: "#0d5671" }}>{item.body}</p>
                  </div>
                </div>
              </AnimWrap>
            ))}
          </div>
        </div>
      </section>

      {/* ── MASCOT ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimWrap>
            <Card hover={false} style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", padding: "44px 48px", background: COLORS.light, border: `1px solid rgba(13,86,113,0.1)` }}>
              <div className="mascot-float" style={{ flexShrink: 0 }}>
                <div style={{ width: 110, height: 110, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(13,86,113,0.28)" }}>
                  <FiZap size={48} color={COLORS.lime} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.secondary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Meet Our Mascot</div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: COLORS.primary, marginBottom: 14 }}>PrepBot — Confidence &amp; Growth</h3>
                <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.7, maxWidth: 500 }}>PrepBot represents every graduate's journey — from uncertainty to confidence. A guiding presence through every mock interview, every resume draft, and every career milestone.</p>
              </div>
            </Card>
          </AnimWrap>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <AnimWrap>
            <SectionLabel><FiMessageSquare size={12} /> FAQ for Media</SectionLabel>
            <H2>Frequently Asked Questions</H2>
            <p style={{ color: COLORS.muted, fontSize: 16, marginBottom: 50 }}>Quick answers for journalists and press inquiries.</p>
          </AnimWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map(({ q, a }, i) => (
              <AnimWrap key={i} delay={i * 0.07}>
                <div style={{
                  background: COLORS.cardBg, borderRadius: 14, overflow: "hidden",
                  border: `1px solid ${openFaq === i ? COLORS.secondary : COLORS.border}`,
                  transition: "border-color 0.2s"
                }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "20px 24px", background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600,
                      color: COLORS.primary, textAlign: "left", gap: 16
                    }}>
                    <span>{q}</span>
                    {openFaq === i ? <FiChevronUp size={18} color={COLORS.secondary} /> : <FiChevronDown size={18} color={COLORS.muted} />}
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 22px", fontSize: 14, color: COLORS.muted, lineHeight: 1.75 }}>{a}</div>
                  )}
                </div>
              </AnimWrap>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 5%", background: COLORS.primary }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <AnimWrap>
            <FiFlag size={32} color={COLORS.lime} style={{ marginBottom: 18 }} />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>Ready to Cover PrepMe?</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginBottom: 34, lineHeight: 1.65 }}>Reach out for founder access, product demos, embargoed materials, or any editorial requests.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn
                icon={FiMail}
                variant="outline"
                className="white-btn"
                style={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#fff",
                  fontSize: 15,
                  padding: "13px 28px"
                }}
                href={PRESS_EMAIL}
              >
                prepme.cc@gmail.com
              </Btn>
            </div>
          </AnimWrap>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#060f15", padding: "48px 5% 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 30, marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiZap size={14} color={COLORS.lime} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>PrepMe</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 260, lineHeight: 1.65 }}>AI-powered career readiness platform for the next generation of professionals.</p>
            </div>

            {/* Social icons — Instagram + TikTok only */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* Instagram */}
              <a href={INSTA_URL} target="_blank" rel="noopener noreferrer"
                style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(228,64,95,0.3)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                {/* Instagram SVG icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(105,201,208,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                {/* TikTok SVG icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2024 PrepMe. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "Back to Landing page", href: "/landing" },
                { label: "Privacy Policy",   href: "/privacy" },
                { label: "prepme.cc@gmail.com",  href: PRESS_EMAIL, color: "#fff" },
              ].map(({ label, href, color }) => (
                <a key={label} href={href} style={{ fontSize: 12, color: color || "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
                  onMouseLeave={e => e.currentTarget.style.color = color || "rgba(255,255,255,0.4)"}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}