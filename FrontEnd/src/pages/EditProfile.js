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
      window.location.href = "/member/home"; // ✅ reload trang, header sẽ gọi checkAuth()
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };
  

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        <h2 className="mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Fullname */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Gender Dropdown */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
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
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              maxDate={new Date()} // Không cho chọn ngày tương lai
              placeholderText="Select date"
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <div
              {...getRootProps()}
              className={`dropzone p-4 border border-2 rounded ${isDragActive ? "border-primary" : "border-secondary"}`}
              style={{ cursor: "pointer", textAlign: "center", minHeight: "200px" }}
            >
              <input {...getInputProps()} />
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview Avatar"
                  className="img-thumbnail rounded-circle"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <p>Drag & drop an image here, or click to select</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;