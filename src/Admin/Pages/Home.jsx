// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import bgimage from "../../assets/img/image.png";
// import { useLanguage } from "../../contexts/LanguageContext";

// const Home = () => {
//   const { language, toggleLanguage } = useLanguage();

//   useEffect(() => {
//     document.title =
//       language === "en" ? "Home - Agriculture" : "मुख्य पृष्ठ - कृषी";
//   }, [language]);

//   return (
//     <div
//       style={{
//         position: "fixed", 
//         height: "100%",
//         width: "100%",
//         left:'0',
//         backgroundImage: `url(${bgimage})`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)", 
//           zIndex: 1,
//         }}
//       ></div>

//       <div
//         style={{
//           position: "relative",
//           zIndex: 2,
//           color: "white",
//         }}
//       >
//         {/* Language Toggle Button */}
//         <button
//           onClick={toggleLanguage}
//           style={{
//             position: "fixed",
//             top: "76px",
//             right: "15px",
//             backgroundColor: "#fff",
//             border: "none",
//             padding: "6px 10px",
//             borderRadius: "15px",
//             cursor: "pointer",
//             fontSize: "16px",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
//             zIndex: 1000,
//           }}
//         >
//           {language === "en" ? "मराठी" : "English"}
//         </button>

//         {/* Welcome Title */}
//         <h1
//           style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "176px" }}
//         >
//           {language === "en"
//             ? "Welcome to Agriculture Portal"
//             : "कृषी पोर्टलमध्ये स्वागत आहे"}
//         </h1>

//         {/* Go to My Farm Button (No Container) */}
//         {/* <Link to="/Admin/Villages">
//           <button className="btn btn-success px-3 py-1 mt-2">
//             {language === "en" ? "Go to My Farm" : "आपल्या शेताकडे जा"}
//           </button>
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/img/image.png";
import { useLanguage } from "../../contexts/LanguageContext";

const Home = ({ closeMenu }) => {
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.title =
      language === "en" ? "Home - Agriculture" : "मुख्य पृष्ठ - कृषी";
  }, [language]);

  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        left: "0",
        backgroundImage: `url(${bgimage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

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
            top: "76px",
            right: "15px",
            backgroundColor: "#fff",
            border: "none",
            padding: "6px 10px",
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
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "17px" }}
        >
          {language === "en"
            ? "Welcome to Agriculture Portal"
            : "कृषी पोर्टलमध्ये स्वागत आहे"}
        </h1>

        {/* Navigation Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1300px",
          }}
        >
          {/* Card 1: Users */}
          <div
            style={{
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              width: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              to="/admin/manager-list"
              onClick={closeMenu}
              style={{
                color: "#f8f9fa",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "5px 10px",
                width: "138%",
                textAlign: "center",
                border: "1px solid #f8f9fa",
                borderRadius: "5px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {language === "en" ? "Users" : "वापरकर्ते"}
            </Link>
          </div>

         

          {/* Card 2: Billing */}
          <div
            style={{
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              // width: "200px",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              to="/admin/billing"
              onClick={closeMenu}
              style={{
                color: "#f8f9fa",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "5px 10px",
                // width: "100%",
                textAlign: "center",
                border: "1px solid #f8f9fa",
                borderRadius: "5px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {language === "en" ? "Billing" : "बिलिंग"}
            </Link>
          </div>

           {/* Card 3: Villages */}
          <div
            style={{
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              // width: "200px",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              to="/admin/Villages"
              onClick={closeMenu}
              style={{
                color: "#f8f9fa",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "5px 10px",
                // width: "100%",
                textAlign: "center",
                border: "1px solid #f8f9fa",
                borderRadius: "5px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {language === "en" ? "Villages" : "गावे"}
            </Link>
          </div>

          {/* Card 4: Expenses */}
          <div
            style={{
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              // width: "200px",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              to="/admin/AdminExpense"
              onClick={closeMenu}
              style={{
                color: "#f8f9fa",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "5px 10px",
                // width: "100%",
                textAlign: "center",
                border: "1px solid #f8f9fa",
                borderRadius: "5px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {language === "en" ? "Expenses" : "खर्च"}
            </Link>
          </div>

          {/* Card 5: Taken Amount */}
          <div
            style={{
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              width: "200px",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              to="/admin/takenAmount"
              onClick={closeMenu}
              style={{
                color: "#f8f9fa",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "5px 10px",
                width: "100%",
                textAlign: "center",
                border: "1px solid #f8f9fa",
                borderRadius: "5px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {language === "en" ? "Taken Amount" : "घेतलेली रक्कम"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import bgimage from "../../assets/img/image.png";
// import { useLanguage } from "../../contexts/LanguageContext";

// const Home = () => {
//   const { language, toggleLanguage } = useLanguage();

//   useEffect(() => {
//     document.title =
//       language === "en" ? "Home - Agriculture" : "मुख्य पृष्ठ - कृषी";
//   }, [language]);

//   return (
//     <div
//       style={{
//         position: "fixed", 
//         height: "100%",
//         width: "100%",
//         left:'0',
//         backgroundImage: `url(${bgimage})`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)", 
//           zIndex: 1,
//         }}
//       ></div>

//       <div
//         style={{
//           position: "relative",
//           zIndex: 2,
//           color: "white",
//         }}
//       >
//         {/* Language Toggle Button */}
//         <button
//           onClick={toggleLanguage}
//           style={{
//             position: "fixed",
//             top: "76px",
//             right: "15px",
//             backgroundColor: "#fff",
//             border: "none",
//             padding: "6px 10px",
//             borderRadius: "15px",
//             cursor: "pointer",
//             fontSize: "16px",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
//             zIndex: 1000,
//           }}
//         >
//           {language === "en" ? "मराठी" : "English"}
//         </button>

//         {/* Welcome Title */}
//         <h1
//           style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "41px" }}
//         >
//           {language === "en"
//             ? "Welcome to Agriculture Portal"
//             : "कृषी पोर्टलमध्ये स्वागत आहे"}
//         </h1>

//         {/* Go to My Farm Button (No Container) */}
//         <Link to="/Admin/Villages">
//           <button className="btn btn-success px-3 py-1 mt-2">
//             {language === "en" ? "Go to My Farm" : "आपल्या शेताकडे जा"}
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;