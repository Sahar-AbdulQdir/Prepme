// components/MascotTooltip.jsx
import Mascot from "../../assets/Images/mascot2.png";

const MascotTooltip = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onDone,
}) => {
  if (!step) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const content = step.intro || "Let's continue your journey 🚀";

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(17, 28, 51, 0.97))",
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "20px",
        borderRadius: "20px",
        width: "300px",
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 12px rgba(34,197,94,0.3)",
            flexShrink: 0,
          }}
        >
          <img
            src={Mascot}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="PrepMate Mascot"
          />
        </div>
        <div>
          <div
            style={{ fontWeight: "700", fontSize: "16px", letterSpacing: "-0.3px" }}
          >
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
          color: "rgba(255,255,255,0.95)",
        }}
      >
        {content}
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
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
            opacity: isFirstStep ? 0.4 : 1,
            cursor: isFirstStep ? "not-allowed" : "pointer",
            transition: "opacity 0.2s ease",
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
            boxShadow: "0 4px 12px rgba(34,197,94,0.3)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(34,197,94,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(34,197,94,0.3)";
          }}
        >
          {isLastStep ? "🎉 Finish" : "Next →"}
        </button>
      </div>

      {/* Skip */}
      <div style={{ marginTop: "12px", textAlign: "center" }}>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
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