

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ element, requiredRole }) => {
  const { authenticated, user } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;