import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm";
import api from "../../src/api/axiosInstance";

function Sheti() {
  const { villageId } = useParams();
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location_url: "",
    farm_size: "",
    id: "", // Added to ensure consistency
  });
  const [isEditing, setIsEditing] = useState(false);
  const [villageName, setVillageName] = useState("");
  const [villageError, setVillageError] = useState(false);

  const labels = {
    en: {
      modalTitle: "Add Farm",
      view: "View",
      edit: "Edit",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      farmSize: "Farm Size (acres)",
      submit: "Submit",
      close: "Close",
      delete: "Delete",
      deleteConfirm: "Are you sure you want to delete this farm?",
      villageNotFound: "Village ID not found",
      toast: {
        noToken: "No token found! Please log in.",
        locationSuccess: "Live location captured successfully!",
        locationError: "Failed to get location. Please allow location access.",
        locationNotSupported: "Geolocation is not supported by your browser.",
        farmAddedSuccess: "Farm added successfully!",
        farmAddError: "Failed to add farm.",
        farmUpdatedSuccess: "Farm updated successfully!",
        farmUpdateError: "Failed to update farm.",
        farmDeletedSuccess: "Farm deleted successfully!",
        farmDeleteError: "Failed to delete farm.",
        villageIdError: "Village ID not found in stored data",
      },
    },
    mr: {
      modalTitle: "शेती जोडा",
      view: "पहा",
      edit: "संपादन करा",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      farmSize: "शेताचा आकार (एकर)",
      submit: "सुरक्षित करा",
      close: "बंद करा",
      delete: "मिटवा",
      deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
      villageNotFound: "गावाचा आयडी सापडला नाही",
      toast: {
        noToken: "टोकन सापडले नाही! कृपया लॉग इन करा.",
        locationSuccess: "लाइव्ह स्थान यशस्वीरित्या कॅप्चर केले!",
        locationError: "स्थान मिळविण्यात अयशस्वी. कृपया स्थान परवानगी द्या.",
        locationNotSupported: "आपल्या ब्राउझरद्वारे जिओलोकेशन समर्थित नाही.",
        farmAddedSuccess: "शेती यशस्वीरित्या जोडली गेली!",
        farmAddError: "शेती जोडण्यात अयशस्वी.",
        farmUpdatedSuccess: "शेती यशस्वीरित्या अद्यतनित केली गेली!",
        farmUpdateError: "शेती अद्यतनित करण्यात अयशस्वी.",
        farmDeletedSuccess: "शेती यशस्वीरित्या हटविली गेली!",
        farmDeleteError: "शेती हटविण्यात अयशस्वी.",
        villageIdError: "साठवलेल्या डेटामध्ये गावाचा आयडी सापडला नाही",
      },
    },
  };

  const fetchFarmsData = useCallback(async () => {
    if (!villageId || isNaN(parseInt(villageId))) {
      setVillageError(true);
      setVillageName("Unknown Village");
      setFilteredFarms([]);
      toast.error(labels[language].toast.villageIdError);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        return;
      }

      const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];

      const selectedVillage = storedVillages.find(
        (village) => village.id === parseInt(villageId)
      );

      if (!selectedVillage) {
        setVillageError(true);
        setVillageName("Unknown Village");
        setFilteredFarms([]);
        toast.error(labels[language].toast.villageIdError);
        return;
      }

      setVillageName(selectedVillage.name);
      setVillageError(false);

      const response = await api.get(
        `/farm/?action=getFarmVillage&village_id=${villageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (response.data && Array.isArray(response.data.data)) {
        const villageFarms = response.data.data.filter(
          (farm) => farm.village === parseInt(villageId)
        );
        setFarms(villageFarms);
        setFilteredFarms(villageFarms);
      } else {
        setFarms([]);
        setFilteredFarms([]);
      }
    } catch (error) {
      setFarms([]);
      setFilteredFarms([]);
      if (
        error.response?.status === 404 &&
        error.response?.data?.message !== "No farm village found"
      ) {
        setVillageError(true);
        toast.error(labels[language].toast.villageIdError);
      }
    }
  }, [villageId, language]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = farms.filter(
      (farm) =>
        (farm.name || "").toLowerCase().includes(query) &&
        farm.village === parseInt(villageId)
    );
    setFilteredFarms(filtered);
  };

  useEffect(() => {
    fetchFarmsData();
  }, [fetchFarmsData]);

  const handleViewFarm = (farm) => {
    setFormData({
      name: farm.name || "",
      address: farm.description || "",
      location_url: farm.location_url || "",
      farm_size: farm.farm_size || "",
      id: farm.id || "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditFarm = (farm) => {
    setFormData({
      name: farm.name || "",
      address: farm.description || "",
      location_url: farm.location_url || "",
      farm_size: farm.farm_size || "",
      id: farm.id || "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddFarmClick = () => {
    setFormData({
      name: "",
      address: "",
      location_url: "",
      farm_size: "",
      id: "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prev) => ({
            ...prev,
            location_url: googleMapsUrl,
          }));
          toast.success(labels[language].toast.locationSuccess);
        },
        (error) => {
          toast.error(labels[language].toast.locationError);
        }
      );
    } else {
      toast.error(labels[language].toast.locationNotSupported);
    }
  };

  const handlePostFarm = async () => {
    if (!villageId || isNaN(parseInt(villageId))) {
      toast.error(labels[language].toast.villageNotFound);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        return;
      }

      const postPayload = {
        action: "postFarm",
        name: formData.name,
        address: formData.address,
        location_url: formData.location_url,
        farm_size: formData.farm_size,
        farm_village_id: parseInt(villageId),
      };


      const response = await api.post("/farm/", postPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(labels[language].toast.farmAddedSuccess);
      setIsModalOpen(false);
      fetchFarmsData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || labels[language].toast.farmAddError
      );
    }
  };

  const handlePatchFarm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        return;
      }

      const patchPayload = {
        id: formData.id,
        action: "patchFarm",
        name: formData.name,
        address: formData.address,
        location_url: formData.location_url,
        farm_size: formData.farm_size,
      };


      const response = await api.patch("/farm/farm_village/", patchPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(labels[language].toast.farmUpdatedSuccess);
      setIsModalOpen(false);
      fetchFarmsData();
    } catch (error) {
      toast.error(labels[language].toast.farmUpdateError);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    if (formData.id) {
      await handlePatchFarm();
    } else {
      await handlePostFarm();
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        return;
      }

      const response = await api.delete("/farm/farm_village/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { action: "delFarm", id },
      });

      toast.success(labels[language].toast.farmDeletedSuccess);
      setIsModalOpen(false);
      fetchFarmsData();
    } catch (error) {
      toast.error(labels[language].toast.farmDeleteError);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="container-fluid py-3 bg-success my-2">
        <nav className="container d-flex align-items-center">
          <BackButton className="backbtn" />
          <span className="fs-5 text-white fw-bold text-center ms-2">
            {villageError
              ? labels[language].villageNotFound
              : language === "en"
              ? `Farming in: ${villageName}`
              : `शेती: ${villageName}`}
          </span>
        </nav>

        {!villageError && (
          <div className="input-group rounded my-2 container">
            <input
              type="search"
              className="form-control rounded"
              placeholder={language === "en" ? "Search" : "शोधा"}
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fa fa-search"></i>
            </span>
          </div>
        )}
      </div>

      <div className="container px-3">
        {!villageError ? (
          <>
            <div className="d-flex justify-content-end">
              <button
                onClick={handleAddFarmClick}
                className="btn btn-success btn-sm fw-bold m-2 p-1 rounded d-flex align-items-center"
              >
                <FaPlus className="me-1 text-white" />
                {language === "en" ? "Add Farm" : "शेती जोडा"}
              </button>
            </div>

            <ModalForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              isEditing={isEditing}
              formData={formData}
              labels={labels}
              handleChange={handleChange}
              handleSave={handleSave}
              handleDelete={handleDelete}
              language={language}
              getLiveLocation={getLiveLocation}
            />

            <div className="row g-4">
              {filteredFarms.length > 0 ? (
                filteredFarms.map((farm) => (
                  <div key={farm.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-3 h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{farm.name || "N/A"}</h5>
                        <p>
                          <strong>
                            {language === "en" ? "Village:" : "गाव:"}
                          </strong>{" "}
                          {villageName}
                        </p>
                        <p>
                          <strong>
                            {language === "en" ? "Address:" : "पत्ता:"}
                          </strong>{" "}
                          {farm.description || "N/A"}
                        </p>
                        <div className="mt-auto d-flex justify-content-center">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleViewFarm(farm)}
                          >
                            <FaEye className="me-1" /> {labels[language].view}
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEditFarm(farm)}
                          >
                            <FaEdit /> {labels[language].edit}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-4 col-12">
                  {language === "en"
                    ? `No farms found for ${villageName}.`
                    : `${villageName} साठी कोणतीही शेती सापडली नाही.`}
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center mt-4 text-danger">
            {labels[language].villageNotFound}
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sheti;