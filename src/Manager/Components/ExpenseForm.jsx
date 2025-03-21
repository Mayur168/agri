import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalForm from '../../Admin/Components/ModelForm'; // Import ModalForm (adjust path as needed)

function ExpenseForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    description: '',
    amount: '',
    category: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const labels = {
    en: {
      view: 'View',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      close: 'Close',
      deleteConfirm: 'You won\'t be able to revert this!',
      date: 'Date',
      description: 'Description',
      amount: 'Amount',
      category: 'Category',
      modalTitle: 'Edit Expense', // Added for ModalForm
      submit: 'Save', // Added for ModalForm
      cancel: 'Close', // Added for ModalForm
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.id) {
      setExpenses(expenses.map(item => item.id === formData.id ? formData : item));
    } else {
      setExpenses([...expenses, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: labels.en.deleteConfirm,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setExpenses(expenses.filter(item => item.id !== id));
        setIsOpen(false);
      }
    });
  };

  const resetForm = () => {
    setFormData({ id: null, date: '', description: '', amount: '', category: '' });
    setIsOpen(false);
    setIsEditing(true); // Reset to editing mode
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, date: '', description: '', amount: '', category: '' });
    setIsEditing(true);
    setIsOpen(true);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Daily Expenses</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Expense
      </button>

      {/* Expenses Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(item => (
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
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use ModalForm */}
      <ModalForm
        isOpen={isOpen}
        onClose={resetForm}
        isEditing={isEditing}
        formData={formData}
        labels={labels}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        language="en"
        formType="expense" // Custom formType for expenses
      />
    </div>
  );
}

export default ExpenseForm;