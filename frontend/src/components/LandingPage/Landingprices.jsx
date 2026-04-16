import React from "react";
import "../../styles/LandingPrices.css";

const CheckIcon = () => (
  <svg className="landing-check-svg" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 8L6.5 12L13.5 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparklesIcon = () => (
  <svg className="landing-sparkles-svg" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" />
  </svg>
);

export default function LandingCards() {
  return (
    <section className="landing-section">
      <div className="landing-container">
        {/* Heading */}
        <div className="landing-heading">
          <h2 className="landing-title">
            Choose Your <span className="landing-title-highlight">Path</span>
          </h2>
          <p className="landing-subtitle">
            Start free and upgrade anytime. No hidden fees.
          </p>
        </div>

        {/* Cards Container */}
        <div className="landing-cards-wrapper">
          {/* Free Trial Card */}
          <div className="landing-card landing-card-free">
            {/* <div className="landing-card-border"></div> */}
            
            <div className="landing-card-title-container">
              <h3 className="landing-card-title">Free Trial</h3>
              <p className="landing-card-paragraph">
                Perfect for exploring the platform
              </p>
            </div>
            
            <hr className="landing-line" />
            
            <div className="landing-price-container">
              <span className="landing-price-amount">$0</span>
              <span className="landing-price-period">/forever</span>
            </div>
            
            <ul className="landing-card-list">
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  <strong>3</strong> free interview sessions
                </span>
              </li>
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  <strong>1</strong> free resume credit
                </span>
              </li>
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Unlimited tips library
                </span>
              </li>
              {/* <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Basic question bank
                </span>
              </li> */}
              {/* <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Email support (48h)
                </span>
              </li> */}
            </ul>
            
            {/* <button className="landing-button landing-button-outline">
              Start Free Trial
            </button> */}
            <p className="landing-card-note">No credit card required</p>
          </div>

          {/* Unlimited Plan Card (Featured) */}
          <div className="landing-card landing-card-featured">
            {/* <div className="landing-card-border"></div> */}
            
            <div className="landing-badge">
              <SparklesIcon /> MOST POPULAR <SparklesIcon />
            </div>
            
            <div className="landing-card-title-container">
              <h3 className="landing-card-title landing-featured-title">Unlimited</h3>
              <p className="landing-card-paragraph">
                Everything to land your dream job
              </p>
            </div>
            
            <hr className="landing-line" />
            
            <div className="landing-price-container">
              <span className="landing-price-amount">$29</span>
              <span className="landing-price-period">/month</span>
            </div>
            <div className="landing-savings-badge">Save 20% annually</div>
            
            <ul className="landing-card-list">
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  <strong>Unlimited</strong> interview sessions
                </span>
              </li>
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  <strong>Unlimited</strong> resume building
                </span>
              </li>
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Full tips library access
                </span>
              </li>
              {/* <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Premium question bank
                </span>
              </li> */}
              <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Advanced AI feedback
                </span>
              </li>
              {/* <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Priority support (12h)
                </span>
              </li> */}
              {/* <li className="landing-card-list-item">
                <span className="landing-check">
                  <CheckIcon />
                </span>
                <span className="landing-list-text">
                  Interview recording
                </span>
              </li> */}
            </ul>
            
            {/* <button className="landing-button landing-button-primary">
              Get Unlimited Access
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}