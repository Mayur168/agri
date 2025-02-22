import React, { useEffect, useState } from "react";
import BackButton from "../../Components/BackButton";

function Allfarms() {
  const [farms, setFarms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarms = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }

      try {
        const response = await fetch(
          "https://agri-management-main-ywm4.vercel.app/users/role/?role=farm&action=getFarm",
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
        setFarms(data); // Assuming the API response is an array of farms
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFarms();
  }, []);

  return (
    <div className="container mt-4">
      <div className="bg-success text-white py-2 rounded d-flex align-items-center justify-content-between px-3">
        {/* Back Button on the Left */}
        <BackButton className="backbtn fs-4" />

        {/* Title in the Center */}
        <h2 className="text-white m-0 flex-grow-1 text-center">All Farms</h2>
      </div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {farms.map((farm) => (
            <li key={farm.id}>
              <strong>{farm.name}</strong> - {farm.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Allfarms;
