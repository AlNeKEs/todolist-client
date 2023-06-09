import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Spin } from "antd";
import Login from "../page/login";

import { Navigate } from "react-router-dom";

const Auth = () => {
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
  return (
    <>{isAuthenticated ? <Navigate to="/" /> : <Login/>} </>
  );
};

export default Auth;
