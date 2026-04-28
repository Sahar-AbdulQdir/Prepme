// components/ui/MascotTooltip.jsx
//
// Pure presentational component. It receives absolute {top, left} coordinates
// (already clamped to viewport by Tour.jsx) and renders a floating tooltip card.
//
// NO DOM manipulation. NO intro.js dependency. NO side effects.

import Mascot from "../../assets/Images/mascot2.png";

export default function MascotTooltip({
  step,
  position,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onDone,
}) {
  if (!step) return null;

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: 340,
        zIndex: 99999,
        // Animate in on mount
        animation: "tourTooltipIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        // Let cursor pass through the transparent space around the card
        pointerEvents: "auto",
      }}
    >
      <style>{`
        @keyframes tourTooltipIn {
          from { opacity: 0; transform: scale(0.88) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>

      {/* Card */}
      <div
        style={{
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.97) 0%, rgba(17,28,51,0.97) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 20,
          padding: "20px 22px",
          boxShadow:
            "0 32px 64px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
          color: "white",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* ── Header: mascot avatar + step counter ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              overflow: "hidden",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: "0 4px 14px rgba(34,197,94,0.4)",
              flexShrink: 0,
            }}
          >
            <img
              src={Mascot}
              alt="PrepMate"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
              }}
            >
              PrepMate Guide
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 3,
                color: "rgba(255,255,255,0.45)",
                fontWeight: 500,
              }}
            >
              Step {currentStep + 1} / {totalSteps}
            </div>
          </div>

          {/* Progress pills */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginLeft: "auto",
            }}
          >
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentStep ? 16 : 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === currentStep
                      ? "#22c55e"
                      : i < currentStep
                      ? "rgba(34,197,94,0.4)"
                      : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
            margin: "0 0 18px",
            fontWeight: 400,
          }}
        >
          {step.content}
        </p>

        {/* ── Navigation buttons ── */}
        <div style={{ display: "flex", gap: 10 }}>
          {/* Back */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: 12,
              border: "none",
              background: isFirst
                ? "rgba(51,65,85,0.35)"
                : "linear-gradient(135deg,#334155,#1e293b)",
              color: isFirst ? "rgba(255,255,255,0.3)" : "white",
              fontSize: 13,
              fontWeight: 600,
              cursor: isFirst ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            ← Back
          </button>

          {/* Next / Finish */}
          <button
            onClick={isLast ? onDone : onNext}
            style={{
              flex: 1.6,
              padding: "9px 0",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(34,197,94,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(34,197,94,0.35)";
            }}
          >
            {isLast ? "🎉 Finish!" : "Next →"}
          </button>
        </div>

        {/* ── Skip link ── */}
        <div style={{ textAlign: "center", marginTop: 11 }}>
          <button
            onClick={onSkip}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            Skip tour
          </button>
        </div>
      </div>
    </div>
  );
}