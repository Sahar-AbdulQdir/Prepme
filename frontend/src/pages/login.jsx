import React, { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import SplashCursor from "../components/effects/splashCursor";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
// ── change this to your deployed API URL in production ──
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'DM Sans', sans-serif; min-height: 100vh; }

.lp-wrap {
  display: flex; min-height: 100vh; overflow: hidden;
  padding: 16px; gap: 16px; background: #ffffff;
}

.lp-left {
  width: 50%; border-radius: 20px; overflow: hidden;
  position: relative; display: flex; flex-direction: column;
  justify-content: space-between; padding: 36px;
  background: linear-gradient(-45deg, #060e18, #0d2137, #091929, #122f45, #060e18);
  background-size: 400% 400%;
  animation: gradMove 12s ease infinite; color: white;
}
@keyframes gradMove {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.lp-left::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 70%, rgba(20,100,180,0.18) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(0,60,120,0.15) 0%, transparent 50%);
  pointer-events: none; animation: auraShift 8s ease infinite alternate;
}
@keyframes auraShift {
  0%   { opacity: 0.6; transform: scale(1); }
  100% { opacity: 1;   transform: scale(1.05); }
}
.lp-logo {
  position: relative; z-index: 1; display: flex;
  align-items: center; gap: 10px; animation: fadeUp 0.7s ease both;
}
.lp-logo-text {
  font-family: 'Sora', sans-serif; font-size: 18px;
  font-weight: 600; letter-spacing: -0.5px; opacity: 0.9;
}
.lp-left-body { position: relative; z-index: 1; animation: fadeUp 0.8s 0.2s ease both; }
.lp-eyebrow {
  font-size: 11px; font-weight: 500; letter-spacing: 2.5px;
  text-transform: uppercase; opacity: 0.45; margin-bottom: 14px;
}
.lp-headline {
  font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 600;
  line-height: 1.35; letter-spacing: -0.8px; margin-bottom: 28px;
}

.lp-right {
  flex: 1; background: #ffffff; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  padding: 40px 32px; animation: fadeIn 0.6s 0.1s ease both;
}
.lp-form { width: 100%; max-width: 460px; }

.lp-star {
  color: #0d2137; margin-bottom: 6px;
  animation: spin 20s linear infinite; display: inline-block; transform-origin: center;
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.lp-title {
  font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 600;
  letter-spacing: -0.9px; color: #0d1f2d; margin-bottom: 10px;
  transition: opacity 0.25s ease;
  word-break: break-word;
}
.lp-sub {
  font-size: 15px; color: #8a96a3; line-height: 1.65; margin-bottom: 32px;
  transition: opacity 0.25s ease;
}

.lp-field { margin-bottom: 20px; }

.lp-label {
  font-size: 14px; font-weight: 500; color: #4a5568;
  margin-bottom: 8px; display: block; letter-spacing: 0.2px;
}
.lp-input-wrap { position: relative; display: flex; align-items: center; }
.lp-input-icon {
  position: absolute; left: 13px; color: #b0b8c4;
  display: flex; align-items: center; pointer-events: none; transition: color 0.2s;
}
.lp-input {
  width: 100%; padding: 14px 16px 14px 44px; font-size: 15px;
  font-family: 'DM Sans', sans-serif; border: 1.5px solid #e8eaed;
  border-radius: 10px; background: #fafafa; color: #0d1f2d;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s; outline: none;
}
.lp-input:hover { border-color: #c5ccd4; background: #fff; }
.lp-input:focus {
  border-color: #0d2137; background: #fff;
  box-shadow: 0 0 0 3px rgba(13,33,55,0.08);
}
.lp-input.lp-input-error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229,62,62,0.1);
}
.lp-input-wrap:focus-within .lp-input-icon { color: #0d2137; }

.lp-eye {
  position: absolute; right: 13px; background: none; border: none;
  cursor: pointer; color: #b0b8c4; display: flex; align-items: center;
  padding: 4px; border-radius: 6px; transition: color 0.2s, background 0.2s;
}
.lp-eye:hover { color: #0d2137; background: #f0f2f4; }

/* Error banner */
.lp-error {
  background: #fff5f5; border: 1.5px solid #fed7d7; border-radius: 10px;
  padding: 12px 16px; margin-bottom: 20px; font-size: 14px; color: #c53030;
  display: flex; align-items: center; gap: 8px; animation: fadeUp 0.3s ease;
  word-break: break-word;
}

/* Success banner */
.lp-success {
  background: #f0fff4; border: 1.5px solid #9ae6b4; border-radius: 10px;
  padding: 12px 16px; margin-bottom: 20px; font-size: 14px; color: #276749;
  display: flex; align-items: center; gap: 8px; animation: fadeUp 0.3s ease;
  word-break: break-word;
}

.lp-btn {
  width: 100%; margin-top: 8px; padding: 16px 20px;
  background: #0d2137; color: white; border: none; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  gap: 8px; transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  letter-spacing: 0.1px; white-space: nowrap;
}
.lp-btn:hover:not(:disabled) {
  background: #122f45; transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(13,33,55,0.22);
}
.lp-btn:active:not(:disabled) { transform: translateY(0px); box-shadow: none; }
.lp-btn:disabled { opacity: 0.65; cursor: not-allowed; }
.lp-btn .btn-arrow { transition: transform 0.2s; }
.lp-btn:hover:not(:disabled) .btn-arrow { transform: translateX(3px); }

/* Spinner */
.lp-spinner {
  width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}

.lp-divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; }
.lp-divider-line { flex: 1; height: 1px; background: #e8eaed; }
.lp-divider-text { font-size: 12px; color: #a0aab4; white-space: nowrap; font-weight: 400; }

.lp-socials { display: flex; gap: 10px; flex-wrap: wrap; }
.lp-social-btn {
  flex: 1; min-width: 100px; padding: 13px 10px; border: 1.5px solid #e8eaed; background: white;
  border-radius: 10px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 8px; font-size: 14px;
  font-family: 'DM Sans', sans-serif; font-weight: 500; color: #3a4553;
  transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.lp-social-btn:hover {
  border-color: #c5ccd4; background: #f7f9fb;
  transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.07);
}
.lp-social-btn:active { transform: translateY(0); }
.lp-social-btn::after {
  content: attr(data-tooltip); position: absolute; bottom: -32px;
  left: 50%; transform: translateX(-50%);
  background: #0d2137; color: white; font-size: 11px; font-weight: 400;
  padding: 4px 8px; border-radius: 6px; white-space: nowrap;
  pointer-events: none; opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease; z-index: 10;
  font-family: 'DM Sans', sans-serif; letter-spacing: 0.2px;
}
.lp-social-btn:hover::after { opacity: 1; transform: translateX(-50%) translateY(-4px); }
.lp-social-label { font-size: 14px; }

.lp-footer { text-align: center; margin-top: 24px; font-size: 14.5px; color: #8a96a3; }
.lp-footer-link {
  color: #0d2137; font-weight: 600; cursor: pointer; position: relative;
  text-decoration: none; background: transparent !important; border: none !important;
  font-size: inherit; font-family: inherit; padding: 0;
}
.lp-footer-link::after {
  content: ''; position: absolute; bottom: -1px; left: 0;
  width: 0; height: 1.5px; background: #0d2137;
  transition: width 0.25s;
}
.lp-footer-link:hover::after { width: 100%; }

.lp-username-field {
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, margin-bottom 0.4s ease;
}
.lp-username-field.hidden { max-height: 0; opacity: 0; margin-bottom: 0; pointer-events: none; }
.lp-username-field.shown  { max-height: 120px; opacity: 1; margin-bottom: 20px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Tablet Responsive */
@media (max-width: 900px) {
  .lp-wrap {
    padding: 12px; gap: 12px;
  }
  
  .lp-left {
    padding: 28px 24px;
  }
  
  .lp-headline {
    font-size: 26px;
  }
  
  .lp-right {
    padding: 32px 24px;
  }
  
  .lp-title {
    font-size: 28px;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  body {
    min-height: 100vh;
  }
  
  .lp-wrap {
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    min-height: 100vh;
  }
  
  .lp-left {
    width: 100%;
    min-height: auto;
    padding: 28px 24px;
  }
  
  .lp-headline {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .lp-headline br {
    display: none;
  }
  
  .lp-right {
    padding: 32px 20px;
    flex: 1;
  }
  
  .lp-form {
    max-width: 100%;
  }
  
  .lp-title {
    font-size: 26px;
  }
  
  .lp-sub {
    font-size: 14px;
    margin-bottom: 24px;
  }
  
  .lp-socials {
    gap: 8px;
  }
  
  .lp-social-btn {
    padding: 12px 8px;
  }
  
  .lp-social-label {
    font-size: 13px;
  }
}

/* Small Mobile Responsive */
@media (max-width: 480px) {
  .lp-wrap {
    padding: 8px;
    gap: 8px;
  }
  
  .lp-left {
    padding: 24px 20px;
    border-radius: 16px;
  }
  
  .lp-logo-text {
    font-size: 16px;
  }
  
  .lp-eyebrow {
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }
  
  .lp-headline {
    font-size: 20px;
    line-height: 1.4;
  }
  
  .lp-right {
    padding: 24px 16px;
    border-radius: 16px;
  }
  
  .lp-title {
    font-size: 22px;
  }
  
  .lp-sub {
    font-size: 13px;
    margin-bottom: 20px;
  }
  
  .lp-label {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .lp-input {
    padding: 12px 16px 12px 40px;
    font-size: 14px;
  }
  
  .lp-input-icon {
    left: 12px;
  }
  
  .lp-btn {
    padding: 14px 20px;
    font-size: 15px;
  }
  
  .lp-social-btn {
    padding: 10px 8px;
    min-width: 80px;
  }
  
  .lp-social-btn::after {
    display: none;
  }
  
  .lp-social-label {
    font-size: 12px;
  }
  
  .lp-footer {
    margin-top: 20px;
    font-size: 13px;
  }
  
  .lp-star svg {
    width: 20px;
    height: 20px;
  }
}

/* Very Small Mobile */
@media (max-width: 360px) {
  .lp-socials {
    flex-direction: column;
  }
  
  .lp-social-btn {
    width: 100%;
  }
  
  .lp-btn {
    white-space: normal;
  }
  
  .lp-headline {
    font-size: 18px;
  }
}

/* Height-based responsiveness for landscape mode */
@media (max-height: 600px) and (orientation: landscape) {
  .lp-wrap {
    min-height: auto;
  }
  
  .lp-left {
    padding: 20px;
    min-height: 200px;
  }
  
  .lp-headline {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .lp-right {
    padding: 20px;
  }
  
  .lp-field {
    margin-bottom: 16px;
  }
  
  .lp-divider {
    margin: 16px 0;
  }
  
  .lp-footer {
    margin-top: 16px;
  }
}

/* Prevent zoom on input focus for iOS */
@media screen and (max-width: 768px) {
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    font-size: 16px;
  }
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .lp-eye {
    padding: 8px;
  }
  
  .lp-social-btn {
    padding: 14px 10px;
  }
  
  .lp-btn {
    padding: 16px 20px;
  }
}
`;

const GREETINGS = [
  (name) => `Hey, ${name}! 👋`,
  (name) => `Nice to meet you, ${name}!`,
  (name) => `Welcome aboard, ${name}!`,
  (name) => `Great to have you, ${name}!`,
  (name) => `Let's get started, ${name}!`,
];



// ── Icons ──────────────────────────────────────
const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" fill="#F25022"/>
    <rect x="13" y="2" width="9" height="9" fill="#7FBA00"/>
    <rect x="2" y="13" width="9" height="9" fill="#00A4EF"/>
    <rect x="13" y="13" width="9" height="9" fill="#FFB900"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <text x="12" y="12" textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="900" fontFamily="serif">✳</text>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function LoginPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [showPw, setShowPw]         = useState(false);
  const [isSignIn, setIsSignIn]     = useState(false);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [username, setUsername]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const greetingIndexRef            = useRef(0);

const sendWelcomeEmail = async (user) => {
  try {
    const firstName = user?.name?.trim().split(" ")[0] || "there";

    const greeting =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)](firstName);

    await emailjs.send(
      "service_pun7lni",
      "template_wnzm7jh",
      {
        to_name: user.name,
        user_email: user.email,
        greeting: greeting,
      },
      "IbRGONvwhFwrv-fQR"
    );
  } catch (err) {
    console.error("Email failed:", err);
  }
};



  useEffect(() => {
    const id = "lp-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }
  }, []);

  // Clear banners when switching mode
  useEffect(() => {
    setError("");
    setSuccessMsg("");
  }, [isSignIn]);

const getTitle = () => {
  if (isSignIn) return "Welcome back";

  const trimmed = username.trim();

  if (trimmed.length > 0) {
    const firstName = trimmed.split(" ")[0];

    const greeting =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)](firstName);

    return greeting;
  }

  return "Create an account";
};

  const getSub = () => {
    if (isSignIn)
      return "Sign in to continue your interview practice and track your progress.";
    if (username.trim().length > 0)
      return "You're almost in — just fill in your email and password to get started.";
    return "Expert coaching to help you ace your next interview. Stand out from the crowd with targeted, intelligent practice.";
  };

  // ── API call helpers ───────────────────────
  const register = async () => {
    const res = await fetch(api.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username.trim(),
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed.");
    return data; // { token, user }
  };

  const login = async () => {
    const res = await fetch(api.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed.");
    return data; // { token, user }
  };


  // ── Form submit ────────────────────────────
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleAuthAction = async () => {
    setError("");
    setSuccessMsg("");

    // Basic client-side validation
    if (!isSignIn && !username.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const data = isSignIn ? await login() : await register();
      
      if (!isSignIn) {
        sendWelcomeEmail(data.user);
      }

      // Persist token for subsequent API calls
      localStorage.setItem("prepme_token", data.token);
      localStorage.setItem("prepme_user", JSON.stringify(data.user));

      setSuccessMsg(
        isSignIn
          ? `Welcome back, ${data.user.name}! Redirecting…`
          : `Account created! Welcome, ${data.user.name}!`
      );

      // Give the success message a moment to show, then notify parent
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(data);
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    greetingIndexRef.current += 1;
    setIsSignIn((prev) => !prev);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  // Allow Enter key to submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleAuthAction();
  };

  return (
    <div className="lp-wrap">
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
      {/* ── Left panel ── */}
      <div className="lp-left">
        <div className="lp-logo">
  <span
    className="lp-logo-text"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/")}
  >
    PrepMe
  </span>
</div>
        <div className="lp-left-body">
          <p className="lp-eyebrow">AI Interview Coach</p>
          <h1 className="lp-headline">
            Access your personal AI interview <br />
            coach and start improving <br />
            today.
          </h1>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="lp-right">
        <div className="lp-form">
          <div className="lp-star"><StarIcon /></div>

          <h2 className="lp-title">{getTitle()}</h2>
          <p className="lp-sub">{getSub()}</p>

          {/* Error / Success banners */}
          {error      && <div className="lp-error">⚠ {error}</div>}
          {successMsg && <div className="lp-success">✓ {successMsg}</div>}

          {/* Name field — sign-up only */}
          <div className={`lp-username-field ${isSignIn ? "hidden" : "shown"}`}>
            <label className="lp-label">Your name</label>
            <div className="lp-input-wrap">
              <div className="lp-input-icon"><UserIcon /></div>
              <input
                className="lp-input"
                type="text"
                placeholder="e.g. Alex"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="lp-field">
            <label className="lp-label">Your email</label>
            <div className="lp-input-wrap">
              <div className="lp-input-icon"><MailIcon /></div>
              <input
                className="lp-input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="lp-field">
            <label className="lp-label">{isSignIn ? "Password" : "Create password"}</label>
            <div className="lp-input-wrap">
              <div className="lp-input-icon"><LockIcon /></div>
              <input
                className="lp-input"
                type={showPw ? "text" : "password"}
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button className="lp-eye" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button className="lp-btn" onClick={handleAuthAction} disabled={loading}>
            {loading ? (
              <><div className="lp-spinner" />{isSignIn ? "Signing in…" : "Creating account…"}</>
            ) : (
              <>{isSignIn ? "Sign in" : "Create account"}<span className="btn-arrow"><ArrowRightIcon /></span></>
            )}
          </button>

          {/* Social logins */}
          <div className="lp-divider">
            <div className="lp-divider-line" />
            <span className="lp-divider-text">Or continue with</span>
            <div className="lp-divider-line" />
          </div>

          <div className="lp-socials">
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <MicrosoftIcon />, label: "Microsoft" },
              { icon: <AppleIcon />, label: "Apple" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className="lp-social-btn"
                data-tooltip="We'll make it work soon!"
                onClick={() => alert("Coming soon! We'll make it work in future updates.")}
              >
                {icon}
                <span className="lp-social-label">{label}</span>
              </button>
            ))}
          </div>

          {/* Toggle mode */}
          <p className="lp-footer">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button className="lp-footer-link" onClick={toggleMode} disabled={loading}>
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}