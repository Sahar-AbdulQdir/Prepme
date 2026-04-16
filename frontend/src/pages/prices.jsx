import React, { useState } from "react";
import "../styles/prices.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import SplashCursor from "../components/splashCursor";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 8L6.5 12L13.5 4" stroke="#4a7fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    width="18" height="18" viewBox="0 0 18 18" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
  >
    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#1a3a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="white" stroke="white" strokeWidth="0.5"/>
  </svg>
);

const faqs = [
  {
    q: "How does this website help me prepare for interviews?",
    a: "Our platform uses AI to simulate real interview scenarios, giving you instant feedback on your answers, tone, and structure so you can improve with every practice session."
  },
  {
    q: "What's included in the free trial?",
    a: "You get 3 free interview practice sessions, 1 free resume building credit, and unlimited access to our advice library and interview tips—no credit card required."
  },
  {
    q: "Can I practice different types of interview questions?",
    a: "Yes! We cover behavioral, technical, situational, and role-specific questions across dozens of industries and job titles."
  },
  {
    q: "Is the AI feedback personalized to me?",
    a: "Absolutely. The AI adapts to your responses and experience level, highlighting specific areas for improvement rather than giving generic advice."
  },
];

export default function PricingPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const handleContactClick = (e) => {
    e.preventDefault();
    // Navigate to contact page or open contact modal
    if (onNavigate) {
      onNavigate('contact');
    }
    // Or if you have a different navigation method:
    // window.location.href = '/contact';
  };

  return (
    <div className="pricing-container">
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
      <MainNavbar navigate={onNavigate} />

      <div className="pricing-hero">
        <h1 className="pricing-hero-title">Simple, Transparent Pricing</h1>
        <p className="hero-desc">Start free, upgrade when you're ready</p>
      </div>

      <div className="pricing-cards-wrapper">
        <div className="pricing-cards">
          {/* Free Trial Card */}
          <div className="card free-card">
            <div className="card-inner">
              {/* <div className="plan-icon free-icon">🎯</div> */}
              <h3 className="plan-name">Free Trial</h3>
              <p className="plan-description">Perfect for trying out the platform</p>
              <div className="plan-price">
                <span className="price-amount">$0</span>
                <span className="price-period"> forever</span>
              </div>
              <div className="card-divider" />
              <ul className="features-list">
                <li>
                  <CheckIcon />
                  <span><strong>3</strong> free interview practice sessions</span>
                </li>
                <li>
                  <CheckIcon />
                  <span><strong>1</strong> free resume building credit</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Unlimited access to advice & tips library</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Basic question bank access</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Email support within 48 hours</span>
                </li>
              </ul>
              <button className="btn-outline free-btn">Start Free Trial</button>
              <p className="no-card-note">No credit card required</p>
            </div>
          </div>

          {/* Unlimited Plan Card (Featured) */}
          <div className="card featured-card">
            <div className="badge">
              <SparklesIcon /> MOST POPULAR <SparklesIcon />
            </div>
            <div className="card-inner featured-inner">
              {/* <div className="plan-icon unlimited-icon">🚀</div> */}
              <h3 className="plan-name featured-name">Unlimited</h3>
              <p className="plan-description">Everything you need to land your dream job</p>
              <div className="plan-price">
                <span className="price-amount">$29</span>
                <span className="price-period"> /month</span>
              </div>
              <div className="savings-badge">Save 20% with annual billing</div>
              <div className="card-divider featured-divider" />
              <ul className="features-list">
                <li>
                  <CheckIcon />
                  <span><strong>Unlimited</strong> interview practice sessions</span>
                </li>
                <li>
                  <CheckIcon />
                  <span><strong>Unlimited</strong> resume building & downloads</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Full access to advice & tips library</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Complete premium question bank</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Advanced AI feedback & analytics</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Priority email support within 12 hours</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Interview recording & playback</span>
                </li>
              </ul>
              <button className="btn-primary">
                Get Unlimited Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="pricing-faq-section">
        <h2 className="faq-title">Frequently asked questions</h2>
        <p className="faq-subtitle">
          Can't find what you're looking for?{' '}
          {/* Option 1: Use a button styled as a link */}
          <button 
            onClick={handleContactClick}
            className="faq-link"
          >
            Contact our support team
          </button>
          
          {/* Option 2: Use a valid href (uncomment if you have a contact page) */}
          {/* <a href="/contact" className="faq-link">Contact our support team</a> */}
          
          {/* Option 3: Use a button with navigation (uncomment if using React Router) */}
          {/* <button 
            onClick={() => navigate('/contact')}
            className="faq-link"
          >
            Contact our support team
          </button> */}
        </p>

        <div className="faq-grid">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`pricing-faq-item ${openFaq === i ? "faq-open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-question-row">
                <span className="faq-question">{item.q}</span>
                <ChevronDown open={openFaq === i} />
              </div>
              {openFaq === i && (
                <p className="faq-answer">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}