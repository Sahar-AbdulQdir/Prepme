import { useRef, useEffect, useState } from "react";

const podcasts = [
  {
    id: 1,
    title: "Top 10 Job Interview Tips",
    episode: "TOP 10 TIPS for PASSING a JOB INTERVIEW! How to Ace an Interview",
    host: "Richard McMunn",
    image: "https://i.ytimg.com/vi/OLM5V_yF9Gs/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=OLM5V_yF9Gs",
    duration: "14:32",
    tags: ["#InterviewTips", "#JobSearch", "#CareerPrep"],
    tagColor: "#073B5A",
    tagBg: "rgba(7, 59, 90, 0.12)",
  },
  {
    id: 2,
    title: "I've Hired Hundreds – Here's How You NAIL an Interview",
    episode: "A Hiring Manager Reveals Insider Secrets to Landing the Job",
    host: "Don Georgevich",
    image: "https://i.ytimg.com/vi/7fBmDdithl4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=7fBmDdithl4",
    duration: "18:47",
    tags: ["#HiringInsider", "#InterviewStrategy", "#GetHired"],
    tagColor: "#AA7BD9",
    tagBg: "rgba(170, 123, 217, 0.12)",
  },
  {
    id: 3,
    title: "Tell Me About Yourself – Copy This Answer",
    episode: "Nail the #1 Interview Opening Question with a Proven Formula (Ex-Recruiter)",
    host: "Ex-Recruiter Breakdown",
    image: "https://i.ytimg.com/vi/hg6HzvtZSR4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=hg6HzvtZSR4",
    duration: "~10 min",
    tags: ["#SelfIntroduction", "#OpeningQuestion", "#FirstImpression"],
    tagColor: "#C3DA70",
    tagBg: "rgba(195, 218, 112, 0.18)",
  },
  {
    id: 4,
    title: "5 Tips to Ace Your Interview – From a Former CEO",
    episode: "How to Ace an Interview | Preparation is the Difference-Maker",
    host: "Former CEO Career Coach",
    image: "https://i.ytimg.com/vi/p6We26wlFY0/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=p6We26wlFY0",
    duration: "~12 min",
    tags: ["#CEOInsights", "#ExecutiveTips", "#InterviewPrep"],
    tagColor: "#073B5A",
    tagBg: "rgba(7, 59, 90, 0.12)",
  },
  {
    id: 5,
    title: "STAR Method: Ace Your Amazon Interview",
    episode: "STAR Method – How to Use It to Crush Your Next Job Interview",
    host: "Amazon Career Veteran",
    image: "https://i.ytimg.com/vi/UQrTMxouDUY/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=UQrTMxouDUY",
    duration: "~20 min",
    tags: ["#STARMethod", "#BehavioralQ", "#AmazonInterview"],
    tagColor: "#AA7BD9",
    tagBg: "rgba(170, 123, 217, 0.12)",
  },
  {
    id: 6,
    title: "Behavioral Interview Questions: STAR Method Deep Dive",
    episode: "Answer Behavioral Job Interview Questions Using the STAR Method",
    host: "Interview Preparation Coach",
    image: "https://i.ytimg.com/vi/lp4DpTdgN58/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=lp4DpTdgN58",
    duration: "~18 min",
    tags: ["#STARMethod", "#BehavioralInterview", "#AnswerStructure"],
    tagColor: "#C3DA70",
    tagBg: "rgba(195, 218, 112, 0.18)",
  },
  {
    id: 7,
    title: "Speak Fluently & Confidently in Any Interview",
    episode: "HOW to SPEAK FLUENTLY in INTERVIEWS! Job Interview Communication Tips",
    host: "Interview English Coach",
    image: "https://i.ytimg.com/vi/w28JEwRwE7E/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=w28JEwRwE7E",
    duration: "~15 min",
    tags: ["#Communication", "#SpeakingFluency", "#Confidence"],
    tagColor: "#073B5A",
    tagBg: "rgba(7, 59, 90, 0.12)",
  },
];

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

function PodcastCard({ podcast }) {
  const [imgError, setImgError] = useState(false);
  const initials = podcast.host.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="podcast-card">
      {/* Thumbnail */}
      <div className="card-thumbnail">
        {!imgError ? (
          <img
            src={podcast.image}
            alt={podcast.episode}
            onError={() => setImgError(true)}
            className="card-image"
          />
        ) : (
          <div className="card-fallback">
            {initials}
          </div>
        )}
        {/* Duration */}
        <div className="card-duration">
          <ClockIcon />
          {podcast.duration}
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <p className="card-title">{podcast.title}</p>
        <h3 className="card-episode">{podcast.episode}</h3>

        {/* Tags */}
        <div className="card-tags">
          {podcast.tags.map((tag) => (
            <span
              key={tag}
              className="card-tag"
              style={{
                background: podcast.tagBg,
                color: podcast.tagColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button className="listen-button">
            <PlayIcon /> Listen Now
          </button>

          <a
            href={podcast.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-button"
            title="Open YouTube channel"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

const SPEED = 0.45;

export default function PodcastSuggestions() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const nudge = (dir) => {
    const cardWidth = window.innerWidth < 640 ? 240 : 260;
    posRef.current = Math.max(0, posRef.current + dir * (cardWidth + 20));
  };

  const items = [...podcasts, ...podcasts];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

        .ps-wrap * {
          box-sizing: border-box;
        }
        
        .ps-wrap {
          font-family: 'Istok Web', sans-serif;
          background: #0c1b33;
          padding: 40px 0;
          overflow: hidden;
        }

        /* Header Styles */
        .ps-header {
          padding: 0 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .ps-wrap {
            padding: 50px 0;
          }
          
          .ps-header {
            padding: 0 24px;
            margin-bottom: 30px;
            align-items: flex-end;
          }
        }

        @media (min-width: 1024px) {
          .ps-wrap {
            padding: 68px 0 60px;
          }
          
          .ps-header {
            padding: 0 32px;
            margin-bottom: 36px;
          }
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        @media (min-width: 640px) {
          .header-badge {
            font-size: 11px;
            padding: 5px 14px;
            margin-bottom: 16px;
          }
        }

        .main-title {
          font-family: 'Istok Web', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 8px;
        }

        @media (min-width: 640px) {
          .main-title {
            font-size: 32px;
            margin: 0 0 10px;
          }
        }

        @media (min-width: 1024px) {
          .main-title {
            font-size: clamp(36px, 4vw, 44px);
            line-height: 1.1;
          }
        }

        .arrow-controls {
          display: flex;
          gap: 8px;
          padding-bottom: 2px;
        }

        @media (min-width: 640px) {
          .arrow-controls {
            gap: 10px;
          }
        }

        .arrow-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.13);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }

        @media (min-width: 640px) {
          .arrow-button {
            width: 42px;
            height: 42px;
          }
        }

        .arrow-button:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        /* Scrolling Track */
        .scroll-container {
          overflow: hidden;
          padding-bottom: 6px;
        }

        .podcast-track {
          display: flex;
          gap: 16px;
          will-change: transform;
          padding-left: 16px;
          width: max-content;
        }

        @media (min-width: 640px) {
          .podcast-track {
            gap: 20px;
            padding-left: 24px;
          }
        }

        @media (min-width: 1024px) {
          .podcast-track {
            padding-left: 32px;
          }
        }

        /* Podcast Card */
        .podcast-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          width: 240px;
          flex-shrink: 0;
          overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .podcast-card {
            border-radius: 16px;
            width: 260px;
          }
        }

        .podcast-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.13);
        }

        .card-thumbnail {
          position: relative;
          width: 100%;
          height: 135px;
          background: #f3f4f6;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .card-thumbnail {
            height: 148px;
          }
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-fallback {
          width: 100%;
          height: 100%;
          background: #f0fdf4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: #16a34a;
          letter-spacing: 2px;
        }

        @media (min-width: 640px) {
          .card-fallback {
            font-size: 38px;
          }
        }

        .card-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.62);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 640px) {
          .card-duration {
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 6px;
          }
        }

        .card-body {
          padding: 12px 14px 14px;
        }

        @media (min-width: 640px) {
          .card-body {
            padding: 14px 16px 16px;
          }
        }

        .card-title {
          font-size: 10px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 4px;
        }

        @media (min-width: 640px) {
          .card-title {
            font-size: 11px;
          }
        }

        .card-episode {
          font-size: 13px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .card-episode {
            font-size: 14px;
            margin: 0 0 11px;
          }
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 12px;
        }

        @media (min-width: 640px) {
          .card-tags {
            gap: 5px;
            margin-bottom: 14px;
          }
        }

        .card-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 100px;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .card-tag {
            font-size: 11px;
            padding: 3px 9px;
          }
        }

        .card-actions {
          display: flex;
          gap: 6px;
        }

        @media (min-width: 640px) {
          .card-actions {
            gap: 8px;
          }
        }

        .listen-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 7px 0;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        @media (min-width: 640px) {
          .listen-button {
            gap: 6px;
            border-radius: 9px;
            padding: 8px 0;
            font-size: 12px;
          }
        }

        .listen-button:hover {
          background: #334155;
        }

        .youtube-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.15s;
          border: none;
        }

        @media (min-width: 640px) {
          .youtube-button {
            width: 36px;
            height: 36px;
            border-radius: 9px;
          }
        }

        .youtube-button:hover {
          background: #fecaca;
        }

        /* Touch device optimizations */
        @media (hover: none) {
          .podcast-card:hover {
            transform: none;
            box-shadow: none;
          }
          
          .podcast-card:active {
            transform: scale(0.98);
          }
        }
      `}</style>

      <section className="ps-wrap">
        {/* Header row */}
        <div className="ps-header">
          <div>
            <div className="header-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 1 0 9 9A9 9 0 0 0 12 3zm-1 13V8l6 4z" />
              </svg>
              Podcast Picks
            </div>
            <h2 className="main-title">
              Listen &amp; Land Your Dream Job
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="arrow-controls">
            {[
              { dir: -1, Icon: ChevronLeft },
              { dir: 1, Icon: ChevronRight },
            ].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => nudge(dir)}
                className="arrow-button"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {/* Scrolling track */}
        <div
          className="scroll-container"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div ref={trackRef} className="podcast-track">
            {items.map((podcast, i) => (
              <PodcastCard key={`${podcast.id}-${i}`} podcast={podcast} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}