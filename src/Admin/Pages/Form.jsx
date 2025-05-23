// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaMapMarkerAlt } from "react-icons/fa"; 
// import api from "../../Api/axiosInstance";

// const Form = () => {
//   const { language } = useLanguage();
//   const location = useLocation();
//   const selectedCity = location.state?.selectedCity || "";

//   const [formData, setFormData] = useState({
//     farm_name: "",
//     address: "",
//     location_url: "",
//     city: selectedCity,
//     farm_size: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
//           setFormData((prevState) => ({
//             ...prevState,
//             location_url: googleMapsUrl,
//           }));
//           toast.success("Location captured successfully!", {
//             position: "top-center",
//           });
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Failed to get location. Please allow location access.", {
//             position: "top-center",
//           });
//           setLoading(false);
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.", {
//         position: "top-center",
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       await api.post(
//         "/users/farms/",
//         {
//           action: "postFarm",
//           ...formData,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Farm details submitted successfully!", {
//         position: "top-center",
//       });
//       setFormData({
//         farm_name: "",
//         address: "",
//         location_url: "",
//         city: "",
//         farm_size: "",
//       });
//     } catch (err) {
//       toast.error("❌ Submission failed! Try again.", {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formLabels = {
//     en: {
//       farm_name: "Farm Name",
//       address: "Address",
//       location_url: "Location URL",
//       city: "City",
//       farm_size: "Farm Size",
//       submit: "Submit",
//       submitting: "Submitting...",
//     },
//     mr: {
//       farm_name: "शेताचे नाव",
//       address: "पत्ता",
//       location_url: "स्थान URL",
//       city: "शहर",
//       farm_size: "शेताचा आकार",
//       submit: "सबमिट करा",
//       submitting: "सबमिट करत आहे...",
//     },
//   };

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="card shadow-sm">
//         <div className="card-header bg-success text-white text-center">
//           <h2 className="mb-0 text-white">
//             {language === "en" ? "Farm Details Form" : "शेती तपशील फॉर्म"}
//           </h2>
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger text-center mb-3">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">{formLabels[language].farm_name}</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="farm_name"
//                 value={formData.farm_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">{formLabels[language].address}</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">{formLabels[language].location_url}</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="location_url"
//                   value={formData.location_url}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter location URL or use map icon"
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary"
//                   onClick={getCurrentLocation}
//                   disabled={loading}
//                   title={language === "en" ? "Get Current Location" : "वर्तमान स्थान मिळवा"}
//                 >
//                   <FaMapMarkerAlt size={20} />
//                   {loading && <span className="ms-2">Loading...</span>}
//                 </button>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">{formLabels[language].city}</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">{formLabels[language].farm_size}</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="farm_size"
//                 value={formData.farm_size}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-success w-100" disabled={loading}>
//               {loading ? formLabels[language].submitting : formLabels[language].submit}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;