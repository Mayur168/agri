import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaSave,
  FaTrash,
  FaTimes,
  FaGlobe,
  FaMapPin,
  FaPhone,
  FaLock,
  FaUserTag,
  FaTractor,
  FaRuler,
  FaDollarSign,
  FaLeaf,
  FaCalendarAlt,
  FaFileAlt,
  FaTags,
} from "react-icons/fa";

const ModalForm = ({
  isOpen,
  onClose,
  isEditing,
  formData,
  labels,
  handleChange,
  handleSave,
  handleDelete,
  language,
  getLiveLocation,
  formType = "farm",
}) => {
  if (!isOpen) return null;

  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: labels[language].deleteConfirm || "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(id);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content mx-auto">
          <div className="modal-header bg-success text-white">
            <h4 className="modal-title ms-auto">
              {formData.id
                ? labels[language].modalTitle
                : `Add ${
                    formType === "expense"
                      ? "Expense"
                      : formType === "fertilizer"
                      ? "Fertilizer"
                      : formType === "manager"
                      ? "Manager"
                      : "Farm"
                  }`}
            </h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row g-3">
                {formType === "manager" && (
                  <>
                    {/* Manager-specific fields */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          value={formData.first_name || ""}
                          onChange={handleChange}
                          placeholder={labels[language].firstName}
                          disabled={!isEditing}
                        />
                        <label>{labels[language].firstName}</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          placeholder={labels[language].lastName}
                          disabled={!isEditing}
                        />
                        <label>{labels[language].lastName}</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          placeholder={labels[language].email}
                          disabled={!isEditing}
                        />
                        <label>{labels[language].email}</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          placeholder={labels[language].phone}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaPhone className="me-2 text-success" />{" "}
                          {labels[language].phone}
                        </label>
                      </div>
                    </div>
                    {isEditing && (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={formData.password || ""}
                              onChange={handleChange}
                              placeholder={labels[language].password}
                            />
                            <label>
                              <FaLock className="me-2 text-success" />{" "}
                              {labels[language].password}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              name="confirm_password"
                              value={formData.confirm_password || ""}
                              onChange={handleChange}
                              placeholder={labels[language].confirmPassword}
                            />
                            <label>
                              <FaLock className="me-2 text-success" />{" "}
                              {labels[language].confirmPassword}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="role"
                          value={formData.role || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="Manager">
                            {labels[language].manager}
                          </option>
                          <option value="Admin">{labels[language].admin}</option>
                        </select>
                        <label>
                          <FaUserTag className="me-2 text-success" />{" "}
                          {labels[language].role}
                        </label>
                      </div>
                    </div>
                    {formData.role === "Manager" && (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="farm_name"
                              value={formData.farm_name || ""}
                              onChange={handleChange}
                              placeholder={labels[language].farmName}
                              disabled={!isEditing}
                            />
                            <label>{labels[language].farmName}</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="farm_location"
                              value={formData.farm_location || ""}
                              onChange={handleChange}
                              placeholder={labels[language].farmLocation}
                              disabled={!isEditing}
                            />
                            <label>{labels[language].farmLocation}</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              name="manager_experience"
                              value={formData.manager_experience || ""}
                              onChange={handleChange}
                              placeholder={labels[language].managerExperience}
                              disabled={!isEditing}
                            />
                            <label>{labels[language].managerExperience}</label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {formType === "farm" && (
                  <>
                    {/* Farm-specific fields */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder={labels[language].farmName}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaTractor className="me-2 text-success" />{" "}
                          {labels[language].farmName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          placeholder={labels[language].address}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaMapPin className="me-2 text-success" />{" "}
                          {labels[language].address}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <div className="form-floating flex-grow-1">
                          <input
                            type="text"
                            className="form-control"
                            name="location_url"
                            value={formData.location_url || ""}
                            onChange={handleChange}
                            placeholder={labels[language].locationUrl}
                            disabled={!isEditing}
                          />
                          <label>
                            <FaGlobe className="me-2 text-success" />{" "}
                            {labels[language].locationUrl}
                          </label>
                        </div>
                        {isEditing && (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={getLiveLocation}
                            disabled={!isEditing}
                            title={
                              language === "en"
                                ? "Get Live Location"
                                : "लाइव्ह स्थान मिळवा"
                            }
                          >
                            <FaMapMarkerAlt size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_size"
                          value={formData.farm_size || ""}
                          onChange={handleChange}
                          placeholder={labels[language].farmSize}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaRuler className="me-2 text-success" />{" "}
                          {labels[language].farmSize}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {formType === "fertilizer" && (
                  <>
                    {/* Fertilizer-specific fields */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder={labels[language].fertilizerName}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaLeaf className="me-2 text-success" />{" "}
                          {labels[language].fertilizerName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price || ""}
                          onChange={handleChange}
                          placeholder={labels[language].price}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaDollarSign className="me-2 text-success" />{" "}
                          {labels[language].price}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {formType === "expense" && (
                  <>
                    {/* Expense-specific fields */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={formData.date || ""}
                          onChange={handleChange}
                          placeholder={labels[language].date}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaCalendarAlt className="me-2 text-success" />{" "}
                          {labels[language].date}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={formData.description || ""}
                          onChange={handleChange}
                          placeholder={labels[language].description}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaFileAlt className="me-2 text-success" />{" "}
                          {labels[language].description}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="amount"
                          value={formData.amount || ""}
                          onChange={handleChange}
                          placeholder={labels[language].amount}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaDollarSign className="me-2 text-success" />{" "}
                          {labels[language].amount}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={formData.category || ""}
                          onChange={handleChange}
                          placeholder={labels[language].category}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaTags className="me-2 text-success" />{" "}
                          {labels[language].category}
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="btn btn-success btn-sm d-flex align-items-center"
                  onClick={handleSave}
                >
                  <FaSave className="me-2" /> {labels[language].submit}
                </button>
                {formData.id && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => confirmDelete(formData.id)}
                  >
                    <FaTrash className="me-2" /> {labels[language].delete}
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm d-flex align-items-center"
                onClick={onClose}
              >
                <FaTimes className="me-2" /> {labels[language].cancel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;