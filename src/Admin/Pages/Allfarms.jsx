// import React, { useState, useEffect, useCallback } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../Spinner/Spinner";
// import { useLanguage } from "../../contexts/LanguageContext";
// import BackButton from "../../Components/BackButton";
// import Swal from 'sweetalert2'; // Add this import at the top of your file

// function Allfarms() {
//   const { language } = useLanguage();
//   const [farms, setFarms] = useState([]);
//   const [filteredFarms, setFilteredFarms] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedFarm, setSelectedFarm] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     farm_name: "",
//     address: "",
//     location_url: "",
//     city: "",
//     farm_size: "",
//   });

//   const labels = {
//     en: {
//       title: "All Farms",
//       noFarms: "No farms available.",
//       farmName: "Farm Name",
//       address: "Address",
//       locationUrl: "Location URL",
//       city: "City",
//       farmSize: "Farm Size (acres)",
//       view: "View",
//       edit: "Edit",
//       save: "Save",
//       delete: "Delete",
//       close: "Close",
//       searchPlaceholder: "Search by address or farm size...",
//       unauthorized: "Unauthorized: No token found",
//       updateSuccess: "Farm updated successfully!",
//       updateError: "Error updating farm",
//       deleteSuccess: "Farm deleted successfully!",
//       deleteError: "Error deleting farm",
//       deleteConfirm: "Are you sure you want to delete this farm?",
//     },
//     mr: {
//       title: "सर्व शेती",
//       noFarms: "कोणतीही शेती उपलब्ध नाही.",
//       farmName: "शेताचे नाव",
//       address: "पत्ता",
//       locationUrl: "स्थान URL",
//       city: "शहर",
//       farmSize: "शेताचा आकार (एकर)",
//       view: "पहा",
//       edit: "संपादन करा",
//       save: "सुरक्षित करा",
//       delete: "मिटवा",
//       close: "बंद करा",
//       searchPlaceholder: "पत्ता किंवा शेताचा आकार शोधा...",
//       unauthorized: "अनधिकृत: टोकन सापडले नाही",
//       updateSuccess: "शेती यशस्वीरित्या अद्यतनित केली!",
//       updateError: "शेती अद्यतनित करताना त्रुटी",
//       deleteSuccess: "शेती यशस्वीरित्या हटवली!",
//       deleteError: "शेती हटवताना त्रुटी",
//       deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
//     },
//   };

//   // useEffect(() => {
//   //   fetchFarms();
//   // }, []);

//   const fetchFarms = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError(labels[language].unauthorized);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/?action=getFarm",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Fetched Farms Data:", result);
//       const farmData = Array.isArray(result.data) ? result.data : [];
//       setFarms(farmData);
//       setFilteredFarms(farmData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [language]);

//   useEffect(() => {
//     fetchFarms();
//   }, [fetchFarms]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = farms.filter((farm) => {
//       const address = (farm.address || "").toLowerCase();
//       const farmSize = (farm.farm_size || "").toString().toLowerCase();
//       return address.includes(query) || farmSize.includes(query);
//     });

//     setFilteredFarms(filtered);
//   };

//   const handleViewFarm = (farm) => {
//     setSelectedFarm(farm);
//     setIsEditing(false);
//     setFormData({
//       id: farm.id || "",
//       farm_name: farm.farm_name || farm.name || "",
//       address: farm.address || "",
//       location_url: farm.location_url || "",
//       city: farm.city || "",
//       farm_size: farm.farm_size || "",
//     });
//   };

//   const handleEditFarmClick = (farm) => {
//     setSelectedFarm(farm);
//     setIsEditing(true);
//     setFormData({
//       id: farm.id || "",
//       farm_name: farm.farm_name || farm.name || "",
//       address: farm.address || "",
//       location_url: farm.location_url || "",
//       city: farm.city || "",
//       farm_size: farm.farm_size || "",
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEditFarm = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             action: "patchFarm",
//             id: formData.id,
//             farm_name: formData.farm_name,
//             address: formData.address,
//             location_url: formData.location_url,
//             city: formData.city,
//             farm_size: formData.farm_size,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`${labels[language].updateError}: ${response.status}`);
//       }

//       await fetchFarms();
//       toast.success(labels[language].updateSuccess);
//       setSelectedFarm(null);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`${labels[language].updateError}: ${error.message}`);
//     }
//   };

// const handleDeleteFarm = async (id) => {
//     const token = localStorage.getItem("token");

//     const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: labels[language].deleteConfirm,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'No, cancel'
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ action: "delFarm", id }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`${labels[language].deleteError}: ${response.status}`);
//       }

//       toast.success(labels[language].deleteSuccess);
//       setFarms(farms.filter((farm) => farm.id !== id));
//       setFilteredFarms(filteredFarms.filter((farm) => farm.id !== id));
//       setSelectedFarm(null);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`${labels[language].deleteError}: ${error.message}`);
//     }
// };
//   return (
//     <div className="container mt-4">
//       <div className="bg-success text-white py-2 rounded px-3 d-flex align-items-center justify-content-between flex-column gap-1">
//         <div className="d-flex align-items-center justify-content-between w-100">
//           <BackButton className="backbtn fs-4 " />
//           <h2 className="text-white m-0 flex-grow-1 text-center me-3">
//             {labels[language].title}
//           </h2>
//         </div>
//         <div className="input-group rounded my-2 container">
//           <input
//             type="search"
//             className="form-control rounded"
//             placeholder={language === "en" ? "Search" : "शोधा"}
//             aria-label="Search"
//             aria-describedby="search-addon"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <span className="input-group-text border-0" id="search-addon">
//             <i className="fa fa-search"></i>
//           </span>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center mt-3">
//           <Spinner />
//         </div>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : filteredFarms.length > 0 ? (
//         <div className="mt-3">
//           <div className="row g-3">
//             {filteredFarms.map((farm) => (
//               <div key={farm.id} className="col-md-6 col-lg-4">
//                 <div className="card h-100 shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">
//                       <strong>{farm.farm_name || farm.name || "N/A"}</strong>
//                     </h5>
//                     <div className="d-flex align-items-center mb-2">
//                       <span className="me-2">📍</span>
//                       <div>
//                         <strong>{labels[language].address}:</strong>{" "}
//                         <span className="" style={{ maxWidth: "200px" }}>
//                           {farm.address || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <span className="me-2">🌍</span>
//                       <div>
//                         <strong>{labels[language].locationUrl}:</strong>{" "}
//                         <a
//                           href={farm.location_url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-truncate d-inline-block"
//                           style={{ maxWidth: "200px" }}
//                         >
//                           {farm.location_url || "N/A"}
//                         </a>
//                       </div>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <span className="me-2">🌾</span>
//                       <div>
//                         <strong>{labels[language].farmSize}:</strong>{" "}
//                         {farm.farm_size || "N/A"}
//                       </div>
//                     </div>
//                     <div className="d-flex justify-content-end gap-2 mt-3">
//                       <button
//                         className="btn btn-success btn-sm"
//                         onClick={() => handleViewFarm(farm)}
//                       >
//                         <i className="bi bi-eye me-1"></i>{" "}
//                         {labels[language].view}
//                       </button>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => handleEditFarmClick(farm)}
//                       >
//                         ✏️ {labels[language].edit}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="mt-3 text-muted">{labels[language].noFarms}</p>
//       )}

//       {/* Modal for View/Edit */}
//       {selectedFarm && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content mx-auto">
//               <div className="modal-header bg-success text-white">
//                 <h4 className="modal-title">
//                   {isEditing ? labels[language].edit : labels[language].view}{" "}
//                   Farm
//                 </h4>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={() => setSelectedFarm(null)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_name"
//                           value={formData.farm_name}
//                           onChange={handleChange}
//                           placeholder={labels[language].farmName}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="farm">
//                             🌾
//                           </span>{" "}
//                           {labels[language].farmName}
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           placeholder={labels[language].address}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="location">
//                             📍
//                           </span>{" "}
//                           {labels[language].address}
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="location_url"
//                           value={formData.location_url}
//                           onChange={handleChange}
//                           placeholder={labels[language].locationUrl}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="globe">
//                             🌍
//                           </span>{" "}
//                           {labels[language].locationUrl}
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           placeholder={labels[language].city}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="city">
//                             🏙️
//                           </span>{" "}
//                           {labels[language].city}
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_size"
//                           value={formData.farm_size}
//                           onChange={handleChange}
//                           placeholder={labels[language].farmSize}
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="size">
//                             📏
//                           </span>{" "}
//                           {labels[language].farmSize}
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 {!isEditing ? (
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-sm"
//                     onClick={() => setSelectedFarm(null)}
//                   >
//                     ❌ {labels[language].close}
//                   </button>
//                 ) : (
//                   <>
//                     <button
//                       type="button"
//                       className="btn btn-success btn-sm"
//                       onClick={handleEditFarm}
//                     >
//                       ✅ {labels[language].save}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDeleteFarm(formData.id)}
//                     >
//                       🗑️ {labels[language].delete}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Allfarms;

import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm"; // Assuming this is the correct import path
import api from "../../src/api/axiosInstance";
import { FaMapPin, FaGlobe, FaTractor, FaEye } from "react-icons/fa"; // Import Font Awesome icons
import { FaWarehouse } from "react-icons/fa";

function Allfarms() {
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    farm_name: "",
    address: "",
    location_url: "",
    farm_size: "",
  });

  const labels = {
    en: {
      title: "All Farms",
      noFarms: "No farms available.",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      farmSize: "Farm Size (acres)",
      view: "View",
      cancel: "Cancel",
      searchPlaceholder: "Search by address or farm size...",
      unauthorized: "Unauthorized: No token found",
    },
    mr: {
      title: "सर्व शेती",
      noFarms: "कोणतीही शेती उपलब्ध नाही.",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      farmSize: "शेताचा आकार (एकर)",
      view: "पहा",
      cancel: "बंद करा",
      searchPlaceholder: "पत्ता किंवा शेताचा आकार शोधा...",
      unauthorized: "अनधिकृत: टोकन सापडले नाही",
    },
  };

  const fetchFarms = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(labels[language].unauthorized);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/farm/?action=getFarm", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      const farmData = Array.isArray(result.data)
        ? result.data
        : [result.data].filter(Boolean);
      const normalizedFarms = farmData.map((farm) => ({
        id: farm.id,
        farm_name: farm.name,
        address: farm.address,
        location_url: farm.location_url,
        farm_size: farm.farm_size,
      }));
      setFarms(normalizedFarms);
      setFilteredFarms(normalizedFarms);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching farms."
      );
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchFarms();
  }, [fetchFarms]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = farms.filter((farm) => {
      const address = (farm.address || "").toLowerCase();
      const farmSize = (farm.farm_size || "").toString().toLowerCase();
      return address.includes(query) || farmSize.includes(query);
    });

    setFilteredFarms(filtered);
  };

  const handleViewFarm = (farm) => {
    setSelectedFarm(farm);
    setFormData({
      id: farm.id || "",
      farm_name: farm.farm_name || farm.name || "",
      address: farm.address || "",
      location_url: farm.location_url || "",
      farm_size: farm.farm_size || "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="bg-success text-white py-2 rounded px-3 d-flex align-items-center justify-content-between flex-column gap-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <BackButton className="backbtn fs-4" />
          <h2 className="text-white m-0 flex-grow-1 text-center me-3">
            <FaWarehouse className="me-2" /> {labels[language].title}
          </h2>
        </div>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={language === "en" ? "Search" : "शोधा"}
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <Spinner />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredFarms.length > 0 ? (
        <div className="mt-3">
          <div className="row g-3">
            {filteredFarms.map((farm) => (
              <div key={farm.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{farm.farm_name || "N/A"}</strong>
                    </h5>
                    <div className="d-flex align-items-center mb-2">
                      <FaMapPin className="me-2 text-success" />
                      <div>
                        <strong>{labels[language].address}:</strong>{" "}
                        <span className="" style={{ maxWidth: "200px" }}>
                          {farm.address || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaGlobe className="me-2 text-success" />
                      <div>
                        <strong>{labels[language].locationUrl}:</strong>{" "}
                        <a
                          href={farm.location_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-truncate d-inline-block"
                          style={{ maxWidth: "200px" }}
                        >
                          {farm.location_url || "N/A"}
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaTractor className="me-2 text-success" />
                      <div>
                        <strong>{labels[language].farmSize}:</strong>{" "}
                        {farm.farm_size || "N/A"}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleViewFarm(farm)}
                      >
                        <FaEye className="me-1" /> {labels[language].view}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted">{labels[language].noFarms}</p>
      )}

      <ModalForm
        isOpen={!!selectedFarm}
        onClose={() => setSelectedFarm(null)}
        formData={formData}
        labels={labels}
        language={language}
        formType="farm"
      />

      <ToastContainer />
    </div>
  );
}

export default Allfarms;
