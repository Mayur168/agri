// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../App.css";
// // import PrimaryButton from "../../Components/PrimaryButton";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // const BASEURL = process.env.REACT_APP_BASEURL

// function Login() {
//   const navigate = useNavigate();
//   const [loginInfo, setLoginInfo] = useState({
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   // const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { phone, password } = loginInfo;

//     if (!phone || !password) {
//       return toast.info("Both phone number and password are required.");
//     }

//     setLoading(true);

//     try {
//       const url ="https://agri-management-main-ywm4.vercel.app/users/login/";
//       const response = await axios.post(url, loginInfo);
//       if (response.data.access) {
//         toast.success("Login successful!");

//         // Save token to localStorage
//         localStorage.setItem("token", response.data.access);
//         // localStorage.setItem("refreshToken", response.data.refresh);
//         navigate("/");
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       const errorMessage =
//         err.response?.data?.message || "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-login my-5">
//       <div className="login-box ">
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               onChange={handleChange}
//               type="text"
//               name="phone"
//               value={loginInfo.phone}
//               placeholder="Enter your phone number..."
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               onChange={handleChange}
//               type="password"
//               name="password"
//               value={loginInfo.password}
//               placeholder="Enter your password..."
//             />
//           </div>

//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           {/* <PrimaryButton
//             type="submit"
//             className="submit-button"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </PrimaryButton> */}
//           <span>
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </span>
//         </form>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Login;


// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../App.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext

// function Login() {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // Access login function from AuthContext
//   const [loginInfo, setLoginInfo] = useState({
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { phone, password } = loginInfo;

//     if (!phone || !password) {
//       return toast.info("Both phone number and password are required.");
//     }

//     setLoading(true);

//     try {
//       const url = "https://agri-management-main-ywm4.vercel.app/users/login/";
//       const response = await axios.post(url, loginInfo);
//       if (response.data.access) {
//         toast.success("Login successful!");

//         // Use the login function from AuthContext to set token and update state
//         login(response.data.access);

//         // Navigate to home page
//         navigate("/");
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       const errorMessage =
//         err.response?.data?.message || "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-login my-5">
//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               onChange={handleChange}
//               type="text"
//               name="phone"
//               id="phone"
//               value={loginInfo.phone}
//               placeholder="Enter your phone number..."
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               onChange={handleChange}
//               type="password"
//               name="password"
//               id="password"
//               value={loginInfo.password}
//               placeholder="Enter your password..."
//             />
//           </div>

//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           <span>
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </span>
//         </form>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = loginInfo;

    if (!phone || !password) {
      return toast.info("Both phone number and password are required.");
    }

    setLoading(true);

    try {
      const url = "https://agri-management-main-ywm4.vercel.app/users/login/";
      const response = await axios.post(url, loginInfo);
      if (response.data.access) {
        toast.success("Login successful!");
        login(response.data.access);
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 my-5">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white text-center">
              <h1 className="h4 mb-0">Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    value={loginInfo.phone}
                    className="form-control"
                    placeholder="Enter your phone number..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    value={loginInfo.password}
                    className="form-control"
                    placeholder="Enter your password..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-3">
                  <span>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;