// src/pages/myBooking.js

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import '../components/styles.css';
import { getCustomerBookings, cancelBooking, deleteBooking } from "../services/bookingService";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const customerEmail = "dummy@email.com"; // Replace with real login email later

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getCustomerBookings(customerEmail)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleCancel = (id) => {
    cancelBooking(id)
      .then(() => fetchBookings())
      .catch((err) => console.error("Error cancelling booking:", err));
  };

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => fetchBookings())
      .catch((err) => console.error("Error deleting booking:", err));
  };

  return (
    <div className="bg-customer">
      <Header />

      <div className="container py-5">
        <h2 className="text-center text-uppercase text-secondary mb-4">My Bookings</h2>

        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Room ID: {booking.roomId}</h5>
                    <p className="card-text">Check-in: {booking.checkInDate}</p>
                    <p className="card-text">Check-out: {booking.checkOutDate}</p>
                    <p className="card-text">Status: {booking.status}</p>

                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleCancel(booking.id)}>
                      Cancel
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(booking.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">You have no bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
