

import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../Admin/Pages/Home";
import Sheti from "../Admin/Pages/Sheti";
import Form from "../Admin/Pages/Form";
import Villages from "../Admin/Pages/Villages";
import Allfarms from "../Admin/Pages/Allfarms";
import ManagersList from "../Admin/Pages/ManagerList";
import Profile from "./Components/Profile"; 
import BillingForm from "./Pages/BillingForm";
import AdminExpense from "./Pages/AdminExpense";
import NavBar from "../Admin/Components/NavBar";
import PrivateRoute from "../Admin/Auth/PrivateRoute";
import { AuthContext } from "../../src/contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

// Admin Layout with Navbar and role check
const AdminLayout = ({ children }) => {
  const { authenticated, user } = useContext(AuthContext);
  const location = useLocation();

  console.log("Admin - Authenticated:", authenticated);
  console.log("Admin - User:", user);
  console.log("Admin - Current Path:", location.pathname);

  if (!authenticated || user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-4 pt-5 px-1">{children}</div>
    </>
  );
};

// Admin Routes
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Home />} requiredRole="admin" />} />
      <Route path="/sheti" element={<PrivateRoute element={<Sheti />} requiredRole="admin" />} />
      <Route path="/form" element={<PrivateRoute element={<Form />} requiredRole="admin" />} />
      <Route path="/Villages" element={<PrivateRoute element={<Villages />} requiredRole="admin" />} />
      <Route path="/sheti/:villageId" element={<PrivateRoute element={<Sheti />} requiredRole="admin" />} />
      <Route path="/allfarms" element={<PrivateRoute element={<Allfarms />} requiredRole="admin" />} />
      <Route path="/manager-list" element={<PrivateRoute element={<ManagersList />} requiredRole="admin" />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} requiredRole="admin" />} />
      <Route path="/AdminExpense" element={<PrivateRoute element={<AdminExpense />} requiredRole="admin" />} />
      <Route path="/billing" element={<PrivateRoute element={<BillingForm />} requiredRole="admin" />} /> 
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function AdminApp() {
  return (
    <AdminLayout>
      <AdminRoutes />
    </AdminLayout>
  );
}

export default AdminApp;

