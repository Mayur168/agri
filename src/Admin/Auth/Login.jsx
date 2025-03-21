
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../src/api/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = loginInfo;

    if (!phone || !password) {
      return toast.info("Both phone number and password are required.");
    }

    setLoading(true);

    try {
      const response = await api.post("/users/login/", loginInfo);
      console.log("API Response:", response.data);

      if (response.data.access) {
        // Extract user data and add a 'role' property
        const userData = {
          ...response.data.user,
          role: response.data.user.is_admin
            ? "admin"
            : response.data.user.is_manager
            ? "manager"
            : "user",
        };

        // Log success with the determined role
        toast.success(`Login successful as ${userData.role}!`);
        
        // Store token and user data in AuthContext
        login(response.data.access, userData);

        // Redirect based on user role
        if (userData.role === "admin") {
          navigate("/admin/");
        } else if (userData.role === "manager") {
          navigate("/manager/");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "An unexpected error occurred.");
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