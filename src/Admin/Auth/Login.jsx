

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../Api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FaPhone, FaLock, FaSpinner } from "react-icons/fa"; 

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = loginInfo;

    if (isOffline) {
      toast.warning("You are offline. Please check your internet connection.");
      return;
    }

    if (!phone && !password) {
      toast.info("Both phone number and password are required.");
      return;
    } else if (!phone && password) {
      toast.info("Phone number is not filled.");
      return;
    } else if (phone && !password) {
      toast.info("Password is not filled.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users/login/", loginInfo);
      console.log("API Response:", response.data);

      if (response.data.access) {
        const userData = {
          ...response.data.user,
          role: response.data.user.is_admin
            ? "admin"
            : response.data.user.is_manager
            ? "manager"
            : "user",
        };

        localStorage.setItem("storedData", JSON.stringify(response.data));
        console.log("Stored in localStorage as storedData:", localStorage.getItem("storedData"));

        login(response.data.access, userData);

        toast.success("Logged in successfully!");
        setTimeout(() => {
          if (userData.role === "admin") {
            navigate("/admin/");
          } else if (userData.role === "manager") {
            navigate("/manager/");
          } else {
            navigate("/");
          }
        }, 500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        const errorMessage = err.response.data?.message;
        if (err.response.status === 401) {
          if (errorMessage === "User not found") {
            toast.error("No user exists with this phone number.");
          } else if (errorMessage === "Incorrect password") {
            toast.error("The password you entered is incorrect.");
          } else {
            toast.error("The phone number or password is incorrect.");
          }
        } else if (err.response.status === 400) {
          toast.error(errorMessage || "The login request is invalid.");
        } else {
          toast.error(errorMessage || "An unexpected error occurred.");
        }
      } else {
        toast.error("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle offline/online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-3">
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <div className="card-header bg-success text-white text-center py-3 py-md-4">
              <h1 className="h4 mb-0 fw-bold">Login</h1>
            </div>
            <div className="card-body p-3 p-md-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3 mb-md-4">
                  <label
                    htmlFor="phone"
                    className="form-label fw-medium text-muted small"
                  >
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <FaPhone className="text-success" />
                    </span>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="phone"
                      id="phone"
                      value={loginInfo.phone}
                      className="form-control py-2"
                      placeholder="Enter your phone number"
                      required
                      disabled={isOffline}
                      style={{ borderRadius: "0 5px 5px 0" }}
                    />
                  </div>
                </div>

                <div className="mb-3 mb-md-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-medium text-muted small"
                  >
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <FaLock className="text-success" />
                    </span>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      value={loginInfo.password}
                      className="form-control py-2"
                      placeholder="Enter your password"
                      required
                      disabled={isOffline}
                      style={{ borderRadius: "0 5px 5px 0" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-bold"
                  disabled={loading || isOffline}
                  style={{
                    transition: "background-color 0.3s ease",
                    borderRadius: "8px",
                  }}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="me-2 spin" /> Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {deferredPrompt && (
                  <button
                    type="button"
                    className="btn btn-primary w-100 py-2 mt-2 mt-md-4 fw-bold"
                    onClick={handleInstallClick}
                    style={{
                      transition: "background-color 0.3s ease",
                      borderRadius: "8px",
                    }}
                  >
                    Install App
                  </button>
                )}

                <div className="text-center mt-2 mt-md-4">
                  <span className="text-muted small">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-success fw-bold text-decoration-none"
                    >
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

      {/* Inline CSS for additional styling and responsiveness */}
      <style jsx>{`
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .btn-success:hover {
          background-color: #146c43;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
        .input-group-text {
          border-radius: 5px 0 0 5px;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* Mobile-specific adjustments */
        @media (max-width: 576px) {
          .container-fluid {
            padding: 15px;
          }
          .col-11 {
            width: 95%;
          }
          .card-header {
            padding: 15px;
          }
          .card-header h1 {
            font-size: 1.25rem;
          }
          .card-body {
            padding: 20px;
          }
          .form-label {
            font-size: 0.85rem;
          }
          .form-control {
            font-size: 0.9rem;
            padding: 8px;
          }
          .btn {
            font-size: 0.9rem;
            padding: 8px;
          }
          .text-muted {
            font-size: 0.8rem;
          }
        }
        @media (min-width: 577px) and (max-width: 768px) {
          .card-header h1 {
            font-size: 1.5rem;
          }
          .form-label {
            font-size: 0.9rem;
          }
          .form-control {
            font-size: 1rem;
          }
          .btn {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;