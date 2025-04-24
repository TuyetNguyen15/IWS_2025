import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, updateProfile } from "../services/roomService";
import Header from "../components/header";
import Footer from "../components/footer";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await checkAuth();
        setFullName(res.data.fullName || '');
        setGender(res.data.gender || '');
        setDateOfBirth(res.data.dateOfBirth ? new Date(res.data.dateOfBirth) : null);
        setAvatarPreview(res.data.avatar || '');
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      setAvatarFile(compressedFile);
      const previewUrl = URL.createObjectURL(compressedFile);
      setAvatarPreview(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (fullName) formData.append("fullName", fullName);
    if (gender) formData.append("gender", gender);
    if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth.toISOString().split('T')[0]);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      await updateProfile(formData);
      window.location.href = "/member/home";
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        <h2 className="fw-bold text-uppercase mb-5 text-center" style={{ fontSize: "2rem", letterSpacing: "1px" }}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="px-md-5">
          {/* Fullname */}
          <div className="mb-4">
            <label className="form-label fs-5 fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="mb-4">
            <label className="form-label fs-5 fw-bold">Gender</label>
            <select
              className="form-select form-select-lg"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="form-label fs-5 fw-bold mb-2">Date of Birth</label>
            <div style={{ marginTop: '6px' }}>
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control form-control-lg"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()}
                placeholderText="Select date"
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="mb-4">
            <label className="form-label fs-5 fw-bold">Avatar</label>
            <div
              {...getRootProps()}
              className={`dropzone p-4 border border-2 rounded d-flex justify-content-center align-items-center flex-column ${isDragActive ? "border-primary" : "border-secondary"}`}
              style={{ cursor: "pointer", minHeight: "220px", backgroundColor: "#fdfdfd" }}
            >
              <input {...getInputProps()} />
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview Avatar"
                  className="rounded-circle shadow"
                  style={{ width: "160px", height: "160px", objectFit: "cover" }}
                />
              ) : (
                <p className="text-muted fs-5">Drag & drop an image here, or click to select</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mt-5 gap-3">
            {/* Cancel Button - Left */}
            <button
              type="button"
              className="btn btn-lg px-5 py-2 fs-5"
              style={{
                backgroundColor: "#d6d6d6", 
                color: "#000",              
              }}
              onClick={() => navigate("/member/home")}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>

            {/* Save Button - Right */}
            <button
              type="submit"
              className="btn btn-primary btn-lg px-5 py-2 fs-5"
              style={{ border: "none" }}
            >
              <i className="bi bi-check-circle me-2"></i>
              Save
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;