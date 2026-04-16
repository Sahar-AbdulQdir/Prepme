import { useEffect, useRef, useState } from "react";
import "../styles/landing.css";
import LandingNavbar from "../components/LandingPage/LandingNavbar";
// import Logo from "../assets/Images/Plogo.png";
// import { FaUser, FaComments, FaChartLine } from "react-icons/fa"; 
import SplashCursor from "../components/splashCursor";
// import HeroImg from "../assets/Images/lan_1.jpg";
// import GradientWrapper from "../components/wrapper";
// import Aurora from "../components/AuroraBg";
import IndustrySelector from "../components/LandingPage/ind_cards";
import HowItWorks from "../components/LandingPage/steps_cards";
import CTASection from "../components/LandingPage/cta_section";
import LandingFooter from "../components/LandingPage/LandingFooter";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../components/LandingPage/features"
import LandingCards from "../components/LandingPage/Landingprices";
// ── Intersection Observer hook for scroll animations ──
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

// const NAV_LINKS = ["How it works", "Pricing", "Tips and Strategies"];

// const STEPS = [
//   {
//     num: "01",
//     icon: FaUser,
//     title: "Choose Your Role",
//     desc: "Select your target industry and job title. The AI tailors every question to your specific career path.",
//     color: "#00d4aa",
//   },
//   {
//     num: "02",
//     icon: FaComments,
//     title: "Practice Interview",
//     desc: "Answer 5–10 AI-generated, role-specific questions at your own pace. Speak or type your answers.",
//     color: "#7c6af7",
//   },
//   {
//     num: "03",
//     icon: FaChartLine,
//     title: "Get Instant Feedback",
//     desc: "Receive multimodal analysis: STAR method, filler words, confidence scoring and tone assessment.",
//     color: "#ff7a59",
//   },
// ];

// const INDUSTRIES = [
//   {
//     label: "Software Developer",
//     desc: "Select your target industry and job title. The AI tailors every question to your specific career path.",
//     img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
//     color: "#00d4aa",
//   },
//   {
//     label: "Marketing Manager",
//     desc: "Campaign strategy, analytics, and leadership scenarios.",
//     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
//     color: "#7c6af7",
//   },
//   {
//     label: "Retail Associate",
//     desc: "Customer service, conflict resolution, and sales practice.",
//     img: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&q=80",
//     color: "#00d4aa",
//   },
//   {
//     label: "Healthcare",
//     desc: "Patient care scenarios, clinical knowledge, and empathy.",
//     img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
//     color: "#7c6af7",
//   },
//   {
//     label: "Business Analyst",
//     desc: "Data-driven decision making and stakeholder management.",
//     img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
//     color: "#00d4aa",
//   },
//   {
//     label: "Education",
//     desc: "Teaching philosophy, classroom management scenarios.",
//     img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
//     color: "#7c6af7",
//   },
// ];

// const FOOTER_COLS = [
//   {
//     heading: "Product",
//     links: ["Features", "Pricing", "How it works"],
//   },
// ];


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


// function IndCard({ ind }) {
//   return (
//     <div className="ind-card" style={{ borderLeft: `4px solid ${ind.color}` }}>
//       <img src={ind.img} alt={ind.label} className="ind-card__img" />

//       <div className="ind-card__content">
//         <h3 className="ind-card__title">{ind.label}</h3>
//         <p className="ind-card__desc">{ind.desc}</p>
//       </div>
//     </div>
//   );
// }

export default function Landing({onNavigate}) {
const navigate = useNavigate();
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
  // const timelineRef = useRef(null);
const rowRefs = useRef([]);
// const [ setVisibleRows] = useState(new Set());

useEffect(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // const i = rowRefs.current.indexOf(e.target);
          // setVisibleRows((prev) => new Set([...prev, i]));
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  rowRefs.current.forEach((r) => r && obs.observe(r));
  return () => obs.disconnect();
}, []);

  // const [menuOpen, setMenuOpen] = useState(false);
  // const [ setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => (window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // <GradientWrapper>
    // <div className="prepime-shell">
    
    <div className="prepime-root">
      {/* ── NAV ── */}
    <LandingNavbar onNavigate={onNavigate} />

      {/* ── HERO ── */}
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
  onClick={() => navigate("/login")}
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

      {/* ── STATS ── */}
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

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" >
        <HowItWorks/>
      </section>
      
    
    <section id="MainFeatures">
      <FeaturesSection/>
      </section>
    <section id="features">
       <IndustrySelector/>
    </section>
<section id="LandingPrices">

  <LandingCards/>
</section>

      {/* ── CTA BANNER ── */}
      <CTASection/>
      
      {/* ── FOOTER ── */}

      <LandingFooter />

    </div>
  
  );
}