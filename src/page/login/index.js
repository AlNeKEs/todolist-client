import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { AuthContext } from "../../authUser/AuthContext";
import {
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./login.css";

const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [showPWD, setShowPWD] = useState(false);

  const [visible, setVisible] = useState({
    username: false,
    password: false,
  });

  const showPassword = (e) => {
    setShowPWD(!showPWD);
  };

  const onChangeValue = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  //notification
  const openNotification = (title, content, icon) => {
    notification.open({
      message: title,
      description: content,
      icon: icon ? (
        <CheckOutlined style={{ color: "green" }} />
      ) : (
        <SmileOutlined style={{ color: "red" }} />
      ),
    });
  };

  // submit form
  const onSubmit = async (e) => {
    if (!loginForm.username) {
      setVisible({ ...visible, username: true });
    } else {
      setVisible({ ...visible, username: false });
    }
    if (!loginForm.password) {
      setVisible({ ...visible, password: true });
    } else {
      setVisible({ ...visible, password: false });
    }
    if (loginForm.username && loginForm.password) {
      const response = await loginUser(loginForm);
      console.log(response);
      if (response.success === false) {
        openNotification("Failed", response.message, false);
      } else {
        openNotification("Success", response.message, true);
      }
    }
  };
  return (
    <div className="form-background">
      <div className="LoginForm form">
        <h1 className="form-title">Login</h1>
        <div className="input-field">
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeValue}
            required
          />
          <label htmlFor="username">Username</label>
          {(visible.username || loginForm.username === "") && (
            <span className="warning">*please input your username</span>
          )}
        </div>
        <div className="input-field">
          <input
            type={showPWD ? "text" : "password"}
            id="password"
            name="password"
            onChange={onChangeValue}
            required
          />
          <label htmlFor="password">Password</label>
          {(visible.password || loginForm.password === "") && (
            <span className="warning">*please input your Password</span>
          )}
        </div>
        <div className="checkbox-field">
          <input type="checkbox" onChange={showPassword} id="showPWD" />
          <span>Show Password</span>
        </div>
        <button onClick={onSubmit}>Login</button>
        <p className="link">
          Not have account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
