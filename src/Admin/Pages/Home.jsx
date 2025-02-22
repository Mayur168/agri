// import React, { useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import bgimage from "../../assets/img/demo.jpg"; // Import image

// const Home = () => {
//   useEffect(() => {
//     document.title = "Home - Agriculture"; // Set the page title dynamically
//   }, []);

//   return (
//     <div
//       style={{
//         height: "100vh", // Full screen height
//         width: "100vw", // Full screen width
//         backgroundImage: `url(${bgimage})`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text visibility
//           padding: "20px",
//           borderRadius: "10px",
//         }}
//       >
//         {/* Welcome title and description */}
//         {/* <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>
//           Welcome to Agriculture Portal
//         </h1>
//         <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>
//           Empowering Farmers with Technology
//         </p> */}

//         {/* My Farm Card */}
//         <Link to="/cities" style={{ textDecoration: "none" }}>
//           <div
//             className="card text-center bg-light p-4"
//             style={{
//               cursor: "pointer", // Make the card clickable
//               borderRadius: "59px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <h2 className="card-title  mb-3">My Farm</h2>
//             <p className="card-text">
//               View your farm details and manage your crops.
//             </p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import bgimage from "../../assets/img/demo.jpg"; // Import image
// import { useLanguage } from "../../contexts/LanguageContext"; // Import language context

// const Home = () => {
//   const { language, toggleLanguage } = useLanguage(); // Get the language and toggle function from context

//   useEffect(() => {
//     document.title =
//       language === "en" ? "Home - Agriculture" : "मुख्य पृष्ठ - कृषी"; // Set the page title dynamically based on language
//   }, [language]);

//   return (
//     <div
//       style={{
//         height: "100vh", // Full screen height
//         width: "100vw", // Full screen width
//         backgroundImage: `url(${bgimage})`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         textAlign: "center",
        
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text visibility
//           padding: "20px",
//           borderRadius: "10px",
//         }}
//       >
//         {/* Language Toggle Button */}
//         <button
//           onClick={toggleLanguage}
//           style={{
//             position: "absolute", // Place it at the top right
//             top: "71px",
//             right: "12px",
//             backgroundColor: "#fff",
//             border: "none",
//             padding: "5px 10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             font: "-webkit-control",
//           }}
//         >
//           {language === "en" ? " मराठी" : " English"}
//         </button>

//         {/* Welcome title and description */}
//         <h1
//           style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}
//         >
//           {language === "en"
//             ? "Welcome to Agriculture Portal"
//             : "कृषी पोर्टलमध्ये स्वागत आहे"}
//         </h1>
//         {/* <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>
//           {language === "en" ? "Empowering Farmers with Technology" : "तंत्रज्ञानाने शेतकऱ्यांना सशक्त बनविणे"}
//         </p> */}

//         {/* My Farm Card */}
//         <div
//           className="card text-center bg-light p-4"
//           style={{
//             borderRadius: "20px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             maxWidth: "250px",
//             margin: "auto",
//           }}
//         >
//           <h2 className="card-title mb-3">
//             {language === "en" ? "My Farm" : "माझ शेत"}
//           </h2>
//           <p className="card-text">
//             {language === "en"
//               ? "View your farm details and manage your crops."
//               : "तुमचे शेत तपशील पहा आणि तुमची पीक व्यवस्थापित करा."}
//           </p>
//           {/* Button for navigation */}
//           <Link to="/cities">
//             <button className="btn btn-success px-4 py-2 mt-3">
//               {language === "en" ? "Go to My Farm" : "माझ्या शेताकडे जा"}
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


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
