import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../Api/axiosInstance";

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

    // Check for missing fields
    if (!phone && !password) {
      Swal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Both phone number and password are required.",
        confirmButtonColor: "#3085d6",
      });
      return;
    } else if (!phone && password) {
      Swal.fire({
        icon: "info",
        title: "Phone Number Missing",
        text: "Phone number is not filled.",
        confirmButtonColor: "#3085d6",
      });
      return;
    } else if (phone && !password) {
      Swal.fire({
        icon: "info",
        title: "Password Missing",
        text: "Password is not filled.",
        confirmButtonColor: "#3085d6",
      });
      return;
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

        // Show success alert with the determined role
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Login successful as ${userData.role}!`,
          confirmButtonColor: "#28a745",
        });

        // Store the full response in localStorage with key "storedData"
        localStorage.setItem("storedData", JSON.stringify(response.data));
        console.log("Stored in localStorage as storedData:", localStorage.getItem("storedData"));

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
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("Login Error:", err);

      // Handle specific API error responses
      if (err.response) {
        const errorMessage = err.response.data?.message;
        if (err.response.status === 401) {
          // Unauthorized - likely incorrect credentials
          if (errorMessage === "User not found") {
            Swal.fire({
              icon: "error",
              title: "User Not Found",
              text: "No user exists with this phone number.",
              confirmButtonColor: "#d33",
            });
          } else if (errorMessage === "Incorrect password") {
            Swal.fire({
              icon: "error",
              title: "Incorrect Password",
              text: "The password you entered is incorrect.",
              confirmButtonColor: "#d33",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Incorrect Fields",
              text: "The phone number or password is incorrect.",
              confirmButtonColor: "#d33",
            });
          }
        } else if (err.response.status === 400) {
          // Bad request - malformed data or validation error
          Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: errorMessage || "The login request is invalid.",
            confirmButtonColor: "#d33",
          });
        } else {
          // Other server errors
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: errorMessage || "An unexpected error occurred.",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        // Network or other unexpected errors
        Swal.fire({
          icon: "error",
          title: "Connection Error",
          text: "Unable to connect to the server. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
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
    </div>
  );
}

export default Login;