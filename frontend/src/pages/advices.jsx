// Importing React and all necessary components and styles for the Podcast Page
import React from "react";
// import PrepHero from "../components/Advices/prepHero.jsx";
import Highlights from "../components/Advices/Highlights.jsx";
// import ImageGrid from "../components/Advices/suggestions.jsx";
import MainNavbar from "../components/MainNavbar.jsx";
import InterviewTips from "../components/Advices/FAQs.jsx";
import InterviewAdvice from "../components/Advices/RecoPod.jsx";
import "../styles/advices.css";
import PodcastSuggestions from "../components/Advices/SuggestionsPodcasts.jsx";
// import Logo from "../assets/Images/Plogo.png";
import InterviewFundamentals from "../components/Advices/fundementals.jsx";
import Footer from "../components/Footer.jsx";
import SplashCursor from "../components/splashCursor.jsx";


// const FOOTER_COLS = [
//   {
//     heading: "Product",
//     links: ["Features", "Industries", "Pricing", "Free Trial"],
//   },
//   {
//     heading: "Company",
//     links: ["About Us", "Blog", "Careers", "Contact"],
//   },
//   {
//     heading: "Resources",
//     links: ["Interview Tips", "STAR Method Guide", "FAQ", "Support"],
//   },
//   {
//     heading: "Legal",
//     links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
//   },
// ];


const Advices = ({ onNavigate }) => {
  return (
    <div className="podcast-page">
        {/* <h1>TEST</h1> */}
                <SplashCursor
    SIM_RESOLUTION={224}
    DYE_RESOLUTION={640}
    DENSITY_DISSIPATION={2.5}
    VELOCITY_DISSIPATION={2}
    PRESSURE={0.6}
    CURL={0}
    SPLAT_RADIUS={0.2}
    SPLAT_FORCE={3000}
    COLOR_UPDATE_SPEED={8}
  />

      <div className="podcast-foreground">
        <MainNavbar navigate={onNavigate} />
        <Highlights />
          <PodcastSuggestions />
        {/* <PrepHero /> */}
      {/* <ImageGrid /> */}
        <InterviewAdvice />
        <InterviewFundamentals />
         <InterviewTips />
           {/* ── FOOTER ── */}
          <Footer/>
      </div>
    </div>
  );
};

// Export the PodcastPage component
export default Advices;
