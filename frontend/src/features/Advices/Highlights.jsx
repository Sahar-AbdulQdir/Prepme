import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faExternalLinkAlt,
  faPodcast,
  faUsers,
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons';

// Component for displaying trending podcast highlights with hover-preview videos
const Highlights = () => {
  // Ref array to hold references to each video element
  const videoRefs = useRef([]);

  // Array of featured podcast highlights
  const podcasts = [
    {
      id: 1,
      title: "Why Do You Want To Work Here?",
      videoSrc: "/Vid-1.mp4",
      duration: "0:15",
      sourceUrl: "https://www.youtube.com/watch?v=bHynP5KNe3k"
    },
    {
      id: 2,
      title: "Tell Me About Yourself..",
      videoSrc: "/Vid-2.mp4",
      duration: "0:12",
      sourceUrl: "https://www.youtube.com/watch?v=es7XtrloDIQ"
    },
    {
      id: 3,
      title: "Answering behavioral interview questions",
      videoSrc: "/Vid-4.mp4",
      duration: "0:10",
      sourceUrl: "https://www.youtube.com/watch?v=WdyiUe7_3cA"
    },
    {
      id: 4,
      title: "A Good Answer To This Interview Question",
      videoSrc: "/Vid-3.mp4",
      duration: "0:18",
      sourceUrl: "https://www.youtube.com/watch?v=5v-wyR5emRw"
    }
  ];

  // Play video with sound on hover
const handleHoverPlay = (index) => {
  const video = videoRefs.current[index];
  if (!video) return;

  video.muted = true;

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        video.muted = false;
      })
      .catch(() => {});
  }
};

const handleHoverStop = (index) => {
  const video = videoRefs.current[index];
  if (!video) return;

  if (!video.paused) {
    video.pause();
  }

  video.currentTime = 0;
  video.muted = true;
};

  // Open podcast source link in a new tab
  const handlePodcastClick = (e, url) => {
    e.stopPropagation(); // prevent parent handlers
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Inject CSS directly */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

          /* CSS Variables */
          :root {
            /* main shades */
            --sh1: #D2ACE8FF;
            --sh2: #B5A6E9FF;
            --sh3: #FEFCFEFF;
            --sh4: #EDB9DCFF;
            --sh5: #E4BCE4FF;

            /* Light shades */
            --l1: #ffffff;
            --l2: #ffffff33;
            --l3: #ffffff00;
            --l4: #0000001a;
            --l5: #ffffffd9;
            --l6: #f0f0f3;
            --l7: #fffffff2;
            --l8: #ffffffe6;
            --l9: #e5e7eb;

            /* Dark shades */
            --d1: #000000ff;
            --d2: #000000b3;

            /* purple shades */
            --p1: #b25de4;
            --p2: #dec6ec;
            --p3: #7c5993;
            --p4: #d1c0f0;
            --p5: #fb9ce6;
            --p6: #e096f3;
            --p7: #8a1d98;
            --p8: #c1aae6;
            --p9: #f1cfe6;
            --p10: #C3DA70;
            --p11: #e145ef;
            --p12: #ffd6e7;
            --p13: #e6c6ff;
            --p14: #ff4d9d;
            --p15: #B5A6E9;

            /* grey shades */
            --g1: #111;
            --g2: #222;
            --g3: #666;
            --g4: #888;
            --g5: #9c948d;
            --g6: #e2e8f0;
            --g7: #bec7d1;
            --g8: #333;
            --g9: #b5a6e933;

            /* Red shades */
            --r1: #a31010;

            /* blue shades */
            --b1: #c6f2ff;
            --b2: #2d1f4a;
            --b3: #4f3b74;
            --b4: #5b3cc4;
          }

          .podcast-highlights-container {
            width: 100%;
            min-height: 45vh;
            color: var(--l1);
            font-family: 'Istok Web', sans-serif;
            box-sizing: border-box;
            padding: .5rem 1.25rem;
          }

          /* Main layout: places laptop mockup and descriptive content side-by-side */
          .Main-Laptop-container {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            gap: 3rem;
          }

          .content {
            flex: 1;
            max-width: 600px;
          }

          /* Badge/pill used to emphasize section label */
          .badge {
            display: inline-block;
            background: var(--p10);
            padding: 0.5rem 1rem;
            margin-top: 6rem;
            border-radius: 50px;
            font-size: 0.875rem;
            letter-spacing: 1px;
            margin-bottom: 1.25rem;
            text-transform: uppercase;
            font-weight: 600;
          }

          .content h2 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            margin: 0 0 1.25rem 0;
            font-weight: 700;
            line-height: 1.2;
            text-shadow: 0 2px 4px #00000033;
            color: var(--l1);
          }

          .description {
            font-size: clamp(0.875rem, 2vw, 1.2rem);
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 1.875rem;
          }

          /* Simple stats-row row (listeners, episodes, etc.) */
          .stats-row {
            background: #ffffff00;
            display: flex;
            flex-direction: row;
            gap: 1.675rem;
            margin-top: 2.5rem;
            flex-wrap: wrap;
            justify-content: flex-start;
          }

          .stat-item {
            text-align: center;
            flex: 0 1 auto;
          }

          .stat-number {
            font-size: clamp(1rem, 3vw, 1.6rem);
            font-weight: 700;
            color: var(--l1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            white-space: nowrap;
          }

          .stat-icon {
            font-size: 0.5em; /* relative to the number size */
            color: white;
          }

          .stat-label {
            font-size: clamp(0.75rem, 1.5vw, 1.2rem);
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
          }

          /* Laptop mockup styles */
          .laptop-container {
            flex: 1;
            max-width: 600px;
            min-width: 0;

          }

          .laptop {
            position: relative;
            margin: auto;
            max-width: 100%;
            /* Rotate the laptop slightly toward the text (left side closer) */
            // transform: rotateY(8deg);
            // transform-origin: center center;
            // transition: transform 0.3s ease;
          }

          /* Optional: stronger tilt on hover for interactivity */
          .laptop:hover {
            transform: rotateY(12deg);
          }

          .laptop__screen {
            position: relative;
            z-index: 1;
            padding: 2.5%;
            border-radius: 1.5rem;
            background-image: linear-gradient(to bottom, #333, #111);
            box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
            border: 2px solid #ccc;
            width: 100%;
            aspect-ratio: 520 / 350;
            overflow: hidden;
          }

          .laptop__bottom {
            position: relative;
            z-index: 1;
            margin: 0 -5%;
            height: 0.7rem;
            background-image: linear-gradient(
              to right,
              #d2dde9 0%,
              #f9fcff 15%,
              #e5ebf2 40%,
              #e5ebf2 60%,
              #f9fcff 85%,
              #d2dde9 100%
            );
          }

          .laptop__bottom::before {
            content: "";
            display: block;
            margin: 0 auto;
            width: 15%;
            height: 0.7rem;
            border-radius: 0 0 0.2rem 0.2rem;
            background-image: linear-gradient(
              to right,
              #c3cfdb 0%,
              #f6f9fc 10%,
              #f6f9fc 90%,
              #c3cfdb 100%
            );
          }

          .laptop__under {
            position: absolute;
            top: 100%;
            left: 25%;
            width: 50%;
            height: 1.2rem;
            background-image: linear-gradient(to bottom, var(--g6), var(--g7));
          }

          .laptop__under::before,
          .laptop__under::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50%;
            background: inherit;
          }

          .laptop__under::before {
            right: 100%;
            border-bottom-left-radius: 100%;
          }

          .laptop__under::after {
            left: 100%;
            border-bottom-right-radius: 100%;
          }

          .laptop__shadow {
            position: absolute;
            left: -8%;
            right: -8%;
            bottom: -1.8rem;
            height: 1.5rem;
            background: radial-gradient(ellipse closest-side, var(--d1), transparent);
            opacity: 0.4;
          }

          /* Podcast Highlights Grid: 2x2 layout of video highlights */
          .podcast-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 5px;
            height: 100%;
            width: 100%;
          }

          /* Individual highlight card */
          .podcast-item {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 8px var(--l4);
          }

          .podcast-item:hover {
            transform: translateY(-5px);
          }

          .video-container {
            width: 100%;
            height: 100%;
            position: relative;
            background-color: var(--d1);
            padding: 0px !important;
          }

          .video-container video {
            width: 100%;
            height: 100%;
            transition: opacity 0.3s ease;
            opacity: 1;
            padding: 0px;
            object-fit: cover;
          }

          /* Video specific positioning */
          .podcast-item:nth-child(1) video {
            object-position: center 20%;
          }

          .podcast-item:nth-child(2) video {
            object-position: center 32%;
            transform: scale(1.09);
          }

          .podcast-item:nth-child(4) video {
            object-position: center 9%;
            transform: scale(1.1);
          }

          /* Video overlay */
          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom,
              transparent 60%,
              rgba(0, 0, 0, 0.8) 100%
            );
            display: flex;
            align-items: flex-end;
            padding: 15px;
            box-sizing: border-box;
            pointer-events: none;
          }

          .podcast-item:hover .video-container video {
            opacity: 1;
          }

          .podcast-title {
            color: var(--l1);
            font-size: clamp(0.7rem, 1.5vw, 0.8rem);
            font-weight: 600;
            margin: 0;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
          }

          /* Source button */
          .podcast-source-btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: var(--p10);
            color: var(--l1);
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: clamp(0.5rem, 1vw, 0.6rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
            text-decoration: none;
            z-index: 10;
          }

          .podcast-source-btn:hover {
            background: var(--sh4);
            color: var(--l1);
            transform: scale(1.05);
          }

          /* Play icon */
          .play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--l1);
            font-size: clamp(2rem, 5vw, 3rem);
            opacity: 0.8;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 5;
          }

          .podcast-item:hover .play-icon {
            opacity: 0;
          }

          /* Duration badge */
          .duration {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--d2);
            color: var(--l1);
            padding: 3px 6px;
            border-radius: 3px;
            font-size: clamp(0.7rem, 1.5vw, 1rem);
            z-index: 5;
          }

          /* Glow effect */
          .glow-on-hover {
            border: none;
            outline: none;
            color: #fff;
            background: #b6e354 !important;
            cursor: pointer;
            position: relative;
            z-index: 0;
            border-radius: 20px;
          }

          .glow-on-hover:before {
            content: '';
            background: linear-gradient(
              45deg,
              #073B5A, #1A5674, #f8fceb, #ffffff, #AA7BD9, #C9A6F0, #073B5A
            );
            position: absolute;
            top: -2px;
            left: -2px;
            background-size: 400%;
            z-index: -1;
            filter: blur(5px);
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            animation: glowing 20s linear infinite;
            opacity: 1;
            border-radius: 50px;
          }

          .glow-on-hover:after {
            z-index: -1;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: #9ac639;
            left: 0;
            top: 0;
            border-radius: 50px;
          }

          .glow-on-hover:active {
            color: #000;
          }

          .glow-on-hover:active:after {
            background: transparent;
          }

          @keyframes glowing {
            0% { background-position: 0 0; }
            50% { background-position: 400% 0; }
            100% { background-position: 0 0; }
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .Main-Laptop-container {
              gap: 2rem;
            }
            .laptop {
              transform: rotateY(5deg); /* slightly less tilt */
            }
          }

          @media (max-width: 768px) {
            .podcast-highlights-container {
              padding: 1.5rem 1rem;
            }

            .Main-Laptop-container {
              flex-direction: column;
              gap: 2rem;
            }

            .content {
              max-width: 100%;
              text-align: center;
            }

            .stats-row {
              justify-content: center;
            }

            .laptop-container {
              max-width: 100%;
              perspective: none; /* remove 3D perspective on smaller screens */
            }

            .laptop {
              transform: none; /* disable rotation on mobile */
              max-width: 90%;
              margin: 0 auto;
            }

            .badge {
              margin-top: 0;
            }
          }

          @media (max-width: 640px) {
            .podcast-highlights-container {
              padding: 1rem 0.75rem;
            }

            .Main-Laptop-container {
              gap: 1.5rem;
            }

            .stats-row {
              gap: 1.25rem;
              justify-content: space-around;
            }

            .laptop {
              max-width: 100%;
            }

            .podcast-grid {
              gap: 3px;
            }

            .video-overlay {
              padding: 8px;
            }

            .podcast-source-btn {
              bottom: 5px;
              right: 5px;
              padding: 3px 6px;
            }
          }

          @media (max-width: 480px) {
            .stats-row {
              flex-direction: row;
              flex-wrap: wrap;
              gap: 1rem;
            }

            .stat-item {
              flex: 1 0 40%;
            }

            .laptop__screen {
              border-radius: 1rem;
            }

            .podcast-item:hover {
              transform: none;
            }

            /* Improve touch interaction */
            .podcast-source-btn {
              padding: 5px 8px;
              font-size: 0.7rem;
            }
          }

          /* Height-based responsive adjustments */
          @media (max-height: 600px) and (orientation: landscape) {
            .podcast-highlights-container {
              min-height: auto;
              padding: 1rem;
            }

            .Main-Laptop-container {
              gap: 1rem;
            }

            .content h2 {
              margin-bottom: 0.5rem;
            }

            .description {
              margin-bottom: 1rem;
            }

            .stats-row {
              margin-top: 1rem;
            }
          }

          /* High-resolution screens */
          @media (min-width: 1440px) {
            .Main-Laptop-container {
              max-width: 1400px;
            }

            .content {
              max-width: 700px;
            }

            .laptop-container {
              max-width: 700px;
            }
          }
        `}
      </style>

      <div className="podcast-highlights-container">
        <div className="Main-Laptop-container">
          {/* Content above the laptop mockup */}
<div className="content">
            <div className="badge glow-on-hover">
              <i className="fas fa-briefcase"></i> Top Interview Resources
            </div>

            <h2>Ace Your <span className="circle-sketch-highlight">Interview</span></h2>

            <p className="description">
              Expert-curated podcasts to help you prepare, practice, and perform your best. 
              From mastering the STAR method to nailing your first impression — get the insider tips 
              hiring managers actually want to hear. Hover over any video to preview and click to watch the full episode.
            </p>

            {/* stats-row section with icons */}
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">
                  <FontAwesomeIcon icon={faPodcast} className="stat-icon" />
                  200+
                </span>
                <span className="stat-label">Expert Tips</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                  1M+
                </span>
                <span className="stat-label">Users Helped</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  <FontAwesomeIcon icon={faGlobeAmericas} className="stat-icon" />
                  30+
                </span>
                <span className="stat-label">Industries Covered</span>
              </div>
            </div>
          </div>

          {/* Laptop mockup container for videos */}
          <div className="laptop-container">
            <div className="laptop">
              <div className="laptop__screen">
                <div className="podcast-grid">
                  {podcasts.map((podcast, index) => (
                    <div
                      key={podcast.id}
                      className="podcast-item"
                      onMouseEnter={() => handleHoverPlay(index)}
                      onMouseLeave={() => handleHoverStop(index)}
                    >
                      <div className="video-container">
                        {/* Video element with ref for control */}
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        >
                          <source src={podcast.videoSrc} type="video/mp4" />
                        </video>

                        {/* Duration overlay */}
                        <div className="duration">{podcast.duration}</div>

                        {/* Play icon overlay */}
                        <div className="play-icon">
                          <FontAwesomeIcon icon={faPlayCircle} />
                        </div>

                        {/* Title overlay */}
                        <div className="video-overlay">
                          <h3 className="podcast-title">{podcast.title}</h3>
                        </div>
                      </div>

                      {/* Button to go to full podcast source */}
                      <button
                        className="podcast-source-btn"
                        onClick={(e) => handlePodcastClick(e, podcast.sourceUrl)}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop base and shadow for visual effect */}
              <div className="laptop__bottom">
                <div className="laptop__under"></div>
              </div>
              <div className="laptop__shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;