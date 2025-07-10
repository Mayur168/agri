// // import React, { useState, useEffect, useCallback } from "react";
// // import { useParams } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { FaEye, FaPlus, FaGlobe } from "react-icons/fa";
// // import { useLanguage } from "../../contexts/LanguageContext";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import Swal from "sweetalert2";
// // import BackButton from "../Components/BackButton";
// // import ModalForm from "../Components/ModelForm";
// // import api from "../../Api/axiosInstance";
// // import Spinner from "../../Admin/Spinner/Spinner";

// // function Sheti() {
// //   const { villageId } = useParams();
// //   const { language } = useLanguage();
// //   const [farms, setFarms] = useState([]);
// //   const [filteredFarms, setFilteredFarms] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     address: "",
// //     location_url: "",
// //     farm_size: "",
// //     id: "",
// //     manager_id: "",
// //   });
// //   const [fertilizers, setFertilizers] = useState([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [villageName, setVillageName] = useState("");
// //   const [villageError, setVillageError] = useState(false);
// //   const [managers, setManagers] = useState([]);
// //   const [isLoadingManagers, setIsLoadingManagers] = useState(false);
// //   const [farmerId, setFarmerId] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const translations = {
// //     en: {
// //       addFarm: "Add Farm",
// //       viewFarm: "View Farm",
// //       editFarm: "Edit Farm",
// //       modalTitle: "Farm Details",
// //       view: "View",
// //       edit: "Edit",
// //       farmName: "Farm Name",
// //       address: "Address",
// //       locationUrl: "Location URL",
// //       farmSize: "Farm Size (acres)",
// //       manager: "Manager",
// //       submit: "Submit",
// //       close: "Close",
// //       delete: "Delete",
// //       cancel: "Cancel",
// //       deleteConfirm: "Are you sure you want to delete this farm?",
// //       villageNotFound: "Village ID not found",
// //       fertilizers: "Fertilizers",
// //       fertilizerName: "Fertilizer Name",
// //       date: "Date",
// //       toast: {
// //         noToken: "No token found! Please log in.",
// //         locationSuccess: "Live location captured successfully!",
// //         locationError: "Failed to get location. Please allow location access.",
// //         locationNotSupported: "Geolocation is not supported by your browser.",
// //         farmAddedSuccess: "Farm added successfully!",
// //         farmAddError: "Failed to add farm.",
// //         farmUpdatedSuccess: "Farm updated successfully!",
// //         farmUpdateError: "Failed to update farm.",
// //         farmDeletedSuccess: "Farm deleted successfully!",
// //         farmDeleteError: "Failed to delete farm.",
// //         fetchManagersError: "Failed to fetch managers",
// //         fetchFertilizersError: "Failed to fetch fertilizers",
// //       },
// //     },
// //     mr: {
// //       addFarm: "शेती जोडा",
// //       viewFarm: "शेत पहा",
// //       editFarm: "शेती संपादित करा",
// //       modalTitle: "शेती तपशील",
// //       view: "पहा",
// //       edit: "संपादन करा",
// //       farmName: "शेताचे नाव",
// //       address: "पत्ता",
// //       locationUrl: "स्थान URL",
// //       farmSize: "शेतीचा आकार (एकर)",
// //       manager: "व्यवस्थापक",
// //       submit: "सुरक्षित करा",
// //       close: "बंद करा",
// //       delete: "मिटवा",
// //       cancel: "रद्द करा",
// //       deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
// //       villageNotFound: "गावाचा आयडी सापडला नाही",
// //       fertilizers: "खते",
// //       fertilizerName: "खताचे नाव",
// //       date: "दिनांक",
// //       toast: {
// //         noToken: "टोकन सापडले नाही! कृपया लॉग इन करा.",
// //         locationSuccess: "लाइव्ह स्थान यशस्वीरित्या कॅप्चर केले!",
// //         locationError: "स्थान मिळविण्यात अयशस्वी. कृपया स्थान परवानगी द्या.",
// //         locationNotSupported: "आपल्या ब्राउझरद्वारे जिओलोकेशन समर्थित नाही.",
// //         farmAddedSuccess: "शेती यशस्वीरित्या जोडली गेली!",
// //         farmAddError: "शेती जोडण्यात अयशस्वी.",
// //         farmUpdatedSuccess: "शेती यशस्वीरित्या अद्यतनित केली गेली!",
// //         farmUpdateError: "शेती अद्यतनित करण्यात अयशस्वी.",
// //         farmDeletedSuccess: "शेती यशस्वीरित्या हटविली गेली!",
// //         farmDeleteError: "शेती हटविण्यात अयशस्वी.",
// //         fetchManagersError: "व्यवस्थापक आणण्यात अयशस्वी",
// //         fetchFertilizersError: "खते आणण्यात अयशस्वी",
// //       },
// //     },
// //   };

// //   const fetchManagers = useCallback(async () => {
// //     setIsLoadingManagers(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error(translations[language].toast.noToken);
// //       const response = await api.get("/users/?action=getFarmManager", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       setManagers(response.data.data || []);
// //     } catch (error) {
// //       toast.error(translations[language].toast.fetchManagersError);
// //       setManagers([]);
// //     } finally {
// //       setIsLoadingManagers(false);
// //     }
// //   }, [language]);

// //   const fetchFarmsData = useCallback(async () => {
// //     setIsLoading(true);

// //     if (!villageId || isNaN(parseInt(villageId))) {
// //       setVillageError(true);
// //       setVillageName("Unknown Village");
// //       setFilteredFarms([]);
// //       toast.error(translations[language].toast.villageNotFound);
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       const user = JSON.parse(localStorage.getItem("user"));
// //       const farmerId = user?.farmer_id;

// //       if (!token) throw new Error(translations[language].toast.noToken);

// //       const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];
// //       const selectedVillage = storedVillages.find(
// //         (village) => village.id === parseInt(villageId)
// //       );

// //       if (
// //         !selectedVillage ||
// //         (!selectedVillage.village?.name && !selectedVillage.name)
// //       ) {
// //         setVillageError(true);
// //         setVillageName("Unknown Village");
// //         setFilteredFarms([]);
// //         toast.error(translations[language].toast.villageNotFound);
// //         setIsLoading(false);
// //         return;
// //       }

// //       setVillageName(selectedVillage.village?.name || selectedVillage.name);
// //       setVillageError(false);

// //       const response = await api.get(
// //         `/farm/?action=getFarm&farm_village=${villageId}&farmers=${farmerId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data && Array.isArray(response.data.data)) {
// //         const transformedFarms = response.data.data.map((farm) => ({
// //           id: farm.id,
// //           name: farm.name,
// //           description: farm.address,
// //           location_url: farm.location_url,
// //           farm_size: farm.farm_size,
// //           village: { id: farm.farm_village },
// //           manager_id: farm.manager,
// //           farmer_id: farm.farmer,
// //         }));
// //         setFarms(transformedFarms);
// //         setFilteredFarms(transformedFarms);
// //       } else {
// //         setFarms([]);
// //         setFilteredFarms([]);
// //       }
// //     } catch (error) {
// //       setFarms([]);
// //       setFilteredFarms([]);
// //       if (
// //         error.response?.status === 404 &&
// //         error.response?.data?.message !== "No farm village found"
// //       ) {
// //         setVillageError(true);
// //         toast.error(translations[language].toast.villageNotFound);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [villageId, language]);

// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     if (user && user.farmer_id) setFarmerId(user.farmer_id);
// //     fetchFarmsData();
// //     fetchManagers();
// //   }, [fetchFarmsData, fetchManagers]);

// //   const handleSearch = (event) => {
// //     const query = event.target.value.toLowerCase();
// //     setSearchQuery(query);
// //     const filtered = farms.filter((farm) =>
// //       (farm.name || "").toLowerCase().includes(query)
// //     );
// //     setFilteredFarms(filtered);
// //   };

// //   const handleViewFarm = async (farm) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error(translations[language].toast.noToken);

// //       const response = await api.get(
// //         `/farm/?action=getFarm&fertilizer=true&id=${farm.id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       const farmData = response.data.data[0];
// //       if (farmData) {
// //         setFormData({
// //           name: farmData.name || "",
// //           address: farmData.address || "",
// //           location_url: farmData.location_url || "",
// //           farm_size: farmData.farm_size || "",
// //           id: farmData.id || "",
// //           manager_id: farmData.manager || "",
// //         });
// //         const transformedFertilizers = (farmData.farm_fertilizer || []).map(
// //           (fert) => ({
// //             id: fert.id,
// //             name: fert.fertilizer.name,
// //             date: fert.date,
// //           })
// //         );
// //         setFertilizers(transformedFertilizers);
// //       } else {
// //         setFormData({
// //           name: "",
// //           address: "",
// //           location_url: "",
// //           farm_size: "",
// //           id: "",
// //           manager_id: "",
// //         });
// //         setFertilizers([]);
// //         toast.error("No farm data found");
// //       }
// //     } catch (error) {
// //       toast.error(translations[language].toast.fetchFertilizersError);
// //       setFormData({
// //         name: "",
// //         address: "",
// //         location_url: "",
// //         farm_size: "",
// //         id: "",
// //         manager_id: "",
// //       });
// //       setFertilizers([]);
// //     }

// //     setIsEditing(false);
// //     setIsModalOpen(true);
// //   };

// //   const handleEditFarm = (farm) => {
// //     setFormData({
// //       name: farm.name || "",
// //       address: farm.description || "",
// //       location_url: farm.location_url || "",
// //       farm_size: farm.farm_size || "",
// //       id: farm.id || "",
// //       manager_id: farm.manager_id || "",
// //     });
// //     setFertilizers([]);
// //     setIsEditing(true);
// //     setIsModalOpen(true);
// //     setIsSubmitting(false);
// //   };

// //   const handleDeleteFarm = (id) => handleDelete(id);

// //   const handleAddFarmClick = () => {
// //     setFormData({
// //       name: "",
// //       address: "",
// //       location_url: "",
// //       farm_size: "",
// //       id: "",
// //       manager_id: "",
// //     });
// //     setFertilizers([]);
// //     setIsEditing(true);
// //     setIsModalOpen(true);
// //     setIsSubmitting(false);
// //   };

// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const getLiveLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords;
// //           const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
// //           setFormData((prev) => ({ ...prev, location_url: googleMapsUrl }));
// //           toast.success(translations[language].toast.locationSuccess);
// //         },
// //         () => toast.error(translations[language].toast.locationError)
// //       );
// //     } else {
// //       toast.error(translations[language].toast.locationNotSupported);
// //     }
// //   };

// //   const handlePostFarm = async () => {
// //     if (!villageId || isNaN(parseInt(villageId))) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Error",
// //         text: translations[language].toast.villageNotFound,
// //       });
// //       return;
// //     }
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error(translations[language].toast.noToken);

// //       const postPayload = {
// //         action: "postFarm",
// //         name: formData.name,
// //         address: formData.address,
// //         location_url: formData.location_url,
// //         farm_size: formData.farm_size,
// //         farm_village_id: parseInt(villageId),
// //         manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
// //         farmers: farmerId ? [parseInt(farmerId)] : [],
// //       };

// //       const response = await api.post("/farm/", postPayload, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       const newFarm = response.data.data;
// //       if (newFarm) {
// //         const transformedNewFarm = {
// //           id: newFarm.id,
// //           name: newFarm.name,
// //           description: newFarm.address,
// //           location_url: newFarm.location_url,
// //           farm_size: newFarm.farm_size,
// //           village: { id: newFarm.farm_village },
// //           manager_id: newFarm.manager,
// //           farmer_id: newFarm.farmer,
// //         };
// //         setFarms((prev) => [...prev, transformedNewFarm]);
// //         setFilteredFarms((prev) => [...prev, transformedNewFarm]);
// //         Swal.fire({
// //           icon: "success",
// //           title: translations[language].toast.farmAddedSuccess || "",
// //           showConfirmButton: false,
// //           timer: 1500,
// //         });
// //         setIsModalOpen(false);
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Error",
// //         text:
// //           error.response?.data?.message || translations[language].toast.farmAddError,
// //       });
// //     }
// //   };

// //   const handlePatchFarm = async () => {
// //     if (!isSubmitting) return;

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error(translations[language].toast.noToken);

// //       const patchPayload = {
// //         id: formData.id,
// //         action: "patchFarm",
// //         name: formData.name,
// //         address: formData.address,
// //         location_url: formData.location_url,
// //         farm_size: formData.farm_size,
// //         manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
// //       };

// //       const response = await api.patch("/farm/", patchPayload, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (response.status === 200 || response.data?.success) {
// //         const updatedFarm = {
// //           id: formData.id,
// //           name: formData.name,
// //           description: formData.address,
// //           location_url: formData.location_url,
// //           farm_size: formData.farm_size,
// //           village: { id: parseInt(villageId) },
// //           manager_id: formData.manager_id
// //             ? parseInt(formData.manager_id)
// //             : null,
// //           farmer_id:
// //             farms.find((farm) => farm.id === formData.id)?.farmer_id ||
// //             farmerId,
// //         };
// //         setFarms((prev) =>
// //           prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
// //         );
// //         setFilteredFarms((prev) =>
// //           prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
// //         );
// //         Swal.fire({
// //           icon: "success",
// //           title: translations[language].toast.farmUpdatedSuccess,
// //           showConfirmButton: false,
// //           timer: 1500,
// //         });
// //         setIsModalOpen(false);
// //       } else {
// //         toast.error(translations[language].toast.farmUpdateError);
// //       }
// //     } catch (error) {
// //       toast.error(
// //         error.response?.data?.message || translations[language].toast.farmUpdateError
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleSave = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     if (formData.id) await handlePatchFarm();
// //     else await handlePostFarm();
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error(translations[language].toast.noToken);
// //       await api.delete("/farm/", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //         data: { action: "delFarm", id },
// //       });
// //       Swal.fire({
// //         icon: "success",
// //         title: translations[language].toast.farmDeletedSuccess,
// //         showConfirmButton: false,
// //         timer: 1500,
// //       });
// //       setIsModalOpen(false);
// //       fetchFarmsData();
// //     } catch (error) {
// //       toast.error(translations[language].toast.farmDeleteError);
// //     }
// //   };

// //   return (
// //     <div className="container-fluid p-0 min-vh-100">
// //       <div className="container-fluid py-3 bg-success my-2 rounded">
// //         <nav className="container d-flex align-items-center">
// //           <BackButton className="backbtn" />
// //           <span className="fs-5 text-white fw-bold text-center ms-0">
// //             {villageError
// //               ? translations[language].villageNotFound
// //               : language === "en"
// //               ? `Farming in: ${villageName}`
// //               : `शेती: ${villageName}`}
// //           </span>
// //         </nav>
// //         <div className="input-group rounded my-2 container">
// //           <input
// //             type="search"
// //             className="form-control rounded"
// //             placeholder={
// //               language === "en"
// //                 ? "Search by village name..."
// //                 : "गावाच्या नावावरून शोधा..."
// //             }
// //             aria-label="Search"
// //             value={searchQuery}
// //             onChange={handleSearch}
// //           />
// //         </div>
// //       </div>
// //       <div className="container">
// //         <div className="d-flex justify-content-end">
// //           <button
// //             onClick={handleAddFarmClick}
// //             className="btn btn-success fw-bold m-1 p-1 rounded d-flex align-items-center"
// //           >
// //             <FaPlus className="me-1 text-white" />
// //             {language === "en" ? "Add Farm" : "शेती जोडा"}
// //           </button>
// //         </div>

// //         <ModalForm
// //           isOpen={isModalOpen}
// //           onClose={() => setIsModalOpen(false)}
// //           isEditing={isEditing}
// //           formData={formData}
// //           labels={translations}
// //           handleChange={handleChange}
// //           handleSave={handleSave}
// //           handleDelete={handleDelete}
// //           language={language}
// //           getLiveLocation={getLiveLocation}
// //           managers={managers}
// //           isLoadingManagers={isLoadingManagers}
// //           onEdit={() => setIsEditing(true)}
// //           fertilizers={fertilizers}
// //           formType="farm"
// //         />

// //         {isLoading ? (
// //           <div className="text-center my-4">
// //             <Spinner />
// //           </div>
// //         ) : (
// //           <div className="row">
// //             {filteredFarms.length > 0 ? (
// //               filteredFarms.map((farm) => (
// //                 <div key={farm.id} className="col-12 col-md-6 col-lg-4">
// //                   <div className="card border rounded-3 h-100">
// //                     <div className="card-body d-flex flex-column shadow-none">
// //                       <h5 className="card-title text-success fw-bold">
// //                         {farm.name || "Unnamed Farm"}
// //                       </h5>
// //                       <div className="mb-2 d-flex align-items-center">
// //                         <FaGlobe className="me-2 text-success" />
// //                         <strong>
// //                           {language === "en" ? "Location:" : "स्थान:"}
// //                         </strong>
// //                         <a
// //                           href={farm.location_url || "#"}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="ms-1 text-truncate d-block"
// //                           style={{ maxWidth: "200px" }}
// //                         >
// //                           {farm.location_url || "N/A"}
// //                         </a>
// //                       </div>
// //                       <div className="mt-auto d-flex justify-content-end">
// //                         <button
// //                           className="btn btn-success btn-sm align-items-center"
// //                           onClick={() => handleViewFarm(farm)}
// //                         >
// //                           <FaEye className="me-1" /> {translations[language].view}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="col-12 text-center mt-4">
// //                 <div className="alert alert-danger" role="alert">
// //                   {language === "en"
// //                     ? "No farms found in this village!"
// //                     : "या गावात कोणतीही शेती आढळली नाही!"}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //       />
// //     </div>
// //   );
// // }

// // export default Sheti;

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaEye, FaPlus, FaGlobe } from "react-icons/fa";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import moment from "moment-timezone";
// import BackButton from "../Components/BackButton";
// import ModalForm from "../Components/ModelForm";
// import api from "../../Api/axiosInstance";
// import Spinner from "../../Admin/Spinner/Spinner";

// function Sheti() {
//   const { villageId } = useParams();
//   const { language } = useLanguage();
//   const [farms, setFarms] = useState([]);
//   const [filteredFarms, setFilteredFarms] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     location_url: "",
//     farm_size: "",
//     id: "",
//     manager_id: "",
//   });
//   const [fertilizers, setFertilizers] = useState([]);
//   const [masterFertilizers, setMasterFertilizers] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [villageName, setVillageName] = useState("");
//   const [villageError, setVillageError] = useState(false);
//   const [managers, setManagers] = useState([]);
//   const [isLoadingManagers, setIsLoadingManagers] = useState(false);
//   const [farmerId, setFarmerId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const translations = {
//     en: {
//       addFarm: "Add Farm",
//       viewFarm: "View Farm",
//       editFarm: "Edit Farm",
//       modalTitle: "Farm Details",
//       view: "View",
//       edit: "Edit",
//       farmName: "Farm Name",
//       address: "Address",
//       locationUrl: "Location URL",
//       farmSize: "Farm Size (acres)",
//       manager: "Manager",
//       submit: "Submit",
//       close: "Close",
//       delete: "Delete",
//       cancel: "Cancel",
//       deleteConfirm: "Are you sure you want to delete this farm?",
//       villageNotFound: "Village ID not found",
//       fertilizers: "Fertilizers",
//       fertilizerName: "Fertilizer Name",
//       date: "Date",
//       selectFertilizer: "Select Fertilizer",
//       addFertilizer: "Add Fertilizer",
//       noFertilizers: "No fertilizers found for this farm.",
//       toast: {
//         noToken: "No token found! Please log in.",
//         locationSuccess: "Live location captured successfully!",
//         locationError: "Failed to get location. Please allow location access.",
//         locationNotSupported: "Geolocation is not supported by your browser.",
//         farmAddedSuccess: "Farm added successfully!",
//         farmAddError: "Failed to add farm.",
//         farmUpdatedSuccess: "Farm updated successfully!",
//         farmUpdateError: "Failed to update farm.",
//         farmDeletedSuccess: "Farm deleted successfully!",
//         farmDeleteError: "Failed to delete farm.",
//         fetchManagersError: "Failed to fetch managers",
//         fetchFertilizersError: "Failed to fetch fertilizers",
//         fertilizerAdded: "Fertilizer added successfully",
//         fertilizerAddError: "Failed to add fertilizer",
//         fertilizerUpdated: "Fertilizer updated successfully",
//         fertilizerUpdateError: "Failed to update fertilizer",
//         fertilizerDeleted: "Fertilizer deleted successfully",
//         fertilizerDeleteError: "Failed to delete fertilizer",
//         fetchMasterFertilizersError: "Failed to fetch master fertilizers",
//         validationError: "Please fill all required fields (Fertilizer and Application Date)",
//       },
//     },
//     mr: {
//       addFarm: "शेती जोडा",
//       viewFarm: "शेत पहा",
//       editFarm: "शेती संपादित करा",
//       modalTitle: "शेती तपशील",
//       view: "पहा",
//       edit: "संपादन करा",
//       farmName: "शेताचे नाव",
//       address: "पत्ता",
//       locationUrl: "स्थान URL",
//       farmSize: "शेतीचा आकार (एकर)",
//       manager: "व्यवस्थापक",
//       submit: "सुरक्षित करा",
//       close: "बंद करा",
//       delete: "मिटवा",
//       cancel: "रद्द करा",
//       deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
//       villageNotFound: "गावाचा आयडी सापडला नाही",
//       fertilizers: "खते",
//       fertilizerName: "खताचे नाव",
//       date: "दिनांक",
//       selectFertilizer: "खत निवडा",
//       addFertilizer: "खत जोडा",
//       noFertilizers: "या शेतासाठी कोणतेही खते आढळले नाहीत.",
//       toast: {
//         noToken: "टोकन सापडले नाही! कृपया लॉग इन करा.",
//         locationSuccess: "लाइव्ह स्थान यशस्वीरित्या कॅप्चर केले!",
//         locationError: "स्थान मिळविण्यात अयशस्वी. कृपया स्थान परवानगी द्या.",
//         locationNotSupported: "आपल्या ब्राउझरद्वारे जिओलोकेशन समर्थित नाही.",
//         farmAddedSuccess: "शेती यशस्वीरित्या जोडली गेली!",
//         farmAddError: "शेती जोडण्यात अयशस्वी.",
//         farmUpdatedSuccess: "शेती यशस्वीरित्या अद्यतनित केली गेली!",
//         farmUpdateError: "शेती अद्यतनित करण्यात अयशस्वी.",
//         farmDeletedSuccess: "शेती यशस्वीरित्या हटविली गेली!",
//         farmDeleteError: "शेती हटविण्यात अयशस्वी.",
//         fetchManagersError: "व्यवस्थापक आणण्यात अयशस्वी",
//         fetchFertilizersError: "खते आणण्यात अयशस्वी",
//         fertilizerAdded: "खत यशस्वीरित्या जोडले गेले",
//         fertilizerAddError: "खत जोडण्यात अयशस्वी",
//         fertilizerUpdated: "खत यशस्वीरित्या अद्यतनित केले गेले",
//         fertilizerUpdateError: "खत अद्यतनित करण्यात अयशस्वी",
//         fertilizerDeleted: "खत यशस्वीरित्या हटविले गेले",
//         fertilizerDeleteError: "खत हटविण्यात अयशस्वी",
//         fetchMasterFertilizersError: "मास्टर खते आणण्यात अयशस्वी",
//         validationError: "कृपया सर्व आवश्यक फील्ड भरा (खत आणि अर्जाची तारीख)",
//       },
//     },
//   };

//   const convertToUTC = (date) => {
//     if (!date || !moment(date, "DD-MMM-YYYY hh:mm A", true).isValid()) {
//       return "";
//     }
//     return moment.tz(date, "DD-MMM-YYYY hh:mm A", "Asia/Kolkata").toISOString();
//   };

//   const formatDateForDisplay = (date) => {
//     if (!date || !moment(date).isValid()) {
//       return "";
//     }
//     return moment(date).tz("Asia/Kolkata").format("DD-MMM-YYYY hh:mm A");
//   };

//   const fetchManagers = useCallback(async () => {
//     setIsLoadingManagers(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);
//       const response = await api.get("/users/?action=getFarmManager", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setManagers(response.data.data || []);
//     } catch (error) {
//       toast.error(translations[language].toast.fetchManagersError);
//       setManagers([]);
//     } finally {
//       setIsLoadingManagers(false);
//     }
//   }, [language]);

//   const fetchMasterFertilizers = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);
//       const response = await api.get("/master_data/?action=getfertilizer", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setMasterFertilizers(response.data.data || []);
//     } catch (error) {
//       toast.error(translations[language].toast.fetchMasterFertilizersError);
//       setMasterFertilizers([]);
//     }
//   }, [language]);

//   const fetchFertilizers = useCallback(async (farmId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);
//       const response = await api.get(`/farm/?action=getFarm&fertilizer=true&id=${farmId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const farmData = response.data.data[0];
//       if (farmData && farmData.farm_fertilizer) {
//         const transformedFertilizers = farmData.farm_fertilizer.map((fert) => ({
//           id: fert.id,
//           name: fert.fertilizer.name,
//           date: formatDateForDisplay(fert.date),
//         }));
//         setFertilizers(transformedFertilizers);
//       } else {
//         setFertilizers([]);
//       }
//     } catch (error) {
//       toast.error(translations[language].toast.fetchFertilizersError);
//       setFertilizers([]);
//     }
//   }, [language]);

//   const handlePostFertilizer = async (fertilizerFormData) => {
//     if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date || !formData.id) {
//       Swal.fire({
//         icon: "warning",
//         title: translations[language].toast.validationError,
//         text: translations[language].toast.validationError,
//         confirmButtonColor: "#3085d6",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         fertilizer_id: Number(fertilizerFormData.fertilizer_id),
//         date: convertToUTC(fertilizerFormData.date),
//         farm_id: formData.id,
//         action: "postFarmFertilizer",
//       };

//       const response = await api.post(`/farm/`, payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const newFertilizer = {
//         id: response.data.data.id,
//         name: masterFertilizers.find((f) => f.id === Number(fertilizerFormData.fertilizer_id))?.name || "Unknown",
//         date: formatDateForDisplay(response.data.data.date),
//       };

//       setFertilizers((prev) => [...prev, newFertilizer]);
//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.fertilizerAdded,
//         text: translations[language].toast.fertilizerAdded,
//         confirmButtonColor: "#28a745",
//         timer: 1500,
//       });
//       await fetchFertilizers(formData.id);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.fertilizerAddError,
//         text: `${translations[language].toast.fertilizerAddError}: ${error.response?.data?.message || error.message}`,
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditFertilizer = async (fertilizerFormData) => {
//     if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date || !fertilizerFormData.id || !formData.id) {
//       Swal.fire({
//         icon: "warning",
//         title: translations[language].toast.validationError,
//         text: translations[language].toast.validationError,
//         confirmButtonColor: "#3085d6",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         id: fertilizerFormData.id,
//         action: "patchFarmFertilizer",
//         fertilizer_id: Number(fertilizerFormData.fertilizer_id),
//         date: convertToUTC(fertilizerFormData.date),
//         farm_id: formData.id,
//       };

//       const response = await api.patch(`/farm/`, payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const updatedFertilizer = {
//         id: fertilizerFormData.id,
//         name: masterFertilizers.find((f) => f.id === Number(fertilizerFormData.fertilizer_id))?.name || "Unknown",
//         date: formatDateForDisplay(response.data.data.date),
//       };

//       setFertilizers((prev) =>
//         prev.map((fert) => (fert.id === updatedFertilizer.id ? updatedFertilizer : fert))
//       );
//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.fertilizerUpdated,
//         text: translations[language].toast.fertilizerUpdated,
//         confirmButtonColor: "#28a745",
//         timer: 1500,
//       });
//       await fetchFertilizers(formData.id);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.fertilizerUpdateError,
//         text: `${translations[language].toast.fertilizerUpdateError}: ${error.response?.data?.message || error.message}`,
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteFertilizer = async (id) => {
//     const result = await Swal.fire({
//       title: translations[language].deleteConfirm || "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: translations[language].delete || "Yes, delete it!",
//       cancelButtonText: translations[language].cancel || "No, cancel",
//     });

//     if (!result.isConfirmed) return;

//     setLoading(true);
//     try {
//       const payload = {
//         id: id,
//         action: "delFarmFertilizer",
//       };

//       await api.delete(`/farm/`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         data: payload,
//       });

//       setFertilizers((prev) => prev.filter((fert) => fert.id !== id));
//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.fertilizerDeleted,
//         text: translations[language].toast.fertilizerDeleted,
//         confirmButtonColor: "#28a745",
//         timer: 1500,
//       });
//       await fetchFertilizers(formData.id);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.fertilizerDeleteError,
//         text: `${translations[language].toast.fertilizerDeleteError}: ${error.response?.data?.message || error.message}`,
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFarmsData = useCallback(async () => {
//     setIsLoading(true);
//     if (!villageId || isNaN(parseInt(villageId))) {
//       setVillageError(true);
//       setVillageName("Unknown Village");
//       setFilteredFarms([]);
//       toast.error(translations[language].toast.villageNotFound);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user"));
//       const farmerId = user?.farmer_id;

//       if (!token) throw new Error(translations[language].toast.noToken);

//       const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];
//       const selectedVillage = storedVillages.find(
//         (village) => village.id === parseInt(villageId)
//       );

//       if (
//         !selectedVillage ||
//         (!selectedVillage.village?.name && !selectedVillage.name)
//       ) {
//         setVillageError(true);
//         setVillageName("Unknown Village");
//         setFilteredFarms([]);
//         toast.error(translations[language].toast.villageNotFound);
//         setIsLoading(false);
//         return;
//       }

//       setVillageName(selectedVillage.village?.name || selectedVillage.name);
//       setVillageError(false);

//       const response = await api.get(
//         `/farm/?action=getFarm&farm_village=${villageId}&farmers=${farmerId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data && Array.isArray(response.data.data)) {
//         const transformedFarms = response.data.data.map((farm) => ({
//           id: farm.id,
//           name: farm.name,
//           description: farm.address,
//           location_url: farm.location_url,
//           farm_size: farm.farm_size,
//           village: { id: farm.farm_village },
//           manager_id: farm.manager,
//           farmer_id: farm.farmer,
//         }));
//         setFarms(transformedFarms);
//         setFilteredFarms(transformedFarms);
//       } else {
//         setFarms([]);
//         setFilteredFarms([]);
//       }
//     } catch (error) {
//       setFarms([]);
//       setFilteredFarms([]);
//       if (
//         error.response?.status === 404 &&
//         error.response?.data?.message !== "No farm village found"
//       ) {
//         setVillageError(true);
//         toast.error(translations[language].toast.villageNotFound);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [villageId, language]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.farmer_id) setFarmerId(user.farmer_id);
//     fetchFarmsData();
//     fetchManagers();
//     fetchMasterFertilizers();
//   }, [fetchFarmsData, fetchManagers, fetchMasterFertilizers]);

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = farms.filter((farm) =>
//       (farm.name || "").toLowerCase().includes(query)
//     );
//     setFilteredFarms(filtered);
//   };

//   const handleViewFarm = async (farm) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);

//       const response = await api.get(
//         `/farm/?action=getFarm&fertilizer=true&id=${farm.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const farmData = response.data.data[0];
//       if (farmData) {
//         setFormData({
//           name: farmData.name || "",
//           address: farmData.address || "",
//           location_url: farmData.location_url || "",
//           farm_size: farmData.farm_size || "",
//           id: farmData.id || "",
//           manager_id: farmData.manager || "",
//         });
//         const transformedFertilizers = (farmData.farm_fertilizer || []).map(
//           (fert) => ({
//             id: fert.id,
//             name: fert.fertilizer.name,
//             date: formatDateForDisplay(fert.date),
//           })
//         );
//         setFertilizers(transformedFertilizers);
//       } else {
//         setFormData({
//           name: "",
//           address: "",
//           location_url: "",
//           farm_size: "",
//           id: "",
//           manager_id: "",
//         });
//         setFertilizers([]);
//         toast.error("No farm data found");
//       }
//     } catch (error) {
//       toast.error(translations[language].toast.fetchFertilizersError);
//       setFormData({
//         name: "",
//         address: "",
//         location_url: "",
//         farm_size: "",
//         id: "",
//         manager_id: "",
//       });
//       setFertilizers([]);
//     }

//     setIsEditing(false);
//     setIsModalOpen(true);
//   };

//   const handleEditFarm = (farm) => {
//     setFormData({
//       name: farm.name || "",
//       address: farm.description || "",
//       location_url: farm.location_url || "",
//       farm_size: farm.farm_size || "",
//       id: farm.id || "",
//       manager_id: farm.manager_id || "",
//     });
//     fetchFertilizers(farm.id);
//     setIsEditing(true);
//     setIsModalOpen(true);
//     setIsSubmitting(false);
//   };

//   const handleDeleteFarm = (id) => handleDelete(id);

//   const handleAddFarmClick = () => {
//     setFormData({
//       name: "",
//       address: "",
//       location_url: "",
//       farm_size: "",
//       id: "",
//       manager_id: "",
//     });
//     setFertilizers([]);
//     setIsEditing(true);
//     setIsModalOpen(true);
//     setIsSubmitting(false);
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const getLiveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
//           setFormData((prev) => ({ ...prev, location_url: googleMapsUrl }));
//           toast.success(translations[language].toast.locationSuccess);
//         },
//         () => toast.error(translations[language].toast.locationError)
//       );
//     } else {
//       toast.error(translations[language].toast.locationNotSupported);
//     }
//   };

//   const handlePostFarm = async () => {
//     if (!villageId || isNaN(parseInt(villageId))) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: translations[language].toast.villageNotFound,
//         confirmButtonColor: "#d33",
//       });
//       return;
//     }
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);

//       const postPayload = {
//         action: "postFarm",
//         name: formData.name,
//         address: formData.address,
//         location_url: formData.location_url,
//         farm_size: formData.farm_size,
//         farm_village_id: parseInt(villageId),
//         manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
//         farmers: farmerId ? [parseInt(farmerId)] : [],
//       };

//       const response = await api.post("/farm/", postPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const newFarm = response.data.data;
//       if (newFarm) {
//         const transformedNewFarm = {
//           id: newFarm.id,
//           name: newFarm.name,
//           description: newFarm.address,
//           location_url: newFarm.location_url,
//           farm_size: newFarm.farm_size,
//           village: { id: newFarm.farm_village },
//           manager_id: newFarm.manager,
//           farmer_id: newFarm.farmer,
//         };
//         setFarms((prev) => [...prev, transformedNewFarm]);
//         setFilteredFarms((prev) => [...prev, transformedNewFarm]);
//         Swal.fire({
//           icon: "success",
//           title: translations[language].toast.farmAddedSuccess,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.farmAddError,
//         text: error.response?.data?.message || translations[language].toast.farmAddError,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   const handlePatchFarm = async () => {
//     if (!isSubmitting) return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);

//       const patchPayload = {
//         id: formData.id,
//         action: "patchFarm",
//         name: formData.name,
//         address: formData.address,
//         location_url: formData.location_url,
//         farm_size: formData.farm_size,
//         manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
//       };

//       const response = await api.patch("/farm/", patchPayload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200 || response.data?.success) {
//         const updatedFarm = {
//           id: formData.id,
//           name: formData.name,
//           description: formData.address,
//           location_url: formData.location_url,
//           farm_size: formData.farm_size,
//           village: { id: parseInt(villageId) },
//           manager_id: formData.manager_id
//             ? parseInt(formData.manager_id)
//             : null,
//           farmer_id:
//             farms.find((farm) => farm.id === formData.id)?.farmer_id ||
//             farmerId,
//         };
//         setFarms((prev) =>
//           prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
//         );
//         setFilteredFarms((prev) =>
//           prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
//         );
//         Swal.fire({
//           icon: "success",
//           title: translations[language].toast.farmUpdatedSuccess,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setIsModalOpen(false);
//       } else {
//         toast.error(translations[language].toast.farmUpdateError);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || translations[language].toast.farmUpdateError
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (formData.id) {
//       await handlePatchFarm();
//       if (formData.id) await fetchFertilizers(formData.id);
//     } else {
//       await handlePostFarm();
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(translations[language].toast.noToken);
//       await api.delete("/farm/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         data: { action: "delFarm", id },
//       });
//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.farmDeletedSuccess,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setIsModalOpen(false);
//       fetchFarmsData();
//     } catch (error) {
//       toast.error(translations[language].toast.farmDeleteError);
//     }
//   };

//   return (
//     <div className="container-fluid p-0 min-vh-100">
//       <div className="container-fluid py-3 bg-success my-2 rounded">
//         <nav className="container d-flex align-items-center">
//           <BackButton className="backbtn" />
//           <span className="fs-5 text-white fw-bold text-center ms-0">
//             {villageError
//               ? translations[language].villageNotFound
//               : language === "en"
//               ? `Farming in: ${villageName}`
//               : `शेती: ${villageName}`}
//           </span>
//         </nav>
//         <div className="input-group rounded my-2 container">
//           <input
//             type="search"
//             className="form-control rounded"
//             placeholder={
//               language === "en"
//                 ? "Search by village name..."
//                 : "गावाच्या नावावरून शोधा..."
//             }
//             aria-label="Search"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>
//       </div>
//       <div className="container">
//         <div className="d-flex justify-content-end">
//           <button
//             onClick={handleAddFarmClick}
//             className="btn btn-success fw-bold m-1 p-1 rounded d-flex align-items-center"
//             disabled={loading}
//           >
//             <FaPlus className="me-1 text-white" />
//             {language === "en" ? "Add Farm" : "शेती जोडा"}
//           </button>
//         </div>

//         <ModalForm
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           isEditing={isEditing}
//           formData={formData}
//           labels={translations}
//           handleChange={handleChange}
//           handleSave={handleSave}
//           handleDelete={handleDelete}
//           language={language}
//           getLiveLocation={getLiveLocation}
//           managers={managers}
//           isLoadingManagers={isLoadingManagers}
//           onEdit={() => setIsEditing(true)}
//           fertilizers={fertilizers}
//           setFertilizers={setFertilizers}
//           masterFertilizers={masterFertilizers}
//           handleAddFertilizer={handlePostFertilizer}
//           handleEditFertilizer={handleEditFertilizer}
//           handleDeleteFertilizer={handleDeleteFertilizer}
//           formType="farm"
//           loading={loading}
//         />

//         {isLoading ? (
//           <div className="text-center my-4">
//             <Spinner />
//           </div>
//         ) : (
//           <div className="row">
//             {filteredFarms.length > 0 ? (
//               filteredFarms.map((farm) => (
//                 <div key={farm.id} className="col-12 col-md-6 col-lg-4">
//                   <div className="card border rounded-3 h-100">
//                     <div className="card-body d-flex flex-column shadow-none">
//                       <h5 className="card-title text-success fw-bold">
//                         {farm.name || "Unnamed Farm"}
//                       </h5>
//                       <div className="mb-2 d-flex align-items-center">
//                         <FaGlobe className="me-2 text-success" />
//                         <strong>
//                           {language === "en" ? "Location:" : "स्थान:"}
//                         </strong>
//                         <a
//                           href={farm.location_url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="ms-1 text-truncate d-block"
//                           style={{ maxWidth: "200px" }}
//                         >
//                           {farm.location_url || "N/A"}
//                         </a>
//                       </div>
//                       <div className="mt-auto d-flex justify-content-end">
//                         <button
//                           className="btn btn-success btn-sm align-items-center"
//                           onClick={() => handleViewFarm(farm)}
//                           disabled={loading}
//                         >
//                           <FaEye className="me-1" /> {translations[language].view}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center mt-4">
//                 <div className="alert alert-danger" role="alert">
//                   {language === "en"
//                     ? "No farms found in this village!"
//                     : "या गावात कोणतीही शेती आढळली नाही!"}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }

// export default Sheti;
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaPlus, FaGlobe, FaTractor, FaUserTag, FaRuler, FaMapPin, FaMapMarkerAlt, FaLeaf, FaCalendarAlt, FaEdit, FaTrash, FaCog } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm";
import api from "../../Api/axiosInstance";
import Spinner from "../../Admin/Spinner/Spinner";

function Sheti() {
  const { villageId } = useParams();
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location_url: "",
    farm_size: "",
    id: "",
    manager_id: "",
  });
  const [fertilizerForm, setFertilizerForm] = useState({
    id: "",
    fertilizer_id: "",
    date: "",
    farm_id: "",
  });
  const [fertilizers, setFertilizers] = useState([]);
  const [masterFertilizers, setMasterFertilizers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [villageName, setVillageName] = useState("");
  const [villageError, setVillageError] = useState(false);
  const [managers, setManagers] = useState([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);
  const [farmerId, setFarmerId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      addFarm: "Add Farm",
      viewFarm: "View Farm",
      editFarm: "Edit Farm",
      modalTitle: "Farm Details",
      view: "View",
      edit: "Edit",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      farmSize: "Farm Size (acres)",
      manager: "Manager",
      selectManager: "Select Manager",
      submit: "Submit",
      close: "Close",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirm: "Are you sure you want to delete this farm?",
      villageNotFound: "Village not present",
      fertilizers: "Fertilizers",
      fertilizerName: "Fertilizer Name",
      date: "Date",
      selectFertilizer: "Select Fertilizer",
      addFertilizer: "Add Fertilizer",
      noFertilizers: "No fertilizers found for this farm.",
      actions: "Actions",
      toast: {
        noToken: "No token found! Please log in.",
        locationSuccess: "Live location captured successfully!",
        locationError: "Failed to get location. Please allow location access.",
        locationNotSupported: "Geolocation is not supported by your browser.",
        farmAddedSuccess: "Farm added successfully!",
        farmAddError: "Failed to add farm.",
        farmUpdatedSuccess: "Farm updated successfully!",
        farmUpdateError: "Failed to update farm.",
        farmDeletedSuccess: "Farm deleted successfully!",
        farmDeleteError: "Failed to delete farm.",
        fetchManagersError: "Failed to fetch managers",
        fetchFertilizersError: "Failed to fetch fertilizers",
        fertilizerAdded: "Fertilizer added successfully",
        fertilizerAddError: "Failed to add fertilizer",
        fertilizerUpdated: "Fertilizer updated successfully",
        fertilizerUpdateError: "Failed to update fertilizer",
        fertilizerDeleted: "Fertilizer deleted successfully",
        fertilizerDeleteError: "Failed to delete fertilizer",
        fetchMasterFertilizersError: "Failed to fetch master fertilizers",
        validationError: "Please fill all required fields (Fertilizer and Application Date)",
        invalidDateFormat: "Invalid date format. Please select a valid date.",
      },
    },
    mr: {
      addFarm: "शेती जोडा",
      viewFarm: "शेत पहा",
      editFarm: "शेती संपादित करा",
      modalTitle: "शेती तपशील",
      view: "पहा",
      edit: "संपादन करा",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      farmSize: "शेतीचा आकार (एकर)",
      manager: "व्यवस्थापक",
      selectManager: "व्यवस्थापक निवडा",
      submit: "सुरक्षित करा",
      close: "बंद करा",
      delete: "मिटवा",
      cancel: "रद्द करा",
      deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
      villageNotFound: "गाव सापडले नाही",
      fertilizers: "खते",
      fertilizerName: "खताचे नाव",
      date: "दिनांक",
      selectFertilizer: "खत निवडा",
      addFertilizer: "खत जोडा",
      noFertilizers: "या शेतासाठी कोणतेही खते आढळले नाहीत.",
      actions: "क्रिया",
      toast: {
        noToken: "टोकन सापडले नाही! कृपया लॉग इन करा.",
        locationSuccess: "लाइव्ह स्थान यशस्वीरित्या कॅप्चर केले!",
        locationError: "स्थान मिळविण्यात अयशस्वी. कृपया स्थान परवानगी द्या.",
        locationNotSupported: "आपल्या ब्राउझरद्वारे जिओलोकेशन समर्थित नाही.",
        farmAddedSuccess: "शेती यशस्वीरित्या जोडली गेली!",
        farmAddError: "शेती जोडण्यात अयशस्वी.",
        farmUpdatedSuccess: "शेती यशस्वीरित्या अद्यतनित केली गेली!",
        farmUpdateError: "शेती अद्यतनित करण्यात अयशस्वी.",
        farmDeletedSuccess: "शेती यशस्वीरित्या हटविली गेली!",
        farmDeleteError: "शेती हटविण्यात अयशस्वी.",
        fetchManagersError: "व्यवस्थापक आणण्यात अयशस्वी",
        fetchFertilizersError: "खते आणण्यात अयशस्वी",
        fertilizerAdded: "खत यशस्वीरित्या जोडले गेले",
        fertilizerAddError: "खत जोडण्यात अयशस्वी",
        fertilizerUpdated: "खत यशस्वीरित्या अद्यतनित केले गेले",
        fertilizerUpdateError: "खत अद्यतनित करण्यात अयशस्वी",
        fertilizerDeleted: "खत यशस्वीरित्या हटविले गेले",
        fertilizerDeleteError: "खत हटविण्यात अयशस्वी",
        fetchMasterFertilizersError: "मास्टर खते आणण्यात अयशस्वी",
        validationError: "कृपया सर्व आवश्यक फील्ड भरा (खत आणि अर्जाची तारीख)",
        invalidDateFormat: "अवैध तारीख स्वरूप. कृपया वैध तारीख निवडा.",
      },
    },
  };

  const convertToUTC = (date) => {
    if (!date || !moment(date, "DD-MMM-YYYY hh:mm A", true).isValid()) {
      return "";
    }
    // Format the date to match the backend's expected format: %d-%b-%Y %I:%M %p
    return moment.tz(date, "DD-MMM-YYYY hh:mm A", "Asia/Kolkata").format("DD-MMM-YYYY hh:mm A");
  };

  const formatDateForDisplay = (date) => {
    if (!date || !moment(date).isValid()) {
      return "";
    }
    return moment(date).tz("Asia/Kolkata").format("DD-MMM-YYYY hh:mm A");
  };

  const fetchManagers = useCallback(async () => {
    setIsLoadingManagers(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);
      const response = await api.get("/users/?action=getFarmManager", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setManagers(response.data.data || []);
    } catch (error) {
      toast.error(translations[language].toast.fetchManagersError);
      setManagers([]);
    } finally {
      setIsLoadingManagers(false);
    }
  }, [language]);

  const fetchMasterFertilizers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);
      const response = await api.get("/master_data/?action=getfertilizer", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMasterFertilizers(response.data.data || []);
    } catch (error) {
      toast.error(translations[language].toast.fetchMasterFertilizersError);
      setMasterFertilizers([]);
    }
  }, [language]);

  const fetchFertilizers = useCallback(async (farmId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);
      const response = await api.get(
        `/farm/?action=getFarm&fertilizer=true&id=${farmId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const farmData = response.data.data[0];
      if (farmData && farmData.farm_fertilizer) {
        const transformedFertilizers = farmData.farm_fertilizer.map((fert) => ({
          id: fert.id,
          name: fert.fertilizer.name,
          date: formatDateForDisplay(fert.date),
        }));
        setFertilizers(transformedFertilizers);
      } else {
        setFertilizers([]);
      }
    } catch (error) {
      toast.error(translations[language].toast.fetchFertilizersError);
      setFertilizers([]);
    }
  }, [language]);

  const handlePostFertilizer = async (fertilizerFormData) => {
    if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date || !formData.id) {
      Swal.fire({
        icon: "warning",
        title: translations[language].toast.validationError,
        text: translations[language].toast.validationError,
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedDate = convertToUTC(fertilizerFormData.date);
      if (!formattedDate) {
        throw new Error(translations[language].toast.invalidDateFormat);
      }

      const payload = {
        fertilizer_id: Number(fertilizerFormData.fertilizer_id),
        date: formattedDate,
        farm_id: formData.id,
        action: "postFarmFertilizer",
      };

      const response = await api.post(`/farm/`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const newFertilizer = {
        id: response.data.data.id,
        name:
          masterFertilizers.find((f) => f.id === Number(fertilizerFormData.fertilizer_id))
            ?.name || "Unknown",
        date: formatDateForDisplay(response.data.data.date),
      };

      setFertilizers((prev) => [...prev, newFertilizer]);
      Swal.fire({
        icon: "success",
        title: translations[language].toast.fertilizerAdded,
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchFertilizers(formData.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.fertilizerAddError,
        text: `${translations[language].toast.fertilizerAddError}: ${
          error.response?.data?.error || error.message
        }`,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
      setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: "" });
    }
  };

  const handleEditFertilizer = (fertilizer) => {
    setFertilizerForm({
      id: fertilizer.id,
      fertilizer_id: masterFertilizers.find((f) => f.name === fertilizer.name)?.id || "",
      date: fertilizer.date,
      farm_id: formData.id,
    });
    setIsEditing(true);
  };

  const handleUpdateFertilizer = async (fertilizerFormData) => {
    if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date || !fertilizerFormData.id) {
      Swal.fire({
        icon: "warning",
        title: translations[language].toast.validationError,
        text: translations[language].toast.validationError,
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedDate = convertToUTC(fertilizerFormData.date);
      if (!formattedDate) {
        throw new Error(translations[language].toast.invalidDateFormat);
      }

      const payload = {
        id: fertilizerFormData.id,
        action: "patchFarmFertilizer",
        fertilizer_id: Number(fertilizerFormData.fertilizer_id),
        date: formattedDate,
        farm_id: formData.id,
      };

      const response = await api.patch(`/farm/`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const updatedFertilizer = {
        id: fertilizerFormData.id,
        name:
          masterFertilizers.find((f) => f.id === Number(fertilizerFormData.fertilizer_id))
            ?.name || "Unknown",
        date: formatDateForDisplay(response.data.data.date),
      };

      setFertilizers((prev) =>
        prev.map((fert) => (fert.id === updatedFertilizer.id ? updatedFertilizer : fert))
      );
      Swal.fire({
        icon: "success",
        title: translations[language].toast.fertilizerUpdated,
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchFertilizers(formData.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.fertilizerUpdateError,
        text: `${translations[language].toast.fertilizerUpdateError}: ${
          error.response?.data?.error || error.message
        }`,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
      setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: "" });
    }
  };

  const handleDeleteFertilizer = async (id) => {
    const result = await Swal.fire({
      title: translations[language].deleteConfirm || "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: translations[language].delete || "Yes, delete it!",
      cancelButtonText: translations[language].cancel || "No, cancel",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const payload = {
        id: id,
        action: "delFarmFertilizer",
      };

      await api.delete(`/farm/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: payload,
      });

      setFertilizers((prev) => prev.filter((fert) => fert.id !== id));
      Swal.fire({
        icon: "success",
        title: translations[language].toast.fertilizerDeleted,
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchFertilizers(formData.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.fertilizerDeleteError,
        text: `${translations[language].toast.fertilizerDeleteError}: ${
          error.response?.data?.error || error.message
        }`,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFarmsData = useCallback(async () => {
    setIsLoading(true);
    if (!villageId || isNaN(parseInt(villageId))) {
      setVillageError(true);
      setVillageName("Unknown Village");
      setFilteredFarms([]);
      toast.error(translations[language].toast.villageNotFound);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const farmerId = user?.farmer_id;

      if (!token) throw new Error(translations[language].toast.noToken);

      const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];
      const selectedVillage = storedVillages.find(
        (village) => village.id === parseInt(villageId)
      );

      if (
        !selectedVillage ||
        (!selectedVillage.village?.name && !selectedVillage.name)
      ) {
        setVillageError(true);
        setVillageName("Unknown Village");
        setFilteredFarms([]);
        toast.error(translations[language].toast.villageNotFound);
        setIsLoading(false);
        return;
      }

      setVillageName(selectedVillage.village?.name || selectedVillage.name);
      setVillageError(false);

      const response = await api.get(
        `/farm/?action=getFarm&farm_village=${villageId}&farmers=${farmerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        const transformedFarms = response.data.data.map((farm) => ({
          id: farm.id,
          name: farm.name,
          description: farm.address,
          location_url: farm.location_url,
          farm_size: farm.farm_size,
          village: { id: farm.farm_village },
          manager_id: farm.manager,
          farmer_id: farm.farmer,
        }));
        setFarms(transformedFarms);
        setFilteredFarms(transformedFarms);
      } else {
        setFarms([]);
        setFilteredFarms([]);
      }
    } catch (error) {
      setFarms([]);
      setFilteredFarms([]);
      if (
        error.response?.status === 404 &&
        error.response?.data?.message !== "No farm village found"
      ) {
        setVillageError(true);
        toast.error(translations[language].toast.villageNotFound);
      }
    } finally {
      setIsLoading(false);
    }
  }, [villageId, language]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.farmer_id) setFarmerId(user.farmer_id);
    fetchFarmsData();
    fetchManagers();
    fetchMasterFertilizers();
  }, [fetchFarmsData, fetchManagers, fetchMasterFertilizers]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = farms.filter((farm) =>
      (farm.name || "").toLowerCase().includes(query)
    );
    setFilteredFarms(filtered);
  };

  const handleViewFarm = async (farm) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);

      const response = await api.get(
        `/farm/?action=getFarm&fertilizer=true&id=${farm.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const farmData = response.data.data[0];
      if (farmData) {
        setFormData({
          name: farmData.name || "",
          address: farmData.address || "",
          location_url: farmData.location_url || "",
          farm_size: farmData.farm_size || "",
          id: farmData.id || "",
          manager_id: farmData.manager || "",
        });
        const transformedFertilizers = (farmData.farm_fertilizer || []).map(
          (fert) => ({
            id: fert.id,
            name: fert.fertilizer.name,
            date: formatDateForDisplay(fert.date),
          })
        );
        setFertilizers(transformedFertilizers);
      } else {
        setFormData({
          name: "",
          address: "",
          location_url: "",
          farm_size: "",
          id: "",
          manager_id: "",
        });
        setFertilizers([]);
        toast.error("No farm data found");
      }
    } catch (error) {
      toast.error(translations[language].toast.fetchFertilizersError);
      setFormData({
        name: "",
        address: "",
        location_url: "",
        farm_size: "",
        id: "",
        manager_id: "",
      });
      setFertilizers([]);
    }

    setIsEditing(false);
    setIsModalOpen(true);
    setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: "" });
  };

  const handleEditFarm = (farm) => {
    setFormData({
      name: farm.name || "",
      address: farm.description || "",
      location_url: farm.location_url || "",
      farm_size: farm.farm_size || "",
      id: farm.id || "",
      manager_id: farm.manager_id || "",
    });
    fetchFertilizers(farm.id);
    setIsEditing(true);
    setIsModalOpen(true);
    setIsSubmitting(false);
    setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: farm.id });
  };

  const handleDeleteFarm = (id) => handleDelete(id);

  const handleAddFarmClick = () => {
    setFormData({
      name: "",
      address: "",
      location_url: "",
      farm_size: "",
      id: "",
      manager_id: "",
    });
    setFertilizers([]);
    setIsEditing(true);
    setIsModalOpen(true);
    setIsSubmitting(false);
    setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: "" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prev) => ({ ...prev, location_url: googleMapsUrl }));
          toast.success(translations[language].toast.locationSuccess);
        },
        () => toast.error(translations[language].toast.locationError)
      );
    } else {
      toast.error(translations[language].toast.locationNotSupported);
    }
  };

  const handlePostFarm = async () => {
    if (!villageId || isNaN(parseInt(villageId))) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: translations[language].toast.villageNotFound,
        confirmButtonColor: "#d33",
      });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);

      const postPayload = {
        action: "postFarm",
        name: formData.name,
        address: formData.address,
        location_url: formData.location_url,
        farm_size: formData.farm_size,
        farm_village_id: parseInt(villageId),
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
        farmers: farmerId ? [parseInt(farmerId)] : [],
      };

      const response = await api.post("/farm/", postPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newFarm = response.data.data;
      if (newFarm) {
        const transformedNewFarm = {
          id: newFarm.id,
          name: newFarm.name,
          description: newFarm.address,
          location_url: newFarm.location_url,
          farm_size: newFarm.farm_size,
          village: { id: newFarm.farm_village },
          manager_id: newFarm.manager,
          farmer_id: newFarm.farmer,
        };
        setFarms((prev) => [...prev, transformedNewFarm]);
        setFilteredFarms((prev) => [...prev, transformedNewFarm]);
        Swal.fire({
          icon: "success",
          title: translations[language].toast.farmAddedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.farmAddError,
        text: error.response?.data?.message || translations[language].toast.farmAddError,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handlePatchFarm = async () => {
    if (!isSubmitting) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);

      const patchPayload = {
        id: formData.id,
        action: "patchFarm",
        name: formData.name,
        address: formData.address,
        location_url: formData.location_url,
        farm_size: formData.farm_size,
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
      };

      const response = await api.patch("/farm/", patchPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.data?.success) {
        const updatedFarm = {
          id: formData.id,
          name: formData.name,
          description: formData.address,
          location_url: formData.location_url,
          farm_size: formData.farm_size,
          village: { id: parseInt(villageId) },
          manager_id: formData.manager_id
            ? parseInt(formData.manager_id)
            : null,
          farmer_id:
            farms.find((farm) => farm.id === formData.id)?.farmer_id ||
            farmerId,
        };
        setFarms((prev) =>
          prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
        );
        setFilteredFarms((prev) =>
          prev.map((farm) => (farm.id === formData.id ? updatedFarm : farm))
        );
        Swal.fire({
          icon: "success",
          title: translations[language].toast.farmUpdatedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } else {
        toast.error(translations[language].toast.farmUpdateError);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || translations[language].toast.farmUpdateError
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.id) {
      await handlePatchFarm();
      if (formData.id) await fetchFertilizers(formData.id);
    } else {
      await handlePostFarm();
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(translations[language].toast.noToken);
      await api.delete("/farm/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { action: "delFarm", id },
      });
      Swal.fire({
        icon: "success",
        title: translations[language].toast.farmDeletedSuccess,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      fetchFarmsData();
    } catch (error) {
      toast.error(translations[language].toast.farmDeleteError);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="container-fluid py-3 bg-success my-2 rounded">
        <nav className="container d-flex align-items-center">
          <BackButton className="backbtn" />
          <span className="fs-5 text-white fw-bold text-center ms-0">
            {villageError
              ? translations[language].villageNotFound
              : language === "en"
              ? `Farming in: ${villageName}`
              : `शेती: ${villageName}`}
          </span>
        </nav>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={
              language === "en"
                ? "Search by village name..."
                : "गावाच्या नावावरून शोधा..."
            }
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-end">
          <button
            onClick={handleAddFarmClick}
            className="btn btn-success fw-bold m-1 p-1 rounded d-flex align-items-center"
            disabled={loading}
          >
            <FaPlus className="me-1 text-white" />
            {language === "en" ? "Add Farm" : "शेती जोडा"}
          </button>
        </div>

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFertilizerForm({ id: "", fertilizer_id: "", date: "", farm_id: "" });
          }}
          isEditing={isEditing}
          formData={formData}
          fertilizerForm={fertilizerForm}
          setFertilizerForm={setFertilizerForm}
          labels={translations}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          language={language}
          getLiveLocation={getLiveLocation}
          managers={managers}
          isLoadingManagers={isLoadingManagers}
          onEdit={() => setIsEditing(true)}
          fertilizers={fertilizers}
          masterFertilizers={masterFertilizers}
          handleAddFertilizer={handlePostFertilizer}
          handleEditFertilizer={handleEditFertilizer}
          handleUpdateFertilizer={handleUpdateFertilizer}
          handleDeleteFertilizer={handleDeleteFertilizer}
          formType="farm"
          loading={loading}
        />

        {isLoading ? (
          <div className="text-center my-4">
            <Spinner />
          </div>
        ) : (
          <div className="row">
            {filteredFarms.length > 0 ? (
              filteredFarms.map((farm) => (
                <div key={farm.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card border rounded-3 h-100">
                    <div className="card-body d-flex flex-column shadow-none">
                      <h5 className="card-title text-success fw-bold">
                        {farm.name || "Unnamed Farm"}
                      </h5>
                      <div className="mb-2 d-flex align-items-center">
                        <FaGlobe className="me-2 text-success" />
                        <strong>
                          {language === "en" ? "Location:" : "स्थान:"}
                        </strong>
                        <a
                          href={farm.location_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ms-1 text-truncate d-block"
                          style={{ maxWidth: "200px" }}
                        >
                          {farm.location_url || "N/A"}
                        </a>
                      </div>
                      <div className="mt-auto d-flex justify-content-end">
                        <button
                          className="btn btn-success btn-sm align-items-center"
                          onClick={() => handleViewFarm(farm)}
                          disabled={loading}
                        >
                          <FaEye className="me-1" /> {translations[language].view}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <div className="alert alert-danger" role="alert">
                  {language === "en"
                    ? "No farms found in this village!"
                    : "या गावात कोणतीही शेती आढळली नाही!"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Sheti;