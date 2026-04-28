// components/ui/MascotPopup.jsx
//
// A fixed bottom-left popup that invites the user to start the guided tour.
// Animates in on mount, auto-dismisses after 10 s, and marks the tour seen
// in localStorage immediately when "Start Tour" is clicked — so even if the
// user refreshes before completing the tour, we don't re-pester them.

import { useEffect, useRef } from "react";
import Mascot from "../../assets/Images/mascot2.png";

export default function MascotPopup({ visible, onStartTour, onClose }) {
  const timerRef = useRef(null);

  // Auto-dismiss after 10 s
  useEffect(() => {
    if (visible) {
      timerRef.current = setTimeout(onClose, 10_000);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, onClose]);

  if (!visible) return null;

  const handleStart = () => {
    clearTimeout(timerRef.current);
    // Mark as seen before the tour starts so a crash/refresh never re-shows it
    localStorage.setItem("seen_home_tour", "true");
    onStartTour();
  };

  return (
    <>
      <style>{`
        @keyframes mascotPopupIn {
          from { opacity: 0; transform: translateY(20px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      <div
        role="dialog"
        aria-label="Tour invitation"
        style={containerStyle}
      >
        <div style={bubbleStyle}>
          {/* Mascot */}
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <img
              src={Mascot}
              alt="PrepMate Mascot"
              draggable={false}
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
                objectFit: "cover",
                border: "2.5px solid #22c55e",
                boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
              }}
            />
          </div>

          <div style={titleStyle}>👋 Hey! I'm PrepMate</div>

          <div style={subtitleStyle}>
            Want a quick guided tour of your dashboard?
          </div>

          {/* Preview video */}
          <video
            src="/moscot.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={videoStyle}
          />

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button style={yesBtn} onClick={handleStart}>
              Start Tour 🚀
            </button>
            <button style={noBtn} onClick={onClose}>
              Not now
            </button>
          </div>

          {/* Auto-dismiss hint */}
          <div
            style={{
              marginTop: 10,
              textAlign: "center",
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "inherit",
            }}
          >
            Dismisses automatically in 10 s
          </div>
        </div>
      </div>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const containerStyle = {
  position: "fixed",
  bottom: 24,
  left: 24,
  zIndex: 9998, // below Tour's portal (99999) but above everything else
  animation: "mascotPopupIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
};

const bubbleStyle = {
  background: "linear-gradient(145deg, #1e293b, #0f172a)",
  color: "white",
  padding: "18px 18px 14px",
  borderRadius: 22,
  width: 278,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  boxShadow:
    "0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const titleStyle = {
  fontWeight: 700,
  fontSize: 16,
  textAlign: "center",
  marginBottom: 5,
  letterSpacing: "-0.2px",
};

const subtitleStyle = {
  fontSize: 13,
  marginBottom: 12,
  opacity: 0.75,
  textAlign: "center",
  lineHeight: 1.5,
};

const videoStyle = {
  width: "100%",
  borderRadius: 12,
  marginBottom: 14,
  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
  display: "block",
};

const yesBtn = {
  flex: 1,
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 13,
  fontFamily: "inherit",
  boxShadow: "0 3px 10px rgba(34,197,94,0.35)",
  transition: "all 0.2s ease",
};

const noBtn = {
  flex: 1,
  background: "linear-gradient(135deg, #334155, #1e293b)",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  color: "white",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: 13,
  fontFamily: "inherit",
  transition: "all 0.2s ease",
};