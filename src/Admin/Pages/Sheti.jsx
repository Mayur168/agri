// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
// import BackButton from "../../Components/BackButton";
// import { Link } from "react-router-dom";

// function Sheti() {
//   const { city } = useParams();
//   const [farms, setFarms] = useState([]);
//   const [filteredFarms, setFilteredFarms] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch farms from API with authentication
//   const fetchFarmsData = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("No token found! Please log in.");
//         return;
//       }

//       const response = await fetch(
//         "https://agri-management-main-ywm4.vercel.app/users/?action=getUser",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (Array.isArray(data) && data.length > 0) {
//         setFarms(data);
//         filterFarms(data, city);
//       } else {
//         console.warn("No farm data found.");
//         setFilteredFarms([]);
//       }
//     } catch (error) {
//       console.error("Error fetching farms:", error);
//       setFilteredFarms([]);
//     }
//   }, [city]);

//   // Filter farms based on selected city
//   const filterFarms = (farmData, selectedCity) => {
//     if (!selectedCity) {
//       setFilteredFarms(farmData);
//       return;
//     }

//     const filtered = farmData.filter(
//       (farm) =>
//         (farm.location || "").toLowerCase() === selectedCity.toLowerCase()
//     );

//     setFilteredFarms(filtered);
//   };

//   // Fetch data when component mounts or city changes
//   useEffect(() => {
//     fetchFarmsData();
//   }, [fetchFarmsData]);

//   // Handle search filtering
//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = farms.filter(
//       (farm) =>
//         farm.name.toLowerCase().includes(query) &&
//         farm.location.toLowerCase() === city.toLowerCase()
//     );

//     setFilteredFarms(filtered);
//   };

//   // Enable edit mode
//   const handleEdit = (id) => {
//     setFilteredFarms((prevFarms) =>
//       prevFarms.map((farm) =>
//         farm.id === id ? { ...farm, editable: true } : farm
//       )
//     );
//   };

//   // Save edited data
//   const handleSave = (id) => {
//     const updatedFarms = filteredFarms.map((farm) => {
//       if (farm.id === id) {
//         return {
//           ...farm,
//           name: document.getElementById(`name-${farm.id}`).value,
//           location: document.getElementById(`location-${farm.id}`).value,
//           profit: document.getElementById(`profit-${farm.id}`).value,
//           loss: document.getElementById(`loss-${farm.id}`).value,
//           farmPeak: document.getElementById(`farmPeak-${farm.id}`).value,
//           totalLabors: document.getElementById(`totalLabors-${farm.id}`).value,
//           rentPerDay: document.getElementById(`rentPerDay-${farm.id}`).value,
//           peakDuration: document.getElementById(`peakDuration-${farm.id}`)
//             .value,
//           editable: false,
//         };
//       }
//       return farm;
//     });

//     setFilteredFarms(updatedFarms);
//   };

//   // Delete a farm entry
//   const handleDelete = (id) => {
//     const updatedFarms = filteredFarms.filter((farm) => farm.id !== id);
//     setFilteredFarms(updatedFarms);
//   };

//   return (
//     <>
//       <div className="container-fluid py-2 bg-success">
//         {/* Navbar */}
//         <nav className="container d-flex align-items-center justify-content-between">
//           {/* Left: Back Button */}
//           <BackButton className="backbtn" />

//           {/* Center: Farming in {city} */}
//           <span className="fs-6 text-white fw-bold text-center">
//             Farming in : <br />
//             {city}
//           </span>

//           {/* Right: Add Farm Button */}
//           <Link
//             to="/Form"
//             className="btn btn-danger btn-sm fw-bold px-0 py-0 rounded"
//           >
//             Add Farm
//           </Link>
//         </nav>

//         {/* Search Bar */}
//         <div className="input-group rounded my-2 container">
//           <input
//             type="search"
//             className="form-control rounded"
//             placeholder="Search"
//             aria-label="Search"
//             aria-describedby="search-addon"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <span className="input-group-text border-0" id="search-addon">
//             <i className="fa fa-search"></i>
//           </span>
//         </div>
//       </div>

//       {/* Cards Display */}
//       <div className="row g-4">
//         {filteredFarms.length > 0 ? (
//           filteredFarms.map((farm) => (
//             <div key={farm.id} className="col-md-4">
//               <div className="card shadow-lg border-0 rounded-3">
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     {farm.editable ? (
//                       <input
//                         type="text"
//                         className="form-control"
//                         defaultValue={farm.name}
//                         id={`name-${farm.id}`}
//                       />
//                     ) : (
//                       farm.name
//                     )}
//                   </h5>
//                   <p>
//                     <strong>Location:</strong> {farm.location}
//                   </p>
//                   <p>
//                     <strong>Profit:</strong> ₹{farm.profit}
//                   </p>
//                   <p>
//                     <strong>Loss:</strong> ₹{farm.loss}
//                   </p>
//                   <p>
//                     <strong>Farm Peak:</strong> {farm.farmPeak}
//                   </p>
//                   <p>
//                     <strong>Total Labors:</strong> {farm.totalLabors}
//                   </p>
//                   <p>
//                     <strong>Rent Per Day:</strong> ₹{farm.rentPerDay}
//                   </p>
//                   <p>
//                     <strong>Peak Duration:</strong> {farm.peakDuration} Days
//                   </p>

//                   {/* Buttons */}
//                   <div className="d-flex justify-content-center mt-3">
//                     {farm.editable ? (
//                       <button
//                         className="btn btn-success me-2"
//                         onClick={() => handleSave(farm.id)}
//                       >
//                         <FaSave /> Save
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-primary me-2"
//                         onClick={() => handleEdit(farm.id)}
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                     )}
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(farm.id)}
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center mt-4">No farms found for {city}.</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default Sheti;

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import BackButton from "../../Components/BackButton";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext"; // Import useLanguage

function Sheti() {
  const { city } = useParams();
  const { language } = useLanguage(); // Get current language from context
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch farms from API with authentication
  const fetchFarmsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found! Please log in.");
        return;
      }

      const response = await fetch(
        "https://agri-management-main-ywm4.vercel.app/?action=getFarm",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setFarms(data);
        filterFarms(data, city);
      } else {
        console.warn("No farm data found.");
        setFilteredFarms([]);
      }
    } catch (error) {
      console.error("Error fetching farms:", error);
      setFilteredFarms([]);
    }
  }, [city]);

  // Filter farms based on selected city
  const filterFarms = (farmData, selectedCity) => {
    if (!selectedCity) {
      setFilteredFarms(farmData);
      return;
    }

    const filtered = farmData.filter(
      (farm) =>
        (farm.location || "").toLowerCase() === selectedCity.toLowerCase()
    );

    setFilteredFarms(filtered);
  };

  // Fetch data when component mounts or city changes
  useEffect(() => {
    fetchFarmsData();
  }, [fetchFarmsData]);

  // Handle search filtering
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = farms.filter(
      (farm) =>
        farm.name.toLowerCase().includes(query) &&
        farm.location.toLowerCase() === city.toLowerCase()
    );

    setFilteredFarms(filtered);
  };

  // Enable edit mode
  const handleEdit = (id) => {
    setFilteredFarms((prevFarms) =>
      prevFarms.map((farm) =>
        farm.id === id ? { ...farm, editable: true } : farm
      )
    );
  };

  // Save edited data
  const handleSave = (id) => {
    const updatedFarms = filteredFarms.map((farm) => {
      if (farm.id === id) {
        return {
          ...farm,
          name: document.getElementById(`name-${farm.id}`).value,
          location: document.getElementById(`location-${farm.id}`).value,
          profit: document.getElementById(`profit-${farm.id}`).value,
          loss: document.getElementById(`loss-${farm.id}`).value,
          farmPeak: document.getElementById(`farmPeak-${farm.id}`).value,
          totalLabors: document.getElementById(`totalLabors-${farm.id}`).value,
          rentPerDay: document.getElementById(`rentPerDay-${farm.id}`).value,
          peakDuration: document.getElementById(`peakDuration-${farm.id}`)
            .value,
          editable: false,
        };
      }
      return farm;
    });

    setFilteredFarms(updatedFarms);
  };

  // Delete a farm entry
  const handleDelete = (id) => {
    const updatedFarms = filteredFarms.filter((farm) => farm.id !== id);
    setFilteredFarms(updatedFarms);
  };

  return (
    <>
      <div className="container-fluid py-2 bg-success ">
        {/* Navbar */}
        <nav className="container d-flex align-items-center ">
          {/* Left: Back Button */}
          <BackButton className="backbtn" />

          {/* Center: Farming in {city} */}
          <span className="fs-6 text-white fw-bold text-center ms-3">
            {language === "en" ? <>Farming in : {city}</> : <>शेती : {city}</>}
          </span>

          {/* Right: Add Farm Button */}
          {/* <Link
            to="/Form"
            className="btn btn-danger btn-sm fw-bold px-1 py-0 rounded"
          >
            {language === "en" ? "Add Farm" : "शेती जोडा"}
          </Link> */}
        </nav>

        {/* Search Bar */}
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
      </div>
      <div className="d-flex justify-content-end">
        <Link
          to="/Form"
          className="btn btn-success btn-sm fw-bold m-3 p-1 rounded"
        >
          <i className="bi bi-plus-lg text-white "></i>
          {language === "en" ? "Add Farm" : "शेती जोडा"}
        </Link>
      </div>

      {/* Cards Display */}
      <div className="row g-4">
        {filteredFarms.length > 0 ? (
          filteredFarms.map((farm) => (
            <div key={farm.id} className="col-md-4">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {farm.editable ? (
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={farm.name}
                        id={`name-${farm.id}`}
                      />
                    ) : (
                      farm.name
                    )}
                  </h5>
                  <p>
                    <strong>
                      {language === "en" ? "Location:" : "स्थान:"}
                    </strong>{" "}
                    {farm.location}
                  </p>
                  <p>
                    <strong>{language === "en" ? "Profit:" : "नफा:"}</strong> ₹
                    {farm.profit}
                  </p>
                  <p>
                    <strong>{language === "en" ? "Loss:" : "तोटा:"}</strong> ₹
                    {farm.loss}
                  </p>
                  <p>
                    <strong>
                      {language === "en" ? "Farm Peak:" : "शेती शिखर:"}
                    </strong>{" "}
                    {farm.farmPeak}
                  </p>
                  <p>
                    <strong>
                      {language === "en" ? "Total Labors:" : "एकूण मजुरी:"}
                    </strong>{" "}
                    {farm.totalLabors}
                  </p>
                  <p>
                    <strong>
                      {language === "en" ? "Rent Per Day:" : "दैनंदिन भाडे:"}
                    </strong>{" "}
                    ₹{farm.rentPerDay}
                  </p>
                  <p>
                    <strong>
                      {language === "en" ? "Peak Duration:" : "शिखर कालावधी:"}
                    </strong>{" "}
                    {farm.peakDuration} {language === "en" ? "Days" : "दिवस"}
                  </p>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center mt-3">
                    {farm.editable ? (
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSave(farm.id)}
                      >
                        <FaSave /> {language === "en" ? "Save" : "सुरक्षित करा"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEdit(farm.id)}
                      >
                        <FaEdit /> {language === "en" ? "Edit" : "संपादन करा"}
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(farm.id)}
                    >
                      <FaTrash /> {language === "en" ? "Delete" : "मिटवा"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">
            {language === "en"
              ? `No farms found for ${city}.`
              : `${city} साठी कोणतीही शेती सापडली नाही.`}
          </p>
        )}
      </div>
    </>
  );
}

export default Sheti;
