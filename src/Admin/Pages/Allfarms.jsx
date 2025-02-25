// import React, { useEffect, useState } from "react";
// import BackButton from "../../Components/BackButton";

// function Allfarms() {
//   const [farms, setFarms] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFarms = async () => {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage

//       if (!token) {
//         setError("Unauthorized: No token found");
//         return;
//       }

//       try {
//         const response = await fetch(
//           "https://agri-management-main.vercel.app/users/farms/?action=getFarm",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setFarms(data); // Assuming the API response is an array of farms
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchFarms();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <div className="bg-success text-white py-2 rounded d-flex align-items-center justify-content-between px-3">
//         {/* Back Button on the Left */}
//         <BackButton className="backbtn fs-4" />

//         {/* Title in the Center */}
//         <h2 className="text-white m-0 flex-grow-1 text-center">All Farms</h2>
//       </div>

//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <ul>
//           {farms.map((farm) => (
//             <li key={farm.id}>
//               <strong>{farm.name}</strong> - {farm.location}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Allfarms;
// import React, { useState, useEffect } from "react";
// import BackButton from "../../Components/BackButton";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Allfarms() {
//   const [farms, setFarms] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedFarm, setSelectedFarm] = useState(null);
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     address: "",
//     location_url: "",
//     city: "",
//     farm_size: "",
//   });

//   useEffect(() => {
//     fetchFarms();
//   }, []);

//   const fetchFarms = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("Unauthorized: No token found");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/?action=getFarm",
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

//       const result = await response.json();
//       setFarms(Array.isArray(result.data) ? result.data : []);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Open form in modal with selected farm data
//   const handleViewFarm = (farm) => {
//     setSelectedFarm(farm);
//     setFormData({ ...farm });
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle farm update (PATCH request)
//   const handleEditFarm = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch("https://agri-management-main.vercel.app/users/farms/", {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           action: "patchFarm",
//           ...formData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update farm: ${response.status}`);
//       }

//       alert("Farm updated successfully!");
//       setSelectedFarm(null);
//       fetchFarms();
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   // Handle delete farm
//   const handleDeleteFarm = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Are you sure you want to delete this farm?")) return;

//     try {
//       const response = await fetch("https://agri-management-main.vercel.app/users/farms/", {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ action: "delFarm", id }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete farm: ${response.status}`);
//       }

//       alert("Farm deleted successfully!");
//       setFarms(farms.filter((farm) => farm.id !== id));
//       if (selectedFarm && selectedFarm.id === id) {
//         setSelectedFarm(null);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="bg-success text-white py-2 rounded d-flex align-items-center justify-content-between px-3">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="text-white m-0 flex-grow-1 text-center">All Farms</h2>
//       </div>

//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : farms.length > 0 ? (
//         <div className="mt-3">
//           <ul className="list-group">
//             {farms.map((farm) => (
//               <li key={farm.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <strong>{farm.name}</strong> <br />
//                   📍 {farm.address} <br />
//                   🌍 <a href={farm.location_url} target="_blank" rel="noopener noreferrer">View on Map</a> <br />
//                   🌾 Farm Size: {farm.farm_size} acres
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-primary btn-sm" onClick={() => handleViewFarm(farm)}>👁️ View</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="mt-3 text-muted">No farms available.</p>
//       )}

//       {/* Popup Form (Mobile-Responsive Modal) */}
//       {selectedFarm && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
//           <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Edit Farm</h4>
//                 <button type="button" className="btn-close" onClick={() => setSelectedFarm(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="mb-2">
//                     <label>Farm Name:</label>
//                     <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
//                   </div>

//                   <div className="mb-2">
//                     <label>Address:</label>
//                     <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
//                   </div>

//                   <div className="mb-2">
//                     <label>Location URL:</label>
//                     <input type="text" className="form-control" name="location_url" value={formData.location_url} onChange={handleChange} />
//                   </div>

//                   <div className="mb-2">
//                     <label>City ID:</label>
//                     <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
//                   </div>

//                   <div className="mb-2">
//                     <label>Farm Size:</label>
//                     <input type="text" className="form-control" name="farm_size" value={formData.farm_size} onChange={handleChange} />
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-success btn-sm" onClick={handleEditFarm}>✅ Submit</button>
//                 <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteFarm(formData.id)}>🗑️ Delete</button>
//                 <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSelectedFarm(null)}>❌ Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Allfarms;

import React, { useState, useEffect } from "react";
import BackButton from "../../Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function Allfarms() {
  const [farms, setFarms] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    farm_name: "",
    address: "",
    location_url: "",
    city: "",
    farm_size: "",
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      const response = await fetch(
        "https://agri-management-main.vercel.app/users/farms/?action=getFarm",
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

      const result = await response.json();
      setFarms(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  // Open form in modal with selected farm data
  const handleViewFarm = (farm) => {
    setSelectedFarm(farm);
    setFormData({
      id: farm.id || "",
      farm_name: farm.farm_name || farm.name || "", 
      address: farm.address || "",
      location_url: farm.location_url || "",
      city: farm.city || "",
      farm_size: farm.farm_size || "",
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle farm update (PATCH request)
  const handleEditFarm = async () => {
    const token = localStorage.getItem("token");

    console.log("Before PATCH Request, formData:", formData);

    try {
      const response = await fetch(
        "https://agri-management-main.vercel.app/users/farms/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "patchFarm",
            id: formData.id,
            farm_name: formData.farm_name, 
            address: formData.address,
            location_url: formData.location_url,
            city: formData.city,
            farm_size: formData.farm_size,
          }),
        }
      );

      const result = await response.json();
      console.log("PATCH Response:", result);

      if (!response.ok) {
        throw new Error(`Failed to update farm: ${response.status}`);
      }

      await fetchFarms();

      toast.success("Farm updated successfully!");
      setSelectedFarm(null);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this farm?")) return;

    try {
      const response = await fetch(
        "https://agri-management-main.vercel.app/users/farms/",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "delFarm", id }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete farm: ${response.status}`);
      }

      toast.success("Farm deleted successfully!");
      setFarms(farms.filter((farm) => farm.id !== id));
      if (selectedFarm && selectedFarm.id === id) {
        setSelectedFarm(null);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="bg-success text-white py-2 rounded d-flex align-items-center justify-content-between px-3">
        <BackButton className="backbtn fs-4" />
        <h2 className="text-white m-0 flex-grow-1 text-center">All Farms</h2>
      </div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : farms.length > 0 ? (
        <div className="mt-3">
          <ul className="list-group">
            {farms.map((farm) => (
              <li
                key={farm.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{farm.farm_name || farm.name}</strong> <br />
                  📍 {farm.address} <br />
                  🌍{" "}
                  <a
                    href={farm.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>{" "}
                  <br />
                  🌾 Farm Size: {farm.farm_size} acres
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleViewFarm(farm)}
                  >
                    👁️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 text-muted">No farms available.</p>
      )}

      {/* Popup Form (Mobile-Responsive Modal) */}
      {selectedFarm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Farm</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedFarm(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    {/* Farm Name */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_name"
                          value={formData.farm_name}
                          onChange={handleChange}
                          placeholder="Farm Name"
                        />
                        <label>🌾 Farm Name</label>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        <label>📍 Address</label>
                      </div>
                    </div>

                    {/* Location URL */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="location_url"
                          value={formData.location_url}
                          onChange={handleChange}
                          placeholder="Location URL"
                        />
                        <label>🌍 Location URL</label>
                      </div>
                    </div>

                    {/* City ID */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City ID"
                        />
                        <label>🏙️ City ID</label>
                      </div>
                    </div>

                    {/* Farm Size */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_size"
                          value={formData.farm_size}
                          onChange={handleChange}
                          placeholder="Farm Size"
                        />
                        <label>📏 Farm Size (acres)</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={handleEditFarm}
                >
                  ✅ Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteFarm(formData.id)}
                >
                  🗑️ Delete
                </button>
                {/* <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedFarm(null)}
                >
                  ❌ Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Allfarms;
