import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Auth from "./Auth";

const ProtectedRoutes = () => {
  const { isAuthenticated } = Auth.isAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;