// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import "./villages.css";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../../Api/axiosInstance";
// import { FaSave, FaTimes, FaGlobe } from "react-icons/fa";
// import Select, { components } from "react-select";
// import Swal from "sweetalert2";
// import Header from "../Components/Header";

// const Villages = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage();

//   const getStoredVillages = () => {
//     const storedVillages = localStorage.getItem("villages");
//     try {
//       const parsedVillages = JSON.parse(storedVillages);
//       return Array.isArray(parsedVillages)
//         ? parsedVillages.filter(
//             (village) => village && typeof village.village?.name === "string"
//           )
//         : [];
//     } catch (error) {
//       return [];
//     }
//   };

//   const [villages, setVillages] = useState(getStoredVillages);
//   const [serverVillages, setServerVillages] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showShetiModal, setShowShetiModal] = useState(false);
//   const [loading, setLoading] = useState({
//     states: false,
//     districts: false,
//     talukas: false,
//     villages: false,
//     submit: false,
//   });
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [talukas, setTalukas] = useState([]);
//   const [availableVillages, setAvailableVillages] = useState([]);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedTaluka, setSelectedTaluka] = useState(null);
//   const [selectedVillage, setSelectedVillage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [villagePage, setVillagePage] = useState(1);
//   const [hasMoreVillages, setHasMoreVillages] = useState(true);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [noVillagesAvailable, setNoVillagesAvailable] = useState(false); // New state for no villages
//   const recordsNumber = 10;

//   const translations = useMemo(
//     () => ({
//       en: {
//         title: "My Villages",
//         addSheti: "Add Village",
//         AllFarms: "All Farms",
//         searchPlaceholder: "Search..",
//         cancel: "Cancel",
//         edit: "Edit",
//         submitting: "submitting..",
//         submit: "submit",
//         update: "Update",
//         state: "State",
//         district: "District",
//         taluka: "Taluka",
//         gaon: "Village",
//         loadMore: "Show More",
//         loadingVillages: "Loading village...",
//         noVillages: "No Villages Available", // Added translation for no villages
//         toast: {
//           fetchStatesError: "Failed to fetch states",
//           fetchDistrictsError: "Failed to fetch districts",
//           fetchTalukasError: "Failed to fetch talukas",
//           fetchVillagesError: "Failed to fetch villages",
//           selectTalukaVillageError: "Please select both taluka and village",
//           villageExistsError: "This village is already added",
//           villageAddedSuccess: "Village added successfully!",
//           villageAddError: "Failed to add village",
//           timeoutError: "Request timed out. Please try again.",
//           forbiddenError: "Access forbidden. Please check your permissions.",
//         },
//       },
//       mr: {
//         title: "माझी गावे",
//         addSheti: "गावे जोडा",
//         AllFarms: "सर्व शेत",
//         searchPlaceholder: "शोधा..",
//         cancel: "रद्द करा",
//         edit: "संपादन",
//         update: "अद्यतनित करा",
//         state: "राज्य",
//         district: "जिल्हा",
//         taluka: "तालुका",
//         submitting: "जतन करत आहे",
//         submit: "जतन",
//         gaon: "गाव",
//         loadMore: "अधिक लोड करा",
//         loadingVillages: "गावांची नावे लोड होत आहेत...",
//         noVillages: "कोणतीही गावे उपलब्ध नाहीत", // Added translation for no villages
//         toast: {
//           fetchStatesError: "राज्य आणण्यात अयशस्वी",
//           fetchDistrictsError: "जिल्हे आणण्यात अयशस्वी",
//           fetchTalukasError: "तालुके आणण्यात अयशस्वी",
//           fetchVillagesError: "गावे आणण्यात अयशस्वी",
//           selectTalukaVillageError: "कृपया तालुका आणि गाव दोन्ही निवडा",
//           villageExistsError: "हे गाव आधीपासूनच जोडले गेले आहे",
//           villageAddedSuccess: "गाव यशस्वीरित्या जोडले गेले!",
//           villageAddError: "गाव जोडण्यात अयशस्वी",
//           timeoutError: "विनंती वेळ संपली. कृपया पुन्हा प्रयत्न करा.",
//           forbiddenError: "प्रवेश निषिद्ध. कृपया आपल्या परवानग्या तपासा。",
//         },
//       },
//     }),
//     [language]
//   );

//   const fetchWithRetry = async (
//     url,
//     options = {},
//     retries = 3,
//     delay = 2000
//   ) => {
//     for (let i = 0; i < retries; i++) {
//       try {
//         const response = await api.get(url, { ...options, timeout: 60000 });
//         return response;
//       } catch (err) {
//         if (i === retries - 1) {
//           if (err.response?.status === 403) {
//             toast.error(translations[language].toast.forbiddenError);
//           }
//           throw err;
//         }
//         if (err.response?.status === 504 || err.code === "ECONNABORTED") {
//           await new Promise((resolve) => setTimeout(resolve, delay));
//           continue;
//         }
//         throw err;
//       }
//     }
//   };

//   const fetchStates = useCallback(async () => {
//     setLoading((prev) => ({ ...prev, states: true }));
//     try {
//       const response = await fetchWithRetry("/master_data/?action=getState");
//       console.log("States Response:", response.data);
//       setStates(response.data.data || []);
//     } catch (err) {
//       console.error("Fetch States Error:", err);
//       toast.error(translations[language].toast.fetchStatesError);
//     } finally {
//       setLoading((prev) => ({ ...prev, states: false }));
//     }
//   }, [language, translations]);

//   const fetchDistricts = useCallback(
//     async (stateId) => {
//       setLoading((prev) => ({ ...prev, districts: true }));
//       try {
//         const response = await fetchWithRetry(
//           `/master_data/?action=getDistrict&state_id=${stateId}`
//         );
//         console.log("Districts Response:", response.data);
//         const filteredDistricts = response.data.data.filter(
//           (district) => district.state?.id === stateId
//         );
//         setDistricts(filteredDistricts || []);
//       } catch (err) {
//         console.error("Fetch Districts Error:", err);
//         toast.error(translations[language].toast.fetchDistrictsError);
//       } finally {
//         setLoading((prev) => ({ ...prev, districts: false }));
//       }
//     },
//     [language, translations]
//   );

//   const fetchTalukas = useCallback(
//     async (districtId) => {
//       setLoading((prev) => ({ ...prev, talukas: true }));
//       try {
//         const response = await fetchWithRetry(
//           `/master_data/?action=getTaluka&district_id=${districtId}`
//         );
//         console.log("Talukas Response:", response.data);
//         const filteredTalukas = response.data.data.filter(
//           (taluka) => taluka.district?.id === districtId
//         );
//         setTalukas(filteredTalukas || []);
//       } catch (err) {
//         console.error("Fetch Talukas Error:", err);
//         toast.error(translations[language].toast.fetchTalukasError);
//       } finally {
//         setLoading((prev) => ({ ...prev, talukas: false }));
//       }
//     },
//     [language, translations]
//   );

//   const fetchVillagesForTaluka = useCallback(
//     async (talukaId, page = 1, append = false) => {
//       setLoading((prev) => ({ ...prev, villages: true }));
//       if (append) {
//         setIsFetchingMore(true);
//       }

//       try {
//         const response = await fetchWithRetry(
//           `/master_data/?action=getVillage&taluka=${talukaId}&page=${page}&records_number=${recordsNumber}`
//         );
//         console.log("Villages API Response:", response.data);
//         const villages = response.data.data.map((village) => ({
//           id: village.id,
//           name: village.name,
//           taluka: village.taluka,
//         }));
//         console.log("Mapped Villages:", villages);
//         setAvailableVillages((prev) => {
//           const newVillages = append ? [...prev, ...villages] : villages;
//           console.log("Updated availableVillages:", newVillages);
//           return [...newVillages];
//         });
//         setHasMoreVillages(villages.length === recordsNumber);
//         setNoVillagesAvailable(villages.length === 0 && page === 1); // Set flag if no villages
//       } catch (err) {
//         console.error("Fetch Villages Error:", err);
//         // toast.error(
//         //   err.response?.status === 504 || err.code === "ECONNABORTED"
//         //     ? translations[language].toast.timeoutError
//         //     : err.response?.status === 403
//         //     ? translations[language].toast.forbiddenError
//         //     : translations[language].toast.fetchVillagesError
//         // );
//         setNoVillagesAvailable(true); // Set flag on error
//       } finally {
//         setLoading((prev) => ({ ...prev, villages: false }));
//         setIsFetchingMore(false);
//       }
//     },
//     [language, translations, recordsNumber]
//   );

//   const fetchInitialVillages = useCallback(async () => {
//     setFetchLoading(true);
//     setLoading((prev) => ({ ...prev, submit: true }));
//     try {
//       const response = await fetchWithRetry("/farm/?action=getFarmVillage");
//       console.log("Initial Villages Response:", response.data);
//       if (response.data && Array.isArray(response.data.data)) {
//         const validVillages = response.data.data.filter(
//           (village) =>
//             village &&
//             typeof village.village?.name === "string" &&
//             village.id &&
//             village.village?.id
//         );
//         setServerVillages(validVillages);
//         setVillages(validVillages);
//         localStorage.setItem("villages", JSON.stringify(validVillages));
//       } else {
//         setServerVillages([]);
//         setVillages([]);
//         localStorage.setItem("villages", JSON.stringify([]));
//       }
//     } catch (err) {
//       console.error("Fetch Initial Villages Error:", err);
//       toast.error(
//         err.response?.status === 403
//           ? translations[language].toast.forbiddenError
//           : "Failed to fetch initial villages."
//       );
//       setServerVillages([]);
//       setVillages([]);
//       localStorage.setItem("villages", JSON.stringify([]));
//     } finally {
//       setFetchLoading(false);
//       setLoading((prev) => ({ ...prev, submit: false }));
//     }
//   }, [language, translations]);

//   useEffect(() => {
//     if (serverVillages.length === 0) {
//       fetchInitialVillages();
//     } else {
//       setFetchLoading(false);
//     }
//   }, [fetchInitialVillages, serverVillages.length]);

//   useEffect(() => {
//     if (showShetiModal) {
//       fetchStates();
//     }
//   }, [showShetiModal, fetchStates]);

//   useEffect(() => {
//     if (selectedState) {
//       fetchDistricts(selectedState.id);
//     }
//     if (!selectedState) {
//       setDistricts([]);
//       setSelectedDistrict(null);
//       setTalukas([]);
//       setSelectedTaluka(null);
//       setAvailableVillages([]);
//       setSelectedVillage(null);
//       setVillagePage(1);
//       setHasMoreVillages(true);
//       setIsMenuOpen(false);
//       setNoVillagesAvailable(false);
//     }
//   }, [selectedState, fetchDistricts]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       fetchTalukas(selectedDistrict.id);
//     }
//     if (!selectedDistrict) {
//       setTalukas([]);
//       setSelectedTaluka(null);
//       setAvailableVillages([]);
//       setSelectedVillage(null);
//       setVillagePage(1);
//       setHasMoreVillages(true);
//       setIsMenuOpen(false);
//       setNoVillagesAvailable(false);
//     }
//   }, [selectedDistrict, fetchTalukas]);

//   useEffect(() => {
//     if (selectedTaluka) {
//       setVillagePage(1);
//       setHasMoreVillages(true);
//       setAvailableVillages([]);
//       setNoVillagesAvailable(false);
//       fetchVillagesForTaluka(selectedTaluka.id, 1, false);
//     }
//     if (!selectedTaluka) {
//       setAvailableVillages([]);
//       setSelectedVillage(null);
//       setVillagePage(1);
//       setHasMoreVillages(true);
//       setIsMenuOpen(false);
//       setNoVillagesAvailable(false);
//     }
//   }, [selectedTaluka, fetchVillagesForTaluka]);

//   // Memoize select options
//   const selectOptions = useMemo(
//     () =>
//       availableVillages.map((village) => ({
//         value: village.id,
//         label: village.name,
//       })),
//     [availableVillages]
//   );

//   // Custom MenuList for Load More
//   const MenuList = (props) => {
//     const { children } = props;

//     const handleLoadMore = () => {
//       if (hasMoreVillages && !isFetchingMore) {
//         setIsMenuOpen(true);
//         setVillagePage((prev) => {
//           const nextPage = prev + 1;
//           console.log("Loading page:", nextPage);
//           fetchVillagesForTaluka(selectedTaluka.id, nextPage, true);
//           return nextPage;
//         });
//       }
//     };

//     return (
//       <components.MenuList {...props}>
//         {children}
//         {noVillagesAvailable && !isFetchingMore ? (
//           <div className="d-flex justify-content-center align-items-center p-2">
//             <span className="text-muted">
//               {translations[language].noVillages}
//             </span>
//           </div>
//         ) : isFetchingMore ? (
//           <div className="d-flex justify-content-center align-items-center p-2">
//             <span className="text-muted">
//               {translations[language].loadingVillages}
//             </span>
//           </div>
//         ) : hasMoreVillages ? (
//           <div className="d-flex justify-content-center">
//             <button
//               className="react-select__load-more-button btn btn-success btn-sm"
//               onClick={handleLoadMore}
//               disabled={isFetchingMore || !hasMoreVillages}
//             >
//               {translations[language].loadMore}
//             </button>
//           </div>
//         ) : null}
//       </components.MenuList>
//     );
//   };

//   const handleSubmitSheti = async () => {
//     if (!selectedTaluka || !selectedVillage) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: translations[language].toast.selectTalukaVillageError,
//         confirmButtonColor: "#dc3545",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setLoading((prev) => ({ ...prev, submit: true }));
//     try {
//       const existingVillage = serverVillages.find(
//         (village) => village && village.village?.id === selectedVillage.id
//       );

//       if (existingVillage) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: translations[language].toast.villageExistsError,
//           confirmButtonColor: "#dc3545",
//         });
//         return;
//       }

//       const payload = {
//         action: "postFarmVillage",
//         name: "",
//         description: "",
//         village: selectedVillage.id,
//       };

//       const response = await api.post("/farm/", payload, {
//         timeout: 30000,
//       });

//       if (
//         response.status === 200 ||
//         response.data.success ||
//         response.data.message === "Village Created!"
//       ) {
//         const newVillage = {
//           id: response.data.data?.id || Date.now(),
//           name: response.data.data?.name || "",
//           description: response.data.data?.description || "",
//           village: {
//             id: selectedVillage.id,
//             name: selectedVillage.name,
//           },
//           taluka: {
//             id: selectedTaluka.id,
//             name: selectedTaluka.name,
//             district: selectedDistrict,
//             state: selectedState,
//           },
//         };

//         setVillages((prevVillages) => {
//           const updated = [...prevVillages, newVillage];
//           localStorage.setItem("villages", JSON.stringify(updated));
//           return updated;
//         });
//         setServerVillages((prevServerVillages) => [
//           ...prevServerVillages,
//           newVillage,
//         ]);

//         Swal.fire({
//           icon: "success",
//           title: translations[language].toast.villageAddedSuccess,
//           confirmButtonColor: "#28a745",
//         });

//         setShowShetiModal(false);
//         setSelectedState(null);
//         setSelectedDistrict(null);
//         setSelectedTaluka(null);
//         setSelectedVillage(null);
//         setVillagePage(1);
//         setHasMoreVillages(true);
//         setIsMenuOpen(false);
//         setNoVillagesAvailable(false);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (err) {
//       console.error("Submit Village Error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           err.response?.status === 403
//             ? translations[language].toast.forbiddenError
//             : err.response?.data?.message ||
//               translations[language].toast.villageAddError,
//         confirmButtonColor: "#dc3545",
//       });
//     } finally {
//       setIsSubmitting(false);
//       setLoading((prev) => ({ ...prev, submit: false }));
//     }
//   };

//   const handleVillageClick = (village) => {
//     navigate(`/Admin/sheti/${village.id}`);
//   };

//   const filteredVillages = useMemo(
//     () =>
//       Array.isArray(serverVillages)
//         ? serverVillages.filter(
//             (village) =>
//               village &&
//               typeof village.village?.name === "string" &&
//               village.village.name
//                 .toLowerCase()
//                 .includes(searchQuery.toLowerCase())
//           )
//         : [],
//     [serverVillages, searchQuery]
//   );

//   console.log("Rendering Select with availableVillages:", availableVillages);
//   console.log("Select options:", selectOptions);
//   console.log("Menu open state:", isMenuOpen);
//   console.log("No villages available:", noVillagesAvailable);

//   return (
//     <div className="villages-container mb-5">
//       <Header title={translations[language].title} icon={FaGlobe} />

//       <div className="container">
//         <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
//           <div className="input-group" style={{ flex: "1", width: "180px" }}>
//             <input
//               type="search"
//               className="form-control rounded border-success"
//               placeholder={translations[language].searchPlaceholder}
//               aria-label="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <button
//             className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//             style={{ whiteSpace: "nowrap" }}
//             onClick={() => setShowShetiModal(true)}
//             disabled={loading.submit}
//           >
//             {translations[language].addSheti}
//           </button>
//           <button
//             className="btn btn-success btn-sm fw-bold p-2"
//             style={{ whiteSpace: "nowrap" }}
//             onClick={() => navigate("/Admin/allfarms")}
//             disabled={loading.submit}
//           >
//             {translations[language].AllFarms}
//           </button>
//         </div>
//       </div>

//       <div className="villages-grid gap-1">
//         {fetchLoading && serverVillages.length === 0 ? (
//           <div className="text-center mt-3">
//             <span className="text-muted">Loading villages...</span>
//           </div>
//         ) : filteredVillages.length > 0 ? (
//           filteredVillages.map((village) => (
//             <div key={village.id} className="village-card">
//               <span
//                 className="village-name"
//                 onClick={() => handleVillageClick(village)}
//               >
//                 {village.village.name}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No Villages found</p>
//         )}
//       </div>

//       {showShetiModal && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div
//               className="modal-content"
//               style={{
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//               }}
//             >
//               <div
//                 className="modal-header"
//                 style={{
//                   backgroundColor: "#198754",
//                   borderBottom: "1px solid #dee2e6",
//                   color: "white",
//                 }}
//               >
//                 <h5
//                   className="modal-title fw-bold ms-auto"
//                   style={{ color: "white" }}
//                 >
//                   {translations[language].addSheti}
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={() => {
//                     setShowShetiModal(false);
//                     setIsMenuOpen(false);
//                     setNoVillagesAvailable(false);
//                   }}
//                   disabled={loading.submit || isSubmitting}
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body" style={{ padding: "20px" }}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="stateSelect"
//                     className="form-label fw-bold"
//                     style={{ color: "#495057" }}
//                   >
//                     {translations[language].state}
//                   </label>
//                   <select
//                     id="stateSelect"
//                     className="form-select"
//                     value={selectedState ? selectedState.id : ""}
//                     onChange={(e) => {
//                       const stateId = parseInt(e.target.value, 10);
//                       const state = states.find((s) => s.id === stateId);
//                       setSelectedState(state || null);
//                       setSelectedDistrict(null);
//                       setSelectedTaluka(null);
//                       setSelectedVillage(null);
//                       setIsMenuOpen(false);
//                       setNoVillagesAvailable(false);
//                     }}
//                   >
//                     <option value="">Select State</option>
//                     {loading.states ? (
//                       <option value="">Loading States...</option>
//                     ) : (
//                       states.map((state) => (
//                         <option key={state.id} value={state.id}>
//                           {state.name}
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="districtSelect"
//                     className="form-label fw-bold"
//                     style={{ color: "#495057" }}
//                   >
//                     {translations[language].district}
//                   </label>
//                   <select
//                     id="districtSelect"
//                     className="form-select"
//                     disabled={!selectedState || loading.districts}
//                     value={selectedDistrict ? selectedDistrict.id : ""}
//                     onChange={(e) => {
//                       const districtId = parseInt(e.target.value, 10);
//                       const district = districts.find(
//                         (d) => d.id === districtId
//                       );
//                       setSelectedDistrict(district || null);
//                       setSelectedTaluka(null);
//                       setSelectedVillage(null);
//                       setIsMenuOpen(false);
//                       setNoVillagesAvailable(false);
//                     }}
//                   >
//                     <option value="">Select District</option>
//                     {loading.districts ? (
//                       <option value="">Loading Districts...</option>
//                     ) : districts.length > 0 ? (
//                       districts.map((district) => (
//                         <option key={district.id} value={district.id}>
//                           {district.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="">No Districts Available</option>
//                     )}
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="talukaSelect"
//                     className="form-label fw-bold"
//                     style={{ color: "#495057" }}
//                   >
//                     {translations[language].taluka}
//                   </label>
//                   <select
//                     id="talukaSelect"
//                     className="form-select"
//                     disabled={!selectedDistrict || loading.talukas}
//                     value={selectedTaluka ? selectedTaluka.id : ""}
//                     onChange={(e) => {
//                       const talukaId = parseInt(e.target.value, 10);
//                       const taluka = talukas.find((t) => t.id === talukaId);
//                       setSelectedTaluka(taluka || null);
//                       setSelectedVillage(null);
//                       setIsMenuOpen(false);
//                       setNoVillagesAvailable(false);
//                     }}
//                   >
//                     <option value="">Select Taluka</option>
//                     {loading.talukas ? (
//                       <option value="">Loading Talukas...</option>
//                     ) : talukas.length > 0 ? (
//                       talukas.map((taluka) => (
//                         <option key={taluka.id} value={taluka.id}>
//                           {taluka.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="">No Talukas Available</option>
//                     )}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="villageSelect"
//                     className="form-label fw-bold"
//                     style={{ color: "#495057" }}
//                   >
//                     {translations[language].gaon}
//                   </label>
//                   <Select
//                     classNamePrefix="react-select"
//                     options={selectOptions}
//                     value={
//                       selectedVillage
//                         ? {
//                             value: selectedVillage.id,
//                             label: selectedVillage.name,
//                           }
//                         : null
//                     }
//                     onChange={(option) => {
//                       const village = availableVillages.find(
//                         (v) => v.id === option?.value
//                       );
//                       setSelectedVillage(village || null);
//                       setIsMenuOpen(true);
//                     }}
//                     onMenuOpen={() => setIsMenuOpen(true)}
//                     onMenuClose={() => {
//                       if (!isFetchingMore) {
//                         setIsMenuOpen(false);
//                       }
//                     }}
//                     menuIsOpen={isMenuOpen}
//                     isDisabled={!selectedTaluka}
//                     isLoading={loading.villages && !availableVillages.length}
//                     components={{ MenuList }}
//                     placeholder={
//                       translations[language].selectVillage || "Select Village"
//                     }
//                     noOptionsMessage={() => translations[language].noVillages}
//                     styles={{
//                       menu: (provided) => ({
//                         ...provided,
//                         maxHeight: "200px",
//                         overflowY: "auto",
//                         zIndex: 1055,
//                         fontFamily: '"Poppins", sans-serif',
//                       }),
//                       control: (provided) => ({
//                         ...provided,
//                         fontSize: "1rem",
//                         borderColor: "#ced4da",
//                         boxShadow: "none",
//                         "&:hover": { borderColor: "#198754" },
//                       }),
//                       option: (provided) => ({
//                         ...provided,
//                         fontSize: "1rem",
//                         padding: "8px 12px",
//                       }),
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary btn-sm d-flex align-items-center"
//                   onClick={() => {
//                     setShowShetiModal(false);
//                     setIsMenuOpen(false);
//                     setNoVillagesAvailable(false);
//                   }}
//                   disabled={loading.submit || isSubmitting}
//                 >
//                   <FaTimes className="me-2" /> {translations[language].cancel}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-success btn-sm d-flex align-items-center"
//                   onClick={handleSubmitSheti}
//                   disabled={loading.submit || isSubmitting || !selectedVillage}
//                 >
//                   <FaSave className="me-2" />
//                   {isSubmitting
//                     ? translations[language].submitting
//                     : translations[language].submit}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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
// };

// export default Villages;

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./villages.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Api/axiosInstance";
import { FaSave, FaTimes, FaGlobe } from "react-icons/fa";
import Select, { components } from "react-select";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import Spinner from "../Spinner/Spinner";

const Villages = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Debounce utility function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Refs to track API calls and prevent duplicates
  const apiCalls = useRef({
    states: false,
    districts: false,
    talukas: false,
    villages: false,
  });

  const getStoredVillages = () => {
    const storedVillages = localStorage.getItem("villages");
    try {
      const parsedVillages = JSON.parse(storedVillages);
      return Array.isArray(parsedVillages)
        ? parsedVillages.filter(
            (village) => village && typeof village.village?.name === "string"
          )
        : [];
    } catch (error) {
      return [];
    }
  };

  const [villages, setVillages] = useState(getStoredVillages);
  const [serverVillages, setServerVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showShetiModal, setShowShetiModal] = useState(false);
  const [loading, setLoading] = useState({
    states: false,
    districts: false,
    talukas: false,
    villages: false, // Used for fetchVillagesForTaluka (react-select loading)
    submit: false,
  });
  const [fetchLoading, setFetchLoading] = useState(true); // Used for fetchInitialVillages (Spinner)
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [availableVillages, setAvailableVillages] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluka, setSelectedTaluka] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [villagePage, setVillagePage] = useState(1);
  const [hasMoreVillages, setHasMoreVillages] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [noVillagesAvailable, setNoVillagesAvailable] = useState(false);
  const recordsNumber = 10;

  const translations = useMemo(
    () => ({
      en: {
        title: "My Villages",
        addSheti: "Add Village",
        AllFarms: "All Farms",
        searchPlaceholder: "Search..",
        cancel: "Cancel",
        edit: "Edit",
        submitting: "submitting..",
        submit: "submit",
        update: "Update",
        state: "State",
        district: "District",
        taluka: "Taluka",
        gaon: "Village",
        loadMore: "Show More",
        loadingVillages: "Loading village...",
        noVillages: "No Villages Available",
        toast: {
          fetchStatesError: "Failed to fetch states",
          fetchDistrictsError: "Failed to fetch districts",
          fetchTalukasError: "Failed to fetch talukas",
          fetchVillagesError: "Failed to fetch villages",
          selectTalukaVillageError: "Please select both taluka and village",
          villageExistsError: "This village is already added",
          villageAddedSuccess: "Village added successfully!",
          villageAddError: "Failed to add village",
          timeoutError: "Request timed out. Please try again.",
          forbiddenError: "Access forbidden. Please check your permissions.",
        },
      },
      mr: {
        title: "माझी गावे",
        addSheti: "गावे जोडा",
        AllFarms: "सर्व शेत",
        searchPlaceholder: "शोधा..",
        cancel: "रद्द करा",
        edit: "संपादन",
        update: "अद्यतनित करा",
        state: "राज्य",
        district: "जिल्हा",
        taluka: "तालुका",
        submitting: "जतन करत आहे",
        submit: "जतन",
        gaon: "गाव",
        loadMore: "अधिक लोड करा",
        loadingVillages: "गावांची नावे लोड होत आहेत...",
        noVillages: "कोणतीही गावे उपलब्ध नाहीत",
        toast: {
          fetchStatesError: "राज्य आणण्यात अयशस्वी",
          fetchDistrictsError: "जिल्हे आणण्यात अयशस्वी",
          fetchTalukasError: "तालुके आणण्यात अयशस्वी",
          fetchVillagesError: "गावे आणण्यात अयशस्वी",
          selectTalukaVillageError: "कृपया तालुका आणि गाव दोन्ही निवडा",
          villageExistsError: "हे गाव आधीपासूनच जोडले गेले आहे",
          villageAddedSuccess: "गाव यशस्वीरित्या जोडले गेले!",
          villageAddError: "गाव जोडण्यात अयशस्वी",
          timeoutError: "विनंती वेळ संपली. कृपया पुन्हा प्रयत्न करा。",
          forbiddenError: "प्रवेश निषिद्ध. कृपया आपल्या परवानग्या तपासा。",
        },
      },
    }),
    [language]
  );

  const fetchWithRetry = async (
    url,
    options = {},
    retries = 3,
    delay = 2000
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await api.get(url, { ...options, timeout: 60000 });
        return response;
      } catch (err) {
        if (i === retries - 1) {
          if (err.response?.status === 403) {
            toast.error(translations[language].toast.forbiddenError);
          }
          throw err;
        }
        if (err.response?.status === 504 || err.code === "ECONNABORTED") {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw err;
      }
    }
  };

  const fetchStates = useCallback(async () => {
    if (apiCalls.current.states || states.length > 0) return; // Skip if already fetched
    apiCalls.current.states = true;
    console.log("Fetching states...");
    setLoading((prev) => ({ ...prev, states: true }));
    try {
      const response = await fetchWithRetry("/master_data/?action=getState");
      setStates(response.data.data || []);
    } catch (err) {
      toast.error(translations[language].toast.fetchStatesError);
    } finally {
      setLoading((prev) => ({ ...prev, states: false }));
      apiCalls.current.states = false;
    }
  }, [language, translations, states.length]);

  const fetchDistricts = useCallback(
    async (stateId) => {
      if (apiCalls.current.districts || districts.length > 0) return; // Skip if already fetched
      apiCalls.current.districts = true;
      console.log(`Fetching districts for state ${stateId}...`);
      setLoading((prev) => ({ ...prev, districts: true }));
      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getDistrict&state_id=${stateId}`
        );
        const filteredDistricts = response.data.data.filter(
          (district) => district.state?.id === stateId
        );
        setDistricts(filteredDistricts || []);
      } catch (err) {
        toast.error(translations[language].toast.fetchDistrictsError);
      } finally {
        setLoading((prev) => ({ ...prev, districts: false }));
        apiCalls.current.districts = false;
      }
    },
    [language, translations, districts.length]
  );

  const fetchTalukas = useCallback(
    async (districtId) => {
      if (apiCalls.current.talukas || talukas.length > 0) return; // Skip if already fetched
      apiCalls.current.talukas = true;
      console.log(`Fetching talukas for district ${districtId}...`);
      setLoading((prev) => ({ ...prev, talukas: true }));
      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getTaluka&district_id=${districtId}`
        );
        const filteredTalukas = response.data.data.filter(
          (taluka) => taluka.district?.id === districtId
        );
        setTalukas(filteredTalukas || []);
      } catch (err) {
        toast.error(translations[language].toast.fetchTalukasError);
      } finally {
        setLoading((prev) => ({ ...prev, talukas: false }));
        apiCalls.current.talukas = false;
      }
    },
    [language, translations, talukas.length]
  );

  const fetchVillagesForTaluka = useCallback(
    async (talukaId, page = 1, append = false) => {
      if (apiCalls.current.villages) return; // Skip if already fetching
      apiCalls.current.villages = true;
      console.log(`Fetching villages for taluka ${talukaId}, page ${page}...`);
      setLoading((prev) => ({ ...prev, villages: true }));
      if (append) {
        setIsFetchingMore(true);
      }

      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getVillage&taluka=${talukaId}&page=${page}&records_number=${recordsNumber}`
        );
        const villages = response.data.data.map((village) => ({
          id: village.id,
          name: village.name,
          taluka: village.taluka,
        }));
        setAvailableVillages((prev) => {
          const newVillages = append ? [...prev, ...villages] : villages;
          return [...newVillages];
        });
        setHasMoreVillages(villages.length === recordsNumber);
        setNoVillagesAvailable(villages.length === 0 && page === 1);
      } catch (err) {
        setNoVillagesAvailable(true);
      } finally {
        setLoading((prev) => ({ ...prev, villages: false }));
        setIsFetchingMore(false);
        apiCalls.current.villages = false;
      }
    },
    [language, translations, recordsNumber]
  );

  const fetchInitialVillages = useCallback(async () => {
    setFetchLoading(true);
    setLoading((prev) => ({ ...prev, submit: true }));
    console.log("Fetching initial villages...");
    try {
      const response = await fetchWithRetry("/farm/?action=getFarmVillage");
      if (response.data && Array.isArray(response.data.data)) {
        const validVillages = response.data.data.filter(
          (village) =>
            village &&
            typeof village.village?.name === "string" &&
            village.id &&
            village.village?.id
        );
        setServerVillages(validVillages);
        setVillages(validVillages);
        localStorage.setItem("villages", JSON.stringify(validVillages));
      } else {
        setServerVillages([]);
        setVillages([]);
        localStorage.setItem("villages", JSON.stringify([]));
      }
    } catch (err) {
      toast.error(
        err.response?.status === 403
          ? translations[language].toast.forbiddenError
          : "Failed to fetch initial villages."
      );
      setServerVillages([]);
      setVillages([]);
      localStorage.setItem("villages", JSON.stringify([]));
    } finally {
      setFetchLoading(false);
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  }, [language, translations]);

  useEffect(() => {
    if (serverVillages.length === 0) {
      fetchInitialVillages();
    } else {
      setFetchLoading(false);
    }
  }, [fetchInitialVillages, serverVillages.length]);

  useEffect(() => {
    if (showShetiModal && !apiCalls.current.states) {
      fetchStates();
    }
  }, [showShetiModal, fetchStates]);

  useEffect(() => {
    if (selectedState && !apiCalls.current.districts) {
      fetchDistricts(selectedState.id);
    }
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict(null);
      setTalukas([]);
      setSelectedTaluka(null);
      setAvailableVillages([]);
      setSelectedVillage(null);
      setVillagePage(1);
      setHasMoreVillages(true);
      setIsMenuOpen(false);
      setNoVillagesAvailable(false);
      apiCalls.current.districts = false;
      apiCalls.current.talukas = false;
      apiCalls.current.villages = false;
    }
  }, [selectedState, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrict && !apiCalls.current.talukas) {
      fetchTalukas(selectedDistrict.id);
    }
    if (!selectedDistrict) {
      setTalukas([]);
      setSelectedTaluka(null);
      setAvailableVillages([]);
      setSelectedVillage(null);
      setVillagePage(1);
      setHasMoreVillages(true);
      setIsMenuOpen(false);
      setNoVillagesAvailable(false);
      apiCalls.current.talukas = false;
      apiCalls.current.villages = false;
    }
  }, [selectedDistrict, fetchTalukas]);

  useEffect(() => {
    if (selectedTaluka && !apiCalls.current.villages) {
      setVillagePage(1);
      setHasMoreVillages(true);
      setAvailableVillages([]);
      setNoVillagesAvailable(false);
      fetchVillagesForTaluka(selectedTaluka.id, 1, false);
    }
    if (!selectedTaluka) {
      setAvailableVillages([]);
      setSelectedVillage(null);
      setVillagePage(1);
      setHasMoreVillages(true);
      setIsMenuOpen(false);
      setNoVillagesAvailable(false);
      apiCalls.current.villages = false;
    }
  }, [selectedTaluka, fetchVillagesForTaluka]);

  // Memoize select options
  const selectOptions = useMemo(
    () =>
      availableVillages.map((village) => ({
        value: village.id,
        label: village.name,
      })),
    [availableVillages]
  );

  // Debounced handleLoadMore
  const handleLoadMore = useMemo(
    () =>
      debounce(() => {
        if (hasMoreVillages && !isFetchingMore && selectedTaluka) {
          setIsMenuOpen(true);
          setVillagePage((prev) => {
            const nextPage = prev + 1;
            console.log("Loading page:", nextPage);
            fetchVillagesForTaluka(selectedTaluka.id, nextPage, true);
            return nextPage;
          });
        }
      }, 500),
    [hasMoreVillages, isFetchingMore, selectedTaluka, fetchVillagesForTaluka]
  );

  // Debounced onChange handlers
  const handleStateChange = useMemo(
    () =>
      debounce((stateId) => {
        const state = states.find((s) => s.id === stateId);
        setSelectedState(state || null);
        setSelectedDistrict(null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
        setIsMenuOpen(false);
        setNoVillagesAvailable(false);
      }, 300),
    [states]
  );

  const handleDistrictChange = useMemo(
    () =>
      debounce((districtId) => {
        const district = districts.find((d) => d.id === districtId);
        setSelectedDistrict(district || null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
        setIsMenuOpen(false);
        setNoVillagesAvailable(false);
      }, 300),
    [districts]
  );

  const handleTalukaChange = useMemo(
    () =>
      debounce((talukaId) => {
        const taluka = talukas.find((t) => t.id === talukaId);
        setSelectedTaluka(taluka || null);
        setSelectedVillage(null);
        setIsMenuOpen(false);
        setNoVillagesAvailable(false);
      }, 300),
    [talukas]
  );

  // Custom MenuList for Load More
  const MenuList = useCallback(
    (props) => {
      const { children } = props;

      return (
        <components.MenuList {...props}>
          {children}
          {noVillagesAvailable && !isFetchingMore ? (
            <div className="d-flex justify-content-center align-items-center p-2">
              <span className="text-muted">
                {translations[language].noVillages}
              </span>
            </div>
          ) : isFetchingMore ? (
            <div className="d-flex justify-content-center align-items-center p-2">
              <span className="text-muted">
                {translations[language].loadingVillages}
              </span>
            </div>
          ) : hasMoreVillages ? (
            <div className="d-flex justify-content-center">
              <button
                className="react-select__load-more-button btn btn-success btn-sm"
                onClick={handleLoadMore}
                disabled={isFetchingMore || !hasMoreVillages}
              >
                {translations[language].loadMore}
              </button>
            </div>
          ) : null}
        </components.MenuList>
      );
    },
    [
      translations,
      language,
      noVillagesAvailable,
      isFetchingMore,
      hasMoreVillages,
      handleLoadMore,
    ]
  );

  const handleSubmitSheti = async () => {
    if (!selectedTaluka || !selectedVillage) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: translations[language].toast.selectTalukaVillageError,
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    setIsSubmitting(true);
    setLoading((prev) => ({ ...prev, submit: true }));
    try {
      const existingVillage = serverVillages.find(
        (village) => village && village.village?.id === selectedVillage.id
      );

      if (existingVillage) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: translations[language].toast.villageExistsError,
          confirmButtonColor: "#dc3545",
        });
        return;
      }

      const payload = {
        action: "postFarmVillage",
        name: "",
        description: "",
        village: selectedVillage.id,
      };

      const response = await api.post("/farm/", payload, {
        timeout: 30000,
      });

      if (
        response.status === 200 ||
        response.data.success ||
        response.data.message === "Village Created!"
      ) {
        const newVillage = {
          id: response.data.data?.id || Date.now(),
          name: response.data.data?.name || "",
          description: response.data.data?.description || "",
          village: {
            id: selectedVillage.id,
            name: selectedVillage.name,
          },
          taluka: {
            id: selectedTaluka.id,
            name: selectedTaluka.name,
            district: selectedDistrict,
            state: selectedState,
          },
        };

        setVillages((prevVillages) => {
          const updated = [...prevVillages, newVillage];
          localStorage.setItem("villages", JSON.stringify(updated));
          return updated;
        });
        setServerVillages((prevServerVillages) => [
          ...prevServerVillages,
          newVillage,
        ]);

        Swal.fire({
          icon: "success",
          title: translations[language].toast.villageAddedSuccess,
          confirmButtonColor: "#28a745",
        });

        setShowShetiModal(false);
        setSelectedState(null);
        setSelectedDistrict(null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
        setVillagePage(1);
        setHasMoreVillages(true);
        setIsMenuOpen(false);
        setNoVillagesAvailable(false);
        apiCalls.current = { states: false, districts: false, talukas: false, villages: false };
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.status === 403
            ? translations[language].toast.forbiddenError
            : err.response?.data?.message ||
              translations[language].toast.villageAddError,
        confirmButtonColor: "#dc3545",
     } );
    } finally {
      setIsSubmitting(false);
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleVillageClick = (village) => {
    navigate(`/Admin/sheti/${village.id}`);
  };

  const filteredVillages = useMemo(
    () =>
      Array.isArray(serverVillages)
        ? serverVillages.filter(
            (village) =>
              village &&
              typeof village.village?.name === "string" &&
              village.village.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        : [],
    [serverVillages, searchQuery]
  );

  return (
    <div className="villages-container mb-5">
      <Header title={translations[language].title} icon={FaGlobe} />

      <div className="container">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
          <div className="input-group" style={{ flex: "1", width: "180px" }}>
            <input
              type="search"
              className="form-control rounded border-success"
              placeholder={translations[language].searchPlaceholder}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => setShowShetiModal(true)}
            disabled={loading.submit}
          >
            {translations[language].addSheti}
          </button>
          <button
            className="btn btn-success btn-sm fw-bold p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigate("/Admin/allfarms")}
            disabled={loading.submit}
          >
            {translations[language].AllFarms}
          </button>
        </div>
      </div>

      <div className="villages-grid gap-1">
        {fetchLoading && serverVillages.length === 0 ? (
          <div className="text-center mt-3">
            <Spinner />
          </div>
        ) : filteredVillages.length > 0 ? (
          filteredVillages.map((village) => (
            <div key={village.id} className="village-card">
              <span
                className="village-name"
                onClick={() => handleVillageClick(village)}
              >
                {village.village.name}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No Villages found</p>
        )}
      </div>

      {showShetiModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content"
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#198754",
                  borderBottom: "1px solid #dee2e6",
                  color: "white",
                }}
              >
                <h5
                  className="modal-title fw-bold ms-auto"
                  style={{ color: "white" }}
                >
                  {translations[language].addSheti}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowShetiModal(false);
                    setIsMenuOpen(false);
                    setNoVillagesAvailable(false);
                    apiCalls.current = { states: false, districts: false, talukas: false, villages: false };
                  }}
                  disabled={loading.submit || isSubmitting}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ padding: "20px" }}>
                <div className="mb-4">
                  <label
                    htmlFor="stateSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].state}
                  </label>
                  <select
                    id="stateSelect"
                    className="form-select"
                    value={selectedState ? selectedState.id : ""}
                    onChange={(e) => handleStateChange(parseInt(e.target.value, 10))}
                  >
                    <option value="">Select State</option>
                    {loading.states ? (
                      <option value="">Loading States...</option>
                    ) : (
                      states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="districtSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].district}
                  </label>
                  <select
                    id="districtSelect"
                    className="form-select"
                    disabled={!selectedState || loading.districts}
                    value={selectedDistrict ? selectedDistrict.id : ""}
                    onChange={(e) => handleDistrictChange(parseInt(e.target.value, 10))}
                  >
                    <option value="">Select District</option>
                    {loading.districts ? (
                      <option value="">Loading Districts...</option>
                    ) : districts.length > 0 ? (
                      districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Districts Available</option>
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="talukaSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].taluka}
                  </label>
                  <select
                    id="talukaSelect"
                    className="form-select"
                    disabled={!selectedDistrict || loading.talukas}
                    value={selectedTaluka ? selectedTaluka.id : ""}
                    onChange={(e) => handleTalukaChange(parseInt(e.target.value, 10))}
                  >
                    <option value="">Select Taluka</option>
                    {loading.talukas ? (
                      <option value="">Loading Talukas...</option>
                    ) : talukas.length > 0 ? (
                      talukas.map((taluka) => (
                        <option key={taluka.id} value={taluka.id}>
                          {taluka.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Talukas Available</option>
                    )}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="villageSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].gaon}
                  </label>
                  <Select
                    classNamePrefix="react-select"
                    options={selectOptions}
                    value={
                      selectedVillage
                        ? {
                            value: selectedVillage.id,
                            label: selectedVillage.name,
                          }
                        : null
                    }
                    onChange={(option) => {
                      const village = availableVillages.find(
                        (v) => v.id === option?.value
                      );
                      setSelectedVillage(village || null);
                      setIsMenuOpen(true);
                    }}
                    onMenuOpen={() => setIsMenuOpen(true)}
                    onMenuClose={() => {
                      if (!isFetchingMore) {
                        setIsMenuOpen(false);
                      }
                    }}
                    menuIsOpen={isMenuOpen}
                    isDisabled={!selectedTaluka}
                    isLoading={loading.villages && !availableVillages.length}
                    components={{ MenuList }}
                    placeholder={
                      translations[language].selectVillage || "Select Village"
                    }
                    noOptionsMessage={() => translations[language].noVillages}
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 1055,
                        fontFamily: '"Poppins", sans-serif',
                      }),
                      control: (provided) => ({
                        ...provided,
                        fontSize: "1rem",
                        borderColor: "#ced4da",
                        boxShadow: "none",
                        "&:hover": { borderColor: "#198754" },
                      }),
                      option: (provided) => ({
                        ...provided,
                        fontSize: "1rem",
                        padding: "8px 12px",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm d-flex align-items-center"
                  onClick={() => {
                    setShowShetiModal(false);
                    setIsMenuOpen(false);
                    setNoVillagesAvailable(false);
                    apiCalls.current = { states: false, districts: false, talukas: false, villages: false };
                  }}
                  disabled={loading.submit || isSubmitting}
                >
                  <FaTimes className="me-2" /> {translations[language].cancel}
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm d-flex align-items-center"
                  onClick={handleSubmitSheti}
                  disabled={loading.submit || isSubmitting || !selectedVillage}
                >
                  <FaSave className="me-2" />
                  {isSubmitting
                    ? translations[language].submitting
                    : translations[language].submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
};

export default Villages;