import React, { useState } from "react";
import "../styles/prices.css";
import Footer from "../components/ui/Footer";
import SplashCursor from "../components/effects/splashCursor";

// ── Icons ──
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 8L6.5 12L13.5 4" stroke="#4a7fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#1a3a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="white" stroke="white" strokeWidth="0.5"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#888" strokeWidth="1.2"/>
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
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

// ── Modal overlay wrapper ──
function ModalOverlay({ children, onClose }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(12, 30, 48, 0.65)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeInOverlay 0.2s ease",
      }}
    >
      {children}
    </div>
  );
}

// ── Free Trial Confirmation Popup ──
function FreeTrialModal({ onClose, user = "user@example.com" }) {
  const [activated, setActivated] = useState(false);
  const handleActivate = () => {
    setActivated(true);
    setTimeout(onClose, 2200);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "40px 36px",
        maxWidth: 440, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        animation: "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {!activated ? (
          <>
            {/* Header */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #e8f4fd, #d0e9f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 20,
            }}>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M17 3C9.268 3 3 9.268 3 17s6.268 14 14 14 14-6.268 14-14S24.732 3 17 3z" fill="#e8f4fd" stroke="#4a7fa5" strokeWidth="1.5"/>
                <path d="M11 17l4 4 8-8" stroke="#4a7fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div style={{
              background: "#f0f7ff", border: "1px solid #c8dff4",
              borderRadius: 10, padding: "10px 18px", marginBottom: 20,
              fontSize: 13, color: "#4a7fa5", fontWeight: 500,
            }}>
              ✦ Free Trial — No credit card needed
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#0c1e30", textAlign: "center" }}>
              You're all set!
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#718096", textAlign: "center", lineHeight: 1.6 }}>
              Your free trial will be linked to:
            </p>

            {/* Email display */}
            <div style={{
              width: "100%", background: "#f7fafc",
              border: "1.5px solid #e2e8f0", borderRadius: 10,
              padding: "14px 18px", marginBottom: 24,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="4" width="15" height="10" rx="2" stroke="#a0aec0" strokeWidth="1.3"/>
                <path d="M1.5 6.5l7.5 5 7.5-5" stroke="#a0aec0" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 14, color: "#2d3748", fontWeight: 500 }}>{user}</span>
            </div>

            {/* What you get */}
            <div style={{ width: "100%", marginBottom: 28 }}>
              <p style={{ fontSize: 12, color: "#a0aec0", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                Included in your free trial
              </p>
              {[
                { icon: "🎯", label: "3 interview practice sessions", sub: "AI-powered, real-time feedback" },
                { icon: "📄", label: "2 resume builds", sub: "Download & edit anytime" },
                { icon: "📚", label: "Unlimited tips & advice library", sub: "No time limit" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid #f0f4f8" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: "#f0f7ff",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#2d3748" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#a0aec0" }}>{item.sub}</div>
                  </div>
                  <CheckIcon />
                </div>
              ))}
            </div>

            {/* Action */}
            <button
              onClick={handleActivate}
              style={{
                width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #4a7fa5, #2d5f84)",
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Activate My Free Trial
            </button>
            <button
              onClick={onClose}
              style={{
                width: "100%", padding: "12px 0", borderRadius: 12,
                border: "1px solid #e2e8f0", background: "transparent",
                color: "#718096", fontSize: 14, cursor: "pointer",
              }}
            >
              Maybe later
            </button>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #d4edda, #b8dfc9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 36,
            }}>
              ✓
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#0c1e30" }}>
              Trial Activated!
            </h2>
            <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>
              Your 3 sessions and 2 resume builds are ready. 
            </p>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}

// ── Stripe-Style Payment Modal ──
function PaymentModal({ onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return digits;
  };

  const validate = () => {
    const e = {};
    if (name.trim().length < 2) e.name = "Enter cardholder name";
    if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number";
    if (expiry.replace(/\s/g, "").length < 5) e.expiry = "Enter expiry (MM / YY)";
    if (cvv.length < 3) e.cvv = "Enter a valid CVV";
    if (zip.length < 4) e.zip = "Enter a valid ZIP / postal code";
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 14px", borderRadius: 8, fontSize: 14,
    border: errors[field] ? "1.5px solid #e53e3e" : "1.5px solid #e2e8f0",
    background: "#fafafa", color: "#2d3748", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
    fontFamily: "system-ui, sans-serif",
  });

  const labelStyle = {
    fontSize: 12, fontWeight: 600, color: "#4a5568",
    letterSpacing: "0.04em", textTransform: "uppercase",
    marginBottom: 6, display: "block",
  };

  const errorStyle = { fontSize: 11, color: "#e53e3e", marginTop: 4 };

  // Detect card brand from number
  const getCardBrand = () => {
    const num = cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "VISA";
    if (num.startsWith("5")) return "MC";
    if (num.startsWith("3")) return "AMEX";
    return null;
  };

  const brand = getCardBrand();

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20,
        width: "100%", maxWidth: 480,
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        overflow: "hidden",
        animation: "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {!success ? (
          <>
            {/* Stripe-style header */}
            <div style={{
              background: "linear-gradient(135deg, #0c1e30, #1a3a4a)",
              padding: "24px 28px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 4 }}>
                  Subscribing to
                </div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
                  Prepme Unlimited
                </div>
                <div style={{
                  color: "#c8f050", fontWeight: 700, fontSize: 26, marginTop: 4,
                }}>
                  $29<span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}> /month</span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.1)", border: "none",
                  borderRadius: "50%", width: 32, height: 32,
                  color: "#fff", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Form body */}
            <div style={{ padding: "28px 28px 24px" }}>
              {/* Security badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#f7fdf9", border: "1px solid #c6f0d8",
                borderRadius: 8, padding: "8px 12px", marginBottom: 24,
              }}>
                <LockIcon />
                <span style={{ fontSize: 12, color: "#4a7fa5", fontWeight: 500 }}>
                  Secured by Stripe · SSL encrypted · Cancel anytime
                </span>
              </div>

              {/* Cardholder name */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Cardholder name</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: null })); }}
                  style={inputStyle("name")}
                />
                {errors.name && <div style={errorStyle}>{errors.name}</div>}
              </div>

              {/* Card number */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Card number</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(formatCardNumber(e.target.value));
                      setErrors((p) => ({ ...p, cardNumber: null }));
                    }}
                    style={{ ...inputStyle("cardNumber"), paddingRight: 56 }}
                  />
                  {brand && (
                    <div style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      fontSize: 11, fontWeight: 700, color: "#4a7fa5",
                      background: "#e8f4fd", borderRadius: 4, padding: "2px 6px",
                    }}>
                      {brand}
                    </div>
                  )}
                </div>
                {errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}
              </div>

              {/* Expiry + CVV + ZIP row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div>
                  <label style={labelStyle}>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(formatExpiry(e.target.value));
                      setErrors((p) => ({ ...p, expiry: null }));
                    }}
                    style={inputStyle("expiry")}
                  />
                  {errors.expiry && <div style={errorStyle}>{errors.expiry}</div>}
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input
                    type="text"
                    placeholder="•••"
                    value={cvv}
                    maxLength={4}
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, ""));
                      setErrors((p) => ({ ...p, cvv: null }));
                    }}
                    style={inputStyle("cvv")}
                  />
                  {errors.cvv && <div style={errorStyle}>{errors.cvv}</div>}
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={zip}
                    maxLength={10}
                    onChange={(e) => {
                      setZip(e.target.value.replace(/[^0-9a-zA-Z]/g, ""));
                      setErrors((p) => ({ ...p, zip: null }));
                    }}
                    style={inputStyle("zip")}
                  />
                  {errors.zip && <div style={errorStyle}>{errors.zip}</div>}
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={loading}
                style={{
                  width: "100%", padding: "15px 0", borderRadius: 12, border: "none",
                  background: loading
                    ? "#9ab8ce"
                    : "linear-gradient(135deg, #4a7fa5, #2d5f84)",
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.2s",
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Processing…
                  </>
                ) : (
                  <><LockIcon /> Subscribe · $29/month</>
                )}
              </button>

              <p style={{ fontSize: 11, color: "#a0aec0", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
                By subscribing, you agree to our Terms of Service. Cancel anytime from your account settings.
              </p>
            </div>

            {/* Stripe branding footer */}
            <div style={{
              borderTop: "1px solid #f0f4f8",
              padding: "12px 28px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <LockIcon />
              <span style={{ fontSize: 11, color: "#a0aec0" }}>Powered by</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#635bff" }}>stripe</span>
            </div>
          </>
        ) : (
          /* Success state */
          <div style={{ padding: "56px 36px", textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #d4edda, #b8dfc9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 36, color: "#2f8a50",
            }}>
              ✓
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 700, color: "#0c1e30" }}>
              Payment Successful!
            </h2>
            <p style={{ fontSize: 15, color: "#718096", marginBottom: 24, lineHeight: 1.6 }}>
              Welcome to Prepme Unlimited. Your subscription is now active — enjoy unlimited sessions, resume builds, and more!
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "12px 32px", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg, #4a7fa5, #2d5f84)",
                color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}
            >
              Start Practicing →
            </button>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}

// ── Modal keyframes ──
const modalStyles = `
  @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUpModal {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

// ── Main PricingPage ──
export default function PricingPage({ onNavigate }) {
  const storedUser = JSON.parse(localStorage.getItem("prepme_user") || "{}");
const userEmail = storedUser?.email || "user@example.com";
  const [openFaq, setOpenFaq] = useState(null);
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const handleContactClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate("contact");
  };

  return (
    <div className="pricing-container">
      <style>{modalStyles}</style>

{showFreeModal && (
  <FreeTrialModal user={userEmail} onClose={() => setShowFreeModal(false)} />
)}
      {showPayModal && (
        <PaymentModal onClose={() => setShowPayModal(false)} />
      )}

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

      <div className="pricing-hero">
        <h1 className="pricing-hero-title">Simple, Transparent Pricing</h1>
        <p className="hero-desc">Start free, upgrade when you're ready</p>
      </div>

      <div className="pricing-cards-wrapper">
        <div className="pricing-cards">
          {/* Free Trial Card */}
          <div className="card free-card">
            <div className="whiteBadge">
              <SparklesIcon /> <SparklesIcon />
            </div>
            <div className="card-inner wh-card-inner">
              <h3 className="plan-name">Free Trial</h3>
              <p className="plan-description">Perfect for trying out the platform</p>
              <div className="plan-price">
                <span className="price-amount">$0</span>
                <span className="price-period"> forever</span>
              </div>
              <div className="card-divider" />
              <ul className="features-list">
                <li><CheckIcon /><span><strong>3</strong> free interview practice sessions</span></li>
                <li><CheckIcon /><span><strong>2</strong> free resume building credits</span></li>
                <li><CheckIcon /><span>Unlimited access to advice & tips library</span></li>
                <li><CheckIcon /><span>Basic question bank access</span></li>
                <li><CheckIcon /><span>Email support within 48 hours</span></li>
              </ul>
              <div className="card-actions">
                <p className="no-card-note">No credit card required</p>
                <button
                  className="btn-outline free-btn"
                  onClick={() => setShowFreeModal(true)}
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>

          {/* Unlimited Plan Card */}
          <div className="card featured-card">
            <div className="badge">
              <SparklesIcon /> MOST POPULAR <SparklesIcon />
            </div>
            <div className="card-inner featured-inner">
              <h3 className="plan-name featured-name">Unlimited</h3>
              <p className="plan-description">Everything you need to land your dream job</p>
              <div className="plan-price">
                <span className="price-amount">$29</span>
                <span className="price-period"> /month</span>
              </div>
              <div className="savings-badge">Save 20% with annual billing</div>
              <div className="card-divider featured-divider" />
              <ul className="features-list">
                <li><CheckIcon /><span><strong>Unlimited</strong> interview practice sessions</span></li>
                <li><CheckIcon /><span><strong>Unlimited</strong> resume building & downloads</span></li>
                <li><CheckIcon /><span>Full access to advice & tips library</span></li>
                <li><CheckIcon /><span>Complete premium question bank</span></li>
                <li><CheckIcon /><span>Advanced AI feedback & analytics</span></li>
                <li><CheckIcon /><span>Priority email support within 12 hours</span></li>
                <li><CheckIcon /><span>Interview recording & playback</span></li>
              </ul>
              <div className="card-actions">
                <button
                  className="btn-primary"
                  onClick={() => setShowPayModal(true)}
                >
                  Get Unlimited Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="pricing-faq-section">
        <h2 className="faq-title">Frequently asked questions</h2>
        <p className="faq-subtitle">
          Can't find what you're looking for?{" "}
          <button onClick={handleContactClick} className="faq-link">
            Contact our support team
          </button>
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
              {openFaq === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}