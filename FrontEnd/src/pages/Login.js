import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/roomService";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const registerSuccess = queryParams.has("registerSuccess");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username: credentials.username, password: credentials.password });
      if (response.status === 200) {
        localStorage.setItem('userEmail', credentials.username);
        navigate("/member/home");
      }
    } catch (error) {
      console.error("Error details:", error.response);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <AuthLayout title="Login" footerText="Don't have an account?" footerLink="/register" footerLinkText="Register">
      {registerSuccess && <p className="success-message">Registration successful! Please log in.</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="mb-3">
          <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" value={credentials.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={credentials.password} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;