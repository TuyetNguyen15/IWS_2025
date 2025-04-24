import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings, updateBookingStatus } from "../../services/bookingService";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../components/styles.css';

const AdminHistory = () => {
  const navigate = useNavigate();
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);
  

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAllBookings()
      .then((res) => {
        const allBookings = res.data;
        // setPendingBookings(allBookings.filter(b => b.status === 'PENDING'));
        // setAcceptedBookings(allBookings.filter(b => b.status === 'ACCEPTED'));
        setCheckedOutBookings(allBookings.filter(b => b.status === 'CHECKED_OUT'));
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };
  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="container my-4 flex-grow-1">
        <div className="d-flex justify-content-center align-items-center position-relative mb-4">
          <h1 className="text-center m-0">History</h1>
        </div>

        {/* Checked-out bookings */}
        <h4 className="mt-5">Checked-out Bookings</h4>
        <div className="row">
          {checkedOutBookings.length > 0 ? (
            checkedOutBookings.map((booking) => (
              <div key={booking.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Booking #{booking.id}</h5>
                    <p className="card-text">Customer: {booking.customerName}</p>
                    <p className="card-text">Room ID: {booking.roomId}</p>
                    <p className="card-text">Check-in: {booking.checkInDate}</p>
                    <p className="card-text">Check-out: {booking.checkOutDate}</p>
                    <p className="card-text">
                      <strong>Status:</strong> <span className="badge bg-secondary">CHECKED OUT</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No checked-out bookings yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminHistory;
