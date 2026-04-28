// components/MascotTooltip.jsx - Custom tooltip for Intro.js
import { useEffect, useRef } from "react";
import Mascot from "../../assets/Images/mascot2.png";

const MascotTooltip = ({
  step,
  intro,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onDone,
}) => {
  const contentRef = useRef(null);

  useEffect(() => {
    // Intro.js doesn't provide a built-in custom tooltip renderer like Joyride
    // We need to override the default tooltip using DOM manipulation
    if (intro && contentRef.current) {
      const tooltipLayer = document.querySelector('.introjs-tooltip');
      if (tooltipLayer) {
        // We'll handle this differently - see updated approach below
      }
    }
  }, [intro, step, currentStep]);

  if (!step) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const content = step.intro || "Let's continue your journey 🚀";

  return (
    <div
      ref={contentRef}
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 28, 51, 0.95))",
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "20px",
        borderRadius: "20px",
        maxWidth: "320px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        pointerEvents: "auto",
      }}
    >
      {/* Mascot Header */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
          }}
        >
          <img
            src={Mascot}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="PrepMate Mascot"
          />
        </div>
        <div>
          <div style={{ fontWeight: "700", fontSize: "16px", letterSpacing: "-0.3px" }}>
            PrepMate Guide
          </div>
          <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "2px" }}>
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          marginBottom: "20px",
          color: "rgba(255, 255, 255, 0.95)",
        }}
      >
        {content}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onPrev}
          disabled={isFirstStep}
          style={{
            background: "linear-gradient(135deg, #334155, #1e293b)",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "12px",
            flex: 1,
            fontWeight: "500",
            fontSize: "13px",
            opacity: isFirstStep ? 0.5 : 1,
            cursor: isFirstStep ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ← Back
        </button>

        <button
          onClick={isLastStep ? onDone : onNext}
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
            flex: 1,
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
          }}
        >
          {isLastStep ? "🎉 Finish" : "Next →"}
        </button>
      </div>

      {/* Skip button */}
      <div style={{ marginTop: "12px", textAlign: "center" }}>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "11px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Skip tour
        </button>
      </div>
    </div>
  );
};

export default MascotTooltip;
