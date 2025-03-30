import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/img/logo.png";
import { AuthContext } from "../../contexts/AuthContext";


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, user, logout } = useContext(AuthContext);

  console.log("NavBar - authenticated:", authenticated, "user:", user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    closeMenu();
  };

  const getFullName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return "Profile";
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
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto" style={{ textAlign: "-webkit-center" }}>
            {authenticated ? (
              <>
                <NavLink className="nav-link" to="/Manager" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/Manager/daily-expenses" onClick={closeMenu}>
                  ExpenseForm
                </NavLink>
                <NavLink className="nav-link" to="/Manager/spray-fertilizer" onClick={closeMenu}>
                  SprayFertilizerform
                </NavLink>
                {user && (
                  <NavLink className="nav-link" to="/Manager/profile" onClick={closeMenu}>
                   profile
                  </NavLink>
                )}
                <button
                  className="nav-link btn btn-link"
                  style={{ textAlign: "-webkit-center" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;