import React from "react";

const GradientWrapper = ({ children }) => {
  return (
    <>
      {/* Inject CSS directly */}
      <style>
        {`
          .gradient-wrapper {
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 30px;

            /* Gradient background */
            background: linear-gradient(135deg, #1f1c2c, #928dab, #1f4037);
            background-size: 400% 400%;

            /* Animate the gradient */
            animation: gradientAnimation 15s ease infinite;

            /* Ensure children are on top */
            position: relative;
            z-index: 1;
          }

          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* Wrapper */}
      <div className="gradient-wrapper">{children}</div>
    </>
  );
};

export default GradientWrapper;