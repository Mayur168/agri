// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Admin/Pages/Home";
// import Sheti from "./Admin/Pages/Sheti";
// import Form from "./Admin/Pages/Form";
// import Cities from "./Admin/Pages/Cities";
// import NavBar from "./Components/NavBar";
// import SignUp from "./Admin/Auth/Signup";
// import Login from "./Admin/Auth/Login";
// import PrivateRoute from "./Admin/Auth/PrivateRoute"; // Import PrivateRoute

// // Function to check authentication
// const isAuthenticated = () => {
//   return localStorage.getItem("token") !== null;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       {/* Show Navbar only if authenticated */}
//       {isAuthenticated() && <NavBar />}

//       <Routes>
//         {/* Public Routes (Accessible by everyone) */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* Protected Routes (Only accessible if authenticated) */}
//         <Route path="/" element={<PrivateRoute element={<Home />} />} />
//         <Route path="/sheti" element={<PrivateRoute element={<Sheti />} />} />
//         <Route path="/form" element={<PrivateRoute element={<Form />} />} />
//         <Route path="/cities" element={<PrivateRoute element={<Cities />} />} />
//         <Route path="/sheti/:city" element={<PrivateRoute element={<Sheti />} />} />

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Admin/Pages/Home";
import Sheti from "./Admin/Pages/Sheti";
import Form from "./Admin/Pages/Form";
import Cities from "./Admin/Pages/Cities";
import NavBar from "./Components/NavBar";
import SignUp from "./Admin/Auth/Signup";
import Login from "./Admin/Auth/Login";
import PrivateRoute from "./Admin/Auth/PrivateRoute"; // Import PrivateRoute
import { LanguageProvider } from "./contexts/LanguageContext"; // Import LanguageProvider
import "bootstrap-icons/font/bootstrap-icons.css";


// Function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  return (
    <LanguageProvider> {/* Wrap the entire app with LanguageProvider */}
      <BrowserRouter>
        {/* Show Navbar only if authenticated */}
        {isAuthenticated() && <NavBar />}

        <Routes>
          {/* Public Routes (Accessible by everyone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes (Only accessible if authenticated) */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/sheti" element={<PrivateRoute element={<Sheti />} />} />
          <Route path="/form" element={<PrivateRoute element={<Form />} />} />
          <Route path="/cities" element={<PrivateRoute element={<Cities />} />} />
          <Route path="/sheti/:city" element={<PrivateRoute element={<Sheti />} />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider> 
  );
}

export default App;
