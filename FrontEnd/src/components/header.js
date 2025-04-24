import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { logout, checkAuth } from "../services/roomService";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState('');
  const [roles, setRoles] = useState([]);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setIsAuthenticated(true);
          setFullName(response.data.fullName || 'User');
          setRoles(response.data.roles || []);
          let avatarUrl = response.data.avatar;
        if (avatarUrl && avatarUrl.startsWith("/images/")) {
          avatarUrl = "http://localhost:8080" + avatarUrl;
        }
        setAvatar(avatarUrl || ''); // ✅ Nếu không có avatar thì để chuỗi rỗng


        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setFullName('');
      setRoles([]);
      setAvatar('');
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isAdmin = roles.includes('ROLE_ADMIN');
  const isUser = roles.includes('ROLE_USER');

  return (
    <nav className="navbar navbar-expand-lg bg-customer px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold">Mercy Hotel</span>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/browseRooms">Browse Rooms</Link>
          </li>
          {isAuthenticated && (
            <>
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageRooms">Manage Rooms</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminBooking">Manage Bookings</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminHistory">History</Link>
                  </li>
                </>
              )}
              {isUser && (
                <>
                <li className="nav-item">
                  <Link className="nav-link" to="/myBooking">My Booking</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/userHistory">History</Link>
                  </li>
                </>
                
              )}
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (
            <div className="d-flex align-items-center">
              <li className="nav-item dropdown">
                <a 
                  className="nav-link d-flex align-items-center" 
                  href="#" 
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <span className="fw-bold me-2">{fullName}</span>
                  {isAdmin && <span className="badge bg-danger me-2">Admin</span>}
                  {avatar ? (
                    <img 
                      src={avatar} 
                      alt="avatar" 
                      className="rounded-circle me-2" 
                      style={{ width: "60px", height: "60px", objectFit: "cover", marginLeft:"7px" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                      style={{ width: "40px", height: "40px", objectFit: "cover", marginLeft:"7px" }}
                    >
                      <i className="bi bi-person text-secondary" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                  )}

                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  {isUser && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/member/home">
                          <i className="bi bi-person-fill me-2"></i>Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/member/privacy">
                          <i className="bi bi-shield-lock me-2"></i>Privacy
                        </Link>
                      </li>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          <i className="bi bi-speedometer2 me-2"></i>Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/member/home">
                          <i className="bi bi-person-fill me-2"></i>Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/member/privacy">
                          <i className="bi bi-shield-lock me-2"></i>Privacy
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            </div>
          )}
        </ul>
      </div>
      </div>
      <div className="hero-section"></div>
    </nav>
  );
};

export default Header;