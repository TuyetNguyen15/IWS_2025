import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings, updateBookingStatus } from "../../services/BookingService";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../components/styles.css';
import { Button, Overlay, Popover } from 'react-bootstrap';

const AdminBooking = () => {
  const navigate = useNavigate();
  const bellRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAllBookings()
      .then((res) => {
        const allBookings = res.data;
        setPendingBookings(allBookings.filter(b => b.status === 'PENDING'));
        setAcceptedBookings(allBookings.filter(b => b.status === 'ACCEPTED'));
        setCheckedOutBookings(allBookings.filter(b => b.status === 'CHECKED_OUT'));
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleConfirm = (id) => {
    updateBookingStatus(id, "ACCEPTED")
      .then(() => {
        fetchBookings();
        setShowPopover(false);
        navigate('/adminBooking');
      })
      .catch((err) => console.error("Error confirming booking:", err));
  };

  const handleDecline = (id) => {
    updateBookingStatus(id, "DECLINED")
      .then(() => {
        fetchBookings();
        setShowPopover(false);
      })
      .catch((err) => console.error("Error declining booking:", err));
  };

  const handleComplete = (id) => {
    updateBookingStatus(id, "CHECKED_OUT")
      .then(() => fetchBookings())
      .catch((err) => console.error("Error completing booking:", err));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100 fade-page">
      <Header />

      <div className="container my-4 flex-grow-1">
        <div className="position-relative text-center mb-4">
          <h1 className="fw-bold">Manage Bookings</h1>
          <Button
            ref={bellRef}
            variant="light"
            onClick={togglePopover}
            className="position-absolute top-50 end-0 translate-middle-y"
          >
            <i className="bi bi-bell-fill"></i>
            {pendingBookings.length > 0 && (
              <span className="badge bg-danger ms-1">{pendingBookings.length}</span>
            )}
          </Button>

          <Overlay target={bellRef.current} show={showPopover} placement="bottom-end" rootClose onHide={() => setShowPopover(false)}>
            <Popover className="shadow" style={{ minWidth: "320px" }}>
              <Popover.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span><i className="bi bi-clock-history me-2"></i>Pending Bookings</span>
                <Button variant="outline-secondary" size="sm" onClick={() => setShowPopover(false)}>✕</Button>
              </Popover.Header>
              <Popover.Body style={{ maxHeight: "350px", overflowY: "auto" }}>
                {pendingBookings.length > 0 ? (
                  pendingBookings.map((b) => (
                    <div key={b.id} className="border-bottom pb-2 mb-2">
                      <strong>#{b.id}</strong> - {b.customerName}<br />
                      <small className="text-muted">Room: {b.roomId} | {b.checkInDate} → {b.checkOutDate}</small>
                      <div className="mt-2 d-flex justify-content-end gap-2">
                        <Button size="sm" variant="success" onClick={() => handleConfirm(b.id)}>✔ Accept</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDecline(b.id)}>✖ Decline</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3 text-muted">
                    <i className="bi bi-bell-slash" style={{ fontSize: "1.5rem" }}></i><br />
                    No pending bookings
                  </div>
                )}
              </Popover.Body>
            </Popover>
          </Overlay>
        </div>

        <h4 className="mb-3">Accepted Bookings</h4>
        {acceptedBookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered text-center table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Booking Code</th> {/* ✅ THÊM CỘT */}
                  <th>Customer</th>
                  <th>Room ID</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {acceptedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.bookingCode || "N/A"}</td> {/* ✅ HIỂN THỊ BOOKING CODE */}
                    <td>{booking.customerName}</td>
                    <td>{booking.roomId}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td><span className="badge bg-success">{booking.status}</span></td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleComplete(booking.id)}
                      >
                        Complete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No accepted bookings yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminBooking;
