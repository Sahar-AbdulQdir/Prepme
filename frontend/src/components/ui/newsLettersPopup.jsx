import React from "react";
import Mascot from "../../assets/Images/mascot2.png";

export default function NewsletterPopup({ show, onClose, email }) {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <img src={Mascot} alt="Mascot" style={styles.img} />

        <h2>Welcome aboard 🎉</h2>
        <p>Thanks for joining our newsletter!</p>
        <p style={{ opacity: 0.7 }}>{email}</p>

        <button onClick={onClose} style={styles.btn}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
popup: {
  background: "#0d2b3c",
  padding: 30,
  borderRadius: 16,
  textAlign: "center",
  color: "white",
  width: 320,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
},
  img: {
    width: 150,
    marginBottom: 10,
  },
  btn: {
    marginTop: 15,
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "#c2d96f",
    cursor: "pointer",
  },
};