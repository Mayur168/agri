
import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../Manager/Components/Home";
import ExpenseForm from "../Manager/Components/ExpenseForm";
import SprayFertilizerForm from "../Manager/Components/SprayFertilizerform";
import Profile from "../Admin/Components/Profile"; 
import NavBar from "./Components/managerNavBar"; 
import BillingForm from "./Components/BillingForm";
import PrivateRoute from "../Admin/Auth/PrivateRoute";
import { AuthContext } from "../../src/contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

// Manager Layout with Navbar and role check
const ManagerLayout = ({ children }) => {
  const { authenticated, user } = useContext(AuthContext);
  const location = useLocation();

  console.log("Manager - Authenticated:", authenticated);
  console.log("Manager - User:", user);
  console.log("Manager - Current Path:", location.pathname);

  if (!authenticated || user?.role !== "manager") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-4 pt-5">{children}</div>
    </>
  );
};

// Manager Routes
const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Home />} requiredRole="manager" />} />
      <Route
        path="/daily-expenses"
        element={<PrivateRoute element={<ExpenseForm />} requiredRole="manager" />}
      />
      <Route
        path="/spray-fertilizer"
        element={<PrivateRoute element={<SprayFertilizerForm />} requiredRole="manager" />}
      />
       <Route
        path="/Billing"
        element={<PrivateRoute element={<BillingForm />} requiredRole="manager" />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute element={<Profile />} requiredRole="manager" />}
      /> {/* Added Profile Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function ManagerApp() {
  return (
    <ManagerLayout>
      <ManagerRoutes />
    </ManagerLayout>
  );
}

export default ManagerApp;