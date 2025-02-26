import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { first_name, email, password, confirm_password } = signupInfo;

    if (!first_name || !email || !password || !confirm_password) {
      return toast.info("All required fields must be filled.");
    }
    if (password !== confirm_password) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true); // Set loading to true during signup
    try {
      const url = "https://agri-management-main-ywm4.vercel.app/users/register/";
      const response = await axios.post(url, signupInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.access) {
        toast.success("Registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white text-center">
              <h1 className="h4 mb-0">Sign Up</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={signupInfo.first_name}
                    className="form-control"
                    placeholder="Enter your first name..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={signupInfo.last_name}
                    className="form-control"
                    placeholder="Enter your last name..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    value={signupInfo.phone}
                    className="form-control"
                    placeholder="Enter your phone number..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    value={signupInfo.email}
                    className="form-control"
                    placeholder="Enter your email..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    value={signupInfo.password}
                    className="form-control"
                    placeholder="Enter your password..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    value={signupInfo.confirm_password}
                    className="form-control"
                    placeholder="Confirm your password..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

                <div className="text-center mt-3">
                  <span>
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
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

export default SignUp;