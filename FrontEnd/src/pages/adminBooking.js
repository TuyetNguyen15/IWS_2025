import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings, updateBookingStatus } from "../services/bookingService";
import Header from "../components/header";
import Footer from "../components/footer";
import '../components/styles.css';
import { Modal, Button } from 'react-bootstrap';

const AdminBooking = () => {
  const navigate = useNavigate();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);
  const [showPendingModal, setShowPendingModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAllBookings()
      .then((res) => {
        const allBookings = res.data;
        setPendingBookings(allBookings.filter(b => b.status === 'PENDING'));
        setAcceptedBookings(allBookings.filter(b => b.status === 'ACCEPTED'));
        setCheckedOutBookings(allBookings.filter(b => b.status === 'CHECKED_OUT')); // 👈 thêm CHECKED_OUT
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleConfirm = (id) => {
    updateBookingStatus(id, "ACCEPTED")
      .then(() => {
        fetchBookings();
        setShowPendingModal(false);
        navigate('/adminBooking');
      })
      .catch((err) => console.error("Error confirming booking:", err));
  };

  const handleDecline = (id) => {
    updateBookingStatus(id, "DECLINED")
      .then(() => {
        fetchBookings();
        setShowPendingModal(false);
      })
      .catch((err) => console.error("Error declining booking:", err));
  };

  const handleComplete = (id) => {
    updateBookingStatus(id, "CHECKED_OUT")
      .then(() => fetchBookings())
      .catch((err) => console.error("Error completing booking:", err));
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="container my-4 flex-grow-1">
        {/* Tiêu đề và chuông */}
        <div className="d-flex justify-content-center align-items-center position-relative mb-4">
          <h1 className="text-center m-0">Manage Bookings</h1>
          <Button 
            variant="light" 
            onClick={() => setShowPendingModal(true)}
            className="position-absolute end-0"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <i className="bi bi-bell"></i>
            {pendingBookings.length > 0 && (
              <span className="badge bg-danger ms-1">{pendingBookings.length}</span>
            )}
          </Button>
        </div>

        {/* Accepted bookings */}
        <h4>Accepted Bookings</h4>
        <div className="row">
          {acceptedBookings.length > 0 ? (
            acceptedBookings.map((booking) => (
              <div key={booking.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Booking #{booking.id}</h5>
                    <p className="card-text">Customer: {booking.customerName}</p>
                    <p className="card-text">Room ID: {booking.roomId}</p>
                    <p className="card-text">Check-in: {booking.checkInDate}</p>
                    <p className="card-text">Check-out: {booking.checkOutDate}</p>
                    <p className="card-text">
                      <strong>Status:</strong> <span className="badge bg-success">{booking.status}</span>
                    </p>
                    <Button variant="primary" size="sm" onClick={() => handleComplete(booking.id)}>Complete</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No accepted bookings yet.</p>
          )}
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

      {/* Popup Pending */}
      <Modal show={showPendingModal} onHide={() => setShowPendingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pending Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingBookings.length > 0 ? (
            pendingBookings.map((booking) => (
              <div key={booking.id} className="border p-2 mb-2 rounded">
                <p><strong>Customer:</strong> {booking.customerName}</p>
                <p><strong>Room ID:</strong> {booking.roomId}</p>
                <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="success" size="sm" onClick={() => handleConfirm(booking.id)}>Accept</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDecline(booking.id)}>Decline</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending bookings.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPendingModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default AdminBooking;
