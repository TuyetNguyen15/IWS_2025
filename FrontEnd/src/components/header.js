import React from "react";
import './styles.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Header = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-customer  px-4" >
      <a className="navbar-brand fw-bold" href="#" >
        Mercy Hotel
      </a>

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

      <div className="collapse navbar-collapse justify-content-between"  id="navbarContent" >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Browse Rooms</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Manage Room</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My Booking</a>
          </li>
        </ul>

        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/login">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={isAdmin ? "/admin/profile" : "/profile"}>
                  {user?.fullName || user?.username}
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hero-section"></div>
    </nav>
  );
  
};

export default Header;
