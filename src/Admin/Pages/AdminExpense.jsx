import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaEye } from "react-icons/fa";
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
  console.log("Raw storedData from localStorage:", storedData);

  const userData = storedData ? JSON.parse(storedData) : {};
  console.log("Parsed userData:", userData);

  const defaultFarmerId = userData?.user?.farmer_id
    ? Number(userData.user.farmer_id)
    : null;
  console.log("defaultFarmerId:", defaultFarmerId);

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
  });
  const [isEditing, setIsEditing] = useState(true);
  const [adminExpenses, setAdminExpenses] = useState([]);
  const [managerExpenses, setManagerExpenses] = useState([]);
  const [managers, setManagers] = useState([]); // New state for manager list
  const [selectedManagerId, setSelectedManagerId] = useState(null); // Track selected manager
  const [searchQuery, setSearchQuery] = useState("");
  const [expenseType, setExpenseType] = useState("admin");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Expenses",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      close: "Close",
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
      submit: "Save",
      searchPlaceholder: "Search...",
      managerExpense: "Manager",
      adminExpense: "Admin",
      noExpenses: "No expenses available",
      managerListTitle: "Select a Manager",
      noManagers: "No managers available",
    },
    mr: {
      title: "खर्च",
      view: "पहा",
      edit: "संपादन",
      save: "जतन करा",
      delete: "हटवा",
      close: "बंद करा",
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
      submit: "जतन करा",
      searchPlaceholder: "शोधा...",
      managerExpense: "व्यवस्थापक खर्च",
      adminExpense: "प्रशासक खर्च",
      noExpenses: "कोणतेही खर्च उपलब्ध नाहीत",
      managerListTitle: "व्यवस्थापक निवडा",
      noManagers: "कोणतेही व्यवस्थापक उपलब्ध नाहीत",
    },
  };

  const labels = translations[language];

  // Fetch admin expenses
  const fetchAdminExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/farm/?action=getFarmerExpenses");
      console.log("Admin Expenses API Response:", response.data);
      let expensesData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data
          : response.data && Array.isArray(response.data)
          ? response.data
          : [];
      setAdminExpenses(expensesData);
      console.log("Admin Expenses Set:", expensesData);
    } catch (error) {
      console.error("Error fetching admin expenses:", error);
      Swal.fire("Error", "Failed to fetch admin expenses", "error");
      setAdminExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all manager expenses
  const fetchManagerExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/farm/?action=getManagerExpenses");
      console.log("Manager Expenses API Response:", response.data);
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
      setManagerExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching manager expenses:", error);
      Swal.fire("Error", "Failed to fetch manager expenses", "error");
      setManagerExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch manager list
  const fetchManagers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/?action=getFarmManager");
      console.log("Managers API Response:", response.data);
      let managersData =
        response.data && Array.isArray(response.data.data)
          ? response.data.data
          : response.data && Array.isArray(response.data)
          ? response.data
          : [];
      setManagers(managersData);
      console.log("Managers Set:", managersData);
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
      fetchManagers(); // Fetch managers when switching to manager tab
    } else if (expenseType === "manager" && selectedManagerId) {
      fetchManagerExpenses(); // Fetch expenses once a manager is selected
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
            action: "patchFarmerExpense",
            id: Number(formData.id),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
          };
          console.log("Patch Payload (Admin):", patchData);
          response = await api.patch("/farm/", patchData);
          const updatedExpense = {
            ...adminExpenses.find((item) => item.id === formData.id),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
          };
          setAdminExpenses(
            adminExpenses.map((item) =>
              item.id === formData.id ? updatedExpense : item
            )
          );
          Swal.fire("Success", "Admin expense updated!", "success");
        } else {
          const postData = {
            action: "postFarmerExpenses",
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            farmer_id: defaultFarmerId,
          };
          console.log("Post Payload (Admin):", postData);
          response = await api.post("/farm/", postData);
          const newExpense = {
            id: response.data.id || Date.now(),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
            farmer_id: defaultFarmerId,
          };
          setAdminExpenses((prev) => [...prev, newExpense]);
          Swal.fire("Success", "Admin expense added!", "success");
        }
      } else if (expenseType === "manager") {
        if (formData.id) {
          const patchData = {
            action: "patchManagerExpense",
            id: Number(formData.id),
            amount: parseFloat(formData.amount),
            reason: formData.reason,
            description: formData.description,
          };
          console.log("Patch Payload (Manager):", patchData);
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
          Swal.fire("Success", "Manager expense updated!", "success");
        } else {
          Swal.fire("Info", "Adding new manager expenses is disabled.", "info");
          return;
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving expense:", error);
      Swal.fire("Error", "Failed to save expense", "error");
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
        Swal.fire("Success", "Admin expense deleted!", "success");
      } catch (error) {
        console.error("Error deleting admin expense:", error);
        Swal.fire("Error", "Failed to delete admin expense", "error");
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
        Swal.fire("Success", "Manager expense deleted!", "success");
      } catch (error) {
        console.error("Error deleting manager expense:", error);
        Swal.fire("Error", "Failed to delete manager expense", "error");
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
    });
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    if (expenseType === "admin") {
      setFormData({
        ...item,
        id: Number(item.id),
        farmer_id: item.farmer_id,
      });
    } else if (expenseType === "manager") {
      setFormData({
        ...item,
        id: Number(item.id),
      });
    }
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleView = (item) => {
    setFormData(item);
    setIsEditing(false);
    setIsOpen(true);
  };

  const handleAdminExpense = () => {
    setExpenseType("admin");
    setSelectedManagerId(null); // Reset selected manager when switching to admin
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleManagerExpense = () => {
    setExpenseType("manager");
    setSelectedManagerId(null); // Reset to show manager list initially
  };

  const handleManagerSelect = (manager) => {
    setSelectedManagerId(manager.id); // Set selected manager ID
    setFormData({
      id: null,
      amount: "",
      reason: "",
      description: "",
      farmer_id: defaultFarmerId,
      date_created: "",
    });
  };

  const filteredExpenses = (expenseType === "admin" ? adminExpenses : managerExpenses)
    .filter((item) => {
      if (expenseType === "manager" && selectedManagerId) {
        return item.manager === selectedManagerId || item.manager_id === selectedManagerId;
      }
      const searchLower = searchQuery.toLowerCase();
      return (
        item?.reason?.toLowerCase()?.includes(searchLower) ||
        item?.description?.toLowerCase()?.includes(searchLower) ||
        item?.amount?.toString().toLowerCase()?.includes(searchLower)
      );
    });

  return (
    <div className="container mb-5">
      <div className="mb-3 d-flex align-items-center px-3 py-3 bg-success text-white rounded-3">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaMoneyBillWave className="me-2" />
          {expenseType === "admin" ? labels.adminExpense : labels.managerExpense}
        </h2>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control shadow-sm rounded-3 border-success px-3"
          placeholder={labels.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center mb-2 gap-2">
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm flex-grow-1 ${
            expenseType === "admin" ? "btn-success" : "btn-outline-success opacity-50"
          }`}
          onClick={handleAdminExpense}
        >
          {labels.adminExpense}
        </button>
        <button
          className={`btn fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm flex-grow-1 ${
            expenseType === "manager" ? "btn-success" : "btn-outline-success opacity-50"
          }`}
          onClick={handleManagerExpense}
        >
          {labels.managerExpense}
        </button>
      </div>

      {expenseType === "manager" && !selectedManagerId ? (
        <div className="manager-list mb-3">
          {loading ? (
            <Spinner />
          ) : managers.length > 0 ? (
            <ul className="list-group">
              {managers.map((manager) => (
                <li
                  key={manager.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleManagerSelect(manager)}
                >
                  <span>
                    {manager.user?.first_name} {manager.user?.last_name} (ID: {manager.id})
                  </span>
                  <FaEye />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">{labels.noManagers}</p>
          )}
        </div>
      ) : (
        <div className="table-responsive">
          {loading ? (
            <div className="text-center my-5">
              <Spinner />
            </div>
          ) : (
            <table className="table table-striped table-bordered shadow-sm rounded-3">
              <thead className="table-light">
                <tr>
                  <th>{labels.amount}</th>
                  <th>{labels.reason}</th>
                  <th>{labels.description}</th>
                  {expenseType === "admin" && <th>{labels.farmerId}</th>}
                  {expenseType === "manager" && <th>{labels.managerId}</th>}
                  {expenseType === "manager" && <th>{labels.dateCreated}</th>}
                  <th>{language === "en" ? "Actions" : "क्रिया"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((item) => (
                    <tr key={item.id}>
                      <td>₹{item.amount || "N/A"}</td>
                      <td>{item.reason || "N/A"}</td>
                      <td>{item.description || "N/A"}</td>
                      {expenseType === "admin" && <td>{item.farmer || "N/A"}</td>}
                      {expenseType === "manager" && (
                        <td>{item.manager || item.manager_id || "N/A"}</td>
                      )}
                      {expenseType === "manager" && (
                        <td>{item.date_created || "N/A"}</td>
                      )}
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-link p-0"
                            type="button"
                            id={`dropdownMenuButton-${item.id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
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
                            >
                              {labels.view}
                            </button>
                            <button
                              className="dropdown-item btn btn-primary btn-sm"
                              onClick={() => handleEdit(item)}
                            >
                              {labels.edit}
                            </button>
                            <button
                              className="dropdown-item btn btn-danger btn-sm"
                              onClick={() =>
                                expenseType === "admin"
                                  ? handleDeleteAdmin(item.id)
                                  : handleDeleteManager(item.id)
                              }
                            >
                              {labels.delete}
                            </button>
                            <button
                              className="dropdown-item btn btn-secondary btn-sm"
                              onClick={() => console.log("Cancel clicked for", item.id)}
                            >
                              {labels.cancel}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={expenseType === "admin" ? 5 : 6}
                      className="text-center text-muted py-4"
                    >
                      {labels.noExpenses}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
        handleDelete={expenseType === "admin" ? handleDeleteAdmin : handleDeleteManager}
        language={language}
        formType={expenseType === "admin" ? "adminExpense" : "managerExpense"}
      />
    </div>
  );
}

export default ExpenseForm;