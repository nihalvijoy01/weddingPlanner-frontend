import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
