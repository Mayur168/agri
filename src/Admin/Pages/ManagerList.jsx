// // export default ManagersList;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserTie, FaPlus, FaEye } from "react-icons/fa";
// import "./villages.css";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../Spinner/Spinner";
// import ModalForm from "../../Admin/Components/ModelForm";
// import api from "../../Api/axiosInstance";
// import Swal from "sweetalert2";
// import Header from "../Components/Header";

// const ManagersList = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage();

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const [isSuperFarmer, setIsSuperFarmer] = useState(
//     user.is_super_farmer || false
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const recordsPerPage = 10;
//   const [activeButton, setActiveButton] = useState("managers");

//   const translations = {
//     en: {
//       title: isSuperFarmer ? "Admins List" : "Managers List",
//       viewAdmin: "Admin",
//       viewManager: "Manager",
//       addManager: "Add",
//       addAdmin: "Add New Admin",
//       editManagerTitle: "Edit Manager",
//       editAdminTitle: "Edit Admin",
//       searchPlaceholder: "Search..",
//       modalTitle: "Add New Manager",
//       firstName: "First Name",
//       lastName: "Last Name",
//       email: "Email",
//       phone: "Phone Number",
//       password: "Password",
//       confirmPassword: "Confirm Password",
//       role: "Role",
//       farmName: "Farm Name",
//       farmLocation: "Farm Location",
//       farmSize: "Farm Size (acres)",
//       managerExperience: "Manager Experience (years)",
//       submit: "Submit",
//       cancel: "Cancel",
//       edit: "Edit",
//       delete: "Delete",
//       manager: "Manager",
//       admin: "Admin",
//       previous: "Previous",
//       next: "Next",
//       toast: {
//         fetchError: "",
//         unauthorized: "Unauthorized: Please log in again.",
//         requiredFields: "First name and phone number are required.",
//         passwordRequired: "Password is required to register the manager.",
//         passwordsMismatch: "Passwords do not match.",
//         managerAddedSuccess: "Manager added successfully!",
//         adminAddedSuccess: "Admin added successfully!",
//         phoneInUse: "Phone number already in use.",
//         addManagerError: "Failed to add manager",
//         phoneRequired: "Phone number is required.",
//         noChanges: "No changes detected.",
//         emailInUse: "This email address is already in use by another user.",
//         updateManagerError: "Failed to update manager",
//         managerUpdatedSuccess: "Updated successfully!",
//       },
//     },
//     mr: {
//       title: isSuperFarmer ? "प्रशासक यादी" : "व्यवस्थापक यादी",
//       viewAdmin: "प्रशासक",
//       viewManager: "व्यवस्थापक",
//       addManager: "जोडा",
//       addAdmin: "नवीन प्रशासक जोडा",
//       editManagerTitle: "व्यवस्थापक संपादन करा",
//       editAdminTitle: "प्रशासक संपादन करा",
//       searchPlaceholder: "शोधा..",
//       modalTitle: "नवीन व्यवस्थापक जोडा",
//       firstName: "प्रथम नाव",
//       lastName: "आडनाव",
//       email: "ईमेल",
//       phone: "फोन नंबर",
//       password: "पासवर्ड",
//       confirmPassword: "पासवर्ड पुष्टीकरण",
//       role: "भूमिका",
//       farmName: "शेताचे नाव",
//       farmLocation: "शेताचे स्थान",
//       farmSize: "शेताचा आकार (एकर्स)",
//       managerExperience: "व्यवस्थापकाचा अनुभव (वर्षे)",
//       submit: "सबमिट करा",
//       cancel: "रद्द करा",
//       edit: "संपादन",
//       delete: "हटवा",
//       manager: "व्यवस्थापक",
//       admin: "प्रशासक",
//       previous: "मागील",
//       next: "पुढील",
//       toast: {
//         fetchError: "",
//         unauthorized: "अनधिकृत: कृपया पुन्हा लॉग इन करा.",
//         requiredFields: "प्रथम नाव आणि फोन नंबर आवश्यक आहेत.",
//         passwordRequired: "व्यवस्थापक नोंदणीसाठी पासवर्ड आवश्यक आहे.",
//         passwordsMismatch: "पासवर्ड जुळत नाहीत.",
//         managerAddedSuccess: "व्यवस्थापक यशस्वीरित्या जोडले गेले!",
//         adminAddedSuccess: "प्रशासक यशस्वीरित्या जोडले गेले!",
//         phoneInUse: "फोन नंबर आधीपासून वापरात आहे.",
//         addManagerError: "व्यवस्थापक जोडण्यात अयशस्वी.",
//         phoneRequired: "फोन नंबर आवश्यक आहे.",
//         noChanges: "कोणतेही बदल आढळले नाहीत.",
//         emailInUse:
//           "हा ईमेल पत्ता आधीपासून दुसऱ्या वापरकर्त्याद्वारे वापरात आहे.",
//         updateManagerError: "व्यवस्थापक अद्यतनित करण्यात अयशस्वी.",
//         managerUpdatedSuccess: "यशस्वीरित्या अद्यतनित केले गेले!",
//       },
//     },
//   };

//   const [managers, setManagers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [viewMode, setViewMode] = useState("managers");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [isViewingEditing, setIsViewingEditing] = useState(false);
//   const [editAdminId, setEditAdminId] = useState(null);
//   const [editManagerId, setEditManagerId] = useState(null);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: "",
//     role: "Manager",
//     farm_name: "",
//     farm_location: "",
//     farm_size: "",
//     manager_experience: "",
//   });
//   const [initialFormData, setInitialFormData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);

//   useEffect(() => {
//     localStorage.setItem("is_super_farmer", JSON.stringify(isSuperFarmer));

//     const fetchManagers = async (page = 1) => {
//       setFetchLoading(true);
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const Id = user?.id;

//         let managerData = [];
//         if (isSuperFarmer) {
//           const response = await api.get(
//             `/users/?action=getFarmManager&user_created=${Id}&page=${page}&records_number=${recordsPerPage}`
//           );
//           managerData = Array.isArray(response.data.data)
//             ? response.data.data
//             : [];
//           const totalCount = response.data.total_count || managerData.length;
//           setTotalPages(Math.ceil(totalCount / recordsPerPage) || 1);
//           setHasMore(
//             managerData.length === recordsPerPage &&
//               page < Math.ceil(totalCount / recordsPerPage)
//           );
//         } else {
//           const response = await api.get(
//             `/users/?action=getFarmManager&user_created=${Id}&page=${page}&records_number=${recordsPerPage}`
//           );
//           managerData = Array.isArray(response.data.data)
//             ? response.data.data
//             : [];
//           const totalCount = response.data.total_count || managerData.length;
//           setTotalPages(Math.ceil(totalCount / recordsPerPage) || 1);
//           setHasMore(
//             managerData.length === recordsPerPage &&
//               page < Math.ceil(totalCount / recordsPerPage)
//           );
//         }

//         setManagers(managerData);
//         localStorage.setItem("managers", JSON.stringify(managerData));
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } catch (err) {
//         toast.error(
//           err.response?.status === 401
//             ? translations[language].toast.unauthorized
//             : translations[language].toast.fetchError
//         );
//         if (err.response?.status === 401) navigate("/login");
//         setManagers([]);
//         localStorage.setItem("managers", JSON.stringify([]));
//         setHasMore(false);
//         setTotalPages(1);
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     if (viewMode === "managers") {
//       fetchManagers(currentPage);
//     }
//   }, [isSuperFarmer, language, navigate, currentPage, viewMode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddManager = async (e) => {
//     e.preventDefault();

//     if (!formData.phone.trim() || !formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title:
//           translations[language].toast.requiredFields ||
//           "Please fill all required fields",
//         text:
//           language === "en"
//             ? "First name and phone number are required."
//             : "प्रथम नाव आणि फोन नंबर आवश्यक आहेत.",
//       });
//       return;
//     }

//     const phoneRegex = /^\d+$/;
//     if (!phoneRegex.test(formData.phone.trim())) {
//       Swal.fire({
//         icon: "error",
//         title:
//           translations[language].toast.invalidPhoneFormat ||
//           "Invalid phone number",
//         text:
//           language === "en"
//             ? "Phone number must contain only digits."
//             : "फोन नंबरमध्ये फक्त अंक असावेत.",
//       });
//       return;
//     }

//     if (formData.phone.trim().length !== 10) {
//       Swal.fire({
//         icon: "error",
//         title:
//           translations[language].toast.invalidPhoneLength ||
//           "Invalid phone number length",
//         text:
//           language === "en"
//             ? "Phone number must be exactly 10 digits."
//             : "फोन नंबर नेमके १० अंकांचा असावा.",
//       });
//       return;
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title:
//           translations[language].toast.passwordRequired ||
//           "Password is required",
//         text:
//           language === "en"
//             ? "Please enter a valid password."
//             : "कृपया वैध पासवर्ड प्रविष्ट करा.",
//       });
//       return;
//     }

//     if (formData.password.trim() !== formData.confirm_password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title:
//           translations[language].toast.passwordsMismatch ||
//           "Passwords do not match",
//         text:
//           language === "en"
//             ? "The password and confirm password fields must match."
//             : "पासवर्ड आणि पुष्टीकरण पासवर्ड फील्ड जुळले पाहिजेत.",
//       });
//       return;
//     }

//     const confirmResult = await Swal.fire({
//       title: language === "en" ? "Are you sure?" : "तुम्हाला खात्री आहे?",
//       text:
//         language === "en"
//           ? "Do you want to add this manager?"
//           : "तुम्ही हा व्यवस्थापक जोडू इच्छिता?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: language === "en" ? "Yes, add it!" : "होय, जोडा!",
//       cancelButtonText: language === "en" ? "No, cancel!" : "नाही, रद्द करा!",
//     });

//     if (!confirmResult.isConfirmed) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: No token found.");

//       let newUser;
//       if (formData.role === "Manager") {
//         const managerPayload = {
//           action: "postFarmManager",
//           user: {
//             first_name: formData.first_name.trim(),
//             last_name: formData.last_name.trim(),
//             email: formData.email.trim(),
//             phone: formData.phone.trim(),
//             password: formData.password.trim(),
//             confirm_password: formData.confirm_password.trim(),
//             is_admin: false,
//             is_manager: true,
//           },
//           farm_name: formData.farm_name.trim(),
//           farm_location: formData.farm_location.trim(),
//           manager_experience: parseInt(formData.manager_experience) || 0,
//         };

//         const managerResponse = await api.post("/users/", managerPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         newUser = managerResponse.data.data;
//       } else {
//         const userPayload = {
//           action: "postFarmer",
//           user: {
//             first_name: formData.first_name.trim(),
//             last_name: formData.last_name.trim(),
//             email: formData.email.trim(),
//             phone: formData.phone.trim(),
//             password: formData.password.trim(),
//             confirm_password: formData.confirm_password.trim(),
//             is_admin: true,
//             is_manager: false,
//           },
//           farm_name: formData.farm_name.trim() || "",
//           farm_location: formData.farm_location.trim() || "",
//           farm_size: formData.farm_size.trim()
//             ? parseInt(formData.farm_size)
//             : 0,
//         };

//         const userResponse = await api.post("/users/", userPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         newUser = userResponse.data.data;
//       }

//       if (formData.role === "Manager") {
//         const updatedManagers = [newUser, ...managers];
//         setManagers(updatedManagers);
//         localStorage.setItem("managers", JSON.stringify(updatedManagers));
//       } else {
//         const updatedAdmins = [newUser, ...admins];
//         setAdmins(updatedAdmins);
//         localStorage.setItem("admins", JSON.stringify(updatedAdmins));
//         if (viewMode === "admins") {
//           await handleViewAdmin();
//         }
//       }

//       Swal.fire({
//         icon: "success",
//         title:
//           formData.role === "Manager"
//             ? translations[language].toast.managerAddedSuccess ||
//               "Manager added successfully!"
//             : translations[language].toast.adminAddedSuccess ||
//               "Admin added successfully!",
//         showConfirmButton: false,
//         timer: 2000,
//       });

//       setShowModal(false);
//       setFormData({
//         first_name: "",
//         last_name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirm_password: "",
//         role: "Manager",
//         farm_name: "",
//         farm_location: "",
//         farm_size: "",
//         manager_experience: "",
//       });
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.error_msg?.toLowerCase() ||
//         err.response?.data?.message?.toLowerCase() ||
//         "";
//       if (errorMsg.includes("user_email_key")) {
//         Swal.fire({
//           icon: "error",
//           title:
//             language === "en"
//               ? "Email already exists"
//               : translations[language].toast.emailExists ||
//                 "ईमेल आधीपासून अस्तित्वात आहे",
//           text:
//             language === "en"
//               ? "Please use a different email address."
//               : "कृपया वेगळा ईमेल पत्ता वापरा.",
//         });
//       } else if (errorMsg.includes("user_phone_key")) {
//         Swal.fire({
//           icon: "error",
//           title:
//             language === "en"
//               ? "Phone number already exists"
//               : translations[language].toast.phoneExists ||
//                 "फोन नंबर आधीपासून वापरात आहे",
//           text:
//             language === "en"
//               ? "Please use a different phone number."
//               : "कृपया वेगळा फोन नंबर वापरा.",
//         });
//       } else if (errorMsg.includes("password")) {
//         Swal.fire({
//           icon: "error",
//           title:
//             language === "en"
//               ? "Invalid password"
//               : translations[language].toast.invalidPassword || "अवैध पासवर्ड",
//           text:
//             language === "en"
//               ? "Please ensure the password meets the requirements."
//               : "कृपया पासवर्ड आवश्यकता पूर्ण करते याची खात्री करा.",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title:
//             language === "en"
//               ? err.response?.data?.message || "Failed to add manager"
//               : err.response?.data?.message ||
//                 translations[language].toast.addManagerError ||
//                 "व्यवस्थापक जोडण्यात अयशस्वी",
//           text:
//             formData.role !== "Manager"
//               ? language === "en"
//                 ? "You are not a super farmer."
//                 : "तुम्ही सुपर शेतकरी नाही."
//               : language === "en"
//               ? "An error occurred while adding the manager."
//               : "व्यवस्थापक जोडताना त्रुटी आली.",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewAdmin = async () => {
//     setFetchLoading(true);
//     setViewMode("admins");
//     setActiveButton("admins");
//     setCurrentPage(1);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user?.farmer_id) {
//         throw new Error("Farmer ID not found in localStorage");
//       }
//       const farmerId = user.farmer_id;
//       const response = await api.get(
//         `/users/?action=getFarmer&id=${farmerId}&page=${currentPage}&records_number=${recordsPerPage}`
//       );

//       const adminData = Array.isArray(response.data.data)
//         ? response.data.data
//         : [response.data.data];
//       const normalizedAdmins = adminData.map((admin) => ({
//         id: admin.id,
//         first_name: admin.user?.first_name || admin.first_name || "",
//         last_name: admin.user?.last_name || admin.last_name || "",
//         email: admin.user?.email || admin.email || "",
//         phone: admin.user?.phone || admin.phone || "",
//         farm_name: admin.farm_name || "",
//         farm_location: admin.farm_location || "",
//         farm_size: admin.farm_size || "",
//         password: admin.password || "",
//         is_admin: admin.is_admin || true,
//         is_manager: admin.is_manager || false,
//         is_super_farmer: admin.is_super_farmer || false,
//         sub_farmers: (admin.sub_farmers || []).map((subFarmer) => ({
//           id: subFarmer.id,
//           first_name: subFarmer.user?.first_name || subFarmer.first_name || "",
//           last_name: subFarmer.user?.last_name || subFarmer.last_name || "",
//           email: subFarmer.user?.email || subFarmer.email || "",
//           phone: subFarmer.user?.phone || subFarmer.phone || "",
//           farm_name: subFarmer.farm_name || "",
//           farm_location: subFarmer.farm_location || "",
//           farm_size: subFarmer.farm_size || "",
//           password: subFarmer.password || "",
//           is_admin: true,
//         })),
//       }));

//       setAdmins(normalizedAdmins);
//       localStorage.setItem("admins", JSON.stringify(normalizedAdmins));
//       const totalCount = response.data.total_count || normalizedAdmins.length;
//       setTotalPages(Math.ceil(totalCount / recordsPerPage) || 1);
//       setHasMore(
//         normalizedAdmins.length === recordsPerPage &&
//           currentPage < Math.ceil(totalCount / recordsPerPage)
//       );

//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       toast.error(
//         err.response?.status === 401
//           ? translations[language].toast.unauthorized
//           : translations[language].toast.fetchError
//       );
//       if (err.response?.status === 401) navigate("/login");
//       setAdmins([]);
//       localStorage.setItem("admins", JSON.stringify([]));
//       setHasMore(false);
//       setTotalPages(1);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleViewManagers = async () => {
//     setFetchLoading(true);
//     setViewMode("managers");
//     setActiveButton("managers");
//     setCurrentPage(1);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user?.id) {
//         throw new Error("User ID not found in localStorage");
//       }
//       const Id = user.id;

//       const response = await api.get(
//         `/users/?action=getFarmManager&user_created=${Id}&page=${currentPage}&records_number=${recordsPerPage}`
//       );
//       const managerData = Array.isArray(response.data.data)
//         ? response.data.data
//         : [];

//       setManagers(managerData);
//       localStorage.setItem("managers", JSON.stringify(managerData));
//       const totalCount = response.data.total_count || managerData.length;
//       setTotalPages(Math.ceil(totalCount / recordsPerPage) || 1);
//       setHasMore(
//         managerData.length === recordsPerPage &&
//           currentPage < Math.ceil(totalCount / recordsPerPage)
//       );

//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       toast.error(
//         err.response?.status === 401
//           ? translations[language].toast.unauthorized
//           : translations[language].toast.fetchError
//       );
//       if (err.response?.status === 401) navigate("/login");
//       setManagers([]);
//       localStorage.setItem("managers", JSON.stringify([]));
//       setHasMore(false);
//       setTotalPages(1);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleEditManager = (manager) => {
//     const role =
//       manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
//         ? "Admin"
//         : "Manager";
//     const initialData = {
//       id: manager.id,
//       first_name: manager.user?.first_name || manager.first_name || "",
//       last_name: manager.user?.last_name || manager.last_name || "",
//       email: manager.user?.email || manager.email || "",
//       phone: manager.user?.phone || manager.phone || "",
//       password: manager.password || "",
//       confirm_password: manager.password || "",
//       role: role,
//       farm_name: manager.farm_name || "",
//       farm_location: manager.farm_location || "",
//       farm_size: role === "Admin" ? manager.farm_size || "" : "",
//       manager_experience: manager.manager_experience || "",
//     };

//     if (role === "Admin") {
//       setEditAdminId(manager.id);
//       setEditManagerId(null);
//     } else {
//       setEditManagerId(manager.id);
//       setEditAdminId(null);
//     }

//     setFormData(initialData);
//     setInitialFormData(initialData);
//     setShowEditModal(true);
//     setShowViewModal(false);
//     setIsViewingEditing(true);
//   };

//   const handleViewManager = (manager) => {
//     const role =
//       manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
//         ? "Admin"
//         : "Manager";
//     const initialData = {
//       id: manager.id,
//       first_name: manager.user?.first_name || manager.first_name || "",
//       last_name: manager.user?.last_name || manager.last_name || "",
//       email: manager.user?.email || manager.email || "",
//       phone: manager.user?.phone || manager.phone || "",
//       password: manager.password || "",
//       confirm_password: manager.password || "",
//       role: role,
//       farm_name: manager.farm_name || "",
//       farm_location: manager.farm_location || "",
//       farm_size: role === "Admin" ? manager.farm_size || "" : "",
//       manager_experience: manager.manager_experience || "",
//     };

//     setFormData(initialData);
//     setInitialFormData(initialData);

//     if (role === "Admin") {
//       setEditAdminId(manager.id);
//       setEditManagerId(null);
//     } else {
//       setEditManagerId(manager.id);
//       setEditAdminId(null);
//     }

//     setIsViewingEditing(false);
//     setShowViewModal(true);
//     setShowEditModal(false);
//   };

//   const handleUpdateManager = async (e) => {
//     e.preventDefault();

//     if (!formData.phone.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.phoneRequired,
//       });
//       return;
//     }

//     if (!initialFormData) {
//       Swal.fire({
//         icon: "error",
//         title: "Error: Initial data not set. Please try again.",
//       });
//       setLoading(false);
//       return;
//     }

//     const confirmResult = await Swal.fire({
//       title: language === "en" ? "Are you sure?" : "तुम्हाला खात्री आहे?",
//       text:
//         language === "en"
//           ? `Do you want to update this ${formData.role.toLowerCase()}?`
//           : `तुम्ही हा ${
//               formData.role === "Manager" ? "व्यवस्थापक" : "प्रशासक"
//             } अपडेट करू इच्छिता?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: language === "en" ? "Yes, update!" : "होय, अपडेट करा!",
//       cancelButtonText: language === "en" ? "No, cancel!" : "नाही, रद्द करा!",
//     });

//     if (!confirmResult.isConfirmed) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         throw new Error("Unauthorized: No token found.");
//       }

//       let changedPayload;
//       let hasChanges = false;
//       const entityId =
//         formData.role === "Manager" ? editManagerId : editAdminId;

//       if (!entityId) {
//         throw new Error(`No valid ID found for ${formData.role}`);
//       }

//       if (formData.role === "Manager") {
//         changedPayload = { id: entityId, action: "patchFarmManager" };
//         if (formData.first_name.trim() !== initialFormData.first_name) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.first_name = formData.first_name.trim();
//           hasChanges = true;
//         }
//         if (formData.last_name.trim() !== initialFormData.last_name) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.last_name = formData.last_name.trim();
//           hasChanges = true;
//         }
//         if (formData.email.trim() !== initialFormData.email) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.email = formData.email.trim();
//           hasChanges = true;
//         }
//         if (formData.phone.trim() !== initialFormData.phone) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.phone = formData.phone.trim();
//           hasChanges = true;
//         }
//         if (formData.farm_name.trim() !== initialFormData.farm_name) {
//           changedPayload.farm_name = formData.farm_name.trim() || null;
//           hasChanges = true;
//         }
//         if (formData.farm_location.trim() !== initialFormData.farm_location) {
//           changedPayload.farm_location = formData.farm_location.trim() || null;
//           hasChanges = true;
//         }
//         if (
//           parseInt(formData.manager_experience) !==
//           parseInt(initialFormData.manager_experience)
//         ) {
//           changedPayload.manager_experience =
//             parseInt(formData.manager_experience) || 0;
//           hasChanges = true;
//         }
//       } else {
//         changedPayload = { id: entityId, action: "patchFarmer" };
//         if (
//           formData.first_name.trim() !== initialFormData.first_name ||
//           formData.last_name.trim() !== initialFormData.last_name ||
//           formData.email.trim() !== initialFormData.email ||
//           formData.phone.trim() !== initialFormData.phone
//         ) {
//           changedPayload.user = {};
//           if (formData.first_name.trim() !== initialFormData.first_name) {
//             changedPayload.user.first_name = formData.first_name.trim();
//             hasChanges = true;
//           }
//           if (formData.last_name.trim() !== initialFormData.last_name) {
//             changedPayload.user.last_name = formData.last_name.trim();
//             hasChanges = true;
//           }
//           if (formData.email.trim() !== initialFormData.email) {
//             changedPayload.user.email = formData.email.trim();
//             hasChanges = true;
//           }
//           if (formData.phone.trim() !== initialFormData.phone) {
//             changedPayload.user.phone = formData.phone.trim();
//             hasChanges = true;
//           }
//         }
//         if (formData.farm_name.trim() !== initialFormData.farm_name) {
//           changedPayload.farm_name = formData.farm_name.trim() || "";
//           hasChanges = true;
//         }
//         if (formData.farm_location.trim() !== initialFormData.farm_location) {
//           changedPayload.farm_location = formData.farm_location.trim() || "";
//           hasChanges = true;
//         }
//         if (formData.farm_size.trim() !== initialFormData.farm_size) {
//           changedPayload.farm_size = formData.farm_size.trim()
//             ? parseInt(formData.farm_size)
//             : 0;
//           hasChanges = true;
//         }
//       }

//       if (!hasChanges) {
//         Swal.fire({
//           icon: "info",
//           title: translations[language].toast.noChanges,
//         });
//         setShowEditModal(false);
//         setShowViewModal(false);
//         setLoading(false);
//         return;
//       }

//       const response = await api.patch("/users/", changedPayload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updatedEntity = response.data.data;

//       if (formData.role === "Manager") {
//         const updatedManagers = managers.map((m) =>
//           m.id === entityId ? { ...m, ...updatedEntity } : m
//         );
//         setManagers(updatedManagers);
//         localStorage.setItem("managers", JSON.stringify(updatedManagers));
//       } else {
//         setViewMode("admins");
//         await handleViewAdmin();
//       }

//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.managerUpdatedSuccess,
//         showConfirmButton: false,
//         timer: 2000,
//       });

//       setShowEditModal(false);
//       setShowViewModal(false);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title:
//           err.response?.data?.message ||
//           translations[language].toast.updateManagerError,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteManager = async (managerId) => {
//     const result = await Swal.fire({
//       title: `${translations[language].delete} ${formData.role}`,
//       text:
//         language === "en"
//           ? `Are you sure you want to delete this ${formData.role.toLowerCase()}? This action cannot be undone.`
//           : `आपण खात्रीने हे ${
//               formData.role === "Manager" ? "व्यवस्थापक" : "प्रशासक"
//             } हटवू इच्छिता का? ही क्रिया परत करता येणार नाही.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: translations[language].delete,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (!result.isConfirmed) return;

//     setLoading(true);

//     // Optimistic UI update
//     let previousManagers = null;
//     let previousAdmins = null;
//     if (formData.role === "Manager") {
//       previousManagers = [...managers];
//       setManagers(managers.filter((m) => m.id !== managerId));
//       localStorage.setItem(
//         "managers",
//         JSON.stringify(managers.filter((m) => m.id !== managerId))
//       );
//     } else {
//       previousAdmins = [...admins];
//       setAdmins(admins.filter((a) => a.id !== managerId));
//       localStorage.setItem(
//         "admins",
//         JSON.stringify(admins.filter((a) => a.id !== managerId))
//       );
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: No token found.");

//       const deletePayload = {
//         action: formData.role === "Manager" ? "delFarmManager" : "delFarmer",
//         id: managerId,
//         role: formData.role === "Manager" ? undefined : "farmer",
//       };

//       const response = await api.delete("/users/", {
//         data: deletePayload,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200 || response.status === 204) {
//         if (
//           formData.role !== "Manager" &&
//           admins.length === 1 &&
//           currentPage > 1
//         ) {
//           setCurrentPage(currentPage - 1);
//         }

//         await Swal.fire({
//           title: language === "en" ? "Deleted!" : "हटवले!",
//           text:
//             language === "en"
//               ? `${formData.role} has been deleted successfully.`
//               : `${
//                   formData.role === "Manager" ? "व्यवस्थापक" : "प्रशासक"
//                 } यशस्वीरित्या हटवले गेले आहे.`,
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         // Reset form data and modal states
//         setFormData({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirm_password: "",
//           role: "Manager",
//           farm_name: "",
//           farm_location: "",
//           farm_size: "",
//           manager_experience: "",
//         });
//         setInitialFormData(null);
//         setEditManagerId(null);
//         setEditAdminId(null);
//         setShowViewModal(false);
//         setShowEditModal(false);
//         setIsViewingEditing(false);

//         // Refresh admins only if in admin view mode
//         if (formData.role !== "Manager" && viewMode === "admins") {
//           await handleViewAdmin();
//         }
//       } else {
//         throw new Error("Unexpected response status: " + response.status);
//       }
//     } catch (err) {
//       // Revert optimistic update
//       if (formData.role === "Manager" && previousManagers) {
//         setManagers(previousManagers);
//         localStorage.setItem("managers", JSON.stringify(previousManagers));
//       } else if (previousAdmins) {
//         setAdmins(previousAdmins);
//         localStorage.setItem("admins", JSON.stringify(previousAdmins));
//       }

//       console.error("API Error (Delete Manager):", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });

//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.error_msg ||
//         (language === "en"
//           ? `Failed to delete ${formData.role.toLowerCase()}. Please try again or contact support.`
//           : `${
//               formData.role === "Manager" ? "व्यवस्थापक" : "प्रशासक"
//             } हटविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा किंवा समर्थनाशी संपर्क साधा.`);

//       await Swal.fire({
//         title: language === "en" ? "Error!" : "त्रुटी!",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleEdit = () => {
//     if (!isViewingEditing) {
//       setInitialFormData(formData);
//       setShowEditModal(true);
//       setShowViewModal(false);
//       setIsViewingEditing(true);
//     } else {
//       setShowEditModal(false);
//       setShowViewModal(true);
//       setIsViewingEditing(false);
//     }
//   };

//   const openAddManagerModal = () => {
//     setFormData({
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirm_password: "",
//       role: "Manager",
//       farm_name: "",
//       farm_location: "",
//       farm_size: "",
//       manager_experience: "",
//     });
//     setShowModal(true);
//     setActiveButton("addManager");
//   };

//   const filteredData =
//     viewMode === "admins"
//       ? admins
//           .flatMap((admin) => [admin, ...(admin.sub_farmers || [])])
//           .filter(
//             (item, index, self) =>
//               item &&
//               index === self.findIndex((a) => a.id === item.id) &&
//               ((item.phone || "")
//                 .toLowerCase()
//                 .includes(searchQuery.toLowerCase()) ||
//                 (item.first_name || "")
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase()))
//           )
//       : managers.filter(
//           (manager) =>
//             manager &&
//             ((manager.phone || manager.user?.phone)
//               ?.toLowerCase()
//               .includes(searchQuery.toLowerCase()) ||
//               (manager.first_name || manager.user?.first_name)
//                 ?.toLowerCase()
//                 .includes(searchQuery.toLowerCase()))
//         );

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (hasMore && !fetchLoading) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const headerTitle =
//     viewMode === "admins"
//       ? translations[language].viewAdmin
//       : translations[language].viewManager;

//   return (
//     <div className="managers-container mb-5">
//       <Header title={headerTitle} icon={FaUserTie} />
//       <div className="container w-100">
//         <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-2 flex-md-wrap">
//           {isSuperFarmer ? (
//             <>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "managers"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={handleViewManagers}
//                 disabled={loading}
//               >
//                 <FaEye className="me-2" />
//                 {translations[language].viewManager}
//               </button>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "admins"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={handleViewAdmin}
//                 disabled={loading}
//               >
//                 <FaEye className="me-2" />
//                 {translations[language].viewAdmin}
//               </button>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "addManager"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={openAddManagerModal}
//                 disabled={loading}
//               >
//                 <FaPlus className="me-2" />
//                 {translations[language].addManager}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="input-group" style={{ width: "180px" }}>
//                 <input
//                   type="search"
//                   className="form-control rounded border-success"
//                   placeholder={translations[language].searchPlaceholder}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "addManager"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={openAddManagerModal}
//                 disabled={loading}
//               >
//                 <FaPlus className="me-2" />
//                 {translations[language].addManager}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="managers-grid p-2">
//         {fetchLoading && filteredData.length === 0 ? (
//           <div className="text-center m-auto">
//             <Spinner />
//           </div>
//         ) : filteredData.length > 0 ? (
//           viewMode === "admins" ? (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleViewManager({ ...item, is_admin: true })}
//               >
//                 <li className="manager-name p-2" type="none">
//                   {item.first_name || "Unknown"} {item.last_name || ""}
//                 </li>
//                 <span></span>
//               </div>
//             ))
//           ) : (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleViewManager(item)}
//               >
//                 <li className="manager-name p-2" type="none">
//                   {item.user?.first_name || item.first_name || "Unknown"}{" "}
//                   {item.user?.last_name || item.last_name || ""}
//                 </li>
//                 <span></span>
//               </div>
//             ))
//           )
//         ) : (
//           <p className="text-center text-muted mx-auto">
//             {language === "en"
//               ? viewMode === "admins"
//                 ? "No sub-farmers found"
//                 : "No managers found"
//               : viewMode === "admins"
//               ? "कोणतेही उप शेतकरी सापडले नाहीत"
//               : "कोणतेही व्यवस्थापक सापडले नाहीत"}
//           </p>
//         )}
//       </div>

//       <div className="d-flex justify-content-center mt-4">
//         <nav>
//           <ul className="pagination pagination-sm flex-wrap">
//             <li
//               className={`page-item ${
//                 currentPage === 1 || fetchLoading ? "disabled" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={handlePrevious}
//                 disabled={currentPage === 1 || fetchLoading}
//               >
//                 « {translations[language].previous}
//               </button>
//             </li>
//             <li className="page-item active">
//               <span className="page-link bg-success text-white border-0">
//                 {currentPage} / {totalPages}
//               </span>
//             </li>
//             <li
//               className={`page-item ${
//                 currentPage >= totalPages || fetchLoading ? "disabled" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={handleNext}
//                 disabled={currentPage >= totalPages || fetchLoading}
//               >
//                 {translations[language].next} »
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <ModalForm
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         isEditing={true}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleAddManager}
//         handleDelete={() => handleDeleteManager(editManagerId)}
//         language={language}
//         formType="manager"
//         viewMode={viewMode}
//       />

//       <ModalForm
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         isEditing={true}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleUpdateManager}
//         handleDelete={() => handleDeleteManager(editManagerId || editAdminId)}
//         language={language}
//         formType="manager"
//         viewMode={viewMode}
//       />

//       <ModalForm
//         isOpen={showViewModal}
//         onClose={() => setShowViewModal(false)}
//         isEditing={isViewingEditing}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleUpdateManager}
//         handleDelete={() => handleDeleteManager(formData.id)}
//         language={language}
//         formType="manager"
//         onEdit={handleToggleEdit}
//         viewMode={viewMode}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default ManagersList;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserTie, FaPlus, FaEye } from "react-icons/fa";
// import "./villages.css";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../Spinner/Spinner";
// import ModalForm from "../../Admin/Components/ModelForm";
// import api from "../../Api/axiosInstance";
// import Swal from "sweetalert2";
// import Header from "../Components/Header";

// const ManagersList = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage();

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const [isSuperFarmer, setIsSuperFarmer] = useState(user.is_super_farmer || false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const recordsPerPage = 10;
//   const [activeButton, setActiveButton] = useState("managers");

//   const translations = {
//     en: {
//       title: isSuperFarmer ? "Admins List" : "Managers List",
//       viewAdmin: "Admin",
//       viewManager: "Manager",
//       addManager: "Add",
//       addAdmin: "Add New Admin",
//       editManagerTitle: "Edit Manager",
//       editAdminTitle: "Edit Admin",
//       searchPlaceholder: "Search..",
//       modalTitle: "Add New Manager",
//       firstName: "First Name",
//       lastName: "Last Name",
//       email: "Email",
//       phone: "Phone Number",
//       password: "Password",
//       confirmPassword: "Confirm Password",
//       role: "Role",
//       farmName: "Farm Name",
//       farmLocation: "Farm Location",
//       farmSize: "Farm Size (acres)",
//       managerExperience: "Manager Experience (years)",
//       submit: "Submit",
//       cancel: "Cancel",
//       edit: "Edit",
//       delete: "Delete",
//       manager: "Manager",
//       admin: "Admin",
//       previous: "Previous",
//       next: "Next",
//       toast: {
//         fetchError: "Failed to fetch data",
//         unauthorized: "Unauthorized: Please log in again.",
//         requiredFields: "First name and phone number are required.",
//         passwordRequired: "Password is required to register the manager.",
//         passwordsMismatch: "Passwords do not match.",
//         managerAddedSuccess: "Manager added successfully!",
//         adminAddedSuccess: "Admin added successfully!",
//         phoneInUse: "Phone number already in use.",
//         addManagerError: "Failed to add manager",
//         phoneRequired: "Phone number is required.",
//         noChanges: "No changes detected.",
//         emailInUse: "This email address is already in use by another user.",
//         updateManagerError: "Failed to update manager",
//         managerUpdatedSuccess: "Updated successfully!",
//       },
//     },
//     mr: {
//       title: isSuperFarmer ? "प्रशासक यादी" : "व्यवस्थापक यादी",
//       viewAdmin: "प्रशासक",
//       viewManager: "व्यवस्थापक",
//       addManager: "जोडा",
//       addAdmin: "नवीन प्रशासक जोडा",
//       editManagerTitle: "व्यवस्थापक संपादन करा",
//       editAdminTitle: "प्रशासक संपादन करा",
//       searchPlaceholder: "शोधा..",
//       modalTitle: "नवीन व्यवस्थापक जोडा",
//       firstName: "प्रथम नाव",
//       lastName: "आडनाव",
//       email: "ईमेल",
//       phone: "फोन नंबर",
//       password: "पासवर्ड",
//       confirmPassword: "पासवर्ड पुष्टीकरण",
//       role: "भूमिका",
//       farmName: "शेताचे नाव",
//       farmLocation: "शेताचे स्थान",
//       farmSize: "शेताचा आकार (एकर्स)",
//       managerExperience: "व्यवस्थापकाचा अनुभव (वर्षे)",
//       submit: "सबमिट करा",
//       cancel: "रद्द करा",
//       edit: "संपादन",
//       delete: "हटवा",
//       manager: "व्यवस्थापक",
//       admin: "प्रशासक",
//       previous: "मागील",
//       next: "पुढील",
//       toast: {
//         fetchError: "डेटा आणण्यात अयशस्वी",
//         unauthorized: "अनधिकृत: कृपया पुन्हा लॉग इन करा.",
//         requiredFields: "प्रथम नाव आणि फोन नंबर आवश्यक आहेत.",
//         passwordRequired: "व्यवस्थापक नोंदणीसाठी पासवर्ड आवश्यक आहे.",
//         passwordsMismatch: "पासवर्ड जुळत नाहीत.",
//         managerAddedSuccess: "व्यवस्थापक यशस्वीरित्या जोडले गेले!",
//         adminAddedSuccess: "प्रशासक यशस्वीरित्या जोडले गेले!",
//         phoneInUse: "फोन नंबर आधीपासून वापरात आहे.",
//         addManagerError: "व्यवस्थापक जोडण्यात अयशस्वी.",
//         phoneRequired: "फोन नंबर आवश्यक आहे.",
//         noChanges: "कोणतेही बदल आढळले नाहीत.",
//         emailInUse: "हा ईमेल पत्ता आधीपासून दुसऱ्या वापरकर्त्याद्वारे वापरात आहे.",
//         updateManagerError: "व्यवस्थापक अद्यतनित करण्यात अयशस्वी.",
//         managerUpdatedSuccess: "यशस्वीरित्या अद्यतनित केले गेले!",
//       },
//     },
//   };

//   const [managers, setManagers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [viewMode, setViewMode] = useState("managers");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [isViewingEditing, setIsViewingEditing] = useState(false);
//   const [editAdminId, setEditAdminId] = useState(null);
//   const [editManagerId, setEditManagerId] = useState(null);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: "",
//     role: "Manager",
//     farm_name: "",
//     farm_location: "",
//     farm_size: "",
//     manager_experience: "",
//   });
//   const [initialFormData, setInitialFormData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);

//   useEffect(() => {
//     localStorage.setItem("is_super_farmer", JSON.stringify(isSuperFarmer));

//     const fetchManagers = async (page = 1) => {
//       setFetchLoading(true);
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const Id = user?.id;

//         const response = await api.get(
//           `/users/?action=getFarmManager&user_created=${Id}&page=${page}&records_number=${recordsPerPage}`
//         );

//         const managerData = Array.isArray(response.data.data)
//           ? response.data.data
//           : [];
//         setManagers(managerData);
//         localStorage.setItem("managers", JSON.stringify(managerData));
//         setTotalCount(response.data.total_count || 0);
//         setTotalPages(Math.ceil(response.data.total_count / recordsPerPage) || 1);

//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } catch (err) {
//         toast.error(
//           err.response?.status === 401
//             ? translations[language].toast.unauthorized
//             : translations[language].toast.fetchError
//         );
//         if (err.response?.status === 401) navigate("/login");
//         setManagers([]);
//         localStorage.setItem("managers", JSON.stringify([]));
//         setTotalCount(0);
//         setTotalPages(1);
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     if (viewMode === "managers") {
//       fetchManagers(currentPage);
//     }
//   }, [isSuperFarmer, language, navigate, currentPage, viewMode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddManager = async (e) => {
//     e.preventDefault();

//     if (!formData.phone.trim() || !formData.first_name.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.requiredFields,
//         text: translations[language].toast.requiredFields,
//       });
//       return;
//     }

//     const phoneRegex = /^\d+$/;
//     if (!phoneRegex.test(formData.phone.trim())) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.invalidPhoneFormat || "Invalid phone number",
//         text: translations[language].toast.invalidPhoneFormat || "Phone number must contain only digits.",
//       });
//       return;
//     }

//     if (formData.phone.trim().length !== 10) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.invalidPhoneLength || "Invalid phone number length",
//         text: translations[language].toast.invalidPhoneLength || "Phone number must be exactly 10 digits.",
//       });
//       return;
//     }

//     if (!formData.password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.passwordRequired,
//         text: translations[language].toast.passwordRequired,
//       });
//       return;
//     }

//     if (formData.password.trim() !== formData.confirm_password.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.passwordsMismatch,
//         text: translations[language].toast.passwordsMismatch,
//       });
//       return;
//     }

//     const confirmResult = await Swal.fire({
//       title: translations[language].modalTitle,
//       text: translations[language].toast.addManager,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: translations[language].submit,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (!confirmResult.isConfirmed) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: No token found.");

//       let newUser;
//       if (formData.role === "Manager") {
//         const managerPayload = {
//           action: "postFarmManager",
//           user: {
//             first_name: formData.first_name.trim(),
//             last_name: formData.last_name.trim(),
//             email: formData.email.trim(),
//             phone: formData.phone.trim(),
//             password: formData.password.trim(),
//             confirm_password: formData.confirm_password.trim(),
//             is_admin: false,
//             is_manager: true,
//           },
//           farm_name: formData.farm_name.trim(),
//           farm_location: formData.farm_location.trim(),
//           manager_experience: parseInt(formData.manager_experience) || 0,
//         };

//         const managerResponse = await api.post("/users/", managerPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         newUser = managerResponse.data.data;
//       } else {
//         const userPayload = {
//           action: "postFarmer",
//           user: {
//             first_name: formData.first_name.trim(),
//             last_name: formData.last_name.trim(),
//             email: formData.email.trim(),
//             phone: formData.phone.trim(),
//             password: formData.password.trim(),
//             confirm_password: formData.confirm_password.trim(),
//             is_admin: true,
//             is_manager: false,
//           },
//           farm_name: formData.farm_name.trim() || "",
//           farm_location: formData.farm_location.trim() || "",
//           farm_size: formData.farm_size.trim() ? parseInt(formData.farm_size) : 0,
//         };

//         const userResponse = await api.post("/users/", userPayload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         newUser = userResponse.data.data;
//       }

//       if (formData.role === "Manager") {
//         if (managers.length < recordsPerPage && currentPage === 1) {
//           const updatedManagers = [newUser, ...managers];
//           setManagers(updatedManagers);
//           localStorage.setItem("managers", JSON.stringify(updatedManagers));
//         }
//         setTotalCount((prev) => prev + 1);
//         setTotalPages(Math.ceil((totalCount + 1) / recordsPerPage) || 1);
//       } else {
//         const updatedAdmins = [newUser, ...admins];
//         setAdmins(updatedAdmins);
//         localStorage.setItem("admins", JSON.stringify(updatedAdmins));
//         if (viewMode === "admins") {
//           await handleViewAdmin();
//         }
//       }

//       Swal.fire({
//         icon: "success",
//         title:
//           formData.role === "Manager"
//             ? translations[language].toast.managerAddedSuccess
//             : translations[language].toast.adminAddedSuccess,
//         showConfirmButton: false,
//         timer: 2000,
//       });

//       setShowModal(false);
//       setFormData({
//         first_name: "",
//         last_name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirm_password: "",
//         role: "Manager",
//         farm_name: "",
//         farm_location: "",
//         farm_size: "",
//         manager_experience: "",
//       });
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.error_msg?.toLowerCase() ||
//         err.response?.data?.message?.toLowerCase() ||
//         "";
//       if (errorMsg.includes("user_email_key")) {
//         Swal.fire({
//           icon: "error",
//           title: translations[language].toast.emailInUse,
//           text: translations[language].toast.emailInUse,
//         });
//       } else if (errorMsg.includes("user_phone_key")) {
//         Swal.fire({
//           icon: "error",
//           title: translations[language].toast.phoneInUse,
//           text: translations[language].toast.phoneInUse,
//         });
//       } else if (errorMsg.includes("password")) {
//         Swal.fire({
//           icon: "error",
//           title: translations[language].toast.invalidPassword || "Invalid password",
//           text: translations[language].toast.invalidPassword || "Please ensure the password meets the requirements.",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: err.response?.data?.message || translations[language].toast.addManagerError,
//           text: formData.role !== "Manager"
//             ? translations[language].toast.notSuperFarmer || "You are not a super farmer."
//             : translations[language].toast.addManagerError,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewAdmin = async () => {
//     setFetchLoading(true);
//     setViewMode("admins");
//     setActiveButton("admins");
//     setCurrentPage(1);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user?.farmer_id) {
//         throw new Error("Farmer ID not found in localStorage");
//       }
//       const farmerId = user.farmer_id;
//       const response = await api.get(
//         `/users/?action=getFarmer&id=${farmerId}&page=${currentPage}&records_number=${recordsPerPage}`
//       );

//       const adminData = Array.isArray(response.data.data)
//         ? response.data.data
//         : [response.data.data];
//       const normalizedAdmins = adminData.map((admin) => ({
//         id: admin.id,
//         first_name: admin.user?.first_name || admin.first_name || "",
//         last_name: admin.user?.last_name || admin.last_name || "",
//         email: admin.user?.email || admin.email || "",
//         phone: admin.user?.phone || admin.phone || "",
//         farm_name: admin.farm_name || "",
//         farm_location: admin.farm_location || "",
//         farm_size: admin.farm_size || "",
//         password: admin.password || "",
//         is_admin: admin.is_admin || true,
//         is_manager: admin.is_manager || false,
//         is_super_farmer: admin.is_super_farmer || false,
//         sub_farmers: (admin.sub_farmers || []).map((subFarmer) => ({
//           id: subFarmer.id,
//           first_name: subFarmer.user?.first_name || subFarmer.first_name || "",
//           last_name: subFarmer.user?.last_name || subFarmer.last_name || "",
//           email: subFarmer.user?.email || subFarmer.email || "",
//           phone: subFarmer.user?.phone || subFarmer.phone || "",
//           farm_name: subFarmer.farm_name || "",
//           farm_location: subFarmer.farm_location || "",
//           farm_size: subFarmer.farm_size || "",
//           password: subFarmer.password || "",
//           is_admin: true,
//         })),
//       }));

//       setAdmins(normalizedAdmins);
//       localStorage.setItem("admins", JSON.stringify(normalizedAdmins));
//       setTotalCount(response.data.total_count || normalizedAdmins.length);
//       setTotalPages(Math.ceil(response.data.total_count / recordsPerPage) || 1);

//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       toast.error(
//         err.response?.status === 401
//           ? translations[language].toast.unauthorized
//           : translations[language].toast.fetchError
//       );
//       if (err.response?.status === 401) navigate("/login");
//       setAdmins([]);
//       localStorage.setItem("admins", JSON.stringify([]));
//       setTotalCount(0);
//       setTotalPages(1);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleViewManagers = async () => {
//     setFetchLoading(true);
//     setViewMode("managers");
//     setActiveButton("managers");
//     setCurrentPage(1);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user?.id) {
//         throw new Error("User ID not found in localStorage");
//       }
//       const Id = user.id;

//       const response = await api.get(
//         `/users/?action=getFarmManager&user_created=${Id}&page=${currentPage}&records_number=${recordsPerPage}`
//       );
//       const managerData = Array.isArray(response.data.data)
//         ? response.data.data
//         : [];

//       setManagers(managerData);
//       localStorage.setItem("managers", JSON.stringify(managerData));
//       setTotalCount(response.data.total_count || managerData.length);
//       setTotalPages(Math.ceil(response.data.total_count / recordsPerPage) || 1);

//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       toast.error(
//         err.response?.status === 401
//           ? translations[language].toast.unauthorized
//           : translations[language].toast.fetchError
//       );
//       if (err.response?.status === 401) navigate("/login");
//       setManagers([]);
//       localStorage.setItem("managers", JSON.stringify([]));
//       setTotalCount(0);
//       setTotalPages(1);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleEditManager = (manager) => {
//     const role =
//       manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
//         ? "Admin"
//         : "Manager";
//     const initialData = {
//       id: manager.id,
//       first_name: manager.user?.first_name || manager.first_name || "",
//       last_name: manager.user?.last_name || manager.last_name || "",
//       email: manager.user?.email || manager.email || "",
//       phone: manager.user?.phone || manager.phone || "",
//       password: manager.password || "",
//       confirm_password: manager.password || "",
//       role: role,
//       farm_name: manager.farm_name || "",
//       farm_location: manager.farm_location || "",
//       farm_size: role === "Admin" ? manager.farm_size || "" : "",
//       manager_experience: manager.manager_experience || "",
//     };

//     if (role === "Admin") {
//       setEditAdminId(manager.id);
//       setEditManagerId(null);
//     } else {
//       setEditManagerId(manager.id);
//       setEditAdminId(null);
//     }

//     setFormData(initialData);
//     setInitialFormData(initialData);
//     setShowEditModal(true);
//     setShowViewModal(false);
//     setIsViewingEditing(true);
//   };

//   const handleViewManager = (manager) => {
//     const role =
//       manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
//         ? "Admin"
//         : "Manager";
//     const initialData = {
//       id: manager.id,
//       first_name: manager.user?.first_name || manager.first_name || "",
//       last_name: manager.user?.last_name || manager.last_name || "",
//       email: manager.user?.email || manager.email || "",
//       phone: manager.user?.phone || manager.phone || "",
//       password: manager.password || "",
//       confirm_password: manager.password || "",
//       role: role,
//       farm_name: manager.farm_name || "",
//       farm_location: manager.farm_location || "",
//       farm_size: role === "Admin" ? manager.farm_size || "" : "",
//       manager_experience: manager.manager_experience || "",
//     };

//     setFormData(initialData);
//     setInitialFormData(initialData);

//     if (role === "Admin") {
//       setEditAdminId(manager.id);
//       setEditManagerId(null);
//     } else {
//       setEditManagerId(manager.id);
//       setEditAdminId(null);
//     }

//     setIsViewingEditing(false);
//     setShowViewModal(true);
//     setShowEditModal(false);
//   };

//   const handleUpdateManager = async (e) => {
//     e.preventDefault();

//     if (!formData.phone.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: translations[language].toast.phoneRequired,
//       });
//       return;
//     }

//     if (!initialFormData) {
//       Swal.fire({
//         icon: "error",
//         title: "Error: Initial data not set. Please try again.",
//       });
//       setLoading(false);
//       return;
//     }

//     const confirmResult = await Swal.fire({
//       title: translations[language].edit,
//       text: translations[language].toast.updateManager,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: translations[language].submit,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (!confirmResult.isConfirmed) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         throw new Error("Unauthorized: No token found.");
//       }

//       let changedPayload;
//       let hasChanges = false;
//       const entityId =
//         formData.role === "Manager" ? editManagerId : editAdminId;

//       if (!entityId) {
//         throw new Error(`No valid ID found for ${formData.role}`);
//       }

//       if (formData.role === "Manager") {
//         changedPayload = { id: entityId, action: "patchFarmManager" };
//         if (formData.first_name.trim() !== initialFormData.first_name) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.first_name = formData.first_name.trim();
//           hasChanges = true;
//         }
//         if (formData.last_name.trim() !== initialFormData.last_name) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.last_name = formData.last_name.trim();
//           hasChanges = true;
//         }
//         if (formData.email.trim() !== initialFormData.email) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.email = formData.email.trim();
//           hasChanges = true;
//         }
//         if (formData.phone.trim() !== initialFormData.phone) {
//           changedPayload.user = changedPayload.user || {};
//           changedPayload.user.phone = formData.phone.trim();
//           hasChanges = true;
//         }
//         if (formData.farm_name.trim() !== initialFormData.farm_name) {
//           changedPayload.farm_name = formData.farm_name.trim() || null;
//           hasChanges = true;
//         }
//         if (formData.farm_location.trim() !== initialFormData.farm_location) {
//           changedPayload.farm_location = formData.farm_location.trim() || null;
//           hasChanges = true;
//         }
//         if (
//           parseInt(formData.manager_experience) !==
//           parseInt(initialFormData.manager_experience)
//         ) {
//           changedPayload.manager_experience =
//             parseInt(formData.manager_experience) || 0;
//           hasChanges = true;
//         }
//       } else {
//         changedPayload = { id: entityId, action: "patchFarmer" };
//         if (
//           formData.first_name.trim() !== initialFormData.first_name ||
//           formData.last_name.trim() !== initialFormData.last_name ||
//           formData.email.trim() !== initialFormData.email ||
//           formData.phone.trim() !== initialFormData.phone
//         ) {
//           changedPayload.user = {};
//           if (formData.first_name.trim() !== initialFormData.first_name) {
//             changedPayload.user.first_name = formData.first_name.trim();
//             hasChanges = true;
//           }
//           if (formData.last_name.trim() !== initialFormData.last_name) {
//             changedPayload.user.last_name = formData.last_name.trim();
//             hasChanges = true;
//           }
//           if (formData.email.trim() !== initialFormData.email) {
//             changedPayload.user.email = formData.email.trim();
//             hasChanges = true;
//           }
//           if (formData.phone.trim() !== initialFormData.phone) {
//             changedPayload.user.phone = formData.phone.trim();
//             hasChanges = true;
//           }
//         }
//         if (formData.farm_name.trim() !== initialFormData.farm_name) {
//           changedPayload.farm_name = formData.farm_name.trim() || "";
//           hasChanges = true;
//         }
//         if (formData.farm_location.trim() !== initialFormData.farm_location) {
//           changedPayload.farm_location = formData.farm_location.trim() || "";
//           hasChanges = true;
//         }
//         if (formData.farm_size.trim() !== initialFormData.farm_size) {
//           changedPayload.farm_size = formData.farm_size.trim()
//             ? parseInt(formData.farm_size)
//             : 0;
//           hasChanges = true;
//         }
//       }

//       if (!hasChanges) {
//         Swal.fire({
//           icon: "info",
//           title: translations[language].toast.noChanges,
//         });
//         setShowEditModal(false);
//         setShowViewModal(false);
//         setLoading(false);
//         return;
//       }

//       const response = await api.patch("/users/", changedPayload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updatedEntity = response.data.data;

//       if (formData.role === "Manager") {
//         const updatedManagers = managers.map((m) =>
//           m.id === entityId ? { ...m, ...updatedEntity } : m
//         );
//         setManagers(updatedManagers);
//         localStorage.setItem("managers", JSON.stringify(updatedManagers));
//       } else {
//         setViewMode("admins");
//         await handleViewAdmin();
//       }

//       Swal.fire({
//         icon: "success",
//         title: translations[language].toast.managerUpdatedSuccess,
//         showConfirmButton: false,
//         timer: 2000,
//       });

//       setShowEditModal(false);
//       setShowViewModal(false);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title:
//           err.response?.data?.message ||
//           translations[language].toast.updateManagerError,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteManager = async (managerId) => {
//     const result = await Swal.fire({
//       title: `${translations[language].delete} ${formData.role}`,
//       text: translations[language].toast.deleteManager,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: translations[language].delete,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (!result.isConfirmed) return;

//     setLoading(true);

//     let previousManagers = null;
//     let previousAdmins = null;
//     if (formData.role === "Manager") {
//       previousManagers = [...managers];
//       setManagers(managers.filter((m) => m.id !== managerId));
//       localStorage.setItem(
//         "managers",
//         JSON.stringify(managers.filter((m) => m.id !== managerId))
//       );
//     } else {
//       previousAdmins = [...admins];
//       setAdmins(admins.filter((a) => a.id !== managerId));
//       localStorage.setItem(
//         "admins",
//         JSON.stringify(admins.filter((a) => a.id !== managerId))
//       );
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: No token found.");

//       const deletePayload = {
//         action: formData.role === "Manager" ? "delFarmManager" : "delFarmer",
//         id: managerId,
//         role: formData.role === "Manager" ? undefined : "farmer",
//       };

//       const response = await api.delete("/users/", {
//         data: deletePayload,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200 || response.status === 204) {
//         if (
//           formData.role === "Manager" &&
//           managers.length === 1 &&
//           currentPage > 1
//         ) {
//           setCurrentPage(currentPage - 1);
//         } else if (
//           formData.role !== "Manager" &&
//           admins.length === 1 &&
//           currentPage > 1
//         ) {
//           setCurrentPage(currentPage - 1);
//         }
//         setTotalCount((prev) => prev - 1);
//         setTotalPages(Math.ceil((totalCount - 1) / recordsPerPage) || 1);

//         await Swal.fire({
//           title: translations[language].toast.deleted,
//           text: translations[language].toast.deleteSuccess,
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         setFormData({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirm_password: "",
//           role: "Manager",
//           farm_name: "",
//           farm_location: "",
//           farm_size: "",
//           manager_experience: "",
//         });
//         setInitialFormData(null);
//         setEditManagerId(null);
//         setEditAdminId(null);
//         setShowViewModal(false);
//         setShowEditModal(false);
//         setIsViewingEditing(false);

//         if (formData.role !== "Manager" && viewMode === "admins") {
//           await handleViewAdmin();
//         }
//       } else {
//         throw new Error("Unexpected response status: " + response.status);
//       }
//     } catch (err) {
//       if (formData.role === "Manager" && previousManagers) {
//         setManagers(previousManagers);
//         localStorage.setItem("managers", JSON.stringify(previousManagers));
//       } else if (previousAdmins) {
//         setAdmins(previousAdmins);
//         localStorage.setItem("admins", JSON.stringify(previousAdmins));
//       }

//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.error_msg ||
//         translations[language].toast.deleteManagerError ||
//         `Failed to delete ${formData.role.toLowerCase()}. Please try again or contact support.`;

//       await Swal.fire({
//         title: translations[language].toast.error,
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleEdit = () => {
//     if (!isViewingEditing) {
//       setInitialFormData(formData);
//       setShowEditModal(true);
//       setShowViewModal(false);
//       setIsViewingEditing(true);
//     } else {
//       setShowEditModal(false);
//       setShowViewModal(true);
//       setIsViewingEditing(false);
//     }
//   };

//   const openAddManagerModal = () => {
//     setFormData({
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirm_password: "",
//       role: "Manager",
//       farm_name: "",
//       farm_location: "",
//       farm_size: "",
//       manager_experience: "",
//     });
//     setShowModal(true);
//     setActiveButton("addManager");
//   };

//   const filteredData =
//     viewMode === "admins"
//       ? admins
//           .flatMap((admin) => [admin, ...(admin.sub_farmers || [])])
//           .filter(
//             (item, index, self) =>
//               item &&
//               index === self.findIndex((a) => a.id === item.id) &&
//               ((item.phone || "")
//                 .toLowerCase()
//                 .includes(searchQuery.toLowerCase()) ||
//                 (item.first_name || "")
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase()))
//           )
//       : managers.filter(
//           (manager) =>
//             manager &&
//             ((manager.user?.phone || manager.phone)
//               ?.toLowerCase()
//               .includes(searchQuery.toLowerCase()) ||
//               (manager.user?.first_name || manager.first_name)
//                 ?.toLowerCase()
//                 .includes(searchQuery.toLowerCase()))
//         );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && !fetchLoading) {
//       setCurrentPage(newPage);
//     }
//   };

//   const headerTitle =
//     viewMode === "admins"
//       ? translations[language].viewAdmin
//       : translations[language].viewManager;

//   return (
//     <div className="managers-container mb-5">
//       <Header title={headerTitle} icon={FaUserTie} />
//       <div className="container w-100">
//         <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-2 flex-md-wrap">
//           {isSuperFarmer ? (
//             <>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "managers"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={handleViewManagers}
//                 disabled={loading}
//               >
//                 <FaEye className="me-2" />
//                 {translations[language].viewManager}
//               </button>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "admins"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={handleViewAdmin}
//                 disabled={loading}
//               >
//                 <FaEye className="me-2" />
//                 {translations[language].viewAdmin}
//               </button>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "addManager"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={openAddManagerModal}
//                 disabled={loading}
//               >
//                 <FaPlus className="me-2" />
//                 {translations[language].addManager}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="input-group" style={{ width: "180px" }}>
//                 <input
//                   type="search"
//                   className="form-control rounded border-success"
//                   placeholder={translations[language].searchPlaceholder}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <button
//                 className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
//                   activeButton === "addManager"
//                     ? "btn-success"
//                     : "btn-outline-success"
//                 }`}
//                 onClick={openAddManagerModal}
//                 disabled={loading}
//               >
//                 <FaPlus className="me-2" />
//                 {translations[language].addManager}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="managers-grid p-2">
//         {fetchLoading && filteredData.length === 0 ? (
//           <div className="text-center m-auto">
//             <Spinner />
//           </div>
//         ) : filteredData.length > 0 ? (
//           viewMode === "admins" ? (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleViewManager({ ...item, is_admin: true })}
//               >
//                 <li className="manager-name p-2" type="none">
//                   {item.first_name || "Unknown"} {item.last_name || ""}
//                 </li>
//                 <span></span>
//               </div>
//             ))
//           ) : (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => handleViewManager(item)}
//               >
//                 <li className="manager-name p-2" type="none">
//                   {item.user?.first_name || item.first_name || "Unknown"}{" "}
//                   {item.user?.last_name || item.last_name || ""}
//                 </li>
//                 <span></span>
//               </div>
//             ))
//           )
//         ) : (
//           <p className="text-center text-muted mx-auto">
//             {translations[language].noData ||
//               (viewMode === "admins"
//                 ? "No sub-farmers found"
//                 : "No managers found")}
//           </p>
//         )}
//       </div>

//       {totalPages > 1 && (
//         <div className="d-flex justify-content-center mt-4">
//           <nav>
//             <ul className="pagination pagination-sm flex-wrap">
//               <li className={`page-item ${currentPage === 1 || fetchLoading ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1 || fetchLoading}
//                 >
//                   {translations[language].previous}
//                 </button>
//               </li>
//               <li className="page-item active">
//                 <span className="page-link bg-success text-white border-0">
//                   {currentPage} / {totalPages}
//                 </span>
//               </li>
//               <li className={`page-item ${currentPage === totalPages || fetchLoading ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages || fetchLoading}
//                 >
//                   {translations[language].next}
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       )}

//       <ModalForm
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         isEditing={true}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleAddManager}
//         handleDelete={() => handleDeleteManager(editManagerId)}
//         language={language}
//         formType="manager"
//         viewMode={viewMode}
//       />

//       <ModalForm
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         isEditing={true}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleUpdateManager}
//         handleDelete={() => handleDeleteManager(editManagerId || editAdminId)}
//         language={language}
//         formType="manager"
//         viewMode={viewMode}
//       />

//       <ModalForm
//         isOpen={showViewModal}
//         onClose={() => setShowViewModal(false)}
//         isEditing={isViewingEditing}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleUpdateManager}
//         handleDelete={() => handleDeleteManager(formData.id)}
//         language={language}
//         formType="manager"
//         onEdit={handleToggleEdit}
//         viewMode={viewMode}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default ManagersList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaPlus, FaEye } from "react-icons/fa";
import "./villages.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import ModalForm from "../../Admin/Components/ModelForm";
import api from "../../Api/axiosInstance";
import Swal from "sweetalert2";
import Header from "../Components/Header";

const ManagersList = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [isSuperFarmer, setIsSuperFarmer] = useState(
    user.is_super_farmer || false
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 10;
  const [activeButton, setActiveButton] = useState("managers");

  const translations = {
    en: {
      title: isSuperFarmer ? "Admins List" : "Managers List",
      viewAdmin: "Admin",
      viewManager: "Manager",
      addManager: "Add",
      addAdmin: "Add New Admin",
      editManagerTitle: "Edit Manager",
      editAdminTitle: "Edit Admin",
      searchPlaceholder: "Search..",
      modalTitle: "Add New Manager",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      role: "Role",
      farmName: "Farm Name",
      farmLocation: "Farm Location",
      farmSize: "Farm Size (acres)",
      managerExperience: "Manager Experience (years)",
      submit: "Submit",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      manager: "Manager",
      admin: "Admin",
      previous: "Previous",
      next: "Next",
      toast: {
        fetchError: "Failed to fetch data",
        unauthorized: "Unauthorized: Please log in again.",
        requiredFields: "First name and phone number are required.",
        passwordRequired: "Password is required to register the manager.",
        passwordsMismatch: "Passwords do not match.",
        managerAddedSuccess: "Manager added successfully!",
        adminAddedSuccess: "Admin added successfully!",
        phoneInUse: "Phone number already in use.",
        addManagerError: "Failed to add manager",
        phoneRequired: "Phone number is required.",
        noChanges: "No changes detected.",
        emailInUse: "This email address is already in use by another user.",
        updateManagerError: "Failed to update manager",
        managerUpdatedSuccess: "Updated successfully!",
      },
    },
    mr: {
      title: isSuperFarmer ? "प्रशासक यादी" : "व्यवस्थापक यादी",
      viewAdmin: "प्रशासक",
      viewManager: "व्यवस्थापक",
      addManager: "जोडा",
      addAdmin: "नवीन प्रशासक जोडा",
      editManagerTitle: "व्यवस्थापक संपादन करा",
      editAdminTitle: "प्रशासक संपादन करा",
      searchPlaceholder: "शोधा..",
      modalTitle: "नवीन व्यवस्थापक जोडा",
      firstName: "प्रथम नाव",
      lastName: "आडनाव",
      email: "ईमेल",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड पुष्टीकरण",
      role: "भूमिका",
      farmName: "शेताचे नाव",
      farmLocation: "शेताचे स्थान",
      farmSize: "शेताचा आकार (एकर्स)",
      managerExperience: "व्यवस्थापकाचा अनुभव (वर्षे)",
      submit: "सबमिट करा",
      cancel: "रद्द करा",
      edit: "संपादन",
      delete: "हटवा",
      manager: "व्यवस्थापक",
      admin: "प्रशासक",
      previous: "मागील",
      next: "पुढील",
      toast: {
        fetchError: "डेटा आणण्यात अयशस्वी",
        unauthorized: "अनधिकृत: कृपया पुन्हा लॉग इन करा.",
        requiredFields: "प्रथम नाव आणि फोन नंबर आवश्यक आहेत.",
        passwordRequired: "व्यवस्थापक नोंदणीसाठी पासवर्ड आवश्यक आहे.",
        passwordsMismatch: "पासवर्ड जुळत नाहीत.",
        managerAddedSuccess: "व्यवस्थापक यशस्वीरित्या जोडले गेले!",
        adminAddedSuccess: "प्रशासक यशस्वीरित्या जोडले गेले!",
        phoneInUse: "फोन नंबर आधीपासून वापरात आहे.",
        addManagerError: "व्यवस्थापक जोडण्यात अयशस्वी.",
        phoneRequired: "फोन नंबर आवश्यक आहे.",
        noChanges: "कोणतेही बदल आढळले नाहीत.",
        emailInUse:
          "हा ईमेल पत्ता आधीपासून दुसऱ्या वापरकर्त्याद्वारे वापरात आहे.",
        updateManagerError: "व्यवस्थापक अद्यतनित करण्यात अयशस्वी.",
        managerUpdatedSuccess: "यशस्वीरित्या अद्यतनित केले गेले!",
      },
    },
  };

  const [managers, setManagers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [viewMode, setViewMode] = useState("managers");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isViewingEditing, setIsViewingEditing] = useState(false);
  const [editAdminId, setEditAdminId] = useState(null);
  const [editManagerId, setEditManagerId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    role: "Manager",
    farm_name: "",
    farm_location: "",
    farm_size: "",
    manager_experience: "",
  });
  const [initialFormData, setInitialFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("is_super_farmer", JSON.stringify(isSuperFarmer));

    const fetchManagers = async (page = 1) => {
      setFetchLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const Id = user?.id;

        const response = await api.get(
          `/users/?action=getFarmManager&user_created=${Id}&page=${page}&page_size=${recordsPerPage}`
        );

        const managerData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setManagers(managerData);
        localStorage.setItem("managers", JSON.stringify(managerData));
        setTotalCount(response.data.total_count || 0);
        setTotalPages(
          Math.ceil(response.data.total_count / recordsPerPage) || 1
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        toast.error(
          err.response?.status === 401
            ? translations[language].toast.unauthorized
            : translations[language].toast.fetchError
        );
        if (err.response?.status === 401) navigate("/login");
        setManagers([]);
        localStorage.setItem("managers", JSON.stringify([]));
        setTotalCount(0);
        setTotalPages(1);
      } finally {
        setFetchLoading(false);
      }
    };

    if (viewMode === "managers") {
      fetchManagers(currentPage);
    }
  }, [isSuperFarmer, language, navigate, currentPage, viewMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddManager = async (e) => {
    e.preventDefault();

    if (!formData.phone.trim() || !formData.first_name.trim()) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.requiredFields,
        text: translations[language].toast.requiredFields,
      });
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      Swal.fire({
        icon: "error",
        title:
          translations[language].toast.invalidPhoneFormat ||
          "Invalid phone number",
        text:
          translations[language].toast.invalidPhoneFormat ||
          "Phone number must contain only digits.",
      });
      return;
    }

    if (formData.phone.trim().length !== 10) {
      Swal.fire({
        icon: "error",
        title:
          translations[language].toast.invalidPhoneLength ||
          "Invalid phone number length",
        text:
          translations[language].toast.invalidPhoneLength ||
          "Phone number must be exactly 10 digits.",
      });
      return;
    }

    if (!formData.password.trim()) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.passwordRequired,
        text: translations[language].toast.passwordRequired,
      });
      return;
    }

    if (formData.password.trim() !== formData.confirm_password.trim()) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.passwordsMismatch,
        text: translations[language].toast.passwordsMismatch,
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: translations[language].modalTitle,
      text: translations[language].toast.addManager,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: translations[language].submit,
      cancelButtonText: translations[language].cancel,
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");

      let newUser;
      if (formData.role === "Manager") {
        const managerPayload = {
          action: "postFarmManager",
          user: {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password.trim(),
            confirm_password: formData.confirm_password.trim(),
            is_admin: false,
            is_manager: true,
          },
          farm_name: formData.farm_name.trim(),
          farm_location: formData.farm_location.trim(),
          manager_experience: parseInt(formData.manager_experience) || 0,
        };

        const managerResponse = await api.post("/users/", managerPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newUser = managerResponse.data.data;
      } else {
        const userPayload = {
          action: "postFarmer",
          user: {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password.trim(),
            confirm_password: formData.confirm_password.trim(),
            is_admin: true,
            is_manager: false,
          },
          farm_name: formData.farm_name.trim() || "",
          farm_location: formData.farm_location.trim() || "",
          farm_size: formData.farm_size.trim()
            ? parseInt(formData.farm_size)
            : 0,
        };

        const userResponse = await api.post("/users/", userPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newUser = userResponse.data.data;
      }

      if (formData.role === "Manager") {
        if (managers.length < recordsPerPage && currentPage === 1) {
          const updatedManagers = [newUser, ...managers];
          setManagers(updatedManagers);
          localStorage.setItem("managers", JSON.stringify(updatedManagers));
        }
        setTotalCount((prev) => prev + 1);
        setTotalPages(Math.ceil((totalCount + 1) / recordsPerPage) || 1);
      } else {
        const updatedAdmins = [newUser, ...admins];
        setAdmins(updatedAdmins);
        localStorage.setItem("admins", JSON.stringify(updatedAdmins));
        if (viewMode === "admins") {
          await handleViewAdmin();
        }
      }

      Swal.fire({
        icon: "success",
        title:
          formData.role === "Manager"
            ? translations[language].toast.managerAddedSuccess
            : translations[language].toast.adminAddedSuccess,
        showConfirmButton: false,
        timer: 2000,
      });

      setShowModal(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        role: "Manager",
        farm_name: "",
        farm_location: "",
        farm_size: "",
        manager_experience: "",
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.error_msg?.toLowerCase() ||
        err.response?.data?.message?.toLowerCase() ||
        "";
      if (errorMsg.includes("user_email_key")) {
        Swal.fire({
          icon: "error",
          title: translations[language].toast.emailInUse,
          text: translations[language].toast.emailInUse,
        });
      } else if (errorMsg.includes("user_phone_key")) {
        Swal.fire({
          icon: "error",
          title: translations[language].toast.phoneInUse,
          text: translations[language].toast.phoneInUse,
        });
      } else if (errorMsg.includes("password")) {
        Swal.fire({
          icon: "error",
          title:
            translations[language].toast.invalidPassword || "Invalid password",
          text:
            translations[language].toast.invalidPassword ||
            "Please ensure the password meets the requirements.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            err.response?.data?.message ||
            translations[language].toast.addManagerError,
          text:
            formData.role !== "Manager"
              ? translations[language].toast.notSuperFarmer ||
                "You are not a super farmer."
              : translations[language].toast.addManagerError,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewAdmin = async () => {
    setFetchLoading(true);
    setViewMode("admins");
    setActiveButton("admins");
    setCurrentPage(1);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.farmer_id) {
        throw new Error("Farmer ID not found in localStorage");
      }
      const farmerId = user.farmer_id;
      const response = await api.get(
        `/users/?action=getFarmer&id=${farmerId}&page=${currentPage}&records_number=${recordsPerPage}`
      );

      const adminData = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      const normalizedAdmins = adminData.map((admin) => ({
        id: admin.id,
        first_name: admin.user?.first_name || admin.first_name || "",
        last_name: admin.user?.last_name || admin.last_name || "",
        email: admin.user?.email || admin.email || "",
        phone: admin.user?.phone || admin.phone || "",
        farm_name: admin.farm_name || "",
        farm_location: admin.farm_location || "",
        farm_size: admin.farm_size || "",
        password: admin.password || "",
        is_admin: admin.is_admin || true,
        is_manager: admin.is_manager || false,
        is_super_farmer: admin.is_super_farmer || false,
        sub_farmers: (admin.sub_farmers || []).map((subFarmer) => ({
          id: subFarmer.id,
          first_name: subFarmer.user?.first_name || subFarmer.first_name || "",
          last_name: subFarmer.user?.last_name || subFarmer.last_name || "",
          email: subFarmer.user?.email || subFarmer.email || "",
          phone: subFarmer.user?.phone || subFarmer.phone || "",
          farm_name: subFarmer.farm_name || "",
          farm_location: subFarmer.farm_location || "",
          farm_size: subFarmer.farm_size || "",
          password: subFarmer.password || "",
          is_admin: true,
        })),
      }));

      setAdmins(normalizedAdmins);
      localStorage.setItem("admins", JSON.stringify(normalizedAdmins));
      setTotalCount(response.data.total_count || normalizedAdmins.length);
      setTotalPages(Math.ceil(response.data.total_count / recordsPerPage) || 1);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(
        err.response?.status === 401
          ? translations[language].toast.unauthorized
          : translations[language].toast.fetchError
      );
      if (err.response?.status === 401) navigate("/login");
      setAdmins([]);
      localStorage.setItem("admins", JSON.stringify([]));
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleViewManagers = async () => {
    setFetchLoading(true);
    setViewMode("managers");
    setActiveButton("managers");
    setCurrentPage(1);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        throw new Error("User ID not found in localStorage");
      }
      const Id = user.id;

      const response = await api.get(
        `/users/?action=getFarmManager&user_created=${Id}&page=${currentPage}&records_number=${recordsPerPage}`
      );
      const managerData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setManagers(managerData);
      localStorage.setItem("managers", JSON.stringify(managerData));
      setTotalCount(response.data.total_count || managerData.length);
      setTotalPages(Math.ceil(response.data.total_count / recordsPerPage) || 1);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(
        err.response?.status === 401
          ? translations[language].toast.unauthorized
          : translations[language].toast.fetchError
      );
      if (err.response?.status === 401) navigate("/login");
      setManagers([]);
      localStorage.setItem("managers", JSON.stringify([]));
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleEditManager = (manager) => {
    const role =
      manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
        ? "Admin"
        : "Manager";
    const initialData = {
      id: manager.id,
      first_name: manager.user?.first_name || manager.first_name || "",
      last_name: manager.user?.last_name || manager.last_name || "",
      email: manager.user?.email || manager.email || "",
      phone: manager.user?.phone || manager.phone || "",
      password: manager.password || "",
      confirm_password: manager.password || "",
      role: role,
      farm_name: manager.farm_name || "",
      farm_location: manager.farm_location || "",
      farm_size: role === "Admin" ? manager.farm_size || "" : "",
      manager_experience: manager.manager_experience || "",
    };

    if (role === "Admin") {
      setEditAdminId(manager.id);
      setEditManagerId(null);
    } else {
      setEditManagerId(manager.id);
      setEditAdminId(null);
    }

    setFormData(initialData);
    setInitialFormData(initialData);
    setShowEditModal(true);
    setShowViewModal(false);
    setIsViewingEditing(true);
  };

  const handleViewManager = (manager) => {
    const role =
      manager.is_admin || (manager.is_super_farmer && !manager.is_manager)
        ? "Admin"
        : "Manager";
    const initialData = {
      id: manager.id,
      first_name: manager.user?.first_name || manager.first_name || "",
      last_name: manager.user?.last_name || manager.last_name || "",
      email: manager.user?.email || manager.email || "",
      phone: manager.user?.phone || manager.phone || "",
      password: manager.password || "",
      confirm_password: manager.password || "",
      role: role,
      farm_name: manager.farm_name || "",
      farm_location: manager.farm_location || "",
      farm_size: role === "Admin" ? manager.farm_size || "" : "",
      manager_experience: manager.manager_experience || "",
    };

    setFormData(initialData);
    setInitialFormData(initialData);

    if (role === "Admin") {
      setEditAdminId(manager.id);
      setEditManagerId(null);
    } else {
      setEditManagerId(manager.id);
      setEditAdminId(null);
    }

    setIsViewingEditing(false);
    setShowViewModal(true);
    setShowEditModal(false);
  };

  const handleUpdateManager = async (e) => {
    e.preventDefault();

    if (!formData.phone.trim()) {
      Swal.fire({
        icon: "error",
        title: translations[language].toast.phoneRequired,
      });
      return;
    }

    if (!initialFormData) {
      Swal.fire({
        icon: "error",
        title: "Error: Initial data not set. Please try again.",
      });
      setLoading(false);
      return;
    }

    const confirmResult = await Swal.fire({
      title: translations[language].edit,
      text: translations[language].toast.updateManager,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: translations[language].submit,
      cancelButtonText: translations[language].cancel,
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        throw new Error("Unauthorized: No token found.");
      }

      let changedPayload;
      let hasChanges = false;
      const entityId =
        formData.role === "Manager" ? editManagerId : editAdminId;

      if (!entityId) {
        throw new Error(`No valid ID found for ${formData.role}`);
      }

      if (formData.role === "Manager") {
        changedPayload = { id: entityId, action: "patchFarmManager" };
        if (formData.first_name.trim() !== initialFormData.first_name) {
          changedPayload.user = changedPayload.user || {};
          changedPayload.user.first_name = formData.first_name.trim();
          hasChanges = true;
        }
        if (formData.last_name.trim() !== initialFormData.last_name) {
          changedPayload.user = changedPayload.user || {};
          changedPayload.user.last_name = formData.last_name.trim();
          hasChanges = true;
        }
        if (formData.email.trim() !== initialFormData.email) {
          changedPayload.user = changedPayload.user || {};
          changedPayload.user.email = formData.email.trim();
          hasChanges = true;
        }
        if (formData.phone.trim() !== initialFormData.phone) {
          changedPayload.user = changedPayload.user || {};
          changedPayload.user.phone = formData.phone.trim();
          hasChanges = true;
        }
        if (formData.farm_name.trim() !== initialFormData.farm_name) {
          changedPayload.farm_name = formData.farm_name.trim() || null;
          hasChanges = true;
        }
        if (formData.farm_location.trim() !== initialFormData.farm_location) {
          changedPayload.farm_location = formData.farm_location.trim() || null;
          hasChanges = true;
        }
        if (
          parseInt(formData.manager_experience) !==
          parseInt(initialFormData.manager_experience)
        ) {
          changedPayload.manager_experience =
            parseInt(formData.manager_experience) || 0;
          hasChanges = true;
        }
      } else {
        changedPayload = { id: entityId, action: "patchFarmer" };
        if (
          formData.first_name.trim() !== initialFormData.first_name ||
          formData.last_name.trim() !== initialFormData.last_name ||
          formData.email.trim() !== initialFormData.email ||
          formData.phone.trim() !== initialFormData.phone
        ) {
          changedPayload.user = {};
          if (formData.first_name.trim() !== initialFormData.first_name) {
            changedPayload.user.first_name = formData.first_name.trim();
            hasChanges = true;
          }
          if (formData.last_name.trim() !== initialFormData.last_name) {
            changedPayload.user.last_name = formData.last_name.trim();
            hasChanges = true;
          }
          if (formData.email.trim() !== initialFormData.email) {
            changedPayload.user.email = formData.email.trim();
            hasChanges = true;
          }
          if (formData.phone.trim() !== initialFormData.phone) {
            changedPayload.user.phone = formData.phone.trim();
            hasChanges = true;
          }
        }
        if (formData.farm_name.trim() !== initialFormData.farm_name) {
          changedPayload.farm_name = formData.farm_name.trim() || "";
          hasChanges = true;
        }
        if (formData.farm_location.trim() !== initialFormData.farm_location) {
          changedPayload.farm_location = formData.farm_location.trim() || "";
          hasChanges = true;
        }
        if (formData.farm_size.trim() !== initialFormData.farm_size) {
          changedPayload.farm_size = formData.farm_size.trim()
            ? parseInt(formData.farm_size)
            : 0;
          hasChanges = true;
        }
      }

      if (!hasChanges) {
        Swal.fire({
          icon: "info",
          title: translations[language].toast.noChanges,
        });
        setShowEditModal(false);
        setShowViewModal(false);
        setLoading(false);
        return;
      }

      const response = await api.patch("/users/", changedPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedEntity = response.data.data;

      if (formData.role === "Manager") {
        const updatedManagers = managers.map((m) =>
          m.id === entityId ? { ...m, ...updatedEntity } : m
        );
        setManagers(updatedManagers);
        localStorage.setItem("managers", JSON.stringify(updatedManagers));
      } else {
        setViewMode("admins");
        await handleViewAdmin();
      }

      Swal.fire({
        icon: "success",
        title: translations[language].toast.managerUpdatedSuccess,
        showConfirmButton: false,
        timer: 2000,
      });

      setShowEditModal(false);
      setShowViewModal(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:
          err.response?.data?.message ||
          translations[language].toast.updateManagerError,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteManager = async (managerId) => {
    const result = await Swal.fire({
      title: `${translations[language].delete} ${formData.role}`,
      text: translations[language].toast.deleteManager,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: translations[language].delete,
      cancelButtonText: translations[language].cancel,
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    let previousManagers = null;
    let previousAdmins = null;
    if (formData.role === "Manager") {
      previousManagers = [...managers];
      setManagers(managers.filter((m) => m.id !== managerId));
      localStorage.setItem(
        "managers",
        JSON.stringify(managers.filter((m) => m.id !== managerId))
      );
    } else {
      previousAdmins = [...admins];
      setAdmins(admins.filter((a) => a.id !== managerId));
      localStorage.setItem(
        "admins",
        JSON.stringify(admins.filter((a) => a.id !== managerId))
      );
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");

      const deletePayload = {
        action: formData.role === "Manager" ? "delFarmManager" : "delFarmer",
        id: managerId,
        role: formData.role === "Manager" ? undefined : "farmer",
      };

      const response = await api.delete("/users/", {
        data: deletePayload,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 204) {
        if (
          formData.role === "Manager" &&
          managers.length === 1 &&
          currentPage > 1
        ) {
          setCurrentPage(currentPage - 1);
        } else if (
          formData.role !== "Manager" &&
          admins.length === 1 &&
          currentPage > 1
        ) {
          setCurrentPage(currentPage - 1);
        }
        setTotalCount((prev) => prev - 1);
        setTotalPages(Math.ceil((totalCount - 1) / recordsPerPage) || 1);

        await Swal.fire({
          title: translations[language].toast.deleted,
          text: translations[language].toast.deleteSuccess,
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
          role: "Manager",
          farm_name: "",
          farm_location: "",
          farm_size: "",
          manager_experience: "",
        });
        setInitialFormData(null);
        setEditManagerId(null);
        setEditAdminId(null);
        setShowViewModal(false);
        setShowEditModal(false);
        setIsViewingEditing(false);

        if (formData.role !== "Manager" && viewMode === "admins") {
          await handleViewAdmin();
        }
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      if (formData.role === "Manager" && previousManagers) {
        setManagers(previousManagers);
        localStorage.setItem("managers", JSON.stringify(previousManagers));
      } else if (previousAdmins) {
        setAdmins(previousAdmins);
        localStorage.setItem("admins", JSON.stringify(previousAdmins));
      }

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error_msg ||
        translations[language].toast.deleteManagerError ||
        `Failed to delete ${formData.role.toLowerCase()}. Please try again or contact support.`;

      await Swal.fire({
        title: translations[language].toast.error,
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEdit = () => {
    if (!isViewingEditing) {
      setInitialFormData(formData);
      setShowEditModal(true);
      setShowViewModal(false);
      setIsViewingEditing(true);
    } else {
      setShowEditModal(false);
      setShowViewModal(true);
      setIsViewingEditing(false);
    }
  };

  const openAddManagerModal = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      role: "Manager",
      farm_name: "",
      farm_location: "",
      farm_size: "",
      manager_experience: "",
    });
    setShowModal(true);
    setActiveButton("addManager");
  };

  const filteredData =
    viewMode === "admins"
      ? admins
          .flatMap((admin) => [admin, ...(admin.sub_farmers || [])])
          .filter(
            (item, index, self) =>
              item &&
              index === self.findIndex((a) => a.id === item.id) &&
              ((item.phone || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                (item.first_name || "")
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))
          )
      : managers.filter(
          (manager) =>
            manager &&
            ((manager.user?.phone || manager.phone)
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
              (manager.user?.first_name || manager.first_name)
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !fetchLoading) {
      setCurrentPage(newPage);
    }
  };

  const headerTitle =
    viewMode === "admins"
      ? translations[language].viewAdmin
      : translations[language].viewManager;

  const styles = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      margin: "10px 0",
    },
  };

  return (
    <div className="managers-container mb-5">
      <Header title={headerTitle} icon={FaUserTie} />
      <div className="container w-100">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-2 flex-md-wrap">
          {isSuperFarmer ? (
            <>
              <button
                className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
                  activeButton === "managers"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={handleViewManagers}
                disabled={loading}
              >
                <FaEye className="me-2" />
                {translations[language].viewManager}
              </button>
              <button
                className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
                  activeButton === "admins"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={handleViewAdmin}
                disabled={loading}
              >
                <FaEye className="me-2" />
                {translations[language].viewAdmin}
              </button>
              <button
                className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
                  activeButton === "addManager"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={openAddManagerModal}
                disabled={loading}
              >
                <FaPlus className="me-2" />
                {translations[language].addManager}
              </button>
            </>
          ) : (
            <>
              <div className="input-group" style={{ width: "180px" }}>
                <input
                  type="search"
                  className="form-control rounded border-success"
                  placeholder={translations[language].searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className={`btn btn-sm fw-bold d-flex align-items-center p-2 ${
                  activeButton === "addManager"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={openAddManagerModal}
                disabled={loading}
              >
                <FaPlus className="me-2" />
                {translations[language].addManager}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="managers-grid p-2">
        {fetchLoading ? (
          <div className="text-center m-auto">
            <Spinner />
          </div>
        ) : filteredData.length > 0 ? (
          viewMode === "admins" ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewManager({ ...item, is_admin: true })}
              >
                <li className="manager-name p-2" type="none">
                  {item.first_name || "Unknown"} {item.last_name || ""}
                </li>
                <span></span>
              </div>
            ))
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewManager(item)}
              >
                <li className="manager-name p-2" type="none">
                  {item.user?.first_name || item.first_name || "Unknown"}{" "}
                  {item.user?.last_name || item.last_name || ""}
                </li>
                <span></span>
              </div>
            ))
          )
        ) : (
          <p className="text-center text-muted mx-auto">
            {translations[language].noData ||
              (viewMode === "admins"
                ? "No sub-farmers found"
                : "No managers found")}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {translations[language].previous}
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {translations[language].next}
          </button>
        </div>
      )}
      {/* 
      <div className="managers-grid p-2">
        {fetchLoading && filteredData.length === 0 ? (
          <div className="text-center m-auto">
            <Spinner />
          </div>
        ) : filteredData.length > 0 ? (
          viewMode === "admins" ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewManager({ ...item, is_admin: true })}
              >
                <li className="manager-name p-2" type="none">
                  {item.first_name || "Unknown"} {item.last_name || ""}
                </li>
                <span></span>
              </div>
            ))
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="manager-card rounded d-flex justify-content-between align-items-center flex-wrap bg-white shadow-none border"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewManager(item)}
              >
                <li className="manager-name p-2" type="none">
                  {item.user?.first_name || item.first_name || "Unknown"}{" "}
                  {item.user?.last_name || item.last_name || ""}
                </li>
                <span></span>
              </div>
            ))
          )
        ) : (
          <p className="text-center text-muted mx-auto">
            {translations[language].noData ||
              (viewMode === "admins"
                ? "No sub-farmers found"
                : "No managers found")}
          </p>
        )}
      </div>

      {
      totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {translations[language].previous}
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {translations[language].next}
          </button>
        </div>
      )} */}

      <ModalForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isEditing={true}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleAddManager}
        handleDelete={() => handleDeleteManager(editManagerId)}
        language={language}
        formType="manager"
        viewMode={viewMode}
      />

      <ModalForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        isEditing={true}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleUpdateManager}
        handleDelete={() => handleDeleteManager(editManagerId || editAdminId)}
        language={language}
        formType="manager"
        viewMode={viewMode}
      />

      <ModalForm
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        isEditing={isViewingEditing}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleUpdateManager}
        handleDelete={() => handleDeleteManager(formData.id)}
        language={language}
        formType="manager"
        onEdit={handleToggleEdit}
        viewMode={viewMode}
      />

      <ToastContainer />
    </div>
  );
};

export default ManagersList;
