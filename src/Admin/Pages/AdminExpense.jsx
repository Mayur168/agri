import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import ModalForm from "../Components/ModelForm";
import BackButton from "../Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";

function ExpenseForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const storedData = localStorage.getItem("storedData");
  const userData = storedData ? JSON.parse(storedData) : {};
  const defaultFarmerId = userData?.user?.farmer_id
    ? Number(userData.user.farmer_id)
    : null;

  if (defaultFarmerId === null) {
    console.warn(
      "No farmer_id found in localStorage. Ensure login data is stored correctly."
    );
  }

  const [formData, setFormData] = useState({
    id: null,
    amount: "",
    reason: "",
    description: "",
    farmer_id: defaultFarmerId,
    date_created: "",
    manager_id: null,
  });
  const [isEditing, setIsEditing] = useState(true);
  const [adminExpenses, setAdminExpenses] = useState([]);
  const [managerExpenses, setManagerExpenses] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [selectedManagerName, setSelectedManagerName] = useState(null);
  const [searchQueryExpenses, setSearchQueryExpenses] = useState("");
  const [expenseType, setExpenseType] = useState("admin");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Expenses",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirm: "You won't be able to revert this!",
      amount: "Amount",
      reason: "Reason",
      description: "Description",
      farmerId: "Farmer ID",
      managerId: "Manager ID",
      dateCreated: "Date Created",
      modalTitleAdmin: "Edit Admin Expense",
      modalTitleManager: "Edit Manager Expense",
      addAdminExpense: "Add Admin Expense",
      addManagerExpense: "Add Manager Expense",
      submit: "Save",
      searchPlaceholder: "Search...",
      managerExpense: "Manager",
      adminExpense: "Admin",
      noExpenses: "No expenses available",
      managerListTitle: "Select Manager",
      noManagers: "No managers available",
      expenseTitle: "View Expense",
    },
    mr: {
      title: "खर्च",
      edit: "संपादन",
      delete: "हटवा",
      cancel: "रद्द करा",
      deleteConfirm: "आपण हे परत करू शकणार नाही!",
      amount: "रक्कम",
      reason: "कारण",
      description: "वर्णन",
      farmerId: "शेतकरी आयडी",
      managerId: "व्यवस्थापक आयडी",
      dateCreated: "तारीख तयार झाली",
      modalTitleAdmin: "प्रशासक खर्च संपादन",
      modalTitleManager: "व्यवस्थापक खर्च संपादन",
      addAdminExpense: "प्रशासक खर्च जोडा",
      addManagerExpense: "व्यवस्थापक खर्च जोडा",
      submit: "जतन करा",
      searchPlaceholder: "शोधा...",
      managerExpense: "व्यवस्थापक",
      adminExpense: "प्रशासक",
      noExpenses: "कोणतेही खर्च उपलब्ध नाहीत",
      managerListTitle: "व्यवस्थापक निवडा",
      noManagers: "कोणतेही व्यवस्थापक उपलब्ध नाहीत",
      expenseTitle: "खर्च पहा",
    },
  };
  
  const labels = translations[language];

  const fetchAdminExpenses = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const farmerId = user?.farmer_id;
  
      if (!farmerId) {
        throw new Error(labels.farmerId + " not found in user data");
      }
  
      // Debug: Log the API URL and farmerId
      const apiUrl = `/farm/?action=getFarmerExpenses&farmer=${farmerId}`;
      console.log("Fetching admin expenses from:", api.baseURL + apiUrl);
      console.log("Farmer ID:", farmerId);
  
      const response = await api.get(apiUrl);
  
      let expensesData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data.map((expense) => ({
              ...expense,
              date_created: expense.date_created
                ? new Date(expense.date_created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A",
            }))
          : [];
  
      // Check if expenses are empty and show SweetAlert
      if (expensesData.length === 0) {
        Swal.fire({
          icon: "info",
          title: language === "en" ? "Info" : "माहिती",
          text: labels.noExpenses, // "No expenses available" or "कोणतेही खर्च उपलब्ध नाहीत"
        });
      }
  
      setAdminExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching admin expenses:", error);
      let errorMessage = error.message || labels.noExpenses;
      let title = language === "en" ? "Error" : "त्रुटी";
  
      // Handle 404 as empty expenses
      if (error.response?.status === 404) {
        errorMessage = labels.noExpenses; // Use "No expenses available" or Marathi equivalent
        title = language === "en" ? "Info" : "माहिती";
      }
  
      Swal.fire({
        icon: error.response?.status === 404 ? "info" : "error",
        title: title,
        text: errorMessage,
      });
      setAdminExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagerExpenses = async (managerId) => {
    setLoading(true);
    try {
      // Debug: Log the API URL and managerId
      const apiUrl = `/farm/?action=getManagerExpenses&manager=${managerId}`;
      console.log("Fetching manager expenses from:", api.baseURL + apiUrl);
      console.log("Manager ID:", managerId);
  
      const response = await api.get(apiUrl);
  
      let expensesData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data.map((expense) => ({
              ...expense,
              date_created: expense.date_created
                ? new Date(expense.date_created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A",
            }))
          : [];
  
      // Check if expenses are empty and show SweetAlert
      if (expensesData.length === 0) {
        Swal.fire({
          icon: "info",
          title: language === "en" ? "Info" : "माहिती",
          text: translations[language].noExpenses, // "No expenses available" or "कोणतेही खर्च उपलब्ध नाहीत"
        });
      }
  
      setManagerExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching manager expenses:", error);
      let errorMessage = error.message || translations[language].noExpenses;
      let title = language === "en" ? "Error" : "त्रुटी";
  
      // Handle 404 as empty expenses
      if (error.response?.status === 404) {
        errorMessage = translations[language].noExpenses;
        title = language === "en" ? "Info" : "माहिती";
      }
  
      Swal.fire({
        icon: error.response?.status === 404 ? "info" : "error",
        title: title,
        text: errorMessage,
      });
      setManagerExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const Id = user?.id;
      const response = await api.get(`/users/?action=getFarmManager&user_created=${Id}`);
      let managersData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data
          : response.data && Array.isArray(response.data)
          ? response.data
          : [];
      setManagers(managersData);
    } catch (error) {
      console.error("Error fetching managers:", error);
      Swal.fire("Error", "Failed to fetch manager list", "error");
      setManagers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expenseType === "admin") {
      fetchAdminExpenses();
    } else if (expenseType === "manager" && !selectedManagerId) {
      fetchManagers();
    } else if (expenseType === "manager" && selectedManagerId) {
      fetchManagerExpenses(selectedManagerId);
    }
  }, [expenseType, selectedManagerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      let response;
      if (expenseType === "admin") {
        if (defaultFarmerId === null) {
          throw new Error("farmer_id is null. Please log in again.");
        }
        if (formData.id) {
          const patchData = {
            action: "patchFarmerExpenses",
            id: Number(formData.id),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
          };
          response = await api.patch("/farm/", patchData);
          const updatedExpense = {
            ...adminExpenses.find((item) => item.id === formData.id),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            date_updated: new Date().toISOString(),
          };
          setAdminExpenses(
            adminExpenses.map((item) =>
              item.id === formData.id ? updatedExpense : item
            )
          );
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Admin expense updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          const postData = {
            action: "postFarmerExpenses",
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            farmer_id: defaultFarmerId,
          };
          response = await api.post("/farm/", postData);
          const serverAssignedId = response.data.data?.id;
          if (!serverAssignedId) {
            throw new Error("Server did not return an ID in the response");
          }
          const newExpense = {
            id: serverAssignedId,
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            farmer: defaultFarmerId,
            date_created: response.data.data?.date_created
              ? new Date(response.data.data.date_created).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
              : "N/A",
            date_updated: response.data.data?.date_updated,
            user_created: response.data.data?.user_created,
            user_updated: response.data.data?.user_updated,
          };
          setAdminExpenses((prev) => [...prev, newExpense]);
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Admin expense added!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } else if (expenseType === "manager") {
        if (!formData.id) {
          Swal.fire("Info", "Adding new manager expenses is disabled.", "info");
          return;
        }
        const patchData = {
          action: "patchManagerExpense",
          id: Number(formData.id),
          amount: parseFloat(formData.amount),
          reason: formData.reason,
          description: formData.description,
        };
        response = await api.patch("/farm/", patchData);
        const updatedExpense = {
          ...managerExpenses.find((item) => item.id === formData.id),
          amount: parseFloat(formData.amount),
          reason: formData.reason,
          description: formData.description,
        };
        setManagerExpenses(
          managerExpenses.map((item) =>
            item.id === formData.id ? updatedExpense : item
          )
        );
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Manager expense updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      resetForm();
    } catch (error) {
      console.error(
        "Error saving expense:",
        error.response?.data || error.message
      );
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save expense: " +
          (error.response?.data?.message || error.message),
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteAdmin = async (id) => {
    const result = await Swal.fire({
      title: language === "en" ? "Are you sure?" : "आपण खात्री आहात का?",
      text: labels.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: language === "en" ? "Yes, delete it!" : "होय, हटवा!",
      cancelButtonText: language === "en" ? "Cancel" : "रद्द करा",
    });

    if (result.isConfirmed) {
      try {
        const deleteData = { action: "delFarmerExpenses", id: Number(id) };
        await api.delete("/farm/", { data: deleteData });
        setAdminExpenses(adminExpenses.filter((item) => item.id !== id));
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin expense deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        resetForm(); // Ensure modal is closed and form is reset
      } catch (error) {
        console.error("Error deleting admin expense:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete admin expense",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleDeleteManager = async (id) => {
    const result = await Swal.fire({
      title: language === "en" ? "Are you sure?" : "आपण खात्री आहात का?",
      text: labels.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: language === "en" ? "Yes, delete it!" : "होय, हटवा!",
      cancelButtonText: language === "en" ? "Cancel" : "रद्द करा",
    });

    if (result.isConfirmed) {
      try {
        const payload = { action: "delManagerExpenses", id: Number(id) };
        await api.delete("/farm/", { data: payload });
        setManagerExpenses(managerExpenses.filter((item) => item.id !== id));
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Manager expense deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        resetForm(); 
      } catch (error) {
        console.error("Error deleting manager expense:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete manager expense",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
      manager_id: null,
    });
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    if (expenseType === "admin") {
      setFormData({
        ...item,
        id: Number(item.id),
        farmer_id: item.farmer,
      });
    } else if (expenseType === "manager") {
      setFormData({
        ...item,
        id: Number(item.id),
        manager_id: item.manager_id || selectedManagerId,
      });
    }
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleAdminExpense = () => {
    setExpenseType("admin");
    setSelectedManagerId(null);
    setSelectedManagerName(null);
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
      manager_id: null,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleManagerExpense = () => {
    setExpenseType("manager");
    setSelectedManagerId(null);
    setSelectedManagerName(null);
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
      manager_id: null,
    });
  };

  const handleManagerSelect = (manager) => {
    setSelectedManagerId(manager.id);
    setSelectedManagerName(
      `${manager.user?.first_name} ${manager.user?.last_name}`
    );
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
      manager_id: manager.id,
    });
    // Do not open modal for adding new manager expense
  };

  const filteredAdminExpenses = adminExpenses.filter((item) => {
    const searchLower = searchQueryExpenses.toLowerCase();
    return (
      item?.reason?.toLowerCase()?.includes(searchLower) ||
      item?.description?.toLowerCase()?.includes(searchLower) ||
      item?.amount?.toString().toLowerCase()?.includes(searchLower)
    );
  });

  const filteredManagerExpenses = managerExpenses
    .filter(
      (item) =>
        item.manager === selectedManagerId ||
        item.manager_id === selectedManagerId
    )
    .filter((item) => {
      const searchLower = searchQueryExpenses.toLowerCase();
      return (
        item?.reason?.toLowerCase()?.includes(searchLower) ||
        item?.description?.toLowerCase()?.includes(searchLower) ||
        item?.amount?.toString().toLowerCase()?.includes(searchLower)
      );
    });

  const styles = {
    managerListContainer: {
      // marginBottom: '2rem',
      // padding: '2rem',
      // backgroundColor: '#ffffff',
      // borderRadius: '16px',
      // boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      // border: '1px solid #e9ecef',
    },
    managerCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.5rem",
      // marginBottom: '1rem',
      background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
      // borderRadius: '12px',
      // border: '1px solid #dee2e6',
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      // boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    },
    managerCardHover: {
      // transform: 'translateY(-5px)',
      // boxShadow: '0 12px 25px rgba(0, 0, 0, 0.12)',
      // background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
    },
    managerName: {
      // fontSize: '1.25rem',
      // fontWeight: '600',
      color: "#212529",
      fontFamily: '"Inter", sans-serif',
    },
    managerId: {
      fontSize: "0.95rem",
      color: "#6c757d",
      marginLeft: "1rem",
      fontFamily: '"Inter", sans-serif',
      fontWeight: "400",
    },
    expenseCard: {
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem",
      marginBottom: "1rem",
      background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
      borderRadius: "12px",
      border: "1px solid #dee2e6",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    },
    expenseCardHover: {
      // transform: 'translateY(-5px)',
      // boxShadow: '0 12px 25px rgba(0, 0, 0, 0.12)',
      // background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
    },
    expenseField: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
      fontSize: "1rem",
      color: "#212529",
      fontFamily: '"Inter", sans-serif',
    },
    expenseLabel: {
      fontWeight: "600",
      color: "#343a40",
    },
    expenseValue: {
      color: "#6c757d",
      maxWidth: "60%",
      wordBreak: "break-word",
    },
    expenseActions: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    noItems: {
      fontSize: "1.1rem",
      color: "#6c757d",
      textAlign: "center",
      padding: "2rem",
      fontFamily: '"Inter", sans-serif',
      fontStyle: "italic",
      // backgroundColor: '#f8f9fa',
      // borderRadius: '10px',
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      letterSpacing: "-0.015 RESOURCEem",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      background: "linear-gradient(90deg, #28a745, #34d058)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      color: "white",
      background: "transparent",
      // borderRadius: '10px',
      // border: '1px solid #dee2e6',
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      // boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    backButtonHover: {
      // transform: 'translateY(-3px)',
      // background: 'linear-gradient(145deg, #f1f3f5, #ffffff)',
      // boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    },
    backIcon: {
      fontSize: "1.1rem",
      color: "white",
      transition: "color 0.3s ease",
    },
  };

  return (
    <div className="container bg-white mb-5 p-0">
      <div className="mb-3 d-flex align-items-center px-3 py-3 bg-success text-white rounded-3">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaMoneyBillWave className="me-2" />
          {expenseType === "admin"
            ? labels.adminExpense
            : labels.managerExpense}
        </h2>
      </div>

      {expenseType === "manager" && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control shadow-sm rounded-3 border-success px-3"
            placeholder={`${labels.searchPlaceholder}`}
            value={searchQueryExpenses}
            onChange={(e) => setSearchQueryExpenses(e.target.value)}
          />
        </div>
      )}
      {expenseType === "admin" && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control shadow-sm rounded-3 border-success px-3"
            placeholder={labels.searchPlaceholder}
            value={searchQueryExpenses}
            onChange={(e) => setSearchQueryExpenses(e.target.value)}
          />
        </div>
      )}

      <div className="d-flex align-items-center mb-2 gap-2">
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-6550 py-2 shadow-sm flex-grow-1 ${
            expenseType === "admin"
              ? "btn-success"
              : "btn-outline-success opacity-50"
          }`}
          onClick={handleAdminExpense}
        >
          {labels.adminExpense}
        </button>
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm flex-grow-1 ${
            expenseType === "manager"
              ? "btn-success"
              : "btn-outline-success opacity-50"
          }`}
          onClick={handleManagerExpense}
        >
          {labels.managerExpense}
        </button>
      </div>

      {expenseType === "manager" && !selectedManagerId ? (
        <div style={styles.managerListContainer}>
          <div style={styles.titleContainer}>
            <div style={{ width: "40px" }}></div>
            <h3 className="bg-success text-white p-2 rounded">
              {labels.managerListTitle}
            </h3>
            <div style={{ width: "40px" }}></div>
          </div>
          {loading ? (
            <Spinner />
          ) : managers.length > 0 ? (
            <div className="new bg-white">
              {managers.map((manager) => (
                <div
                  key={manager.id}
                  className="border rounded shadow-none"
                  style={styles.managerCard}
                  onClick={() => handleManagerSelect(manager)}
                >
                  <li type="none" style={styles.managerName}>
                    {manager.user?.first_name} {manager.user?.last_name}
                    <span style={styles.managerId}>(ID: {manager.id})</span>
                  </li>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.noItems}>{labels.noManagers}</p>
          )}
        </div>
      ) : (
        <div className="row">
          {(expenseType === "admin" || (expenseType === "manager" && selectedManagerId)) && (
            <div style={styles.expenseListContainer}>
              {expenseType === "manager" && selectedManagerId && (
                <div
                  style={styles.titleContainer}
                  className="d-flex bg-success align-items-center rounded"
                >
                  <button
                    style={styles.backButton}
                    onClick={() => setSelectedManagerId(null)}
                    className="text-white border-0"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        styles.backButtonHover.transform;
                      e.currentTarget.style.background =
                        styles.backButtonHover.background;
                      e.currentTarget.style.boxShadow =
                        styles.backButtonHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.background =
                        styles.backButton.background;
                      e.currentTarget.style.boxShadow =
                        styles.backButton.boxShadow;
                    }}
                  >
                    <FaArrowLeft style={styles.backIcon} />
                  </button>
                  <h3 className="bg-success text-center text-white p-2 rounded">
                    {labels.expenseTitle}
                  </h3>
                  <div style={{ width: "40px" }}></div>
                </div>
              )}
              {expenseType === "admin" && (
                <div style={styles.titleContainer}>
                  <div style={{ width: "40px" }}></div>
                  <div style={{ width: "40px" }}></div>
                </div>
              )}
              <div className="col-12 mb-4">
                {loading ? (
                  <div className="text-center my-5">
                    <Spinner />
                  </div>
                ) : (
                  <div>
                    {(expenseType === "admin"
                      ? filteredAdminExpenses
                      : filteredManagerExpenses
                    ).length > 0 ? (
                      (expenseType === "admin"
                        ? filteredAdminExpenses
                        : filteredManagerExpenses
                      ).map((item) => (
                        <div
                          key={item.id}
                          style={styles.expenseCard}
                        >
                          <div style={styles.expenseField}>
                            <span style={styles.expenseLabel}>
                              {labels.dateCreated}:
                            </span>
                            <span style={styles.expenseValue}>
                              {item.date_created || "N/A"}
                            </span>
                          </div>
                          <div style={styles.expenseField}>
                            <span style={styles.expenseLabel}>
                              {labels.amount}:
                            </span>
                            <span style={styles.expenseValue}>
                              ₹{item.amount || "N/A"}
                            </span>
                          </div>
                          <div style={styles.expenseField}>
                            <span style={styles.expenseLabel}>
                              {labels.reason}:
                            </span>
                            <span style={styles.expenseValue}>
                              {item.reason || "N/A"}
                            </span>
                          </div>
                          <div style={styles.expenseField}>
                            <span style={styles.expenseLabel}>
                              {labels.description}:
                            </span>
                            <span style={styles.expenseValue}>
                              {item.description || "N/A"}
                            </span>
                          </div>
                          <div style={styles.expenseActions}>
                            <button
                              className="btn btn-primary btn-sm d-flex align-items-center"
                              onClick={() => handleEdit(item)}
                              title={labels.edit}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger btn-sm d-flex align-items-center"
                              onClick={() =>
                                expenseType === "admin"
                                  ? handleDeleteAdmin(item.id)
                                  : handleDeleteManager(item.id)
                              }
                              title={labels.delete}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={styles.noItems}>{labels.noExpenses}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <ModalForm
        isOpen={isOpen}
        onClose={resetForm}
        isEditing={isEditing}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={
          expenseType === "admin" ? handleDeleteAdmin : handleDeleteManager
        }
        language={language}
        formType={expenseType === "admin" ? "adminExpense" : "managerExpense"}
      />
    </div>
  );
}

export default ExpenseForm;