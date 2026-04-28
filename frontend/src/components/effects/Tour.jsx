// components/effects/Tour.jsx
//
// Architecture:
//   1. waitForElements()  — MutationObserver waits for every target selector.
//   2. intro.js           — handles overlay + element highlighting only.
//   3. React portal       — renders MascotTooltip independently of intro.js DOM.
//   4. calculatePosition()— positions the portal tooltip near the highlighted element.
//
// This avoids ALL race conditions: the tour never starts before the page is ready,
// and the tooltip is never injected into intro.js's fragile internal DOM tree.

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import introJs from "intro.js/intro.js";
import "intro.js/introjs.css";
import MascotTooltip from "../ui/MascotTooltip";

// ─── Step definitions ────────────────────────────────────────────────────────
// Add / remove steps here. The engine handles missing selectors gracefully.
const TOUR_STEPS = [
  {
    selector: '.nav-link[data-tour="resume"]',
    content:
      "📄 Start building your professional resume here. Create, edit, and download your resume instantly!",
    preferredPosition: "bottom",
  },
  {
    selector: ".cta-content",
    content:
      "🎯 Practice AI-powered interviews here. Get real-time feedback and improve your interview skills!",
    preferredPosition: "left",
  },
  {
    selector: ".widgets-row",
    content:
      "👤 Track your progress, view analytics, and manage your interview sessions from these cards!",
    preferredPosition: "top",
  },
];

// ─── DOM readiness helper ────────────────────────────────────────────────────
// Waits for every selector in `selectors` to appear in the DOM.
// Uses MutationObserver (no polling). Resolves after `timeoutMs` with whatever
// was found so the caller can decide whether to proceed with partial steps.
function waitForElements(selectors, timeoutMs = 8000) {
  return new Promise((resolve) => {
    // Build a mutable map so we can update it inside the observer
    const found = new Map(
      selectors.map((sel) => [sel, document.querySelector(sel)])
    );

    const allResolved = () => [...found.values()].every(Boolean);

    // Already satisfied — resolve immediately (common case after navigation)
    if (allResolved()) {
      resolve(found);
      return;
    }

    const timeoutId = setTimeout(() => {
      observer.disconnect();
      resolve(found); // partial result — caller filters valid steps
    }, timeoutMs);

    const observer = new MutationObserver(() => {
      for (const [sel, el] of found) {
        if (!el) found.set(sel, document.querySelector(sel));
      }
      if (allResolved()) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(found);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id", "data-tour"],
    });
  });
}

// ─── Position calculator ─────────────────────────────────────────────────────
// Returns { top, left } in viewport coordinates for the floating tooltip.
const TOOLTIP_W = 340;
const TOOLTIP_H = 240;
const GAP = 14; // px between element edge and tooltip

function calculatePosition(targetEl, preferredPosition) {
  if (!targetEl) return { top: 80, left: 80 };

  const r = targetEl.getBoundingClientRect();
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;
  let top, left;

  switch (preferredPosition) {
    case "top":
      top = r.top - TOOLTIP_H - GAP;
      left = r.left + r.width / 2 - TOOLTIP_W / 2;
      break;
    case "left":
      top = r.top + r.height / 2 - TOOLTIP_H / 2;
      left = r.left - TOOLTIP_W - GAP;
      break;
    case "right":
      top = r.top + r.height / 2 - TOOLTIP_H / 2;
      left = r.right + GAP;
      break;
    case "bottom":
    default:
      top = r.bottom + GAP;
      left = r.left + r.width / 2 - TOOLTIP_W / 2;
  }

  // Clamp inside viewport with padding
  const PAD = 12;
  left = Math.max(PAD, Math.min(left, vpW - TOOLTIP_W - PAD));
  top = Math.max(PAD, Math.min(top, vpH - TOOLTIP_H - PAD));

  return { top, left };
}

// ─── Tour component ───────────────────────────────────────────────────────────
export default function Tour({ run, setRun }) {
  const introRef = useRef(null);       // intro.js instance
  const isMounted = useRef(true);      // guards setState after unmount
  const validStepsRef = useRef([]);    // steps that passed DOM check

  // State consumed by the React-portal tooltip
  const [tooltipState, setTooltipState] = useState(null);

  // ── Destroy helper ──────────────────────────────────────────────────────────
  const destroyTour = useCallback(() => {
    if (introRef.current) {
      try { introRef.current.exit(true); } catch (_) { /* already destroyed */ }
      introRef.current = null;
    }
    if (isMounted.current) setTooltipState(null);
  }, []);

  // ── Mount / unmount guard ───────────────────────────────────────────────────
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      destroyTour();
    };
  }, [destroyTour]);

  // ── Main tour effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!run) {
      destroyTour();
      return;
    }

    // Abort flag prevents state updates if effect re-runs before async resolves
    let aborted = false;

    const initTour = async () => {
      const selectors = TOUR_STEPS.map((s) => s.selector);
      const foundMap = await waitForElements(selectors, 8000);

      if (aborted || !isMounted.current) return;

      // Keep only steps whose target element was actually found
      const validSteps = TOUR_STEPS.filter(
        (step) => foundMap.get(step.selector) != null
      );

      if (validSteps.length === 0) {
        console.warn("[Tour] No target elements found — aborting tour.");
        setRun(false);
        return;
      }

      const missing = TOUR_STEPS.filter(
        (step) => foundMap.get(step.selector) == null
      );
      if (missing.length > 0) {
        console.warn(
          "[Tour] Skipping steps with missing selectors:",
          missing.map((s) => s.selector)
        );
      }

      validStepsRef.current = validSteps;

      // ── Build intro.js ──────────────────────────────────────────────────────
      // We only use intro.js for overlay + highlight.
      // The tooltip is rendered via our own React portal below.
      const intro = introJs();
      introRef.current = intro;

      intro.setOptions({
        steps: validSteps.map((step) => ({
          element: step.selector,
          // Non-empty string required; our CSS hides intro.js's tooltip UI
          intro: " ",
          position: step.preferredPosition,
        })),
        showProgress: false,
        showBullets: false,
        showButtons: false,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        disableInteraction: false,
        overlayOpacity: 0.55,
        tooltipClass: "tour-hidden-tooltip",
        highlightClass: "tour-custom-highlight",
        scrollToElement: true,
      });

      // ── Sync React tooltip with intro.js step changes ───────────────────────
      const syncTooltip = (targetEl) => {
        if (!isMounted.current) return;

        // Match target element back to our step definition
        const stepIdx = validSteps.findIndex((step) => {
          const el = document.querySelector(step.selector);
          return el === targetEl;
        });

        const idx = stepIdx >= 0 ? stepIdx : 0;
        const step = validSteps[idx];
        if (!step) return;

        const el = document.querySelector(step.selector);
        setTooltipState({
          step,
          position: calculatePosition(el, step.preferredPosition),
          currentStep: idx,
          totalSteps: validSteps.length,
        });
      };

      intro.onafterchange(syncTooltip);

      intro.onexit(() => {
        if (isMounted.current) {
          setTooltipState(null);
          setRun(false);
        }
        introRef.current = null;
      });

      intro.oncomplete(() => {
        localStorage.setItem("seen_home_tour", "true");
        if (isMounted.current) {
          setTooltipState(null);
          setRun(false);
        }
        introRef.current = null;
      });

      intro.start();
      // onafterchange fires for step 0 during start(); no manual sync needed.
    };

    initTour();
    return () => { aborted = true; };
  }, [run, setRun, destroyTour]);

  // ── Navigation handlers passed down to MascotTooltip ───────────────────────
  const handleNext = useCallback(() => introRef.current?.nextStep(), []);
  const handlePrev = useCallback(() => introRef.current?.previousStep(), []);
  const handleSkip = useCallback(() => introRef.current?.exit(), []);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Scoped styles: hide intro.js's built-in tooltip shell */}
      <style>{`
        /* Hide intro.js tooltip content — we replace it with our portal */
        .tour-hidden-tooltip {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
          min-width: 0 !important;
          min-height: 0 !important;
          overflow: hidden !important;
          width: 0 !important;
          height: 0 !important;
        }
        .tour-hidden-tooltip .introjs-tooltip-header,
        .tour-hidden-tooltip .introjs-tooltiptext,
        .tour-hidden-tooltip .introjs-tooltipbuttons,
        .tour-hidden-tooltip .introjs-progress,
        .tour-hidden-tooltip .introjs-arrow {
          display: none !important;
        }

        /* Custom highlight ring */
        .introjs-helperLayer {
          border-radius: 10px !important;
          box-shadow:
            0 0 0 4000px rgba(0, 0, 0, 0.55),
            0 0 0 3px rgba(34, 197, 94, 0.8),
            0 0 20px 4px rgba(34, 197, 94, 0.35) !important;
          transition: all 0.3s ease !important;
        }
        .introjs-fixedTooltip,
        .introjs-relativeTooltip {
          transition: all 0.3s ease !important;
        }
      `}</style>

      {/* Portal-rendered tooltip — lives outside intro.js DOM entirely */}
      {tooltipState &&
        createPortal(
          <MascotTooltip
            step={tooltipState.step}
            position={tooltipState.position}
            currentStep={tooltipState.currentStep}
            totalSteps={tooltipState.totalSteps}
            onNext={handleNext}
            onPrev={handlePrev}
            onSkip={handleSkip}
            onDone={handleSkip}
          />,
          document.body
        )}
    </>
  );
}