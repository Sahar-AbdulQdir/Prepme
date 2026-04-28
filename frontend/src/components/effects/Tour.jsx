// components/effects/Tour.jsx - Fixed version
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import introJs from "intro.js/intro.js";
import "intro.js/introjs.css";
import MascotTooltip from "../ui/MascotTooltip";


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

export default function Tour({ run, setRun }) {
  const introRef = useRef(null);
  const stepsRef = useRef([]);
  const rootRef = useRef(null); // persist the React root

  // FIX 1: Move startIntroTour into a ref to prevent stale closure bugs
  const startIntroTourRef = useRef(null);

  // FIX 1: Assign the function to the ref so it's always up-to-date
  startIntroTourRef.current = (steps) => {
    stepsRef.current = steps;

    if (introRef.current) {
      introRef.current.exit();
    }

    const intro = introJs();
    introRef.current = intro;

    intro.setOptions({
      steps: steps,
      showProgress: true,
      showBullets: false,
      showButtons: false,
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

      const currentIndex = intro._currentStep ?? 0;

      // FIX 3: Fallback to first step if index is out of bounds to prevent crash
      const currentStepData = stepsRef.current[currentIndex] || steps[0];

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

    try {
      intro.start();
    } catch (err) {
      console.error("Intro.js failed:", err);
    }

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

  useEffect(() => {
    if (run) {
      console.log("Tour starting with Intro.js...");

      const verifyTargets = () => {
        let attempts = 0;
        const maxAttempts = 30; // 3 seconds total

        const check = () => {
          const validSteps = tourSteps.filter((step) => {
            const el = document.querySelector(step.element);
            if (!el) console.warn("Missing:", step.element);
            return el;
          });

          if (validSteps.length === tourSteps.length) {
            stepsRef.current = validSteps;
            // FIX 1: Call via ref to avoid stale closure
            startIntroTourRef.current(validSteps);
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(check, 100);
          } else {
            console.error("Timed out waiting for tour targets");
            setRun(false);
          }
        };

        check();
      };

      // FIX 2: Use requestAnimationFrame + longer delay for safer DOM readiness
      requestAnimationFrame(() => {
        setTimeout(verifyTargets, 800);
      });
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

  // Custom CSS
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