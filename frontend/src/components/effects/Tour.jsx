// components/Tour.jsx - Fixed version
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import introJs from "intro.js/intro.js";
import "intro.js/introjs.css";
// import Mascot from "../assets/Images/mascot2.png";
import MascotTooltip from "../ui/MascotTooltip";

export default function Tour({ run, setRun }) {
  const introRef = useRef(null);
  const stepsRef = useRef([]);

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
          showButtons: false,
          showStepNumbers: true,
          exitOnOverlayClick: false,
          exitOnEsc: true,
          disableInteraction: true,
          overlayOpacity: 0.5,
          tooltipClass: 'custom-tooltip',
          highlightClass: 'custom-highlight',
        });

    intro.onafterchange(() => {
  const tooltipEl = document.querySelector('.introjs-tooltip');
  if (!tooltipEl) return;

  const root = createRoot(tooltipEl);
  const currentIndex = intro._currentStep; // 0‑based
  const currentStepData = stepsRef.current[currentIndex]; // your step object

  root.render(
    <MascotTooltip
      step={currentStepData}     // the { element, intro, position } object
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

        intro.onexit(() => {
          console.log("Tour completed or exited");
          setRun(false);
          introRef.current = null;
        });

        intro.oncomplete(() => {
          console.log("Tour completed successfully");
          localStorage.setItem("seen_home_tour", "true");
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
          startIntroTour(validSteps); // Now calling the actual function
        }
      };

      // Give DOM time to render
      setTimeout(verifyTargets, 300);
    }
  }, [run, setRun]);

  // Clean up tour on unmount
  useEffect(() => {
    return () => {
      if (introRef.current) {
        introRef.current.exit();
        introRef.current = null;
      }
    };
  }, []);

  // Custom CSS for the tour
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
        display: block;
      }
      
      .introjs-skipbutton {
        display:block;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}