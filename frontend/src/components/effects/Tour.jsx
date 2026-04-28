// components/Tour.jsx - Fixed version
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import introJs from "intro.js"; // ✅ Fix #2: corrected import (was "intro.js/intro.js")
import "intro.js/introjs.css";
import MascotTooltip from "../ui/MascotTooltip";

export default function Tour({ run, setRun }) {
  const introRef = useRef(null);
  const stepsRef = useRef([]);
  const reactRootRef = useRef(null); // single persistent React root
  const containerRef = useRef(null); // single persistent container div

  useEffect(() => {
    // ✅ Fix #4: log run state to catch false-never-true bugs
    console.log("Tour run state:", run);
    if (!run) return;

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

    // ─── helpers ──────────────────────────────────────────────────────────

    /** Wipe Intro.js default content and mount our React tooltip instead */
    const renderMascot = (intro) => {
      const tooltipEl = document.querySelector(".introjs-tooltip");
      if (!tooltipEl) return;

      // Clear every child Intro.js rendered (title, text, bullets, buttons…)
      while (tooltipEl.firstChild) tooltipEl.removeChild(tooltipEl.firstChild);

      // Reuse the same container / React root across steps so React can diff
      if (!containerRef.current) {
        containerRef.current = document.createElement("div");
      }
      if (!tooltipEl.contains(containerRef.current)) {
        tooltipEl.appendChild(containerRef.current);
      }

      if (!reactRootRef.current) {
        reactRootRef.current = createRoot(containerRef.current);
      }

      const currentIndex = intro._currentStep ?? 0;
      const currentStepData = stepsRef.current[currentIndex];

      reactRootRef.current.render(
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
    };

    /** Verify DOM targets, then start the tour */
    const verifyAndStart = () => {
      // ✅ Fix #6: debug log every selector result
      console.log("STEP CHECK:");
      tourSteps.forEach((s) => {
        console.log(s.element, document.querySelector(s.element));
      });

      const validSteps = tourSteps.filter((step) => {
        const found = !!document.querySelector(step.element);
        console.log(
          found ? `✅ found: ${step.element}` : `❌ missing: ${step.element}`
        );
        return found;
      });

      if (validSteps.length === 0) {
        console.error("No valid targets found, tour cancelled");
        setRun(false);
        return;
      }

      stepsRef.current = validSteps;

      if (introRef.current) introRef.current.exit();

      const intro = introJs();
      introRef.current = intro;

      intro.setOptions({
        steps: validSteps,
        showProgress: false,
        showBullets: false,
        // Hide ALL of Intro.js's own UI — we render everything ourselves
        showButtons: false,
        showStepNumbers: false,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        disableInteraction: true,
        overlayOpacity: 0.5,
        tooltipClass: "custom-tooltip",
        highlightClass: "custom-highlight",
      });

      // Render our mascot every time the step changes
      intro.onafterchange(() => renderMascot(intro));

      intro.start();
      // Also render immediately after start (onafterchange fires after transition)
      requestAnimationFrame(() => renderMascot(intro));

      intro.onexit(() => {
        console.log("Tour exited");
        reactRootRef.current?.unmount();
        reactRootRef.current = null;
        containerRef.current = null;
        introRef.current = null;
        setRun(false);
      });

      intro.oncomplete(() => {
        console.log("Tour completed");
        localStorage.setItem("seen_home_tour", "true");
        reactRootRef.current?.unmount();
        reactRootRef.current = null;
        containerRef.current = null;
        introRef.current = null;
        setRun(false);
      });
    };

    // ✅ Fix #1: poll for DOM readiness instead of a fixed setTimeout.
    // Checks every 200 ms; gives up after 10 s to avoid infinite loops.
    let attempts = 0;
    const MAX_ATTEMPTS = 50; // 50 × 200 ms = 10 s
    const interval = setInterval(() => {
      attempts++;
      const keyElement = document.querySelector(".cta-content");
      if (keyElement) {
        clearInterval(interval);
        verifyAndStart();
      } else if (attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        console.error("Tour: key element never appeared in DOM, cancelling.");
        setRun(false);
      }
    }, 200);

    // Clean up interval if the effect re-fires before the tour starts
    return () => clearInterval(interval);
  }, [run, setRun]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (introRef.current) {
        introRef.current.exit();
        introRef.current = null;
      }
      reactRootRef.current?.unmount();
      reactRootRef.current = null;
      containerRef.current = null;
    };
  }, []);

  // Custom CSS overrides
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-highlight {
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.5),
                    0 0 15px 5px rgba(34, 197, 94, 0.5) !important;
        border-radius: 8px !important;
      }
      .introjs-helperLayer {
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.5),
                    0 0 15px 5px rgba(34, 197, 94, 0.3) !important;
        border-radius: 8px !important;
      }

      /* ✅ Fix #5: guarantee tooltip and overlay sit above everything */
      .introjs-tooltip {
        z-index: 999999 !important;
        background: transparent !important;
        padding: 0 !important;
        box-shadow: none !important;
        min-width: unset !important;
        max-width: unset !important;
      }
      .introjs-overlay {
        z-index: 999998 !important;
      }

      /* Hide every default Intro.js element */
      .introjs-tooltip .introjs-tooltiptext,
      .introjs-tooltip .introjs-tooltipbuttons,
      .introjs-tooltip .introjs-bullets,
      .introjs-tooltip .introjs-progress,
      .introjs-tooltip .introjs-skipbutton,
      .introjs-tooltip .introjs-arrow {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
}