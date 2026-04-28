// components/effects/Tour.jsx - Fixed version
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import introJs from "intro.js/intro.js";
import "intro.js/introjs.css";
import MascotTooltip from "../ui/MascotTooltip";

export default function Tour({ run, setRun }) {
  const introRef = useRef(null);
  const stepsRef = useRef([]);
  const rootRef = useRef(null); // <-- persist the React root

  useEffect(() => {
    if (run) {
      console.log("Tour starting with Intro.js...");

      const tourSteps = [
        {
          element: '.nav-link[data-tour="resume"]',
          intro:
            "📄 Start building your professional resume here. Create, edit, and download your resume instantly!",
          position: "bottom",
        },
        {
          element: ".cta-content",
          intro:
            "🎯 Practice AI-powered interviews here. Get real-time feedback and improve your interview skills!",
          position: "left",
        },
        {
          element: ".widgets-row",
          intro:
            "👤 Track your progress, view analytics, and manage your interview sessions from these cards!",
          position: "top",
        },
      ];

      const startIntroTour = (steps) => {
        // Clean up any previous tour
        if (introRef.current) {
          introRef.current.exit();
        }

        const intro = introJs();
        introRef.current = intro;

        intro.setOptions({
          steps: steps,
          showProgress: true,
          showBullets: false,
          showButtons: false, // hide default buttons
          showStepNumbers: true,
          exitOnOverlayClick: false,
          exitOnEsc: true,
          disableInteraction: true,
          overlayOpacity: 0.5,
          tooltipClass: "custom-tooltip",
          highlightClass: "custom-highlight",
        });

        // Called after every step change
        intro.onafterchange(() => {
          const tooltipEl = document.querySelector(".introjs-tooltip");
          if (!tooltipEl) return;

          // Create root only once and reuse it
          if (!rootRef.current) {
            rootRef.current = createRoot(tooltipEl);
          }

          const currentIndex = intro._currentStep; // 0‑based
          const currentStepData = stepsRef.current[currentIndex];

          rootRef.current.render(
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

        // Cleanup on exit (manual skip or Esc)
        intro.onexit(() => {
          console.log("Tour completed or exited");
          if (rootRef.current) {
            rootRef.current.unmount();
            rootRef.current = null;
          }
          setRun(false);
          introRef.current = null;
        });

        // Save completion only when user reaches the end
        intro.oncomplete(() => {
          console.log("Tour completed successfully");
          localStorage.setItem("seen_home_tour", "true");
          // onexit will handle cleanup
          setRun(false);
          introRef.current = null;
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
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      if (introRef.current) {
        introRef.current.exit();
        introRef.current = null;
      }
    };
  }, []);

  // Custom CSS (no changes needed)
  useEffect(() => {
    const style = document.createElement("style");
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