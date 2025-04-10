import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm";
import api from "../../Api/axiosInstance";
import Swal from "sweetalert2"; // Import SweetAlert

import {
  FaMapPin,
  FaGlobe,
  FaTractor,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";

function Allfarms() {
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    location_url: "",
    farm_size: "",
    manager_id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Start with 1, adjust dynamically
  const [hasMore, setHasMore] = useState(true); // Track if there are more records
  const farmsPerPage = 10;

  const labels = {
    en: {
      title: "All Farms",
      noFarms: "No farms available.",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      farmSize: "Farm Size (acres)",
      manager: "Manager",
      view: "View",
      cancel: "Cancel",
      searchPlaceholder: "Search...",
      unauthorized: "Unauthorized: No token found",
      fetchManagersError: "Failed to fetch managers",
      previous: "Previous",
      next: "Next",
    },
    mr: {
      title: "सर्व शेती",
      noFarms: "कोणतीही शेती उपलब्ध नाही.",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      farmSize: "शेताचा आकार (एकर)",
      manager: "व्यवस्थापक",
      view: "पहा",
      cancel: "बंद करा",
      searchPlaceholder: "शोधा...",
      unauthorized: "अनधिकृत: टोकन सापडले नाही",
      fetchManagersError: "व्यवस्थापक आणण्यात अयशस्वी",
      previous: "मागील",
      next: "पुढील",
    },
  };

  const fetchManagers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(labels[language].unauthorized);
      return;
    }

    try {
      const response = await api.get("/users/?action=getFarmManager", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setManagers(response.data.data || []);
    } catch (err) {
      toast.error(labels[language].fetchManagersError);
      setManagers([]);
    }
  }, [language]);


  const fetchFarms = useCallback(
    async (page = 1) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError(labels[language].unauthorized);
        return;
      }
  
      setLoading(true);
      try {
        const response = await api.get(
          `/farm/?action=getFarm&page=${page}&records_number=${farmsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
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
            confirmButtonColor: "#28a745", // Green Bootstrap color
          });
  
          return; // Stop execution
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
        setFilteredFarms(normalizedFarms);
  
        setHasMore(farmData.length === farmsPerPage);
        setTotalPages((prev) => (farmData.length === farmsPerPage ? Math.max(prev, page + 1) : page));
  
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching farms.");
        setHasMore(false);
  
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid page number or no data available.",
          confirmButtonColor: "#dc3545", // Bootstrap danger color
        });
      } finally {
        setLoading(false);
      }
    },
    [language, searchQuery, farmsPerPage]
  );
  

  useEffect(() => {
    fetchFarms(currentPage);
    fetchManagers();
  }, [fetchFarms, fetchManagers, currentPage]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    setTotalPages(1); // Reset total pages
    setHasMore(true); // Reset hasMore
    fetchFarms(1); // Fetch new data for page 1 with the search query
  };

  const handleViewFarm = (farm) => {
    const manager = managers.find((m) => m.id === farm.manager_id);
    setSelectedFarm(farm);
    setFormData({
      id: farm.id || "",
      name: farm.name || "N/A",
      address: farm.address || "N/A",
      location_url: farm.location_url || "N/A",
      farm_size: farm.farm_size || "N/A",
      manager_id: farm.manager_id || "",
    });
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

  return (
    <div className="container mt-4">
      <div className="bg-success text-white py-2 rounded px-3 d-flex align-items-center justify-content-between flex-column gap-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <BackButton className="backbtn fs-4" />
          <h2 className="text-white m-0 flex-grow-1 text-center me-3">
            <FaWarehouse className="me-2" /> {labels[language].title}
          </h2>
        </div>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={labels[language].searchPlaceholder}
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="input-group-text border-0">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <Spinner />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredFarms.length > 0 ? (
        <div className="mt-3">
          <div className="row g-3">
            {filteredFarms.map((farm) => (
              <div key={farm.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{farm.name}</strong>
                    </h5>
                    <div className="d-flex align-items-center mb-2">
                      <FaMapPin className="me-2 text-success" />
                      <strong>{labels[language].address}:</strong>{" "}
                      {farm.address}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaGlobe className="me-2 text-success" />
                      <strong>{labels[language].locationUrl}:</strong>{" "}
                      <a
                        href={farm.location_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-inline-block text-truncate text-break w-100"
                        style={{ maxWidth: "200px" }}
                      >
                        {farm.location_url}
                      </a>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaTractor className="me-2 text-success" />
                      <strong>{labels[language].farmSize}:</strong>{" "}
                      {farm.farm_size}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <strong>{labels[language].manager}:</strong>{" "}
                      {farm.manager_id
                        ? managers.find((m) => m.id === farm.manager_id)?.user
                            ?.first_name +
                            " " +
                            managers.find((m) => m.id === farm.manager_id)?.user
                              ?.last_name || `Manager ID: ${farm.manager_id}`
                        : "No Manager Assigned"}
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleViewFarm(farm)}
                      >
                        <FaEye className="me-1" /> {labels[language].view}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm flex-wrap">
                <li
                  className={`page-item ${
                    currentPage === 1 || loading ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || loading}
                  >
                    &laquo; {labels[language].previous}
                  </button>
                </li>

                <li className="page-item active">
                  <span className="page-link bg-success text-white border-0">
                    {currentPage} / {totalPages}
                  </span>
                </li>

                <li
                  className={`page-item ${
                    !hasMore || loading ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNext}
                    disabled={!hasMore || loading}
                  >
                    {labels[language].next} &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted">{labels[language].noFarms}</p>
      )}

      <ModalForm
        isOpen={!!selectedFarm}
        onClose={() => setSelectedFarm(null)}
        isEditing={false}
        formData={formData}
        labels={labels}
        language={language}
        formType="farm"
        managers={managers}
      />

      <ToastContainer />
    </div>
  );
}

export default Allfarms;
