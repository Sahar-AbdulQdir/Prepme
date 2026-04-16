// home2.jsx - Final Updated Version
import React, { useEffect } from "react";
import "../styles/int.css";
import Footer from "../components/Footer";
import SplashCursor from "../components/splashCursor";
import {
  FiCode,
  FiShield,
  FiBarChart2,
  FiTool,
  FiGrid,
  FiFeather,
  FiDollarSign,
  FiBell,
  FiBriefcase,
  FiTarget,
  FiStar,
  FiList,
  FiCheckCircle,
  FiRefreshCw
} from "react-icons/fi";
import { VscLightbulbSparkle } from "react-icons/vsc";

const HomePage = ({ user, sessions = [], onRefresh }) => {
  // Debug logging - check what data is received
  useEffect(() => {
    console.log("HomePage received sessions:", sessions);
    console.log("Completed sessions:", sessions.filter(s => s.status === "completed"));
  }, [sessions]);
  
  // --- Derived data from sessions ---
  const completedSessions = sessions.filter(
    (s) => s.status === "completed" && s.evaluation?.overallScore != null
  );
  
  const overallScore =
    completedSessions.length > 0
      ? (
          completedSessions.reduce(
            (sum, s) => sum + s.evaluation.overallScore,
            0
          ) / completedSessions.length
        ).toFixed(1)
      : null;

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const recentSessions = sortedSessions.slice(0, 4);

  // Analytics aggregation
  const aggregateAnalytics = () => {
    if (completedSessions.length === 0) {
      return {
        topStrengths: [],
        topImprovements: [],
        topSuggestions: [],
        avgScore: null,
        totalCompleted: 0,
      };
    }
    const strengthFreq = new Map();
    const improvementFreq = new Map();
    const suggestionFreq = new Map();

    completedSessions.forEach((session) => {
      const evalData = session.evaluation;
      if (evalData.strengths) {
        evalData.strengths.forEach((s) => {
          const key = s.trim().toLowerCase();
          strengthFreq.set(key, (strengthFreq.get(key) || 0) + 1);
        });
      }
      if (evalData.improvements) {
        evalData.improvements.forEach((imp) => {
          const key = imp.trim().toLowerCase();
          improvementFreq.set(key, (improvementFreq.get(key) || 0) + 1);
        });
      }
      if (evalData.suggestions) {
        evalData.suggestions.forEach((sug) => {
          const key = sug.trim().toLowerCase();
          suggestionFreq.set(key, (suggestionFreq.get(key) || 0) + 1);
        });
      }
    });

    const getTop = (map, n) =>
      Array.from(map.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([text]) => text.charAt(0).toUpperCase() + text.slice(1));

    const avgScore =
      completedSessions.reduce((sum, s) => sum + s.evaluation.overallScore, 0) /
      completedSessions.length;

    return {
      topStrengths: getTop(strengthFreq, 3),
      topImprovements: getTop(improvementFreq, 3),
      topSuggestions: getTop(suggestionFreq, 2),
      avgScore: avgScore.toFixed(1),
      totalCompleted: completedSessions.length,
    };
  };

  const analytics = aggregateAnalytics();

  const getStatusBadge = (session) => {
    if (session.status === "completed") {
      return { label: "Completed", className: "status-completed" };
    }
    return { label: "In Progress", className: "status-progress" };
  };

  const getFieldIcon = (field) => {
    const icons = {
      "Software Development": <FiCode />,
      Cybersecurity: <FiShield />,
      Business: <FiBriefcase />,
      "Data Science": <FiBarChart2 />,
      "Product Management": <FiGrid />,
      "UX/UI Design": <FiFeather />,
      Finance: <FiDollarSign />,
      Marketing: <FiBell />,
    };
    return icons[field] || <FiBriefcase />;
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="home-wrapper">
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

      {/* Refresh button - only show if onRefresh is provided */}
      {onRefresh && (
        <button 
          className="btn-refresh" 
          onClick={onRefresh}
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            padding: '8px 16px',
            background: '#073B5A',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#0a4a6e'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#073B5A'}
        >
          <FiRefreshCw size={16} />
          Refresh Data
        </button>
      )}

      <div className="home-container">
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-greeting">
                Hello, {user?.name?.split(" ")[0] || "Guest"}! 👋
              </h1>
              <p className="hero-subtitle">
                Ready to sharpen your interview skills? Let's practice.
              </p>
            </div>
            {/* CTA Widget */}
            <div className="cta-widget">
              <div className="vidContainer">
                <video
                  className="cta-video-bg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/assets/images/cta-poster.jpg"
                >
                  <source src="/bgHero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="cta-overlay"></div>
              <div className="cta-content">
                <div className="cta-icon icon-circle">
                  <FiTarget />
                </div>
                <div>
                  <h3>Start a new practice interview</h3>
                  <p>Get real-time feedback and improve your performance</p>
                </div>
                <button
                  className="btn-start-practice"
                  onClick={() => handleNavigate("/tool")}
                >
                  Start Practice →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGETS ROW */}
        <div className="widgets-row">
          {/* Overall Score Card */}
          <div className="widget-card score-card">
            <div className="card-header">
              <span className="card-icon icon-circle">
                <FiStar />
              </span>
              <h3>Overall Score</h3>
            </div>
            <div className="score-display">
              {overallScore !== null ? (
                <>
                  <div className="big-score">{overallScore}</div>
                  <div className="score-max">/ 10</div>
                  <div className="score-sub">
                    from {completedSessions.length} completed interview
                    {completedSessions.length !== 1 && "s"}
                  </div>
                </>
              ) : (
                <div className="no-score">
                  <p>No completed interviews yet</p>
                  <p className="score-hint">
                    Complete a session to see your overall score
                  </p>
                </div>
              )}
            </div>
            {overallScore !== null && (
              <div className="score-trend">
                <div
                  className="trend-fill"
                  style={{ width: `${(overallScore / 10) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Recent Sessions Widget */}
          <div className="widget-card sessions-preview">
            <div className="card-header">
              <span className="card-icon icon-circle">
                <FiList />
              </span>
              <h3>Recent Sessions</h3>
            </div>
            <div className="sessions-list">
              {recentSessions.length > 0 ? (
                recentSessions.map((session) => {
                  const status = getStatusBadge(session);
                  const score = session.evaluation?.overallScore;
                  return (
                    <div key={session.id || session._id} className="session-preview-item">
                      <div className="session-preview-icon icon-circle">
                        {getFieldIcon(session.field)}
                      </div>
                      <div className="session-preview-info">
                        <div className="session-preview-title">
                          {session.title || `${session.field} Interview`}
                        </div>
                        <div className="session-preview-meta">
                          <span className="session-field">{session.field}</span>
                          <span className={`status-badge ${status.className}`}>
                            {status.label}
                          </span>
                          {score !== undefined && score !== null && (
                            <span className="session-score">{score}/10</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-sessions">
                  <p>No sessions yet</p>
                  <p className="empty-hint">
                    Start a practice interview to see it here
                  </p>
                </div>
              )}
            </div>
            <button
              className="btn-view-all"
              onClick={() => handleNavigate("/tool")}
            >
              Go to Practice →
            </button>
          </div>

          {/* Analytics Widget */}
          <div className="widget-card analytics-card">
            <div className="card-header">
              <span className="card-icon icon-circle">
                <FiBarChart2 />
              </span>
              <h3>Detailed Analysis</h3>
            </div>
            <div className="analytics-content">
              {analytics.totalCompleted > 0 ? (
                <>
                  <div className="analytics-stat">
                    <span className="stat-label">Avg. Score</span>
                    <span className="stat-value">{analytics.avgScore}/10</span>
                  </div>
                  {analytics.topStrengths.length > 0 && (
                    <div className="analytics-section">
                      <div className="section-title strengths-title">
                        <FiCheckCircle /> Key Strengths
                      </div>
                      <ul className="analytics-list">
                        {analytics.topStrengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analytics.topImprovements.length > 0 && (
                    <div className="analytics-section">
                      <div className="section-title improvements-title">
                        <FiTool /> Focus Areas
                      </div>
                      <ul className="analytics-list">
                        {analytics.topImprovements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analytics.topSuggestions.length > 0 && (
                    <div className="analytics-section">
                      <div className="section-title suggestions-title">
                        <VscLightbulbSparkle /> Top Suggestions
                      </div>
                      <ul className="analytics-list">
                        {analytics.topSuggestions.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="analytics-footer-note">
                    Based on {analytics.totalCompleted} completed interview
                    {analytics.totalCompleted !== 1 && "s"}
                  </div>
                </>
              ) : (
                <div className="empty-analytics">
                  <p>Complete your first interview to see detailed analytics</p>
                  <button
                    className="btn-start-analytics"
                    onClick={() => handleNavigate("/tool")}
                  >
                    Start First Interview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;