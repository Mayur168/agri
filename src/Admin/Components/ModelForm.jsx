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
  FaTruck,
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
  farms = [],
  products = [],
  fetchFarms, // Added to fetch farms on demand
  isLoadingFarms, // Loading state for farms
  isLoadingProducts, // Loading state for products
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
                      : formType === "billing"
                      ? "Billing"
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
                {formType === "billing" && (
                  <>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="farm_id"
                          value={formData.farm_id || ""}
                          onChange={handleChange}
                          onFocus={fetchFarms} // Fetch farms when dropdown is focused
                          disabled={!isEditing || isLoadingFarms}
                        >
                          <option value="">
                            {isLoadingFarms ? "Loading Farms..." : "Select Farm"}
                          </option>
                          {farms.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                              {farm.name || `Farm ${farm.id}`} ({farm.address})
                            </option>
                          ))}
                        </select>
                        <label>
                          <FaTractor className="me-2 text-success" />{" "}
                          {labels[language].farm}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="product_id"
                          value={formData.product_id || ""}
                          onChange={handleChange}
                          disabled={!isEditing || isLoadingProducts}
                        >
                          <option value="">
                            {isLoadingProducts ? "Loading Products..." : "Select Product"}
                          </option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} ({product.price})
                            </option>
                          ))}
                        </select>
                        <label>
                          <FaLeaf className="me-2 text-success" />{" "}
                          {labels[language].product}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          name="bill_date"
                          value={formData.bill_date || ""}
                          onChange={handleChange}
                          placeholder={labels[language].billDate}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaCalendarAlt className="me-2 text-success" />{" "}
                          {labels[language].billDate}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="trader_name"
                          value={formData.trader_name || ""}
                          onChange={handleChange}
                          placeholder={labels[language].traderName}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaUserTag className="me-2 text-success" />{" "}
                          {labels[language].traderName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_number"
                          value={formData.vehicle_number || ""}
                          onChange={handleChange}
                          placeholder={labels[language].vehicleNumber}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaTruck className="me-2 text-success" />{" "}
                          {labels[language].vehicleNumber}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="rate"
                          value={formData.rate || ""}
                          onChange={handleChange}
                          placeholder={labels[language].rate}
                          disabled={!isEditing}
                          step="0.01"
                          min="0"
                        />
                        <label>
                          <FaDollarSign className="me-2 text-success" />{" "}
                          {labels[language].rate}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="trees"
                          value={formData.trees || ""}
                          onChange={handleChange}
                          placeholder={labels[language].trees}
                          disabled={!isEditing}
                          min="0"
                        />
                        <label>
                          <FaLeaf className="me-2 text-success" />{" "}
                          {labels[language].trees}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="leaves"
                          value={formData.leaves || ""}
                          onChange={handleChange}
                          placeholder={labels[language].leaves}
                          disabled={!isEditing}
                          min="0"
                        />
                        <label>
                          <FaLeaf className="me-2 text-success" />{" "}
                          {labels[language].leaves}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="weight"
                          value={formData.weight || ""}
                          onChange={handleChange}
                          placeholder={labels[language].weight}
                          disabled={!isEditing}
                          step="0.1"
                          min="0"
                        />
                        <label>
                          <FaRuler className="me-2 text-success" />{" "}
                          {labels[language].weight}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          name="travelling_amount"
                          value={formData.travelling_amount || ""}
                          onChange={handleChange}
                          placeholder={labels[language].travellingAmount}
                          disabled={!isEditing}
                          step="0.01"
                          min="0"
                        />
                        <label>
                          <FaDollarSign className="me-2 text-success" />{" "}
                          {labels[language].travellingAmount}
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