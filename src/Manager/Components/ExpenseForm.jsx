import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaMoneyBillWave, FaEye } from "react-icons/fa";
import ModalForm from "../../Admin/Components/ModelForm";
import BackButton from "../../Admin/Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext";
import api from "../../Api/axiosInstance";
import Spinner from "../../Admin/Spinner/Spinner";

function ExpenseForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Retrieve storedData from localStorage (set during login)
  const storedData = JSON.parse(localStorage.getItem("storedData")) || {};
  console.log("Stored Data from localStorage:", storedData);

  // Extract manager_id from storedData.user, no fallback
  const defaultManagerId = storedData.user?.manager_id || null;
  console.log("defaultManagerId:", defaultManagerId);

  const [formData, setFormData] = useState({
    id: null,
    date_created: "",
    description: "",
    amount: "",
    reason: "",
    manager_id: defaultManagerId, // Set default to manager_id from login response
  });
  const [isEditing, setIsEditing] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Daily Expenses",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      close: "Close",
      deleteConfirm: "You won't be able to revert this!",
      dateCreated: "Date Created",
      description: "Description",
      amount: "Amount",
      reason: "Reason",
      managerId: "Manager ID",
      modalTitle: "Edit Expense",
      modalTitleManager: "View Manager Expense",
      submit: "Save",
      cancel: "Cancel",
      searchPlaceholder: "Search...",
      addButton: "Expense",
      noExpenses: "No expenses available",
      payloadTitle: "Payload Preview",
    },
    mr: {
      title: "दैनिक खर्च",
      view: "पहा",
      edit: "संपादन",
      save: "जतन करा",
      delete: "हटवा",
      close: "बंद करा",
      deleteConfirm: "आपण हे परत करू शकणार नाही!",
      dateCreated: "तारीख तयार झाली",
      description: "वर्णन",
      amount: "रक्कम",
      reason: "कारण",
      managerId: "व्यवस्थापक आयडी",
      modalTitle: "खर्च संपादन",
      modalTitleManager: "व्यवस्थापक खर्च पहा",
      submit: "जतन करा",
      cancel: "रद्द करा",
      searchPlaceholder: "शोधा...",
      addButton: "खर्च",
      noExpenses: "कोणतेही खर्च उपलब्ध नाहीत",
      payloadTitle: "पेलोड पूर्वावलोकन",
    },
  };

  const labels = translations[language];

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!defaultManagerId) {
        console.warn("No manager_id found in storedData. Skipping fetch.");
        setExpenses([]);
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "No manager ID available. Please log in as a manager.",
        });
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(
          `/farm/?action=getManagerExpenses&manager=${defaultManagerId}`
        );
        console.log("Raw API Response:", response); // Log full response
        console.log("Response Data:", response.data);

        // Handle different response structures
        let expensesData = [];
        if (Array.isArray(response.data)) {
          expensesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          expensesData = response.data.data;
        } else {
          console.warn("Unexpected response structure:", response.data);
          expensesData = [];
        }

        console.log("Filtered Expenses Data:", expensesData);
        setExpenses(expensesData);

        if (expensesData.length === 0) {
          console.log("No expenses found for manager_id:", defaultManagerId);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error.response || error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load expenses for this manager.",
        });
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [defaultManagerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!formData.manager_id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Manager ID is required to save an expense.",
        });
        return;
      }

      if (formData.id) {
        const payload = {
          action: "patchManagerExpense",
          id: formData.id,
          amount: parseFloat(formData.amount),
          reason: formData.reason,
          description: formData.description,
          manager_id: formData.manager_id,
        };
        console.log("Patch Payload:", payload);
        await api.patch("/farm/", payload);
        setExpenses(
          expenses.map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          )
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Expense updated!",
        });
      } else {
        const payload = {
          action: "postManagerExpenses",
          amount: parseFloat(formData.amount),
          reason: formData.reason,
          description: formData.description,
          manager_id: formData.manager_id,
        };
        console.log("Posting Payload:", payload);
        const response = await api.post("/farm/", payload);
        const newExpense = {
          id: response.data.data.id,
          date_created: response.data.data.date_created,
          description: response.data.data.description,
          amount: response.data.data.amount,
          reason: response.data.data.reason,
          manager: response.data.data.manager, // Match API response key
        };
        setExpenses([...expenses, newExpense]);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Expense added!",
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving expense:", error.response || error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save expense.",
      });
    }
  };

  const handleDelete = async (id) => {
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
        try {
          const payload = {
            action: "delManagerExpenses",
            id: id,
          };
          await api.delete("/farm/", { data: payload });
          setExpenses(expenses.filter((item) => item.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Expense has been deleted.",
          });
        } catch (error) {
          console.error("Error deleting expense:", error.response || error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete expense.",
          });
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      date_created: "",
      description: "",
      amount: "",
      reason: "",
      manager_id: defaultManagerId,
    });
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      date_created: item.date_created || "",
      description: item.description || "",
      amount: item.amount || "",
      reason: item.reason || "",
      manager_id: item.manager || defaultManagerId,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleView = (item) => {
    console.log("Viewing Item:", item);
    setFormData({
      id: item.id,
      date_created: item.date_created || "",
      description: item.description || "",
      amount: item.amount || "",
      reason: item.reason || "",
      manager_id: item.manager || defaultManagerId,
    });
    setIsEditing(false);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      date_created: "",
      description: "",
      amount: "",
      reason: "",
      manager_id: defaultManagerId,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const filteredExpenses = Array.isArray(expenses)
    ? expenses.filter((item) =>
        item && typeof item.description === "string"
          ? item.description.toLowerCase().includes(searchQuery.toLowerCase())
          : false
      )
    : [];

  return (
    <div className="container mb-5">
      <div className="mb-3 d-flex align-items-center px-3 py-3 bg-success text-white rounded-3">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaMoneyBillWave className="me-2" /> {labels.title}
        </h2>
      </div>

      <div className="d-flex align-items-center mb-3">
        <input
          type="text"
          className="form-control shadow-sm rounded-3 border-success px-3 py-2 me-2"
          placeholder={labels.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "60%" }}
        />
        <button
          className="btn btn-success fw-bold d-flex align-items-center justify-content-center px-3 py-2 shadow-sm"
          onClick={handleAdd}
          style={{ width: "40%" }}
          disabled={!defaultManagerId}
        >
          <FaPlus className="me-1" /> {labels.addButton}
        </button>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="text-center my-5">
            <Spinner />
          </div>
        ) : (
          <table className="table table-striped table-bordered shadow-sm rounded-3">
            <thead className="table-light">
              <tr>
                <th>{labels.dateCreated}</th>
                <th>{labels.amount}</th>
                <th>{labels.reason}</th>
                <th>{labels.description}</th>
                {/* <th>{labels.managerId}</th> */}
                <th>{language === "en" ? "Actions" : "क्रिया"}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.date_created).toLocaleDateString() || "N/A"}</td>
                    <td>{item.amount || "N/A"}</td>
                    <td>{item.reason || "N/A"}</td>
                    <td>{item.description || "N/A"}</td>
                    {/* <td>{item.manager || "N/A"}</td> */}
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
                            onClick={() => handleDelete(item.id)}
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
                  <td colSpan="6" className="text-center text-muted py-4">
                    {labels.noExpenses}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        handleDelete={handleDelete}
        language={language}
        formType="managerExpense"
      />
    </div>
  );
}

export default ExpenseForm;