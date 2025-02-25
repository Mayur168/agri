// // import React from "react";
// // import "./cities.css"; // Import external CSS
// // import { useNavigate } from "react-router-dom";

// // const Cities = () => {
// //   const navigate = useNavigate();
// //   const cities = [
// //     "Nashik",
// //     "Mumbai",
// //     "Jalgaon",
// //     "Pune",
// //     "Nagpur",
// //     "Chatrapati Sambhaji Nagar",
// //     "Thane",
// //     "Solapur",
// //     "Amravati",
// //   ];

// //   const handkeCityClick = (city) =>{
// //     navigate(`/sheti/${city}`);
// //   }

// //   return (
// //     <div className="cities-container">
// //       <h2>🌍 Popular Cities</h2>
// //       <div className="cities-grid">
// //         {cities.map((city, index) => (
// //           <div
// //             key={index}
// //             className="city-card"
// //             onClick={() => handkeCityClick(city)}
// //           >
// //             {city}
// //           </div>
// //         ))}
// //       </div>
// //       <button className="add-city-btn">➕ Add City</button>
// //     </div>
// //   );
// // };

// // export default Cities;

// import React, { useState, useEffect } from "react";
// import "./cities.css";
// import { useNavigate } from "react-router-dom";
// import BackButton from "../../Components/BackButton";

// const Cities = () => {
//   const navigate = useNavigate();

//   // Retrieve stored cities from localStorage or use default list
//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     return storedCities
//       ? JSON.parse(storedCities)
//       : [
//           "Nashik",
//           "Mumbai",
//           "Jalgaon",
//           "Pune",
//           "Nagpur",
//           "Chatrapati Sambhaji Nagar",
//           "Thane",
//           "Solapur",
//           "Amravati",
//         ];
//   };

//   // State to manage cities
//   const [cities, setCities] = useState(getStoredCities);

//   // Save cities to localStorage whenever the list changes
//   useEffect(() => {
//     localStorage.setItem("cities", JSON.stringify(cities));
//   }, [cities]);

//   // Navigate to Sheti page with the selected city
//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city}`);
//   };

//   // Function to add a new city
//   const handleAddCity = () => {
//     let newCity = prompt("Enter city name:")?.trim();

//     if (newCity) {
//       // Check if city already exists (case insensitive)
//       const cityExists = cities.some(
//         (city) => city.toLowerCase() === newCity.toLowerCase()
//       );

//       if (cityExists) {
//         alert("City already exists!");
//       } else {
//         const updatedCities = [...cities, newCity];
//         setCities(updatedCities); // Update state
//       }
//     } else {
//       alert("Please enter a valid city name.");
//     }
//   };

//   return (
//     <div className="cities-container mb-5">
//       <div className="mb-3 d-flex gap-4 align-items-center">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2"> 🌍 Popular Cities</h2>
//       </div>
//       <div className="cities-grid">
//         {cities.map((city, index) => (
//           <div
//             key={index}
//             className="city-card"
//             onClick={() => handleCityClick(city)}
//           >
//             {city}
//           </div>
//         ))}
//       </div>

//       <div className="add-city-container">
//         <button className="add-city-btn" onClick={handleAddCity}>
//           ➕ Add City
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cities;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./cities.css";
// import BackButton from "../../Components/BackButton";
// import { useLanguage } from "../../contexts/LanguageContext"; // Importing language context

// const Cities = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage(); // Get current language from context

//   // Retrieve stored cities from localStorage or use default list
//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     return storedCities
//       ? JSON.parse(storedCities)
//       : [
//           "Nashik",
//           "Mumbai",
//           "Jalgaon",
//           "Pune",
//           "Nagpur",
//           "Chatrapati Sambhaji Nagar",
//           "Thane",
//           "Solapur",
//           "Amravati",
//         ];
//   };

//   // State to manage cities
//   const [cities, setCities] = useState(getStoredCities);

//   // Save cities to localStorage whenever the list changes
//   useEffect(() => {
//     localStorage.setItem("cities", JSON.stringify(cities));
//   }, [cities]);

//   // Navigate to Sheti page with the selected city
//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city}`);
//   };

//   // Function to add a new city
//   const handleAddCity = () => {
//     let newCity = prompt("Enter city name:")?.trim();

//     if (newCity) {
//       // Check if city already exists (case insensitive)
//       const cityExists = cities.some(
//         (city) => city.toLowerCase() === newCity.toLowerCase()
//       );

//       if (cityExists) {
//         alert("City already exists!");
//       } else {
//         const updatedCities = [...cities, newCity];
//         setCities(updatedCities); // Update state
//       }
//     } else {
//       alert("Please enter a valid city name.");
//     }
//   };

//   // Translation map for language
//   const translations = {
//     en: {
//       title: "🌍 Popular Cities",
//       addCity: " Add City",
//     },
//     mr: {
//       title: "🌍 लोकप्रिय शहरे",
//       addCity: " शहर जोडा",
//     },
//   };

//   return (
//     <div className="cities-container mb-5 ">
//       {/* <div className="mb-3 d-flex gap-4 align-items-center ">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2">{translations[language].title}</h2>
//       </div> */}
//       <div className="mb-3 d-flex gap-2 align-items-center py-3 header-container">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2 text-white ">{translations[language].title}</h2>
//       </div>
//       <div className="container my-2">
//         <div className="d-flex align-items-center">
//           <div className="input-group rounded flex-grow-1">
//             <input
//               type="search"
//               className="form-control rounded"
//               placeholder={language === "en" ? "Search" : "शोधा"}
//               aria-label="Search"
//               aria-describedby="search-addon"
//             />
//             <span className="input-group-text border-0" id="search-addon">
//               <i className="fa fa-search"></i>
//             </span>
//           </div>
//           <button
//             className="btn btn-success btn-sm fw-bold ms-3 p-2 rounded"
//             onClick={handleAddCity}
//           >
//             <i className="bi bi-plus-lg text-white"></i>{" "}
//             {translations[language].addCity}
//           </button>
//         </div>
//       </div>

//       {/* <div className="add-city-container">
//         <button
//           className=" btn btn-success btn-sm fw-bold m-3 p-2 rounded"
//           onClick={handleAddCity}
//         >
//           <i className="bi bi-plus-lg text-white "></i>
//           {translations[language].addCity}
//         </button>
//       </div> */}
//       <div className="cities-grid">
//         {cities.map((city, index) => (
//           <div
//             key={index}
//             className="city-card"
//             onClick={() => handleCityClick(city)}
//           >
//             {city}
//           </div>
//         ))}
//       </div>

//       {/* <div className="add-city-container">
//         <button className="add-city-btn" onClick={handleAddCity}>
//           {translations[language].addCity}
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default Cities;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./cities.css";
// import BackButton from "../../Components/BackButton";
// import { useLanguage } from "../../contexts/LanguageContext"; // Importing language context

// const Cities = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage(); // Get current language from context

//   // Retrieve stored cities from localStorage or use default list
//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     return storedCities
//       ? JSON.parse(storedCities)
//       : [
//           "Nashik",
//           "Mumbai",
//           "Jalgaon",
//           "Pune",
//           "Nagpur",
//           "Chatrapati Sambhaji Nagar",
//           "Thane",
//           "Solapur",
//           "Amravati",
//         ];
//   };

//   // State to manage cities and search input
//   const [cities, setCities] = useState(getStoredCities);
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search input

//   // Save cities to localStorage whenever the list changes
//   useEffect(() => {
//     localStorage.setItem("cities", JSON.stringify(cities));
//   }, [cities]);

//   // Navigate to Sheti page with the selected city
//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city}`);
//   };

//   // Function to add a new city
//   const handleAddCity = () => {
//     let newCity = prompt("Enter city name:")?.trim();

//     if (newCity) {
//       // Check if city already exists (case insensitive)
//       const cityExists = cities.some(
//         (city) => city.toLowerCase() === newCity.toLowerCase()
//       );

//       if (cityExists) {
//         alert("City already exists!");
//       } else {
//         const updatedCities = [...cities, newCity];
//         setCities(updatedCities); // Update state
//       }
//     } else {
//       alert("Please enter a valid city name.");
//     }
//   };

//   // Translation map for language
//   const translations = {
//     en: {
//       title: "🌍 Popular Cities",
//       addCity: " Add City",
//       searchPlaceholder: "Search",
//     },
//     mr: {
//       title: "🌍 लोकप्रिय शहरे",
//       addCity: " शहर जोडा",
//       searchPlaceholder: "शोधा",
//     },
//   };

//   // Filter cities based on search input
//   const filteredCities = cities.filter((city) =>
//     city.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="cities-container mb-5">
//       <div className="mb-3 d-flex gap-2 align-items-center py-3 header-container">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2 text-white">{translations[language].title}</h2>
//       </div>

//       {/* Search Bar and Add City Button */}
//       <div className="container my-2">
//         <div className="d-flex align-items-center">
//           <div className="input-group rounded flex-grow-1 w-50">
//             <input
//               type="search"
//               className="form-control rounded"
//               placeholder={translations[language].searchPlaceholder}
//               aria-label="Search"
//               aria-describedby="search-addon"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//             />
//             <span className="input-group-text border-0" id="search-addon">
//               <i className="fa fa-search"></i>
//             </span>
//           </div>
//           <button
//             className="btn btn-success btn-sm fw-bold ms-3 p-2 rounded"
//             onClick={handleAddCity}
//           >
//             <i className="bi bi-plus-lg text-white"></i> {translations[language].addCity}
//           </button>
//         </div>
//       </div>

//       {/* Cities Grid - Only shows filtered results */}
//       <div className="cities-grid">
//         {filteredCities.length > 0 ? (
//           filteredCities.map((city, index) => (
//             <div
//               key={index}
//               className="city-card"
//               onClick={() => handleCityClick(city)}
//             >
//               {city}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No cities found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cities;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./cities.css";
// import BackButton from "../../Components/BackButton";
// import { useLanguage } from "../../contexts/LanguageContext"; // Importing language context

// const Cities = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage(); // Get current language from context

//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     return storedCities
//       ? JSON.parse(storedCities)
//       : [
//           "Nashik",
//           "Mumbai",
//           "Jalgaon",
//           "Pune",
//           "Nagpur",
//           "Chatrapati Sambhaji Nagar",
//           "Thane",
//           "Solapur",
//           "Amravati",
//         ];
//   };

//   const [cities, setCities] = useState(getStoredCities);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [newCity, setNewCity] = useState(""); // New city input
//   const [showModal, setShowModal] = useState(false); // Modal visibility
//   const [loading, setLoading] = useState(false); // Loading state for API call
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     localStorage.setItem("cities", JSON.stringify(cities));
//   }, [cities]);

//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city}`);
//   };

//   const handleAddCity = async () => {
//     if (newCity.trim() === "") {
//       alert("Please enter a valid city name.");
//       return;
//     }

//     const cityExists = cities.some(
//       (city) => city.toLowerCase() === newCity.toLowerCase()
//     );

//     if (cityExists) {
//       alert("City already exists!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token"); // Retrieve token for authentication

//       if (!token) {
//         alert("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         action: "postCity",
//         name: newCity.trim(),
//       };

//       const response = await axios.post(
//         "https://agri-management-main-ywm4.vercel.app/master_data/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Update local state with new city
//       setCities([...cities, response.data.name]); // Assuming backend returns the new city name

//       setShowModal(false);
//       setNewCity("");
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const translations = {
//     en: {
//       title: "🌍 Popular Cities",
//       addCity: " Add City",
//       AllFarms: "All Farms",
//       searchPlaceholder: "Search",
//       modalTitle: "Add New City",
//       cityNamePlaceholder: "Enter city name",
//       submit: "Submit",
//       cancel: "Cancel",
//     },
//     mr: {
//       title: "🌍 लोकप्रिय शहरे",
//       addCity: " शहर जोडा",
//       AllFarms: "सर्व शेत",
//       searchPlaceholder: "शोधा",
//       modalTitle: "नवीन शहर जोडा",
//       cityNamePlaceholder: "शहराचे नाव प्रविष्ट करा",
//       submit: "सबमिट करा",
//       cancel: "रद्द करा",
//     },
//   };

//   const filteredCities = cities.filter((city) =>
//     city.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="cities-container mb-5">
//       <div className="mb-3 d-flex gap-2 align-items-center py-3 header-container">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2 text-white">{translations[language].title}</h2>
//       </div>

//       {/* Search Bar and Add City Button */}
//       <div className="container my-1">
//         <div className="d-flex align-items-center gap-1">
//           {/* Search Bar */}
//           <div className="input-group flex-grow-1" style={{ maxWidth: "90px" }}>
//             <input
//               type="search"
//               className="form-control rounded"
//               placeholder={translations[language].searchPlaceholder}
//               aria-label="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* Add City Button */}
//           <button
//             className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//             onClick={() => setShowModal(true)}
//           >
//             {translations[language].addCity}
//           </button>

//           {/* Get Farm Button */}
//           <button
//             className="btn btn-success btn-sm fw-bold p-2"
//             onClick={() => navigate("/allfarms")}
//           >
//             {translations[language].AllFarms}
//           </button>
//         </div>
//       </div>

//       {/* Cities Grid */}
//       <div className="cities-grid">
//         {filteredCities.length > 0 ? (
//           filteredCities.map((city, index) => (
//             <div
//               key={index}
//               className="city-card"
//               onClick={() => handleCityClick(city)}
//             >
//               {city}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No cities found</p>
//         )}
//       </div>

//       {/* Add City Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4>{translations[language].modalTitle}</h4>
//             <input
//               type="text"
//               className="form-control"
//               placeholder={translations[language].cityNamePlaceholder}
//               value={newCity}
//               onChange={(e) => setNewCity(e.target.value)}
//             />
//             {error && <p className="text-danger">{error}</p>}
//             <div className="modal-actions">
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setShowModal(false)}
//               >
//                 {translations[language].cancel}
//               </button>
//               <button
//                 className="btn btn-success"
//                 onClick={handleAddCity}
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : translations[language].submit}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cities;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./cities.css";
// import BackButton from "../../Components/BackButton";
// import { useLanguage } from "../../contexts/LanguageContext"; // Importing language context

// const Cities = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage(); // Get current language from context

//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     try {
//       const parsedCities = JSON.parse(storedCities);
//       return Array.isArray(parsedCities) ? parsedCities : [];
//     } catch (error) {
//       return [];
//     }
//   };

//   const [cities, setCities] = useState(getStoredCities);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [newCity, setNewCity] = useState(""); // New city input
//   const [showModal, setShowModal] = useState(false); // Modal visibility
//   const [loading, setLoading] = useState(false); // Loading state for API call
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(
//           "https://agri-management-main.vercel.app/master_data/?action=getCity"
//         );

//         if (response.data && Array.isArray(response.data.data)) {
//           setCities(response.data.data);

//           // **Update local storage**
//           localStorage.setItem("cities", JSON.stringify(response.data.data));
//         }
//       } catch (err) {
//         console.error("Error fetching cities:", err);
//         setCities([]);
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city}`);
//   };

//   const handleAddCity = async () => {
//     if (newCity.trim() === "") {
//       alert("Please enter a valid city name.");
//       return;
//     }

//     const cityExists = cities.some(
//       (city) => typeof city === "string" && city.toLowerCase() === newCity.toLowerCase()
//     );

//     if (cityExists) {
//       alert("City already exists!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         action: "postCity",
//         name: newCity.trim(),
//       };

//       const response = await axios.post(
//         "https://agri-management-main.vercel.app/master_data/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Ensure response structure is correct
//       if (!response.data || !response.data.data || !response.data.data.name) {
//         throw new Error("Invalid response from server.");
//       }

//       const addedCity = response.data.data.name; // Extracting correct city name

//       // Update local state with the new city
//       setCities([...cities, addedCity]);

//       setShowModal(false);
//       setNewCity("");
//     } catch (err) {
//       console.error("API Error:", err);
//       setError(err.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const translations = {
//     en: {
//       title: "🌍 Popular Cities",
//       addCity: " Add City",
//       AllFarms: "All Farms",
//       searchPlaceholder: "Search",
//       modalTitle: "Add New City",
//       cityNamePlaceholder: "Enter city name",
//       submit: "Submit",
//       cancel: "Cancel",
//     },
//     mr: {
//       title: "🌍 लोकप्रिय शहरे",
//       addCity: " शहर जोडा",
//       AllFarms: "सर्व शेत",
//       searchPlaceholder: "शोधा",
//       modalTitle: "नवीन शहर जोडा",
//       cityNamePlaceholder: "शहराचे नाव प्रविष्ट करा",
//       submit: "सबमिट करा",
//       cancel: "रद्द करा",
//     },
//   };

//   // Debugging - Log cities state
//   console.log("Cities state:", cities);

//   // Ensure cities is always an array and filter safely
//   const filteredCities = Array.isArray(cities)
//     ? cities.filter((city) => typeof city === "string" && city.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   return (
//     <div className="cities-container mb-5">
//       <div className="mb-3 d-flex gap-2 align-items-center py-3 header-container">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="fs-2 text-white">{translations[language].title}</h2>
//       </div>

//       {/* Search Bar and Add City Button */}
//       <div className="container my-1">
//         <div className="d-flex align-items-center gap-1">
//           {/* Search Bar */}
//           <div className="input-group flex-grow-1" style={{ maxWidth: "90px" }}>
//             <input
//               type="search"
//               className="form-control rounded"
//               placeholder={translations[language].searchPlaceholder}
//               aria-label="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* Add City Button */}
//           <button
//             className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//             onClick={() => setShowModal(true)}
//           >
//             {translations[language].addCity}
//           </button>

//           {/* Get Farm Button */}
//           <button
//             className="btn btn-success btn-sm fw-bold p-2"
//             onClick={() => navigate("/allfarms")}
//           >
//             {translations[language].AllFarms}
//           </button>
//         </div>
//       </div>

//       {/* Cities Grid */}
//       <div className="cities-grid">
//         {filteredCities.length > 0 ? (
//           filteredCities.map((city, index) => (
//             <div
//               key={index}
//               className="city-card"
//               onClick={() => handleCityClick(city)}
//             >
//               {city}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No cities found</p>
//         )}
//       </div>

//       {/* Add City Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4>{translations[language].modalTitle}</h4>
//             <input
//               type="text"
//               className="form-control"
//               placeholder={translations[language].cityNamePlaceholder}
//               value={newCity}
//               onChange={(e) => setNewCity(e.target.value)}
//             />
//             {error && <p className="text-danger">{error}</p>}
//             <div className="modal-actions">
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setShowModal(false)}
//               >
//                 {translations[language].cancel}
//               </button>
//               <button
//                 className="btn btn-success"
//                 onClick={handleAddCity}
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : translations[language].submit}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cities;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cities.css";
import BackButton from "../../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cities = () => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // Get current language from context

  const getStoredCities = () => {
    const storedCities = localStorage.getItem("cities");
    try {
      const parsedCities = JSON.parse(storedCities);
      return Array.isArray(parsedCities) ? parsedCities : [];
    } catch (error) {
      return [];
    }
  };

  const [cities, setCities] = useState(getStoredCities);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCity, setNewCity] = useState(""); // New city input
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://agri-management-main.vercel.app/master_data/?action=getCity"
        );

        if (response.data && Array.isArray(response.data.data)) {
          setCities(response.data.data);
          localStorage.setItem("cities", JSON.stringify(response.data.data));
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCities([]);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (city) => {
    navigate(`/sheti/${city.name}`);
  };

  const handleAddCity = async () => {
    if (newCity.trim() === "") {
      toast.error("Please enter a valid city name.");
      return;
    }

    const cityExists = cities.some(
      (city) => city.name.toLowerCase() === newCity.toLowerCase()
    );

    if (cityExists) {
      toast.error("City already exists!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized: No token found.");
        setLoading(false);
        return;
      }

      const payload = {
        action: "postCity",
        name: newCity.trim(),
      };

      const response = await axios.post(
        "https://agri-management-main.vercel.app/master_data/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.data || !response.data.data.name) {
        throw new Error("Invalid response from server.");
      }

      const addedCity = response.data.data;

      setCities([...cities, addedCity]);
      localStorage.setItem("cities", JSON.stringify([...cities, addedCity]));

      setShowModal(false);
      setNewCity("");
      toast.success(" City added successfully!", {
              position: "top-center",
            });
    } catch (err) {
      console.error("API Error:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: "🌍 Popular Cities",
      addCity: " Add City",
      AllFarms: "All Farms",
      searchPlaceholder: "Search",
      modalTitle: "Add New City",
      cityNamePlaceholder: "Enter city name",
      submit: "Submit",
      cancel: "Cancel",
    },
    mr: {
      title: "🌍 लोकप्रिय शहरे",
      addCity: " शहर जोडा",
      AllFarms: "सर्व शेत",
      searchPlaceholder: "शोधा",
      modalTitle: "नवीन शहर जोडा",
      cityNamePlaceholder: "शहराचे नाव प्रविष्ट करा",
      submit: "सबमिट करा",
      cancel: "रद्द करा",
    },
  };

  const filteredCities = Array.isArray(cities)
    ? cities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    // <div className="cities-container mb-5">
    //   <div className="mb-3 d-flex gap-2 align-items-center py-3 header-container">
    //     <BackButton className="backbtn fs-4" />
    //     <h2 className="fs-2 text-white ms-3">{translations[language].title}</h2>
    //   </div>
    <div className="cities-container mb-5">
      <div className="mb-3 d-flex align-items-center py-3 header-container">
        <BackButton className="backbtn fs-4" />
        <h2 className="fs-2 text-white flex-grow-1 text-center m-0">
          {translations[language].title}
        </h2>
      </div>

      {/* Search Bar and Add City Button */}
      {/* <div className="container ">
        <div className="d-flex align-items-center gap-1 "> */}
      {/* Search Bar */}
      {/* <div className="input-group flex-grow-1" style={{ maxWidth: "90px" }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder={translations[language].searchPlaceholder}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}

      {/* Add City Button */}
      {/* <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            onClick={() => setShowModal(true)}
          >
            {translations[language].addCity}
          </button> */}

      {/* Get Farm Button */}
      {/* <button
            className="btn btn-success btn-sm fw-bold p-2"
            onClick={() => navigate("/allfarms")}
          >
            {translations[language].AllFarms}
          </button>
        </div>
      </div> */}
      <div className="container">
        <div className="d-flex flex-nowrap align-items-center justify-content-center gap-1 flex-md-wrap">
          {/* Search Bar */}
          <div
            className="input-group"
            style={{ flex: "1", minWidth: "120px", maxWidth: "200px" }}
          >
            <input
              type="search"
              className="form-control rounded"
              placeholder={translations[language].searchPlaceholder}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Add City Button */}
          <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => setShowModal(true)}
          >
            {translations[language].addCity}
          </button>

          {/* Get Farm Button */}
          <button
            className="btn btn-success btn-sm fw-bold p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigate("/allfarms")}
          >
            {translations[language].AllFarms}
          </button>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="cities-grid">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div
              key={city.id}
              className="city-card"
              onClick={() => handleCityClick(city)}
            >
              {city.name}
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No cities found</p>
        )}
      </div>

      {/* Add City Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{translations[language].modalTitle}</h4>
            <input
              type="text"
              className="form-control"
              placeholder={translations[language].cityNamePlaceholder}
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
            <div className="modal-actions">
              <button
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
              >
                {translations[language].cancel}
              </button>
              <button
                className="btn btn-success"
                onClick={handleAddCity}
                disabled={loading}
              >
                {loading ? "Submitting..." : translations[language].submit}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cities;
