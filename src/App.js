import "./App.css";
import React from "react";
import Register from "./page/register/index";
import Auth from "./authUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./authUser/AuthContext";
import ErrorPage from "./page/errorPage";
import ProtectRoute from "./authUser/protectRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectRoute />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
