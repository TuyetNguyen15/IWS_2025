import React, { useEffect, useState } from "react";
import { checkAuth } from "../services/roomService";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  }, [navigate]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

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
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Profile Information</h2>
            </div>

            <div className="row">
              <div className="col-md-5 d-flex justify-content-center align-items-start mb-4 mb-md-0">
                <div className="position-relative" style={{ width: "280px" }}>
                  {userInfo?.avatar ? (
                    <img 
                      src={userInfo.avatar} 
                      alt="Profile Avatar" 
                      className="rounded-circle img-thumbnail shadow" 
                      style={{ width: "280px", height: "280px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow" style={{ width: "280px", height: "280px" }}>
                      <i className="bi bi-person text-secondary" style={{ fontSize: "7rem" }}></i>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-md-7">
                <div className="list-group h-100">
                  <div className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="bi bi-person-fill text-primary" style={{ fontSize: "1.5rem" }}></i>
                      </div>
                      <div>
                        <p className="text-muted mb-0">Full Name</p>
                        <h5 className="mb-0">{userInfo?.fullName || "Not specified"}</h5>
                      </div>
                    </div>
                  </div>
                  
                  <div className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="bi bi-gender-ambiguous text-primary" style={{ fontSize: "1.5rem" }}></i>
                      </div>
                      <div>
                        <p className="text-muted mb-0">Gender</p>
                        <h5 className="mb-0">{userInfo?.gender || "Not specified"}</h5>
                      </div>
                    </div>
                  </div>
                  
                  <div className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="bi bi-calendar-date text-primary" style={{ fontSize: "1.5rem" }}></i>
                      </div>
                      <div>
                        <p className="text-muted mb-0">Date of Birth</p>
                        <h5 className="mb-0">{userInfo?.dateOfBirth || "Not specified"}</h5>
                      </div>
                    </div>
                  </div>
                  
                  {userInfo?.email && (
                    <div className="list-group-item border-0 px-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i className="bi bi-envelope text-primary" style={{ fontSize: "1.5rem" }}></i>
                        </div>
                        <div>
                          <p className="text-muted mb-0">Email</p>
                          <h5 className="mb-0">{userInfo.email}</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-end mt-4">
              <button 
                onClick={handleEdit} 
                className="btn btn-primary px-4 py-2"
              >
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
