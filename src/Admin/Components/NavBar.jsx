// import React, { useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
// import logo from "../../../src/assets/img/logo.png";
// import { AuthContext } from "../../../src/contexts/AuthContext";

// function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { authenticated, user, logout } = useContext(AuthContext);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//     closeMenu();
//   };

//   const getUserRole = () => {
//     if (user?.is_admin) return "Admin";
//     if (user?.is_manager) return "Manager";
//     return "User";
//   };

//   const getFullName = () => {
//     if (user?.first_name && user?.last_name) {
//       return `${user.first_name} ${user.last_name}`;
//     }
//     return "Profile";
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary fixed-top">
//       <div className="container-fluid">
//         <Navbar.Brand as={NavLink} to="/">
//           <img src={logo} alt="logo" style={{ height: "40px" }} />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarNavAltMarkup" onClick={toggleMenu} />
//         <Navbar.Collapse id="navbarNavAltMarkup" in={menuOpen}>
//           <Nav className="ms-auto" style={{ textAlign: "-webkit-center" }}>
//             {authenticated ? (
//               <>
//                 <Nav.Link as={NavLink} to="/Admin" onClick={closeMenu}>
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/Admin/sheti" onClick={closeMenu}>
//                   Sheti
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/Admin/manager-list" onClick={closeMenu}>
//                   ManagerList
//                 </Nav.Link>
//                 {user && (
//                   <NavDropdown title="Profile" id="profileDropdown" align="end">
//                     <div className="d-flex align-items-center mb-2 px-3">
//                       <div
//                         className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
//                         style={{ width: "40px", height: "40px" }}
//                       >
//                         {user.first_name?.charAt(0).toUpperCase() || "P"}
//                       </div>
//                       <div>
//                         <h6 className="mb-0">Profile</h6>
//                         <small className="text-muted">{user.role || getUserRole()}</small>
//                       </div>
//                     </div>
//                     <hr className="dropdown-divider" />
//                     <div className="px-3">
//                       <small className="text-muted d-block mb-1">ID:</small>
//                       <p className="mb-2">{user.id || "N/A"}</p>
//                       <small className="text-muted d-block mb-1">First Name:</small>
//                       <p className="mb-2">{user.first_name || "N/A"}</p>
//                       <small className="text-muted d-block mb-1">Last Name:</small>
//                       <p className="mb-2">{user.last_name || "N/A"}</p>
//                       <small className="text-muted d-block mb-1">Email:</small>
//                       <p className="mb-2">{user.email || "N/A"}</p>
//                       <small className="text-muted d-block mb-1">Phone:</small>
//                       <p className="mb-2">{user.phone || "N/A"}</p>
//                       <small className="text-muted d-block mb-1">Role:</small>
//                       <p className="mb-2">{user.role || getUserRole()}</p>
//                       <small className="text-muted d-block mb-1">Admin Status:</small>
//                       <p className="mb-2">{user.is_admin ? "Yes" : "No"}</p>
//                       <small className="text-muted d-block mb-1">Manager Status:</small>
//                       <p className="mb-0">{user.is_manager ? "Yes" : "No"}</p>
//                     </div>
//                   </NavDropdown>
//                 )}
//                 <Button variant="link" className="nav-link" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={NavLink} to="/login" onClick={closeMenu}>
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/signup" onClick={closeMenu}>
//                   Signup
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </div>
//     </Navbar>
//   );
// }

// export default NavBar;
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