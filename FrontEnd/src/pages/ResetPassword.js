import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/roomService";
import AuthLayout from "../components/AuthLayout";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      navigate("/login?resetSuccess=true");
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Reset failed");
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      footerText="Back to"
      footerLink="/login"
      footerLinkText="Login"
    >
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-signin-signup">Reset</button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;