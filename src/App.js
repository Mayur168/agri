
// import React, { useContext } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Admin/Pages/Home";
// import Sheti from "./Admin/Pages/Sheti";
// import Form from "./Admin/Pages/Form";
// import Cities from "./Admin/Pages/Cities";
// import NavBar from "./Components/NavBar";
// import SignUp from "./Admin/Auth/Signup";
// import Login from "./Admin/Auth/Login";
// import PrivateRoute from "./Admin/Auth/PrivateRoute";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import { AuthContext, AuthProvider } from "./contexts/AuthContext";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Allfarms from "./Admin/Pages/Allfarms";

// // Layout component to handle NavBar and redirect
// const Layout = ({ children }) => {
//   const { authenticated } = useContext(AuthContext);
//   return (
//     <>
//       {authenticated && <NavBar />}
//       {children}
//     </>
//   );
// };

// // Wrapper for Routes to handle catch-all redirect
// const AppRoutes = () => {
//   const { authenticated } = useContext(AuthContext);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Protected Routes */}
//       <Route path="/" element={<PrivateRoute element={<Home />} />} />
//       <Route path="/sheti" element={<PrivateRoute element={<Sheti />} />} />
//       <Route path="/form" element={<PrivateRoute element={<Form />} />} />
//       <Route path="/cities" element={<PrivateRoute element={<Cities />} />} />
//       <Route path="/sheti/:city" element={<PrivateRoute element={<Sheti />} />} />
//       <Route path="/allfarms" element={<PrivateRoute element={<Allfarms />} />} />

//       {/* Redirect unknown routes */}
//       <Route path="/*" element={<Navigate to={authenticated ? "/" : "/login"} />} />
//     </Routes>
//   );
// };

// function App() {
//   return (
//     <LanguageProvider>
//       <AuthProvider>
//         <BrowserRouter>
//           <Layout>
//             <AppRoutes />
//           </Layout>
//         </BrowserRouter>
//       </AuthProvider>
//     </LanguageProvider>
//   );
// }

// export default App;


import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Admin/Pages/Home";
import Sheti from "./Admin/Pages/Sheti";
import Form from "./Admin/Pages/Form";
import Cities from "./Admin/Pages/Cities";
import NavBar from "./Components/NavBar";
import SignUp from "./Admin/Auth/Signup";
import Login from "./Admin/Auth/Login";
import PrivateRoute from "./Admin/Auth/PrivateRoute";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import Allfarms from "./Admin/Pages/Allfarms";

// Layout component to handle NavBar and redirect
const Layout = ({ children }) => {
  const { authenticated } = useContext(AuthContext);
  return (
    <>
      {authenticated && <NavBar />}
      <div className="pt-5">{children}</div> {/* Added padding-top */}
    </>
  );
};

// Wrapper for Routes to handle catch-all redirect
const AppRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/sheti" element={<PrivateRoute element={<Sheti />} />} />
      <Route path="/form" element={<PrivateRoute element={<Form />} />} />
      <Route path="/cities" element={<PrivateRoute element={<Cities />} />} />
      <Route path="/sheti/:city" element={<PrivateRoute element={<Sheti />} />} />
      <Route path="/allfarms" element={<PrivateRoute element={<Allfarms />} />} />

      {/* Redirect unknown routes */}
      <Route path="/*" element={<Navigate to={authenticated ? "/" : "/login"} />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;