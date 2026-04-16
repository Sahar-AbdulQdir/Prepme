// components/Tour.jsx - Fixed version without onafterstart
import { useEffect, useRef } from "react";
// import introJs from "intro.js";
import "intro.js/introjs.css";
import Mascot from "../assets/Images/mascot2.png";

export default function Tour({ run, setRun }) {
  // const [ setCurrentStep] = useState(0);
  // const [ setTotalSteps] = useState(0);
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
          console.log(`Setting ${validSteps.length} tour steps`);
          stepsRef.current = validSteps;
          // setTotalSteps(validSteps.length);
          // setCurrentStep(0); 
          
          setTimeout(() => {
            // startIntroTour(validSteps);
          }, 100);
        }
      };

      setTimeout(verifyTargets, 300);
    }
  }, [run, setRun]);

  // const startIntroTour = (steps) => {
  //   const intro = introJs();
    
  //   intro.setOptions({
  //     steps: steps,
  //     showProgress: true,
  //     showBullets: false,
  //     showStepNumbers: false,
  //     exitOnOverlayClick: false,
  //     exitOnEsc: true,
  //     disableInteraction: false,
  //     scrollToElement: true,
  //     overlayOpacity: 0.5,
  //     positionPrecedence: ['bottom', 'left', 'top', 'right'],
  //     tooltipClass: 'custom-mascot-tooltip',
  //     highlightClass: 'custom-highlight',
  //   });

  //   Track step changes
  //   intro.onbeforechange((targetElement) => {
  //     intro._currentStep might be undefined on first call
  //     const stepIndex = (intro._currentStep !== undefined && intro._currentStep >= 0) 
  //       ? intro._currentStep 
  //       : 0;
      
  //     console.log("Before change - Step index:", stepIndex);
  //     setCurrentStep(stepIndex);
      
  //     setTimeout(() => {
  //       applyCustomTooltip(intro, stepIndex, steps.length);
  //     }, 10);
  //   });

  //   intro.onafterchange((targetElement) => {
  //     const stepIndex = intro._currentStep >= 0 ? intro._currentStep : 0;
  //     console.log("After change - Step index:", stepIndex);
  //     setCurrentStep(stepIndex);
  //     applyCustomTooltip(intro, stepIndex, steps.length);
  //   });

  //   intro.oncomplete(() => {
  //     console.log("Tour completed");
  //     setRun(false);
  //     localStorage.setItem("seen_home_tour", "true");
  //   });

  //   intro.onexit(() => {
  //     console.log("Tour exited");
  //     setRun(false);
  //     localStorage.setItem("seen_home_tour", "true");
  //   });

  //   introRef.current = intro;
  //   intro.start();
    
  //   Apply custom tooltip for first step immediately after start
  //   setTimeout(() => {
  //     applyCustomTooltip(intro, 0, steps.length);
  //   }, 50);
  // };

  const applyCustomTooltip = (intro, currentIndex, total) => {
    // Ensure currentIndex is a valid number
    const safeIndex = (typeof currentIndex === 'number' && !isNaN(currentIndex)) ? currentIndex : 0;
    const displayStep = safeIndex + 1;
    
    console.log(`Applying tooltip for step ${displayStep} of ${total} (index: ${safeIndex})`);
    
    const tooltipElement = document.querySelector('.introjs-tooltip');
    if (!tooltipElement) {
      console.warn("Tooltip element not found");
      return;
    }

    // Hide default elements
    const elementsToHide = [
      '.introjs-bullets',
      '.introjs-progress',
      '.introjs-skipbutton',
      '.introjs-prevbutton',
      '.introjs-nextbutton',
      '.introjs-tooltip-header'
    ];
    
    elementsToHide.forEach(selector => {
      const el = tooltipElement.querySelector(selector);
      if (el) el.style.display = 'none';
    });

    // Style tooltip
    Object.assign(tooltipElement.style, {
      background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 28, 51, 0.95))",
      backdropFilter: "blur(10px)",
      color: "white",
      padding: "0",
      borderRadius: "20px",
      maxWidth: "320px",
      minWidth: "300px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
    });
    
    // Style arrow
    const arrow = document.querySelector('.introjs-arrow');
    if (arrow) {
      arrow.style.borderTopColor = "rgba(15, 23, 42, 0.95)";
    }

    const tooltipContent = tooltipElement.querySelector('.introjs-tooltiptext');
    if (tooltipContent) {
      // Check if we already added custom content
      const existingCustom = tooltipContent.querySelector('.custom-mascot-content');
      if (existingCustom) {
        // Update step number only
        const stepDisplay = existingCustom.querySelector('.step-display');
        if (stepDisplay) {
          stepDisplay.textContent = `Step ${displayStep} of ${total}`;
        }
        
        // Update button text for last step
        const nextBtn = existingCustom.querySelector('.custom-next-btn');
        if (nextBtn) {
          nextBtn.textContent = safeIndex === total - 1 ? '🎉 Finish' : 'Next →';
        }
        
        // Update back button state
        const backBtn = existingCustom.querySelector('.custom-back-btn');
        if (backBtn) {
          backBtn.style.opacity = safeIndex === 0 ? '0.5' : '1';
          backBtn.style.cursor = safeIndex === 0 ? 'not-allowed' : 'pointer';
          if (safeIndex === 0) {
            backBtn.setAttribute('disabled', '');
          } else {
            backBtn.removeAttribute('disabled');
          }
        }
        
        return;
      }
      
      const originalContent = tooltipContent.innerHTML;
      const currentStepData = stepsRef.current[safeIndex];
      
      const customContainer = document.createElement('div');
      customContainer.className = 'custom-mascot-content';
      customContainer.style.padding = "20px";
      
      const isLastStep = safeIndex === total - 1;
      
      customContainer.innerHTML = `
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
            <img src="${Mascot}" style="width: 100%; height: 100%; object-fit: cover;" alt="PrepMate Mascot" />
          </div>
          <div>
            <div style="font-weight: 700; font-size: 16px; letter-spacing: -0.3px;">PrepMate Guide</div>
            <div class="step-display" style="font-size: 12px; opacity: 0.7; margin-top: 2px;">Step ${displayStep} of ${total}</div>
          </div>
        </div>
        <div style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: rgba(255, 255, 255, 0.95);">
          ${currentStepData?.intro || originalContent}
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="custom-back-btn" style="
            background: linear-gradient(135deg, #334155, #1e293b); 
            color: white; 
            border: none; 
            padding: 10px 16px; 
            border-radius: 12px; 
            flex: 1; 
            font-weight: 500; 
            font-size: 13px; 
            opacity: ${safeIndex === 0 ? '0.5' : '1'}; 
            cursor: ${safeIndex === 0 ? 'not-allowed' : 'pointer'}; 
            transition: all 0.2s ease;
          " ${safeIndex === 0 ? 'disabled' : ''}>
            ← Back
          </button>
          <button class="custom-next-btn" style="
            background: linear-gradient(135deg, #22c55e, #16a34a); 
            color: white; 
            border: none; 
            padding: 10px 16px; 
            border-radius: 12px; 
            cursor: pointer; 
            font-weight: 600; 
            font-size: 13px; 
            flex: 1; 
            transition: all 0.2s ease; 
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          ">
            ${isLastStep ? '🎉 Finish' : 'Next →'}
          </button>
        </div>
        <div style="margin-top: 12px; text-align: center;">
          <button class="custom-skip-btn" style="
            background: none; 
            border: none; 
            color: rgba(255,255,255,0.5); 
            font-size: 11px; 
            cursor: pointer; 
            text-decoration: underline;
          ">
            Skip tour
          </button>
        </div>
      `;
      
      tooltipContent.innerHTML = '';
      tooltipContent.appendChild(customContainer);
      
      // Add event listeners
      const backBtn = customContainer.querySelector('.custom-back-btn');
      const nextBtn = customContainer.querySelector('.custom-next-btn');
      const skipBtn = customContainer.querySelector('.custom-skip-btn');
      
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          if (safeIndex > 0) {
            intro.previousStep();
          }
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (isLastStep) {
            intro.exit();
            setRun(false);
            localStorage.setItem("seen_home_tour", "true");
          } else {
            intro.nextStep();
          }
        });
      }
      
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          intro.exit();
          setRun(false);
          localStorage.setItem("seen_home_tour", "true");
        });
      }
    }
  };

  // Clean up
  useEffect(() => {
    return () => {
      if (introRef.current) {
        introRef.current.exit();
      }
    };
  }, []);

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
      
      .introjs-skipbutton {
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