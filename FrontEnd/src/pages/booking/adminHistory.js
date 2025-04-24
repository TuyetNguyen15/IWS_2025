import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings } from "../../services/bookingService";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../components/styles.css';

const AdminHistory = () => {
  const navigate = useNavigate();
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAllBookings()
      .then((res) => {
        const allBookings = res.data;
        setCheckedOutBookings(allBookings.filter(b => b.status === 'CHECKED_OUT'));
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="container my-4 flex-grow-1">
        {/* Tiêu đề căn giữa */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">History</h1>
        </div>

        <h4 className="mb-3">Checked-out Bookings</h4>
        {checkedOutBookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered text-center table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Room ID</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {checkedOutBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.roomId}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td><span className="badge bg-secondary">{booking.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No checked-out bookings yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminHistory;
