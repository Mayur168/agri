import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEdit, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import BackButton from "../Components/BackButton";
import ModalForm from "../Components/ModelForm"; // Ensure this path is correct
import api from "../../Api/axiosInstance";
import Spinner from "../../Admin/Spinner/Spinner"; // Adjusted path for Spinner

function Sheti() {
  const { villageId } = useParams();
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location_url: "",
    farm_size: "",
    id: "",
    manager_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [villageName, setVillageName] = useState("");
  const [villageError, setVillageError] = useState(false);
  const [managers, setManagers] = useState([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);
  const [farmerId, setFarmerId] = useState(null);

  const labels = {
    en: {
      modalTitle: "Edit Farm",
      view: "View",
      edit: "Edit",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      farmSize: "Farm Size (acres)",
      manager: "Manager",
      submit: "Submit",
      close: "Close",
      delete: "Delete",
      cancel: "Cancel",
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
        fetchManagersError: "Failed to fetch managers",
      },
    },
    mr: {
      modalTitle: "शेती संपादित करा",
      view: "पहा",
      edit: "संपादन करा",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      farmSize: "शेताचा आकार (एकर)",
      manager: "व्यवस्थापक",
      submit: "सुरक्षित करा",
      close: "बंद करा",
      delete: "मिटवा",
      cancel: "रद्द करा",
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
        fetchManagersError: "व्यवस्थापक आणण्यात अयशस्वी",
      },
    },
  };

  const fetchManagers = useCallback(async () => {
    setIsLoadingManagers(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        return;
      }
      const response = await api.get("/users/?action=getFarmManager", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setManagers(response.data.data || []);
    } catch (error) {
      toast.error(labels[language].toast.fetchManagersError);
      setManagers([]);
    } finally {
      setIsLoadingManagers(false);
    }
  }, [language]);

  const fetchFarmsData = useCallback(async () => {
    setIsLoading(true);
    if (!villageId || isNaN(parseInt(villageId))) {
      setVillageError(true);
      setVillageName("Unknown Village");
      setFilteredFarms([]);
      toast.error(labels[language].toast.villageIdError);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(labels[language].toast.noToken);
        setIsLoading(false);
        return;
      }

      const storedVillages = JSON.parse(localStorage.getItem("villages")) || [];
      const selectedVillage = storedVillages.find(
        (village) => village.id === parseInt(villageId)
      );

      if (!selectedVillage || (!selectedVillage.village?.name && !selectedVillage.name)) {
        setVillageError(true);
        setVillageName("Unknown Village");
        setFilteredFarms([]);
        toast.error(labels[language].toast.villageIdError);
        setIsLoading(false);
        return;
      }

      setVillageName(selectedVillage.village?.name || selectedVillage.name);
      setVillageError(false);

      const response = await api.get(
        `/farm/?action=getFarm&farm_village=${villageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        const transformedFarms = response.data.data.map((farm) => ({
          id: farm.id,
          name: farm.name,
          description: farm.address,
          location_url: farm.location_url,
          farm_size: farm.farm_size,
          village: { id: farm.farm_village },
          manager_id: farm.manager,
          farmer_id: farm.farmer,
        }));
        setFarms(transformedFarms);
        setFilteredFarms(transformedFarms);
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
    } finally {
      setIsLoading(false);
    }
  }, [villageId, language]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.farmer_id) {
      setFarmerId(user.farmer_id);
    }
    fetchFarmsData();
    fetchManagers();
  }, [fetchFarmsData, fetchManagers]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = farms.filter((farm) =>
      (farm.name || "").toLowerCase().includes(query)
    );
    setFilteredFarms(filtered);
  };

  const handleViewFarm = (farm) => {
    setFormData({
      name: farm.name || "",
      address: farm.description || "",
      location_url: farm.location_url || "",
      farm_size: farm.farm_size || "",
      id: farm.id || "",
      manager_id: farm.manager_id || "",
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
      manager_id: farm.manager_id || "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteFarm = (id) => {
    handleDelete(id);
  };

  const handleAddFarmClick = () => {
    setFormData({
      name: "",
      address: "",
      location_url: "",
      farm_size: "",
      id: "",
      manager_id: "",
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
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
        farmer_id: farmerId,
      };

      const response = await api.post("/farm/", postPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newFarm = response.data.data;
      if (newFarm) {
        const transformedNewFarm = {
          id: newFarm.id,
          name: newFarm.name,
          description: newFarm.address,
          location_url: newFarm.location_url,
          farm_size: newFarm.farm_size,
          village: { id: newFarm.farm_village },
          manager_id: newFarm.manager,
          farmer_id: newFarm.farmer,
        };
        setFarms((prevFarms) => [...prevFarms, transformedNewFarm]);
        setFilteredFarms((prevFiltered) => [...prevFiltered, transformedNewFarm]);
        Swal.fire({
          icon: "success",
          title: labels[language].toast.farmAddedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsModalOpen(false);
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
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
      };

      const response = await api.patch("/farm/", patchPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Check if the PATCH was successful
      if (response.status === 200 || response.data?.success) {
        // Construct the updated farm object from formData
        const updatedFarm = {
          id: formData.id,
          name: formData.name,
          description: formData.address,
          location_url: formData.location_url,
          farm_size: formData.farm_size,
          village: { id: parseInt(villageId) },
          manager_id: formData.manager_id ? parseInt(formData.manager_id) : null,
          farmer_id: farms.find((farm) => farm.id === formData.id)?.farmer_id || farmerId,
        };

        // Update the farms and filteredFarms states immediately
        setFarms((prevFarms) =>
          prevFarms.map((farm) =>
            farm.id === formData.id ? updatedFarm : farm
          )
        );
        setFilteredFarms((prevFiltered) =>
          prevFiltered.map((farm) =>
            farm.id === formData.id ? updatedFarm : farm
          )
        );

        // Show SweetAlert2 success message
        Swal.fire({
          icon: "success",
          title: labels[language].toast.farmUpdatedSuccess,
          showConfirmButton: false,
          timer: 1500,
        });

        setIsModalOpen(false);
      } else {
        toast.error(labels[language].toast.farmUpdateError);
      }
    } catch (error) {
      console.error("Patch Error:", error.response);
      toast.error(
        error.response?.data?.message || labels[language].toast.farmUpdateError
      );
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
      await api.delete("/farm/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { action: "delFarm", id },
      });
      Swal.fire({
        icon: "success",
        title: labels[language].toast.farmDeletedSuccess,
        showConfirmButton: false,
        timer: 1500,
      });
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
          <span className="fs-5 text-white fw-bold text-center ms-0">
            {villageError
              ? labels[language].villageNotFound
              : language === "en"
              ? `Farming in: ${villageName}`
              : `शेती: ${villageName}`}
          </span>
        </nav>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={language === "en" ? "Search" : "शोधा"}
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div className="container px-3">
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
          managers={managers}
          isLoadingManagers={isLoadingManagers}
        />

        {isLoading ? (
          <div className="text-center my-4">
            <Spinner />
          </div>
        ) : (
          <div className="row g-4">
            {filteredFarms.length > 0 ? (
              filteredFarms.map((farm) => (
                <div key={farm.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card shadow-lg border-0 rounded-3 h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{farm.name || "N/A"}</h5>
                      <p>
                        <strong>{language === "en" ? "Village:" : "गाव:"}</strong>{" "}
                        {villageName}
                      </p>
                      <p>
                        <strong>{language === "en" ? "Address:" : "पत्ता:"}</strong>{" "}
                        {farm.description || "N/A"}
                      </p>
                      <div className="mt-auto d-flex justify-content-center">
                        <div className="dropdown">
                          <button
                            className="btn btn-link p-0 text-success"
                            type="button"
                            id={`dropdownMenuButton-${farm.id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FaEye className="eye-icon" size={20} />
                          </button>
                          <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby={`dropdownMenuButton-${farm.id}`}
                          >
                            <li>
                              <button
                                className="dropdown-item btn btn-info btn-sm"
                                onClick={() => handleViewFarm(farm)}
                              >
                                <FaEye className="me-2" /> {labels[language].view}
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item btn btn-primary btn-sm"
                                onClick={() => handleEditFarm(farm)}
                              >
                                <FaEdit className="me-2" /> {labels[language].edit}
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item btn btn-danger btn-sm"
                                onClick={() => handleDeleteFarm(farm.id)}
                              >
                                <FaTrash className="me-2" /> {labels[language].delete}
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item btn btn-secondary btn-sm"
                                onClick={() => {}}
                              >
                                <FaTimes className="me-2" /> {labels[language].cancel}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <div className="alert alert-danger" role="alert">
                  {language === "en"
                    ? "No farms found in this village!"
                    : "या गावात कोणतीही शेती आढळली नाही!"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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
}

export default Sheti;