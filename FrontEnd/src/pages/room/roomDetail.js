import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link, useParams } from "react-router-dom";
import {
  fetchRoomById,
  fetchReviewsByRoomId,
  fetchAverageRating,
  submitReview
} from "../../services/RoomService";
import { getAllRoomImages, getRoomThumbnail } from "../../utils/ImageUtils";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const images = room ? getAllRoomImages(room) : [];

  useEffect(() => {
    fetchRoomById(id).then(res => {
      setRoom(res.data);
      const imgs = getAllRoomImages(res.data);
      setMainImage(imgs[0]);
    });

    fetchReviewsByRoomId(id).then(res => setReviews(res.data));
    fetchAverageRating(id).then(res => setAverageRating(res.data));
  }, [id]);

  const scrollGallery = (amount) => {
    const gallery = document.getElementById("galleryContainer");
    if (gallery) gallery.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleSubmitReview = () => {
    setSubmitting(true);
    setError(null);
    const userId = localStorage.getItem("userId");
    const customerName = localStorage.getItem("userName");

    if (!userId || !customerName) {
      setError("You must be logged in to review.");
      setSubmitting(false);
      return;
    }

    submitReview({
      userId: parseInt(userId),
      roomId: parseInt(id),
      customerName,
      rating: newReview.rating,
      comment: newReview.comment
    })
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
    "WiFi": <i className="fas fa-wifi" />, "TV": <i className="fas fa-tv" />, "Kitchen": <i className="fas fa-utensils" />,
    "Parking": <i className="fas fa-parking" />, "Pool": <i className="fas fa-swimming-pool" />, "Breakfast": <i className="fas fa-coffee" />,
    "Air Conditioner": <i className="fas fa-snowflake" />, "Heater": <i className="fas fa-fire" />, "Bathtub": <i className="fas fa-bath" />,
    "Gym": <i className="fas fa-dumbbell" />, "Bar": <i className="fas fa-cocktail" />
  };

  return (
    <div>
      <Header />
      {room ? (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-7">
              <div className="image-container position-relative overflow-hidden" style={{ height: "400px" }}>
                <img
                  src={mainImage || getRoomThumbnail(room)}
                  alt="Main Room"
                  className="main-room-image"
                />
              </div>

              <div className="gallery-wrapper position-relative mt-3">
                <button className="scroll-btn left" onClick={() => scrollGallery(-150)}>
                  <i className="fas fa-chevron-left" />
                </button>

                <div className="gallery-container" id="galleryContainer">
                  {images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      className={`gallery-thumbnail ${index === activeIndex ? "active-thumbnail" : ""}`}
                      onClick={() => {
                        setMainImage(url);
                        setActiveIndex(index);
                        const gallery = document.getElementById("galleryContainer");
                        const thumbnails = gallery?.children;
                        if (thumbnails && thumbnails[index]) {
                          thumbnails[index].scrollIntoView({
                            behavior: "smooth",
                            inline: "center",
                            block: "nearest"
                          });
                        }
                      }}
                      alt={`Image ${index}`}
                    />
                  ))}
                </div>

                <button className="scroll-btn right" onClick={() => scrollGallery(150)}>
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>

            <div className="col-md-5">
              <div className="d-flex align-items-center gap-2 mb-3">
                <h2 className="mb-0 text-primary fw-bold">{room.roomType}</h2>
                <span className="badge bg-warning text-dark shadow-sm">
                  <i className="fas fa-star" /> {averageRating.toFixed(1)} / 5
                </span>
              </div>

              <ul className="list text-muted mb-4">
                <li><strong>Room Number:</strong> {room.roomNumber}</li>
                <li><strong>Area:</strong> {room.roomArea} m²</li>
                <li><strong>Capacity:</strong> {room.roomCapacity} people</li>
                <li><strong>Price:</strong> ${room.roomPrice}/night</li>
                <li><strong>Description:</strong> {room.description}</li>
              </ul>

              <div className="row g-3 mb-4">
                {room.amenities?.split(",").map((a, i) => (
                  <div key={i} className="col-6 d-flex align-items-center gap-2">
                    <div className="fs-5 text-primary">{amenityIcons[a.trim()]}</div>
                    <span className="text-dark">{a.trim()}</span>
                  </div>
                ))}
              </div>

              <Link to={`/confirmBooking/${room.id}`} className="btn btn-primary btn-lg w-100">
                Book Now
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <h3>Customer Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div key={i} className="review-box">
                  <p><strong>{r.customerName}</strong> <span className="text-warning">{"★".repeat(r.rating)}</span></p>
                  <p>{r.comment}</p>
                  <p className="text-muted"><small>{new Date(r.createdAt).toLocaleString()}</small></p>
                </div>
              ))
            ) : <p>No reviews yet.</p>}

<<<<<<< HEAD
            {isUser && (
              <div className="card mt-4 review-form">
                <div className="card-body">
                  <h5 className="card-title">Leave a Review</h5>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{"★".repeat(n)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                  </div>
                  <button className="btn" disabled={submitting} onClick={handleSubmitReview}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
=======
            <div className="card mt-4 review-form">
              <div className="card-body">
                <h5 className="card-title">Leave a Review</h5>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>{"★".repeat(n)}</option>
                    ))}
                  </select>
>>>>>>> 64c944bcdd9b209401ac0aeb3426ae3f819f2e2c
                </div>
              </div>
<<<<<<< HEAD
            )}
=======
            </div>
>>>>>>> 64c944bcdd9b209401ac0aeb3426ae3f819f2e2c
          </div>
        </div>
      ) : <h3>Loading...</h3>}
      <Footer />
    </div>
  );
};

export default RoomDetail;
