import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaMoneyBillWave,
  FaEdit,
  FaArrowLeft,
  FaEye,
  FaPlus,
} from "react-icons/fa";
import ModalForm from "../Components/ModelForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import Header from "../Components/Header";
import { translations } from "../Components/translations/index";


function ExpenseForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const storedData = localStorage.getItem("user");
  const userData = storedData ? JSON.parse(storedData) : {};
  const defaultFarmerId = userData?.farmer_id
    ? Number(userData.farmer_id)
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
  const [farmerAmounts, setFarmerAmounts] = useState({
    taken_amount: 0,
    pending_amount: 0,
    total_expense: 0,
    farmer_amount_id: null,
  });
  const [managerTotalAmount, setManagerTotalAmount] = useState(0);

  const labels = translations[language];

  const fetchAdminExpenses = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const farmerId = user?.farmer_id;

      if (!farmerId) {
        throw new Error(labels.farmerId + " not found in user data");
      }

      // Fetch taken amount first
      let amountData = null;
      let takenAmount = 0;
      let farmerAmountId = null;
      try {
        const amountUrl = `/farm/?action=getFarmerAmount&farmer=${farmerId}`;
        const amountResponse = await api.get(amountUrl);
        amountData = Array.isArray(amountResponse.data.data)
          ? amountResponse.data.data[0]
          : null;
        if (amountData) {
          takenAmount = parseFloat(amountData.taken_amount) || 0;
          farmerAmountId = amountData.id || null;
        }
      } catch (error) {}

      // Fetch expenses
      const apiUrl = `/farm/?action=getFarmerExpenses&farmer=${farmerId}`;
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

      // Calculate total expense from expenses
      const totalExpense = expensesData.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0
      );

      // Update farmerAmounts state
      setFarmerAmounts({
        taken_amount: takenAmount,
        pending_amount: takenAmount - totalExpense,
        total_expense: totalExpense,
        farmer_amount_id: farmerAmountId,
      });
      console.log("Updated farmerAmounts:", {
        taken_amount: takenAmount,
        pending_amount: takenAmount - totalExpense,
        total_expense: totalExpense,
        farmer_amount_id: farmerAmountId,
      });

      if (expensesData.length === 0) {
        Swal.fire({
          icon: "info",
          title: language === "en" ? "Info" : "माहिती",
          text: labels.noExpenses,
        });
      }

      setAdminExpenses(expensesData);
    } catch (error) {
      let errorMessage = error.message || labels.noExpenses;
      let title = language === "en" ? "Error" : "त्रुटी";

      if (error.response?.status === 404) {
        errorMessage = labels.noExpenses;
        title = language === "en" ? "Info" : "माहिती";
      }

      Swal.fire({
        icon: error.response?.status === 404 ? "info" : "error",
        title: title,
        text: errorMessage,
      });
      setAdminExpenses([]);
      // Ensure taken amount is still attempted to be fetched
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const farmerId = user?.farmer_id;
        const amountUrl = `/farm/?action=getFarmerAmount&farmer=${farmerId}`;
        const amountResponse = await api.get(amountUrl);
        const amountData = Array.isArray(amountResponse.data.data)
          ? amountResponse.data.data[0]
          : null;
        if (amountData) {
          setFarmerAmounts({
            taken_amount: parseFloat(amountData.taken_amount) || 0,
            pending_amount: parseFloat(amountData.taken_amount) || 0,
            total_expense: 0,
            farmer_amount_id: amountData.id || null,
          });
        } else {
          setFarmerAmounts({
            taken_amount: 0,
            pending_amount: 0,
            total_expense: 0,
            farmer_amount_id: null,
          });
        }
      } catch (retryError) {
        setFarmerAmounts({
          taken_amount: 0,
          pending_amount: 0,
          total_expense: 0,
          farmer_amount_id: null,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchManagerExpenses = async (managerId) => {
    setLoading(true);
    try {
      const apiUrl = `/farm/?action=getManagerExpenses&manager=${managerId}`;
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

      if (expensesData.length === 0) {
        Swal.fire({
          icon: "info",
          title: language === "en" ? "Info" : "माहिती",
          text: labels.noExpenses,
        });
      }

      setManagerExpenses(expensesData);
      setManagerTotalAmount(response.data.total_amount || 0);
    } catch (error) {
      let errorMessage = error.message || labels.noExpenses;
      let title = language === "en" ? "Error" : "त्रुटी";

      if (error.response?.status === 404) {
        errorMessage = labels.noExpenses;
        title = language === "en" ? "Info" : "माहिती";
      }

      Swal.fire({
        icon: error.response?.status === 404 ? "info" : "error",
        title: title,
        text: errorMessage,
      });
      setManagerExpenses([]);
      setManagerTotalAmount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const Id = user?.id;
      const response = await api.get(
        `/users/?action=getFarmManager&user_created=${Id}`
      );
      let managersData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data
          : response.data && Array.isArray(response.data)
          ? response.data
          : [];
      setManagers(managersData);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch manager list", "error");
      setManagers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expenseType === "admin") {
      fetchAdminExpenses();
    } else if (expenseType === "manager" && selectedManagerId) {
      fetchManagerExpenses(selectedManagerId);
    } else if (expenseType === "manager" && !selectedManagerId) {
      fetchManagers();
      setManagerExpenses([]);
      setManagerTotalAmount(0);
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
        if (!farmerAmounts.farmer_amount_id) {
          Swal.fire({
            icon: "warning",
            title: language === "en" ? "Warning" : "चेतावणी",
            text: labels.noFarmerAmount,
            timer: 2000,
            showConfirmButton: false,
          });
        }
        if (formData.id) {
          const oldExpense = adminExpenses.find(
            (item) => item.id === formData.id
          );
          const oldAmount = parseFloat(oldExpense.amount);
          const newAmount = parseFloat(formData.amount);
          const amountDifference = newAmount - oldAmount;

          const patchData = {
            action: "patchFarmerExpenses",
            id: Number(formData.id),
            amount: newAmount,
            reason: formData.reason,
            description: formData.description,
          };
          response = await api.patch("/farm/", patchData);
          const updatedExpense = {
            ...oldExpense,
            amount: newAmount,
            reason: formData.reason,
            description: formData.description,
            date_updated: new Date().toISOString(),
            date_created: formData.date_created,
          };
          setAdminExpenses(
            adminExpenses.map((item) =>
              item.id === formData.id ? updatedExpense : item
            )
          );
          setFarmerAmounts((prev) => ({
            ...prev,
            total_expense: prev.total_expense + amountDifference,
            pending_amount: prev.pending_amount - amountDifference,
          }));
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
            farmer_amount: farmerAmounts.farmer_amount_id || null,
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
            farmer_amount: farmerAmounts.farmer_amount_id || null,
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
          setAdminExpenses((prev) => [newExpense, ...prev]);
          setFarmerAmounts((prev) => ({
            ...prev,
            total_expense: prev.total_expense + parseFloat(formData.amount),
            pending_amount: prev.pending_amount - parseFloat(formData.amount),
          }));
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Admin expense added!",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchAdminExpenses(); // Refetch to ensure consistency
        }
      } else if (expenseType === "manager") {
        if (!formData.id) {
          const postData = {
            action: "postManagerExpenses",
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            manager_id: selectedManagerId,
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
            manager_id: selectedManagerId,
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
          setManagerExpenses((prev) => [newExpense, ...prev]);
          setManagerTotalAmount((prev) => prev + parseFloat(formData.amount));
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Manager expense added!",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          const oldExpense = managerExpenses.find(
            (item) => item.id === formData.id
          );
          const oldAmount = parseFloat(oldExpense.amount);
          const newAmount = parseFloat(formData.amount);
          const amountDifference = newAmount - oldAmount;

          const patchData = {
            action: "patchManagerExpense",
            id: Number(formData.id),
            amount: newAmount,
            reason: formData.reason,
            description: formData.description,
          };
          response = await api.patch("/farm/", patchData);
          const updatedExpense = {
            ...oldExpense,
            amount: newAmount,
            reason: formData.reason,
            description: formData.description,
            date_created: formData.date_created,
          };
          setManagerExpenses(
            managerExpenses.map((item) =>
              item.id === formData.id ? updatedExpense : item
            )
          );
          setManagerTotalAmount((prev) => prev + amountDifference);
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Manager expense updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
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
        text:
          "Failed to save expense: " +
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
        const deletedExpense = adminExpenses.find((item) => item.id === id);
        setAdminExpenses(adminExpenses.filter((item) => item.id !== id));
        setFarmerAmounts((prev) => ({
          ...prev,
          total_expense: prev.total_expense - parseFloat(deletedExpense.amount),
          pending_amount:
            prev.pending_amount + parseFloat(deletedExpense.amount),
        }));
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin expense deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        resetForm();
      } catch (error) {
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
        const deletedExpense = managerExpenses.find((item) => item.id === id);
        setManagerExpenses(managerExpenses.filter((item) => item.id !== id));
        setManagerTotalAmount(
          (prev) => prev - parseFloat(deletedExpense.amount)
        );
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Manager expense deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        resetForm();
      } catch (error) {
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

  const handleView = (item) => {
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
    setIsEditing(false);
    setIsOpen(true);
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
    setManagerExpenses([]);
    setManagerTotalAmount(0);
    fetchAdminExpenses();
  };

  const handleManagerExpense = () => {
    setExpenseType("manager");
    setSelectedManagerId(null);
    setSelectedManagerName(null);
    setAdminExpenses([]);
    fetchManagers();
  };

  const handleAdminAdd = () => {
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

  const handleManagerAdd = () => {
    if (!selectedManagerId) {
      Swal.fire({
        icon: "info",
        title: language === "en" ? "Info" : "माहिती",
        text:
          language === "en"
            ? "Please select a manager first."
            : "कृपया प्रथम व्यवस्थापक निवडा ",
      });
      return;
    }
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
      manager_id: selectedManagerId,
    });
    setIsEditing(true);
    setIsOpen(true);
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
    fetchManagerExpenses(manager.id);
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
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "1px solid #e9ecef",
    },
    managerCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
      borderRadius: "8px",
      border: "1px solid #dee2e6",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      marginBottom: "0.5rem",
    },
    managerName: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#212529",
      fontFamily: '"Inter", sans-serif',
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
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#ffffff",
      fontFamily: '"Inter", sans-serif',
      letterSpacing: "-0.015em",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
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
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
    backIcon: {
      fontSize: "1.1rem",
      color: "white",
      transition: "color 0.3s ease",
    },
    tabContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#28a745",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      marginBottom: "1rem",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      color: "#fff",
      backgroundColor: "#218838",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    amountContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "0.3rem",
      marginBottom: "1.5rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      border: "1px solid #dee2e6",
    },
    amountField: {
      flex: 1,
      padding: "0.75rem",
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      border: "1px solid #ced4da",
      textAlign: "center",
    },
    amountLabel: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#343a40",
      marginBottom: "0.5rem",
    },
    amountValue: {
      fontSize: "1.1rem",
      fontWeight: "500",
      color: "#28a745",
    },
    warningText: {
      fontSize: "0.9rem",
      color: "#dc3545",
      textAlign: "center",
      marginTop: "0.5rem",
    },
  };

  return (
    <div
      className="container bg-white mb-5 p-0 d-flex flex-column"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Header
        title={
          expenseType === "admin" ? labels.adminExpense : labels.managerExpense
        }
        icon={FaMoneyBillWave}
      />

      <div style={styles.tabContainer}>
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-4 py-2 shadow-sm w-100 ${
            expenseType === "admin" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={handleAdminExpense}
        >
          {labels.adminExpense}
        </button>
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-4 py-2 shadow-sm w-100 ${
            expenseType === "manager" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={handleManagerExpense}
        >
          {labels.managerExpense}
        </button>
      </div>

      <div className="flex-grow-1 overflow-hidden">
        {expenseType === "manager" && !selectedManagerId ? (
          <div style={{ height: "100%", overflowY: "auto" }}>
            <div style={styles.managerListContainer}>
              <div style={styles.titleContainer} className="bg-success">
                <h3 className="text-white m-0">{labels.managerListTitle}</h3>
              </div>
              {loading ? (
                <Spinner />
              ) : managers.length > 0 ? (
                <div className="bg-white">
                  {managers.map((manager) => (
                    <div
                      key={manager.id}
                      className="border rounded shadow-none"
                      style={styles.managerCard}
                      onClick={() => handleManagerSelect(manager)}
                    >
                      <li type="none" style={styles.managerName}>
                        {manager.user?.first_name} {manager.user?.last_name}
                      </li>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={styles.noItems}>{labels.noManagers}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="row h-100">
            <div
              className="col-12 d-flex flex-column"
              style={{ height: "100%" }}
            >
              {(expenseType === "admin" ||
                (expenseType === "manager" && selectedManagerId)) && (
                <>
                  <div
                    style={styles.titleContainer}
                    className="bg-success d-flex align-items-center"
                  >
                    {expenseType === "manager" && selectedManagerId && (
                      <button
                        style={styles.backButton}
                        onClick={() => setSelectedManagerId(null)}
                        className="text-white border-0"
                      >
                        <FaArrowLeft style={styles.backIcon} />
                      </button>
                    )}
                    <h3 className="text-white m-0 flex-grow-1 text-center">
                      {labels.expenseTitle}
                    </h3>
                    <button
                      style={styles.addButton}
                      className="bg-white text-success btn-sm"
                      onClick={
                        expenseType === "admin"
                          ? handleAdminAdd
                          : handleManagerAdd
                      }
                    >
                      <FaPlus /> {labels.add}
                    </button>
                  </div>
                  {expenseType === "admin" && (
                    <div style={styles.amountContainer}>
                      <div style={styles.amountField}>
                        <div style={styles.amountLabel}>
                          {labels.takenAmount}
                        </div>
                        <div style={styles.amountValue}>
                          {farmerAmounts.taken_amount}
                        </div>
                      </div>
                      <div style={styles.amountField}>
                        <div style={styles.amountLabel}>
                          {labels.pendingAmount}
                        </div>
                        <div style={styles.amountValue}>
                          {farmerAmounts.pending_amount}
                        </div>
                      </div>
                      <div style={styles.amountField}>
                        <div style={styles.amountLabel}>
                          {labels.totalExpense}
                        </div>
                        <div style={styles.amountValue}>
                          {farmerAmounts.total_expense}
                        </div>
                      </div>
                    </div>
                  )}
                  {expenseType === "admin" &&
                    !farmerAmounts.farmer_amount_id &&
                    adminExpenses.length > 0 && (
                      <p style={styles.warningText}>{labels.noFarmerAmount}</p>
                    )}
                  {expenseType === "manager" && selectedManagerId && (
                    <div style={styles.amountContainer}>
                      <div style={styles.amountField}>
                        <div style={styles.amountLabel}>
                          {labels.totalExpense}
                        </div>
                        <div style={styles.amountValue}>
                          ₹{managerTotalAmount}
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    {loading ? (
                      <div className="text-center my-5">
                        <Spinner />
                      </div>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <table
                          className="table table-striped table-bordered mb-0"
                          style={{ tableLayout: "fixed" }}
                        >
                          <thead className="bg-success text-white">
                            <tr>
                              <th scope="col" style={{ width: "25%" }}>
                                {labels.dateCreated}
                              </th>
                              <th scope="col" style={{ width: "25%" }}>
                                {labels.amount}
                              </th>
                              <th scope="col" style={{ width: "25%" }}>
                                {labels.reason}
                              </th>
                              <th scope="col" style={{ width: "25%" }}>
                                {labels.actions}
                              </th>
                            </tr>
                          </thead>
                        </table>
                        <div
                          style={{
                            maxHeight: "calc(100% - 50px)",
                            overflowY: "auto",
                          }}
                        >
                          <table
                            className="table table-striped table-bordered mb-0"
                            style={{ tableLayout: "fixed" }}
                          >
                            <tbody>
                              {expenseType === "admin" ? (
                                filteredAdminExpenses.length > 0 ? (
                                  filteredAdminExpenses.map((item) => (
                                    <tr key={item.id}>
                                      <td style={{ width: "25%" }}>
                                        {item.date_created || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        ₹{item.amount || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        {item.reason || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        <div className="d-flex gap-2">
                                          <button
                                            className="btn btn-info btn-sm d-flex align-items-center"
                                            onClick={() => handleView(item)}
                                            title={labels.view}
                                          >
                                            <FaEye />
                                          </button>
                                          <button
                                            className="btn btn-primary btn-sm d-flex align-items-center"
                                            onClick={() => handleEdit(item)}
                                            title={labels.edit}
                                          >
                                            <FaEdit />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="4"
                                      style={{ textAlign: "center" }}
                                    >
                                      {labels.noExpenses}
                                    </td>
                                  </tr>
                                )
                              ) : expenseType === "manager" &&
                                selectedManagerId ? (
                                filteredManagerExpenses.length > 0 ? (
                                  filteredManagerExpenses.map((item) => (
                                    <tr key={item.id}>
                                      <td style={{ width: "25%" }}>
                                        {item.date_created || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        ₹{item.amount || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        {item.reason || "N/A"}
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        <div className="d-flex gap-2">
                                          <button
                                            className="btn btn-info btn-sm d-flex align-items-center"
                                            onClick={() => handleView(item)}
                                            title={labels.view}
                                          >
                                            <FaEye />
                                          </button>
                                          <button
                                            className="btn btn-primary btn-sm d-flex align-items-center"
                                            onClick={() => handleEdit(item)}
                                            title={labels.edit}
                                          >
                                            <FaEdit />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="4"
                                      style={{ textAlign: "center" }}
                                    >
                                      {labels.noExpenses}
                                    </td>
                                  </tr>
                                )
                              ) : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

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
