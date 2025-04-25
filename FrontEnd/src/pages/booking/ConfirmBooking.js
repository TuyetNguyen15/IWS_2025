import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { fetchRoomById } from "../../services/RoomService";
import { getRoomThumbnail } from "../../utils/ImageUtils";
import { createBooking } from "../../services/BookingService";

const ConfirmBooking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [room, setRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    specialRequests: ""
  });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [nights, setNights] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchRoomById(roomId)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Error fetching room:", err));
  }, [roomId]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffTime = new Date(checkOutDate) - new Date(checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    }
  }, [checkInDate, checkOutDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length <= 10) {
        setGuestInfo({ ...guestInfo, phone: onlyDigits });
      }
    } else {
      setGuestInfo({ ...guestInfo, [name]: value });
    }
  };

  const handleCompleteBooking = async () => {
    if (!checkInDate || !checkOutDate || nights <= 0) {
      alert("Please select valid Check-in and Check-out dates.");
      return;
    }

    try {
      await createBooking({
        customerName: `${guestInfo.firstName} ${guestInfo.lastName}`,
        userId: userId,
        checkInDate,
        checkOutDate,
        phone: guestInfo.phone,
        specialRequests: guestInfo.specialRequests || "",
        roomId: room.id
      });
      navigate("/myBooking");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. No rooms available today");
    }
  };

  if (!room) return <div>Loading room information...</div>;

  const roomRate = room.roomPrice;
  const total = roomRate * nights;

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5 flex-grow-1">
        <h1 className="text-center mb-4">Complete Your Booking</h1>

        <div className="row">
          {/* Guest Information */}
          <div className="col-md-8">
            <div className="card p-4 mb-4">
              <h2 className="mb-3">Guest Information</h2>
              <p>Please enter your details to complete the booking</p>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={guestInfo.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={guestInfo.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="10"
                    placeholder="Enter phone number"
                    className="form-control"
                    value={guestInfo.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    className="form-control"
                    rows="3"
                    value={guestInfo.specialRequests}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="col-md-4">
            <div className="card p-4">
              <h2 className="mb-3">Booking Summary</h2>
              <img
                src={getRoomThumbnail(room)}
                alt="Room Thumbnail"
                className="img-fluid mb-3"
              />
              <h5>{room.roomType}</h5>
              <p>
                <i className="fas fa-user-friends"></i> {room.roomCapacity} Guests
              </p>
              <hr />
              <div className="mb-2">
                <label>Check-in Date:</label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label>Check-out Date:</label>
                <input
                  type="date"
                  className="form-control"
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
              <p>Length of stay: {nights} nights</p>
              <hr />
              <p>Room rate: ${roomRate} × {nights} nights</p>
              <h5>Total: ${total}</h5>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleCompleteBooking}
              >
                Complete Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmBooking;
