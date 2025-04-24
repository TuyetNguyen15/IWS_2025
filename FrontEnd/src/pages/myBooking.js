import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../components/styles.css';
import { getCustomerBookings, deleteBooking } from "../services/bookingService";
import { fetchRoomById } from "../services/roomService";
import { getRoomThumbnail } from "../utils/imageUtils";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem("userName")

  useEffect(() => {
    console.log("Username:", username);
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    if (!username) return;
  
    getCustomerBookings(username)
      .then(async (res) => {
        const filtered = res.data.filter((b) => b.status !== "CHECKED_OUT");
        const bookingsWithRooms = await Promise.all(filtered.map(async (booking) => {
          try {
            const roomRes = await fetchRoomById(booking.roomId);
            return { ...booking, room: roomRes.data };
          } catch (err) {
            console.error("Error fetching room:", err);
            return booking;
          }
        }));
        setBookings(bookingsWithRooms);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => fetchBookings())
      .catch((err) => console.error("Error deleting booking:", err));
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-4 flex-grow-1">
        <h1 className="text-center mb-4">MY BOOKINGS</h1>

        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
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
                    <p><strong>Status:</strong> <span className={`badge ${
                      booking.status === "ACCEPTED"
                        ? "bg-success"
                        : booking.status === "DECLINED" || booking.status === "CANCELLED"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}>{booking.status}</span></p>
                    
                    <div className="mt-3">
                      {(booking.status === "DECLINED" || booking.status === "CANCELLED") && (
                        <button className="btn btn-sm" onClick={() => handleDelete(booking.id)}>Delete Booking</button>
                      )}
                      {booking.status === "PENDING" && (
                        <button className="btn  btn-sm" onClick={() => handleDelete(booking.id)}>Cancel Booking</button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">You have no bookings yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBooking;