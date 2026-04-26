import { useState } from "react";
import { sendNewsletterEmail } from "../utils/email";

export default function useNewsletter() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();

    try {
      await sendNewsletterEmail(email);

      setShowPopup(true);
      setEmail("");
    } catch (err) {
      console.error("Email failed:", err);
    }
  };

  return {
    email,
    setEmail,
    subscribe,
    showPopup,
    setShowPopup,
  };
}