

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Added useLocation
import { useLanguage } from "../../contexts/LanguageContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const { language } = useLanguage();
  const location = useLocation(); // Get navigation state
  const selectedCity = location.state?.selectedCity || ""; // Extract selected city from state

  const [formData, setFormData] = useState({
    farm_name: "",
    address: "",
    location_url: "",
    city: selectedCity, // Pre-fill with selected city
    farm_size: "",
  });

  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://agri-management-main-ywm4.vercel.app/master_data/?action=getCity"
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCities(response.data.data);
      } else {
        setCities([]);
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCitySelect = (selectedCity) => {
    setFormData((prevState) => ({
      ...prevState,
      city: selectedCity.name, // Use city name instead of ID for display
    }));
    setShowDropdown(false);
  };

  const handleAddCity = async () => {
    if (!newCity.trim()) {
      toast.warn("Please enter a city name!", { position: "top-center" });
      return;
    }

    try {
      const existingCity = cities.find(
        (city) => city.name.toLowerCase() === newCity.toLowerCase()
      );
      if (existingCity) {
        toast.error("City already exists!", { position: "top-center" });
        return;
      }

      const response = await axios.post(
        "https://agri-management-main.vercel.app/master_data/",
        {
          action: "postCity",
          name: newCity,
        }
      );

      if (
        response.data &&
        response.data.message === "City Created!" &&
        response.data.data
      ) {
        const newAddedCity = response.data.data;
        toast.success(`✅ ${newAddedCity.name} added successfully!`, {
          position: "top-center",
        });
        const updatedCities = [...cities, newAddedCity];
        setCities(updatedCities);
        setFormData((prevState) => ({
          ...prevState,
          city: newAddedCity.name, // Set the new city name
        }));
        setShowDropdown(false);
        setNewCity("");
      } else {
        throw new Error("Unexpected API response");
      }
    } catch (err) {
      console.error("Error adding city:", err);
      toast.error("❌ Failed to add city. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://agri-management-main.vercel.app/users/farms/",
        {
          action: "postFarm",
          ...formData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(" Farm details submitted successfully!", {
        position: "top-center",
      });
      setFormData({
        farm_name: "",
        address: "",
        location_url: "",
        city: "", // Reset to empty after submission
        farm_size: "",
      });
    } catch (err) {
      toast.error("❌ Submission failed! Try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const formLabels = {
    en: {
      farm_name: "Farm Name",
      address: "Address",
      location_url: "Location URL",
      city: "City",
      farm_size: "Farm Size",
      submit: "Submit",
      submitting: "Submitting...",
      selectCity: "Select City",
      addCity: "Add City",
      enterNewCity: "Enter new city",
    },
    mr: {
      farm_name: "शेताचे नाव",
      address: "पत्ता",
      location_url: "स्थान URL",
      city: "शहर",
      farm_size: "शेताचा आकार",
      submit: "सबमिट करा",
      submitting: "सबमिट करत आहे...",
      selectCity: "शहर निवडा",
      addCity: "शहर जोडा",
      enterNewCity: "नवीन शहर प्रविष्ट करा",
    },
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white text-center">
          <h2 className="mb-0 text-white">
            {language === "en" ? "Farm Details Form" : "शेती तपशील फॉर्म"}
          </h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger text-center mb-3">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{formLabels[language].farm_name}</label>
              <input
                type="text"
                className="form-control"
                name="farm_name"
                value={formData.farm_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{formLabels[language].address}</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{formLabels[language].location_url}</label>
              <input
                type="text"
                className="form-control"
                name="location_url"
                value={formData.location_url}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">{formLabels[language].city}</label>
              <input
                type="text"
                className="form-control dropdown-toggle"
                name="city"
                value={formData.city}
                onChange={handleChange} // Allow manual changes
                onClick={() => setShowDropdown(!showDropdown)}
                placeholder={formLabels[language].selectCity}
                aria-haspopup="true"
                aria-expanded={showDropdown}
              />
              {showDropdown && (
                <div className="dropdown-menu show w-100" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <button
                        key={city.id}
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city.name}
                      </button>
                    ))
                  ) : (
                    <div className="dropdown-item text-muted">No cities available</div>
                  )}
                  <hr className="dropdown-divider" />
                  <div className="p-2">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder={formLabels[language].enterNewCity}
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={handleAddCity}
                      type="button"
                    >
                      {formLabels[language].addCity}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">{formLabels[language].farm_size}</label>
              <input
                type="number"
                className="form-control"
                name="farm_size"
                value={formData.farm_size}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? formLabels[language].submitting : formLabels[language].submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;