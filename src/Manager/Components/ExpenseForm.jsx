import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaMoneyBillWave, FaEdit, FaTrash } from "react-icons/fa";
import ModalForm from "../../Admin/Components/ModelForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext";
import api from "../../Api/axiosInstance";
import Spinner from "../../Admin/Spinner/Spinner";
import Header from "../../Admin/Components/Header";

function ExpenseForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("storedData")) || {};
  const defaultManagerId = storedData.user?.manager_id || null;

  const [formData, setFormData] = useState({
    id: null,
    date_created: "",
    description: "",
    amount: "",
    reason: "",
    manager_id: defaultManagerId,
  });
  const [isEditing, setIsEditing] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Daily Expenses",
      addManagerExpense: "Add Expense",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      close: "Close",
      deleteConfirm: "You won't be able to revert this!",
      dateCreated: "Date",
      description: "Description",
      amount: "Amount",
      reason: "Reason",
      managerId: "Manager ID",
      modalTitleManager: "Edit Expense",
      submit: "Save",
      searchPlaceholder: "Search...",
      addButton: "Expense",
      noExpenses: "No expenses available",
      totalAmount: "Total Expenses",
    },
    mr: {
      title: "दैनिक खर्च",
      addManagerExpense: "खर्च जोडा",
      edit: "संपादन",
      delete: "हटवा",
      save: "जतन करा",
      close: "बंद करा",
      deleteConfirm: "आपण हे परत करू शकणार नाही!",
      dateCreated: "तारीख",
      description: "वर्णन",
      amount: "रक्कम",
      reason: "कारण",
      managerId: "व्यवस्थापक आयडी",
      modalTitleManager: "खर्च संपादन",
      submit: "जतन करा",
      searchPlaceholder: "शोधा...",
      addButton: "खर्च",
      noExpenses: "कोणतेही खर्च उपलब्ध नाहीत",
      totalAmount: "एकूण खर्च",
    },
  };

  const labels = translations[language];

  const fetchExpenses = async () => {
    if (!defaultManagerId) {
      setExpenses([]);
      setTotalAmount(0);
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

      // Handle response structure
      let expensesData = [];
      let totalAmountData = 0;
      if (response.data && Array.isArray(response.data.data)) {
        expensesData = response.data.data;
        totalAmountData = response.data.total_amount || 0;
      } else {
        expensesData = [];
        totalAmountData = 0;
      }

      setExpenses(expensesData);
      setTotalAmount(totalAmountData);

      if (expensesData.length === 0) {
      }
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Failed to load expenses for this manager.",
      // });
      setExpenses([]);
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        await api.patch("/farm/", payload);
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
        await api.post("/farm/", payload);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Expense added!",
        });
      }
      resetForm();
      await fetchExpenses();
    } catch (error) {
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
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Expense has been deleted.",
          });
          resetForm();
          await fetchExpenses();
        } catch (error) {
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
    ? expenses.filter((item) => {
        if (!item) return false;

        const query = searchQuery.toLowerCase();
        const description = item.description?.toLowerCase() || "";
        const reason = item.reason?.toLowerCase() || "";
        const amount = item.amount?.toString() || "";
        const date = item.date_created?.toLowerCase() || "";

        return (
          description.includes(query) ||
          reason.includes(query) ||
          amount.includes(query) ||
          date.includes(query)
        );
      })
    : [];

  return (
    <div className="container mb-5 p-0">
      <Header
        title={translations[language].title}
        icon={FaMoneyBillWave}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
          padding: "1rem",
          backgroundColor: "rgb(248, 249, 250)",
          borderRadius: "8px",
          border: "1px solid rgb(222, 226, 230)",
        }}
      >
        <h4 className="fs-5 text-success m-0">
          {labels.totalAmount}: {totalAmount}
        </h4>
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
                <th>{language === "en" ? "Actions" : "क्रिया"}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {new Date(item.date_created).toLocaleDateString() ||
                        "N/A"}
                    </td>
                    <td>{item.amount || "N/A"}</td>
                    <td>{item.reason || "N/A"}</td>
                    <td>{item.description || "N/A"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm d-flex align-items-center"
                          onClick={() => handleEdit(item)}
                          title={labels.edit}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center"
                          onClick={() => handleDelete(item.id)}
                          title={labels.delete}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
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
