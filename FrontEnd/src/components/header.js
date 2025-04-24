import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
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
          setAvatar(avatarUrl || '');
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
    <nav className="navbar navbar-expand-xl bg-customer">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold">Mercy Hotel</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/browseRooms" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Browse Rooms</NavLink>
            </li>
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/manageRooms" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Manage Rooms</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/adminBooking" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Manage Bookings</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/adminHistory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>History</NavLink>
                  </li>
                  </>
                )}
                {isUser && (
                  <>
                  <li className="nav-item">
                    <NavLink to="/myBooking" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Booking</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/userHistory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>History</NavLink>
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
                  <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
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
                    <span className="nav-name">{fullName}</span>
                    {isAdmin && <span className="badge badge-blue me-2">Admin</span>}
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-circle me-2"
                        style={{ width: "60px", height: "60px", objectFit: "cover", marginLeft: "7px" }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginLeft: "7px" }}
                      >
                        <i className="bi bi-person text-secondary" style={{ fontSize: "1.5rem" }}></i>
                      </div>
                    )}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    {isUser && (
                      <>
                        <li>
                          <NavLink to="/member/home" className="dropdown-item">
                            <i className="bi bi-person-fill me-2"></i>Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/member/privacy" className="dropdown-item">
                            <i className="bi bi-shield-lock me-2"></i>Privacy
                          </NavLink>
                        </li>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <li>
                          <NavLink to="/admin/dashboard" className="dropdown-item">
                            <i className="bi bi-speedometer2 me-2"></i>Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/member/home" className="dropdown-item">
                            <i className="bi bi-person-fill me-2"></i>Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/member/privacy" className="dropdown-item">
                            <i className="bi bi-shield-lock me-2"></i>Privacy
                          </NavLink>
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
