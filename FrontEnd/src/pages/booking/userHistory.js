import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../components/styles.css';
import { getCustomerBookings } from "../../services/bookingService";
import { fetchRoomById } from "../../services/roomService";
import { getRoomThumbnail } from "../../utils/imageUtils";

const UserHistory = () => {
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);
  const customerEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!customerEmail) return;
    getCustomerBookings(customerEmail)
      .then(async (res) => {
        const filtered = res.data.filter(b => b.status === "CHECKED_OUT");
        const enriched = await Promise.all(filtered.map(async (booking) => {
          try {
            const roomRes = await fetchRoomById(booking.roomId);
            return { ...booking, room: roomRes.data };
          } catch {
            return booking;
          }
        }));
        setCheckedOutBookings(enriched);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-4 flex-grow-1">
        <h1 className="text-center mb-4">Booking History</h1>
        <div className="row">
          {checkedOutBookings.length > 0 ? (
            checkedOutBookings.map((booking) => (
              <div key={booking.id} className="col-md-12 mb-4">
                <div className="card d-flex flex-row">
                  <div className="col-md-4 p-2">
                    <img
                      src={booking.room ? getRoomThumbnail(booking.room) : "https://via.placeholder.com/400x300"}
                      alt="Room Thumbnail"
                      className="img-fluid rounded"
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8 p-3">
                    <h4>{booking.room ? booking.room.roomType : `Room ID: ${booking.roomId}`}</h4>
                    <p><strong>Customer:</strong> {booking.customerName || "Unknown"}</p>
                    <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                    <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                    <p><strong>Status:</strong> <span className="badge bg-secondary">CHECKED OUT</span></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">You have no past bookings yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserHistory;
