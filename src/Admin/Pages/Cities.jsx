// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./cities.css";
// import BackButton from "../../Components/BackButton";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../Spinner/Spinner";

// const Cities = () => {
//   const navigate = useNavigate();
//   const { language } = useLanguage();

//   const getStoredCities = () => {
//     const storedCities = localStorage.getItem("cities");
//     try {
//       const parsedCities = JSON.parse(storedCities);
//       return Array.isArray(parsedCities) ? parsedCities : [];
//     } catch (error) {
//       return [];
//     }
//   };

//   const [cities, setCities] = useState(getStoredCities);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [newCity, setNewCity] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false); // For adding city
//   const [fetchLoading, setFetchLoading] = useState(true); // For fetching cities
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCities = async () => {
//       setFetchLoading(true); // Start loading
//       try {
//         const response = await axios.get(
//           "https://agri-management-main.vercel.app/master_data/?action=getCity"
//         );
//         if (response.data && Array.isArray(response.data.data)) {
//           setCities(response.data.data);
//           localStorage.setItem("cities", JSON.stringify(response.data.data));
//         } else {
//           setCities([]);
//         }
//       } catch (err) {
//         console.error("Error fetching cities:", err);
//         setCities([]);
//       } finally {
//         setFetchLoading(false); // Stop loading regardless of success or failure
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleCityClick = (city) => {
//     navigate(`/sheti/${city.name}`);
//   };

//   const handleAddCity = async () => {
//     if (newCity.trim() === "") {
//       toast.error("Please enter a valid city name.");
//       return;
//     }

//     const cityExists = cities.some(
//       (city) => city.name.toLowerCase() === newCity.toLowerCase()
//     );

//     if (cityExists) {
//       toast.error("City already exists!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Unauthorized: No token found.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         action: "postCity",
//         name: newCity.trim(),
//       };

//       const response = await axios.post(
//         "https://agri-management-main.vercel.app/master_data/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.data || !response.data.data || !response.data.data.name) {
//         throw new Error("Invalid response from server.");
//       }

//       const addedCity = response.data.data;
//       setCities([...cities, addedCity]);
//       localStorage.setItem("cities", JSON.stringify([...cities, addedCity]));
//       setShowModal(false);
//       setNewCity("");
//       toast.success("City added successfully!", {
//         position: "top-center",
//       });
//     } catch (err) {
//       console.error("API Error:", err);
//       toast.error(err.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const translations = {
//     en: {
//       title: "🌍 Popular Cities",
//       addCity: " Add City",
//       AllFarms: "All Farms",
//       searchPlaceholder: "Search",
//       modalTitle: "Add New City",
//       cityNamePlaceholder: "Enter city name",
//       submit: "Submit",
//       cancel: "Cancel",
//     },
//     mr: {
//       title: "🌍 लोकप्रिय शहरे",
//       addCity: " शहर जोडा",
//       AllFarms: "सर्व शेत",
//       searchPlaceholder: "शोधा",
//       modalTitle: "नवीन शहर जोडा",
//       cityNamePlaceholder: "शहराचे नाव प्रविष्ट करा",
//       submit: "सबमिट करा",
//       cancel: "रद्द करा",
//     },
//   };

//   const filteredCities = Array.isArray(cities)
//     ? cities.filter((city) =>
//         city.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="cities-container mb-5">
//       <div className="mb-3 d-flex align-items-center py-3 header-container">
//         <BackButton className="backbtn fs-4 ms-2" />
//         <h2 className="fs-2 text-white flex-grow-1 text-center m-0">
//           {translations[language].title}
//         </h2>
//       </div>

//       <div className="container">
//         <div className="d-flex flex-nowrap ms-auto align-items-center justify-content-center gap-1 flex-md-wrap">
//           <div
//             className="input-group"
//             style={{ flex: "1", width:"180px"}}
//           >
//             <input
//               type="search"
//               className="form-control rounded"
//               placeholder={translations[language].searchPlaceholder}
//               aria-label="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <button
//             className="btn btn-success btn-sm fw-bold d-flex align-items-center p-2"
//             style={{ whiteSpace: "nowrap" }}
//             onClick={() => setShowModal(true)}
//           >
//             {translations[language].addCity}
//           </button>
//           <button
//             className="btn btn-success btn-sm fw-bold p-2"
//             style={{ whiteSpace: "nowrap" }}
//             onClick={() => navigate("/allfarms")}
//           >
//             {translations[language].AllFarms}
//           </button>
//         </div>
//       </div>

//       {/* Cities Grid with Spinner */}
//       <div className="cities-grid">
//         {fetchLoading && cities.length === 0 ? (
//           <div className="text-center mt-3">
//             <Spinner />
//           </div>
//         ) : filteredCities.length > 0 ? (
//           filteredCities.map((city) => (
//             <div
//               key={city.id}
//               className="city-card"
//               onClick={() => handleCityClick(city)}
//             >
//               {city.name}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No cities found</p>
//         )}
//       </div>

//       {/* Add City Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4>{translations[language].modalTitle}</h4>
//             <input
//               type="text"
//               className="form-control"
//               placeholder={translations[language].cityNamePlaceholder}
//               value={newCity}
//               onChange={(e) => setNewCity(e.target.value)}
//             />
//             {error && <p className="text-danger">{error}</p>}
//             <div className="modal-actions">
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setShowModal(false)}
//               >
//                 {translations[language].cancel}
//               </button>
//               <button
//                 className="btn btn-success"
//                 onClick={handleAddCity}
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : translations[language].submit}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Cities;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./cities.css";
import BackButton from "../../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";

const Cities = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getStoredCities = () => {
    const storedCities = localStorage.getItem("cities");
    try {
      const parsedCities = JSON.parse(storedCities);
      return Array.isArray(parsedCities)
        ? parsedCities.filter((city) => city && typeof city.name === "string")
        : [];
    } catch (error) {
      console.error("Error parsing stored cities:", error);
      return [];
    }
  };

  const [cities, setCities] = useState(getStoredCities);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCity, setNewCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCityId, setEditCityId] = useState(null);
  const [editCityName, setEditCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      setFetchLoading(true);
      try {
        const response = await axios.get(
          "https://agri-management-main.vercel.app/master_data/?action=getCity"
        );
        if (response.data && Array.isArray(response.data.data)) {
          const validCities = response.data.data.filter(
            (city) => city && typeof city.name === "string"
          );
          setCities(validCities);
          localStorage.setItem("cities", JSON.stringify(validCities));
        } else {
          setCities([]);
          localStorage.setItem("cities", JSON.stringify([]));
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCities([]);
        localStorage.setItem("cities", JSON.stringify([]));
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (city) => {
    navigate(`/sheti/${city.name}`);
  };

  const toggleOptions = (cityId) => {
    setSelectedCityId((prev) => (prev === cityId ? null : cityId));
  };

  const handleAddCity = async () => {
    if (newCity.trim() === "") {
      toast.error("Please enter a valid city name.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found.");
      }
      const payload = {
        action: "postCity",
        name: newCity.trim(),
      };
      const response = await axios.post(
        "https://agri-management-main.vercel.app/master_data/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data?.data?.name) {
        throw new Error("Invalid response from server.");
      }
      const updatedCities = [response.data.data, ...cities];
      setCities(updatedCities);
      localStorage.setItem("cities", JSON.stringify(updatedCities));
      setShowModal(false);
      setNewCity("");
      toast.success("City added successfully!");
    } catch (err) {
      console.error("API Error (Add City):", err.response || err);
      toast.error(err.response?.data?.message || "Failed to add city");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCity = (city) => {
    setEditCityId(city.id);
    setEditCityName(city.name);
    setShowEditModal(true);
  };

  const handleUpdateCity = async () => {
    if (editCityName.trim() === "") {
      toast.error("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found.");
      }

      const payload = {
        action: "patchCity",
        id: editCityId,
        name: editCityName.trim(),
      };

      const response = await axios.patch(
        "https://agri-management-main.vercel.app/master_data/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data?.data || typeof response.data.data.name !== "string") {
        throw new Error("Invalid response format from server.");
      }

      const updatedCity = {
        ...cities.find((city) => city.id === editCityId),
        name: response.data.data.name,
      };

      // Move updated city to the top
      const updatedCities = [
        updatedCity,
        ...cities.filter((city) => city.id !== editCityId),
      ];

      setCities(updatedCities);
      localStorage.setItem("cities", JSON.stringify(updatedCities));
      setShowEditModal(false);
      setSelectedCityId(null);
      toast.success("City name updated successfully!");
    } catch (err) {
      console.error("API Error (Update City):", err.response || err);
      toast.error(err.response?.data?.message || "Failed to update city");
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: "🌍 Popular Cities",
      addCity: " Add City",
      AllFarms: "All Farms",
      searchPlaceholder: "Search",
      modalTitle: "Add New City",
      cityNamePlaceholder: "Enter city name",
      submit: "Submit",
      cancel: "Cancel",
      edit: "Edit",
      update: "Update",
    },
    mr: {
      title: "🌍 लोकप्रिय शहरे",
      addCity: " शहर जोडा",
      AllFarms: "सर्व शेत",
      searchPlaceholder: "शोधा",
      modalTitle: "नवीन शहर जोडा",
      cityNamePlaceholder: "शहराचे नाव प्रविष्ट करा",
      submit: "सबमिट करा",
      cancel: "रद्द करा",
      edit: "संपादन",
      update: "अद्यतनित करा",
    },
  };

  const filteredCities = Array.isArray(cities)
    ? cities.filter(
        (city) =>
          city &&
          typeof city.name === "string" &&
          city.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="cities-container mb-5">
      <div className="mb-3 d-flex align-items-center py-3 header-container">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-2 text-white flex-grow-1 text-center m-0">
          {translations[language].title}
        </h2>
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
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            {translations[language].addCity}
          </button>
          <button
            className="btn btn-success btn-sm fw-bold p-2"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigate("/allfarms")}
            disabled={loading}
          >
            {translations[language].AllFarms}
          </button>
        </div>
      </div>

      <div className="cities-grid">
        {fetchLoading && cities.length === 0 ? (
          <div className="text-center mt-3">
            <Spinner />
          </div>
        ) : filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div
              key={city.id}
              className="city-card d-flex justify-content-between align-items-center flex-wrap"
            >
              <span
                className="city-name"
                onClick={() => handleCityClick(city)}
              >
                {city.name}
              </span>
              <div className="city-actions">
                {selectedCityId === city.id ? (
                  <div className="city-options">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditCity(city)}
                      disabled={loading}
                    >
                      {translations[language].edit}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedCityId(null)}
                      disabled={loading}
                    >
                      {translations[language].cancel}
                    </button>
                  </div>
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={() => toggleOptions(city.id)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No cities found</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{translations[language].modalTitle}</h4>
            <input
              type="text"
              className="form-control"
              placeholder={translations[language].cityNamePlaceholder}
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              disabled={loading}
            />
            <div className="modal-actions">
              <button
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                {translations[language].cancel}
              </button>
              <button
                className="btn btn-success"
                onClick={handleAddCity}
                disabled={loading}
              >
                {loading ? "Submitting..." : translations[language].submit}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{translations[language].modalTitle}</h4>
            <input
              type="text"
              className="form-control"
              value={editCityName}
              onChange={(e) => setEditCityName(e.target.value)}
              disabled={loading}
            />
            <div className="modal-actions">
              <button
                className="btn btn-danger"
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                {translations[language].cancel}
              </button>
              <button
                className="btn btn-success"
                onClick={handleUpdateCity}
                disabled={loading}
              >
                {loading ? "Updating..." : translations[language].update}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Cities;