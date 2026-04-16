import React from "react";
import { PiRankingFill } from "react-icons/pi";
import PodImg from "../../assets/Images/Pod_Suggestion.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');
  
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  
  @keyframes floatCard {
    0%,100% { transform: rotate(-7deg) translateY(0); }
    50%      { transform: rotate(-7deg) translateY(-8px); }
  }
  
  @keyframes floatImg {
    0%,100% { transform: rotate(7deg) translateY(0); }
    50%      { transform: rotate(7deg) translateY(-8px); }
  }

  .ia-section {
    font-family: 'Istok Web', sans-serif;
    padding: 1.5rem 1rem;
    text-align: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .ia-title {
    font-size: clamp(1.5rem, 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #ffffff;
    opacity: 0;
    animation: fadeSlideUp 0.7s ease forwards;
    animation-delay: 0.1s;
    line-height: 1.2;
  }

  .ia-highlight {
    position: relative;
    display: inline-block;
    padding: 0.15em 0.45em;
  }
  
  .ia-highlight::before,
  .ia-highlight::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 3px solid #C2D96F;
    border-radius: 50%;
    opacity: 0.7;
    pointer-events: none;
    height: clamp(3rem, 6vw, 6rem);
  }
  
  .ia-highlight::before {
    transform: rotate(2deg);
    border-right-color: transparent;
  }
  
  .ia-highlight::after {
    transform: rotate(-2deg);
    border-left-color: transparent;
    border-top-color: transparent;
  }

  .ia-subtitle {
    color: #6b7280;
    margin-bottom: 0.75rem;
    font-size: clamp(0.85rem, 2.5vw, 1.3rem);
    opacity: 0;
    animation: fadeSlideUp 0.7s ease forwards;
    animation-delay: 0.25s;
    padding: 0 0.5rem;
  }

  .ia-rank-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    font-size: clamp(0.9rem, 2.5vw, 1.3rem);
    opacity: 0;
    animation: fadeSlideUp 0.7s ease forwards;
    animation-delay: 0.4s;
    flex-wrap: wrap;
  }
  
  .ia-rank-icon {
    color: #f59e0b;
    margin-top: -0.2rem;
    font-size: clamp(1.1rem, 3vw, 1.7rem);
  }
  
  .ia-rank-label {
    font-size: clamp(0.95rem, 2.5vw, 1.3rem);
    color: #ef4444;
    font-weight: 600;
  }

  .ia-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
    animation-delay: 0.55s;
    width: 100%;
  }

  .ia-card {
    box-shadow: 0 4px 20px rgba(168,85,247,0.15);
    width: 100%;
    max-width: 320px;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    transform: rotate(-7deg) translateY(0);
    animation: floatCard 5s ease-in-out infinite;
    background:
      radial-gradient(circle at 100% 100%, #fff 0, #fff 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
      radial-gradient(circle at 0 100%,   #fff 0, #fff 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
      radial-gradient(circle at 100% 0,   #fff 0, #fff 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
      radial-gradient(circle at 0 0,      #fff 0, #fff 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
      linear-gradient(#fff, #fff) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat,
      linear-gradient(#fff, #fff) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat,
      linear-gradient(133deg, transparent 0%, #C2D96F 100%);
    box-sizing: border-box;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    cursor: default;
    margin: 0.5rem 0;
  }
  
  .ia-card:hover {
    animation-play-state: paused;
    transform: rotate(-3deg) translateY(-10px) scale(1.03);
    box-shadow: 0 16px 40px rgba(168,85,247,0.3);
  }

  .ia-card-text p {
    margin: 0.3rem 0 0;
    font-size: clamp(0.75rem, 2vw, 0.9rem);
    color: #374151;
    line-height: 1.5;
    transition: color 0.2s;
  }
  
  .ia-card:hover .ia-card-text p {
    color: #111827;
  }
  
  .ia-card-text p span {
    font-weight: 800;
    color: #C2D96F;
    font-size: clamp(0.75rem, 1.8vw, 0.8rem);
  }
  
  .ia-card-text hr {
    border: none;
    border-bottom: 1px solid #d1d5db;
    margin: 0.4rem 0;
  }

  .ia-img {
    width: 100%;
    max-width: 28rem;
    height: auto;
    border-radius: 0.75rem;
    object-fit: cover;
    transform: rotate(7deg) translateY(0);
    animation: floatImg 5s ease-in-out infinite;
    animation-delay: 0.4s;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    cursor: default;
  }
  
  .ia-img:hover {
    animation-play-state: paused;
    transform: rotate(3deg) translateY(-10px) scale(1.03);
  }

  .ia-tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
    margin-top: 2.5rem;
    padding: 0 0.5rem;
    opacity: 0;
    animation: fadeSlideUp 0.8s ease forwards;
    animation-delay: 0.75s;
  }
  
  .ia-tip-pill {
    background: #f5f3ff;
    border: 1px solid #e9d5ff;
    border-radius: 0.75rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.78rem;
    color: #6d28d9;
    font-weight: 500;
    cursor: default;
    transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  
  .ia-tip-pill:hover {
    background: #ede9fe;
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(124,58,237,0.18);
  }
  
  .ia-tip-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #C2D96F;
    flex-shrink: 0;
  }

  /* Tablet Breakpoint */
  @media (min-width: 640px) {
    .ia-section {
      padding: 2rem 1.5rem;
    }
    
    .ia-content {
      gap: 1.5rem;
    }
    
    .ia-card {
      max-width: 340px;
      padding: 1.25rem;
    }
    
    .ia-img {
      max-width: 26rem;
    }
  }

  /* Desktop Breakpoint */
  @media (min-width: 768px) {
    .ia-section {
      padding: 2rem 2rem;
    }
    
    .ia-content {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      gap: 2rem;
    }
    
    .ia-card {
      margin-top: -4rem;
      margin-right: -1rem;
    }
    
    .ia-img {
      max-width: 24rem;
    }
  }

  /* Large Desktop Breakpoint */
  @media (min-width: 1024px) {
    .ia-section {
      padding: 2.5rem 2rem;
    }
    
    .ia-content {
      gap: 3rem;
    }
    
    .ia-card {
      max-width: 380px;
      margin-top: 1rem;
      margin-right: -2rem;
    }
    
    .ia-img {
      max-width: 28rem;
    }
  }

  /* Extra Large Desktop */
  @media (min-width: 1280px) {
    .ia-section {
      padding: 3rem 2rem;
    }
    
    .ia-content {
      gap: 4rem;
    }
    
    .ia-card {
      max-width: 400px;
    }
    
    .ia-img {
      max-width: 30rem;
    }
  }

  /* Small Mobile Adjustments */
  @media (max-width: 480px) {
    .ia-section {
      padding: 1rem 0.75rem;
    }
    
    .ia-title {
      font-size: clamp(1.3rem, 6vw, 1.8rem);
    }
    
    .ia-subtitle {
      font-size: 0.8rem;
    }
    
    .ia-card {
      max-width: 280px;
      padding: 0.875rem;
    }
    
    .ia-card-text p {
      font-size: 0.7rem;
    }
    
    .ia-card-text p span {
      font-size: 0.7rem;
    }
    
    .ia-img {
      max-width: 250px;
    }
    
    .ia-highlight::before,
    .ia-highlight::after {
      border-width: 2px;
      height: clamp(2.5rem, 8vw, 4rem);
    }
  }

  /* Handle very small screens */
  @media (max-width: 360px) {
    .ia-card {
      max-width: 240px;
      padding: 0.75rem;
    }
    
    .ia-card-text p {
      font-size: 0.65rem;
    }
    
    .ia-img {
      max-width: 220px;
    }
  }

  /* Landscape orientation for mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    .ia-section {
      padding: 1rem;
    }
    
    .ia-content {
      margin-top: 1rem;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) {
    .ia-card:hover,
    .ia-img:hover {
      transform: none;
    }
    
    .ia-card:active {
      transform: rotate(-5deg) translateY(-5px);
    }
    
    .ia-img:active {
      transform: rotate(5deg) translateY(-5px);
    }
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .ia-title,
    .ia-subtitle,
    .ia-rank-row,
    .ia-content,
    .ia-tips-grid {
      animation: none;
      opacity: 1;
    }
    
    .ia-card,
    .ia-img {
      animation: none;
    }
    
    .ia-card:hover,
    .ia-img:hover {
      transform: none;
    }
  }

  /* Print styles */
  @media print {
    .ia-section {
      color: black;
      background: white;
    }
    
    .ia-title {
      color: black;
    }
    
    .ia-card {
      box-shadow: none;
      border: 1px solid #ccc;
      animation: none;
    }
    
    .ia-img {
      animation: none;
    }
  }
`;

const TIPS = [
  "Research the company deeply",
  "Practice STAR method answers",
  "Prepare 5 smart questions",
  "Dress one level above the role",
  "Arrive 10 minutes early",
  "Follow up with a thank-you note",
  "Master your elevator pitch",
  "Know your salary expectations",
];

const ADVICE = [
  {
    label: "Before",
    highlight: "Preparation",
    body: "Study the job description word-for-word and mirror its language back in your answers. Research recent company news so you can connect your goals to theirs.",
  },
  {
    label: "During",
    highlight: "STAR Method",
    body: "Structure every behavioural answer with a clear Situation, Task, Action, and Result. Quantify outcomes whenever possible — numbers make stories memorable.",
  },
  {
    label: "After",
    highlight: "Follow-Up",
    body: "Send a personalised thank-you email within 24 hours. Reference something specific from the conversation to show you were genuinely engaged.",
  },
];

const InterviewAdvice = () => {
  return (
    <>
      <style>{styles}</style>
      <section className="ia-section">
        <h2 className="ia-title">
          Ace Your Next{" "}
          <span className="ia-highlight">Interview</span>
        </h2>

        <p className="ia-subtitle">
          Practical advice to help you walk in confident and walk out hired.
        </p>

        <p className="ia-rank-row">
          Top <PiRankingFill className="ia-rank-icon" style={{ margin: "0 4px" }} />{" "}
          <span className="ia-rank-label">Career Tips</span>
        </p>

        <div className="ia-content">
          <div className="ia-card">
            <div className="ia-card-text">
              {ADVICE.map((item, i) => (
                <React.Fragment key={i}>
                  <p>
                    <span>{item.label} — {item.highlight}:</span>{" "}
                    {item.body}
                  </p>
                  {i < ADVICE.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <img
            src={PodImg}
            alt="Interview preparation"
            className="ia-img"
          />
        </div>

        {/* Uncomment to show tips grid */}
        {/* <div className="ia-tips-grid">
          {TIPS.map((tip, i) => (
            <div className="ia-tip-pill" key={i}>
              <span className="ia-tip-dot" />
              {tip}
            </div>
          ))}
        </div> */}
      </section>
    </>
  );
};

export default InterviewAdvice;