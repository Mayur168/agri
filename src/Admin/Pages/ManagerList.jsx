import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaUserTie,FaPlus } from "react-icons/fa";
import "./villages.css";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import ModalForm from "../../Admin/Components/ModelForm";
import api from "../../src/api/axiosInstance";
import Swal from "sweetalert2";

const ManagersList = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Managers List",
      addManager: " Add Manager",
      searchPlaceholder: "Search..",
      modalTitle: "Add New Manager",
      view: "View Manager",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      role: "Role",
      farmName: "Farm Name",
      farmLocation: "Farm Location",
      managerExperience: "Manager Experience (years)",
      submit: "Submit",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      manager: "Manager",
      admin: "Admin",
      toast: {
        fetchError: "Failed to fetch managers.",
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
        managerUpdatedSuccess: "Manager updated successfully!",
      },
    },
    mr: {
      title: "प्रशासक यादी",
      addManager: " व्यवस्थापक जोडा",
      searchPlaceholder: "शोधा..",
      modalTitle: "नवीन व्यवस्थापक जोडा",
      view: "व्यवस्थापक पहा",
      firstName: "प्रथम नाव",
      lastName: "आडनाव",
      email: "ईमेल",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड पुष्टीकरण",
      role: "भूमिका",
      farmName: "शेताचे नाव",
      farmLocation: "शेताचे स्थान",
      managerExperience: "व्यवस्थापकाचा अनुभव (वर्षे)",
      submit: "सबमिट करा",
      cancel: "रद्द करा",
      edit: "संपादन",
      delete: "हटवा",
      manager: "व्यवस्थापक",
      admin: "प्रशासक",
      toast: {
        fetchError: "व्यवस्थापक आणण्यात अयशस्वी.",
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
        managerUpdatedSuccess: "व्यवस्थापक यशस्वीरित्या अद्यतनित केले गेले!",
      },
    },
  };

  const [managers, setManagers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
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
    manager_experience: "",
  });
  const [initialFormData, setInitialFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      setFetchLoading(true);
      try {
        const response = await api.get("/users/?action=getFarmManager");
        if (response.data && Array.isArray(response.data.data)) {
          setManagers(response.data.data);
          localStorage.setItem("managers", JSON.stringify(response.data.data));
        } else {
          setManagers([]);
          localStorage.setItem("managers", JSON.stringify([]));
        }
      } catch (err) {
        console.error("Error fetching managers:", err.response || err);
        toast.error(
          err.response?.status === 401
            ? translations[language].toast.unauthorized
            : translations[language].toast.fetchError
        );
        if (err.response?.status === 401) navigate("/login");
        setManagers([]);
        localStorage.setItem("managers", JSON.stringify([]));
      } finally {
        setFetchLoading(false);
      }
    };

    fetchManagers();
  }, [navigate, language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddManager = async () => {
    if (!formData.phone.trim() || !formData.first_name.trim()) {
      toast.error(translations[language].toast.requiredFields);
      return;
    }
    if (!formData.password.trim()) {
      toast.error(translations[language].toast.passwordRequired);
      return;
    }
    if (formData.password.trim() !== formData.confirm_password.trim()) {
      toast.error(translations[language].toast.passwordsMismatch);
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");

      // Step 1: Create the user with postUser payload
      // const userPayload = {
      //   action: "postUser",
      //   first_name: formData.first_name.trim(),
      //   last_name: formData.last_name.trim(),
      //   email: formData.email.trim(),
      //   phone: formData.phone.trim(),
      //   password: formData.password.trim(), // Added password as required by UI
      //   is_admin: formData.role === "Admin",
      //   is_manager: formData.role === "Manager",
      // };

      // const userResponse = await api.post("/users/", userPayload);

      // Step 2: If role is Manager, create farm manager with postFarmManager payload
      if (formData.role === "Manager") {
        const managerPayload = {
          action: "postFarmManager",
          user: {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
          },
          farm_name: formData.farm_name.trim(),
          farm_location: formData.farm_location.trim(),
          manager_experience: parseInt(formData.manager_experience) || 0,
        };

        const managerResponse = await api.post("/users/", managerPayload);
        const newManager = managerResponse.data.data;
        const updatedManagers = [newManager, ...managers];
        setManagers(updatedManagers);
        localStorage.setItem("managers", JSON.stringify(updatedManagers));
        toast.success(translations[language].toast.managerAddedSuccess);
      } else {
        toast.success(translations[language].toast.adminAddedSuccess);
      }

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
        manager_experience: "",
      });
    } catch (err) {
      console.error("API Error (Add Manager):", err.response || err);
      if (err.response && err.response.status === 400) {
        toast.error(
          err.response.data.message || translations[language].toast.phoneInUse
        );
      } else {
        toast.error(
          err.response?.data?.message ||
            translations[language].toast.addManagerError
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditManager = (manager) => {
    const initialData = {
      first_name: manager.user.first_name,
      last_name: manager.user.last_name,
      email: manager.user.email,
      phone: manager.user.phone,
      password: "",
      confirm_password: "",
      role: manager.role || "Manager",
      farm_name: manager.farm_name || "",
      farm_location: manager.farm_location || "",
      manager_experience: manager.manager_experience || "",
    };
    setEditManagerId(manager.id);
    setFormData(initialData);
    setInitialFormData(initialData);
    setShowEditModal(true);
  };

  const handleViewManager = (manager) => {
    setFormData({
      first_name: manager.user.first_name,
      last_name: manager.user.last_name,
      email: manager.user.email,
      phone: manager.user.phone,
      password: "",
      confirm_password: "",
      role: manager.role || "Manager",
      farm_name: manager.farm_name || "",
      farm_location: manager.farm_location || "",
      manager_experience: manager.manager_experience || "",
    });
    setShowViewModal(true);
  };

  const handleUpdateManager = async () => {
    if (!formData.phone.trim()) {
      toast.error(translations[language].toast.phoneRequired);
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found.");
  
      const payload = {
        id: editManagerId,
        action: "patchFarmManager",
        user: {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        farm_name: formData.farm_name.trim(),
        farm_location: formData.farm_location.trim(),
        manager_experience: parseInt(formData.manager_experience) || 0,
      };
  
      // Only include fields that have changed
      const changedPayload = { id: editManagerId, action: "patchFarmManager" };
      let hasChanges = false;
  
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
        changedPayload.farm_name = formData.farm_name.trim();
        hasChanges = true;
      }
      if (formData.farm_location.trim() !== initialFormData.farm_location) {
        changedPayload.farm_location = formData.farm_location.trim();
        hasChanges = true;
      }
      if (
        parseInt(formData.manager_experience) !==
        parseInt(initialFormData.manager_experience)
      ) {
        changedPayload.manager_experience = parseInt(formData.manager_experience) || 0;
        hasChanges = true;
      }
  
      if (!hasChanges) {
        toast.info(translations[language].toast.noChanges);
        setShowEditModal(false);
        setLoading(false);
        return;
      }
  
      const response = await api.patch("/users/", changedPayload);
      const updatedManager = response.data.data;
      const updatedManagers = managers.map((m) =>
        m.id === editManagerId ? { ...m, ...updatedManager } : m
      );
      setManagers(updatedManagers);
      localStorage.setItem("managers", JSON.stringify(updatedManagers));
      toast.success(translations[language].toast.managerUpdatedSuccess);
      setShowEditModal(false);
    } catch (err) {
      console.error("API Error (Update Manager):", err.response || err);
      if (
        err.response?.data?.error_msg?.includes(
          "duplicate key value violates unique constraint"
        )
      ) {
        toast.error(translations[language].toast.emailInUse);
      } else {
        toast.error(
          err.response?.data?.message ||
            translations[language].toast.updateManagerError
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteManager = async (managerId) => {
    const result = await Swal.fire({
      title: `${translations[language].delete} Manager`,
      text:
        language === "en"
          ? "Are you sure you want to delete this manager? This action cannot be undone."
          : "आपण खात्रीने हे व्यवस्थापक हटवू इच्छिता का? ही क्रिया परत करता येणार नाही.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: translations[language].delete,
      cancelButtonText: translations[language].cancel,
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
  
    try {
      const deletePayload = {
        role: "farmer", // Assuming this should be "manager" instead of "farmer" based on context
        action: "delFarmer",
        id: managerId,
      };
  
      const response = await api.delete("/users/farms/", {
        data: deletePayload,
      });
  
      if (response.status === 200 || response.status === 204) {
        const updatedManagers = managers.filter((m) => m.id !== managerId);
        setManagers(updatedManagers);
        localStorage.setItem("managers", JSON.stringify(updatedManagers));
  
        await Swal.fire({
          title: language === "en" ? "Deleted!" : "हटवले!",
          text:
            language === "en"
              ? "Manager has been deleted successfully."
              : "व्यवस्थापक यशस्वीरित्या हटवले गेले आहे.",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        setShowEditModal(false);
        setShowViewModal(false);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("API Error (Delete Manager):", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
  
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error_msg ||
        (language === "en"
          ? "Failed to delete manager. Please try again or contact support."
          : "व्यवस्थापक हटविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा किंवा समर्थनाशी संपर्क साधा.");
  
      await Swal.fire({
        title: language === "en" ? "Error!" : "त्रुटी!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredManagers = Array.isArray(managers)
    ? managers.filter(
        (manager) =>
          manager &&
          manager.user &&
          ((typeof manager.user.phone === "string" &&
            manager.user.phone
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
            (typeof manager.user.first_name === "string" &&
              manager.user.first_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())))
      )
    : [];

  return (
    <div className="managers-container mb-5">
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaUserTie className="me-2" /> {translations[language].title}
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
            onClick={() => {
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
                manager_experience: "",
              });
              setShowModal(true);
            }}
            disabled={loading}
          >
           <FaPlus className="me-2" /> {translations[language].addManager}
          </button>
        </div>
      </div>

      <div className="managers-grid">
        {fetchLoading && managers.length === 0 ? (
          <div className="text-center m-auto">
            <Spinner />
          </div>
        ) : filteredManagers.length > 0 ? (
          filteredManagers.map((manager) => (
            <div
              key={manager.id}
              className="manager-card d-flex justify-content-between align-items-center flex-wrap"
            >
              <span className="manager-name">
                {manager.user.first_name} {manager.user.last_name}
              </span>
              <div className="manager-actions">
                <div className="dropdown">
                  <button
                    className="btn btn-link p-0"
                    type="button"
                    id={`dropdownMenuButton-${manager.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaEye className="eye-icon" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby={`dropdownMenuButton-${manager.id}`}
                  >
                    <button
                      className="dropdown-item btn btn-primary btn-sm"
                      onClick={() => handleEditManager(manager)}
                      disabled={loading}
                    >
                      {translations[language].edit}
                    </button>
                    <button
                      className="dropdown-item btn btn-info btn-sm"
                      onClick={() => handleViewManager(manager)}
                      disabled={loading}
                    >
                      {translations[language].view}
                    </button>
                    <button
                      className="dropdown-item btn btn-danger btn-sm"
                      onClick={() => handleDeleteManager(manager.id)}
                      disabled={loading}
                    >
                      {translations[language].delete}
                    </button>
                    <button
                      className="dropdown-item btn btn-secondary btn-sm"
                      disabled={loading}
                    >
                      {translations[language].cancel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mx-auto">
            {language === "en"
              ? "No managers found"
              : "कोणतेही व्यवस्थापक सापडले नाहीत"}
          </p>
        )}
      </div>

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
      />

      <ModalForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        isEditing={true}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleUpdateManager}
        handleDelete={() => handleDeleteManager(editManagerId)}
        language={language}
        formType="manager"
      />

      <ModalForm
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        isEditing={false}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={() => {}}
        handleDelete={() => handleDeleteManager(editManagerId)}
        language={language}
        formType="manager"
      />

      <ToastContainer />
    </div>
  );
};

export default ManagersList;
