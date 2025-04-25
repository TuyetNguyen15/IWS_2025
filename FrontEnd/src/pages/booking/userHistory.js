import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../components/styles.css';
import { getCustomerBookings } from "../../services/BookingService";
import { fetchRoomById } from "../../services/RoomService";
import { getRoomThumbnail } from "../../utils/ImageUtils";
import { Link } from "react-router-dom";

const UserHistory = () => {
  const [checkedOutBookings, setCheckedOutBookings] = useState([]);
  const username = localStorage.getItem("userName");

  useEffect(() => {
    if (!username) return;
    getCustomerBookings(username)
      .then(async (res) => {
        const filtered = res.data.filter((b) => b.status === "CHECKED_OUT");
        const bookingsWithRooms = await Promise.all(
          filtered.map(async (booking) => {
            try {
              const roomRes = await fetchRoomById(booking.roomId);
              return { ...booking, room: roomRes.data };
            } catch (err) {
              console.error("Error fetching room:", err);
              return booking;
            }
          })
        );
        setCheckedOutBookings(bookingsWithRooms);
      })
      .catch((err) => console.error("Error fetching checked out bookings:", err));
  }, [username]);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100 fade-page">
      <Header />
      <div className="container my-4 flex-grow-1">
        <div className="row">
          {checkedOutBookings.length > 0 ? (
            checkedOutBookings.map((booking, index) => (
              <div key={booking.id} className="col-md-12 mb-4">
                <div className="d-flex booking-card-custom">
                  <div className="me-4" style={{ width: "300px" }}>
                    <img
                      src={booking.room ? getRoomThumbnail(booking.room) : "https://via.placeholder.com/400x300"}
                      alt="Room Thumbnail"
                      className="img-fluid rounded booking-thumbnail"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <Link to={`/rooms/${booking.room.id}`} className="text-decoration-none">
                      <h4 style={{ color: "#1f2d5c" }}>
                        {booking.room ? booking.room.roomType : `Room ID: ${booking.roomId}`}
                      </h4>
                    </Link>
                    <p><strong>Booking Code:</strong> {booking.bookingCode || "N/A"}</p>
                    <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                    <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                    <p><strong>Status:</strong> <span className="badge bg-secondary">{booking.status}</span></p>
                    <div className="mt-2">
                      <Link to={`/rooms/${booking.room.id}`} className="btn btn-outline-primary btn-sm">
                        Leave a Review
                      </Link>
                    </div>
                  </div>
                </div>
                {index < checkedOutBookings.length - 1 && <hr className="my-4" />}
              </div>
            ))
          ) : (
            <p className="text-center">You have no checked-out bookings.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserHistory;
