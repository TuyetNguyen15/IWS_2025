import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, checkAuth } from "../services/roomService";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const registerSuccess = queryParams.has("registerSuccess");
  const resetSuccess = queryParams.has("resetSuccess");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({
        username: credentials.username,
        password: credentials.password
      });

      if (response.status === 200) {
        const userResponse = await checkAuth(); 
        const userData = userResponse.data;
  
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userName", userData.fullName); 
  
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    >
      {registerSuccess && <p className="success-message">Registration successful! Please log in.</p>}
      {resetSuccess && <p className="success-message">Password reset successfully! Please log in.</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot password link centered */}
        <div className="mb-3 text-center">
          <Link to="/forgot-password" className="forgot-password-link">Forgot your password?</Link>
        </div>

        <div className="d-flex justify-content-center" style={{ gap: "46px" }}>
          <button className="btn-back" type="button" onClick={() => navigate("/")}>Back</button>
          <button type="submit" className="btn-signin-signup">Sign In</button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;