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
//   const [farms, setFarms] = useState([]);
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
//       searchPlaceholder: "Search by Date or Name...",
//       noBillingsFound: "No billings found.",
//       farm: "Farm Name",
//       product: "Product Name",
//       billDate: "Bill Date",
//       traderName: "Trader Name",
//       vehicleNumber: "Vehicle Number",
//       rate: "Rate",
//       trees: "Trees",
//       leaves: "Leaves (per kg)",
//       weight: "Weight (per kg)",
//       travellingAmount: "Travelling Amount",
//       managerAmount: "manager_amount",
//       totalAmount: "total_amount",
//       finalAmount: "Final Amount",
//       actions: "Actions",
//       submit: "Save",
//       delete: "Delete",
//       cancel: "Close",
//       deleteConfirm: "Are you sure you want to delete this billing?",
//       modalTitle: "Edit Billing",
//       edit: "Edit",
//       voiceInput: "Voice Input",
//     },
//     mr: {
//       title: "बिलिंग व्यवस्थापन",
//       addBilling: "बिलिंग जोडा",
//       editBillingTitle: "बिलिंग संपादित करा",
//       searchPlaceholder: "तारीख किंवा नावावरून शोधा...",
//       noBillingsFound: "कोणतेही बिलिंग सापडले नाही.",
//       farm: "शेतीचे नाव",
//       product: "उत्पादनाचे नाव",
//       billDate: "बिल तारीख",
//       traderName: "व्यापारी नाव",
//       vehicleNumber: "वाहन क्रमांक",
//       rate: "दर",
//       trees: "झाडे",
//       leaves: "पाने (प्रति किलो)",
//       weight: "वजन (प्रति किलो)",
//       "व्यवस्थापक रक्कम": "प्रवास खर्च",
//       totalAmount: "एकूण रक्कम",
//       managerAmount: "व्यवस्थापक रक्कम",
//       finalAmount: "अंतिम रक्कम",
//       travellingAmount: "प्रवास खर्च",
//       actions: "क्रिया",
//       submit: "जतन करा",
//       delete: "हटवा",
//       cancel: "बंद करा",
//       deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
//       modalTitle: "बिलिंग संपादित करा",
//       edit: "संपादन",
//       voiceInput: "आवाज इनपुट",
//     },
//   };

//   useEffect(() => {
//     fetchBillings();
//   }, []);

//   const fetchBillings = async () => {
//     setFetchLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       // const farmerId = user?.farmer_id;
//       const Id = user?.id;

//       // if (!farmerId) {
//       //   throw new Error("Farmer ID not found in user data");
//       // }

//       const response = await api.get(
//         `/billing/?action=getBilling&user_created=${Id}`
//       );
//       setBillings(response.data.data || []);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || translations[language].noBillingsFound,
//         "error"
//       );
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
//       const response = await api.get(
//         `/farm/?action=getFarm&farmer=${farmerId}`
//       );
//       setFarms(response.data.data || []);
//       await fetchProducts();
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to fetch farms.",
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
//         error.response?.data?.message || "Failed to fetch products.",
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
//         rate: parseFloat(formData.rate),
//         trees: parseInt(formData.trees),
//         leaves: parseInt(formData.leaves),
//         weight: parseFloat(formData.weight),
//         travelling_amount: parseFloat(formData.travelling_amount),
//       };

//       await api.post("/billing/", payload);
//       Swal.fire("Success", translations[language].submit, "success");
//       fetchBillings();
//       setIsModalOpen(false);
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to create billing.",
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
//       if (value && typeof value === "object" && value.name)
//         return value.name.toLowerCase();
//       return "";
//     };

//     const traderName = getSearchableString(billing.trader_name);
//     const billDate = getSearchableString(billing.bill_date);
//     const farm = getSearchableString(billing.farm);
//     const product = getSearchableString(billing.product);

//     return (
//       traderName.includes(searchQuery.toLowerCase()) ||
//       billDate.includes(searchQuery.toLowerCase()) ||
//       farm.includes(searchQuery.toLowerCase()) ||
//       product.includes(searchQuery.toLowerCase())
//     );
//   });
//   return (
//     <div className="container p-0">
//       <div>
//         <Header title={translations[language].title} icon={FaFileAlt} />
//       </div>

//       <div className="container">
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

//       <div className="table-responsive mt-3">
//         {fetchLoading && billings.length === 0 ? (
//           <div className="text-center m-auto">
//             <Spinner />
//           </div>
//         ) : (
//           <table className="table table-striped table-bordered">
//             <thead className="bg-dark text-white">
//               <tr>
//                 {/* <th scope="col" className="d-none d-md-table-cell">
//                     Serial Number
//                   </th> */}
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
//                     {/* <td className="d-none d-md-table-cell">{billing.id}</td> */}
//                     <td>{billing.bill_date}</td>
//                     <td
//                       style={{ cursor: "pointer" }}
//                       onClick={() => handleView(billing)}
//                     >
//                       {billing.farm.name || "N/A"}
//                     </td>
//                     <td
//                       style={{ cursor: "pointer" }}
//                       onClick={() => handleView(billing)}
//                     >
//                       {billing.product.name || "N/A"}
//                     </td>
//                     <td>{billing.trader_name}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <button
//                           className="btn btn-info btn-sm d-flex align-items-center"
//                           onClick={() => handleView(billing)}
//                           title={translations[language].view}
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
//                   <td colSpan="13" className="text-center">
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
import React, { useState, useEffect } from "react";
import ModalForm from "../../Admin/Components/ModelForm";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaFileAlt, FaPlus } from "react-icons/fa";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../Components/Header";
import { translations } from "../Components/translations/index";

const Billing = () => {
  const { language } = useLanguage();
  const [billings, setBillings] = useState([]);
  const [farms, setFarms] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingFarms, setIsLoadingFarms] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    setFetchLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const Id = user?.id;

      const response = await api.get(`/billing/?action=getBilling&user_created=${Id}`);
      setBillings(response.data.data || []);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].noBillingsFound,
        "error"
      );
      setBillings([]);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchFarms = async () => {
    if (farms.length > 0) return;
    setIsLoadingFarms(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const farmerId = user?.farmer_id;

      if (!farmerId) {
        throw new Error("Farmer ID not found in user data");
      }
      const response = await api.get(`/farm/?action=getFarm&farmer=${farmerId}`);
      setFarms(response.data.data || []);
      await fetchProducts();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].fetchError || "Failed to fetch farms.",
        "error"
      );
    } finally {
      setIsLoadingFarms(false);
    }
  };

  const fetchProducts = async () => {
    if (products.length > 0) return;
    setIsLoadingProducts(true);
    try {
      const response = await api.get("/master_data/?action=getProduct");
      setProducts(response.data.data || []);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].fetchError || "Failed to fetch products.",
        "error"
      );
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      farm_id: "",
      product_id: "",
      bill_date: "",
      trader_name: "",
      vehicle_number: "",
      rate: "",
      trees: "",
      leaves: "",
      weight: "",
      travelling_amount: "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (billing) => {
    setFormData({
      id: billing.id,
      farm_id: billing.farm.id || "",
      farm_name: billing.farm.name || "",
      product_id: billing.product.id || "",
      product_name: billing.product.name || "",
      bill_date: billing.bill_date || "",
      trader_name: billing.trader_name || "",
      vehicle_number: billing.vehicle_number || "",
      rate: billing.rate || "",
      trees: billing.trees || "",
      leaves: billing.leaves || "",
      weight: billing.weight || "",
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
        rate: parseFloat(formData.rate),
        trees: parseInt(formData.trees),
        leaves: parseInt(formData.leaves),
        weight: parseFloat(formData.weight),
        travelling_amount: parseFloat(formData.travelling_amount),
      };

      await api.post("/billing/", payload);
      Swal.fire("Success", translations[language].submitBilling, "success");
      fetchBillings();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].fetchError || "Failed to create billing.",
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
      confirmButtonText: translations[language].deleteBilling,
      cancelButtonText: translations[language].cancelBilling,
    });

    if (result.isConfirmed) {
      try {
        const payload = { action: "deleteBilling", id: id.toString() };
        await api.delete("/billing/", {
          data: payload,
          headers: { "Content-Type": "application/json" },
        });
        Swal.fire("Deleted", translations[language].deleteBilling, "success");
        fetchBillings();
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

  const filteredBillings = billings.filter((billing) => {
    const getSearchableString = (value) => {
      if (typeof value === "string") return value.toLowerCase();
      if (value && typeof value === "object" && value.name) return value.name.toLowerCase();
      return "";
    };

    const traderName = getSearchableString(billing.trader_name);
    const billDate = getSearchableString(billing.bill_date);
    const farm = getSearchableString(billing.farm);
    const product = getSearchableString(billing.product);

    return (
      traderName.includes(searchQuery.toLowerCase()) ||
      billDate.includes(searchQuery.toLowerCase()) ||
      farm.includes(searchQuery.toLowerCase()) ||
      product.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container p-0">
      <div>
        <Header title={translations[language].billingTitle} icon={FaFileAlt} />
      </div>

      <div className="container">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
          <div className="input-group" style={{ flex: "1", width: "180px" }}>
            <input
              type="search"
              className="form-control rounded border-success"
              placeholder={translations[language].searchPlaceholderBilling}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            onClick={handleAdd}
          >
            <FaPlus className="me-2" /> {translations[language].addBilling}
          </button>
        </div>
      </div>

      <div className="table-responsive mt-3">
        {fetchLoading && billings.length === 0 ? (
          <div className="text-center m-auto">
            <Spinner />
          </div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th scope="col">{translations[language].billDate}</th>
                <th scope="col">{translations[language].farm}</th>
                <th scope="col">{translations[language].product}</th>
                <th scope="col">{translations[language].traderName}</th>
                <th scope="col">{translations[language].actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillings.length > 0 ? (
                filteredBillings.map((billing) => (
                  <tr key={billing.id}>
                    <td>{billing.bill_date}</td>
                    <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
                      {billing.farm.name || "N/A"}
                    </td>
                    <td style={{ cursor: "pointer" }} onClick={() => handleView(billing)}>
                      {billing.product.name || "N/A"}
                    </td>
                    <td>{billing.trader_name}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-info btn-sm d-flex align-items-center"
                          onClick={() => handleView(billing)}
                          title={translations[language].viewBilling}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center"
                          onClick={() => handleDelete(billing.id)}
                          title={translations[language].deleteBilling}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center">
                    {translations[language].noBillingsFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

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