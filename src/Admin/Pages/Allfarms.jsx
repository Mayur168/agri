import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm";
import api from "../../Api/axiosInstance";
import { FaMapPin, FaGlobe, FaTractor, FaEye } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";

function Allfarms() {
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    farm_name: "",
    address: "",
    location_url: "",
    farm_size: "",
    manager_name: "",
  });

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
      searchPlaceholder: "Search by address or farm size...",
      unauthorized: "Unauthorized: No token found",
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
      searchPlaceholder: "पत्ता किंवा शेताचा आकार शोधा...",
      unauthorized: "अनधिकृत: टोकन सापडले नाही",
    },
  };

  const fetchFarms = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(labels[language].unauthorized);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get("/farm/?action=getFarm", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      const farmData = Array.isArray(result.data)
        ? result.data
        : [result.data].filter(Boolean);

      const normalizedFarms = farmData.map((farm) => ({
        id: farm.id,
        farm_name: farm.name || "N/A",
        address: farm.address || "N/A",
        location_url: farm.location_url || "N/A",
        farm_size: farm.farm_size || "N/A",
        manager: farm.manager
          ? { id: farm.manager, name: `Manager ID: ${farm.manager}` }
          : null,
      }));

      setFarms(normalizedFarms);
      setFilteredFarms(normalizedFarms);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error fetching farms."
      );
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchFarms();
  }, [fetchFarms]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = farms.filter((farm) => {
      const address = (farm.address || "").toLowerCase();
      const farmSize = (farm.farm_size || "").toString().toLowerCase();
      return address.includes(query) || farmSize.includes(query);
    });

    setFilteredFarms(filtered);
  };

  const handleViewFarm = (farm) => {
    setSelectedFarm(farm);
    setFormData({
      id: farm.id || "",
      farm_name: farm.farm_name || "N/A",
      address: farm.address || "N/A",
      location_url: farm.location_url || "N/A",
      farm_size: farm.farm_size || "N/A",
      manager_name: farm.manager ? farm.manager.name : "No Manager Assigned",
    });
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
                      <strong>{farm.farm_name}</strong>
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
                        style={{ maxWidth: "200px" }} // Adjust width as needed
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
                      {farm.manager ? farm.manager.name : "No Manager Assigned"}
                    </div>
                    <button
                      className="btn btn-success btn-sm mt-3"
                      onClick={() => handleViewFarm(farm)}
                    >
                      <FaEye className="me-1" /> {labels[language].view}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted">{labels[language].noFarms}</p>
      )}

      <ModalForm
        isOpen={!!selectedFarm}
        onClose={() => setSelectedFarm(null)}
        formData={formData}
        labels={labels}
        language={language}
        formType="farm"
      />

      <ToastContainer />
    </div>
  );
}

export default Allfarms;
