import React from "react";
import './styles.css';



const Header = () => {
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
            <a className="nav-link" href="#">Home</a>
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
          <li className="nav-item">
            <a className="nav-link" href="#">Sign In</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Name</a>
          </li>
          <li className="nav-item">
            <form>
              <button className="nav-link">Logout</button>
            </form>
          </li>
        </ul>
      </div>
      <div class="hero-section"></div>
    </nav>
  );
  
};

export default Header;
