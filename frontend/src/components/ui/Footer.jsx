import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import useNewsletter from "../../hooks/useNewsletter";
import NewsletterPopup from "./newsLettersPopup";
import Logo from "../../assets/Images/Plogo.png";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "Tips", path: "/advices" },
  { label: "Tool", path: "/tool" },
  { label: "Resume Builder", path: "/resume" },
  { label: "Pricing", path: "/pricing" },
];

export default function Footer() {
  const {
  email,
  setEmail,
  subscribe,
  showPopup,
  setShowPopup,
} = useNewsletter();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="nav_footer__inner">

            {/* BRAND */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img src={Logo} alt="Prepme Logo" />
              </Link>
              <p className="footer__tagline">
                AI-powered Interview Coaching
                <br />
                for the next generation of professionals.
              </p>
            </div>

            {/* LINKS */}
            <div className="footer__links">
              <p className="footer__col-heading">Explore</p>
              <div className="footer__links-group">
                {FOOTER_LINKS.map((link) => (
                  <Link key={link.label} to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* SOCIALS */}
            {/* <div className="footer__socials">
              <p className="footer__col-heading">Connect</p>
              <div className="socials-horizontal">
                <a
                  href="https://www.instagram.com/prepme.cc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaInstagram className="social-icon" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.tiktok.com/@prepme0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaTiktok className="social-icon" />
                  <span>TikTok</span>
                </a>
              </div>
            </div> */}

            {/* NEWSLETTER */}
            <div className="footer__newsletter">
              <p className="footer__col-heading">Newsletter</p>
              <p className="newsletter-text">Get the latest tips & updates</p>
         <form onSubmit={subscribe} className="newsletter-form">
  <input
    className="newsletter-input"
    placeholder="Enter your email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <button type="submit" className="newsletter-button">
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

          <div className="footer__divider"></div>

          <div className="footer__bottom">
            <p>© 2025 Prepme. All rights reserved.</p>
          </div>
        </div>
      </footer>
  
      {/* CSS */}
      <style>{`
        .footer {
          background: linear-gradient(135deg, #041522 0%, #163652 100%);
          padding: 80px 5vw 40px;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        /* Decorative top accent */
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c2d96f, #4a90e2, #c2d96f);
        }

        .footer__container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .nav_footer__inner {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 40px;
          margin-bottom: 0;
          justify-content: space-between;
          align-items: start;
        }

        /* BRAND */
        .footer__brand {
          flex-shrink: 0;
        }

        .footer__logo {
          display: inline-block;
        }

        .footer__logo img {
          width: 160px;
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          filter: brightness(1.05);
        }

        .footer__logo img:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .footer__tagline {
          font-size: 0.95rem;
          color: #a8bbd0;
          line-height: 1.6;
          max-width: 260px;
          font-weight: 400;
        }

        /* LINKS - Explore + links in one column */
        .footer__links {
          flex-shrink: 0;
          min-width: 140px;
        }

        .footer__links-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__col-heading {
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }

        .footer__col-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: #c2d96f;
          border-radius: 2px;
        }

        .footer__link {
          display: block;
          font-size: 0.9rem;
          color: #a8bbd0;
          transition: all 0.25s ease;
          text-decoration: none;
          font-weight: 500;
          white-space: nowrap;
        }

        .footer__link:hover {
          color: #c2d96f;
          transform: translateX(6px);
        }

        /* SOCIALS - HORIZONTAL LAYOUT (one row) */
        .footer__socials {
          flex-shrink: 0;
          min-width: 140px;
        }

        .socials-horizontal {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #a8bbd0;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .social-link:hover {
          color: #c2d96f;
          transform: translateY(-2px);
        }

        .social-icon {
          font-size: 1.2rem;
        }

        /* NEWSLETTER */
        .footer__newsletter {
          flex-shrink: 0;
          min-width: 250px;
          max-width: 300px;
        }

        .newsletter-text {
          font-size: 0.85rem;
          color: #a8bbd0;
          margin-bottom: 14px;
          font-weight: 400;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.9rem;
          color: #ffffff;
          outline: none;
          transition: all 0.25s ease;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }

        .newsletter-input::placeholder {
          color: #8aa0b5;
        }

        .newsletter-input:focus {
          border-color: #c2d96f;
          background: rgba(255, 255, 255, 0.12);
        }

        .newsletter-button {
          background: #c2d96f;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #021c2b;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: inherit;
          white-space: nowrap;
        }

        .newsletter-button:hover {
          background: #d4e88a;
          transform: translateY(-2px);
        }

        /* DIVIDER */
        .footer__divider {
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), rgba(194, 217, 111, 0.5), rgba(255, 255, 255, 0.2), transparent);
          margin: 40px 0 30px;
        }

        /* COPYRIGHT - at the bottom */
        .footer__bottom {
          text-align: center;
          padding: 10px 0 20px;
        }

        .footer__bottom p {
          font-size: 0.85rem;
          color: #8aa0b5;
          letter-spacing: 0.5px;
          font-weight: 400;
        }

        /* RESPONSIVE - Tablet */
        @media (max-width: 1024px) {
          .footer {
            padding: 60px 5vw 30px;
          }

          .nav_footer__inner {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 30px;
          }

          .footer__newsletter {
            max-width: 100%;
          }

          .footer__tagline {
            max-width: 100%;
          }
        }

        /* RESPONSIVE - Mobile Landscape */
        @media (max-width: 768px) {
          .footer {
            padding: 50px 5vw 25px;
          }

          .footer__logo img {
            width: 140px;
          }

          .footer__tagline {
            font-size: 0.9rem;
          }

          .footer__col-heading {
            font-size: 0.85rem;
            margin-bottom: 15px;
          }

          .footer__link {
            font-size: 0.85rem;
          }
          
          .social-link {
            font-size: 0.85rem;
          }

          .newsletter-input {
            padding: 10px 14px;
          }

          .newsletter-button {
            padding: 8px 16px;
          }

          .footer__divider {
            margin: 30px 0 25px;
          }
        }

        /* RESPONSIVE - Mobile Portrait */
        @media (max-width: 640px) {
          .nav_footer__inner {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .footer__brand {
            text-align: center;
          }

          .footer__tagline {
            text-align: center;
          }

          .footer__col-heading {
            text-align: center;
            display: block;
          }

          .footer__col-heading::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer__links-group {
            align-items: center;
          }

          .footer__link {
            white-space: normal;
          }
          
          .footer__link:hover {
            transform: translateX(0);
          }
          
          .socials-horizontal {
            flex-direction: row;
            justify-content: center;
            gap: 30px;
          }

          .footer__newsletter {
            text-align: center;
          }

          .newsletter-form {
            max-width: 400px;
            margin: 0 auto;
          }

          .footer__bottom p {
            font-size: 0.8rem;
          }
        }

        /* RESPONSIVE - Small Mobile */
        @media (max-width: 480px) {
          .footer {
            padding: 40px 5vw 20px;
          }

          .footer__logo img {
            width: 120px;
          }

          .footer__tagline {
            font-size: 0.85rem;
          }

          .socials-horizontal {
            gap: 20px;
          }

          .social-link span {
            display: none;
          }

          .social-icon {
            font-size: 1.5rem;
          }

          .newsletter-text {
            font-size: 0.8rem;
          }

          .newsletter-input {
            padding: 8px 12px;
            font-size: 0.85rem;
          }

          .newsletter-button {
            padding: 8px 14px;
            font-size: 0.8rem;
          }

          .footer__divider {
            margin: 25px 0 20px;
          }

          .footer__bottom p {
            font-size: 0.75rem;
          }
        }

        /* Ensure minimum width is removed */
        @media (min-width: 1300px) {
          .footer {
            min-width: auto;
          }
        }
      `}</style>
    </>
  );
}