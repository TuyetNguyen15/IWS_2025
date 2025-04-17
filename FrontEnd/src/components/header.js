import React from "react";
import './styles.css';
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-customer  px-4" >
      <span className="navbar-brand fw-bold" >
        Mercy Hotel
      </span>

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
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/browseRooms">Browse Rooms</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" >Manage Room</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">My Booking</Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">Name</Link>
          </li>
          <li className="nav-item">
            <form>
              <Link className="nav-link">Logout</Link>
            </form>
          </li>
        </ul>
      </div>
      <div className="hero-section"></div>
    </nav>
  );
  
};

export default Header;
