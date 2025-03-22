import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../src/api/axiosInstance";
import { FaEye, FaSprayCan, FaPlus } from "react-icons/fa";
import ModalForm from "../../Admin/Components/ModelForm";
import Spinner from "../../Admin/Spinner/Spinner";
import BackButton from "../../Admin/Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext";

function SprayFertilizerForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(true); // Default to true for editing
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      title: "Spray Fertilizer",
      addRecord: "Fertilizer",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      close: "Close",
      deleteConfirm: "You won't be able to revert this!",
      fertilizerName: "Fertilizer Name",
      price: "Price",
      modalTitle: "Edit Fertilizer",
      submit: "Save",
      cancel: "Close",
      searchPlaceholder: "Search..",
      noRecords: "No records available",
    },
    mr: {
      title: "स्प्रे खत",
      addRecord: "खत",
      view: "पहा",
      edit: "संपादन",
      save: "जतन करा",
      delete: "हटवा",
      close: "बंद करा",
      deleteConfirm: "आपण हे परत करू शकणार नाही!",
      fertilizerName: "खताचे नाव",
      price: "किंमत",
      modalTitle: "खत संपादन",
      submit: "जतन करा",
      cancel: "बंद करा",
      searchPlaceholder: "शोधा..",
      noRecords: "कोणतेही रेकॉर्ड उपलब्ध नाहीत",
    },
  };

  const labels = translations[language];

  // Fetch all records (GET)
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/master_data/?action=getfertilizer`);
      console.log("API Response:", response.data);
      const validRecords = Array.isArray(response.data.data)
        ? response.data.data.filter(
            (item) => item && typeof item.name === "string"
          )
        : [];
      setRecords(validRecords);
    } catch (error) {
      Swal.fire(
        language === "en" ? "Error" : "त्रुटी",
        language === "en" ? "Failed to fetch records" : "रेकॉर्ड्स आणण्यात अयशस्वी",
        "error"
      );
      console.error("Fetch error:", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new record (POST)
  const handlePostRecord = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/master_data/`, {
        action: "postfertilizer",
        name: formData.name,
        price: parseFloat(formData.price),
      });
      const savedData = response.data.data;
      setRecords([...records, savedData]);
      resetForm();
      Swal.fire(
        language === "en" ? "Success" : "यशस्वी",
        language === "en" ? "Record added successfully" : "रेकॉर्ड यशस्वीरित्या जोडले गेले",
        "success"
      );
    } catch (error) {
      Swal.fire(
        language === "en" ? "Error" : "त्रुटी",
        language === "en" ? "Failed to add record" : "रेकॉर्ड जोडण्यात अयशस्वी",
        "error"
      );
      console.error("Post error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update existing record (PATCH)
  const handlePatchRecord = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/master_data/`, {
        action: "patchfertilizer",
        id: formData.id,
        name: formData.name,
        price: parseFloat(formData.price),
      });
      const updatedData = response.data.data;
      setRecords(
        records.map((item) => (item.id === formData.id ? updatedData : item))
      );
      resetForm();
      Swal.fire(
        language === "en" ? "Success" : "यशस्वी",
        language === "en" ? "Record updated successfully" : "रेकॉर्ड यशस्वीरित्या अद्यतनित केले गेले",
        "success"
      );
    } catch (error) {
      Swal.fire(
        language === "en" ? "Error" : "त्रुटी",
        language === "en" ? "Failed to update record" : "रेकॉर्ड अद्यतनित करण्यात अयशस्वी",
        "error"
      );
      console.error("Patch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete record (DELETE)
  const handleDeleteRecord = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/master_data/`, {
        data: { action: "deletefertilizer", id: id },
      });
      setRecords(records.filter((item) => item.id !== id));
      setIsOpen(false);
      Swal.fire(
        language === "en" ? "Deleted!" : "हटवले!",
        language === "en" ? "Record has been deleted." : "रेकॉर्ड हटवले गेले आहे.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        language === "en" ? "Error" : "त्रुटी",
        language === "en" ? "Failed to delete record" : "रेकॉर्ड हटविण्यात अयशस्वी",
        "error"
      );
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.id) {
      await handlePatchRecord();
    } else {
      await handlePostRecord();
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: language === "en" ? "Are you sure?" : "आपण खात्री आहात का?",
      text: labels.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: language === "en" ? "Yes, delete it!" : "होय, हटवा!",
      cancelButtonText: language === "en" ? "Cancel" : "रद्द करा",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteRecord(id);
      }
    });
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", price: "" });
    setIsOpen(false);
    setIsEditing(true); // Reset to editing mode
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true); // Open in edit mode
    setIsOpen(true);
  };

  const handleView = (item) => {
    setFormData(item);
    setIsEditing(false); // Open in view mode (read-only)
    setIsOpen(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, name: "", price: "" });
    setIsEditing(true); // Open in edit mode for adding
    setIsOpen(true);
  };

  // Filter records based on search query
  const filteredRecords = records.filter((item) => {
    if (!item || !item.name || typeof item.name !== "string") return false;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="managers-container mb-5">
      {/* Header */}
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaSprayCan className="me-2" /> {labels.title}
        </h2>
      </div>

      <div className="container">
        {/* Search Box and Add Button in Same Line with 50%/50% Split */}
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control shadow-sm rounded-3 px-3 py-2 me-2 border-success"       
            placeholder={labels.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "50%" }}
          />
          <button
            className="btn btn-success fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm"
            onClick={handleAdd}
            disabled={loading}
            style={{ width: "50%" }}
          >
            <FaPlus className="me-1" /> {labels.addRecord}
          </button>
        </div>

        {/* Records Grid with Spinner */}
        <div className="managers-grid">
          {loading ? (
            <div className="text-center m-auto">
              <Spinner />
            </div>
          ) : Array.isArray(filteredRecords) && filteredRecords.length > 0 ? (
            filteredRecords.map((item) => (
              <div
                key={item.id}
                className="manager-card d-flex justify-content-between align-items-center flex-wrap shadow-sm p-3 rounded-3 bg-light"
              >
                <span className="manager-name fw-medium">
                  {item.name} - ${item.price}
                </span>
                <div className="manager-actions">
                  <div className="dropdown">
                    <button
                      className="btn btn-link p-0"
                      type="button"
                      id={`dropdownMenuButton-${item.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      disabled={loading}
                    >
                      <FaEye className="eye-icon fs-5" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby={`dropdownMenuButton-${item.id}`}
                    >
                      <button
                        className="dropdown-item btn btn-info btn-sm"
                        onClick={() => handleView(item)}
                        disabled={loading}
                      >
                        {labels.view}
                      </button>
                      <button
                        className="dropdown-item btn btn-primary btn-sm"
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                      >
                        {labels.edit}
                      </button>
                      <button
                        className="dropdown-item btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                      >
                        {labels.delete}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mx-auto py-4">
              {labels.noRecords}
            </p>
          )}
        </div>

        {/* ModalForm */}
        <ModalForm
          isOpen={isOpen}
          onClose={resetForm}
          isEditing={isEditing}
          formData={formData}
          labels={translations}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          language={language}
          formType="fertilizer"
        />
      </div>
    </div>
  );
}

export default SprayFertilizerForm;