// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
// import { FaUser, FaPhone, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa"; // Icons for visual appeal

// function SignUp() {
//   const [signupInfo, setSignupInfo] = useState({
//     first_name: "",
//     last_name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { first_name, email, password, confirm_password } = signupInfo;

//     if (!first_name || !email || !password || !confirm_password) {
//       return toast.info("All required fields must be filled.");
//     }
//     if (password !== confirm_password) {
//       return toast.error("Passwords do not match.");
//     }

//     setLoading(true);
//     try {
//       const url = "https://agri-management.vercel.app/users/register/";
//       const response = await axios.post(url, signupInfo, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.access) {
//         toast.success("Registered successfully!");
//         setTimeout(() => {
//           navigate("/login");
//         }, 500);
//       } else {
//         toast.error("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-3">
//       <div className="row justify-content-center w-100">
//         <div className="col-11 col-sm-8 col-md-6 col-lg-4">
//           <div
//             className="card shadow-lg border-0"
//             style={{ borderRadius: "15px", overflow: "hidden" }}
//           >
//             <div className="card-header bg-success text-white text-center py-3 py-md-4">
//               <h1 className="h4 mb-0 fw-bold">Sign Up</h1>
//             </div>
//             <div className="card-body p-3 p-md-4">
//               <form onSubmit={handleSignup}>
//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="first_name"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     First Name <span className="text-danger">*</span>
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaUser className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="text"
//                       name="first_name"
//                       id="first_name"
//                       value={signupInfo.first_name}
//                       className="form-control py-2"
//                       placeholder="Enter your first name"
//                       required
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="last_name"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     Last Name
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaUser className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="text"
//                       name="last_name"
//                       id="last_name"
//                       value={signupInfo.last_name}
//                       className="form-control py-2"
//                       placeholder="Enter your last name"
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="phone"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     Phone
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaPhone className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="text"
//                       name="phone"
//                       id="phone"
//                       value={signupInfo.phone}
//                       className="form-control py-2"
//                       placeholder="Enter your phone number"
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="email"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     Email <span className="text-danger">*</span>
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaEnvelope className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="email"
//                       name="email"
//                       id="email"
//                       value={signupInfo.email}
//                       className="form-control py-2"
//                       placeholder="Enter your email"
//                       required
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="password"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     Password <span className="text-danger">*</span>
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaLock className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="password"
//                       name="password"
//                       id="password"
//                       value={signupInfo.password}
//                       className="form-control py-2"
//                       placeholder="Enter your password"
//                       required
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3 mb-md-4">
//                   <label
//                     htmlFor="confirm_password"
//                     className="form-label fw-medium text-muted small"
//                   >
//                     Confirm Password <span className="text-danger">*</span>
//                   </label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-0">
//                       <FaLock className="text-success" />
//                     </span>
//                     <input
//                       onChange={handleChange}
//                       type="password"
//                       name="confirm_password"
//                       id="confirm_password"
//                       value={signupInfo.confirm_password}
//                       className="form-control py-2"
//                       placeholder="Confirm your password"
//                       required
//                       style={{ borderRadius: "0 5px 5px 0" }}
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-success w-100 py-2 fw-bold"
//                   disabled={loading}
//                   style={{
//                     transition: "background-color 0.3s ease",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <FaSpinner className="me-2 spin" /> Signing up...
//                     </>
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </button>

//                 <div className="text-center mt-2 mt-md-4">
//                   <span className="text-muted small">
//                     Already have an account?{" "}
//                     <Link
//                       to="/login"
//                       className="text-success fw-bold text-decoration-none"
//                     >
//                       Login
//                     </Link>
//                   </span>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Inline CSS for additional styling and responsiveness */}
//       <style jsx>{`
//         .card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
//         }
//         .btn-success:hover {
//           background-color: #146c43;
//         }
//         .input-group-text {
//           border-radius: 5px 0 0 5px;
//         }
//         .spin {
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         /* Mobile-specific adjustments */
//         @media (max-width: 576px) {
//           .container-fluid {
//             padding: 15px;
//           }
//           .col-11 {
//             width: 95%;
//           }
//           .card-header {
//             padding: 15px;
//           }
//           .card-header h1 {
//             font-size: 1.25rem;
//           }
//           .card-body {
//             padding: 20px;
//           }
//           .form-label {
//             font-size: 0.85rem;
//           }
//           .form-control {
//             font-size: 0.9rem;
//             padding: 8px;
//           }
//           .btn {
//             font-size: 0.9rem;
//             padding: 8px;
//           }
//           .text-muted {
//             font-size: 0.8rem;
//           }
//         }
//         @media (min-width: 577px) and (max-width: 768px) {
//           .card-header h1 {
//             font-size: 1.5rem;
//           }
//           .form-label {
//             font-size: 0.9rem;
//           }
//           .form-control {
//             font-size: 1rem;
//           }
//           .btn {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default SignUp;

// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import axios from "axios";
// // function SignUp() {
// //   const [signupInfo, setSignupInfo] = useState({
// //     first_name: "",
// //     last_name: "",
// //     phone: "",
// //     email: "",
// //     password: "",
// //     confirm_password: "",
// //     role: "User", // Default role
// //     farm_name: "",
// //     farm_location: "",
// //     manager_experience: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setSignupInfo((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     const { first_name, email, password, confirm_password, role, farm_name, farm_location } = signupInfo;

// //     // Validate required fields
// //     if (!first_name || !email || !password || !confirm_password) {
// //       return toast.info("All required fields must be filled.");
// //     }
// //     if (password !== confirm_password) {
// //       return toast.error("Passwords do not match.");
// //     }
// //     if (role === "Manager" && (!farm_name || !farm_location)) {
// //       return toast.info("Farm name and location are required for managers.");
// //     }

// //     setLoading(true);
// //     try {
// //       // First API call: Register the user
// //       const registerUrl = "https://agri-management.vercel.app/users/register/";
// //       const registerResponse = await axios.post(
// //         registerUrl,
// //         {
// //           first_name: signupInfo.first_name,
// //           last_name: signupInfo.last_name,
// //           phone: signupInfo.phone,
// //           email: signupInfo.email,
// //           password: signupInfo.password,
// //           role: signupInfo.role,
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (registerResponse.data.access) {
// //         toast.success("Registered successfully!");

// //         // If role is Manager, make second API call to add manager details
// //         if (signupInfo.role === "Manager") {
// //           try {
// //             const token = registerResponse.data.access;
// //             const managerPayload = {
// //               action: "postManager",
// //               first_name: signupInfo.first_name,
// //               last_name: signupInfo.last_name,
// //               email: signupInfo.email,
// //               phone: signupInfo.phone,
// //               role: signupInfo.role,
// //               farm_name: signupInfo.farm_name,
// //               farm_location: signupInfo.farm_location,
// //               manager_experience: signupInfo.manager_experience || 0,
// //             };
// //             await axios.post(
// //               "https://agri-management.vercel.app/master_data/",
// //               managerPayload,
// //               {
// //                 headers: {
// //                   Authorization: `Bearer ${token}`,
// //                   "Content-Type": "application/json",
// //                 },
// //               }
// //             );
// //             toast.success("Manager details added successfully!");
// //           } catch (err) {
// //             console.error("Error adding manager details:", err);
// //             toast.error("Failed to add manager details.");
// //           }
// //         }

// //         // Redirect to login after a short delay
// //         setTimeout(() => {
// //           navigate("/login");
// //         }, 500);
// //       } else {
// //         toast.error("Registration failed. Please try again.");
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "An unexpected error occurred.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container my-5">
// //       <div className="row justify-content-center">
// //         <div className="col-md-6 col-lg-4">
// //           <div className="card shadow-sm">
// //             <div className="card-header bg-success text-white text-center">
// //               <h1 className="h4 mb-0">Sign Up</h1>
// //             </div>
// //             <div className="card-body">
// //               <form onSubmit={handleSignup}>
// //                 <div className="mb-3">
// //                   <label htmlFor="first_name" className="form-label">
// //                     First Name <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="text"
// //                     name="first_name"
// //                     id="first_name"
// //                     value={signupInfo.first_name}
// //                     className="form-control"
// //                     placeholder="Enter your first name..."
// //                     required
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="last_name" className="form-label">
// //                     Last Name
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="text"
// //                     name="last_name"
// //                     id="last_name"
// //                     value={signupInfo.last_name}
// //                     className="form-control"
// //                     placeholder="Enter your last name..."
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="phone" className="form-label">
// //                     Phone
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="text"
// //                     name="phone"
// //                     id="phone"
// //                     value={signupInfo.phone}
// //                     className="form-control"
// //                     placeholder="Enter your phone number..."
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="email" className="form-label">
// //                     Email <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="email"
// //                     name="email"
// //                     id="email"
// //                     value={signupInfo.email}
// //                     className="form-control"
// //                     placeholder="Enter your email..."
// //                     required
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="password" className="form-label">
// //                     Password <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="password"
// //                     name="password"
// //                     id="password"
// //                     value={signupInfo.password}
// //                     className="form-control"
// //                     placeholder="Enter your password..."
// //                     required
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="confirm_password" className="form-label">
// //                     Confirm Password <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     onChange={handleChange}
// //                     type="password"
// //                     name="confirm_password"
// //                     id="confirm_password"
// //                     value={signupInfo.confirm_password}
// //                     className="form-control"
// //                     placeholder="Confirm your password..."
// //                     required
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="role" className="form-label">
// //                     Role <span className="text-danger">*</span>
// //                   </label>
// //                   <select
// //                     onChange={handleChange}
// //                     name="role"
// //                     id="role"
// //                     value={signupInfo.role}
// //                     className="form-control"
// //                     required
// //                   >
// //                     <option value="User">User</option>
// //                     <option value="Manager">Manager</option>
// //                   </select>
// //                 </div>

// //                 {signupInfo.role === "Manager" && (
// //                   <>
// //                     <div className="mb-3">
// //                       <label htmlFor="farm_name" className="form-label">
// //                         Farm Name <span className="text-danger">*</span>
// //                       </label>
// //                       <input
// //                         onChange={handleChange}
// //                         type="text"
// //                         name="farm_name"
// //                         id="farm_name"
// //                         value={signupInfo.farm_name}
// //                         className="form-control"
// //                         placeholder="Enter farm name..."
// //                         required
// //                       />
// //                     </div>
// //                     <div className="mb-3">
// //                       <label htmlFor="farm_location" className="form-label">
// //                         Farm Location <span className="text-danger">*</span>
// //                       </label>
// //                       <input
// //                         onChange={handleChange}
// //                         type="text"
// //                         name="farm_location"
// //                         id="farm_location"
// //                         value={signupInfo.farm_location}
// //                         className="form-control"
// //                         placeholder="Enter farm location..."
// //                         required
// //                       />
// //                     </div>
// //                     <div className="mb-3">
// //                       <label htmlFor="manager_experience" className="form-label">
// //                         Manager Experience (years)
// //                       </label>
// //                       <input
// //                         onChange={handleChange}
// //                         type="number"
// //                         name="manager_experience"
// //                         id="manager_experience"
// //                         value={signupInfo.manager_experience}
// //                         className="form-control"
// //                         placeholder="Enter years of experience..."
// //                       />
// //                     </div>
// //                   </>
// //                 )}

// //                 <button
// //                   type="submit"
// //                   className="btn btn-success w-100"
// //                   disabled={loading}
// //                 >
// //                   {loading ? "Signing up..." : "Sign Up"}
// //                 </button>

// //                 <div className="text-center mt-3">
// //                   <span>
// //                     Already have an account?{" "}
// //                     <Link to="/login" className="text-primary">
// //                       Login
// //                     </Link>
// //                   </span>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <ToastContainer position="top-right" autoClose={3000} />
// //     </div>
// //   );
// // }

// // export default SignUp;