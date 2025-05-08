
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
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
    <>
      <style>
        {`
          #expense-dropdown + .dropdown-menu {
            text-align: center;
            left: 50%;
            min-width: 150px;
          }
          #expense-dropdown + .dropdown-menu .dropdown-item {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            color: #212529; /* Default text color */
            transition: background-color 0.2s ease, color 0.2s ease;
          }
          #expense-dropdown + .dropdown-menu .dropdown-item:hover,
          #expense-dropdown + .dropdown-menu .dropdown-item:focus {
            background-color: #f8f9fa; /* Light gray for hover */
            color: #212529;
          }
          #expense-dropdown + .dropdown-menu .dropdown-item.active {
            background-color: #28a745; /* Bootstrap success color for active item */
            color: #fff; /* White text for contrast */
          }
        `}
      </style>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="logo" style={{ height: "40px" }} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarNavAltMarkup"
            onClick={toggleMenu}
          />
          <Navbar.Collapse id="navbarNavAltMarkup" in={menuOpen}>
            <Nav className="ms-auto" style={{ textAlign: "-webkit-center" }}>
              {authenticated ? (
                <>
                  <Nav.Link as={NavLink} to="/admin" onClick={closeMenu}>
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/manager-list"
                    onClick={closeMenu}
                  >
                    Users
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/billing"
                    onClick={closeMenu}
                  >
                    Billing
                  </Nav.Link>
                  <NavDropdown title="Expense" id="expense-dropdown">
                    <NavDropdown.Item
                      as={NavLink}
                      to="/admin/AdminExpense"
                      onClick={closeMenu}
                    >
                      Expenses
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/admin/takenAmount"
                      onClick={closeMenu}
                    >
                      Taken Amount
                    </NavDropdown.Item>
                  </NavDropdown>
                  {user && (
                    <Nav.Link
                      as={NavLink}
                      to="/admin/profile"
                      onClick={closeMenu}
                    >
                      Profile
                    </Nav.Link>
                  )}
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={handleLogout}
                  >
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
    </>
  );
}

export default NavBar;