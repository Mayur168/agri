import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./villages.css";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import api from "../../Api/axiosInstance";
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
            (village) => village && typeof village.village?.name === "string"
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
          villageExistsError: "This village is already added",
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
          villageExistsError: "हे गाव आधीपासूनच जोडले गेले आहे",
          villageAddedSuccess: "गाव यशस्वीरित्या जोडले गेले!",
          villageAddError: "गाव जोडण्यात अयशस्वी",
          timeoutError: "विनंती वेळ संपली. कृपया पुन्हा प्रयत्न करा。",
        },
      },
    }),
    [language]
  );

  const fetchWithRetry = async (
    url,
    options = {},
    retries = 3,
    delay = 2000
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await api.get(url, { ...options, timeout: 60000 });
        return response;
      } catch (err) {
        if (i === retries - 1) throw err;
        if (err.response?.status === 504 || err.code === "ECONNABORTED") {
          console.warn(`Retry ${i + 1}/${retries} for ${url} due to timeout`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw err;
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

  const fetchDistricts = useCallback(
    async (stateId) => {
      setLoading(true);
      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getDistrict&state_id=${stateId}`
        );
        const filteredDistricts = response.data.data.filter(
          (district) => district.state?.id === stateId
        );
        setDistricts(filteredDistricts || []);
      } catch (err) {
        toast.error(translations[language].toast.fetchDistrictsError);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    },
    [language, translations]
  );

  const fetchTalukas = useCallback(
    async (districtId) => {
      setLoading(true);
      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getTaluka&district_id=${districtId}`
        );
        const filteredTalukas = response.data.data.filter(
          (taluka) => taluka.district?.id === districtId
        );
        setTalukas(filteredTalukas || []);
      } catch (err) {
        toast.error(translations[language].toast.fetchTalukasError);
        setTalukas([]);
      } finally {
        setLoading(false);
      }
    },
    [language, translations]
  );

  const fetchVillagesForTaluka = useCallback(
    async (taluka_id) => {
      setLoading(true);
      try {
        const response = await fetchWithRetry(
          `/master_data/?action=getVillage&taluka=${taluka_id}`
        );
        const filteredVillages = response.data.data.filter(
          (village) => village.taluka?.id === taluka_id
        );
        setAvailableVillages(filteredVillages || []);
      } catch (err) {
        toast.error(
          err.response?.status === 504 || err.code === "ECONNABORTED"
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
            typeof village.village?.name === "string" &&
            village.id &&
            village.village?.id
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
        err.response?.status === 504 || err.code === "ECONNABORTED"
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
      setAvailableVillages([]);
      setSelectedVillage(null);
    }
  }, [selectedState, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTalukas(selectedDistrict.id);
    } else {
      setTalukas([]);
      setSelectedTaluka(null);
      setAvailableVillages([]);
      setSelectedVillage(null);
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
      const existingVillage = serverVillages.find(
        (village) => village && village.village?.id === selectedVillage.id
      );

      if (existingVillage) {
        toast.error(translations[language].toast.villageExistsError);
        return;
      }

      const payload = {
        action: "postFarmVillage",
        name: "",
        description: "",
        village: selectedVillage.id,
      };

      const response = await api.post("/farm/", payload, {
        timeout: 30000,
      });

      console.log("POST response:", response.data); // Debug response

      // Broaden success condition to handle common success cases
      if (
        response.status === 200 ||
        response.data.success ||
        response.data.message === "Village Created!"
      ) {
        const newVillage = {
          id: response.data.data?.id || Date.now(),
          name: response.data.data?.name || "",
          description: response.data.data?.description || "",
          village: {
            id: selectedVillage.id,
            name: selectedVillage.name,
          },
          taluka: {
            id: selectedTaluka.id,
            name: selectedTaluka.name,
            district: selectedDistrict,
            state: selectedState,
          },
        };

        // Use functional updates to ensure latest state
        setVillages((prevVillages) => {
          const updated = [...prevVillages, newVillage];
          localStorage.setItem("villages", JSON.stringify(updated));
          return updated;
        });
        setServerVillages((prevServerVillages) => [
          ...prevServerVillages,
          newVillage,
        ]);

        console.log("Village added to state"); // Debug state update
        toast.success(translations[language].toast.villageAddedSuccess, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setShowShetiModal(false);
        setSelectedState(null);
        setSelectedDistrict(null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error adding village:", err);
      toast.error(
        err.response?.data?.message ||
          translations[language].toast.villageAddError,
        {
          position: "top-right",
          autoClose: 3000,
        }
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
              typeof village.village?.name === "string" &&
              village.village.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        : [],
    [serverVillages, searchQuery]
  );

  return (
    <div className="villages-container mb-5">
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-2 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          <FaGlobe className="me-2" /> {translations[language].title}
        </h2>
      </div>

      <div className="container">
        <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
          <div className="input-group" style={{ flex: "1", width: "180px" }}>
            <input
              type="search"
              className="form-control rounded border-success"
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
            <div key={village.id} className="village-card">
              <span
                className="village-name"
                onClick={() => handleVillageClick(village)}
              >
                {village.village.name}
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
                    disabled={!selectedState || loading}
                    value={selectedDistrict ? selectedDistrict.id : ""}
                    onChange={(e) => {
                      const districtId = parseInt(e.target.value, 10);
                      const district = districts.find(
                        (d) => d.id === districtId
                      );
                      setSelectedDistrict(district || null);
                    }}
                  >
                    <option value="">Select District</option>
                    {loading ? (
                      <option value="">Loading Districts...</option>
                    ) : districts.length > 0 ? (
                      districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Districts Available</option>
                    )}
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
                    disabled={!selectedDistrict || loading}
                    value={selectedTaluka ? selectedTaluka.id : ""}
                    onChange={(e) => {
                      const talukaId = parseInt(e.target.value, 10);
                      const taluka = talukas.find((t) => t.id === talukaId);
                      setSelectedTaluka(taluka || null);
                    }}
                  >
                    <option value="">Select Taluka</option>
                    {loading ? (
                      <option value="">Loading Talukas...</option>
                    ) : talukas.length > 0 ? (
                      talukas.map((taluka) => (
                        <option key={taluka.id} value={taluka.id}>
                          {taluka.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Talukas Available</option>
                    )}
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
                      const village = availableVillages.find(
                        (v) => v.id === villageId
                      );
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
                  <FaSave className="me-2" />{" "}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Villages;
