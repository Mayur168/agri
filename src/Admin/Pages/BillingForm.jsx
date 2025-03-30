import React, { useState, useEffect } from "react";
import ModalForm from "../../Admin/Components/ModelForm";
import Swal from "sweetalert2";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaFileAlt,
  FaPlus,
} from "react-icons/fa";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext"; // Imported LanguageContext

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

  const translations = {
    en: {
      title: "Billing Management",
      addBilling: "Add New Billing",
      searchPlaceholder: "Search..",
      noBillingsFound: "No billings found.",
      farm: "Farm",
      product: "Product",
      billDate: "Bill Date",
      traderName: "Trader Name",
      vehicleNumber: "Vehicle Number",
      rate: "Rate",
      trees: "Trees",
      leaves: "Leaves",
      weight: "Weight",
      travellingAmount: "Travelling Amount",
      totalAmount: "Total Amount",
      finalAmount: "Final Amount",
      actions: "Actions",
      submit: "Save",
      delete: "Delete",
      cancel: "Close",
      deleteConfirm: "Are you sure you want to delete this billing?",
      modalTitle: "Edit Billing",
      view: "View",
      edit: "Edit",
    },
    mr: {
      title: "बिलिंग व्यवस्थापन",
      addBilling: "नवीन बिलिंग जोडा",
      searchPlaceholder: "शोधा..",
      noBillingsFound: "कोणतेही बिलिंग सापडले नाही.",
      farm: "शेत",
      product: "उत्पादन",
      billDate: "बिल तारीख",
      traderName: "व्यापारी नाव",
      vehicleNumber: "वाहन क्रमांक",
      rate: "दर",
      trees: "झाडे",
      leaves: "पाने",
      weight: "वजन",
      travellingAmount: "प्रवास खर्च",
      totalAmount: "एकूण रक्कम",
      finalAmount: "अंतिम रक्कम",
      actions: "क्रिया",
      submit: "जतन करा",
      delete: "हटवा",
      cancel: "बंद करा",
      deleteConfirm: "आपण हे बिलिंग खरोखर हटवू इच्छिता?",
      modalTitle: "बिलिंग संपादित करा",
      view: "पहा",
      edit: "संपादन",
    },
  };

  useEffect(() => {
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    setFetchLoading(true);
    try {
      const response = await api.get("/billing/?action=getBilling");
      setBillings(response.data.data || []);
    } catch (error) {
      console.error("Error fetching billings:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].noBillingsFound, // Use translated error if needed
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
      const response = await api.get("/farm/?action=getFarm");
      setFarms(response.data.data || []);
      console.log("Fetched farms:", response.data.data);
      await fetchProducts();
    } catch (error) {
      console.error("Error fetching farms:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch farms.",
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
      console.log("Fetched products:", response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch products.",
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
      farm_id: billing.farm,
      product_id: billing.product,
      bill_date: billing.bill_date,
      trader_name: billing.trader_name,
      vehicle_number: billing.vehicle_number,
      rate: billing.rate,
      trees: billing.trees,
      leaves: billing.leaves,
      weight: billing.weight,
      travelling_amount: billing.travelling_amount,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (billing) => {
    setFormData({
      id: billing.id,
      farm_id: billing.farm,
      product_id: billing.product,
      bill_date: billing.bill_date,
      trader_name: billing.trader_name,
      vehicle_number: billing.vehicle_number,
      rate: billing.rate,
      trees: billing.trees,
      leaves: billing.leaves,
      weight: billing.weight,
      travelling_amount: billing.travelling_amount,
    });
    setIsEditing(true);
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
      Swal.fire("Success", translations[language].submit, "success");
      fetchBillings();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating billing:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to create billing.",
        "error"
      );
    }
  };

  const handlePatchBilling = async () => {
    try {
      const payload = {
        action: "patchBilling",
        id: formData.id,
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

      await api.patch("/billing/", payload);
      Swal.fire("Success", translations[language].submit, "success");
      fetchBillings();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating billing:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update billing.",
        "error"
      );
    }
  };

  const handleSave = async () => {
    if (formData.id) {
      await handlePatchBilling();
    } else {
      await handlePostBilling();
    }
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
        fetchBillings(); 
      } catch (error) {
        console.error("Error deleting billing:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message || translations[language].deleteConfirm,
          "error"
        );
      }
    } else {
      // User canceled the deletion
      Swal.fire("Cancelled", "Billing was not deleted.", "info");
    }
  };

  const filteredBillings = billings.filter(
    (billing) =>
      billing.trader_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      billing.bill_date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaFileAlt className="me-2" /> {translations[language].title}
        </h2>
      </div>

      <div className="container">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
          <div className="input-group" style={{ flex: "1", width: "180px" }}>
            <input
              type="search"
              className="form-control rounded border-success"
              placeholder={translations[language].searchPlaceholder}
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
                <th scope="col" className="d-none d-md-table-cell">
                  ID
                </th>
                <th scope="col">{translations[language].farm}</th>
                <th scope="col" className="d-none d-md-table-cell">
                  {translations[language].product}
                </th>
                <th scope="col">{translations[language].billDate}</th>
                <th scope="col">{translations[language].traderName}</th>
                <th scope="col" className="d-none d-md-table-cell">
                  {translations[language].rate}
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  {translations[language].trees}
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  {translations[language].leaves}
                </th>
                <th scope="col" className="d-none d-md-table-cell">
                  {translations[language].weight}
                </th>
                <th scope="col">{translations[language].totalAmount}</th>
                <th scope="col">{translations[language].travellingAmount}</th>
                <th scope="col">{translations[language].finalAmount}</th>
                <th scope="col">{translations[language].actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillings.length > 0 ? (
                filteredBillings.map((billing) => (
                  <tr key={billing.id}>
                    <td className="d-none d-md-table-cell">{billing.id}</td>
                    <td>{billing.farm}</td>
                    <td className="d-none d-md-table-cell">
                      {billing.product}
                    </td>
                    <td>{billing.bill_date}</td>
                    <td>{billing.trader_name}</td>
                    <td className="d-none d-md-table-cell">{billing.rate}</td>
                    <td className="d-none d-md-table-cell">{billing.trees}</td>
                    <td className="d-none d-md-table-cell">{billing.leaves}</td>
                    <td className="d-none d-md-table-cell">{billing.weight}</td>
                    <td>{billing.total_amount}</td>
                    <td>{billing.travelling_amount}</td>
                    <td>{billing.final_amount}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-link p-0"
                          type="button"
                          id={`dropdownMenuButton-${billing.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaEye className="eye-icon" />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby={`dropdownMenuButton-${billing.id}`}
                        >
                          <button
                            className="dropdown-item btn btn-info btn-sm"
                            onClick={() => handleView(billing)}
                          >
                            <FaEye className="me-2" />{" "}
                            {translations[language].view}
                          </button>
                          <button
                            className="dropdown-item btn btn-primary btn-sm"
                            onClick={() => handleEdit(billing)}
                          >
                            <FaEdit className="me-2" />{" "}
                            {translations[language].edit}
                          </button>
                          <button
                            className="dropdown-item btn btn-danger btn-sm"
                            onClick={() => handleDelete(billing.id)}
                          >
                            <FaTrash className="me-2" />{" "}
                            {translations[language].delete}
                          </button>
                          <button className="dropdown-item btn btn-secondary btn-sm">
                            <FaTimes className="me-2" />{" "}
                            {translations[language].cancel}
                          </button>
                        </div>
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