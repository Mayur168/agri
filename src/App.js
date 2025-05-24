import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Admin/Auth/Signup';
import Login from './Admin/Auth/Login';
import AdminApp from './Admin/AdminApp';
import ManagerApp from './Manager/ManagerApp';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MainApp() {
  const { authenticated, user } = useContext(AuthContext);

  console.log('MainApp - Authenticated:', authenticated, 'User:', user); // Debug

  const getDefaultRedirect = () => {
    if (!authenticated) return '/login';
    if (user?.role === 'admin') return '/Admin';
    if (user?.role === 'manager') return '/Manager';
    return '/login'; // Default route
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/Admin/*"
        element={
          authenticated && user?.role === 'admin' ? (
            <AdminApp />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/*"
        element={
          authenticated && user?.role === 'manager' ? (
            <ManagerApp />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Default Route */}
      <Route path="/login" element={<div></div>} />
      <Route path="*" element={<Navigate to={getDefaultRedirect()} />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
