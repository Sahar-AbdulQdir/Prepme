import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingNavbar.css";
import Logo from "../../assets/Images/Plogo.png";

const LandingNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="L-navbar scrollingUi">
      {/* Mobile Menu Button */}
      <button
        className={`L-hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Left Links - Desktop */}
      <div className="L-nav-left">
        <button onClick={() => scrollToSection("how-it-works")}>
          How it works
        </button>

        <button onClick={() => scrollToSection("MainFeatures")}>
          Features
        </button>

        <button onClick={() => scrollToSection("features")}>
          Industries Covered
        </button>

        <button onClick={() => scrollToSection("LandingPrices")}>
          Pricing
        </button>
      </div>

      {/* Center Logo */}
      <div className="L-nav-logo">
        <img
          src={Logo}
          alt="Prepme Logo"
          onClick={() => handleNavigate("/")}
        />
      </div>

      {/* Right Section - Desktop */}
      <div className="L-nav-right">
        {!user ? (
          <>
            <button
              className="L-login-link"
              onClick={() => handleNavigate("/login?mode=signin")}
            >
              Log In
            </button>

            <button
              className="L-glow-on-hover L-signup"
              onClick={() => handleNavigate("/login?mode=signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            className="L-dashboard-btn"
            onClick={() => handleNavigate("/tool")}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`L-mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="L-mobile-menu-content">
          <button onClick={() => scrollToSection("how-it-works")}>
            How it works
          </button>

          <button onClick={() => scrollToSection("MainFeatures")}>
            Features
          </button>

          <button onClick={() => scrollToSection("features")}>
            Industries Covered
          </button>

          <button onClick={() => scrollToSection("LandingPrices")}>
            Pricing
          </button>

          <div className="L-mobile-auth">
            {!user ? (
              <>
                <button onClick={() => handleNavigate("/login?mode=signin")}>
                  Log In
                </button>

                <button
                  className="L-glow-on-hover L-mobile-signup"
                  onClick={() => handleNavigate("/login?mode=signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="L-mobile-dashboard"
                onClick={() => handleNavigate("/tool")}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;