import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg-deep: #0a1628;
    --bg-card: #0f1e35;
    --bg-mid: #111f36;
    --lime: #C2D96F;
    --lime-soft: #b6cf5d;
    --violet: #7c6af7;
    --violet-deep: #6355d4;
    --white: #f0f4ff;
    --muted: #7a8fae;
    --glass-bg: rgba(255,255,255,0.88);
    --glass-border: rgba(255,255,255,0.6);
    --shadow-card: 0 8px 40px rgba(10,22,40,0.10);
    --shadow-hover: 0 16px 56px rgba(10,22,40,0.16);
    --radius-lg: 22px;
    --radius-md: 16px;
    --radius-sm: 10px;
  }

  .prepme-root {
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, #e8edf8 0%, #f0f4ff 40%, #e4e8f8 100%);
    min-height: 100vh;
    color: #1a2540;
    position: relative;
    overflow-x: hidden;
  }

  /* Ambient blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.22;
  }
  .blob-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, #7c6af7 0%, transparent 70%);
    top: -120px; left: -100px;
    animation: blobFloat1 9s ease-in-out infinite;
  }
  .blob-2 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, #C2D96F 0%, transparent 70%);
    top: 60%; right: -80px;
    animation: blobFloat2 11s ease-in-out infinite;
  }
  .blob-3 {
    width: 280px; height: 280px;
    background: radial-gradient(circle, #6355d4 0%, transparent 70%);
    bottom: 10%; left: 30%;
    animation: blobFloat3 13s ease-in-out infinite;
  }

  @keyframes blobFloat1 {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(40px, 30px) scale(1.08); }
  }
  @keyframes blobFloat2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(-30px, -20px) scale(1.05); }
  }
  @keyframes blobFloat3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(20px, 30px) scale(1.1); }
  }

  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px;
    height: 68px;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(124,106,247,0.10);
    box-shadow: 0 2px 24px rgba(10,22,40,0.06);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 22px;
    color: #1a2540;
    letter-spacing: -0.5px;
  }
  .nav-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--violet) 0%, var(--lime) 100%);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    box-shadow: 0 4px 16px rgba(124,106,247,0.35);
    animation: logoPulse 3s ease-in-out infinite;
  }
  @keyframes logoPulse {
    0%,100% { box-shadow: 0 4px 16px rgba(124,106,247,0.35); }
    50% { box-shadow: 0 4px 28px rgba(124,106,247,0.6); }
  }
  .nav-links {
    display: flex; align-items: center; gap: 32px;
    list-style: none;
  }
  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a:hover { color: #1a2540; }
  .nav-links a.active {
    color: var(--violet);
    font-weight: 600;
  }
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 2px;
    background: var(--violet);
    border-radius: 2px;
  }
  .nav-right {
    display: flex; align-items: center; gap: 14px;
  }
  .nav-notif {
    width: 38px; height: 38px;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(124,106,247,0.15);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    transition: all 0.2s;
  }
  .nav-notif:hover { background: white; box-shadow: 0 4px 16px rgba(124,106,247,0.15); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px;
    width: 8px; height: 8px;
    background: var(--lime-soft);
    border-radius: 50%;
    border: 2px solid white;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
  }
  .nav-profile {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(124,106,247,0.15);
    border-radius: 12px;
    padding: 6px 12px 6px 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nav-profile:hover { background: white; box-shadow: 0 4px 16px rgba(124,106,247,0.15); }
  .profile-avatar {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--violet) 0%, var(--lime) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: white; font-weight: 700;
  }
  .profile-name { font-size: 13px; font-weight: 600; color: #1a2540; }
  .profile-role { font-size: 11px; color: var(--muted); }
  .profile-caret { font-size: 10px; color: var(--muted); margin-left: 2px; }

  /* Main Layout */
  .main-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    padding: 28px 40px 40px;
    max-width: 1440px;
    margin: 0 auto;
    position: relative; z-index: 1;
  }

  /* Welcome Section */
  .welcome-section {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 24px;
  }
  .welcome-text h1 {
    font-family: 'Syne', sans-serif;
    font-size: 28px; font-weight: 700;
    color: #1a2540;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }
  .welcome-text h1 .emoji { display: inline-block; animation: wave 2s ease-in-out infinite; }
  @keyframes wave {
    0%,100% { transform: rotate(0deg); }
    25% { transform: rotate(18deg); }
    75% { transform: rotate(-10deg); }
  }
  .ai-insight {
    background: linear-gradient(90deg, rgba(124,106,247,0.10), rgba(194,217,111,0.10));
    border: 1px solid rgba(124,106,247,0.18);
    border-radius: 10px;
    padding: 10px 16px;
    display: flex; align-items: center; gap: 10px;
    max-width: 480px;
    margin-top: 8px;
  }
  .ai-dot { 
    width: 8px; height: 8px; border-radius: 50%; background: var(--lime-soft);
    flex-shrink: 0; animation: pulse 2s infinite;
  }
  .ai-insight p { font-size: 13px; color: #4a5a7a; font-weight: 400; line-height: 1.5; }
  .ai-insight strong { color: var(--violet); }

  /* Quick Stats */
  .quick-stats {
    display: flex; gap: 12px;
  }
  .stat-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: 14px 18px;
    min-width: 108px;
    box-shadow: var(--shadow-card);
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor: default;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
  .stat-label { font-size: 11px; color: var(--muted); font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 700; color: #1a2540;
    display: flex; align-items: baseline; gap: 2px;
  }
  .stat-unit { font-size: 12px; color: var(--muted); font-weight: 400; }
  .stat-badge {
    display: inline-flex; align-items: center; gap: 3px;
    background: rgba(194,217,111,0.2);
    color: #5a7e00;
    font-size: 10px; font-weight: 600;
    padding: 2px 7px; border-radius: 20px;
    margin-top: 4px;
  }

  /* Quick Action Cards */
  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 600;
    color: var(--muted);
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 14px;
  }
  .actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .action-card {
    background: rgba(255,255,255,0.80);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 22px;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }
  .action-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: var(--radius-lg);
  }
  .action-card:hover {
    transform: translateY(-6px) scale(1.012);
    box-shadow: var(--shadow-hover);
  }
  .action-card:hover::before { opacity: 1; }

  .action-card.primary {
    background: linear-gradient(135deg, #7c6af7 0%, #5a4ad4 100%);
    border-color: transparent;
    color: white;
    grid-column: span 2;
    display: flex; align-items: center; justify-content: space-between;
    padding: 26px 28px;
  }
  .action-card.primary::before {
    background: linear-gradient(135deg, #8f7fff 0%, #6a5ae4 100%);
  }
  .action-card.primary:hover { box-shadow: 0 20px 60px rgba(124,106,247,0.45); }

  .card-icon-wrap {
    width: 46px; height: 46px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 14px;
    transition: transform 0.3s;
  }
  .action-card:hover .card-icon-wrap { transform: scale(1.12) rotate(-4deg); }

  .card-icon-wrap.violet { background: rgba(124,106,247,0.15); }
  .card-icon-wrap.lime { background: rgba(194,217,111,0.2); }
  .card-icon-wrap.white { background: rgba(255,255,255,0.22); }

  .action-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700;
    color: #1a2540;
    margin-bottom: 4px;
  }
  .action-card.primary h3 { color: white; font-size: 20px; margin-bottom: 6px; }
  .action-card p { font-size: 13px; color: var(--muted); line-height: 1.5; }
  .action-card.primary p { color: rgba(255,255,255,0.75); font-size: 14px; }

  .action-cta {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 14px;
    font-size: 13px; font-weight: 600;
    color: var(--violet);
    transition: gap 0.2s;
  }
  .action-card:hover .action-cta { gap: 10px; }
  .action-card.primary .action-cta { color: white; }

  .primary-btn {
    background: rgba(255,255,255,0.22);
    border: 1.5px solid rgba(255,255,255,0.5);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px; font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.25s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .primary-btn:hover { background: rgba(255,255,255,0.35); transform: scale(1.03); }

  .card-decorative-orb {
    position: absolute;
    width: 130px; height: 130px;
    background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
    border-radius: 50%;
    top: -30px; right: -20px;
    pointer-events: none;
  }

  /* Continue Section */
  .continue-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 22px;
    box-shadow: var(--shadow-card);
    margin-bottom: 24px;
  }
  .continue-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .continue-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700; color: #1a2540;
  }
  .view-all { font-size: 12px; color: var(--violet); font-weight: 600; cursor: pointer; text-decoration: none; }
  .view-all:hover { text-decoration: underline; }

  .session-item {
    display: flex; align-items: center; gap: 16px;
    padding: 14px;
    background: rgba(248,250,255,0.9);
    border: 1px solid rgba(124,106,247,0.08);
    border-radius: var(--radius-md);
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.25s;
  }
  .session-item:last-child { margin-bottom: 0; }
  .session-item:hover { background: rgba(124,106,247,0.06); transform: translateX(4px); }
  .session-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .session-info { flex: 1; }
  .session-name { font-size: 13px; font-weight: 600; color: #1a2540; margin-bottom: 2px; }
  .session-meta { font-size: 11px; color: var(--muted); }
  .session-right { text-align: right; }
  .session-score {
    font-family: 'Syne', sans-serif;
    font-size: 18px; font-weight: 700; color: #1a2540;
  }
  .session-score .score-unit { font-size: 11px; color: var(--muted); font-weight: 400; }

  .progress-wrap { margin-top: 6px; }
  .progress-label {
    display: flex; justify-content: space-between;
    font-size: 11px; color: var(--muted);
    margin-bottom: 5px;
  }
  .progress-bar {
    height: 6px;
    background: rgba(124,106,247,0.12);
    border-radius: 10px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, var(--violet), var(--lime-soft));
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* SIDEBAR */
  .sidebar { display: flex; flex-direction: column; gap: 18px; }

  .sidebar-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-card);
  }
  .sidebar-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; color: #1a2540;
    margin-bottom: 4px;
  }

  /* AI Coach Card */
  .ai-coach-card {
    background: linear-gradient(135deg, #0f1e35 0%, #1a2e4a 100%);
    border-color: transparent;
  }
  .ai-coach-card h3 { color: white; }
  .coach-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .coach-avatar {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--violet) 0%, var(--lime) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 16px rgba(124,106,247,0.4);
    animation: logoPulse 3s ease-in-out infinite;
  }
  .coach-status { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .coach-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--lime-soft); animation: pulse 2s infinite; }
  .coach-status span { font-size: 11px; color: rgba(255,255,255,0.5); }
  .coach-message {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 13px; color: rgba(255,255,255,0.80);
    line-height: 1.6; margin-bottom: 14px;
  }
  .coach-message strong { color: var(--lime); }
  .coach-actions { display: flex; gap: 8px; }
  .coach-btn {
    flex: 1;
    padding: 9px;
    border-radius: 10px;
    font-size: 12px; font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .coach-btn.primary-c {
    background: var(--lime-soft);
    color: #1a2540;
  }
  .coach-btn.primary-c:hover { background: var(--lime); transform: scale(1.02); }
  .coach-btn.secondary-c {
    background: rgba(255,255,255,0.10);
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .coach-btn.secondary-c:hover { background: rgba(255,255,255,0.17); }

  /* Streak Card */
  .streak-card { text-align: center; }
  .streak-number {
    font-family: 'Syne', sans-serif;
    font-size: 56px; font-weight: 800;
    background: linear-gradient(135deg, var(--violet), var(--lime-soft));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1; margin: 8px 0 4px;
  }
  .streak-sub { font-size: 12px; color: var(--muted); margin-bottom: 14px; }
  .streak-days {
    display: flex; justify-content: center; gap: 6px;
  }
  .streak-day {
    width: 32px; height: 32px;
    border-radius: 9px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 600;
    transition: all 0.3s;
  }
  .streak-day.done { background: linear-gradient(135deg, var(--violet), var(--lime-soft)); color: white; box-shadow: 0 3px 12px rgba(124,106,247,0.3); }
  .streak-day.today { background: var(--lime-soft); color: #1a2540; box-shadow: 0 3px 12px rgba(194,217,111,0.4); animation: pulse 2s infinite; }
  .streak-day.upcoming { background: rgba(124,106,247,0.08); color: var(--muted); border: 1.5px dashed rgba(124,106,247,0.2); }
  .streak-day .day-label { font-size: 8px; margin-bottom: 1px; opacity: 0.7; }
  .streak-day .day-icon { font-size: 12px; }

  /* Leaderboard mini */
  .leaderboard-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
  .lb-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    transition: all 0.2s;
    cursor: pointer;
  }
  .lb-item:hover { background: rgba(124,106,247,0.05); }
  .lb-item.you { background: rgba(124,106,247,0.08); border: 1px solid rgba(124,106,247,0.15); }
  .lb-rank {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700;
    width: 22px; color: var(--muted);
    text-align: center;
  }
  .lb-rank.gold { color: #f0b429; }
  .lb-rank.silver { color: #a8b5c0; }
  .lb-rank.bronze { color: #c07a4a; }
  .lb-avatar {
    width: 28px; height: 28px; border-radius: 8px;
    font-size: 11px; display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: white;
  }
  .lb-name { flex: 1; font-size: 13px; font-weight: 500; color: #1a2540; }
  .lb-name .you-tag { font-size: 10px; color: var(--violet); margin-left: 5px; font-weight: 600; }
  .lb-score { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #1a2540; }

  /* Skill radar */
  .skills-list { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
  .skill-item {}
  .skill-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .skill-name { font-size: 12px; font-weight: 600; color: #2a3a5a; }
  .skill-pct { font-size: 12px; font-weight: 700; color: var(--violet); font-family: 'Syne', sans-serif; }
  .skill-bar { height: 5px; background: rgba(124,106,247,0.10); border-radius: 10px; overflow: hidden; }
  .skill-fill {
    height: 100%; border-radius: 10px;
    transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative; overflow: hidden;
  }
  .skill-fill::after {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: shimmer 2.5s infinite;
  }

  /* Upcoming */
  .upcoming-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
  .upcoming-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: rgba(248,250,255,0.9);
    border: 1px solid rgba(124,106,247,0.08);
    border-radius: var(--radius-sm);
    transition: all 0.2s;
  }
  .upcoming-item:hover { background: rgba(124,106,247,0.06); transform: translateX(3px); }
  .upcoming-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .upcoming-info { flex: 1; }
  .upcoming-title { font-size: 12px; font-weight: 600; color: #1a2540; margin-bottom: 1px; }
  .upcoming-time { font-size: 11px; color: var(--muted); }
  .upcoming-tag {
    font-size: 10px; font-weight: 600;
    padding: 3px 8px; border-radius: 6px;
  }

  /* Fade-in animation for cards */
  .fade-up {
    animation: fadeUp 0.6s cubic-bezier(0.34,1.1,0.64,1) both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.12s; }
  .d3 { animation-delay: 0.18s; }
  .d4 { animation-delay: 0.24s; }
  .d5 { animation-delay: 0.30s; }
  .d6 { animation-delay: 0.36s; }
  .d7 { animation-delay: 0.42s; }

  @media (max-width: 900px) {
    .main-layout { grid-template-columns: 1fr; }
    .actions-grid { grid-template-columns: 1fr; }
    .action-card.primary { grid-column: span 1; }
    .quick-stats { flex-wrap: wrap; }
    .welcome-section { flex-direction: column; gap: 12px; }
  }
`;

// const skills = [
//   { name: "System Design", pct: 78, color: "linear-gradient(90deg, #7c6af7, #9d90ff)" },
//   { name: "Data Structures", pct: 65, color: "linear-gradient(90deg, #6355d4, #7c6af7)" },
//   { name: "Behavioral", pct: 91, color: "linear-gradient(90deg, #b6cf5d, #C2D96F)" },
//   { name: "SQL & Databases", pct: 55, color: "linear-gradient(90deg, #7c6af7, #b6cf5d)" },
// ];

// const leaderboard = [
//   { rank: 1, name: "Arya S.", score: 9840, color: "#7c6af7", rankClass: "gold" },
//   { rank: 2, name: "David K.", score: 9210, color: "#6355d4", rankClass: "silver" },
//   { rank: 3, name: "Mia L.", score: 8870, color: "#b6cf5d", rankClass: "bronze" },
//   { rank: 7, name: "You", score: 7430, color: "#C2D96F", you: true },
// ];

const sessions = [
  { icon: "🎙️", name: "System Design Interview", type: "Mock Interview", score: 84, progress: 84, color: "#7c6af7", bg: "rgba(124,106,247,0.12)", time: "2h ago" },
  { icon: "🧠", name: "LeetCode Hard — DP", type: "Practice Questions", score: 3, scoreUnit: "/5 solved", progress: 60, color: "#b6cf5d", bg: "rgba(182,207,93,0.15)", time: "Yesterday" },
  { icon: "💬", name: "Behavioral Round", type: "Mock Interview", score: 91, progress: 91, color: "#6355d4", bg: "rgba(99,85,212,0.12)", time: "2 days ago" },
];

const upcoming = [
  { title: "Frontend Mock Interview", time: "Today, 3:00 PM", tag: "Live", tagBg: "rgba(194,217,111,0.2)", tagColor: "#5a7e00", dot: "#C2D96F" },
  { title: "DSA Practice Set #12", time: "Tomorrow, 10:00 AM", tag: "Auto", tagBg: "rgba(124,106,247,0.12)", tagColor: "#7c6af7", dot: "#7c6af7" },
  { title: "HR Behavioral Prep", time: "Wed, 2:00 PM", tag: "AI", tagBg: "rgba(99,85,212,0.12)", tagColor: "#6355d4", dot: "#6355d4" },
];

const streakDays = [
  { label: "M", done: true }, { label: "T", done: true }, { label: "W", done: true },
  { label: "T", done: true }, { label: "F", done: true }, { label: "S", today: true }, { label: "S", upcoming: true },
];

function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

export default function PrepmeDashboard() {
  const [progressVisible, setProgressVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setProgressVisible(true);
    }, { threshold: 0.2 });
    if (progressRef.current) observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="prepme-root">
        {/* Ambient blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-logo">
            <div className="nav-logo-icon">🧠</div>
            Prepme
          </div>
          <ul className="nav-links">
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Practice</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Roadmap</a></li>
            <li><a href="#">Community</a></li>
          </ul>
          <div className="nav-right">
            {/* <div className="nav-notif">🔔<div className="notif-dot" /></div> */}
            <div className="nav-profile">
              <div className="profile-avatar">AK</div>
              <div>
                <div className="profile-name">Alex Kim</div>
                <div className="profile-role">SWE Candidate</div>
              </div>
              <span className="profile-caret">▾</span>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main-layout"> 
          <div className="main-col">

            {/* Welcome */}
            <div className="welcome-section fade-up d1">
              <div className="welcome-text">
                <h1>Welcome back, Alex <span className="emoji">👋</span></h1>
                <div className="ai-insight">
                  <div className="ai-dot" />
                  <p>Your <strong>System Design</strong> score jumped +12% this week. Focus on <strong>Behavioral</strong> today — you're 3 sessions away from your next rank!</p>
                </div>
              </div>
              <div className="quick-stats">
                <div className="stat-card">
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value"><AnimatedNumber value={84} /><span className="stat-unit">%</span></div>
                  <div className="stat-badge">↑ +5%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Sessions</div>
                  <div className="stat-value"><AnimatedNumber value={47} /></div>
                  <div className="stat-badge">This month</div>
                </div>
                {/* <div className="stat-card">
                  <div className="stat-label">Global Rank</div>
                  <div className="stat-value">#<AnimatedNumber value={7} /></div>
                  <div className="stat-badge">↑ +3 spots</div>
                </div> */}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="section-label fade-up d2">⚡ Quick Actions</div>
            <div className="actions-grid fade-up d2">
              {/* Primary CTA */}
              {/* <div className="action-card primary">
                <div className="card-decorative-orb" />
                <div>
                  <div className="card-icon-wrap white" style={{ marginBottom: 10 }}>🎙️</div>
                  <h3>Start Mock Interview</h3>
                  <p>AI-powered real-time interview simulation with instant feedback & scoring.</p>
                  <div className="action-cta">Begin Session →</div>
                </div>
                <button className="primary-btn">▶ Launch Now</button>
              </div> */}

              <div className="action-card fade-up d3">
                <div className="card-icon-wrap violet">🧩</div>
                <h3>Practice Questions</h3>
                <p>Curated DSA, system design & behavioral sets, adaptive to your level.</p>
                <div className="action-cta" style={{ color: "var(--violet)" }}>Browse sets →</div>
              </div>

              <div className="action-card fade-up d3">
                <div className="card-icon-wrap lime">📊</div>
                <h3>View Analytics</h3>
                <p>Track growth, weak areas & interview readiness score in real time.</p>
                <div className="action-cta" style={{ color: "var(--violet)" }}>See reports →</div>
              </div>
            </div>

            {/* Continue Section */}
            <div className="continue-card fade-up d4" ref={progressRef}>
              <div className="continue-header">
                <h2>↩ Continue Where You Left Off</h2>
                <a href="#" className="view-all">View all →</a>
              </div>
              {sessions.map((s, i) => (
                <div className="session-item" key={i}>
                  <div className="session-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div className="session-info">
                    <div className="session-name">{s.name}</div>
                    <div className="session-meta">{s.type} · {s.time}</div>
                    <div className="progress-wrap" style={{ marginTop: 8, width: "100%" }}>
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{s.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{
                          width: progressVisible ? `${s.progress}%` : "0%",
                          background: `linear-gradient(90deg, ${s.color}, #C2D96F)`,
                          transitionDelay: `${i * 0.2}s`
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className="session-right">
                    <div className="session-score">
                      {s.score}<span className="score-unit">{s.scoreUnit || "%"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="sidebar">

            {/* AI Coach */}
            <div className="sidebar-card ai-coach-card fade-up d2">
              <div className="coach-header">
                <div className="coach-avatar">🤖</div>
                <div>
                  <h3>AI Coach</h3>
                  <div className="coach-status">
                    <div className="coach-status-dot" />
                    <span>Active now</span>
                  </div>
                </div>
              </div>
              <div className="coach-message">
                You've been <strong>killing it</strong> on behavioral questions! 🔥 Your next milestone is cracking a <strong>system design</strong> at FAANG level. Want a personalized drill?
              </div>
              <div className="coach-actions">
                <button className="coach-btn primary-c">Start Drill 🚀</button>
                <button className="coach-btn secondary-c">Ask Coach</button>
              </div>
            </div>

            {/* Streak */}
            <div className="sidebar-card streak-card fade-up d3">
              <div className="section-label" style={{ textAlign: "center", marginBottom: 0 }}>🔥 Daily Streak</div>
              <div className="streak-number"><AnimatedNumber value={5} /></div>
              <div className="streak-sub">day streak — keep it going!</div>
              <div className="streak-days">
                {streakDays.map((d, i) => (
                  <div key={i} className={`streak-day ${d.done ? "done" : d.today ? "today" : "upcoming"}`}>
                    <span className="day-label">{d.label}</span>
                    <span className="day-icon">{d.done ? "✓" : d.today ? "⚡" : "○"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            {/* <div className="sidebar-card fade-up d4">
              <h3>📈 Skill Breakdown</h3>
              <div className="skills-list">
                {skills.map((s, i) => (
                  <div className="skill-item" key={i}>
                    <div className="skill-row">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-pct">{s.pct}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{
                        width: progressVisible ? `${s.pct}%` : "0%",
                        background: s.color,
                        transitionDelay: `${i * 0.15}s`
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Leaderboard */}
            {/* <div className="sidebar-card fade-up d5">
              <h3>🏆 Leaderboard</h3>
              <ul className="leaderboard-list">
                {leaderboard.map((p, i) => (
                  <li key={i} className={`lb-item${p.you ? " you" : ""}`}>
                    <span className={`lb-rank ${p.rankClass || ""}`}>
                      {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : `#${p.rank}`}
                    </span>
                    <div className="lb-avatar" style={{ background: p.color }}>{p.name[0]}</div>
                    <span className="lb-name">{p.name}{p.you && <span className="you-tag">you</span>}</span>
                    <span className="lb-score">{p.score.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Upcoming */}
            <div className="sidebar-card fade-up d6">
              <h3>📅 Upcoming Sessions</h3>
              <div className="upcoming-list">
                {upcoming.map((u, i) => (
                  <div className="upcoming-item" key={i}>
                    <div className="upcoming-dot" style={{ background: u.dot }} />
                    <div className="upcoming-info">
                      <div className="upcoming-title">{u.title}</div>
                      <div className="upcoming-time">{u.time}</div>
                    </div>
                    <span className="upcoming-tag" style={{ background: u.tagBg, color: u.tagColor }}>{u.tag}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}