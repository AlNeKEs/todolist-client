import React, { useState } from "react";
import { authRegister } from "../../services";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";
import {
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";
// eslint-disable-next-line
import "../login/login.css";
import "./register.css";
const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    fullname: ""
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
    setRegisterForm({
      ...registerForm,
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
    if (!registerForm.username) {
      setVisible({ ...visible, username: true });
    } else {
      setVisible({ ...visible, username: false });
    }
    if (!registerForm.password) {
      setVisible({ ...visible, password: true });
    } else {
      setVisible({ ...visible, password: false });
    }
    if (registerForm.username && registerForm.password) {
      const response = await authRegister(registerForm);
      console.log(response);
      if (response.data.success === false) {
        openNotification("Failed", response.data.message, false);
      } else {
        openNotification("Success", response.data.message, true);
        navigate("/login");
      }
    }
  };
  return (
    <div className="form-background">
      <div className="RegisterForm form">
        <h1 className="form-title">Register</h1>
        <div className="input-field">
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeValue}
            required
          />
          <label htmlFor="username">Username</label>
          {(visible.username || registerForm.username === "") && (
            <span className="warning">*please input your username</span>
          )}
        </div>
        <div className="input-field">
          <input
            type="text"
            id="fullname"
            name="fullname"
            onChange={onChangeValue}
            required
          />
          <label htmlFor="fullname">Fullname</label>
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
          {(visible.password || registerForm.password === "") && (
            <span className="warning">*please input your Password</span>
          )}
        </div>
        <div className="input-field">
          <input
            type={showPWD ? "text" : "password"}
            id="confirmPassword"
            name="confirmPwd"
            onChange={onChangeValue}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          {(registerForm.confirmPwd === registerForm.password
            ? false
            : true) && <span className="warning">*Password not match</span>}
        </div>
        <div className="checkbox-field">
          <input type="checkbox" onChange={showPassword} id="showPWD" />
          <span>Show Password</span>
        </div>
        <button onClick={onSubmit}>Register</button>
        <p className="link">
          Have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
