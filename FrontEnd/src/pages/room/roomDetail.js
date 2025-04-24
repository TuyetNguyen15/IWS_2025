import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Link, useParams } from "react-router-dom";
import {
  fetchRoomById,
  fetchReviewsByRoomId,
  fetchAverageRating,
  submitReview
} from "../../services/roomService";
import { getAllRoomImages, getRoomThumbnail } from "../../utils/imageUtils";
import Footer from "../../components/footer";

const RoomDetail = () => {
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchRoomById(id)
      .then(response => {
        setRoom(response.data);
        const firstImage = getAllRoomImages(response.data)[0];
        setMainImage(firstImage);
      })
      .catch(error => console.error("Load room detail error", error));

    fetchReviewsByRoomId(id)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Load reviews error", error));

    fetchAverageRating(id)
      .then(response => setAverageRating(response.data))
      .catch(error => console.error("Failed to fetch average rating", error));
  }, [id]);

  const scrollGallery = (amount) => {
    const gallery = document.getElementById("galleryContainer");
    if (gallery) {
      gallery.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleSubmitReview = () => {
    setSubmitting(true);
    setError(null);

    const customerName = localStorage.getItem("userName");
    if (!customerName) {
      setError("You must be logged in to review.");
      setSubmitting(false);
      return;
    }

    const reviewPayload = {
      roomId: parseInt(id),
      customerName: customerName,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    submitReview(reviewPayload)
      .then(res => {
        setReviews(prev => [...prev, res.data]);
        setNewReview({ rating: 5, comment: "" });
      })
      .catch(err => {
        const msg = err.response?.data || "Failed to submit review.";
        setError(msg);
      })
      .finally(() => setSubmitting(false));
  };

  const amenityIcons = {
    "WiFi": "💓",
    "TV": "📺",
    "Kitchen": "🍳",
    "Parking": "🚗",
    "Pool": "🏊",
    "Breakfast": "🍳",
    "Air Conditioner": "❄️",
    "Heater": "🔥",
    "Bathtub": "🛁",
    "Gym": "🏋️",
    "Bar": "🍷"
  };

  return (
    <div>
      <Header />
      {room ? (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-7">
              <img
                src={mainImage || getRoomThumbnail(room)}
                alt={`Room ${room.roomNumber}`}
                className="main-room-image"
              />
              <div className="gallery-wrapper">
                <button className="scroll-btn left" onClick={() => scrollGallery(-150)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="gallery-container" id="galleryContainer">
                  {getAllRoomImages(room).map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Room ${room.roomNumber} - ${index + 1}`}
                      className="gallery-thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() => setMainImage(url)}
                    />
                  ))}
                </div>
                <button className="scroll-btn right" onClick={() => scrollGallery(150)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="col-md-4 mx-auto">
              <div className="d-flex align-items-center gap-2 mb-3">
                <h2 className="mb-0">{room.roomType}</h2>
                <span className="badge bg-warning text-dark">
                  ⭐ {averageRating.toFixed(1)} / 5
                </span>
              </div>
              <div className="room-meta mb-4">
                <ul className="list">
                  <li><strong>Room Number:</strong> {room.roomNumber}</li>
                  <li><strong>Area:</strong> {room.roomArea} m²</li>
                  <li><strong>Capacity:</strong> {room.roomCapacity} people</li>
                  <li><strong>Price:</strong> ${room.roomPrice}/night</li>
                  <li><strong>Description:</strong> {room.description}</li>
                </ul>
              </div>
              <div className="amenities-section">
                <h3>Offered Amenities</h3>
                {room.amenities ? (
                  room.amenities.split(",").map((amenity, index) => {
                    const clean = amenity.trim();
                    const icon = amenityIcons[clean] || "✅";
                    return (
                      <div key={index} className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                        <h5 className="mb-0">{clean}</h5>
                      </div>
                    );
                  })
                ) : <p>No amenities listed.</p>}
              </div>
              <div className="mt-4">
                <Link className="btn btn-lg" to={`/confirmBooking/${room.id}`}>
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-5">
            <h3>Customer Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div key={i} className="border p-3 mb-3 rounded shadow-sm">
                  <p><strong>Name:</strong> {r.customerName}</p>
                  <p><strong>Rating:</strong> {r.rating} ⭐</p>
                  <p><strong>Comment:</strong> {r.comment}</p>
                  <p className="text-muted"><small>{new Date(r.createdAt).toLocaleString()}</small></p>
                </div>
              ))
            ) : <p>No reviews yet.</p>}

            <h4 className="mt-5">Write a Review</h4>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
              <label>Rating</label>
              <select
                className="form-select"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(star => (
                  <option key={star} value={star}>{star} ⭐</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Comment</label>
              <textarea
                className="form-control"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </div>
            <button className="btn " onClick={handleSubmitReview} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      ) : <h3>Loading...</h3>}
      <Footer />
    </div>
  );
};

export default RoomDetail;
