// import React from "react";
// import { Navigate } from "react-router-dom";

// // Function to check if the user is authenticated
// const isAuthenticated = () => {
//   return localStorage.getItem("token") !== null;
// };

// // Private Route Component
// const PrivateRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust path as needed

const PrivateRoute = ({ element }) => {
  const { authenticated } = useContext(AuthContext);
  return authenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;