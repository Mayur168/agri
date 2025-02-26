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

// import React, { useState, useEffect } from "react";
// import BackButton from "../../Components/BackButton";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Allfarms() {
//   const [farms, setFarms] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedFarm, setSelectedFarm] = useState(null);
//   const [formData, setFormData] = useState({
//     id: "",
//     farm_name: "",
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
//     setFormData({
//       id: farm.id || "",
//       farm_name: farm.farm_name || farm.name || "",
//       address: farm.address || "",
//       location_url: farm.location_url || "",
//       city: farm.city || "",
//       farm_size: farm.farm_size || "",
//     });
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle farm update (PATCH request)
//   const handleEditFarm = async () => {
//     const token = localStorage.getItem("token");

//     console.log("Before PATCH Request, formData:", formData);

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             action: "patchFarm",
//             id: formData.id,
//             farm_name: formData.farm_name,
//             address: formData.address,
//             location_url: formData.location_url,
//             city: formData.city,
//             farm_size: formData.farm_size,
//           }),
//         }
//       );

//       const result = await response.json();
//       console.log("PATCH Response:", result);

//       if (!response.ok) {
//         throw new Error(`Failed to update farm: ${response.status}`);
//       }

//       await fetchFarms();

//       toast.success("Farm updated successfully!");
//       setSelectedFarm(null);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   // Handle delete farm
//   const handleDeleteFarm = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Are you sure you want to delete this farm?")) return;

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ action: "delFarm", id }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to delete farm: ${response.status}`);
//       }

//       toast.success("Farm deleted successfully!");
//       setFarms(farms.filter((farm) => farm.id !== id));
//       if (selectedFarm && selectedFarm.id === id) {
//         setSelectedFarm(null);
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
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
//               <li
//                 key={farm.id}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   <strong>{farm.farm_name || farm.name}</strong> <br />
//                   📍 {farm.address} <br />
//                   🌍{" "}
//                   <a
//                     href={farm.location_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View on Map
//                   </a>{" "}
//                   <br />
//                   🌾 Farm Size: {farm.farm_size} acres
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => handleViewFarm(farm)}
//                   >
//                     👁️
//                   </button>
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
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content mx-auto">
//               <div className="modal-header">
//                 <h4 className="modal-title">Edit Farm</h4>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setSelectedFarm(null)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row g-3">
//                     {/* Farm Name */}
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_name"
//                           value={formData.farm_name}
//                           onChange={handleChange}
//                           placeholder="Farm Name"
//                         />
//                         <label>🌾 Farm Name</label>
//                       </div>
//                     </div>

//                     {/* Address */}
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           placeholder="Address"
//                         />
//                         <label>📍 Address</label>
//                       </div>
//                     </div>

//                     {/* Location URL */}
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="location_url"
//                           value={formData.location_url}
//                           onChange={handleChange}
//                           placeholder="Location URL"
//                         />
//                         <label>🌍 Location URL</label>
//                       </div>
//                     </div>

//                     {/* City ID */}
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           placeholder="City ID"
//                         />
//                         <label>🏙️ City ID</label>
//                       </div>
//                     </div>

//                     {/* Farm Size */}
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_size"
//                           value={formData.farm_size}
//                           onChange={handleChange}
//                           placeholder="Farm Size"
//                         />
//                         <label>📏 Farm Size (acres)</label>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-success btn-sm"
//                   onClick={handleEditFarm}
//                 >
//                   ✅ Submit
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDeleteFarm(formData.id)}
//                 >
//                   🗑️ Delete
//                 </button>
//                 {/* <button
//                   type="button"
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setSelectedFarm(null)}
//                 >
//                   ❌ Close
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Allfarms;


// import React, { useState, useEffect } from "react";
// import BackButton from "../../Components/BackButton";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../Spinner/Spinner"; // Import the Spinner component

// function Allfarms() {
//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [error, setError] = useState(null);
//   const [selectedFarm, setSelectedFarm] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     farm_name: "",
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

//     setLoading(true); // Set loading to true when fetching starts
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
//     } finally {
//       setLoading(false); // Set loading to false when fetching completes
//     }
//   };

//   const handleViewFarm = (farm) => {
//     setSelectedFarm(farm);
//     setIsEditing(false);
//     setFormData({
//       id: farm.id || "",
//       farm_name: farm.farm_name || farm.name || "",
//       address: farm.address || "",
//       location_url: farm.location_url || "",
//       city: farm.city || "",
//       farm_size: farm.farm_size || "",
//     });
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEditFarm = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             action: "patchFarm",
//             id: formData.id,
//             farm_name: formData.farm_name,
//             address: formData.address,
//             location_url: formData.location_url,
//             city: formData.city,
//             farm_size: formData.farm_size,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to update farm: ${response.status}`);
//       }

//       await fetchFarms();
//       toast.success("Farm updated successfully!");
//       setSelectedFarm(null);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   const handleDeleteFarm = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Are you sure you want to delete this farm?")) return;

//     try {
//       const response = await fetch(
//         "https://agri-management-main.vercel.app/users/farms/",
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ action: "delFarm", id }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to delete farm: ${response.status}`);
//       }

//       toast.success("Farm deleted successfully!");
//       setFarms(farms.filter((farm) => farm.id !== id));
//       setSelectedFarm(null);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="bg-success text-white py-2 rounded d-flex align-items-center justify-content-between px-3">
//         <BackButton className="backbtn fs-4" />
//         <h2 className="text-white m-0 flex-grow-1 text-center">All Farms</h2>
//       </div>

//       {loading ? ( // Display Spinner when loading is true
//         <div className="text-center m-auto">
//           <Spinner />
//         </div>
//       ) : error ? ( // Display error if there's an error
//         <p style={{ color: "red" }}>{error}</p>
//       ) : farms.length > 0 ? ( // Display farms if data is available
//         <div className="mt-3">
//           <ul className="list-group">
//             {farms.map((farm) => (
//               <li
//                 key={farm.id}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   <strong>{farm.farm_name || farm.name}</strong> <br />
//                   📍 {farm.address} <br />
//                   🌍{" "}
//                   <a
//                     href={farm.location_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View on Map
//                   </a>{" "}
//                   <br />
//                   🌾 Farm Size: {farm.farm_size} acres
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => handleViewFarm(farm)}
//                   >
//                     <i className="bi bi-eye me-1"></i> View
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="mt-3 text-muted">No farms available.</p> // Display message if no farms
//       )}

//       {/* Modal for View/Edit */}
//       {selectedFarm && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             role="document"
//           >
//             <div className="modal-content mx-auto">
//               <div className="modal-header bg-success text-white">
//                 <h4 className="modal-title">
//                   {isEditing ? "Edit Farm" : "View Farm"}
//                 </h4>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={() => setSelectedFarm(null)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_name"
//                           value={formData.farm_name}
//                           onChange={handleChange}
//                           placeholder="Farm Name"
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="farm">
//                             🌾
//                           </span>{" "}
//                           Farm Name
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           placeholder="Address"
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="location">
//                             📍
//                           </span>{" "}
//                           Address
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="location_url"
//                           value={formData.location_url}
//                           onChange={handleChange}
//                           placeholder="Location URL"
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="globe">
//                             🌍
//                           </span>{" "}
//                           Location URL
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           placeholder="City"
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="city">
//                             🏙️
//                           </span>{" "}
//                           City
//                         </label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-floating">
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="farm_size"
//                           value={formData.farm_size}
//                           onChange={handleChange}
//                           placeholder="Farm Size"
//                           disabled={!isEditing}
//                         />
//                         <label>
//                           <span role="img" aria-label="size">
//                             📏
//                           </span>{" "}
//                           Farm Size (acres)
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 {!isEditing ? (
//                   <>
//                     <button
//                       type="button"
//                       className="btn btn-primary btn-sm"
//                       onClick={handleEditClick}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary btn-sm"
//                       onClick={() => setSelectedFarm(null)}
//                     >
//                       ❌ Close
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       type="button"
//                       className="btn btn-success btn-sm"
//                       onClick={handleEditFarm}
//                     >
//                       ✅ Save
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDeleteFarm(formData.id)}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Allfarms;

import React, { useState, useEffect } from "react";
import BackButton from "../../Components/BackButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import { useLanguage } from "../../contexts/LanguageContext";

function Allfarms() {
  const { language } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    farm_name: "",
    address: "",
    location_url: "",
    city: "",
    farm_size: "",
  });

  const labels = {
    en: {
      title: "All Farms",
      noFarms: "No farms available.",
      farmName: "Farm Name",
      address: "Address",
      locationUrl: "Location URL",
      city: "City",
      farmSize: "Farm Size (acres)",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      close: "Close",
      searchPlaceholder: "address or farm size...",
      unauthorized: "Unauthorized: No token found",
      updateSuccess: "Farm updated successfully!",
      updateError: "Error updating farm",
      deleteSuccess: "Farm deleted successfully!",
      deleteError: "Error deleting farm",
      deleteConfirm: "Are you sure you want to delete this farm?",
    },
    mr: {
      title: "सर्व शेती",
      noFarms: "कोणतीही शेती उपलब्ध नाही.",
      farmName: "शेताचे नाव",
      address: "पत्ता",
      locationUrl: "स्थान URL",
      city: "शहर",
      farmSize: "शेताचा आकार (एकर)",
      view: "पहा",
      edit: "संपादन करा",
      save: "सुरक्षित करा",
      delete: "मिटवा",
      close: "बंद करा",
      searchPlaceholder: "पत्ता किंवा शेताचा आकार.",
      unauthorized: "अनधिकृत: टोकन सापडले नाही",
      updateSuccess: "शेती यशस्वीरित्या अद्यतनित केली!",
      updateError: "शेती अद्यतनित करताना त्रुटी",
      deleteSuccess: "शेती यशस्वीरित्या हटवली!",
      deleteError: "शेती हटवताना त्रुटी",
      deleteConfirm: "आपण खात्रीने ही शेती हटवू इच्छिता का?",
    },
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(labels[language].unauthorized);
      return;
    }

    setLoading(true);
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
      console.log("Fetched Farms Data:", result);
      const farmData = Array.isArray(result.data) ? result.data : [];
      setFarms(farmData);
      setFilteredFarms(farmData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = farms.filter((farm) => {
      const address = (farm.address || "").toLowerCase();
      const farmSize = (farm.farm_size || "").toString().toLowerCase();
      return address.includes(query) || farmSize.includes(query);
    });

    setFilteredFarms(filtered);
  };

  const handleViewFarm = (farm) => {
    setSelectedFarm(farm);
    setIsEditing(false);
    setFormData({
      id: farm.id || "",
      farm_name: farm.farm_name || farm.name || "",
      address: farm.address || "",
      location_url: farm.location_url || "",
      city: farm.city || "",
      farm_size: farm.farm_size || "",
    });
  };

  const handleEditFarmClick = (farm) => {
    setSelectedFarm(farm);
    setIsEditing(true);
    setFormData({
      id: farm.id || "",
      farm_name: farm.farm_name || farm.name || "",
      address: farm.address || "",
      location_url: farm.location_url || "",
      city: farm.city || "",
      farm_size: farm.farm_size || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditFarm = async () => {
    const token = localStorage.getItem("token");

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

      if (!response.ok) {
        throw new Error(`${labels[language].updateError}: ${response.status}`);
      }

      await fetchFarms();
      toast.success(labels[language].updateSuccess);
      setSelectedFarm(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(`${labels[language].updateError}: ${error.message}`);
    }
  };

  const handleDeleteFarm = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm(labels[language].deleteConfirm)) return;

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
        throw new Error(`${labels[language].deleteError}: ${response.status}`);
      }

      toast.success(labels[language].deleteSuccess);
      setFarms(farms.filter((farm) => farm.id !== id));
      setFilteredFarms(filteredFarms.filter((farm) => farm.id !== id));
      setSelectedFarm(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(`${labels[language].deleteError}: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="bg-success text-white py-2 rounded px-3 d-flex align-items-center justify-content-between flex-column gap-2">
        <div className="d-flex align-items-center justify-content-between w-100">
          <BackButton className="backbtn fs-4" />
          <h2 className="text-white m-0 flex-grow-1 text-center me-3">
            {labels[language].title}
          </h2>
        </div>
        <div className="w-75">
          <input
            type="text"
            className="form-control"
            placeholder={labels[language].searchPlaceholder}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <Spinner />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredFarms.length > 0 ? (
        <div className="mt-3">
          <div className="row g-3">
            {filteredFarms.map((farm) => (
              <div key={farm.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{farm.farm_name || farm.name || "N/A"}</strong>
                    </h5>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">📍</span>
                      <div>
                        <strong>{labels[language].address}:</strong>{" "}
                        <span className="" style={{ maxWidth: "200px" }}>
                          {farm.address || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">🌍</span>
                      <div>
                        <strong>{labels[language].locationUrl}:</strong>{" "}
                        <a
                          href={farm.location_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-truncate d-inline-block"
                          style={{ maxWidth: "200px" }}
                        >
                          {farm.location_url || "N/A"}
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">🌾</span>
                      <div>
                        <strong>{labels[language].farmSize}:</strong>{" "}
                        {farm.farm_size || "N/A"}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleViewFarm(farm)}
                      >
                        <i className="bi bi-eye me-1"></i> {labels[language].view}
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditFarmClick(farm)}
                      >
                        ✏️ {labels[language].edit}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted">{labels[language].noFarms}</p>
      )}

      {/* Modal for View/Edit */}
      {selectedFarm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content mx-auto">
              <div className="modal-header bg-success text-white">
                <h4 className="modal-title">
                  {isEditing ? labels[language].edit : labels[language].view} Farm
                </h4>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedFarm(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_name"
                          value={formData.farm_name}
                          onChange={handleChange}
                          placeholder={labels[language].farmName}
                          disabled={!isEditing}
                        />
                        <label>
                          <span role="img" aria-label="farm">🌾</span> {labels[language].farmName}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder={labels[language].address}
                          disabled={!isEditing}
                        />
                        <label>
                          <span role="img" aria-label="location">📍</span> {labels[language].address}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="location_url"
                          value={formData.location_url}
                          onChange={handleChange}
                          placeholder={labels[language].locationUrl}
                          disabled={!isEditing}
                        />
                        <label>
                          <span role="img" aria-label="globe">🌍</span> {labels[language].locationUrl}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder={labels[language].city}
                          disabled={!isEditing}
                        />
                        <label>
                          <span role="img" aria-label="city">🏙️</span> {labels[language].city}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="farm_size"
                          value={formData.farm_size}
                          onChange={handleChange}
                          placeholder={labels[language].farmSize}
                          disabled={!isEditing}
                        />
                        <label>
                          <span role="img" aria-label="size">📏</span> {labels[language].farmSize}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {!isEditing ? (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedFarm(null)}
                  >
                    ❌ {labels[language].close}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={handleEditFarm}
                    >
                      ✅ {labels[language].save}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteFarm(formData.id)}
                    >
                      🗑️ {labels[language].delete}
                    </button>
                  </>
                )}
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