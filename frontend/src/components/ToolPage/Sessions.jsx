import React from "react";
import "../../styles/global.css";

const STATUS_COLORS = {
  active: { bg: "#dbeafe", text: "#1d4ed8", label: "In Progress" },
  completed: { bg: "#dcfce7", text: "#166534", label: "Completed" },
};

const FIELD_ICONS = {
  "Software Development": "⌨️",
  Cybersecurity: "🛡️",
  Business: "📊",
  "Data Science": "📈",
  "Product Management": "🧩",
  "UX/UI Design": "🎨",
  Finance: "💹",
  Marketing: "📣",
};

export default function Sessions({ sessions, onLoad, onDelete, loading }) {
  if (sessions.length === 0) {
    return (
      <div className="sessions empty">
        <div className="sessions-header">
          <h1>Interview Sessions</h1>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <h2>No sessions yet</h2>
          <p>Start a new interview to begin practicing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sessions">
      <div className="sessions-header">
        <div>
          <h1>Interview Sessions</h1>
          <p>{sessions.length} session{sessions.length !== 1 ? "s" : ""} recorded</p>
        </div>
      </div>

      <div className="sessions-grid">
        {sessions.map((s) => {
          const status = STATUS_COLORS[s.status] || STATUS_COLORS.active;
          const score = s.evaluation?.overallScore;

          return (
            <div key={s.id} className="session-card">
              <div className="session-card-top">
                <div className="session-field-icon">
                  {FIELD_ICONS[s.field] || "💼"}
                </div>
                <div className="session-info">
                  <h3>{s.title}</h3>
                  <div className="session-tags">
                    <span className="stag">{s.field}</span>
                    <span className="stag">{s.level}</span>
                    <span className="stag">{s.interviewType}</span>
                  </div>
                </div>
                <span
                  className="session-status"
                  style={{ background: status.bg, color: status.text }}
                >
                  {status.label}
                </span>
              </div>

              <div className="session-card-mid">
                <div className="session-stat">
                  <span className="stat-val">{Math.ceil(s.messageCount / 2)}</span>
                  <span className="stat-label">Q&A pairs</span>
                </div>
                {score != null && (
                  <div className="session-stat">
                    <span className="stat-val score-val">{score}/10</span>
                    <span className="stat-label">Overall score</span>
                  </div>
                )}
                <div className="session-stat">
                  <span className="stat-val date-val">
                    {new Date(s.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="stat-label">Last active</span>
                </div>
              </div>

              <div className="session-card-actions">
                <button
                  className="session-btn primary"
                  onClick={() => onLoad(s.id)}
                  disabled={loading}
                >
                  {s.status === "completed" ? "View Results" : "Continue →"}
                </button>
                <button
                  className="session-btn danger"
                  onClick={() => {
                    if (window.confirm(`Delete "${s.title}"?`)) onDelete(s.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}