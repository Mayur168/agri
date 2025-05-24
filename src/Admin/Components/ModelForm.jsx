
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
  FaRupeeSign,
  FaLeaf,
  FaCalendarAlt,
  FaFileAlt,
  FaTags,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import moment from "moment-timezone";

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
Leaf,
  formType = "farm",
  farms = [],
  products = [],
  fetchFarms,
  isLoadingFarms,
  isLoadingProducts,
  managers = [],
  fertilizers = [],
  onEdit,
  viewMode,
  farmers = [],
}) => {
  if (!isOpen) return null;

  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: labels[language].delete || "Are you sure?",
      text: labels[language].deleteConfirm || "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: labels[language].delete || "Yes, delete it!",
      cancelButtonText: labels[language].cancel || "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(id);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(e);
  };

  const formatDateForDisplay = (date) => {
    if (!date || !moment(date, "DD-MMM-YYYY hh:mm A", true).isValid()) {
      return "";
    }
    return moment(date, "DD-MMM-YYYY hh:mm A").format("DD-MMM-YYYY hh:mm A");
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <style>{`
        .form-control:focus,
        .form-select:focus {
          border-color: #28a745 !important;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
        }
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-select:focus ~ label {
          color: #28a745 !important;
        }
      `}</style>

      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content mx-auto">
          <div className="modal-header bg-success text-white">
            <h4 className="modal-title ms-auto">
              {formType === "fertilizer"
                ? formData.id && isEditing
                  ? labels[language].Edit_Fertilizer || "Edit_Fertilizer"
                  : labels[language].addFertilizer || "Add Fertilizer"
                : formType === "adminExpense"
                ? !isEditing
                  ? labels[language].viewAdminExpense || "View Admin Expense"
                  : formData.id
                  ? labels[language].modalTitleAdmin || "Edit Admin Expense"
                  : labels[language].addAdminExpense || "Add Admin Expense"
                : formType === "managerExpense"
                ? !isEditing
                  ? labels[language].viewManagerExpense || "View Manager Expense"
                  : formData.id
                  ? labels[language].modalTitleManager || "Edit Manager Expense"
                  : labels[language].addManagerExpense || "Add Manager Expense"
                : formType === "manager"
                ? formData.id
                  ? !isEditing
                    ? viewMode === "admins"
                      ? labels[language].viewAdmin
                      : labels[language].viewManager
                    : viewMode === "admins"
                    ? labels[language].editAdminTitle
                    : labels[language].editManagerTitle
                  : formData.role === "Admin"
                  ? labels[language].addAdmin
                  : labels[language].modalTitle
                : formType === "billing"
                ? formData.id && isEditing
                  ? labels[language].editBillingTitle
                  : formData.id && !isEditing
                  ? labels[language].viewBilling || "View Billing"
                  : labels[language].addBilling
                : formType === "farm"
                ? formData.id && !isEditing
                  ? labels[language].viewFarm || "View Farm"
                  : formData.id && isEditing
                  ? labels[language].editFarm || "Edit Farm"
                  : labels[language].addFarm || "Add Farm"
                : formType === "takenAmount"
                ? isEditing
                  ? labels[language].addTakenAmount || "Add Taken Amount"
                  : labels[language].viewTakenAmount || "View Taken Amount"
                : `Add ${formType === "expense" ? labels[language].adminExpense + " Expense" : formType === "adminExpense" ? labels[language].addAdminExpense : formType === "managerExpense" ? labels[language].addManagerExpense : "Farm"}`}
            </h4>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="row g-3">
               {formType === "farm" && (
                  <>
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
                          <FaTractor className="me-2 text-success" /> {labels[language].farmName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="manager_id"
                          value={formData.manager_id || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="">{labels[language].selectManager || "Select Manager"}</option>
                          {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                              {manager.user.first_name} {manager.user.last_name}
                            </option>
                          ))}
                        </select>
                        <label>
                          <FaUserTag className="me-2 text-success" /> {labels[language].manager}
                        </label>
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
                          <FaRuler className="me-2 text-success" /> {labels[language].farmSize}
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
                          <FaMapPin className="me-2 text-success" /> {labels[language].address}
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
                            <FaGlobe className="me-2 text-success" /> {labels[language].locationUrl}
                          </label>
                        </div>
                        {isEditing && (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={getLiveLocation}
                            disabled={!isEditing}
                            title={labels[language].getLiveLocation || "Get Live Location"}
                          >
                            <FaMapMarkerAlt size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Conditionally render fertilizers section */}
                    {formType === "farm" && (formData.id || !isEditing) && (
                      <div className="col-12">
                        <h5 className="mb-3 fw-bold">{labels[language].fertilizers}</h5>
                        {fertilizers.length > 0 ? (
                          <div className="table-responsive rounded">
                            <table
                              className="table table-hover mb-0"
                              style={{ borderRadius: "10px", overflow: "hidden", backgroundColor: "#fff" }}
                            >
                              <thead className="bg-success text-white" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                <tr>
                                  <th scope="col" className="text-center py-3" style={{ width: "10%", fontSize: "0.9rem" }}>
                                    #
                                  </th>
                                  <th scope="col" className="py-3" style={{ width: "45%", fontSize: "0.9rem" }}>
                                    <FaLeaf className="me-2" />
                                    {labels[language].fertilizerName}
                                  </th>
                                  <th scope="col" className="py-3" style={{ width: "45%", fontSize: "0.9rem" }}>
                                    <FaCalendarAlt className="me-2" />
                                    {labels[language].date}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {fertilizers.map((fertilizer, index) => (
                                  <tr
                                    key={fertilizer.id || index}
                                    style={{ transition: "background-color 0.2s ease" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                  >
                                    <td className="text-center py-3">{index + 1}</td>
                                    <td className="py-3 fw-medium">{fertilizer.name || "Unknown Fertilizer"}</td>
                                    <td className="py-3 text-muted">{formatDateForDisplay(fertilizer.date) || "N/A"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="alert alert-info text-center py-3 mb-0" role="alert" style={{ borderRadius: "8px" }}>
                            {labels[language].noFertilizers || "No fertilizers found for this farm."}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                {formType === "manager" && (
                  <>
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
                        <label>
                          <FaUserTag className="me-2 text-success" /> {labels[language].firstName}
                        </label>
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
                        <label>
                          <FaUserTag className="me-2 text-success" /> {labels[language].lastName}
                        </label>
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
                        <label>
                          <FaGlobe className="me-2 text-success" /> {labels[language].email}
                        </label>
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
                          <FaPhone className="me-2 text-success" /> {labels[language].phone}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          value={formData.password || ""}
                          onChange={handleChange}
                          placeholder={labels[language].password}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaLock className="me-2 text-success" /> {labels[language].password}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="confirm_password"
                          value={formData.confirm_password || ""}
                          onChange={handleChange}
                          placeholder={labels[language].confirmPassword}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaLock className="me-2 text-success" /> {labels[language].confirmPassword}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="role"
                          value={formData.role || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="Manager">{labels[language].manager}</option>
                          <option value="Admin">{labels[language].admin}</option>
                        </select>
                        <label>
                          <FaUserTag className="me-2 text-success" /> {labels[language].role}
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
                            <label>
                              <FaTractor className="me-2 text-success" /> {labels[language].farmName}
                            </label>
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
                            <label>
                              <FaMapPin className="me-2 text-success" /> {labels[language].farmLocation}
                            </label>
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
                            <label>
                              <FaRuler className="me-2 text-success" /> {labels[language].managerExperience}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    {formData.role === "Admin" && (
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
                            <label>
                              <FaTractor className="me-2 text-success" /> {labels[language].farmName}
                            </label>
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
                            <label>
                              <FaMapPin className="me-2 text-success" /> {labels[language].farmLocation}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              name="farm_size"
                              value={formData.farm_size || ""}
                              onChange={handleChange}
                              placeholder={labels[language].farmSize}
                              disabled={!isEditing}
                            />
                            <label>
                              <FaRuler className="me-2 text-success" /> {labels[language].farmSize}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {formType === "fertilizer" && (
                  <>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="fertilizer_id"
                          value={formData.fertilizer_id || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option value="">{labels[language].selectFertilizer || "Select Fertilizer"}</option>
                          {fertilizers.map((fertilizer) => (
                            <option key={fertilizer.id} value={fertilizer.id}>
                              {fertilizer.name}
                            </option>
                          ))}
                        </select>
                        <label>
                          <FaLeaf className="me-2 text-success" /> {labels[language].fertilizerName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_name"
                          value={farms.find((farm) => farm.id === formData.farm_id)?.name || "N/A"}
                          disabled
                        />
                        <label>
                          <FaTractor className="me-2 text-success" /> {labels[language].farmName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="date"
                          value={
                            formData.date && moment(formData.date, "DD-MMM-YYYY hh:mm A", true).isValid()
                              ? moment.tz(formData.date, "DD-MMM-YYYY hh:mm A", "Asia/Kolkata").format("YYYY-MM-DDTHH:mm")
                              : ""
                          }
                          onChange={(e) => {
                            const isoDate = e.target.value;
                            if (isoDate) {
                              const istDate = moment.tz(isoDate, "Asia/Kolkata");
                              if (istDate.isValid()) {
                                handleChange({
                                  target: { name: "date", value: istDate.format("DD-MMM-YYYY hh:mm A") },
                                });
                              } else {
                                handleChange({ target: { name: "date", value: "" } });
                              }
                            } else {
                              handleChange({ target: { name: "date", value: "" } });
                            }
                          }}
                          placeholder={labels[language].date}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaCalendarAlt className="me-2 text-success" /> {labels[language].date}
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {formType === "expense" && (
                  <>
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
                          step="0.01"
                          min="0"
                        />
                        <label>
                          <FaRupeeSign className="me-2 text-success" /> {labels[language].amount}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="reason"
                          value={formData.reason || ""}
                          onChange={handleChange}
                          placeholder={labels[language].category}
                          disabled={!isEditing}
                        />
                        <label>
                          <FaTags className="me-2 text-success" /> {labels[language].category}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
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
                          <FaFileAlt className="me-2 text-success" /> {labels[language].description}
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {formType === "billing" && (
                  <>
                    <div className="col-md-6">
                      <div className="form-floating">
                        {isEditing ? (
                          <select
                            className="form-select"
                            name="farm_id"
                            value={formData.farm_id || ""}
                            onChange={handleChange}
                            onFocus={fetchFarms}
                            disabled={isLoadingFarms}
                          >
                            <option value="">{isLoadingFarms ? "Loading Farms..." : labels[language].selectFarm || "Select Farm"}</option>
                            {farms.map((farm) => (
                              <option key={farm.id} value={farm.id}>
                                {farm.name || `Farm ${farm.id}`} ({farm.address})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.farm_name || "N/A"}
                            disabled
                          />
                        )}
                        <label>
                          <FaTractor className="me-2 text-success" /> {labels[language].farm}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        {isEditing ? (
                          <select
                            className="form-select"
                            name="product_id"
                            value={formData.product_id || ""}
                            onChange={handleChange}
                            disabled={isLoadingProducts}
                          >
                            <option value="">{isLoadingProducts ? "Loading Products..." : labels[language].selectProduct || "Select Product"}</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name} ({product.price})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.product_name || "N/A"}
                            disabled
                          />
                        )}
                        <label>
                          <FaLeaf className="me-2 text-success" /> {labels[language].product}
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
                          <FaCalendarAlt className="me-2 text-success" /> {labels[language].billDate}
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
                          <FaUserTag className="me-2 text-success" /> {labels[language].traderName}
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
                          <FaTruck className="me-2 text-success" /> {labels[language].vehicleNumber}
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
                          <FaRupeeSign className="me-2 text-success" /> {labels[language].rate}
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
                          <FaLeaf className="me-2 text-success" /> {labels[language].trees}
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
                          <FaRuler className="me-2 text-success" /> {labels[language].weight}
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
                          <FaLeaf className="me-2 text-success" /> {labels[language].leaves}
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
                          <FaRupeeSign className="me-2 text-success" /> {labels[language].travellingAmount}
                        </label>
                      </div>
                    </div>
                    {formData.id && !isEditing && (
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            name="manager_amount"
                            value={formData.manager_amount || ""}
                            placeholder={labels[language].managerAmount}
                            disabled={true}
                            step="0.01"
                            min="0"
                          />
                          <label>
                            <FaRupeeSign className="me-2 text-success" /> {labels[language].managerAmount}
                          </label>
                        </div>
                      </div>
                    )}
                    {formData.id && !isEditing && (
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            name="total_amount"
                            value={formData.total_amount || ""}
                            placeholder={labels[language].totalAmount}
                            disabled={true}
                            step="0.01"
                            min="0"
                          />
                          <label>
                            <FaRupeeSign className="me-2 text-success" /> {labels[language].totalAmount}
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {formType === "adminExpense" && (
                  <>
                    {isEditing ? (
                      <>
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
                              step="0.01"
                              min="0"
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].amount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="reason"
                              value={formData.reason || ""}
                              onChange={handleChange}
                              placeholder={labels[language].reason}
                              disabled={!isEditing}
                            />
                            <label>
                              <FaFileAlt className="me-2 text-success" /> {labels[language].reason}
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
                              <FaFileAlt className="me-2 text-success" /> {labels[language].description}
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="amount"
                              value={formData.amount ? `₹${formData.amount}` : "N/A"}
                              disabled
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].amount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="reason"
                              value={formData.reason || "N/A"}
                              disabled
                            />
                            <label>
                              <FaFileAlt className="me-2 text-success" /> {labels[language].reason}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="description"
                              value={formData.description || "N/A"}
                              disabled
                            />
                            <label>
                              <FaFileAlt className="me-2 text-success" /> {labels[language].description}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="date_created"
                              value={formData.date_created || "N/A"}
                              disabled
                            />
                            <label>
                              <FaCalendarAlt className="me-2 text-success" /> {labels[language].dateCreated}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {formType === "managerExpense" && (
                  <>
                    {isEditing ? (
                      <>
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
                              step="0.01"
                              min="0"
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].amount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="reason"
                              value={formData.reason || ""}
                              onChange={handleChange}
                              placeholder={labels[language].reason}
                              disabled={!isEditing}
                            />
                            <label>
                              <FaTags className="me-2 text-success" /> {labels[language].reason}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
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
                              <FaFileAlt className="me-2 text-success" /> {labels[language].description}
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="amount"
                              value={formData.amount ? `₹${formData.amount}` : "N/A"}
                              disabled
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].amount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="reason"
                              value={formData.reason || "N/A"}
                              disabled
                            />
                            <label>
                              <FaTags className="me-2 text-success" /> {labels[language].reason}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="description"
                              value={formData.description || "N/A"}
                              disabled
                            />
                            <label>
                              <FaFileAlt className="me-2 text-success" /> {labels[language].description}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="date_created"
                              value={formData.date_created || "N/A"}
                              disabled
                            />
                            <label>
                              <FaCalendarAlt className="me-2 text-success" /> {labels[language].dateCreated}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {formType === "takenAmount" && (
                  <>
                    {isEditing ? (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="farmer"
                              value={farmers.find((f) => f.id === formData.farmer)?.user?.first_name || formData.farmer || "N/A"}
                              disabled
                            />
                            <label>
                              <FaUser className="me-2 text-success" /> {labels[language].farmer}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              name="taken_amount"
                              value={formData.taken_amount || ""}
                              onChange={handleChange}
                              placeholder={labels[language].takenAmount}
                              step="0.01"
                              min="0"
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].takenAmount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              name="pending_amount"
                              value={"0"}
                              onChange={handleChange}
                              placeholder={labels[language].pendingAmount}
                              step="0.01"
                              min="0"
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].pendingAmount}
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="farmer"
                              value={farmers.find((f) => f.id === formData.farmer)?.user?.first_name || formData.farmer || "N/A"}
                              disabled
                            />
                            <label>
                              <FaUser className="me-2 text-success" /> {labels[language].farmer}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="taken_amount"
                              value={formData.taken_amount ? `₹${formData.taken_amount}` : "N/A"}
                              disabled
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].takenAmount}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="pending_amount"
                              value={formData.pending_amount ? `₹${formData.pending_amount}` : "N/A"}
                              disabled
                            />
                            <label>
                              <FaRupeeSign className="me-2 text-success" /> {labels[language].pendingAmount}
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-end gap-2">
              {isEditing ? (
                <>
                  <button type="submit" className="btn btn-success btn-sm d-flex align-items-center">
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
                <>
                  {onEdit && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm d-flex align-items-center"
                      onClick={onEdit}
                    >
                      <FaSave className="me-2" /> {labels[language].edit}
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm d-flex align-items-center"
                    onClick={onClose}
                  >
                    <FaTimes className="me-2" /> {labels[language].cancel}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;