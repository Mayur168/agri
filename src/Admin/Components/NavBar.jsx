
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../../src/assets/img/logo.png";
import { AuthContext } from "../../../src/contexts/AuthContext";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, user, logout } = useContext(AuthContext);

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
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" onClick={toggleMenu} />
        <Navbar.Collapse id="navbarNavAltMarkup" in={menuOpen}>
          <Nav className="ms-auto" style={{ textAlign: "-webkit-center" }}>
            {authenticated ? (
              <>
                <Nav.Link as={NavLink} to="/admin" onClick={closeMenu}>
                  Home
                </Nav.Link>
                {/* <Nav.Link as={NavLink} to="/admin/sheti" onClick={closeMenu}>
                  Sheti
                </Nav.Link> */}
                <Nav.Link as={NavLink} to="/admin/manager-list" onClick={closeMenu}>
                  ManagerList
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/billing" onClick={closeMenu}>
                  Billing
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/AdminExpense" onClick={closeMenu}>
                  ExpenseForm
                </Nav.Link>
                {user && (
                  <Nav.Link as={NavLink} to="/admin/profile" onClick={closeMenu}>
                    Profile
                  </Nav.Link>
                )}
                <Button variant="link" className="nav-link" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={closeMenu}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" onClick={closeMenu}>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;