import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./villages.css";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import api from "../../src/api/axiosInstance";
import { FaSave, FaTimes, FaGlobe } from "react-icons/fa";

const Villages = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getStoredVillages = () => {
    const storedVillages = localStorage.getItem("villages");
    try {
      const parsedVillages = JSON.parse(storedVillages);
      return Array.isArray(parsedVillages)
        ? parsedVillages.filter(
            (village) => village && typeof village.name === "string"
          )
        : [];
    } catch (error) {
      console.error("Error parsing stored villages:", error);
      return [];
    }
  };

  const [villages, setVillages] = useState(getStoredVillages);
  const [serverVillages, setServerVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showShetiModal, setShowShetiModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [availableVillages, setAvailableVillages] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluka, setSelectedTaluka] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = useMemo(
    () => ({
      en: {
        title: "My Villages",
        addSheti: "Add Village",
        AllFarms: "All Farms",
        searchPlaceholder: "Search",
        cancel: "Cancel",
        edit: "Edit",
        update: "Update",
        state: "State",
        district: "District",
        taluka: "Taluka",
        gaon: "Village",
        toast: {
          fetchStatesError: "Failed to fetch states",
          fetchDistrictsError: "Failed to fetch districts",
          fetchTalukasError: "Failed to fetch talukas",
          fetchVillagesError: "Failed to fetch villages",
          selectTalukaVillageError: "Please select both taluka and village",
          villageExistsError: "This village is already associated with the selected taluka",
          villageAddedSuccess: "Village added successfully!",
          villageAddError: "Failed to add village",
          timeoutError: "Request timed out. Please try again.",
        },
      },
      mr: {
        title: "माझे गावे",
        addSheti: "गावे जोडा",
        AllFarms: "सर्व शेत",
        searchPlaceholder: "शोधा",
        cancel: "रद्द करा",
        edit: "संपादन",
        update: "अद्यतनित करा",
        state: "राज्य",
        district: "जिल्हा",
        taluka: "तालुका",
        gaon: "गाव",
        toast: {
          fetchStatesError: "राज्य आणण्यात अयशस्वी",
          fetchDistrictsError: "जिल्हे आणण्यात अयशस्वी",
          fetchTalukasError: "तालुके आणण्यात अयशस्वी",
          fetchVillagesError: "गावे आणण्यात अयशस्वी",
          selectTalukaVillageError: "कृपया तालुका आणि गाव दोन्ही निवडा",
          villageExistsError: "हे गाव आधीपासूनच निवडलेल्या तालुक्याशी संबंधित आहे",
          villageAddedSuccess: "गाव यशस्वीरित्या जोडले गेले!",
          villageAddError: "गाव जोडण्यात अयशस्वी",
          timeoutError: "विनंती वेळ संपली. कृपया पुन्हा प्रयत्न करा.",
        },
      },
    }),
    [language]
  );

  // Utility function for retrying failed requests
  const fetchWithRetry = async (url, options = {}, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await api.get(url, { ...options, timeout: 60000 });
        return response;
      } catch (err) {
        if (i === retries - 1) throw err; // Last retry failed
        if (err.response?.status === 504 || err.code === 'ECONNABORTED') {
          console.warn(`Retry ${i + 1}/${retries} for ${url} due to timeout`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw err; // Non-timeout errors, stop retrying
      }
    }
  };

  const fetchStates = useCallback(async () => {
    try {
      const response = await fetchWithRetry("/master_data/?action=getState");
      setStates(response.data.data || []);
    } catch (err) {
      toast.error(translations[language].toast.fetchStatesError);
    }
  }, [language, translations]);

  const fetchDistricts = useCallback(async (stateId) => {
    try {
      const response = await fetchWithRetry("/master_data/?action=getDistrict");
      setDistricts(response.data.data || []);
    } catch (err) {
      toast.error(translations[language].toast.fetchDistrictsError);
    }
  }, [language, translations]);

  const fetchTalukas = useCallback(async (districtId) => {
    try {
      const response = await fetchWithRetry("/master_data/?action=getTaluka");
      setTalukas(response.data.data || []);
    } catch (err) {
      toast.error(translations[language].toast.fetchTalukasError);
    }
  }, [language, translations]);

  const fetchVillagesForTaluka = useCallback(
    async (talukaId) => {
      setLoading(true);
      try {
        const response = await fetchWithRetry("/master_data/?action=getVillage");
        if (response.data && Array.isArray(response.data.data)) {
          const filteredVillages = response.data.data.filter(
            (village) =>
              village &&
              village.taluka &&
              village.taluka.id === talukaId &&
              typeof village.name === "string"
          );
          setAvailableVillages(filteredVillages);
        } else {
          setAvailableVillages([]);
        }
      } catch (err) {
        toast.error(
          err.response?.status === 504 || err.code === 'ECONNABORTED'
            ? translations[language].toast.timeoutError
            : translations[language].toast.fetchVillagesError
        );
        setAvailableVillages([]);
      } finally {
        setLoading(false);
      }
    },
    [language, translations]
  );

  const fetchInitialVillages = useCallback(async () => {
    setFetchLoading(true);
    setLoading(true);
    try {
      const response = await fetchWithRetry("/farm/?action=getFarmVillage");
      if (response.data && Array.isArray(response.data.data)) {
        const validVillages = response.data.data.filter(
          (village) =>
            village &&
            typeof village.name === "string" &&
            village.id &&
            village.taluka &&
            village.taluka.id
        );
        setServerVillages(validVillages);
        setVillages(validVillages);
        localStorage.setItem("villages", JSON.stringify(validVillages));
      } else {
        setServerVillages([]);
        setVillages([]);
        localStorage.setItem("villages", JSON.stringify([]));
      }
    } catch (err) {
      toast.error(
        err.response?.status === 504 || err.code === 'ECONNABORTED'
          ? translations[language].toast.timeoutError
          : translations[language].toast.fetchVillagesError
      );
      setServerVillages([]);
      setVillages([]);
      localStorage.setItem("villages", JSON.stringify([]));
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  }, [language, translations]);

  useEffect(() => {
    if (serverVillages.length === 0) {
      fetchInitialVillages();
    } else {
      setFetchLoading(false);
    }
  }, [fetchInitialVillages, serverVillages.length]);

  useEffect(() => {
    if (showShetiModal) {
      fetchStates();
    }
  }, [showShetiModal, fetchStates]);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState.id);
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setTalukas([]);
      setSelectedTaluka(null);
      setSelectedVillage(null);
      setAvailableVillages([]);
    }
  }, [selectedState, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTalukas(selectedDistrict.id);
    } else {
      setTalukas([]);
      setSelectedTaluka(null);
      setSelectedVillage(null);
      setAvailableVillages([]);
    }
  }, [selectedDistrict, fetchTalukas]);

  useEffect(() => {
    if (selectedTaluka) {
      fetchVillagesForTaluka(selectedTaluka.id);
    } else {
      setAvailableVillages([]);
      setSelectedVillage(null);
    }
  }, [selectedTaluka, fetchVillagesForTaluka]);

  const handleSubmitSheti = async () => {
    if (!selectedTaluka || !selectedVillage) {
      toast.error(translations[language].toast.selectTalukaVillageError);
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    try {
      const existingVillage = villages.find(
        (village) =>
          village &&
          village.name === selectedVillage.name &&
          village.taluka &&
          village.taluka.id === selectedTaluka.id
      );

      if (existingVillage) {
        toast.error(translations[language].toast.villageExistsError);
        return;
      }

      const payload = {
        action: "postVillage",
        taluka_id: selectedTaluka.id,
        name: selectedVillage.name,
      };

      const response = await api.post("/master_data/", payload, {
        timeout: 30000, // 30 seconds for POST
      });

      if (response.data.success) {
        const newVillage = {
          id: response.data.data.id || Date.now(),
          name: selectedVillage.name,
          taluka: {
            id: selectedTaluka.id,
            name: selectedTaluka.name,
            district: selectedDistrict,
            state: selectedState,
          },
        };

        const updatedVillages = [...villages, newVillage];
        setVillages(updatedVillages);
        setAvailableVillages([...availableVillages, newVillage]);
        localStorage.setItem("villages", JSON.stringify(updatedVillages));

        toast.success(translations[language].toast.villageAddedSuccess);
        setShowShetiModal(false);
        setSelectedState(null);
        setSelectedDistrict(null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || translations[language].toast.villageAddError
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleVillageClick = (village) => {
    navigate(`/Admin/sheti/${village.id}`);
  };

  const filteredVillages = useMemo(
    () =>
      Array.isArray(serverVillages)
        ? serverVillages.filter(
            (village) =>
              village &&
              typeof village.name === "string" &&
              village.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [],
    [serverVillages, searchQuery]
  );

  return (
    <div className="villages-container mb-5">
      <div className="mb-3 d-flex align-items-center py-3 header-container">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-2 text-white flex-grow-1 text-center m-0">
          <FaGlobe className="me-2" /> {translations[language].title}
        </h2>
        <div className="spacer" style={{ width: "40px" }}></div>
      </div>

      <div className="container">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
          <div className="input-group" style={{ flex: "1", width: "180px" }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder={translations[language].searchPlaceholder}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => setShowShetiModal(true)}
            disabled={loading}
          >
            {translations[language].addSheti}
          </button>
          <button
            className="btn btn-success btn-sm fw-bold p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigate("/Admin/allfarms")}
            disabled={loading}
          >
            {translations[language].AllFarms}
          </button>
        </div>
      </div>

      <div className="villages-grid gap-1">
        {fetchLoading && serverVillages.length === 0 ? (
          <div className="text-center mt-3">
            <Spinner />
          </div>
        ) : filteredVillages.length > 0 ? (
          filteredVillages.map((village) => (
            <div
              key={village.id}
              className="village-card d-flex justify-content-between align-items-center flex-wrap"
            >
              <span
                className="village-name"
                onClick={() => handleVillageClick(village)}
              >
                {village.name}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No Villages found</p>
        )}
      </div>

      {showShetiModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#198754",
                  borderBottom: "1px solid #dee2e6",
                  color: "white",
                }}
              >
                <h5
                  className="modal-title fw-bold ms-auto"
                  style={{ color: "white" }}
                >
                  {translations[language].addSheti}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowShetiModal(false)}
                  disabled={loading || isSubmitting}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ padding: "20px" }}>
                <div className="mb-4">
                  <label
                    htmlFor="stateSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].state}
                  </label>
                  <select
                    id="stateSelect"
                    className="form-select"
                    value={selectedState ? selectedState.id : ""}
                    onChange={(e) => {
                      const stateId = parseInt(e.target.value, 10);
                      const state = states.find((s) => s.id === stateId);
                      setSelectedState(state || null);
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="districtSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].district}
                  </label>
                  <select
                    id="districtSelect"
                    className="form-select"
                    disabled={!selectedState}
                    value={selectedDistrict ? selectedDistrict.id : ""}
                    onChange={(e) => {
                      const districtId = parseInt(e.target.value, 10);
                      const district = districts.find((d) => d.id === districtId);
                      setSelectedDistrict(district || null);
                    }}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="talukaSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].taluka}
                  </label>
                  <select
                    id="talukaSelect"
                    className="form-select"
                    disabled={!selectedDistrict}
                    value={selectedTaluka ? selectedTaluka.id : ""}
                    onChange={(e) => {
                      const talukaId = parseInt(e.target.value, 10);
                      const taluka = talukas.find((t) => t.id === talukaId);
                      setSelectedTaluka(taluka || null);
                    }}
                  >
                    <option value="">Select Taluka</option>
                    {talukas.map((taluka) => (
                      <option key={taluka.id} value={taluka.id}>
                        {taluka.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="villageSelect"
                    className="form-label fw-bold"
                    style={{ color: "#495057" }}
                  >
                    {translations[language].gaon}
                  </label>
                  <select
                    id="villageSelect"
                    className="form-select"
                    disabled={!selectedTaluka || loading}
                    value={selectedVillage ? selectedVillage.id : ""}
                    onChange={(e) => {
                      const villageId = parseInt(e.target.value, 10);
                      const village = availableVillages.find((v) => v.id === villageId);
                      setSelectedVillage(village || null);
                    }}
                  >
                    <option value="">Select Village</option>
                    {loading ? (
                      <option value="">Loading Villages...</option>
                    ) : availableVillages.length > 0 ? (
                      availableVillages.map((village) => (
                        <option key={village.id} value={village.id}>
                          {village.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Villages Available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm d-flex align-items-center"
                  onClick={() => setShowShetiModal(false)}
                  disabled={loading || isSubmitting}
                >
                  <FaTimes className="me-2" /> {translations[language].cancel}
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm d-flex align-items-center"
                  onClick={handleSubmitSheti}
                  disabled={loading || isSubmitting || !selectedVillage}
                >
                  <FaSave className="me-2" /> {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Villages;