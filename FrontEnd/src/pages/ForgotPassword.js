import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/roomService";
import AuthLayout from "../components/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await requestPasswordReset(email);
      const { message, token } = res.data;

      setMessage(message);

      setTimeout(() => {
        navigate(`/reset-password?token=${token}`);
      }, 1300); // Hiển thị message 1.3s trước khi redirect
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      footerText="Back to"
      footerLink="/login"
      footerLinkText="Login"
    >
      {message && typeof message === "string" && (
        <p className="success-message">{message}</p>
      )}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-signin-signup">Send</button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;