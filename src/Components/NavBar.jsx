import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../src/assets/img/logo.png";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </NavLink>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isAuthenticated() ? (
              <>
                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/cities" onClick={closeMenu}>
                  City
                </NavLink>
                {/* <NavLink className="nav-link" to="/form" onClick={closeMenu}>
                  Form
                </NavLink> */}
                <NavLink className="nav-link" to="/sheti" onClick={closeMenu}>
                  Sheti
                </NavLink>
                <button className="nav-link btn btn-link" style={{textAlign: "-webkit-center"}} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signup" onClick={closeMenu}>
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
