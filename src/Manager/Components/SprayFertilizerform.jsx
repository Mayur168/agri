// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import api from "../../Api/axiosInstance";
// import { FaEye, FaSprayCan, FaPlus } from "react-icons/fa";
// import ModalForm from "../../Admin/Components/ModelForm";
// import Spinner from "../../Admin/Spinner/Spinner";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useLanguage } from "../../contexts/LanguageContext";
// import Header from "../../Admin/Components/Header";
// import { translations } from "../../Admin/Components/translations";

// function SprayFertilizerForm() {
//   const { language } = useLanguage();
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     price: "",
//     manager_id: null, // Add manager_id to formData
//   });
//   const [isEditing, setIsEditing] = useState(true);
//   const [records, setRecords] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Retrieve storedData from localStorage
//   const storedData = JSON.parse(localStorage.getItem("storedData")) || {};
//   console.log("Stored Data from localStorage:", storedData);

//   // Extract manager_id from storedData.user
//   const defaultManagerId = storedData.user?.manager_id
//     ? Number(storedData.user.manager_id)
//     : null;
//   console.log("defaultManagerId:", defaultManagerId);

//   if (defaultManagerId === null) {
//     console.warn(
//       "No manager_id found in localStorage. Ensure login data is stored correctly."
//     );
//   }

//   // const translations = {
//   //   en: {
//   //     title: "Spray Fertilizer",
//   //     addRecord: "Fertilizer",
//   //     view: "View",
//   //     edit: "Edit",
//   //     save: "Save",
//   //     delete: "Delete",
//   //     close: "Close",
//   //     deleteConfirm: "You won't be able to revert this!",
//   //     fertilizerName: "Fertilizer Name",
//   //     price: "Price",
//   //     modalTitle: "Edit Fertilizer",
//   //     submit: "Save",
//   //     cancel: "Close",
//   //     searchPlaceholder: "Search..",
//   //     noRecords: "No records available",
//   //     noManagerWarning: "Please log in as a manager to view records.",
//   //   },
//   //   mr: {
//   //     title: "स्प्रे फवारणी",
//   //     addRecord: "खत",
//   //     view: "पहा",
//   //     edit: "संपादन",
//   //     save: "जतन करा",
//   //     delete: "हटवा",
//   //     close: "बंद करा",
//   //     deleteConfirm: "आपण हे परत करू शकणार नाही!",
//   //     fertilizerName: "खताचे नाव",
//   //     price: "किंमत",
//   //     modalTitle: "खत संपादन",
//   //     submit: "जतन करा",
//   //     cancel: "बंद करा",
//   //     searchPlaceholder: "शोधा..",
//   //     noRecords: "कोणतेही रेकॉर्ड उपलब्ध नाहीत",
//   //     noManagerWarning: "कृपया व्यवस्थापक म्हणून लॉग इन करा.",
//   //   },
//   // };

//   const labels = translations[language];

//   // Fetch records for the logged-in manager (GET)
//   const fetchRecords = async () => {
//     if (!defaultManagerId) {
//       setRecords([]);
//       setLoading(false);
//       Swal.fire({
//         icon: "warning",
//         title: language === "en" ? "Warning" : "सावधान",
//         text: labels.noManagerWarning,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.get(
//         `/master_data/?action=getfertilizer&manager=${defaultManagerId}`
//       );
//       console.log("API Response:", response.data);
//       const validRecords = Array.isArray(response.data.data)
//         ? response.data.data.filter(
//             (item) => item && typeof item.name === "string"
//           )
//         : [];
//       setRecords(validRecords);
//     } catch (error) {
//       Swal.fire(
//         language === "en" ? "Error" : "त्रुटी",
//         language === "en"
//           ? "Failed to fetch records"
//           : "रेकॉर्ड्स आणण्यात अयशस्वी",
//         "error"
//       );
//       console.error("Fetch error:", error.response || error);
//       setRecords([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new record (POST)
//   const handlePostRecord = async () => {
//     if (!defaultManagerId) {
//       Swal.fire({
//         icon: "error",
//         title: language === "en" ? "Error" : "त्रुटी",
//         text: labels.noManagerWarning,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.post(`/master_data/`, {
//         action: "postfertilizer",
//         name: formData.name,
//         price: parseFloat(formData.price),
//         manager_id: defaultManagerId, // Include manager_id in POST
//       });
//       const savedData = response.data.data;
//       setRecords([...records, savedData]);
//       resetForm();
//       Swal.fire(
//         language === "en" ? "Success" : "यशस्वी",
//         language === "en"
//           ? "Record added successfully"
//           : "रेकॉर्ड यशस्वीरित्या जोडले गेले",
//         "success"
//       );
//     } catch (error) {
//       Swal.fire(
//         language === "en" ? "Error" : "त्रुटी",
//         language === "en" ? "Failed to add record" : "रेकॉर्ड जोडण्यात अयशस्वी",
//         "error"
//       );
//       console.error("Post error:", error.response || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update existing record (PATCH)
//   const handlePatchRecord = async () => {
//     if (!defaultManagerId) {
//       Swal.fire({
//         icon: "error",
//         title: language === "en" ? "Error" : "त्रुटी",
//         text: labels.noManagerWarning,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.patch(`/master_data/`, {
//         action: "patchfertilizer",
//         id: formData.id,
//         name: formData.name,
//         price: parseFloat(formData.price),
//         manager_id: defaultManagerId, // Include manager_id in PATCH
//       });
//       const updatedData = response.data.data;
//       setRecords(
//         records.map((item) => (item.id === formData.id ? updatedData : item))
//       );
//       resetForm();
//       Swal.fire(
//         language === "en" ? "Success" : "यशस्वी",
//         language === "en"
//           ? "Record updated successfully"
//           : "रेकॉर्ड यशस्वीरित्या अद्यतनित केले गेले",
//         "success"
//       );
//     } catch (error) {
//       Swal.fire(
//         language === "en" ? "Error" : "त्रुटी",
//         language === "en"
//           ? "Failed to update record"
//           : "रेकॉर्ड अद्यतनित करण्यात अयशस्वी",
//         "error"
//       );
//       console.error("Patch error:", error.response || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete record (DELETE)
//   const handleDeleteRecord = async (id) => {
//     setLoading(true);
//     try {
//       await api.delete(`/master_data/`, {
//         data: { action: "deletefertilizer", id: id },
//       });
//       setRecords(records.filter((item) => item.id !== id));
//       setIsOpen(false);
//       Swal.fire(
//         language === "en" ? "Deleted!" : "हटवले!",
//         language === "en"
//           ? "Record has been deleted."
//           : "रेकॉर्ड हटवले गेले आहे.",
//         "success"
//       );
//     } catch (error) {
//       Swal.fire(
//         language === "en" ? "Error" : "त्रुटी",
//         language === "en"
//           ? "Failed to delete record"
//           : "रेकॉर्ड हटविण्यात अयशस्वी",
//         "error"
//       );
//       console.error("Delete error:", error.response || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, [defaultManagerId]); // Re-fetch if manager_id changes

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (formData.id) {
//       await handlePatchRecord();
//     } else {
//       await handlePostRecord();
//     }
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: language === "en" ? "Are you sure?" : "आपण खात्री आहात का?",
//       text: labels.deleteConfirm,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: language === "en" ? "Yes, delete it!" : "होय, हटवा!",
//       cancelButtonText: language === "en" ? "Cancel" : "रद्द करा",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         await handleDeleteRecord(id);
//       }
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       id: null,
//       name: "",
//       price: "",
//       manager_id: defaultManagerId,
//     });
//     setIsOpen(false);
//     setIsEditing(true);
//   };

//   const handleEdit = (item) => {
//     setFormData({ ...item, manager_id: defaultManagerId });
//     setIsEditing(true);
//     setIsOpen(true);
//   };

//   const handleView = (item) => {
//     setFormData({ ...item, manager_id: defaultManagerId });
//     setIsEditing(false);
//     setIsOpen(true);
//   };

//   const handleAdd = () => {
//     setFormData({
//       id: null,
//       name: "",
//       price: "",
//       manager_id: defaultManagerId,
//     });
//     setIsEditing(true);
//     setIsOpen(true);
//   };

//   // Filter records based on search query
//   const filteredRecords = records.filter((item) => {
//     if (!item || !item.name || typeof item.name !== "string") return false;
//     return item.name.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="managers-container mb-5">
//       {/* Header */}
//       <Header title={translations[language].spreyfertilizertitle} icon={FaSprayCan} />

//       <div className="container">
//         {/* Search Box and Add Button in Same Line with 50%/50% Split */}
//         <div className="d-flex align-items-center mb-3">
//           <input
//             type="text"
//             className="form-control shadow-sm rounded-3 px-3 py-2 me-2 border-success"
//             placeholder={labels.searchPlaceholder}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ width: "50%" }}
//           />
//           <button
//             className="btn btn-success fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm"
//             onClick={handleAdd}
//             disabled={loading || !defaultManagerId} // Disable if no manager_id
//             style={{ width: "50%" }}
//           >
//             <FaPlus className="me-1" /> {labels.addRecord}
//           </button>
//         </div>

//         {/* Records Grid with Spinner */}
//         <div className="managers-grid">
//           {loading ? (
//             <div className="text-center m-auto">
//               <Spinner />
//             </div>
//           ) : Array.isArray(filteredRecords) && filteredRecords.length > 0 ? (
//             filteredRecords.map((item) => (
//               <div
//                 key={item.id}
//                 className="manager-card d-flex justify-content-between align-items-center flex-wrap shadow-sm p-3 rounded-3 bg-light"
//               >
//                 <span className="manager-name fw-medium">
//                   {item.name} - ₹{item.price}
//                 </span>
//                 <div className="manager-actions">
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-link p-0"
//                       type="button"
//                       id={`dropdownMenuButton-${item.id}`}
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       disabled={loading}
//                     >
//                       <FaEye className="eye-icon fs-5" />
//                     </button>
//                     <div
//                       className="dropdown-menu dropdown-menu-end"
//                       aria-labelledby={`dropdownMenuButton-${item.id}`}
//                     >
//                       <button
//                         className="dropdown-item btn btn-info btn-sm"
//                         onClick={() => handleView(item)}
//                         disabled={loading}
//                       >
//                         {labels.view}
//                       </button>
//                       <button
//                         className="dropdown-item btn btn-primary btn-sm"
//                         onClick={() => handleEdit(item)}
//                         disabled={loading}
//                       >
//                         {labels.edit}
//                       </button>
//                       <button
//                         className="dropdown-item btn btn-danger btn-sm"
//                         onClick={() => handleDelete(item.id)}
//                         disabled={loading}
//                       >
//                         {labels.delete}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted mx-auto py-4">
//               {labels.noRecords}
//             </p>
//           )}
//         </div>

//         {/* ModalForm */}
//         <ModalForm
//           isOpen={isOpen}
//           onClose={resetForm}
//           isEditing={isEditing}
//           formData={formData}
//           labels={translations}
//           handleChange={handleChange}
//           handleSave={handleSave}
//           handleDelete={handleDelete}
//           language={language}
//           formType="fertilizer"
//         />
//       </div>
//     </div>
//   );
// }

// export default SprayFertilizerForm;
