import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaMoneyBillWave } from "react-icons/fa";
import ModalForm from "../../Admin/Components/ModelForm";
import BackButton from "../../Admin/Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../contexts/LanguageContext"; // Import LanguageContext

function ExpenseForm() {
  const { language } = useLanguage(); // Use language context
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    date: "",
    description: "",
    amount: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    en: {
      title: "Daily Expenses",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      close: "Close",
      deleteConfirm: "You won't be able to revert this!",
      date: "Date",
      description: "Description",
      amount: "Amount",
      category: "Category",
      modalTitle: "Edit Expense",
      submit: "Save",
      cancel: "Close",
      searchPlaceholder: "Search...",
      addButton: "Expense",
      noExpenses: "No expenses available",
    },
    mr: {
      title: "दैनिक खर्च",
      view: "पहा",
      edit: "संपादन",
      save: "जतन करा",
      delete: "हटवा",
      close: "बंद करा",
      deleteConfirm: "आपण हे परत करू शकणार नाही!",
      date: "तारीख",
      description: "वर्णन",
      amount: "रक्कम",
      category: "श्रेणी",
      modalTitle: "खर्च संपादन",
      submit: "जतन करा",
      cancel: "बंद करा",
      searchPlaceholder: "शोधा...",
      addButton: "खर्च",
      noExpenses: "कोणतेही खर्च उपलब्ध नाहीत",
    },
  };

  const labels = translations[language]; // Select labels based on current language

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.id) {
      setExpenses(expenses.map((item) => (item.id === formData.id ? formData : item)));
    } else {
      setExpenses([...expenses, { ...formData, id: Date.now() }]);
    }
    resetForm();
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
    }).then((result) => {
      if (result.isConfirmed) {
        setExpenses(expenses.filter((item) => item.id !== id));
        setIsOpen(false);
      }
    });
  };

  const resetForm = () => {
    setFormData({ id: null, date: "", description: "", amount: "", category: "" });
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, date: "", description: "", amount: "", category: "" });
    setIsEditing(true);
    setIsOpen(true);
  };

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mb-5">
      {/* Header */}
      <div className="mb-3 d-flex align-items-center px-3 py-3 bg-success text-white rounded-3">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaMoneyBillWave className="me-2" /> {labels.title}
        </h2>
      </div>

      {/* Search Box and Add Button in Same Line */}
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
        >
          <FaPlus className="me-1" /> {labels.addButton}
        </button>
      </div>

      {/* Expenses Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm rounded-3">
          <thead className="table-dark">
            <tr>
              <th>{labels.date}</th>
              <th>{labels.description}</th>
              <th>{labels.amount}</th>
              <th>{labels.category}</th>
              <th>{language === "en" ? "Actions" : "क्रिया"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      {labels.edit}
                    </button>
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
      </div>

      {/* ModalForm */}
      <ModalForm
        isOpen={isOpen}
        onClose={resetForm}
        isEditing={isEditing}
        formData={formData}
        labels={translations} // Pass the full translations object
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        language={language} // Pass the current language
        formType="expense"
      />
    </div>
  );
}

export default ExpenseForm;