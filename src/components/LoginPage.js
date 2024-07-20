// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import GoogleLoginButton from "./GoogleLoginButton";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.login(credentials)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/candidate/home");
      })
      .catch((error) => setError("Invalid username or password"));
  };

  return (
    <div className="container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="or">
          <hr />
          or
          <hr />
        </div>
        <GoogleLoginButton />
      </form>
    </div>
  );
};

export default LoginPage;
