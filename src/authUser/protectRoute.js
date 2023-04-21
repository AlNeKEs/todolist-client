import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Spin } from "antd";
import Home from "../page/home";
import { Navigate } from "react-router-dom";

const ProtectRoute = () => {
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  return <>{isAuthenticated ? <Home /> : <Navigate to="/login" />} </>;
};

export default ProtectRoute;
