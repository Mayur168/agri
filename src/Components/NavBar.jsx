


import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../src/assets/img/logo.png";
import { AuthContext } from "../../src/contexts/AuthContext"; // Import AuthContext

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, logout } = useContext(AuthContext); // Use context

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout(); // Use logout from context
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNavAltMarkup">
          <div className="navbar-nav" style={{textAlign:" -webkit-center"}}>
            {authenticated ? (
              <>
                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/cities" onClick={closeMenu}>
                  City
                </NavLink>
                <NavLink className="nav-link" to="/sheti" onClick={closeMenu}>
                  Sheti
                </NavLink>
                <button
                  className="nav-link btn btn-link"
                  style={{ textAlign: "-webkit-center" }}
                  onClick={handleLogout}
                >
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