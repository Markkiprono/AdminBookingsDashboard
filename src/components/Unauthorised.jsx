import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { GlobalState } from "../context/GlobalState";
const Unauthorised = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userApi.isAdmin;
  const location = useLocation();
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/invalid" state={{ from: location.pathname }} />
  );
};

export default Unauthorised;
