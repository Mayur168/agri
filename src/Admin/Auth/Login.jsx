import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
// import PrimaryButton from "../../Components/PrimaryButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const BASEURL = process.env.REACT_APP_BASEURL

function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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
      const url ="https://agri-management-main-ywm4.vercel.app/users/login/";
      const response = await axios.post(url, loginInfo);
      if (response.data.access) {
        toast.success("Login successful!");

        // Save token to localStorage
        localStorage.setItem("token", response.data.access);
        // localStorage.setItem("refreshToken", response.data.refresh);
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
    <div className="container-login my-5">
      <div className="login-box ">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              onChange={handleChange}
              type="text"
              name="phone"
              value={loginInfo.phone}
              placeholder="Enter your phone number..."
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginInfo.password}
              placeholder="Enter your password..."
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* <PrimaryButton
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </PrimaryButton> */}
          <span>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
