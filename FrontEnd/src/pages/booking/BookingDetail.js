import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { fetchRoomById ,fetchRooms} from "../../services/RoomService";
import { getCustomerBookings } from "../../services/BookingService";
import { getAllRoomImages } from "../../utils/ImageUtils";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);
  const username = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [suggestedRooms, setSuggestedRooms] = useState([]);

  useEffect(() => {
    if (room) {
      fetchRooms().then(res => {
        const others = res.data.filter(r => r.id !== room.id);
        
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 7);
        setSuggestedRooms(shuffled);
      });
    }
  }, [room]);
  

  useEffect(() => {
    if (!username) return;

    getCustomerBookings(username)
      .then(async (res) => {
        const target = res.data.find(b => b.id.toString() === bookingId);
        if (!target) {
          navigate("/my-bookings");
          return;
        }
        setBooking(target);
        const roomRes = await fetchRoomById(target.roomId);
        setRoom(roomRes.data);
      })
      .catch((err) => {
        console.error("Error loading booking:", err);
        navigate("/my-bookings");
      });
  }, [bookingId]);

  if (!booking || !room) return <div>Loading booking details...</div>;

  const images = getAllRoomImages(room);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
    
       <div id="roomImageCarousel" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {(() => {
      const groupedImages = [];
      for (let i = 0; i < images.length; i += 3) {
        groupedImages.push(images.slice(i, i + 3));
      }

      return groupedImages.map((group, groupIndex) => (
        <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}>
          <div className="row">
            {group.map((imgUrl, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-3">
                <img
                  src={imgUrl}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                  alt={`Slide ${groupIndex * 3 + index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      ));
    })()}
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#roomImageCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#roomImageCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        <div className="row">
  <div className="col-md-6">
    <h4 className="mb-3">{room.roomType}</h4>
    <p><strong>Booking ID:</strong> {booking.id}</p>
    <p><strong>Name:</strong> {booking.customerName}</p>
    <p><strong>Phone:</strong> {booking.phone || "Not provided"}</p>
    <p><strong>Special Requests:</strong> {booking.specialRequests || "None"}</p>
    <p><strong>Status:</strong> 
      <span className={`badge ms-2 ${
        booking.status === "ACCEPTED"
          ? "bg-success"
          : booking.status === "DECLINED" || booking.status === "CANCELLED"
          ? "bg-danger"
          : "bg-warning text-dark"
      }`}>{booking.status}</span>

    </p>
    <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
    <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
  </div>

  <div className="col-md-5">
    <p><strong>Room Capacity:</strong> {room.roomCapacity} guest(s)</p>
    <p><strong>Room Price:</strong> ${room.roomPrice} per night</p>
    <p>
      <span style={{ color: "#0071c2", fontWeight: "bold" }}>✔ Pay at Hotel</span>
      <span style={{ color: "#6b6b6b", marginLeft: "8px" }}>
        (Pay when you check-in at the property)
      </span>
    </p>
    <p>
      <span style={{ fontWeight: "bold", color: "#6b6b6b" }}>✔ Cancellation Policy Applies</span>
      <span style={{ color: "#6b6b6b", marginLeft: "8px" }}>
        (Free cancellation within 3 days before check-in)
        Contact with us!!
      </span>
    </p>
    <p><strong>Check-in Time:</strong> 14:00</p>
    <p><strong>Check-out Time:</strong> 12:00</p>
  </div>
</div>
<div className="my-5">
  <h4 className="mb-4">You may also like</h4>
  <div className="position-relative" style={{ padding: "0 60px" }}>
    <div id="suggestedRoomsCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {(() => {
          const grouped = [];
          for (let i = 0; i < suggestedRooms.length; i += 3) {
            grouped.push(suggestedRooms.slice(i, i + 3));
          }

          return grouped.map((group, groupIndex) => (
            <div className={`carousel-item ${groupIndex === 0 ? "active" : ""}`} key={groupIndex}>
              <div className="row">
                {group.map((room) => (
                  <div className="col-md-4 my-3" key={room.id}>
                    <div className="room-cardb h-100 d-flex flex-column">
                      <img
                        src={getAllRoomImages(room)[0]}
                        alt={`Room ${room.roomNumber}`}
                        className="room-img"
                      />
                      <div className="content p-3 d-flex flex-column flex-grow-1">
                        <Link to={`/rooms/${room.id}`} className="h5 text-decoration-none mb-2">{room.roomType}</Link>
                        <p className="small flex-grow-1">{room.description}</p>
                        <div className="room-features d-flex justify-content-between my-2">
                          <div className="p-2 border rounded d-flex align-items-center gap-2">
                            <i className="fas fa-user-friends"></i>
                            <span className="text-muted small">{room.roomCapacity} Guests</span>
                          </div>
                          <div className="p-2 border rounded d-flex align-items-center gap-2">
                            <i className="fas fa-ruler-combined"></i>
                            <span className="text-muted small">{room.roomArea} m²</span>
                          </div>
                        </div>
                        <div className="fw-bold text-primary">${room.roomPrice} / night</div>
                        <Link to={`/confirmBooking/${room.id}`} className="btn btn-outline-primary btn-sm mt-2 w-100">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}
      </div>
    </div>

    {/* Nút trái */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#suggestedRoomsCarousel"
      data-bs-slide="prev"
      style={{
        position: "absolute",
        top: "50%",
        left: "-50px",
        transform: "translateY(-50%)",
        zIndex: 2,
      }}
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>

    {/* Nút phải */}
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#suggestedRoomsCarousel"
      data-bs-slide="next"
      style={{
        position: "absolute",
        top: "50%",
        right: "-50px",
        transform: "translateY(-50%)",
        zIndex: 2,
      }}
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>


      </div>
   

      <Footer />
    </div>
  );
};

export default BookingDetail;
