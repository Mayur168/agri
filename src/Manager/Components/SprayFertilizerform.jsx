import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from "../../src/api/axiosInstance";
import { FaEye } from "react-icons/fa";
import ModalForm from "../../Admin/Components/ModelForm";
import Spinner from '../../Admin/Spinner/Spinner'; // Import Spinner
import "./fertilizers.css";

function SprayFertilizerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [loading, setLoading] = useState(true); // New loading state

  const labels = {
    en: {
      title: "Spray Fertilizer",
      addRecord: "Add Fertilizer",
      view: 'View',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      close: 'Close',
      deleteConfirm: 'You won\'t be able to revert this!',
      fertilizerName: 'Fertilizer Name',
      price: 'Price',
      modalTitle: 'Edit Fertilizer',
      submit: 'Save',
      cancel: 'Close',
      searchPlaceholder: 'Search by name...',
      idPlaceholder: 'Filter by ID...',
    },
  };

  // Fetch all records (GET)
  const fetchRecords = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.get(`/master_data/?action=getfertilizer`);
      console.log('API Response:', response.data);

      const validRecords = Array.isArray(response.data.data)
        ? response.data.data.filter(item => item && typeof item.name === 'string')
        : [];
      setRecords(validRecords);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch records', 'error');
      console.error('Fetch error:', error);
      setRecords([]);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Fetch a specific record by ID (optional utility function)
  const fetchRecordById = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await api.get(`/master_data/?action=getfertilizer&id=${id}`);
      console.log('Single Record Response:', response.data);
      const record = response.data.data || response.data;
      if (record && typeof record.name === 'string') {
        setRecords([record]);
      } else {
        setRecords([]);
      }
    } catch (error) {
      Swal.fire('Error', `Failed to fetch record with ID ${id}`, 'error');
      console.error('Fetch by ID error:', error);
      setRecords([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Add new record (POST)
  const handlePostRecord = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.post(`/master_data/`, {
        action: 'postfertilizer',
        name: formData.name,
        price: parseFloat(formData.price),
      });

      const savedData = response.data.data;
      setRecords([...records, savedData]);
      resetForm();
      Swal.fire('Success', 'Record added successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to add record', 'error');
      console.error('Post error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update existing record (PATCH)
  const handlePatchRecord = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.patch(`/master_data/`, {
        action: 'patchfertilizer',
        id: formData.id,
        name: formData.name,
        price: parseFloat(formData.price),
      });

      const updatedData = response.data.data;
      setRecords(records.map(item => item.id === formData.id ? updatedData : item));
      resetForm();
      Swal.fire('Success', 'Record updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update record', 'error');
      console.error('Patch error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete record (DELETE)
  const handleDeleteRecord = async (id) => {
    setLoading(true); // Start loading
    try {
      await api.delete(`/master_data/`, {
        data: {
          action: 'deletefertilizer',
          id: id,
        },
      });

      setRecords(records.filter(item => item.id !== id));
      setIsOpen(false);
      Swal.fire('Deleted!', 'Record has been deleted.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to delete record', 'error');
      console.error('Delete error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchRecords(); // Fetch all records when the component mounts
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
      title: 'Are you sure?',
      text: labels.en.deleteConfirm,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteRecord(id);
      }
    });
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', price: '' });
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, name: '', price: '' });
    setIsEditing(true);
    setIsOpen(true);
  };

  // Filter records based on search query and ID
  const filteredRecords = records.filter(item => {
    if (!item || !item.name || typeof item.name !== 'string') return false;

    const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesId = idFilter ? String(item.id) === idFilter : true;

    return matchesName && matchesId;
  });

  return (
    <div className="managers-container mb-5">
      {/* Header with Search Box and ID Filter */}
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <h2 className="fs-4 text-white m-0 me-3">
          {labels.en.title}
        </h2>
        <input
          type="text"
          className="form-control bg-success-subtle text-dark border-0 me-2"
          placeholder={labels.en.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <input
          type="text"
          className="form-control bg-success-subtle text-dark border-0"
          placeholder={labels.en.idPlaceholder}
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          style={{ maxWidth: "150px" }}
        />
      </div>

      <div className="container">
        {/* Add Record Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            onClick={handleAdd}
            disabled={loading} // Disable button while loading
          >
            {labels.en.addRecord}
          </button>
        </div>

        {/* Records Grid with Spinner */}
        <div className="managers-grid">
          {loading ? (
            <div className="text-center m-auto">
              <Spinner />
            </div>
          ) : Array.isArray(filteredRecords) && filteredRecords.length > 0 ? (
            filteredRecords.map(item => (
              <div
                key={item.id}
                className="manager-card d-flex justify-content-between align-items-center flex-wrap"
              >
                <span className="manager-name">
                  {item.name} - ${item.price} (ID: {item.id})
                </span>
                <div className="manager-actions">
                  <div className="dropdown">
                    <button
                      className="btn btn-link p-0"
                      type="button"
                      id={`dropdownMenuButton-${item.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      disabled={loading} // Disable dropdown while loading
                    >
                      <FaEye className="eye-icon" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby={`dropdownMenuButton-${item.id}`}
                    >
                      <button
                        className="dropdown-item btn btn-primary btn-sm"
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                      >
                        {labels.en.edit}
                      </button>
                      <button
                        className="dropdown-item btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                      >
                        {labels.en.delete}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mx-auto">
              No records available
            </p>
          )}
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
          formType="fertilizer"
        />
      </div>
    </div>
  );
}

export default SprayFertilizerForm;