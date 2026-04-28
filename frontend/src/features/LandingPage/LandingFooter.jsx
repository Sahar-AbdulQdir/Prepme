// import React, { useState } from "react";
import React from "react";

import Logo from "../../assets/Images/Plogo.png";
// import { FaInstagram, FaTiktok } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import useNewsletter from "../../hooks/useNewsletter";
import NewsletterPopup from "../../components/ui/newsLettersPopup";
<link href="https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap" rel="stylesheet"></link>

// const FOOTER_LINKS = [
//   { label: "Features", href: "/#MainFeatures" },
//   { label: "Pricing", href: "/#LandingPrices" },
//   { label: "How it works", href: "/#how-it-works" },
//   { label: "Login", href: "/login" },
//   { label: "Media Press kit", href: "/press" },
// ];

const styles = {
  Landingfooter: {
    fontFamily: "Istok Web, sans-serif",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "clamp(40px, 6vw, 80px) clamp(16px, 6vw, 6vw) 25px",
    background: "linear-gradient(to right, #021520, #052739);",
  },

  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "clamp(30px, 5vw, 70px)",
    alignItems: "start",
  },

  /* ── LEFT ── */
  leftSection: {
    textAlign: "center",
  },

  logo: {
    width: "clamp(160px, 25vw, 220px)",
    marginBottom: "14px",
  },

  tagline: {
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.6,
    maxWidth: "320px",
    margin: "0 auto",
  },

  /* ── MIDDLE WRAPPER (2 COLUMNS) ── */
  middle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(20px, 4vw, 40px)",
  },

  columnTitle: {
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    color: "rgba(255,255,255,0.85)",
    marginBottom: "clamp(12px, 2vw, 14px)",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(8px, 1.5vw, 10px)",
  },

  link: {
    fontSize: "clamp(0.85rem, 1.8vw, 0.9rem)",
    color: "rgb(255, 255, 255)",
    textDecoration: "none",
    transition: "opacity 0.3s ease",
    ":hover": {
      opacity: 0.8,
    },
  },

  socials: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.8vw, 12px)",
  },

  socialItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "rgb(255, 255, 255)",
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "opacity 0.3s ease",
    ":hover": {
      opacity: 0.8,
    },
  },

  socialDot: {
    width: "clamp(28px, 5vw, 32px)",
    height: "clamp(28px, 5vw, 32px)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.08)",
    border: "2px solid rgb(255, 255, 255)",
  },

  /* ── RIGHT (NEWSLETTER) ── */
  ctaBox: {
    padding: "clamp(16px, 3vw, 22px)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  ctaText: {
    fontSize: "clamp(0.85rem, 1.8vw, 0.9rem)",
    color: "rgba(255,255,255,0.65)",
    marginBottom: "clamp(12px, 2vw, 14px)",
    lineHeight: 1.5,
  },

  inputRow: {
    display: "flex",
    gap: "clamp(8px, 1.5vw, 10px)",
    flexWrap: "wrap",
  },

  input: {
    flex: "1 1 180px",
    padding: "clamp(10px, 2vw, 11px) clamp(10px, 2vw, 12px)",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
  },

  button: {
    padding: "clamp(10px, 2vw, 11px) clamp(12px, 2.5vw, 14px)",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #C6F135, #9be22d)",
    color: "#000",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    whiteSpace: "nowrap",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(198, 241, 53, 0.3)",
    },
  },

  bottom: {
    textAlign: "center",
    marginTop: "clamp(35px, 6vw, 55px)",
    fontSize: "clamp(0.7rem, 1.3vw, 0.78rem)",
    color: "rgba(255,255,255,0.5)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: "clamp(14px, 2.5vw, 18px)",
  },

  // Media query styles (will be applied via JS)
  tablet: {
    inner: {
      gridTemplateColumns: "1fr",
      gap: "40px",
    },
    leftSection: {
      textAlign: "left",
    },
    tagline: {
      margin: "0",
    },
  },

  desktop: {
    inner: {
      gridTemplateColumns: "2fr 2fr 1.8fr",
    },
    leftSection: {
      textAlign: "left",
    },
    tagline: {
      margin: "0",
    },
  },
};

const LandingFooter = () => {
  // const [email, setEmail] = useState("");
  const {
  email,
  setEmail,
  subscribe,
  showPopup,
  setShowPopup,
} = useNewsletter();
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   console.log("Subscribing email:", email);
  //   setEmail("");
  // };

  const getResponsiveStyles = () => {
    if (windowWidth < 640) {
      return {
        inner: styles.inner,
        leftSection: { textAlign: "center" },
        tagline: { ...styles.tagline, margin: "0 auto" },
      };
    } else if (windowWidth < 968) {
      return {
        inner: { ...styles.inner, ...styles.tablet.inner },
        leftSection: styles.tablet.leftSection,
        tagline: styles.tablet.tagline,
      };
    } else {
      return {
        inner: { ...styles.inner, ...styles.desktop.inner },
        leftSection: styles.desktop.leftSection,
        tagline: styles.desktop.tagline,
      };
    }
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <footer style={styles.Landingfooter}>
      <div style={responsiveStyles.inner}>
        {/* ── LEFT ── */}
        <div style={responsiveStyles.leftSection}>
          <img src={Logo} alt="Prepme Logo" style={styles.logo} />
          <p style={responsiveStyles.tagline}>
            AI-powered Interview Coaching for the next generation of
            professionals.
          </p>
        </div>

        {/* ── MIDDLE (2 COLUMNS) ── */}
        {/* <div style={styles.middle}>
          <div>
            <div style={styles.columnTitle}>Explore</div>
            <div style={styles.links}>
              {FOOTER_LINKS.map((item) => (
                <Link key={item.label} to={item.href} style={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={styles.columnTitle}>Socials</div>
            <div style={styles.socials}>
              <a
                href="https://www.instagram.com/prepme.cc/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialItem}
                aria-label="Instagram"
              >
                <div style={styles.socialDot}>
                  <FaInstagram size={windowWidth < 640 ? 14 : 16} />
                </div>
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@prepme0"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialItem}
                aria-label="TikTok"
              >
                <div style={styles.socialDot}>
                  <FaTiktok size={windowWidth < 640 ? 14 : 16} />
                </div>
                Tiktok
              </a>
            </div>
          </div>
        </div> */}

        {/* ── RIGHT ── */}
        <div style={styles.ctaBox}>
          <div style={styles.columnTitle}>Join the Newsletter</div>
          <p style={styles.ctaText}>
            Weekly interview tips, AI insights, and career growth hacks.
          </p>

        <form onSubmit={subscribe} style={styles.inputRow}>
  <input
    style={styles.input}
    placeholder="Enter your email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button type="submit" style={styles.button}>
    Join
  </button>
</form>

<NewsletterPopup
  show={showPopup}
  email={email}
  onClose={() => setShowPopup(false)}
/>
        </div>
      </div>

      <div style={styles.bottom}>
        © 2026 Prepme. All rights reserved.
      </div>

      {/* Add responsive hover effects */}
      <style jsx>{`
        a:hover {
          opacity: 0.8 !important;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(198, 241, 53, 0.3);
        }
        @media (max-width: 640px) {
          .social-item span:last-child {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default LandingFooter;