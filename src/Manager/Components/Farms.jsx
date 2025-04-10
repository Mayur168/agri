import React, { useState, useEffect, useCallback, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Spinner from "../../Admin/Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import BackButton from "../../Admin/Components/BackButton";
import ModalForm from "../../Admin/Components/ModelForm";
import api from "../../Api/axiosInstance";
import { FaTractor, FaPlus, FaArrowLeft, FaArrowRight, FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

function Allfarms() {
  const { language } = useLanguage();
  const { user } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [fertilizers, setFertilizers] = useState([]);
  const [masterFertilizers, setMasterFertilizers] = useState([]);
  const [isFertilizerModalOpen, setIsFertilizerModalOpen] = useState(false);
  const [fertilizerFormData, setFertilizerFormData] = useState({
    id: null,
    fertilizer_id: "",
    farm_id: null,
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const farmsPerPage = 10;

  const labels = {
    en: {
      title: "All Farms",
      noFarms: "No farms available.",
      farmName: "Farm Name",
      searchPlaceholder: "Search by farm name...",
      unauthorized: "Unauthorized: No token found",
      previous: "Previous",
      next: "Next",
      fertilizers: "Fertilizers",
      addFertilizer: "Add Fertilizer",
      fertilizerName: "Fertilizer Name",
      date: "Date & Time",
      submit: "Save",
      noFertilizers: "No fertilizers available for this farm.",
      noFertilizersPresent: "Fertilizers are not present.", // New label for info message
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteConfirm: "Are you sure you want to delete this fertilizer?",
    },
    mr: {
      title: "सर्व शेती",
      noFarms: "कोणतीही शेती उपलब्ध नाही.",
      farmName: "शेताचे नाव",
      searchPlaceholder: "शेताच्या नावाने शोधा...",
      unauthorized: "अनधिकृत: टोकन सापडले नाही",
      previous: "मागील",
      next: "पुढील",
      fertilizers: "खते",
      addFertilizer: "खत जोडा",
      fertilizerName: "खताचे नाव",
      date: "दिनांक आणि वेळ",
      submit: "जतन करा",
      noFertilizers: "या शेतासाठी कोणतेही खते उपलब्ध नाहीत।",
      noFertilizersPresent: "खते उपस्थित नाहीत।", // New label for info message
      view: "पहा",
      edit: "संपादन करा",
      delete: "हटवा",
      cancel: "रद्द करा",
      deleteConfirm: "आपण हे खत खरोखर हटवू इच्छिता का?",
    },
  };

  const managerId = user?.manager_id;
  const managerName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "N/A";

  const fetchFarms = useCallback(
    async (page = 1) => {
      const token = localStorage.getItem("token");
      if (!token || !managerId) {
        setError(labels[language].unauthorized);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(
          `/farm/?action=getFarm&page=${page}&records_number=${farmsPerPage}&manager=${managerId}`,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        );

        const result = response.data;
        const farmData = Array.isArray(result.data) ? result.data : [result.data].filter(Boolean);

        if (farmData.length === 0 && page > 1) {
          setHasMore(false);
          Swal.fire({
            icon: "info",
            title: "No More Data",
            text: "There are no more farms available.",
            confirmButtonColor: "#28a745",
          });
          return;
        }

        const normalizedFarms = farmData.map((farm) => ({
          id: farm.id,
          name: farm.name || "N/A",
          address: farm.address || "N/A",
          location_url: farm.location_url || "N/A",
          farm_size: farm.farm_size || "N/A",
          manager_id: farm.manager || null,
        }));

        setFarms(normalizedFarms);
        setFilteredFarms(
          normalizedFarms.filter((farm) =>
            (farm.name.toLowerCase() || "").includes(searchQuery.toLowerCase())
          )
        );

        setHasMore(farmData.length === farmsPerPage);
        setTotalPages((prev) => (farmData.length === farmsPerPage ? Math.max(prev, page + 1) : page));

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching farms.");
        setHasMore(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch farms: " + (err.response?.data?.message || err.message),
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    },
    [language, farmsPerPage, managerId]
  );

  const fetchFertilizers = async (farmId) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await api.get(
        `/farm/?action=getFarmFertilizer&manager=${managerId}&farm=${farmId}`,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      const validRecords = Array.isArray(response.data.data)
        ? response.data.data.map((item) => ({
            id: item.id,
            fertilizer_id: item.fertilizer,
            farm_id: item.farm,
            date: item.date,
          }))
        : [];

      console.log("Fetched fertilizers:", validRecords);
      setFertilizers(validRecords);
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: labels[language].noFertilizersPresent,
        confirmButtonColor: "#3085d6",
        showConfirmButton: true,
      });
      setFertilizers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMasterFertilizers = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/master_data/?action=getfertilizer", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      console.log("Master fertilizers:", response.data.data);
      setMasterFertilizers(response.data.data || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch master fertilizers: " + (error.response?.data?.message || error.message),
        confirmButtonColor: "#d33",
      });
      setMasterFertilizers([]);
    }
  }, []);

  const handlePostFertilizer = async () => {
    if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all required fields (Fertilizer and Application Date)",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fertilizer_id: Number(fertilizerFormData.fertilizer_id),
        date: fertilizerFormData.date, // Mapping to 'date' as per backend expectation
        farm_id: selectedFarm?.id,
        action: "postFarmFertilizer",
      };

      const response = await api.post(`/farm/`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      });

      const newFertilizer = {
        id: response.data.data.id,
        fertilizer_id: response.data.data.fertilizer,
        farm_id: response.data.data.farm,
        date: response.data.data.date,
      };

      setFertilizers((prevFertilizers) => {
        const updatedFertilizers = [...prevFertilizers, newFertilizer];
        console.log("Updated fertilizers after POST:", updatedFertilizers);
        return updatedFertilizers;
      });

      resetFertilizerForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Fertilizer added successfully",
        confirmButtonColor: "#28a745",
      });
      await fetchFertilizers(selectedFarm.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add fertilizer: " + (error.response?.data?.message || error.message),
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFertilizer = async (id) => {
    const result = await Swal.fire({
      title: labels[language].deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const payload = {
        id: id,
        action: "delFarmFertilizer",
      };

      await api.delete(`/farm/`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: payload,
      });

      setFertilizers((prev) => prev.filter((fert) => fert.id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Fertilizer deleted successfully",
        confirmButtonColor: "#28a745",
      });
      await fetchFertilizers(selectedFarm.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete fertilizer: " + (error.response?.data?.message || error.message),
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditFertilizer = async () => {
    if (!fertilizerFormData.fertilizer_id || !fertilizerFormData.date) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all required fields (Fertilizer and Application Date)",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: fertilizerFormData.id,
        action: "patchFarmFertilizer",
        fertilizer_id: Number(fertilizerFormData.fertilizer_id),
        date: fertilizerFormData.date, 
        farm_id: selectedFarm?.id,
      };

      const response = await api.patch(`/farm/`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      });

      const updatedFertilizer = {
        id: response.data.data.id,
        fertilizer_id: response.data.data.fertilizer,
        farm_id: response.data.data.farm,
        date: response.data.data.date,
      };

      setFertilizers((prevFertilizers) =>
        prevFertilizers.map((fert) => (fert.id === updatedFertilizer.id ? updatedFertilizer : fert))
      );

      resetFertilizerForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Fertilizer updated successfully",
        confirmButtonColor: "#28a745",
      });
      await fetchFertilizers(selectedFarm.id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update fertilizer: " + (error.response?.data?.message || error.message),
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFarms(
      farms.filter((farm) =>
        (farm.name.toLowerCase() || "").includes(query)
      )
    );
  };

  const handleFarmClick = (farm) => {
    if (selectedFarm?.id === farm.id) {
      setSelectedFarm(null);
      setFertilizers([]);
    } else {
      setSelectedFarm(farm);
      fetchFertilizers(farm.id);
    }
  };

  const handleAddFertilizerOpen = (farm) => {
    setSelectedFarm(farm);
    setFertilizerFormData({
      id: null,
      fertilizer_id: "",
      farm_id: farm.id,
      date: "",
    });
    setIsEditing(true);
    setIsFertilizerModalOpen(true);
  };

  const handleViewFertilizer = (fertilizer) => {
    setFertilizerFormData(fertilizer);
    setIsEditing(false);
    setIsFertilizerModalOpen(true);
  };

  const handleEditFertilizerOpen = (fertilizer) => {
    setFertilizerFormData(fertilizer);
    setIsEditing(true);
    setIsFertilizerModalOpen(true);
  };

  const handleFertilizerChange = (e) => {
    const { name, value } = e.target;
    setFertilizerFormData({ ...fertilizerFormData, [name]: value });
  };

  const handleSaveFertilizer = async () => {
    if (fertilizerFormData.id) {
      await handleEditFertilizer();
    } else {
      await handlePostFertilizer();
    }
  };

  const resetFertilizerForm = () => {
    setFertilizerFormData({
      id: null,
      fertilizer_id: "",
      farm_id: selectedFarm?.id,
      date: "",
    });
    setIsFertilizerModalOpen(false);
    setIsEditing(false);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchFarms(currentPage);
    fetchMasterFertilizers();
  }, [fetchFarms, fetchMasterFertilizers, currentPage]);

  return (
    <div className="container mt-2 px-2">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white d-flex align-items-center justify-content-between flex-wrap">
          <BackButton className="btn btn-light fs-4" />
          <h2 className="mb-0 text-white text-center flex-grow-1">
            <FaWarehouse className="me-2" /> {labels[language].title}
          </h2>
          <div></div>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text bg-light">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="search"
              className="form-control"
              placeholder={labels[language].searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="alert alert-info" role="alert">
            <strong>{labels[language].manager}:</strong> {managerName} (ID: {managerId || "N/A"})
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center"><Spinner /></div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : filteredFarms.length > 0 ? (
        <div className="row">
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="col-md-4 mb-3">
              <div
                className={`card shadow-sm ${selectedFarm?.id === farm.id ? "border-success" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleFarmClick(farm)}
              >
                <div className="card-body">
                  <h5 className="card-title text-success">
                    <FaTractor className="me-2" /> {farm.name}
                  </h5>
                </div>
              </div>

              {selectedFarm?.id === farm.id && (
                <div className="mt-3">
                  <h6 className="text-success mb-3">{labels[language].fertilizers}</h6>
                  {fertilizers.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-striped table-sm shadow-sm">
                        <thead className="bg-success text-white">
                          <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col">{labels[language].fertilizerName}</th>
                            <th scope="col">{labels[language].date}</th>
                            <th scope="col" className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fertilizers.map((fert, index) => (
                            <tr key={fert.id}>
                              <td className="text-center">{index + 1}</td>
                              <td>
                                {masterFertilizers.find((f) => f.id === fert.fertilizer_id)?.name || "Unknown Fertilizer"}
                              </td>
                              <td>{new Date(fert.date).toLocaleString() || "N/A"}</td>
                              <td className="text-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-link p-0 text-success"
                                    type="button"
                                    id={`dropdownMenuButton-${fert.id}`}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <FaEye className="eye-icon" style={{ fontSize: "1.2rem" }} />
                                  </button>
                                  <div
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby={`dropdownMenuButton-${fert.id}`}
                                  >
                                    <button
                                      className="dropdown-item btn btn-info btn-sm"
                                      onClick={() => handleViewFertilizer(fert)}
                                    >
                                      <FaEye className="me-2" /> {labels[language].view}
                                    </button>
                                    <button
                                      className="dropdown-item btn btn-primary btn-sm"
                                      onClick={() => handleEditFertilizerOpen(fert)}
                                    >
                                      <FaEdit className="me-2" /> {labels[language].edit}
                                    </button>
                                    <button
                                      className="dropdown-item btn btn-danger btn-sm"
                                      onClick={() => handleDeleteFertilizer(fert.id)}
                                    >
                                      <FaTrash className="me-2" /> {labels[language].delete}
                                    </button>
                                    <button
                                      className="dropdown-item btn btn-secondary btn-sm"
                                      onClick={resetFertilizerForm}
                                    >
                                      <FaTimes className="me-2" /> {labels[language].cancel}
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">{labels[language].noFertilizers}</p>
                  )}
                  <button
                    className="btn btn-success btn-sm mt-2"
                    onClick={() => handleAddFertilizerOpen(farm)}
                  >
                    <FaPlus /> {labels[language].addFertilizer}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">{labels[language].noFarms}</div>
      )}

      {filteredFarms.length > 0 && (
        <div className="card-footer mt-4">
          <nav>
            <ul className="pagination pagination-sm flex-wrap justify-content-center">
              <li className={`page-item ${currentPage === 1 || loading ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={handlePrevious}
                  disabled={currentPage === 1 || loading}
                >
                  « {labels[language].previous}
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link bg-success text-white border-0">
                  {currentPage} / {totalPages}
                </span>
              </li>
              <li className={`page-item ${!hasMore || loading ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={handleNext}
                  disabled={!hasMore || loading}
                >
                  {labels[language].next} »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <ModalForm
        isOpen={isFertilizerModalOpen}
        onClose={resetFertilizerForm}
        isEditing={isEditing}
        formData={fertilizerFormData}
        labels={labels}
        language={language}
        formType="fertilizer"
        handleChange={handleFertilizerChange}
        handleSave={handleSaveFertilizer}
        handleDelete={handleDeleteFertilizer}
        fertilizers={masterFertilizers}
        farms={farms}
      />
    </div>
  );
}

export default Allfarms;