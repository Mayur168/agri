
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useCallback } from "react";

function Sheti() {
  const navigate = useNavigate();
  const { city } = useParams(); // Get selected city from URL params

  const DemoFarms = useMemo(
    () => [
      {
        id: 1,
        city: "Nashik",
        name: "Wheat Farm",
        location: "Texas",
        profit: 50000,
        loss: 10000,
        farmPeak: "2025-03-15",
        totalLabors: 20,
        rentPerDay: 500,
        peakDuration: 30,
        editable: false,
      },
      {
        id: 2,
        name: "Rice Farm",
        location: "California",
        profit: 80000,
        loss: 5000,
        farmPeak: "2025-04-10",
        totalLabors: 15,
        rentPerDay: 700,
        peakDuration: 25,
        editable: false,
      },
      {
        id: 3,
        name: "Corn Farm",
        location: "Iowa",
        profit: 60000,
        loss: 8000,
        farmPeak: "2025-02-28",
        totalLabors: 18,
        rentPerDay: 600,
        peakDuration: 20,
        editable: false,
      },
    ],
    []
  );

  const [farms, setFarms] = useState([]); // Stores all fetched farms
  const [filteredFarms, setFilteredFarms] = useState([]); // Stores city-specific farms
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch farms from API
  const fetchFarmsData = useCallback(async () => {
    try {
      const response = await fetch("https://api.example.com/farms");
      const data = await response.json();

      if (data.length > 0) {
        setFarms(data);
        filterFarms(data, city);
      } else {
        console.warn("API returned empty data, using demo data.");
        setFarms(DemoFarms);
        filterFarms(DemoFarms, city);
      }
    } catch (error) {
      console.error("Error fetching farms:", error);
      setFarms(DemoFarms);
      filterFarms(DemoFarms, city);
    }
  }, [city, DemoFarms]); // 🔹 

  // Filter farms based on selected city
  const filterFarms = (farmData, selectedCity) => {
    if (!selectedCity) return setFilteredFarms(farmData); //

    const filtered = farmData.filter(
      (farm) =>
        (farm.location || "").toLowerCase() === selectedCity.toLowerCase()
    );

    setFilteredFarms(filtered);
  };

  // Fetch data on component mount and when city changes
  useEffect(() => {
    fetchFarmsData();
  }, [fetchFarmsData]); // Runs when city changes

  // Handle Search Filter
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

  // Handle Edit Mode
  const handleEdit = (id) => {
    setFilteredFarms((prevFarms) =>
      prevFarms.map((farm) =>
        farm.id === id ? { ...farm, editable: true } : farm
      )
    );
  };

  // Handle Save
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

  // Handle Delete
  const handleDelete = (id) => {
    const updatedFarms = filteredFarms.filter((farm) => farm.id !== id);
    setFilteredFarms(updatedFarms);
  };

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-dark navbar-custom">
        <div className="container-fluid d-flex flex-column align-items-center">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <button className="back-to-home-btn" onClick={() => navigate("/")}>
              ⬅ Back
            </button>

            <span className="navbar-title">🌾 Farming in {city}</span>
            <div></div>
          </div>

          {/* Search Bar */}
          <div className="search-container mt-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search Farms"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </nav>

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
                    <strong>Location:</strong> {farm.location}
                  </p>
                  <p>
                    <strong>Profit:</strong> ₹{farm.profit}
                  </p>
                  <p>
                    <strong>Loss:</strong> ₹{farm.loss}
                  </p>
                  <p>
                    <strong>Farm Peak:</strong> {farm.farmPeak}
                  </p>
                  <p>
                    <strong>Total Labors:</strong> {farm.totalLabors}
                  </p>
                  <p>
                    <strong>Rent Per Day:</strong> ₹{farm.rentPerDay}
                  </p>
                  <p>
                    <strong>Peak Duration:</strong> {farm.peakDuration} Days
                  </p>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center mt-3">
                    {farm.editable ? (
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSave(farm.id)}
                      >
                        <FaSave /> Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEdit(farm.id)}
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(farm.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No farms found for {city}.</p>
        )}
      </div>
    </div>
  );
}

export default Sheti;
