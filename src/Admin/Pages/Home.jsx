

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/img/image.png"; // Import image
import { useLanguage } from "../../contexts/LanguageContext"; // Import language context

const Home = () => {
  const { language, toggleLanguage } = useLanguage(); // Get the language and toggle function from context

  useEffect(() => {
    document.title =
      language === "en" ? "Home - Agriculture" : "मुख्य पृष्ठ - कृषी"; // Set the page title dynamically based on language
  }, [language]);

  return (
    <div
      style={{
        position: "fixed", // Fix to viewport
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgimage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // position: "relative",
      }}
    >
      {/* Dark Overlay to Cover the Whole Page */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        }}
      ></div>

      {/* Content (Above Overlay) */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "white",
        }}
      >
        {/* Language Toggle Button */}
        <button
  onClick={toggleLanguage}
  style={{
    position: "fixed",
    top: "73px",
    right: "15px",
    backgroundColor: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
    zIndex: 1000,
  }}
>
  {language === "en" ? "मराठी" : "English"}
</button>

        {/* Welcome Title */}
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
          {language === "en"
            ? "Welcome to Agriculture Portal"
            : "कृषी पोर्टलमध्ये स्वागत आहे"}
        </h1>

        {/* Go to My Farm Button (No Container) */}
        <Link to="/cities">
          <button className="btn btn-success px-3 py-1 mt-2">
            {language === "en" ? "Go to My Farm" : "माझ्या शेताकडे जा"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
