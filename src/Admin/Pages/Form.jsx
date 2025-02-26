// import React, { useState } from "react";
// import axios from "axios";
// // import PrimaryButton from "../../Components/PrimaryButton";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     farmingType: "",
//     profit: "",
//     loss: "",
//     farmPeak: "",
//     totalLabors: "",
//     rentPerDay: "",
//     peakDuration: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token"); // Get token from local storage

//       const response = await axios.post(
//         "https://your-backend-url.com/api/farms",
//         {
//           action: "postFarmRecord", // Adjust the action if required
//           ...formData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Form Submitted:", response.data);
//       alert("Farm details submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setError("Failed to submit the form. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const response = await axios.post("https://your-backend-url.com/api/farms", formData);
//   //     console.log("Form Submitted:", response.data);
//   //     alert("Farm details submitted successfully!");
//   //   } catch (err) {
//   //     console.error("Error submitting form:", err);
//   //     setError("Failed to submit the form. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="sheti-form-container mb-5">
//       <h2 className="sheti-form-title">Farm Details Form</h2>
//       {error && <div className="sheti-error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>

//         {/* Farming Type */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label mt-5">Farming Type</label>
//           <select className="sheti-form-select" name="farmingType" value={formData.farmingType} onChange={handleChange} required>
//             <option value="">Select Farming Type</option>
//             <option value="Aquaculture">Agriculture</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         {/* Profit */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Profit (₹)</label>
//           <input type="number" className="sheti-form-control" name="profit" value={formData.profit} onChange={handleChange} required />
//         </div>

//         {/* Loss */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Loss (₹)</label>
//           <input type="number" className="sheti-form-control" name="loss" value={formData.loss} onChange={handleChange} required />
//         </div>

//         {/* Farm Peak */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Farm Peak (Date)</label>
//           <input type="date" className="sheti-form-control" name="farmPeak" value={formData.farmPeak} onChange={handleChange} required />
//         </div>

//         {/* Total Labors */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Total Labors</label>
//           <input type="number" className="sheti-form-control" name="totalLabors" value={formData.totalLabors} onChange={handleChange} required />
//         </div>

//         {/* Rent Per Day */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Rent Per Day (₹)</label>
//           <input type="number" className="sheti-form-control" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
//         </div>

//         {/* Peak Duration */}
//         <div className="sheti-form-group">
//           <label className="sheti-form-label">Duration of Farm Peak (Days)</label>
//           <input type="number" className="sheti-form-control" name="peakDuration" value={formData.peakDuration} onChange={handleChange} required />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="sheti-submit-btn" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//         {/* <PrimaryButton type="submit" className="sheti-submit-btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</PrimaryButton> */}
//       </form>
//     </div>
//   );
// };

// export default Form;

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
      toast.success("✅ Farm details submitted successfully!", {
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