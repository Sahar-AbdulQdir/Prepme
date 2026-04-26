import emailjs from "@emailjs/browser";

export const sendNewsletterEmail = async (email) => {
  return emailjs.send(
    "service_pun7lni",
    "template_boq2zng",
    {
      user_email: email,
    },
    "IbRGONvwhFwrv-fQR"
  );
};