import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Spin } from "antd";
import Login from "../page/login";
import Home from "../page/home";

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
    <>{isAuthenticated ? <Home /> : <Login/>} </>
  );
};

export default Auth;
