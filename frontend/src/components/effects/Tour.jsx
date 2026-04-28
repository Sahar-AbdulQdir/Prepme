import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import introJs from "intro.js/intro.js";
import "intro.js/introjs.css";
import MascotTooltip from "../ui/MascotTooltip";

export default function Tour({ run, setRun }) {
  const introRef = useRef(null);
  const stepsRef = useRef([]);
  const floatRootRef = useRef(null);
  const [floatingVisible, setFloatingVisible] = useState(false);

  useEffect(() => {
    if (run) {
      console.log("Tour starting with Intro.js...");

      const tourSteps = [
        {
          element: '.nav-link[data-tour="resume"]',
          intro: "📄 Start building your professional resume here. Create, edit, and download your resume instantly!",
          position: "bottom",
        },
        {
          element: '.cta-content',
          intro: "🎯 Practice AI-powered interviews here. Get real-time feedback and improve your interview skills!",
          position: "left",
        },
        {
          element: '.widgets-row',
          intro: "👤 Track your progress, view analytics, and manage your interview sessions from these cards!",
          position: "top",
        },
      ];

      const startIntroTour = (steps) => {
        if (introRef.current) {
          introRef.current.exit();
        }

        const intro = introJs();
        introRef.current = intro;

        intro.setOptions({
          steps: steps,
          showProgress: true,
          showBullets: false,
          showButtons: false,        // we use our own buttons
          showStepNumbers: true,
          exitOnOverlayClick: false,
          exitOnEsc: true,
          disableInteraction: true,
          overlayOpacity: 0.5,
          tooltipClass: 'custom-tooltip',
          highlightClass: 'custom-highlight',
        });

        // Custom tooltip rendering
        intro.onafterchange(() => {
          const tooltipEl = document.querySelector('.introjs-tooltip');
          if (!tooltipEl) return;

          const root = createRoot(tooltipEl);
          const currentIndex = intro._currentStep; // 0‑based
          const currentStepData = stepsRef.current[currentIndex];

          root.render(
            <MascotTooltip
              step={currentStepData}
              intro={intro}
              currentStep={currentIndex}
              totalSteps={stepsRef.current.length}
              onNext={() => intro.nextStep()}
              onPrev={() => intro.previousStep()}
              onSkip={() => intro.exit()}
              onDone={() => intro.exit()}
            />
          );
        });

        intro.start();

        // Show floating Prev/Next buttons
        setFloatingVisible(true);

        intro.onexit(() => {
          console.log("Tour completed or exited");
          setRun(false);
          setFloatingVisible(false);
          introRef.current = null;
          cleanupFloatingButtons();
        });

        intro.oncomplete(() => {
          console.log("Tour completed successfully");
          localStorage.setItem("seen_home_tour", "true");
          setRun(false);
          setFloatingVisible(false);
          introRef.current = null;
          cleanupFloatingButtons();
        });
      };

      const verifyTargets = () => {
        const validSteps = [];
        for (let i = 0; i < tourSteps.length; i++) {
          const step = tourSteps[i];
          const element = document.querySelector(step.element);
          if (element) {
            console.log(`✅ Step ${i + 1} target found: ${step.element}`);
            validSteps.push(step);
          } else {
            console.warn(`❌ Step ${i + 1} target NOT found: ${step.element}`);
          }
        }

        if (validSteps.length === 0) {
          console.error("No valid targets found, tour cancelled");
          setRun(false);
        } else {
          console.log(`Starting tour with ${validSteps.length} steps`);
          stepsRef.current = validSteps;
          startIntroTour(validSteps);
        }
      };

      // Give DOM time to render
      setTimeout(verifyTargets, 300);
    }
  }, [run, setRun]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (introRef.current) {
        introRef.current.exit();
        introRef.current = null;
      }
      cleanupFloatingButtons();
    };
  }, []);

  // Floating Prev/Next buttons (pure portal)
  useEffect(() => {
    if (floatingVisible) {
      // Create a container for the floating buttons
      const floatContainer = document.createElement("div");
      floatContainer.id = "tour-floating-nav";
      document.body.appendChild(floatContainer);
      const root = createRoot(floatContainer);
      floatRootRef.current = root;

      const FloatingNav = () => {
        const [, forceUpdate] = useState(0);
        // Refresh on step change
        useEffect(() => {
          if (!introRef.current) return;
          const handler = () => forceUpdate((n) => n + 1);
          introRef.current.onafterchange(handler);
          return () => {
            if (introRef.current) introRef.current.onafterchange(() => {});
          };
        }, []);

        const currentStep = introRef.current?._currentStep ?? 0;
        const totalSteps = stepsRef.current?.length ?? 0;

        return (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              display: "flex",
              gap: 12,
              zIndex: 100000,
            }}
          >
            <button
              onClick={() => introRef.current?.previousStep()}
              disabled={currentStep === 0}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "8px 18px",
                borderRadius: "12px",
                fontWeight: 600,
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                opacity: currentStep === 0 ? 0.5 : 1,
                transition: "0.2s",
              }}
            >
              ← Prev
            </button>
            <button
              onClick={() => introRef.current?.nextStep()}
              disabled={currentStep >= totalSteps - 1}
              style={{
                background: "rgba(34,197,94,0.2)",
                border: "1px solid #22c55e",
                color: "white",
                padding: "8px 18px",
                borderRadius: "12px",
                fontWeight: 600,
                cursor: currentStep >= totalSteps - 1 ? "not-allowed" : "pointer",
                opacity: currentStep >= totalSteps - 1 ? 0.5 : 1,
                transition: "0.2s",
              }}
            >
              Next →
            </button>
          </div>
        );
      };

      root.render(<FloatingNav />);

      return () => {
        root.unmount();
        document.body.removeChild(floatContainer);
      };
    }
  }, [floatingVisible]);

  const cleanupFloatingButtons = () => {
    if (floatRootRef.current) {
      floatRootRef.current.unmount();
      const container = document.getElementById("tour-floating-nav");
      if (container) container.remove();
      floatRootRef.current = null;
    }
  };

  // Custom CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-highlight {
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.5), 0 0 15px 5px rgba(34, 197, 94, 0.5) !important;
        border-radius: 8px !important;
      }
      .introjs-helperLayer {
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.5), 0 0 15px 5px rgba(34, 197, 94, 0.3) !important;
        border-radius: 8px !important;
      }
      .introjs-tooltip {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 28, 51, 0.95)) !important;
        min-width: 300px !important;
        max-width: 320px !important;
      }
      .introjs-button {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}