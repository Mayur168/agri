
// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(
//     localStorage.getItem("token") !== null
//   );
//   const [user, setUser] = useState(
//     localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
//   );

//   const login = (token, userData) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData)); 
//     setAuthenticated(true);
//     setUser(userData); 
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ authenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};