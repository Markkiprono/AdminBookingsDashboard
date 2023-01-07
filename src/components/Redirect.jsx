import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { GlobalState } from "../context/GlobalState";
const Redirect = () => {
  const location = useLocation();
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default Redirect;
