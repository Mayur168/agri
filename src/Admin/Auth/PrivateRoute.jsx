

// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";

// const PrivateRoute = ({ element, requiredRole }) => {
//   const { authenticated, role } = useContext(AuthContext);

//   if (!authenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/" />; // Redirect to home if role doesn't match
//   }

//   return element;
// };

// export default PrivateRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ element, requiredRole }) => {
  const { authenticated, user } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;