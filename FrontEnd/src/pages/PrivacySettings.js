import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { checkAuth, updatePrivacySettings } from "../services/roomService";
import '../components/styles.css'; 
import "bootstrap-icons/font/bootstrap-icons.css";

const PrivacySettings = () => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [form, setForm] = useState({ newUsername: "", newEmail: "", currentPassword: "", newPassword: "" });
  const [editState, setEditState] = useState({ username: false, email: false, password: false });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await checkAuth();
        setUserInfo({ username: res.data.username, email: res.data.email });
        setForm(prev => ({
          ...prev,
          newUsername: res.data.username,
          newEmail: res.data.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field) => {
    setErrors({});
    setGeneralError("");
    setEditState(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFieldSubmit = async (field) => {
    try {
      setErrors({});
      setGeneralError("");

      await updatePrivacySettings(form);
      setEditState(prev => ({ ...prev, [field]: false }));
      window.location.reload();
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === "object") {
        setErrors(data);
        if (data.general) setGeneralError(data.general);
      } else {
        setGeneralError("Update failed.");
      }
    }
  };

  const handleCancel = (field) => {
    setForm(prev => ({
      ...prev,
      newUsername: userInfo.username,
      newEmail: userInfo.email,
      currentPassword: "",
      newPassword: "",
    }));
    setErrors({});
    setGeneralError("");
    setEditState(prev => ({ ...prev, [field]: false }));
  };

  const renderEditBlock = (field, label, value, inputType = "text") => {
    const fieldName = field === "username" ? "newUsername" : "newEmail";
    const iconClass = field === "username"
      ? "bi bi-person"
      : "bi bi-envelope";

    return (
      <div className="mb-5">
        <label className="form-label fw-semibold fs-5 d-flex align-items-center gap-2">
          <i className={iconClass}></i>
          {label}
        </label>
        {!editState[field] ? (
          <div className="d-flex justify-content-between align-items-center border rounded p-3 bg-white">
            <span className="fs-5">{value}</span>
            <button type="button" className="btn btn-sm btn-outline-dark fs-6" onClick={() => toggleEdit(field)}>Change</button>
          </div>
        ) : (
          <>
            <input
              type={inputType}
              className={`form-control fs-5 ${errors[fieldName] ? 'is-invalid' : ''}`}
              name={fieldName}
              value={form[fieldName]}
              onChange={handleChange}
            />
            {errors[fieldName] && <div className="text-danger mt-1">{errors[fieldName]}</div>}
            <div className="mt-3 d-flex justify-content-between">
              <button type="button" className="btn btn-save fs-6" onClick={() => handleFieldSubmit(field)}>Save</button>
              <button type="button" className="btn btn-cancel fs-6" onClick={() => handleCancel(field)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        <h2 className="mb-4 text-center fw-bold fs-2">Privacy Settings</h2>
        {generalError && <div className="alert alert-danger text-center">{generalError}</div>}
        <div className="col-md-6 mx-auto">
          {renderEditBlock("username", "Username", userInfo.username)}
          {renderEditBlock("email", "Email", userInfo.email, "email")}

          {/* Password Section */}
          <div className="mb-5">
            <label className="form-label fw-semibold fs-5 d-flex align-items-center gap-2">
              <i className="bi bi-lock"></i>
              Password
            </label>
            {!editState.password ? (
              <div className="d-flex justify-content-between align-items-center border rounded p-3 bg-white">
                <span className="fs-5">••••••••</span>
                <button type="button" className="btn btn-sm btn-outline-dark fs-6" onClick={() => toggleEdit("password")}>Change</button>
              </div>
            ) : (
              <>
                <input type="password" className={`form-control fs-5 mb-2 ${errors.currentPassword ? 'is-invalid' : ''}`} name="currentPassword" placeholder="Current password" value={form.currentPassword} onChange={handleChange} />
                {errors.currentPassword && <div className="text-danger mb-2">{errors.currentPassword}</div>}
                <input type="password" className={`form-control fs-5 mb-2 ${errors.newPassword ? 'is-invalid' : ''}`} name="newPassword" placeholder="New password" value={form.newPassword} onChange={handleChange} />
                {errors.newPassword && <div className="text-danger mb-2">{errors.newPassword}</div>}
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-save fs-6" onClick={() => handleFieldSubmit("password")}>Save</button>
                  <button type="button" className="btn btn-cancel fs-6" onClick={() => handleCancel("password")}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacySettings;