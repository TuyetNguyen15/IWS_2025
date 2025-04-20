import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { logout, checkAuth } from "../services/roomService";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setIsAuthenticated(true);
          setFullName(response.data.fullName || 'User');
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
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-customer px-4">
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
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/browseRooms">Browse Rooms</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/manageRooms">Manage Room</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">My Booking</Link>
              </li>
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
              <li className="nav-item me-3">
                <Link to="/member/home" className="nav-link fw-bold">{fullName}</Link>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm"
                >
                  Logout
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
      <div className="hero-section"></div>
    </nav>
  );
};

export default Header;