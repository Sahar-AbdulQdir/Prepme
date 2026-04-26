import React from "react";
import HeroPodImg from "../../assets/Images/lan_1.jpg";

const styles = {
  section: {
    fontfamily: "'Istok Web', sans-serif",
    position: "relative",
    padding: "80px 5%",
    overflow: "hidden",
  },
  bgTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
    background: "#7c6af7",
    opacity: 0.1,
  },
  bgBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    background: "#C2D96F",
    opacity: 0.1,
  },
  heroInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "50px",
  },
  text: {
    maxWidth: "500px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  span: {
    color: "#7c6af7",
  },
  button: {
    padding: "12px 24px",
    border: "none",
    background: "#7c6af7",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "15px",
  },
  image: {
    maxWidth: "400px",
    borderRadius: "20px",
  },
};

const prepHero = () => (
  <>
    <style>
      {`@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');`}
    </style>
    <section style={styles.section}>
    <div style={styles.bgTop}></div>
    <div style={styles.bgBottom}></div>

    <div>
      <div style={styles.heroInner}>
        <div style={styles.text}>
          <h1 style={styles.heading}>
            The Podcast <span style={styles.span}>´ˎ˗</span> Show
          </h1>
          <p>
            Dive into inspiring conversations, stories, and insights from top creators and thinkers.
          </p>
          <button style={styles.button}>Listen Now</button>
        </div>

        <div>
          <img src={HeroPodImg} alt="Podcast Hero" style={styles.image} />
        </div>
      </div>
    </div>
  </section>
  </>
);

export default prepHero;