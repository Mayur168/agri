import React from "react";
import Swal from "sweetalert2";
import { FaSave, FaTrash, FaTimes } from "react-icons/fa";

const FormButtons = ({
  isEditing,
  hasId, 
  labels,
  language,
  onSubmit,
  onDelete,
  onCancel,
  submitLabel = "submit",
  deleteLabel = "delete",
  cancelLabel = "cancel",
}) => {
  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: labels[language].deleteConfirm || "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: labels[language][cancelLabel] || "No, cancel",
    });

    if (result.isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="d-flex justify-content-end gap-2">
      {isEditing && (
        <button
          type="submit"
          className="btn btn-success btn-sm d-flex align-items-center"
          onClick={onSubmit} 
        >
          <FaSave className="me-2" /> {labels[language][submitLabel] || "Save"}
        </button>
      )}
      {hasId && isEditing && (
        <button
          type="button"
          className="btn btn-danger btn-sm d-flex align-items-center"
          onClick={() => confirmDelete(hasId)}
        >
          <FaTrash className="me-2" /> {labels[language][deleteLabel] || "Delete"}
        </button>
      )}
      <button
        type="button"
        className="btn btn-secondary btn-sm d-flex align-items-center"
        onClick={onCancel}
      >
        <FaTimes className="me-2" /> {labels[language][cancelLabel] || "Cancel"}
      </button>
    </div>
  );
};

export default FormButtons;