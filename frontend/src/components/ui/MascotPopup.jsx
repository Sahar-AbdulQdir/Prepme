// components/MascotPopup.jsx - Works with Intro.js too
import { useEffect } from "react";
import Mascot from "../../assets/Images/mascot2.png";

export default function MascotPopup({ visible, onStartTour, onClose }) {
  // Auto-hide after 10 seconds if user doesn't respond
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const handleStart = () => {
    localStorage.setItem("seen_home_tour", "true");
    onStartTour();
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {/* Mascot Image */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src={Mascot}
            alt="PrepMate Mascot"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "30px",
              objectFit: "cover",
              border: "2px solid #22c55e",
            }}
          />
        </div>

        <div
          style={{
            fontWeight: "bold",
            marginBottom: "6px",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          👋 Hey! I'm PrepMate
        </div>

        <div
          style={{
            fontSize: "13px",
            marginBottom: "10px",
            opacity: 0.9,
            textAlign: "center",
          }}
        >
          Want a quick guided tour of your dashboard?
        </div>

        {/* VIDEO */}
        <video
          src="/moscot.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={yesBtn} onClick={handleStart}>
            Start Tour 🚀
          </button>

          <button style={noBtn} onClick={onClose}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  position: "fixed",
  bottom: "24px",
  left: "24px",
  zIndex: 9999,
};

const bubbleStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  color: "white",
  padding: "16px",
  borderRadius: "20px",
  width: "280px",
  fontSize: "14px",
  boxShadow:
    "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
};

const yesBtn = {
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px",
  flex: 1,
  transition: "all 0.2s ease",
  boxShadow: "0 2px 8px rgba(34, 197, 94, 0.3)",
};

const noBtn = {
  background: "linear-gradient(135deg, #334155, #1e293b)",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "13px",
  flex: 1,
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};