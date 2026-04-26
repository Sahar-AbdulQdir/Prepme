import { useEffect, useRef, useState, useCallback } from "react";
import "../styles/landing.css";
import LandingNavbar from "../features/LandingPage/LandingNavbar";
import SplashCursor from "../components/effects/splashCursor";
import IndustrySelector from "../features/LandingPage/ind_cards";
import HowItWorks from "../features/LandingPage/steps_cards";
import CTASection from "../features/LandingPage/cta_section";
import LandingFooter from "../features/LandingPage/LandingFooter";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../features/LandingPage/features";
import LandingCards from "../features/LandingPage/Landingprices";

// ── Intersection Observer hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Counter animation ──
function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = parseFloat(target);
    const duration = 1800;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Animated section wrapper ──
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Icon */}
        <div style={iconCircleStyle}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.5c-3.5 0-6.6-1.793-8.464-4.5C7.56 16.693 12 15.5 16 15.5s8.44 1.193 8.464 3.5C22.6 21.707 19.5 23.5 16 23.5z" fill="#4a7fa5"/>
          </svg>
        </div>

        {/* Text */}
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#0c1e30" }}>
          Sign Up Required
        </h2>
        <p style={{ margin: "0 0 4px", fontSize: 15, color: "#4a5568", lineHeight: 1.6, textAlign: "center" }}>
          You need a free account to start your 3 practice sessions.
        </p>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: "#718096", textAlign: "center" }}>
          Redirecting you to the sign-up page…
        </p>

        {/* Countdown ring */}
        <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 20px" }}>
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
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 700, color: "#0c1e30"
          }}>
            {seconds}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#a0aec0", margin: "0 0 24px", textAlign: "center" }}>
          Redirecting in {seconds} second{seconds !== 1 ? "s" : ""}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "1.5px solid #e2e8f0",
              background: "#fff", color: "#4a5568", fontSize: 14, fontWeight: 600, cursor: "pointer"
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

const overlayStyle = {
  position: "fixed", inset: 0, zIndex: 9999,
  background: "rgba(12, 30, 48, 0.6)",
  backdropFilter: "blur(6px)",
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "1rem",
  animation: "fadeInOverlay 0.25s ease",
};

const modalStyle = {
  background: "#fff",
  borderRadius: 20,
  padding: "40px 36px",
  maxWidth: 420,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
  animation: "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)",
};

const iconCircleStyle = {
  width: 68, height: 68, borderRadius: "50%",
  background: "linear-gradient(135deg, #e8f4fd, #d0e9f7)",
  display: "flex", alignItems: "center", justifyContent: "center",
  marginBottom: 20,
};

// ── Keyframes injected once ──
const modalKeyframes = `
  @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUpModal { from { opacity: 0; transform: translateY(24px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
`;

export default function Landing({ onNavigate }) {
  const navigate = useNavigate();
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const rowRefs = useRef([]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartFree = () => {
    setShowRedirectModal(true);
  };

  const handleRedirect = useCallback(() => {
    setShowRedirectModal(false);
    navigate("/login");
  }, [navigate]);

  const handleCloseModal = () => {
    setShowRedirectModal(false);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) {} }); },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    rowRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => (window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="prepime-root">
      <style>{modalKeyframes}</style>

      {/* Redirect Modal */}
      {showRedirectModal && (
        <RedirectModal onClose={handleCloseModal} onRedirect={handleRedirect} />
      )}

      {/* NAV */}
      <LandingNavbar onNavigate={onNavigate} />

      {/* HERO */}
      <section className="hero">
        <div className="aurora-bg"></div>
        <SplashCursor
          SIM_RESOLUTION={224}
          DYE_RESOLUTION={640}
          DENSITY_DISSIPATION={2.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.6}
          CURL={0}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={3000}
          COLOR_UPDATE_SPEED={8}
        />

        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__pill">
              <span className="hero__star">✦</span>
              AI-Powered Interview Coach
            </div>
            <h1 className="hero__headline">
              Land Your <br />
              <span className="hero__accent">Dream Job</span> with<br />
              AI Coaching
            </h1>
            <p className="hero__sub">
              Practice with a smart AI coach that listens, analyzes your answers
              in real-time, and gives you personalized feedback — so you walk in
              confident and walk out hired.
            </p>
            <div className="hero__ctas">
              <button
                className="btn btn--green btn--lg"
                onClick={handleStartFree}
              >
                Start Free – 3 Sessions →
              </button>

              <button
                className="btn btn--outline btn--lg"
                onClick={() => scrollToSection("features")}
              >
                Explore Our Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__inner">
          {[
            { val: 4.5, suf: "", label: "80K Reviews" },
            { val: 30, suf: "M", label: "Enrollments" },
            { val: 2, suf: "M+", label: "Learners" },
            { val: 1, suf: "k+", label: "Popular Courses" },
          ].map(({ val, suf, label }, i) => (
            <FadeIn key={label} delay={i * 100} className="stat">
              <div className="stat__num">
                <CountUp target={val} suffix={suf} />
              </div>
              <div className="stat__label">{label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="MainFeatures">
        <FeaturesSection />
      </section>

      <section id="features">
        <IndustrySelector />
      </section>

      <section id="LandingPrices">
        <LandingCards />
      </section>

      {/* CTA BANNER */}
      <CTASection />

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
}