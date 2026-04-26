// Setup.jsx - Updated with New Interview and Sessions views
import React, { useState, useEffect, useRef, useCallback } from "react";
import Interview from "./Interview";
import Sessions from "./Sessions";
import Evaluation from "./Evaluation";
import { api, authHeaders } from "../../services/api";
import "../../styles/global.css";

const Icon = ({ name, size = 20 }) => {
  const icons = {
    code: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    briefcase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    layers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" />
      </svg>
    ),
    pen: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    trendingUp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    megaphone: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    sprout: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      </svg>
    ),
    rocket: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    brain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.66z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.66z" />
      </svg>
    ),
    wrench: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    handshake: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      </svg>
    ),
    clipboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    ),
    arrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    pin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="17" x2="12" y2="22" /><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
      </svg>
    ),
    loader: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    list: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const FIELDS = [
  { id: "Software Development", icon: "code", desc: "Frontend, backend, fullstack, DevOps" },
  { id: "Cybersecurity", icon: "shield", desc: "Pen testing, SOC, threat analysis" },
  { id: "Business", icon: "briefcase", desc: "Management, strategy, operations" },
  { id: "Data Science", icon: "chart", desc: "ML, analytics, AI engineering" },
  { id: "Product Management", icon: "layers", desc: "Roadmaps, discovery, delivery" },
  { id: "UX/UI Design", icon: "pen", desc: "Research, prototyping, systems" },
  { id: "Finance", icon: "trendingUp", desc: "Banking, accounting, investment" },
  { id: "Marketing", icon: "megaphone", desc: "Growth, content, brand strategy" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner", sub: "Student or career changer", icon: "sprout" },
  { id: "intern", label: "Intern / Junior", sub: "0–2 years experience", icon: "rocket" },
  { id: "advanced", label: "Advanced", sub: "3+ years experience", icon: "star" },
];

const TYPES = [
  { id: "behavioral", label: "Behavioral", sub: "STAR method & soft skills", icon: "brain" },
  { id: "technical", label: "Technical", sub: "Domain knowledge & problem-solving", icon: "wrench" },
  { id: "hr", label: "HR Screening", sub: "Culture fit & motivations", icon: "handshake" },
  { id: "case study", label: "Case Study", sub: "Business analysis & frameworks", icon: "clipboard" },
];

const STEPS = [
  { num: "01", title: "Choose your field", key: "field" },
  { num: "02", title: "Experience level", key: "level" },
  { num: "03", title: "Interview type", key: "interviewType" },
  { num: "04", title: "Upload CV (Optional)", key: "cv" },
];

const CSS = `
  .setup-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(104px, 5vw, 48px) clamp(16px, 4vw, 24px) clamp(40px, 8vw, 80px);
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  }
  
  /* View Toggle Navigation */
  .view-toggle-nav {
    width: 100%;
    max-width: min(880px, 95vw);
    margin-bottom: clamp(26px, 4vw, 32px);
    display: flex;
    justify-content: center;
  }
  
  .view-toggle {
    display: flex;
    gap: 8px;
    background: white;
    padding: 6px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  
  .view-toggle-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #5a6e7a;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .view-toggle-btn:hover {
    background: #f8fafc;
    color: #073B5A;
  }
  
  .view-toggle-btn.active {
    background: #073B5A;
    color: white;
  }
  
  .view-badge {
    background: #AA7BD9;
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 12px;
    margin-left: 4px;
  }
  
  /* Hero Section - Responsive */
  .setup-hero { 
    text-align: center; 
    max-width: min(540px, 90vw); 
    margin-bottom: clamp(32px, 6vw, 56px); 
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(7, 59, 90, 0.1);
    border: 1px solid rgba(7, 59, 90, 0.2);
    color: #073B5A;
    font-family: 'Syne', sans-serif;
    font-size: clamp(10px, 2vw, 11px);
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: clamp(4px, 1vw, 5px) clamp(10px, 2vw, 12px);
    border-radius: 99px;
    margin-bottom: clamp(16px, 3vw, 22px);
  }
  
  .hero-badge-dot {
    width: clamp(5px, 1vw, 6px); 
    height: clamp(5px, 1vw, 6px);
    border-radius: 50%;
    background: #AA7BD9;
    animation: pulse-dot 2s ease-in-out infinite;
  }
  
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }
  
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 6vw, 42px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #073B5A;
    margin-bottom: clamp(12px, 2vw, 14px);
  }
  
  .hero-title em {
    font-style: normal;
    background: linear-gradient(135deg, #073B5A, #AA7BD9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-sub {
    font-size: clamp(13px, 2.5vw, 15px);
    color: #5a6e7a;
    line-height: 1.6;
    padding: 0 clamp(8px, 2vw, 16px);
  }
  
  /* Progress Dots - Responsive */
  .progress-dots { 
    display: flex; 
    gap: clamp(4px, 1.5vw, 6px); 
    justify-content: center; 
    margin-bottom: clamp(16px, 3vw, 20px);
    flex-wrap: wrap;
  }
  
  .progress-dot { 
    height: clamp(3px, 0.8vw, 4px); 
    border-radius: 99px; 
    transition: all 0.35s; 
    background: #e2e8f0; 
  }
  
  .progress-dot.active { 
    width: clamp(20px, 4vw, 24px); 
    background: #AA7BD9; 
  }
  
  .progress-dot.done { 
    width: clamp(12px, 2.5vw, 14px); 
    background: #C3DA70; 
  }
  
  .progress-dot.pending { 
    width: clamp(12px, 2.5vw, 14px); 
  }
  
  /* Steps Container - Responsive */
  .steps-track-wrapper { 
    width: 100%; 
    max-width: min(880px, 95vw); 
    position: relative; 
  }
  
  .steps-scroll {
    display: flex;
    gap: clamp(12px, 3vw, 20px);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding-bottom: 12px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  
  .steps-scroll::-webkit-scrollbar { display: none; }
  
  /* Step Panels - Responsive */
  .step-panel {
    flex: 0 0 clamp(280px, 85vw, 440px);
    scroll-snap-align: start;
    background: white;
    border: 1.5px solid #e2e8f0;
    border-radius: clamp(14px, 3vw, 18px);
    padding: clamp(20px, 4vw, 28px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    transition: all 0.22s ease;
  }
  
  @media (min-width: 768px) {
    .step-panel {
      flex: 0 0 440px;
    }
  }
  
  .step-panel.locked { opacity: 0.38; pointer-events: none; }
  .step-panel.done { border-color: #C3DA70; }
  .step-panel.active { border-color: #AA7BD9; box-shadow: 0 8px 32px rgba(170,123,217,0.1); }
  
  /* Step Header - Responsive */
  .step-header { 
    display: flex; 
    align-items: center; 
    gap: clamp(8px, 2vw, 12px); 
    margin-bottom: clamp(16px, 3vw, 22px); 
  }
  
  .step-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(10px, 2vw, 11px);
    font-weight: 700;
    color: #AA7BD9;
    background: rgba(170,123,217,0.1);
    border: 1px solid rgba(170,123,217,0.2);
    padding: clamp(2px, 0.5vw, 3px) clamp(6px, 1.5vw, 8px);
    border-radius: 6px;
  }
  
  .step-title { 
    font-family: 'Syne', sans-serif; 
    font-size: clamp(14px, 2.5vw, 16px); 
    font-weight: 700; 
    color: #073B5A; 
    flex: 1; 
  }
  
  .step-check { 
    width: clamp(20px, 4vw, 22px); 
    height: clamp(20px, 4vw, 22px); 
    border-radius: 50%; 
    background: #C3DA70; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: #073B5A; 
  }
  
  /* Field Grid - Responsive */
  .field-grid { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: clamp(6px, 1.5vw, 8px); 
  }
  
  @media (min-width: 480px) {
    .field-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .field-btn {
    display: flex;
    align-items: flex-start;
    gap: clamp(8px, 2vw, 10px);
    padding: clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 14px);
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: clamp(10px, 2vw, 12px);
    cursor: pointer;
    transition: all 0.2s;
    min-height: 44px;
    touch-action: manipulation;
  }
  
  @media (hover: hover) {
    .field-btn:hover { 
      border-color: #AA7BD9; 
      transform: translateY(-2px); 
    }
  }
  
  .field-btn.selected { 
    border-color: #AA7BD9; 
    background: rgba(170,123,217,0.08); 
  }
  
  .field-btn:active {
    transform: scale(0.98);
  }
  
  .field-icon-wrap {
    width: clamp(30px, 6vw, 34px); 
    height: clamp(30px, 6vw, 34px);
    border-radius: clamp(8px, 1.5vw, 9px);
    background: white;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #073B5A;
    flex-shrink: 0;
  }
  
  .field-text {
    flex: 1;
    min-width: 0;
  }
  
  .field-name { 
    font-size: clamp(11.5px, 2vw, 12.5px); 
    font-weight: 600; 
    color: #073B5A; 
    display: block;
    margin-bottom: 2px;
  }
  
  .field-desc { 
    font-size: clamp(9.5px, 1.8vw, 10.5px); 
    color: #5a6e7a; 
    display: block;
    line-height: 1.3;
  }
  
  /* Option Grid - Responsive */
  .option-grid { 
    display: flex; 
    flex-direction: column; 
    gap: clamp(6px, 1.5vw, 8px); 
  }
  
  .option-btn {
    display: flex;
    align-items: center;
    gap: clamp(10px, 2vw, 14px);
    padding: clamp(12px, 2.5vw, 14px) clamp(14px, 3vw, 16px);
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: clamp(10px, 2vw, 12px);
    cursor: pointer;
    transition: all 0.2s;
    min-height: 44px;
    touch-action: manipulation;
  }
  
  @media (hover: hover) {
    .option-btn:hover { 
      border-color: #AA7BD9; 
      transform: translateX(3px); 
    }
  }
  
  .option-btn.selected { 
    border-color: #AA7BD9; 
    background: rgba(170,123,217,0.08); 
  }
  
  .option-btn:active {
    transform: scale(0.99);
  }
  
  .option-icon-wrap {
    width: clamp(36px, 7vw, 40px); 
    height: clamp(36px, 7vw, 40px);
    border-radius: clamp(9px, 2vw, 11px);
    background: white;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #073B5A;
    flex-shrink: 0;
  }
  
  .option-content {
    flex: 1;
    min-width: 0;
  }
  
  .option-label { 
    font-size: clamp(13px, 2.2vw, 14px); 
    font-weight: 600; 
    color: #073B5A; 
    display: block;
    margin-bottom: 2px;
  }
  
  .option-sub { 
    font-size: clamp(10.5px, 1.8vw, 11.5px); 
    color: #5a6e7a; 
    display: block;
    line-height: 1.3;
  }
  
  .option-selected-dot {
    margin-left: auto;
    width: clamp(6px, 1.5vw, 8px);
    height: clamp(6px, 1.5vw, 8px);
    border-radius: 50%;
    background: #AA7BD9;
    flex-shrink: 0;
  }
  
  /* CV Upload - Responsive */
  .cv-upload-area {
    border: 2px dashed #cbd5e1;
    border-radius: clamp(10px, 2vw, 12px);
    padding: clamp(20px, 4vw, 24px);
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: #f8fafc;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    touch-action: manipulation;
  }
  
  @media (hover: hover) {
    .cv-upload-area:hover { 
      border-color: #AA7BD9; 
      background: rgba(170,123,217,0.05); 
    }
  }
  
  .cv-upload-area:active {
    transform: scale(0.99);
  }
  
  .cv-upload-area p {
    font-size: clamp(13px, 2.2vw, 14px);
    margin-top: clamp(6px, 1.5vw, 8px);
  }
  
  .cv-file-info {
    margin-top: clamp(10px, 2vw, 12px);
    padding: clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 12px);
    background: #C3DA7020;
    border-radius: clamp(6px, 1.5vw, 8px);
    font-size: clamp(11px, 2vw, 12px);
    color: #073B5A;
    word-break: break-word;
  }
  
  /* Summary CTA - Responsive */
  .summary-cta { 
    max-width: min(880px, 95vw); 
    width: 100%; 
    margin-top: clamp(20px, 4vw, 28px); 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    gap: clamp(12px, 2.5vw, 16px); 
  }
  
  .summary-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(6px, 1.5vw, 10px);
    padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px);
    background: #C3DA7010;
    border: 1px solid #C3DA7040;
    border-radius: clamp(8px, 2vw, 10px);
    font-size: clamp(11.5px, 2vw, 13px);
    color: #5a6e7a;
  }
  
  .summary-tag {
    white-space: nowrap;
  }
  
  .summary-sep {
    color: #cbd5e1;
  }
  
  .start-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 1.5vw, 10px);
    padding: clamp(12px, 2.5vw, 15px) clamp(28px, 6vw, 36px);
    background: linear-gradient(135deg, #073B5A, #AA7BD9);
    border: none;
    border-radius: clamp(10px, 2vw, 12px);
    color: white;
    font-weight: 700;
    font-size: clamp(14px, 2.5vw, 16px);
    cursor: pointer;
    transition: all 0.2s;
    width: fit-content;
    min-width: 200px;
    min-height: 48px;
    touch-action: manipulation;
  }
  
  @media (max-width: 480px) {
    .start-btn {
      width: 100%;
      min-width: auto;
    }
  }
  
  @media (hover: hover) {
    .start-btn:hover:not(:disabled) { 
      transform: translateY(-2px); 
      filter: brightness(1.05); 
    }
  }
  
  .start-btn:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  .start-btn:disabled { 
    opacity: 0.35; 
    cursor: not-allowed; 
  }
  
  .spin { 
    animation: spin 1s linear infinite; 
  }
  
  @keyframes spin { 
    to { transform: rotate(360deg); } 
  }
  
  /* Touch-friendly improvements */
  @media (max-width: 768px) {
    button, .cv-upload-area {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    
    .steps-scroll {
      scroll-snap-stop: always;
    }
  }
  
  /* Landscape mode adjustments */
  @media (max-height: 600px) and (orientation: landscape) {
    .setup-root {
      padding: 120px 24px 20px;
    }
    
    .setup-hero {
      margin-bottom: 20px;
    }
    
    .hero-title {
      font-size: 24px;
    }
  }
`;

export default function Setup({ onStart, loading, onSessionComplete }) {
  const [view, setView] = useState("setup"); // "setup" or "sessions" or "interview" or "evaluation"
  const [field, setField] = useState("");
  const [level, setLevel] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [cvText, setCvText] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const scrollRef = useRef(null);
  const panelRefs = useRef([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const values = { field, level, interviewType };
  const setters = { field: setField, level: setLevel, interviewType: setInterviewType };

  const activeStep = !field ? 0 : !level ? 1 : !interviewType ? 2 : 3;
  const ready = field && level && interviewType;

  const scrollToStep = (idx) => {
    const el = panelRefs.current[idx];
    if (el && scrollRef.current) {
      const track = scrollRef.current;
      const targetLeft = el.offsetLeft - track.offsetLeft - 20;
      track.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  };

  const handleSelect = (stepKey, value, stepIdx) => {
    setters[stepKey](value);
    if (stepIdx < 2) setTimeout(() => scrollToStep(stepIdx + 1), 180);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCvFileName(file.name);
    const text = await file.text();
    setCvText(text);
  };

  const stepStatus = (idx) => {
    if (idx === 0) return field ? "done" : activeStep === 0 ? "active" : "locked";
    if (idx === 1) return level ? "done" : activeStep === 1 ? "active" : "locked";
    if (idx === 2) return interviewType ? "done" : activeStep === 2 ? "active" : "locked";
    return "active";
  };

  // Fetch sessions
  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch(api.sessions, {
        headers: authHeaders(),
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Start session
  const startSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(api.sessions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ field, level, interviewType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActiveSession(data.session);
      fetchSessions();
      setView("interview");
    } catch (err) {
      setError(err.message || "Failed to start interview.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const sendMessage = async (sessionId, userMessage) => {
    const res = await fetch(api.interview, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ sessionId, userMessage }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setActiveSession(data.session);
    fetchSessions();

    if (data.evaluation) {
      setEvaluation(data.evaluation);
      setView("evaluation");
      
      if (onSessionComplete) {
        onSessionComplete();
      }
    }

    return data;
  };

  // Load session
  const loadSession = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(api.sessionById(id), {
        headers: authHeaders(),
      });

      const data = await res.json();
      setActiveSession(data);

      if (data.evaluation) {
        setEvaluation(data.evaluation);
        setView("evaluation");
      } else {
        setView("interview");
      }
    } catch (err) {
      setError("Failed to load session.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete session
  const deleteSession = async (id) => {
    try {
      const res = await fetch(api.sessionById(id), {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete session");

      await fetchSessions();
      
      if (onSessionComplete) {
        onSessionComplete();
      }

      if (activeSession?._id === id || activeSession?.id === id) {
        setActiveSession(null);
        setView("setup");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle end session
  const handleEndSession = async (sessionId) => {
    try {
      setIsLoading(true);

      const res = await fetch(api.sessionById(sessionId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActiveSession(data.session || null);
      setEvaluation(data.session?.evaluation || null);

      await fetchSessions();
      
      if (onSessionComplete) {
        onSessionComplete();
      }

      if (data.session?.evaluation) {
        setView("evaluation");
      } else {
        setView("sessions");
      }

    } catch (err) {
      setError(err.message || "Failed to end session");
    } finally {
      setIsLoading(false);
    }
  };

  // Render different views
  if (view === "interview" && activeSession) {
    return (
      <Interview
        session={activeSession}
        onSend={sendMessage}
        onEnd={handleEndSession}
        onBack={() => setView("setup")}
      />
    );
  }

  if (view === "sessions") {
    return (
      <Sessions
        sessions={sessions}
        onLoad={loadSession}
        onDelete={deleteSession}
        loading={isLoading}
      />
    );
  }

  if (view === "evaluation" && evaluation) {
    return (
      <Evaluation
        evaluation={evaluation}
        session={activeSession}
        onBack={() => setView("sessions")}
        onNewInterview={() => { setEvaluation(null); setView("setup"); }}
      />
    );
  }

  // Setup view
  return (
    <>
      <style>{CSS}</style>
      <div className="setup-root">
        {/* View Toggle Navigation */}
        <div className="view-toggle-nav">
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${view === "setup" ? "active" : ""}`}
              onClick={() => setView("setup")}
            >
              <Icon name="arrowRight" size={16} />
              New Interview
            </button>
            <button
              className={`view-toggle-btn ${view === "sessions" ? "active" : ""}`}
              onClick={() => setView("sessions")}
            >
              <Icon name="list" size={16} />
              Sessions
              {sessions.length > 0 && (
                <span className="view-badge">{sessions.length}</span>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="global-error" onClick={() => setError(null)}>
            ⚠ {error} <span>✕</span>
          </div>
        )}

        <div className="setup-hero">
          <div className="hero-badge"><span className="hero-badge-dot" />AI-Powered Interview Coach</div>
          <h1 className="hero-title">Practice interviews that<br /><em>actually prepare you.</em></h1>
          <p className="hero-sub">Industry-specific questions, real-time feedback, and adaptive follow-ups — tailored to your field and level.</p>
        </div>

        <div className="progress-dots">
          {STEPS.map((_, i) => (
            <div key={i} className={`progress-dot ${stepStatus(i) === "done" ? "done" : stepStatus(i) === "active" ? "active" : "pending"}`} />
          ))}
        </div>

        <div className="steps-track-wrapper">
          <div className="steps-scroll" ref={scrollRef}>
            {/* Step 1: Field */}
            <div ref={(el) => (panelRefs.current[0] = el)} className={`step-panel ${stepStatus(0)}`}>
              <div className="step-header"><span className="step-num">01</span><span className="step-title">Choose your field</span>{field && <span className="step-check"><Icon name="check" size={12} /></span>}</div>
              <div className="field-grid">
                {FIELDS.map((f) => (
                  <button key={f.id} className={`field-btn ${field === f.id ? "selected" : ""}`} onClick={() => handleSelect("field", f.id, 0)}>
                    <span className="field-icon-wrap"><Icon name={f.icon} size={16} /></span>
                    <span className="field-text"><span className="field-name">{f.id}</span><span className="field-desc">{f.desc}</span></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Level */}
            <div ref={(el) => (panelRefs.current[1] = el)} className={`step-panel ${stepStatus(1)}`}>
              <div className="step-header"><span className="step-num">02</span><span className="step-title">Experience level</span>{level && <span className="step-check"><Icon name="check" size={12} /></span>}</div>
              <div className="option-grid">
                {LEVELS.map((l) => (
                  <button key={l.id} className={`option-btn ${level === l.id ? "selected" : ""}`} onClick={() => handleSelect("level", l.id, 1)}>
                    <span className="option-icon-wrap"><Icon name={l.icon} size={18} /></span>
                    <span className="option-content"><span className="option-label">{l.label}</span><span className="option-sub">{l.sub}</span></span>
                    {level === l.id && <span className="option-selected-dot" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Interview Type */}
            <div ref={(el) => (panelRefs.current[2] = el)} className={`step-panel ${stepStatus(2)}`}>
              <div className="step-header"><span className="step-num">03</span><span className="step-title">Interview type</span>{interviewType && <span className="step-check"><Icon name="check" size={12} /></span>}</div>
              <div className="option-grid">
                {TYPES.map((t) => (
                  <button key={t.id} className={`option-btn ${interviewType === t.id ? "selected" : ""}`} onClick={() => handleSelect("interviewType", t.id, 2)}>
                    <span className="option-icon-wrap"><Icon name={t.icon} size={18} /></span>
                    <span className="option-content"><span className="option-label">{t.label}</span><span className="option-sub">{t.sub}</span></span>
                    {interviewType === t.id && <span className="option-selected-dot" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: CV Upload */}
            <div ref={(el) => (panelRefs.current[3] = el)} className="step-panel active">
              <div className="step-header"><span className="step-num">04</span><span className="step-title">Upload CV (Optional)</span>{cvText && <span className="step-check"><Icon name="check" size={12} /></span>}</div>
              <div className="cv-upload-area" onClick={() => document.getElementById("cv-upload").click()}>
                <Icon name="upload" size={32} />
                <p>Click to upload your CV (PDF or TXT)</p>
                <input id="cv-upload" type="file" accept=".pdf,.txt,.doc,.docx" style={{ display: "none" }} onChange={handleFileUpload} />
              </div>
              {cvFileName && <div className="cv-file-info">📄 {cvFileName}</div>}
            </div>
          </div>
        </div>

        <div className="summary-cta">
          {ready && (
            <div className="summary-bar">
              <Icon name="pin" size={14} />
              <span className="summary-tag">{field}</span><span className="summary-sep">·</span>
              <span className="summary-tag">{LEVELS.find((l) => l.id === level)?.label}</span><span className="summary-sep">·</span>
              <span className="summary-tag">{TYPES.find((t) => t.id === interviewType)?.label}</span>
              {cvText && <><span className="summary-sep">·</span><span className="summary-tag">CV uploaded</span></>}
            </div>
          )}
          <button 
            className={`start-btn ${isLoading ? "loading" : ""}`} 
            disabled={!ready || isLoading} 
            onClick={startSession}
          >
            {isLoading ? (
              <><span className="spin"><Icon name="loader" size={18} /></span> Starting Interview…</>
            ) : (
              <>Start Interview <Icon name="arrowRight" size={18} /></>
            )}
          </button>
        </div>
      </div>
    </>
  );
}