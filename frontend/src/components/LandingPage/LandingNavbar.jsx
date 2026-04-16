import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingNavbar.css";
import Logo from "../../assets/Images/Plogo.png";
import { useState } from "react";


const LandingNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="L-navbar">
      {/* Mobile Menu Button */}
      <button 
        className={`L-hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Left Links - Desktop */}
      <div className="L-nav-left">
        <a onClick={() => scrollToSection("how-it-works")}>
          How it works
        </a>
        <a onClick={() => scrollToSection("MainFeatures")}>
          Features
        </a>
        <a onClick={() => scrollToSection("features")}>
          Industries Covered
        </a>
        <a onClick={() => scrollToSection("LandingPrices")}>
          Pricing
        </a>
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
            <a className="L-login-link" onClick={() => handleNavigate("/login")}>
              Log In
            </a>
            <button className="L-glow-on-hover L-signup" onClick={() => handleNavigate("/login")}>
              Sign Up
            </button>
          </>
        ) : (
          <button className="L-dashboard-btn" onClick={() => handleNavigate("/tool")}>
            Dashboard
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`L-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="L-mobile-menu-content">
          <a onClick={() => scrollToSection("how-it-works")}>
            How it works
          </a>
          <a onClick={() => scrollToSection("MainFeatures")}>
            Features
          </a>
          <a onClick={() => scrollToSection("features")}>
            Industries Covered
          </a>
          <a onClick={() => scrollToSection("LandingPrices")}>
            Pricing
          </a>
          
          <div className="L-mobile-auth">
            {!user ? (
              <>
                <a onClick={() => handleNavigate("/login")}>
                  Log In
                </a>
                <button className="L-glow-on-hover L-mobile-signup" onClick={() => handleNavigate("/login")}>
                  Sign Up
                </button>
              </>
            ) : (
              <button className="L-mobile-dashboard" onClick={() => handleNavigate("/tool")}>
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