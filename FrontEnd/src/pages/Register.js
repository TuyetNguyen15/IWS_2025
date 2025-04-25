import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/roomService";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.username) newErrors.username = "Username is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (!userData.fullName) newErrors.fullName = "Full Name is required";
    if (!userData.email) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(userData);
      navigate("/login?registerSuccess=true");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors({ server: err.response.data });
      } else {
        setErrors({ server: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <AuthLayout 
      title="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      {errors.server && (
        <div className="alert alert-danger auth-alert" role="alert">
          {errors.server}
        </div>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            id="fullName"
            name="fullName"
            placeholder="Your full name"
            value={userData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            placeholder="Your email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            placeholder="Your username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            placeholder="Your password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="d-flex justify-content-center" style={{ gap: "46px" }}>
          <button className="btn-back" onClick={() => navigate("/")}>Back</button>
          <button type="submit" className="btn-signin-signup">Sign up</button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;