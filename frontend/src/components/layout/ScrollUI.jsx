import React, { useEffect, useState } from "react";
import "../../styles/scrollUI.css"; // move styles to this file
import { FiArrowUp } from "react-icons/fi";

const ScrollUI = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [offset, setOffset] = useState(0); // ✅ must exist here

  useEffect(() => {
    const nav = document.querySelector("scrollingUi");
    if (nav) setOffset(nav.offsetHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);

      setShowButton(
        scrollTop + window.innerHeight >=
          document.documentElement.scrollHeight - 50
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress-container" style={{ top: offset }}>
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

   <button
  className={`scroll-to-top ${showButton ? "visible" : ""}`}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  aria-label="Scroll to top"
>
  <FiArrowUp />
</button>
    </>
  );
};

export default ScrollUI;