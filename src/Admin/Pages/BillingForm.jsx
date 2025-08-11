// import React, { useState, useEffect } from "react";
// import ModalForm from "../../Admin/Components/ModelForm";
// import Swal from "sweetalert2";
// import { FaTrash, FaEye, FaFileAlt, FaPlus } from "react-icons/fa";
// import api from "../../Api/axiosInstance";
// import Spinner from "../Spinner/Spinner";
// import { useLanguage } from "../../contexts/LanguageContext";
// import Header from "../Components/Header";

// const Billing = () => {
//   const { language } = useLanguage();
//   const [billings, setBillings] = useState([]);
//   const [farms, setFarms]= useState([]);
//   const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoadingFarms, setIsLoadingFarms] = useState(false);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const translations = {
//     en: {
//       title: "Billing Management",
//       addBilling: "Add Bill",
//       editBillingTitle: "Edit Billing",
//       searchPlaceholder: "Search by date...",
//       noBillingsFound: "No billings found.",
//       farm: "Farm Name",
//       product: "Product Name",
//       billDate: "Bill Date",
//       traderName: "Trader Name",
//       vehicleNumber: "Vehicle Number",
//       rate: "Rate (per quintal)",
//       trees: "Trees",
//       leaves: "Leaves (quintal)",
//       weight: "Weight (quintal)",
//       fruitStalk: "Fruit Stalk (quintal)",
//       discount: "Discount ( % )",
//       travellingAmount: "Travelling Amount",
//       managerAmount: "Manager Amount",
//       totalAmount: "Total Amount",
//       finalAmount: "Final Amount",
//       actions: "Actions",
//       submit: "Save",
//       delete: "Delete",
//       cancel: "Close",
//       deleteConfirm: "Are you sure you want to delete this billing?",
//       modalTitle: "Edit Billing",
//       edit: "Edit",
//       voiceInput: "Voice Input",
//       inKg: "In kg",
//     },
//     mr: {
//       title: "बिलिंग व्यवस्थापन",
//       addBilling: "बिलिंग जोडा",
//       editBillingTitle: "बिलिंग संपादित करा",
//       searchPlaceholder: "तारखेनुसार शोधा..",
//       noBillingsFound: "कोणतेही बिलिंग सापडले नाही.",
//       farm: "शेतीचे नाव",
//       product: "उत्पादनाचे नाव",
//       billDate: "बिल तारीख",
//       traderName: "व्यापारी नाव",
//       vehicleNumber: "वाहन क्रमांक",
//       rate: "दर (प्रति क्विंटल)",
//       trees: "झाडे",
//       leaves: "पाने (क्विंटल)",
//       weight: "वजन (क्विंटल)",
//       fruitStalk: "देठ (क्विंटल)",
//       discount: "सवलत",
//       travellingAmount: "प्रवास खर्च",
//       managerAmount: "व्यवस्थापक रक्कम",
//       totalAmount: "एकूण रक्कम",
//       finalAmount: "अंतिम रक्कम",
//       actions: "क्रिया",
//       submit: "जतन करा",
//       delete: "हटवा",
//       cancel: "बंद करा",
//       deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
//       modalTitle: "बिलिंग संपादित करा",
//       edit: "संपादन",
//       voiceInput: "आवाज इनपुट",
//       inKg: "किलोग्राममध्ये",
//     },
//   };

//   useEffect(() => {
//     fetchBillings();
//   }, []);

//   const fetchBillings = async () => {
//     setFetchLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const Id = user?.id;

//       const response = await api.get(`/billing/?action=getBilling&user_created=${Id}`);
//       setBillings(response.data.data || []);
//     } catch (error) {
//       setBillings([]);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const fetchFarms = async () => {
//     if (farms.length > 0) return;
//     setIsLoadingFarms(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const farmerId = user?.farmer_id;

//       if (!farmerId) {
//         throw new Error("Farmer ID not found in user data");
//       }
//       const response = await api.get(`/farm/?action=getFarm&farmer=${farmerId}`);
//       setFarms(response.data.data || []);
//       await fetchProducts();
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to fetch farms.",
//         "error"
//       );
//     } finally {
//       setIsLoadingFarms(false);
//     }
//   };

//   const fetchProducts = async () => {
//     if (products.length > 0) return;
//     setIsLoadingProducts(true);
//     try {
//       const response = await api.get("/master_data/?action=getProduct");
//       setProducts(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to fetch products.",
//         "error"
//       );
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleAdd = () => {
//     setFormData({
//       farm_id: "",
//       product_id: "",
//       bill_date: "",
//       trader_name: "",
//       vehicle_number: "",
//       rate: "",
//       trees: "",
//       leaves: "",
//       weight: "",
//       fruit_stalk: "",
//       discount: "",
//       travelling_amount: "",
//     });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleView = (billing) => {
//     setFormData({
//       id: billing.id,
//       farm_id: billing.farm.id || "",
//       farm_name: billing.farm.name || "",
//       product_id: billing.product.id || "",
//       product_name: billing.product.name || "",
//       bill_date: billing.bill_date || "",
//       trader_name: billing.trader_name || "",
//       vehicle_number: billing.vehicle_number || "",
//       rate: billing.rate || "",
//       trees: billing.trees || "",
//       leaves: billing.leaves || "",
//       weight: billing.weight || "",
//       fruit_stalk: billing.fruit_stalk || "",
//       discount: billing.discount || "",
//       travelling_amount: billing.travelling_amount || "",
//       manager_amount: billing.manager_amount || "0",
//       total_amount: billing.total_amount || "",
//     });
//     setIsEditing(false);
//     setIsModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePostBilling = async () => {
//     try {
//       const payload = {
//         action: "postBilling",
//         farm_id: parseInt(formData.farm_id),
//         product_id: parseInt(formData.product_id),
//         bill_date: formData.bill_date,
//         trader_name: formData.trader_name,
//         vehicle_number: formData.vehicle_number,
//         rate: parseFloat(formData.rate) || 0,
//         trees: parseInt(formData.trees) || 0,
//         leaves: parseInt(formData.leaves) || 0,
//         weight: parseFloat(formData.weight) || 0,
//         fruit_stalk: parseFloat(formData.fruit_stalk) || 0,
//         discount: parseFloat(formData.discount) || 0,
//         travelling_amount: parseFloat(formData.travelling_amount) || 0,
//       };

//       await api.post("/billing/", payload);
//       Swal.fire("Success", translations[language].submitBilling || "Billing submitted successfully", "success");
//       fetchBillings();
//       setIsModalOpen(false);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to create billing.",
//         "error"
//       );
//     }
//   };

//   const handleSave = async () => {
//     handlePostBilling();
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: translations[language].deleteConfirm,
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: translations[language].delete,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (result.isConfirmed) {
//       try {
//         const payload = { action: "deleteBilling", id: id.toString() };
//         await api.delete("/billing/", {
//           data: payload,
//           headers: { "Content-Type": "application/json" },
//         });
//         Swal.fire("Deleted", translations[language].delete, "success");
//         fetchBillings();
//         setIsModalOpen(false);
//       } catch (error) {
//         Swal.fire(
//           "Error",
//           error.response?.data?.message || translations[language].deleteConfirm,
//           "error"
//         );
//       }
//     } else {
//       Swal.fire("Cancelled", "Billing was not deleted.", "info");
//     }
//   };

//   const filteredBillings = billings.filter((billing) => {
//     const getSearchableString = (value) => {
//       if (typeof value === "string") return value.toLowerCase();
//       if (value && typeof value === "object" && value.name) return value.name.toLowerCase();
//       return "";
//     };

//     const traderName = getSearchableString(billing.trader_name);
//     const billDate = getSearchableString(billing.bill_date);
//     const farm = getSearchableString(billing.farm);
//     const product = getSearchableString(billing.product);
//     const fruitStalk = getSearchableString(billing.fruit_stalk);
//     const discount = getSearchableString(billing.discount);

//     return (
//       traderName.includes(searchQuery.toLowerCase()) ||
//       billDate.includes(searchQuery.toLowerCase()) ||
//       farm.includes(searchQuery.toLowerCase()) ||
//       product.includes(searchQuery.toLowerCase()) ||
//       fruitStalk.includes(searchQuery.toLowerCase()) ||
//       discount.includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div className="container p-0">
//       <div>
//         <Header title={translations[language].title} icon={FaFileAlt} />
//       </div>

// <div className="container">
//   <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
//     <div className="input-group" style={{ flex: "1", width: "180px" }}>
//       <input
//         type="search"
//         className="form-control rounded border-success"
//         placeholder={translations[language].searchPlaceholder}
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//     </div>
//     <button
//       className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//       onClick={handleAdd}
//     >
//       <FaPlus className="me-2" /> {translations[language].addBilling}
//     </button>
//   </div>
// </div>

//       <div className="table-responsive mt-3">
//         {fetchLoading && billings.length === 0 ? (
//           <div className="text-center m-auto">
//             <Spinner />
//           </div>
//         ) : (
//           <table className="table table-striped table-bordered">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <th scope="col">{translations[language].billDate}</th>
//                 <th scope="col">{translations[language].farm}</th>
//                 <th scope="col">{translations[language].product}</th>
//                 <th scope="col">{translations[language].traderName}</th>
//                 <th scope="col">{translations[language].actions}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBillings.length > 0 ? (
//                 filteredBillings.map((billing) => (
//                   <tr key={billing.id}>
//                     <td>{billing.bill_date}</td>
//                     <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
//                       {billing.farm.name || "N/A"}
//                     </td>
//                     <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
//                       {billing.product.name || "N/A"}
//                     </td>
//                     <td>{billing.trader_name}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <button
//                           className="btn btn-info btn-sm d-flex align-items-center"
//                           onClick={() => handleView(billing)}
//                           title={translations[language].viewBilling || "View Billing"}
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           className="btn btn-danger btn-sm d-flex align-items-center"
//                           onClick={() => handleDelete(billing.id)}
//                           title={translations[language].delete}
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     {translations[language].noBillingsFound}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <ModalForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         isEditing={isEditing}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleSave}
//         handleDelete={handleDelete}
//         language={language}
//         formType="billing"
//         farms={farms}
//         products={products}
//         fetchFarms={fetchFarms}
//         isLoadingFarms={isLoadingFarms}
//         isLoadingProducts={isLoadingProducts}
//       />
//     </div>
//   );
// };

// export default Billing;

// import React, { useState, useEffect } from "react";
// import ModalForm from "../../Admin/Components/ModelForm";
// import Swal from "sweetalert2";
// import { FaTrash, FaEye, FaFileAlt, FaPlus, FaArrowLeft } from "react-icons/fa";
// import api from "../../Api/axiosInstance";
// import Spinner from "../Spinner/Spinner";
// import { useLanguage } from "../../contexts/LanguageContext";
// import Header from "../Components/Header";

// const Billing = () => {
//   const { language } = useLanguage();
//   const [billings, setBillings] = useState([]);
//   const [farmVillages, setFarmVillages] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedVillage, setSelectedVillage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoadingVillages, setIsLoadingVillages] = useState(false);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const translations = {
//     en: {
//       title: "Billing Management",
//       addBilling: "Add Bill",
//       editBillingTitle: "Edit Billing",
//       searchPlaceholder: "Search by date...",
//       noBillingsFound: "No billings found.",
//       village: "Farm Village",
//       product: "Product Name",
//       billDate: "Bill Date",
//       traderName: "Trader Name",
//       vehicleNumber: "Vehicle Number",
//       rate: "Rate (per quintal)",
//       trees: "Trees",
//       leaves: "Leaves (quintal)",
//       weight: "Weight (quintal)",
//       fruitStalk: "Fruit Stalk (quintal)",
//       discount: "Discount ( % )",
//       travellingAmount: "Travelling Amount",
//       managerAmount: "Manager Amount",
//       totalAmount: "Total Amount",
//       finalAmount: "Final Amount",
//       actions: "Actions",
//       submit: "Save",
//       delete: "Delete",
//       cancel: "Close",
//       deleteConfirm: "Are you sure you want to delete this billing?",
//       modalTitle: "Edit Billing",
//       edit: "Edit",
//       voiceInput: "Voice Input",
//       inKg: "In kg",
//       selectVillage: "Select a Farm Village",
//       backToVillages: "Back to Farm Villages",
//       villageListTitle: "Farm Villages",
//       noVillages: "No farm villages found.",
//     },
//     mr: {
//       title: "बिलिंग व्यवस्थापन",
//       addBilling: "बिलिंग जोडा",
//       editBillingTitle: "बिलिंग संपादित करा",
//       searchPlaceholder: "तारखेनुसार शोधा..",
//       noBillingsFound: "को redactीणतेही बिलिंग सापडले नाही.",
//       village: "शेती खेडे",
//       product: "उत्पादनाचे नाव",
//       billDate: "बिल तारीख",
//       traderName: "व्यापारी नाव",
//       vehicleNumber: "वाहन क्रमांक",
//       rate: "दर (प्रति क्विंटल)",
//       trees: "झाडे",
//       leaves: "पाने (क्विंटल)",
//       weight: "वजन (क्विंटल)",
//       fruitStalk: "देठ (क्विंटल)",
//       discount: "सवलत",
//       travellingAmount: "प्रवास खर्च",
//       managerAmount: "व्यवस्थापक रक्कम",
//       totalAmount: "एकूण रक्कम",
//       finalAmount: "अंतिम रक्कम",
//       actions: "क्रिया",
//       submit: "जतन करा",
//       delete: "हटवा",
//       cancel: "बंद करा",
//       deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
//       modalTitle: "बिलिंग संपादित करा",
//       edit: "संपादन",
//       voiceInput: "आवाज इनपुट",
//       inKg: "किलोग्राममध्ये",
//       selectVillage: "शेती खेडे निवडा",
//       backToVillages: "शेती खेड्यांकडे परत जा",
//       villageListTitle: "शेती खेडी",
//       noVillages: "कोणतीही शेती खेडी सापडली नाहीत.",
//     },
//   };

//   // Styles from the reference code
//   const styles = {
//     managerListContainer: {
//       height: "100%",
//       width: "100%",
//       overflowY: "auto",
//     },
//     titleContainer: {
//       padding: "10px",
//       textAlign: "center",
//     },
//     managerCard: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       cursor: "pointer",
//       padding: "10px",
//       margin: "10px",
//     },
//     managerName: {
//       fontSize: "1.1rem",
//     },
//     noItems: {
//       textAlign: "center",
//       marginTop: "20px",
//     },
//     backButton: {
//       background: "none",
//       padding: "5px",
//     },
//     backIcon: {
//       fontSize: "1.2rem",
//     },
//     addButton: {
//       padding: "5px 10px",
//       borderRadius: "5px",
//     },
//     amountContainer: {
//       display: "flex",
//       justifyContent: "space-around",
//       padding: "10px",
//       backgroundColor: "#f8f9fa",
//     },
//     amountField: {
//       textAlign: "center",
//     },
//     amountLabel: {
//       fontWeight: "bold",
//     },
//     amountValue: {
//       fontSize: "1.2rem",
//     },
//     warningText: {
//       textAlign: "center",
//       color: "red",
//       margin: "10px",
//     },
//     expenseActions: {
//       width: "25%",
//       textAlign: "center",
//     },
//   };

//   useEffect(() => {
//     fetchFarmVillages();
//   }, []);

//   const fetchFarmVillages = async () => {
//     setIsLoadingVillages(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const farmerId = user?.farmer_id;

//       if (!farmerId) {
//         throw new Error("Farmer ID not found in user data");
//       }
//       const response = await api.get(`/farm/?action=getFarmVillage&farmer=${farmerId}`);
//       setFarmVillages(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to fetch farm villages.",
//         "error"
//       );
//     } finally {
//       setIsLoadingVillages(false);
//     }
//   };

//   const fetchBillings = async (villageId) => {
//     setFetchLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const Id = user?.id;

//       const response = await api.get(`/billing/?action=getBilling&user_created=${Id}&village_id=${villageId}`);
//       setBillings(response.data.data || []);
//     } catch (error) {
//       setBillings([]);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     if (products.length > 0) return;
//     setIsLoadingProducts(true);
//     try {
//       const response = await api.get("/master_data/?action=getProduct");
//       setProducts(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to fetch products.",
//         "error"
//       );
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleVillageClick = (village) => {
//     setSelectedVillage(village);
//     fetchBillings(village.village.id); // Use village.village.id from API response
//   };

//   const handleBackToVillages = () => {
//     setSelectedVillage(null);
//     setBillings([]);
//   };

//   const handleAdd = () => {
//     setFormData({
//       village_id: selectedVillage?.village.id || "",
//       product_id: "",
//       bill_date: "",
//       trader_name: "",
//       vehicle_number: "",
//       rate: "",
//       trees: "",
//       leaves: "",
//       weight: "",
//       fruit_stalk: "",
//       discount: "",
//       travelling_amount: "",
//     });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleView = (billing) => {
//     setFormData({
//       id: billing.id,
//       village_id: billing.village?.id || "",
//       village_name: billing.village?.name || "",
//       product_id: billing.product.id || "",
//       product_name: billing.product.name || "",
//       bill_date: billing.bill_date || "",
//       trader_name: billing.trader_name || "",
//       vehicle_number: billing.vehicle_number || "",
//       rate: billing.rate || "",
//       trees: billing.trees || "",
//       leaves: billing.leaves || "",
//       weight: billing.weight || "",
//       fruit_stalk: billing.fruit_stalk || "",
//       discount: billing.discount || "",
//       travelling_amount: billing.travelling_amount || "",
//       manager_amount: billing.manager_amount || "0",
//       total_amount: billing.total_amount || "",
//     });
//     setIsEditing(false);
//     setIsModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePostBilling = async () => {
//     try {
//       const payload = {
//         action: "postBilling",
//         village_id: parseInt(formData.village_id),
//         product_id: parseInt(formData.product_id),
//         bill_date: formData.bill_date,
//         trader_name: formData.trader_name,
//         vehicle_number: formData.vehicle_number,
//         rate: parseFloat(formData.rate) || 0,
//         trees: parseInt(formData.trees) || 0,
//         leaves: parseInt(formData.leaves) || 0,
//         weight: parseFloat(formData.weight) || 0,
//         fruit_stalk: parseFloat(formData.fruit_stalk) || 0,
//         discount: parseFloat(formData.discount) || 0,
//         travelling_amount: parseFloat(formData.travelling_amount) || 0,
//       };

//       await api.post("/billing/", payload);
//       Swal.fire("Success", translations[language].submitBilling || "Billing submitted successfully", "success");
//       fetchBillings(selectedVillage.village.id);
//       setIsModalOpen(false);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].fetchError || "Failed to create billing.",
//         "error"
//       );
//     }
//   };

//   const handleSave = async () => {
//     handlePostBilling();
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: translations[language].deleteConfirm,
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: translations[language].delete,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (result.isConfirmed) {
//       try {
//         const payload = { action: "deleteBilling", id: id.toString() };
//         await api.delete("/billing/", {
//           data: payload,
//           headers: { "Content-Type": "application/json" },
//         });
//         Swal.fire("Deleted", translations[language].delete, "success");
//         fetchBillings(selectedVillage.village.id);
//         setIsModalOpen(false);
//       } catch (error) {
//         Swal.fire(
//           "Error",
//           error.response?.data?.message || translations[language].deleteConfirm,
//           "error"
//         );
//       }
//     } else {
//       Swal.fire("Cancelled", "Billing was not deleted.", "info");
//     }
//   };

//   const filteredBillings = billings.filter((billing) => {
//     const getSearchableString = (value) => {
//       if (typeof value === "string") return value.toLowerCase();
//       if (value && typeof value === "object" && value.name) return value.name.toLowerCase();
//       return "";
//     };

//     const traderName = getSearchableString(billing.trader_name);
//     const billDate = getSearchableString(billing.bill_date);
//     const village = getSearchableString(billing.village);
//     const product = getSearchableString(billing.product);
//     const fruitStalk = getSearchableString(billing.fruit_stalk);
//     const discount = getSearchableString(billing.discount);

//     return (
//       traderName.includes(searchQuery.toLowerCase()) ||
//       billDate.includes(searchQuery.toLowerCase()) ||
//       village.includes(searchQuery.toLowerCase()) ||
//       product.includes(searchQuery.toLowerCase()) ||
//       fruitStalk.includes(searchQuery.toLowerCase()) ||
//       discount.includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div className="container p-0 flex-grow-1 overflow-hidden">
//       <div>
//         <Header title={translations[language].title} icon={FaFileAlt} />
//       </div>
//       <div className="container py-2">
//         <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
//           <div className="input-group" style={{ flex: "1", width: "180px" }}>
//             <input
//               type="search"
//               className="form-control rounded border-success"
//               placeholder={translations[language].searchPlaceholder}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <button
//             className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//             onClick={handleAdd}
//           >
//             <FaPlus className="me-2" /> {translations[language].addBilling}
//           </button>
//         </div>
//       </div>

//       {selectedVillage ? (
//         <div className="row h-100">
//           <div className="col-12 d-flex flex-column" style={{ height: "100%" }}>
//             {/* <div
//               style={styles.titleContainer}
//               className="bg-success d-flex align-items-center"
//             >
//               <button
//                 style={styles.backButton}
//                 onClick={handleBackToVillages}
//                 className="text-white border-0"
//               >
//                 <FaArrowLeft style={styles.backIcon} />
//               </button>
//               <h3 className="text-white m-0 flex-grow-1 text-center">
//                 {translations[language].title}
//               </h3>
//               <button
//                 style={styles.addButton}
//                 className="bg-white text-success btn-sm"
//                 onClick={handleAdd}
//               >
//                 <FaPlus /> {translations[language].addBilling}
//               </button>
//             </div> */}
//             {/* <div className="container py-3">
//               <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
//                 <div className="input-group" style={{ flex: "1", width: "180px" }}>
//                   <input
//                     type="search"
//                     className="form-control rounded border-success"
//                     placeholder={translations[language].searchPlaceholder}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div> */}
//             <div style={{ flex: 1, overflow: "hidden" }}>
//               {fetchLoading && billings.length === 0 ? (
//                 <div className="text-center my-5">
//                   <Spinner />
//                 </div>
//               ) : (
//                 <div style={{ height: "100%" }}>
//                   <table
//                     className="table table-striped table-bordered mb-0"
//                     style={{ tableLayout: "fixed" }}
//                   >
//                     <thead className="bg-success text-white">
//                       <tr>
//                         <th scope="col">{translations[language].billDate}</th>
//                         <th scope="col">{translations[language].village}</th>
//                         <th scope="col">{translations[language].product}</th>
//                         <th scope="col">{translations[language].traderName}</th>
//                         <th scope="col">{translations[language].actions}</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredBillings.length > 0 ? (
//                         filteredBillings.map((billing) => (
//                           <tr key={billing.id}>
//                             <td>{billing.bill_date}</td>
//                             <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
//                               {billing.village?.name || "N/A"}
//                             </td>
//                             <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
//                               {billing.product.name || "N/A"}
//                             </td>
//                             <td>{billing.trader_name}</td>
//                             <td style={styles.expenseActions}>
//                               <div className="d-flex gap-2">
//                                 <button
//                                   className="btn btn-info btn-sm d-flex align-items-center"
//                                   onClick={() => handleView(billing)}
//                                   title={translations[language].viewBilling || "View Billing"}
//                                 >
//                                   <FaEye />
//                                 </button>
//                                 <button
//                                   className="btn btn-danger btn-sm d-flex align-items-center"
//                                   onClick={() => handleDelete(billing.id)}
//                                   title={translations[language].delete}
//                                 >
//                                   <FaTrash />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="5" className="text-center">
//                             {translations[language].noBillingsFound}
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div style={{ height: "100%", overflowY: "auto" }}>
//           <div style={styles.managerListContainer}>
//             <div style={styles.titleContainer} className="bg-success rounded border-success">
//               <h3 className="text-white m-0">{translations[language].villageListTitle}</h3>
//             </div>
//             {isLoadingVillages ? (
//               <Spinner />
//             ) : farmVillages.length > 0 ? (
//               <div className="bg-white">
//                 {farmVillages.map((village) => (
//                   <div
//                     key={village.id}
//                     className="border rounded shadow-none"
//                     style={styles.managerCard}
//                     onClick={() => handleVillageClick(village)}
//                   >
//                     <li type="none" style={styles.managerName}>
//                       {village.village.name}
//                     </li>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p style={styles.noItems}>{translations[language].noVillages}</p>
//             )}
//           </div>
//         </div>
//       )}

//       <ModalForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         isEditing={isEditing}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleSave}
//         handleDelete={handleDelete}
//         language={language}
//         formType="billing"
//         villages={farmVillages}
//         products={products}
//         fetchVillages={fetchFarmVillages}
//         isLoadingVillages={isLoadingVillages}
//         isLoadingProducts={isLoadingProducts}
//       />
//     </div>
//   );
// };

// export default Billing;

// import React, { useState, useEffect } from "react";
// import ModalForm from "../../Admin/Components/ModelForm";
// import Swal from "sweetalert2";
// import { FaTrash, FaEye, FaFileAlt, FaPlus, FaArrowLeft } from "react-icons/fa";
// import api from "../../Api/axiosInstance";
// import Spinner from "../Spinner/Spinner";
// import { useLanguage } from "../../contexts/LanguageContext";
// import Header from "../Components/Header";

// const Billing = () => {
//   const { language } = useLanguage();
//   const [billings, setBillings] = useState([]);
//   const [farmVillages, setFarmVillages] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedVillage, setSelectedVillage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoadingVillages, setIsLoadingVillages] = useState(false);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const translations = {
//     en: {
//       title: "Billing Management",
//       addBilling: "Add Bill",
//       editBillingTitle: "Edit Billing",
//       searchPlaceholder: "Search by date...",
//       noBillingsFound: "No billings found.",
//       village: "Farm Village",
//       product: "Product Name",
//       billDate: "Bill Date",
//       traderName: "Trader Name",
//       vehicleNumber: "Vehicle Number",
//       rate: "Rate (per quintal)",
//       trees: "Trees",
//       leaves: "Leaves (quintal)",
//       weight: "Weight (quintal)",
//       fruitStalk: "Fruit Stalk (quintal)",
//       discount: "Discount ( % )",
//       travellingAmount: "Travelling Amount",
//       managerAmount: "Manager Amount",
//       totalAmount: "Total Amount",
//       finalAmount: "Final Amount",
//       actions: "Actions",
//       submit: "Save",
//       delete: "Delete",
//       cancel: "Close",
//       deleteConfirm: "Are you sure you want to delete this billing?",
//       modalTitle: "Edit Billing",
//       edit: "Edit",
//       voiceInput: "Voice Input",
//       inKg: "In kg",
//       selectVillage: "Select a Farm Village",
//       backToVillages: "Back to Farm Villages",
//       villageListTitle: "Farm Villages",
//       noVillages: "No farm villages found.",
//     },
//     mr: {
//       title: "बिलिंग व्यवस्थापन",
//       addBilling: "बिलिंग जोडा",
//       editBillingTitle: "बिलिंग संपादित करा",
//       searchPlaceholder: "तारखेनुसार शोधा..",
//       noBillingsFound: "कोणतेही बिलिंग सापडले नाही.",
//       village: "शेती खेडे",
//       product: "उत्पादनाचे नाव",
//       billDate: "बिल तारीख",
//       traderName: "व्यापारी नाव",
//       vehicleNumber: "वाहन क्रमांक",
//       rate: "दर (प्रति क्विंटल)",
//       trees: "झाडे",
//       leaves: "पाने (क्विंटल)",
//       weight: "वजन (क्विंटल)",
//       fruitStalk: "देठ (क्विंटल)",
//       discount: "सवलत",
//       travellingAmount: "प्रवास खर्च",
//       managerAmount: "व्यवस्थापक रक्कम",
//       totalAmount: "एकूण रक्कम",
//       finalAmount: "अंतिम रक्कम",
//       actions: "क्रिया",
//       submit: "जतन करा",
//       delete: "हटवा",
//       cancel: "बंद करा",
//       deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
//       modalTitle: "बिलिंग संपादित करा",
//       edit: "संपादन",
//       voiceInput: "आवाज इनपुट",
//       inKg: "किलोग्राममध्ये",
//       selectVillage: "शेती खेडे निवडा",
//       backToVillages: "शेती खेड्यांकडे परत जा",
//       villageListTitle: "शेती खेडी",
//       noVillages: "कोणतीही शेती खेडी सापडली नाहीत.",
//     },
//   };

//   // Styles optimized for responsiveness
//   const styles = {
//     managerListContainer: {
//       height: "100%",
//       width: "100%",
//       overflowY: "auto",
//       padding: "0 10px",
//     },
//     titleContainer: {
//       padding: "10px",
//       display: "flex",
//       justifyContent: "center", // Center village names
//       alignItems: "center",
//       // justifyContent: "space-between",
//       flexWrap: "wrap",
//       gap: "10px",
//       minHeight: "50px",
//     },
//     managerCard: {
//       display: "flex",
//       justifyContent: "center", // Center village names
//       alignItems: "center",
//       cursor: "pointer",
//       padding: "10px",
//       margin: "10px 0",
//       borderRadius: "5px",
//     },
//     managerName: {
//       fontSize: "clamp(0.9rem, 4vw, 1.1rem)",
//       fontWeight: "500",
//       textAlign: "center", // Ensure text is centered
//     },
//     noItems: {
//       textAlign: "center",
//       marginTop: "20px",
//       fontSize: "clamp(0.9rem, 4vw, 1rem)",
//     },
//     backButton: {
//       background: "none",
//       padding: "5px",
//       fontSize: "clamp(1rem, 3vw, 1.2rem)",
//     },
//     backIcon: {
//       fontSize: "clamp(1rem, 3vw, 1.2rem)",
//     },
//     addButton: {
//       padding: "5px 10px",
//       borderRadius: "5px",
//       fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
//       whiteSpace: "nowrap",
//     },
//     searchContainer: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "10px",
//       justifyContent: "center",
//       alignItems: "center",
//       margin: "10px 0",
//       width: "100%",
//     },
//     expenseActions: {
//       textAlign: "center",
//       padding: "5px",
//     },
//   };

//   useEffect(() => {
//     fetchFarmVillages();
//   }, []);

//   const fetchFarmVillages = async () => {
//     setIsLoadingVillages(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const farmerId = user?.farmer_id;

//       if (!farmerId) {
//         throw new Error("Farmer ID not found in user data");
//       }
//       const response = await api.get(
//         `/farm/?action=getFarmVillage&farmer=${farmerId}`
//       );
//       setFarmVillages(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message ||
//           translations[language].fetchError ||
//           "Failed to fetch farm villages.",
//         "error"
//       );
//     } finally {
//       setIsLoadingVillages(false);
//     }
//   };

//   const fetchBillings = async (villageId) => {
//     setFetchLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const Id = user?.id;

//       const response = await api.get(
//         `/billing/?action=getBilling&user_created=${Id}&village_id=${villageId}`
//       );
//       setBillings(response.data.data || []);
//     } catch (error) {
//       setBillings([]);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     if (products.length > 0) return;
//     setIsLoadingProducts(true);
//     try {
//       const response = await api.get("/master_data/?action=getProduct");
//       setProducts(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message ||
//           translations[language].fetchError ||
//           "Failed to fetch products.",
//         "error"
//       );
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleVillageClick = (village) => {
//     setSelectedVillage(village);
//     fetchBillings(village.village.id);
//   };

//   const handleBackToVillages = () => {
//     setSelectedVillage(null);
//     setBillings([]);
//     setSearchQuery("");
//   };

//   const handleAdd = () => {
//     setFormData({
//       village_id: selectedVillage?.village.id || "",
//       product_id: "",
//       bill_date: "",
//       trader_name: "",
//       vehicle_number: "",
//       rate: "",
//       trees: "",
//       leaves: "",
//       weight: "",
//       fruit_stalk: "",
//       discount: "",
//       travelling_amount: "",
//     });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleView = (billing) => {
//     setFormData({
//       id: billing.id,
//       village_id: billing.village?.id || "",
//       village_name: billing.village?.name || "",
//       product_id: billing.product.id || "",
//       product_name: billing.product.name || "",
//       bill_date: billing.bill_date || "",
//       trader_name: billing.trader_name || "",
//       vehicle_number: billing.vehicle_number || "",
//       rate: billing.rate || "",
//       trees: billing.trees || "",
//       leaves: billing.leaves || "",
//       weight: billing.weight || "",
//       fruit_stalk: billing.fruit_stalk || "",
//       discount: billing.discount || "",
//       travelling_amount: billing.travelling_amount || "",
//       manager_amount: billing.manager_amount || "0",
//       total_amount: billing.total_amount || "",
//     });
//     setIsEditing(false);
//     setIsModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePostBilling = async () => {
//     try {
//       const payload = {
//         action: "postBilling",
//         village_id: parseInt(formData.village_id),
//         product_id: parseInt(formData.product_id),
//         bill_date: formData.bill_date,
//         trader_name: formData.trader_name,
//         vehicle_number: formData.vehicle_number,
//         rate: parseFloat(formData.rate) || 0,
//         trees: parseInt(formData.trees) || 0,
//         leaves: parseInt(formData.leaves) || 0,
//         weight: parseFloat(formData.weight) || 0,
//         fruit_stalk: parseFloat(formData.fruit_stalk) || 0,
//         discount: parseFloat(formData.discount) || 0,
//         travelling_amount: parseFloat(formData.travelling_amount) || 0,
//       };

//       await api.post("/billing/", payload);
//       Swal.fire(
//         "Success",
//         translations[language].submitBilling ||
//           "Billing submitted successfully",
//         "success"
//       );
//       fetchBillings(selectedVillage.village.id);
//       setIsModalOpen(false);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message ||
//           translations[language].fetchError ||
//           "Failed to create billing.",
//         "error"
//       );
//     }
//   };

//   const handleSave = async () => {
//     handlePostBilling();
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: translations[language].deleteConfirm,
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: translations[language].delete,
//       cancelButtonText: translations[language].cancel,
//     });

//     if (result.isConfirmed) {
//       try {
//         const payload = { action: "deleteBilling", id: id.toString() };
//         await api.delete("/billing/", {
//           data: payload,
//           headers: { "Content-Type": "application/json" },
//         });
//         Swal.fire("Deleted", translations[language].delete, "success");
//         fetchBillings(selectedVillage.village.id);
//         setIsModalOpen(false);
//       } catch (error) {
//         Swal.fire(
//           "Error",
//           error.response?.data?.message || translations[language].deleteConfirm,
//           "error"
//         );
//       }
//     } else {
//       Swal.fire("Cancelled", "Billing was not deleted.", "info");
//     }
//   };

//   const filteredBillings = billings.filter((billing) => {
//     const getSearchableString = (value) => {
//       if (typeof value === "string") return value.toLowerCase();
//       if (value && typeof value === "object" && value.name)
//         return value.name.toLowerCase();
//       return "";
//     };

//     const traderName = getSearchableString(billing.trader_name);
//     const billDate = getSearchableString(billing.bill_date);
//     const village = getSearchableString(billing.village);
//     const product = getSearchableString(billing.product);
//     const fruitStalk = getSearchableString(billing.fruit_stalk);
//     const discount = getSearchableString(billing.discount);

//     return (
//       traderName.includes(searchQuery.toLowerCase()) ||
//       billDate.includes(searchQuery.toLowerCase()) ||
//       village.includes(searchQuery.toLowerCase()) ||
//       product.includes(searchQuery.toLowerCase()) ||
//       fruitStalk.includes(searchQuery.toLowerCase()) ||
//       discount.includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div
//       className="container-fluid p-0 flex-grow-1 d-flex flex-column"
//       style={{ height: "100vh" }}
//     >
//       <div>
//         <Header title={translations[language].title} icon={FaFileAlt} />
//       </div>

//       {selectedVillage ? (
//         <div className="row flex-grow-1 overflow-hidden mx-0">
//           <div
//             className="col-12 d-flex flex-column px-0"
//             style={{ height: "100%" }}
//           >
//             {/* Search and Add Button Container */}
//             <div style={styles.searchContainer}>
//               <div className="d-flex align-items-center gap-2 flex-nowrap justify-content-between w-70">
//                 <div
//                   className="input-group"
//                   style={{ maxWidth: "300px", width: "100%" }}
//                 >
//                   <input
//                     type="search"
//                     className="form-control rounded border-success"
//                     placeholder={translations[language].searchPlaceholder}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//                 <button
//                   style={styles.addButton}
//                   className="bg-white text-success btn-sm"
//                   onClick={handleAdd}
//                 >
//                   <FaPlus className="me-1" />{" "}
//                   {translations[language].addBilling}
//                 </button>
//               </div>
//             </div>
//             {/* Billing Table */}
//             <div className="flex-grow-1 overflow-auto">
//               {fetchLoading && billings.length === 0 ? (
//                 <div className="text-center my-5">
//                   <Spinner />
//                 </div>
//               ) : (
//                 <div className="table-responsive" style={{ height: "100%" }}>
//                   <table
//                     className="table table-striped table-bordered mb-0"
//                     style={{ tableLayout: "auto", width: "100%" }}
//                   >
//                     <thead className="bg-success text-white">
//                       <tr>
//                         <th scope="col" className="text-nowrap">
//                           {translations[language].billDate}
//                         </th>
//                         <th scope="col" className="text-nowrap">
//                           {translations[language].village}
//                         </th>
//                         <th scope="col" className="text-nowrap">
//                           {translations[language].product}
//                         </th>
//                         <th scope="col" className="text-nowrap">
//                           {translations[language].traderName}
//                         </th>
//                         <th scope="col" className="text-nowrap">
//                           {translations[language].actions}
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredBillings.length > 0 ? (
//                         filteredBillings.map((billing) => (
//                           <tr key={billing.id}>
//                             <td className="text-nowrap">
//                               {billing.bill_date || "N/A"}
//                             </td>
//                             <td
//                               className="text-nowrap"
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleView(billing)}
//                             >
//                               {billing.village?.name || "N/A"}
//                             </td>
//                             <td
//                               className="text-nowrap"
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleView(billing)}
//                             >
//                               {billing.product.name || "N/A"}
//                             </td>
//                             <td className="text-nowrap">
//                               {billing.trader_name || "N/A"}
//                             </td>
//                             <td style={styles.expenseActions}>
//                               <div className="d-flex gap-2 justify-content-center flex-wrap">
//                                 <button
//                                   className="btn btn-info btn-sm d-flex align-items-center"
//                                   onClick={() => handleView(billing)}
//                                   title={
//                                     translations[language].viewBilling ||
//                                     "View Billing"
//                                   }
//                                 >
//                                   <FaEye />
//                                 </button>
//                                 <button
//                                   className="btn btn-danger btn-sm d-flex align-items-center"
//                                   onClick={() => handleDelete(billing.id)}
//                                   title={translations[language].delete}
//                                 >
//                                   <FaTrash />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="5" className="text-center">
//                             {translations[language].noBillingsFound}
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex-grow-1 overflow-auto px-2">
//           <div style={styles.managerListContainer}>
//             <div style={styles.titleContainer} className="bg-success rounded">
//               <h3
//                 className="text-white m-0"
//                 style={{ fontSize: "clamp(1.2rem, 5vw, 1.5rem)" }}
//               >
//                 {translations[language].villageListTitle}
//               </h3>
//             </div>
//             {isLoadingVillages ? (
//               <div className="text-center my-5">
//                 <Spinner />
//               </div>
//             ) : farmVillages.length > 0 ? (
//               <div className="bg-white">
//                 {farmVillages.map((village) => (
//                   <div
//                     key={village.id}
//                     className="border rounded shadow-none"
//                     style={styles.managerCard}
//                     onClick={() => handleVillageClick(village)}
//                   >
//                     <li type="none" style={styles.managerName}>
//                       {village.village.name}
//                     </li>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p style={styles.noItems}>{translations[language].noVillages}</p>
//             )}
//           </div>
//         </div>
//       )}

//       <ModalForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         isEditing={isEditing}
//         formData={formData}
//         labels={translations}
//         handleChange={handleChange}
//         handleSave={handleSave}
//         handleDelete={handleDelete}
//         language={language}
//         formType="billing"
//         villages={farmVillages}
//         products={products}
//         fetchVillages={fetchFarmVillages}
//         isLoadingVillages={isLoadingVillages}
//         isLoadingProducts={isLoadingProducts}
//       />
//     </div>
//   );
// };

// export default Billing;
import React, { useState, useEffect } from "react";
import ModalForm from "../../Admin/Components/ModelForm";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaFileAlt, FaPlus, FaArrowLeft, FaFileExcel } from "react-icons/fa";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../Components/Header";
import * as XLSX from "xlsx";

const Billing = () => {
  const { language } = useLanguage();
  const [billingsCache, setBillingsCache] = useState({});
  const [displayedBillings, setDisplayedBillings] = useState([]);
  const [farms, setFarms] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingFarms, setIsLoadingFarms] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearWiseTotals, setYearWiseTotals] = useState([]); // New state for year-wise totals
  const recordsPerPage = 10;

  const translations = {
    en: {
      exportToExcel: "Export",
      title: "Billing Management",
      addBilling: "Add Bill",
      editBillingTitle: "Edit Billing",
      selectYear: "Select Year",
      noBillingsFound: "No billings found.",
      farm: "Farm",
      product: "Product Name",
      billDate: "Bill Date",
      traderName: "Trader Name",
      vehicleNumber: "Vehicle Number",
      rate: "Rate (per quintal)",
      trees: "Trees",
      leaves: "Leaves (quintal)",
      weight: "Weight (quintal)",
      fruitStalk: "Fruit Stalk (quintal)",
      discount: "Discount ( % )",
      travellingAmount: "Travelling Amount",
      managerAmount: "Manager Amount",
      totalAmount: "Total Amount",
      finalAmount: "Final Amount",
      actions: "Actions",
      submit: "Save",
      delete: "Delete",
      cancel: "Close",
      deleteConfirm: "Are you sure you want to delete this billing?",
      modalTitle: "Edit Billing",
      edit: "Edit",
      voiceInput: "Voice Input",
      inKg: "In kg",
      selectFarm: "Select a Farm",
      backToFarms: "Back to Farms",
      farmListTitle: "Farms",
      noFarms: "No farms found.",
      previous: "Previous",
      next: "Next",
      yearTotals: "Year Totals",
      totalFinalAmount: "Total Final Amount",
      totalManagerAmount: "Total Manager Amount",
    },
    mr: {
      exportToExcel: "निर्यात करा",
      title: "बिलिंग व्यवस्थापन",
      addBilling: "बिलिंग जोडा",
      editBillingTitle: "बिलिंग संपादित करा",
      selectYear: "वर्ष निवडा",
      noBillingsFound: "कोणतेही बिलिंग सापडले नाही.",
      farm: "शेत",
      product: "उत्पादनाचे नाव",
      billDate: "बिल तारीख",
      traderName: "व्यापारी नाव",
      vehicleNumber: "वाहन क्रमांक",
      rate: "दर (प्रति क्विंटल)",
      trees: "झाडे",
      leaves: "पाने (क्विंटल)",
      weight: "वजन (क्विंटल)",
      fruitStalk: "देठ (क्विंटल)",
      discount: "सवलत",
      travellingAmount: "प्रवास खर्च",
      managerAmount: "व्यवस्थापक रक्कम",
      totalAmount: "एकूण रक्कम",
      finalAmount: "अंतिम रक्कम",
      actions: "क्रिया",
      submit: "जतन करा",
      delete: "हटवा",
      cancel: "बंद करा",
      deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
      modalTitle: "बिलिंग संपादित करा",
      edit: "संपादन",
      voiceInput: "आवाज इनपुट",
      inKg: "किलोग्राममध्ये",
      selectFarm: "शेत निवडा",
      backToFarms: "शेतांकडे परत जा",
      farmListTitle: "शेत",
      noFarms: "कोणतीही शेत सापडली नाहीत。",
      previous: "मागील",
      next: "पुढील",
      yearTotals: "वर्ष एकूण",
      totalFinalAmount: "एकूण अंतिम रक्कम",
      totalManagerAmount: "एकूण व्यवस्थापक रक्कम",
    },
  };

  const styles = {
    managerListContainer: {
      height: "100%",
      width: "100%",
      overflowY: "auto",
      padding: "0 10px",
    },
    titleContainer: {
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      minHeight: "50px",
    },
    farmList: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      padding: "10px",
    },
    managerCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      padding: "10px",
      margin: "0",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
      width: "calc(50% - 5px)",
      transition: "background-color 0.2s",
      boxSizing: "border-box",
    },
    managerCardHover: {
      backgroundColor: "#f5f5f5",
    },
    managerName: {
      fontSize: "clamp(0.9rem, 4vw, 1.1rem)",
      fontWeight: "500",
      textAlign: "center",
    },
    noItems: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "clamp(0.9rem, 4vw, 1rem)",
    },
    backButton: {
      background: "none",
      padding: "5px",
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
    },
    backIcon: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
    },
    addButton: {
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
      whiteSpace: "nowrap",
    },
    searchContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px 0",
      width: "100%",
    },
    expenseActions: {
      textAlign: "center",
      padding: "5px",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      margin: "10px 0",
    },
    // totalsContainer: {
    //   margin: "10px 0",
    //   padding: "10px",
    //   backgroundColor: "#f8f9fa",
    //   borderRadius: "5px",
    //   textAlign: "center",
    // },
    totalsContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "0.3rem",
      marginBottom: "1.5rem",
      backgroundColor: "rgb(248, 249, 250)",
      borderRadius: "8px",
      border: "1px solid rgb(222, 226, 230)",
      padding: "10px",
    },
    totalCard: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "15px",
      flex: 1,
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    totalCardHover: {
      transform: "scale(1.02)",
    },
    totalLabel: {
      fontSize: "1rem",
      fontWeight: "500",
      color: "#333",
      marginBottom: "5px",
    },
    totalValue: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#28a745",
    },
  };
  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    setIsLoadingFarms(true);
    try {
      const response = await api.get("/farm/?action=getFarm");
      setFarms(response.data.data || []);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          translations[language].fetchError ||
          "Failed to fetch farms.",
        "error"
      );
    } finally {
      setIsLoadingFarms(false);
    }
  };
  

  const fetchBillings = async (farmId, page = 1, year = "") => {
    const cacheKey = `${farmId}-${year}-${page}`;
    if (billingsCache[cacheKey]) {
      setDisplayedBillings(billingsCache[cacheKey]);
      setFetchLoading(false);
      return;
    }

    setFetchLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const Id = user?.id;
      let url = `/billing/?action=getBilling&user_created=${Id}&farm=${farmId}&page=${page}&page_size=${recordsPerPage}`;
      if (year) {
        url += `&year=${year}`;
      }
      const response = await api.get(url);
      const fetchedBillings = response.data.data || [];
      setBillingsCache((prev) => ({
        ...prev,
        [cacheKey]: fetchedBillings,
      }));
      setDisplayedBillings(fetchedBillings);
      setTotalCount(response.data.total_count || 0);
      setAvailableYears(response.data.available_years || []);
      setYearWiseTotals(response.data.year_wise_totals || []); // Set year-wise totals
      if (!year && response.data.available_years?.length > 0) {
        setSelectedYear(response.data.available_years[0].toString());
      }
    } catch (error) {
      setDisplayedBillings([]);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          translations[language].fetchError ||
          "Failed to fetch billings.",
        "error"
      );
    } finally {
      setFetchLoading(false);
    }
  };

   const fetchProducts = async () => {
    // Avoids re-fetching if products are already loaded
    if (products.length > 0) return;

    setIsLoadingProducts(true);
    try {
      const response = await api.get("/master_data/?action=getProduct");
      setProducts(response.data.data || []);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          translations[language].fetchError ||
          "Failed to fetch products.",
        "error"
      );
    } finally {
      setIsLoadingProducts(false);
    }
  };


  const handleFarmClick = (farm) => {
    setSelectedFarm(farm);
    setCurrentPage(1);
    setSelectedYear("");
    setBillingsCache({});
    fetchBillings(farm.id, 1);
  };

  const handleBackToFarms = () => {
    setSelectedFarm(null);
    setDisplayedBillings([]);
    setBillingsCache({});
    setCurrentPage(1);
    setSelectedYear("");
    setTotalCount(0);
    setYearWiseTotals([]); // Clear totals
  };

  const handleAdd = () => {
    fetchProducts();
    setFormData({
      farm_id: selectedFarm?.id || "",
      product_id: "",
      bill_date: "",
      trader_name: "",
      vehicle_number: "",
      rate: "",
      trees: "",
      leaves: "",
      weight: "",
      fruit_stalk: "",
      discount: "",
      travelling_amount: "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (billing) => {
    setFormData({
      id: billing.id,
      farm_id: billing.farm?.id || "",
      farm_name: billing.farm?.name || "",
      product_id: billing.product.id || "",
      product_name: billing.product.name || "",
      bill_date: billing.bill_date || "",
      trader_name: billing.trader_name || "",
      vehicle_number: billing.vehicle_number || "",
      rate: billing.rate || "",
      trees: billing.trees || "",
      leaves: billing.leaves || "",
      weight: billing.weight || "",
      fruit_stalk: billing.fruit_stalk || "",
      discount: billing.discount || "",
      travelling_amount: billing.travelling_amount || "",
      manager_amount: billing.manager_amount || "0",
      total_amount: billing.total_amount || "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostBilling = async () => {
    try {
      const payload = {
        action: "postBilling",
        farm_id: parseInt(formData.farm_id),
        product_id: parseInt(formData.product_id),
        bill_date: formData.bill_date,
        trader_name: formData.trader_name,
        vehicle_number: formData.vehicle_number,
        rate: parseFloat(formData.rate) || 0,
        trees: parseInt(formData.trees) || 0,
        leaves: parseInt(formData.leaves) || 0,
        weight: parseFloat(formData.weight) || 0,
        fruit_stalk: parseFloat(formData.fruit_stalk) || 0,
        discount: parseFloat(formData.discount) || 0,
        travelling_amount: parseFloat(formData.travelling_amount) || 0,
      };

      await api.post("/billing/", payload);
      Swal.fire(
        "Success",
        translations[language].submitBilling ||
          "Billing submitted successfully",
        "success"
      );
      setBillingsCache({});
      fetchBillings(selectedFarm.id, currentPage, selectedYear);
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          translations[language].fetchError ||
          "Failed to create billing.",
        "error"
      );
    }
  };

  const handleSave = async () => {
    handlePostBilling();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: translations[language].deleteConfirm,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: translations[language].delete,
      cancelButtonText: translations[language].cancel,
    });

    if (result.isConfirmed) {
      try {
        const payload = { action: "deleteBilling", id: id.toString() };
        await api.delete("/billing/", {
          data: payload,
          headers: { "Content-Type": "application/json" },
        });
        Swal.fire("Deleted", translations[language].delete, "success");
        setBillingsCache({});
        fetchBillings(selectedFarm.id, currentPage, selectedYear);
        setIsModalOpen(false);
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || translations[language].deleteConfirm,
          "error"
        );
      }
    } else {
      Swal.fire("Cancelled", "Billing was not deleted.", "info");
    }
  };

  const handleExport = async () => {
    setFetchLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      // Fetch all billings for the selected farm and year
      const url = `/billing/?action=getBilling&user_created=${userId}&farm=${selectedFarm.id}&year=${selectedYear}&page_size=100000`;
      const response = await api.get(url);
      const allBillings = response.data.data || [];

      if (allBillings.length === 0) {
        Swal.fire("Info", translations[language].noBillingsFound, "info");
        return;
      }

      // Prepare data for the Excel sheet
      const dataForExport = allBillings.map((billing) => ({
        [translations[language].farm]: billing.farm?.name || "N/A",
        [translations[language].product]: billing.product?.name || "N/A",
        [translations[language].billDate]: billing.bill_date || "N/A",
        [translations[language].traderName]: billing.trader_name || "N/A",
        [translations[language].vehicleNumber]: billing.vehicle_number || "N/A",
        [translations[language].rate]: billing.rate,
        [translations[language].trees]: billing.trees,
        [translations[language].leaves]: billing.leaves,
        [translations[language].weight]: billing.weight,
        [translations[language].fruitStalk]: billing.fruit_stalk,
        [translations[language].discount]: billing.discount,
        [translations[language].travellingAmount]: billing.travelling_amount,
        [translations[language].managerAmount]: billing.manager_amount,
        [translations[language].totalAmount]: billing.total_amount,
        [translations[language].finalAmount]: billing.final_amount,
      }));

      // Create a new workbook and a new worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataForExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Billings");

      // Generate and download the Excel file
      XLSX.writeFile(
        workbook,
        `Billings_${selectedFarm.name}_${selectedYear}.xlsx`
      );
      Swal.fire(
        "Success",
        translations[language].exportSuccess || "Exported successfully!",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          translations[language].fetchError ||
          "Failed to export data.",
        "error"
      );
    } finally {
      setFetchLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBillings(selectedFarm.id, newPage, selectedYear);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setCurrentPage(1);
    setBillingsCache({});
    fetchBillings(selectedFarm.id, 1, year);
  };

  const totalPages = Math.ceil(totalCount / recordsPerPage);

  // Find the totals for the selected year
  const selectedYearTotals = selectedYear
    ? yearWiseTotals.find(
        (total) => total.year.toString() === selectedYear
      ) || { total_final_amount: 0, total_manager_amount: 0 }
    : null;

  return (
    <div
      className="container-fluid p-0 flex-grow-1 d-flex flex-column"
      style={{ height: "100vh" }}
    >
      <div>
        <Header title={translations[language].title} icon={FaFileAlt} />
      </div>

      {selectedFarm ? (
        <div className="row flex-grow-1 overflow-hidden mx-0">
          <div
            className="col-12 d-flex flex-column px-0"
            style={{ height: "100%" }}
          >
            <div style={styles.searchContainer}>
              <div className="d-flex align-items-center gap-2 flex-nowrap justify-content-between w-100">
                <div
                  className="input-group"
                  style={{ maxWidth: "300px", width: "100%" }}
                >
                  <select
                    className="form-control rounded border-success"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    <option value="">
                      {translations[language].selectYear}
                    </option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  style={styles.addButton}
                  className="bg-white text-success btn-sm"
                  onClick={handleExport}
                  disabled={fetchLoading}
                >
                  <FaFileExcel className="me-1" />{" "}
                  {translations[language].exportToExcel}
                </button>
                <button
                  style={styles.addButton}
                  className="bg-white text-success btn-sm"
                  onClick={handleAdd}
                >
                  <FaPlus className="me-1" />{" "}
                  {translations[language].addBilling}
                </button>
              </div>
            </div>
            {selectedYear && (
              <div style={styles.totalsContainer}>
                <div
                  style={styles.totalCard}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                      styles.totalCardHover.transform)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div style={styles.totalLabel}>
                    {translations[language].totalFinalAmount}
                  </div>
                  <div style={styles.totalValue}>
                    {selectedYearTotals.total_final_amount.toFixed(2)}
                  </div>
                </div>
                <div
                  style={styles.totalCard}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                      styles.totalCardHover.transform)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div style={styles.totalLabel}>
                    {translations[language].totalManagerAmount}
                  </div>
                  <div style={styles.totalValue}>
                    {selectedYearTotals.total_manager_amount.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow-1 overflow-auto">
              {fetchLoading && displayedBillings.length === 0 ? (
                <div className="text-center my-5">
                  <Spinner />
                </div>
              ) : (
                <div className="table-responsive" style={{ height: "100%" }}>
                  <table
                    className="table table-striped table-bordered mb-0"
                    style={{ tableLayout: "auto", width: "100%" }}
                  >
                    <thead className="bg-success text-white">
                      <tr>
                        <th scope="col" className="text-nowrap">
                          {translations[language].billDate}
                        </th>
                        <th scope="col" className="text-nowrap">
                          {translations[language].farm}
                        </th>
                        <th scope="col" className="text-nowrap">
                          {translations[language].actions}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedBillings.length > 0 ? (
                        displayedBillings.map((billing) => (
                          <tr key={billing.id}>
                            <td className="text-nowrap">
                              {billing.bill_date || "N/A"}
                            </td>
                            <td
                              className="text-nowrap"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleView(billing)}
                            >
                              {billing.farm?.name || "N/A"}
                            </td>
                            <td style={styles.expenseActions}>
                              <div className="d-flex gap-2 justify-content-center flex-wrap">
                                <button
                                  className="btn btn-info btn-sm d-flex align-items-center"
                                  onClick={() => handleView(billing)}
                                  title={
                                    translations[language].viewBilling ||
                                    "View Billing"
                                  }
                                >
                                  <FaEye />
                                </button>
                                <button
                                  className="btn btn-danger btn-sm d-flex align-items-center"
                                  onClick={() => handleDelete(billing.id)}
                                  title={translations[language].delete}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            {translations[language].noBillingsFound}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
          </div>
        </div>
      ) : (
        <div className="flex-grow-1 overflow-auto px-2">
          <div style={styles.managerListContainer}>
            <div style={styles.titleContainer} className="bg-success rounded">
              <h3
                className="text-white m-0"
                style={{ fontSize: "clamp(1.2rem, 5vw, 1.5rem)" }}
              >
                {translations[language].farmListTitle}
              </h3>
            </div>
            {isLoadingFarms ? (
              <div className="text-center my-5">
                <Spinner />
              </div>
            ) : farms.length > 0 ? (
              <div style={styles.farmList}>
                {farms.map((farm, index) => (
                  <div
                    key={farm.id}
                    className="border rounded shadow-none"
                    style={styles.managerCard}
                    onClick={() => handleFarmClick(farm)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        styles.managerCardHover.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
                  >
                    <div style={styles.managerName}>{farm.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.noItems}>{translations[language].noFarms}</p>
            )}
          </div>
        </div>
      )}

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        language={language}
        formType="billing"
        farms={farms}
        products={products}
        fetchFarms={fetchFarms}
        isLoadingFarms={isLoadingFarms}
        isLoadingProducts={isLoadingProducts}
      />
    </div>
  );
};

export default Billing;
