// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaEye, FaPlus, FaGlobe } from "react-icons/fa";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
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
//   const [isEditing, setIsEditing] = useState(false);
//   const [villageName, setVillageName] = useState("");
//   const [villageError, setVillageError] = useState(false);
//   const [managers, setManagers] = useState([]);
//   const [isLoadingManagers, setIsLoadingManagers] = useState(false);
//   const [farmerId, setFarmerId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const labels = {
//     en: {
//       addFarm: "Add Farm",
//       viewFarm:"View Farm",
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
//       fertilizerName: "Fertilizer Name", // Added for table
//       date: "Date", // Added for table
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
//       },
//     },
//     mr: {
//       addFarm: "शेती जोडा",
//       viewFarm:"शेत पहा",
//       editFarm: "शेती संपादित करा",
//       modalTitle: "शेती तपशील",
//       view: "पहा",
//       edit: "संपादन करा",
//       farmName: "शेताचे नाव",
//       address: "पत्ता",
//       locationUrl: "स्थान URL",
//       farmSize: "शेताचा आकार (एकर)",
//       manager: "व्यवस्थापक",
//       submit: "सुरक्षित करा",
//       close: "बंद करा",
//       delete: "मिटवा",
//       cancel: "रद्द करा",
//       deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
//       villageNotFound: "गावाचा आयडी सापडला नाही",
//       fertilizers: "खते",
//       fertilizerName: "खताचे नाव", // Added for table
//       date: "दिनांक", // Added for table
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
//       },
//     },
//   };

//   const fetchManagers = useCallback(async () => {
//     setIsLoadingManagers(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(labels[language].toast.noToken);
//       const response = await api.get("/users/?action=getFarmManager", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setManagers(response.data.data || []);
//     } catch (error) {
//       toast.error(labels[language].toast.fetchManagersError);
//       setManagers([]);
//     } finally {
//       setIsLoadingManagers(false);
//     }
//   }, [language]);

//   // const fetchFarmsData = useCallback(async () => {
//   //   setIsLoading(true);
//   //   if (!villageId || isNaN(parseInt(villageId))) {
//   //     setVillageError(true);
//   //     setVillageName("Unknown Village");
//   //     setFilteredFarms([]);
//   //     toast.error(labels[language].toast.villageNotFound);
//   //     setIsLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) throw new Error(labels[language].toast.noToken);

//   //     const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];
//   //     const selectedVillage = storedVillages.find(
//   //       (village) => village.id === parseInt(villageId)
//   //     );
//   //     if (
//   //       !selectedVillage ||
//   //       (!selectedVillage.village?.name && !selectedVillage.name)
//   //     ) {
//   //       setVillageError(true);
//   //       setVillageName("Unknown Village");
//   //       setFilteredFarms([]);
//   //       toast.error(labels[language].toast.villageNotFound);
//   //       setIsLoading(false);
//   //       return;
//   //     }

//   //     setVillageName(selectedVillage.village?.name || selectedVillage.name);
//   //     setVillageError(false);

//   //     const response = await api.get(
//   //       `/farm/?action=getFarm&farm_village=${villageId}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (response.data && Array.isArray(response.data.data)) {
//   //       const transformedFarms = response.data.data.map((farm) => ({
//   //         id: farm.id,
//   //         name: farm.name,
//   //         description: farm.address,
//   //         location_url: farm.location_url,
//   //         farm_size: farm.farm_size,
//   //         village: { id: farm.farm_village },
//   //         manager_id: farm.manager,
//   //         farmer_id: farm.farmer,
//   //       }));
//   //       setFarms(transformedFarms);
//   //       setFilteredFarms(transformedFarms);
//   //     } else {
//   //       setFarms([]);
//   //       setFilteredFarms([]);
//   //     }
//   //   } catch (error) {
//   //     setFarms([]);
//   //     setFilteredFarms([]);
//   //     if (
//   //       error.response?.status === 404 &&
//   //       error.response?.data?.message !== "No farm village found"
//   //     ) {
//   //       setVillageError(true);
//   //       toast.error(labels[language].toast.villageNotFound);
//   //     }
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // }, [villageId, language]);
//   const fetchFarmsData = useCallback(async () => {
//     setIsLoading(true);

//     if (!villageId || isNaN(parseInt(villageId))) {
//       setVillageError(true);
//       setVillageName("Unknown Village");
//       setFilteredFarms([]);
//       toast.error(labels[language].toast.villageNotFound);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user")); // 👈 extract user from localStorage
//       const farmerId = user?.farmer_id;

//       if (!token) throw new Error(labels[language].toast.noToken);

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
//         toast.error(labels[language].toast.villageNotFound);
//         setIsLoading(false);
//         return;
//       }

//       setVillageName(selectedVillage.village?.name || selectedVillage.name);
//       setVillageError(false);

//       //  Updated API call to include farmers=${farmerId}
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
//         toast.error(labels[language].toast.villageNotFound);
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
//   }, [fetchFarmsData, fetchManagers]);

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
//       if (!token) throw new Error(labels[language].toast.noToken);

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
//         // Transform farm_fertilizer to a flat structure
//         const transformedFertilizers = (farmData.farm_fertilizer || []).map(
//           (fert) => ({
//             id: fert.id,
//             name: fert.fertilizer.name,
//             date: fert.date,
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
//       toast.error(labels[language].toast.fetchFertilizersError);
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
//     setFertilizers([]);
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
//           toast.success(labels[language].toast.locationSuccess);
//         },
//         () => toast.error(labels[language].toast.locationError)
//       );
//     } else {
//       toast.error(labels[language].toast.locationNotSupported);
//     }
//   };

//   const handlePostFarm = async () => {
//     if (!villageId || isNaN(parseInt(villageId))) {
//       toast.error(labels[language].toast.villageNotFound);
//       return;
//     }
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(labels[language].toast.noToken);

//       const postPayload = {
//         action: "postFarm",
//         name: formData.name,
//         address: formData.address,
//         location_url: formData.location_url,
//         farm_size: formData.farm_size,
//         farm_village_id: parseInt(villageId),
//         manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
//         farmer_id: farmerId,
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
//           title: labels[language].toast.farmAddedSuccess,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || labels[language].toast.farmAddError
//       );
//     }
//   };

//   const handlePatchFarm = async () => {
//     if (!isSubmitting) return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(labels[language].toast.noToken);

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
//           title: labels[language].toast.farmUpdatedSuccess,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setIsModalOpen(false);
//       } else {
//         toast.error(labels[language].toast.farmUpdateError);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || labels[language].toast.farmUpdateError
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (formData.id) await handlePatchFarm();
//     else await handlePostFarm();
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error(labels[language].toast.noToken);
//       await api.delete("/farm/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         data: { action: "delFarm", id },
//       });
//       Swal.fire({
//         icon: "success",
//         title: labels[language].toast.farmDeletedSuccess,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setIsModalOpen(false);
//       fetchFarmsData();
//     } catch (error) {
//       toast.error(labels[language].toast.farmDeleteError);
//     }
//   };

//   return (
//     <div className="container-fluid p-0 min-vh-100">
//       <div className="container-fluid py-3 bg-success my-2 rounded">
//         <nav className="container d-flex align-items-center">
//           <BackButton className="backbtn" />
//           <span className="fs-5 text-white fw-bold text-center ms-0">
//             {villageError
//               ? labels[language].villageNotFound
//               : language === "en"
//               ? `Farming in: ${villageName}`
//               : `शेती: ${villageName}`}
//           </span>
//         </nav>
//         <div className="input-group rounded my-2 container">
//           <input
//             type="search"
//             className="form-control rounded"
//             placeholder={language === "en" ? "Search" : "शोधा"}
//             aria-label="Search"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           {/* <span className="input-group-text border-0" id="search-addon">
//             <i className="fa fa-search"></i>
//           </span> */}
//         </div>
//       </div>
//       <div className="container">
//         <div className="d-flex justify-content-end">
//           <button
//             onClick={handleAddFarmClick}
//             className="btn btn-success  fw-bold m-1 p-1 rounded d-flex align-items-center"
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
//           labels={labels}
//           handleChange={handleChange}
//           handleSave={handleSave}
//           handleDelete={handleDelete}
//           language={language}
//           getLiveLocation={getLiveLocation}
//           managers={managers}
//           isLoadingManagers={isLoadingManagers}
//           onEdit={() => setIsEditing(true)}
//           fertilizers={fertilizers}
//           formType="farm"
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
//                   <div
//                     className="card border rounded-3 h-100"
//                     // onMouseEnter={(e) =>
//                     //   (e.currentTarget.style.transform = "scale(1.02)")
//                     // }
//                     // onMouseLeave={(e) =>
//                     //   (e.currentTarget.style.transform = "scale(1)")
//                     // }
//                   >
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
//                           // style={{
//                           //   borderRadius: "6px",
//                           //   backgroundColor: "#198754",
//                           //   color: "#fff",
//                           //   // transition: "background-color 0.2s, color 0.2s",
//                           // }}
//                           // onMouseEnter={(e) => {
//                           //   e.currentTarget.style.backgroundColor = "#007bff";
//                           //   e.currentTarget.style.color = "#fff";
//                           // }}
//                           // onMouseLeave={(e) => {
//                           //   e.currentTarget.style.backgroundColor = "#198754";
//                           //   e.currentTarget.style.color = "#fff";
//                           // }}
//                         >
//                           <FaEye className="me-1" /> {labels[language].view}
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
import { FaEye, FaPlus, FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
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
  const [fertilizers, setFertilizers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [villageName, setVillageName] = useState("");
  const [villageError, setVillageError] = useState(false);
  const [managers, setManagers] = useState([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);
  const [farmerId, setFarmerId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const labels = {
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
      submit: "Submit",
      close: "Close",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirm: "Are you sure you want to delete this farm?",
      villageNotFound: "Village ID not found",
      fertilizers: "Fertilizers",
      fertilizerName: "Fertilizer Name",
      date: "Date",
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
      submit: "सुरक्षित करा",
      close: "बंद करा",
      delete: "मिटवा",
      cancel: "रद्द करा",
      deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
      villageNotFound: "गावाचा आयडी सापडला नाही",
      fertilizers: "खते",
      fertilizerName: "खताचे नाव",
      date: "दिनांक",
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
      },
    },
  };

  const fetchManagers = useCallback(async () => {
    setIsLoadingManagers(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(labels[language].toast.noToken);
      const response = await api.get("/users/?action=getFarmManager", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setManagers(response.data.data || []);
    } catch (error) {
      toast.error(labels[language].toast.fetchManagersError);
      setManagers([]);
    } finally {
      setIsLoadingManagers(false);
    }
  }, [language]);

  const fetchFarmsData = useCallback(async () => {
    setIsLoading(true);

    if (!villageId || isNaN(parseInt(villageId))) {
      setVillageError(true);
      setVillageName("Unknown Village");
      setFilteredFarms([]);
      toast.error(labels[language].toast.villageNotFound);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const farmerId = user?.farmer_id;

      if (!token) throw new Error(labels[language].toast.noToken);

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
        toast.error(labels[language].toast.villageNotFound);
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
        toast.error(labels[language].toast.villageNotFound);
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
  }, [fetchFarmsData, fetchManagers]);

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
      if (!token) throw new Error(labels[language].toast.noToken);

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
            date: fert.date,
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
      toast.error(labels[language].toast.fetchFertilizersError);
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
    setFertilizers([]);
    setIsEditing(true);
    setIsModalOpen(true);
    setIsSubmitting(false);
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
          toast.success(labels[language].toast.locationSuccess);
        },
        () => toast.error(labels[language].toast.locationError)
      );
    } else {
      toast.error(labels[language].toast.locationNotSupported);
    }
  };

  const handlePostFarm = async () => {
    if (!villageId || isNaN(parseInt(villageId))) {
      toast.error(labels[language].toast.villageNotFound);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(labels[language].toast.noToken);

      const postPayload = {
        action: "postFarm",
        name: formData.name,
        address: formData.address,
        location_url: formData.location_url,
        farm_size: formData.farm_size,
        farm_village_id: parseInt(villageId),
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
        farmers: farmerId ? [parseInt(farmerId)] : [], // Updated to set farmerId in farmers array
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
          title: labels[language].toast.farmAddedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || labels[language].toast.farmAddError
      );
    }
  };

  const handlePatchFarm = async () => {
    if (!isSubmitting) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(labels[language].toast.noToken);

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
          title: labels[language].toast.farmUpdatedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } else {
        toast.error(labels[language].toast.farmUpdateError);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || labels[language].toast.farmUpdateError
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.id) await handlePatchFarm();
    else await handlePostFarm();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error(labels[language].toast.noToken);
      await api.delete("/farm/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { action: "delFarm", id },
      });
      Swal.fire({
        icon: "success",
        title: labels[language].toast.farmDeletedSuccess,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      fetchFarmsData();
    } catch (error) {
      toast.error(labels[language].toast.farmDeleteError);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="container-fluid py-3 bg-success my-2 rounded">
        <nav className="container d-flex align-items-center">
          <BackButton className="backbtn" />
          <span className="fs-5 text-white fw-bold text-center ms-0">
            {villageError
              ? labels[language].villageNotFound
              : language === "en"
              ? `Farming in: ${villageName}`
              : `शेती: ${villageName}`}
          </span>
        </nav>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={language === "en" ? "Search" : "शोधा"}
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
          >
            <FaPlus className="me-1 text-white" />
            {language === "en" ? "Add Farm" : "शेती जोडा"}
          </button>
        </div>

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isEditing={isEditing}
          formData={formData}
          labels={labels}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          language={language}
          getLiveLocation={getLiveLocation}
          managers={managers}
          isLoadingManagers={isLoadingManagers}
          onEdit={() => setIsEditing(true)}
          fertilizers={fertilizers}
          formType="farm"
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
                        >
                          <FaEye className="me-1" /> {labels[language].view}
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
