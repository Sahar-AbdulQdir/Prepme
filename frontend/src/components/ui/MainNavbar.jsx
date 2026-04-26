import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainNavbar.css";
import Logo from "../../assets/Images/Plogo.png";
import {
  FaUserAstronaut,
  FaHome,
  FaToolbox,
  FaLightbulb,
  FaTags,
  FaBars,
  FaTimes
} from "react-icons/fa";

const MainNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstLetter =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const go = (path) => {
    if (!path) return;
    navigate(`/${path}`);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { id: "home2", label: "Home", icon: <FaHome />, tourTarget: "home" },
    { id: "tool", label: "Tool", icon: <FaToolbox />, tourTarget: "tool" },
    { id: "advices", label: "Tips", icon: <FaLightbulb />, tourTarget: "tips" },
    { id: "pricing", label: "Pricing", icon: <FaTags />, tourTarget: "pricing" },
    { id: "resume", label: "Resume Builder", icon: <FaUserAstronaut />, tourTarget: "resume" }
  ];
  
  return (
    <nav className="navbar scrollingUi">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Left Navigation - Desktop */}
      <div className="nav-left">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className="nav-link"
            data-tour={item.tourTarget}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Center Logo */}
      <div className="nav-logo">
        <img
          src={Logo}
          alt="Prepme Logo"
          onClick={() => go("home2")}
          className="logo-img"
        />
      </div>

      {/* Right Section - Profile */}
      <div className="nav-right">
        <div
          className="profile-icon"
          onClick={() => go("home2")}
          data-tour="profile"
        >
          <span className="profile-letter">{firstLetter}</span>
          <FaUserAstronaut className="profile-icon-bg" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <img src={Logo} alt="Prepme Logo" className="mobile-logo" />
          <button 
            className="mobile-menu-close"
            onClick={toggleMobileMenu}
          >
            <FaTimes />
          </button>
        </div>
        <div className="mobile-menu-items">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="mobile-nav-link"
              data-tour={item.tourTarget}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay background */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu} />
      )}
    </nav>
  );
};

export default MainNavbar;