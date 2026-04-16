// Evaluation.jsx
import React from "react";
import "../../styles/global.css";

function ScoreRing({ score }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const fill = (score / 10) * circ;
  const color = score >= 8 ? "#C3DA70" : score >= 6 ? "#f59e0b" : "#ef4444";

  return (
    <div className="score-ring-wrap">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={circ - fill} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="50" y="55" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>{score}</text>
      </svg>
      <span className="score-label">/ 10</span>
    </div>
  );
}

export default function Evaluation({ evaluation, session, onBack, onNewInterview }) {
  const { overallScore, summary, strengths = [], improvements = [], suggestions = [], questionScores = [] } = evaluation;
  const grade = overallScore >= 9 ? "Exceptional" : overallScore >= 7 ? "Strong" : overallScore >= 5 ? "Developing" : "Needs Work";

  return (
    <div className="evaluation" style={{ background: "white" }}>
      <div className="eval-header">
        <button className="back-btn" onClick={onBack}>← Sessions</button>
        <div className="eval-title-area">
          <h1 style={{ color: "#073B5A" }}>Interview Complete</h1>
          {session && <p>{session.field} · {session.level} · {session.interviewType}</p>}
        </div>
      </div>

      <div className="eval-hero">
        <ScoreRing score={overallScore} />
        <div className="eval-hero-text">
          <div className="eval-grade" style={{ color: "#AA7BD9" }}>{grade}</div>
          <p className="eval-summary">{summary}</p>
        </div>
      </div>

      <div className="eval-grid">
        <div className="eval-card green" style={{ borderTopColor: "#C3DA70" }}><h2>✅ Strengths</h2><ul>{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        <div className="eval-card orange" style={{ borderTopColor: "#f59e0b" }}><h2>🔧 Areas to Improve</h2><ul>{improvements.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        <div className="eval-card blue" style={{ borderTopColor: "#AA7BD9" }}><h2>💡 Actionable Suggestions</h2><ul>{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        {questionScores.length > 0 && (
          <div className="eval-card full">
            <h2>📋 Question Breakdown</h2>
            <div className="q-scores">
              {questionScores.map((q, i) => {
                const color = q.score >= 8 ? "#C3DA70" : q.score >= 6 ? "#f59e0b" : "#ef4444";
                return (
                  <div key={i} className="q-score-row">
                    <div className="q-num">Q{i + 1}</div>
                    <div className="q-text"><p className="q-question">{q.question}</p><p className="q-note">{q.note}</p></div>
                    <div className="q-score-badge" style={{ background: color + "20", color }}>{q.score}/10</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="eval-footer">
        <button className="eval-btn secondary" onClick={onBack}>View All Sessions</button>
        <button className="eval-btn primary" onClick={onNewInterview} style={{ background: "#073B5A" }}>Start New Interview →</button>
      </div>
    </div>
  );
}