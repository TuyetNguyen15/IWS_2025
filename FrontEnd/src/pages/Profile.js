import React, { useEffect, useState } from "react";
import { checkAuth } from "../services/roomService";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await checkAuth();
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [location.pathname]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <main className="container py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            Profile Information
          </h2>
        </div>

        <div className="row profile-page-row align-items-start justify-content-center">
          {/* Avatar Section */}
          <div className="col-md-5 profile-page-avatar-col d-flex justify-content-center mb-4 mb-md-0">
            <div className="profile-avatar-wrapper">
              {userInfo?.avatar ? (
                <img
                  src={
                    userInfo.avatar.startsWith("/images/")
                      ? `http://localhost:8080${userInfo.avatar}`
                      : userInfo.avatar
                  }
                  alt="Profile Avatar"
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  <i className="bi bi-person text-secondary" style={{ fontSize: "7rem" }}></i>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="col-md-7 profile-page-info-col">
            <div className="profile-info-block">
              <div className="info-item">
                <i className="bi bi-person-fill text-primary info-icon" />
                <div>
                  <p className="info-label">Full Name</p>
                  <h5 className="info-value">{userInfo?.fullName || ""}</h5>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-gender-ambiguous text-primary info-icon" />
                <div>
                  <p className="info-label">Gender</p>
                  <h5 className="info-value">{userInfo?.gender || ""}</h5>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-calendar-date text-primary info-icon" />
                <div>
                  <p className="info-label">Date of Birth</p>
                  <h5 className="info-value">{userInfo?.dateOfBirth || ""}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Nút Edit xuống dưới, nằm giữa khi thu nhỏ */}
          <div className="mt-4 d-flex justify-content-md-end justify-content-center align-self-end">
  <Link to="/member/edit-profile" className="btn btn-primary px-4 py-2">
    <i className="bi bi-pencil-square me-2"></i>
    Edit Profile
  </Link>
</div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;