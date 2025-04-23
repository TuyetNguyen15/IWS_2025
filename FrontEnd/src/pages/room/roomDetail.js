import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Link, useParams } from "react-router-dom";
import { fetchRoomById } from "../../services/roomService";
import { getAllRoomImages, getRoomThumbnail } from "../../utils/imageUtils";
import Footer from "../../components/footer";

const RoomDetail = () => {
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null); 
    const { id } = useParams();

    const scrollGallery = (amount) => {
        const gallery = document.getElementById('galleryContainer');
        if (gallery) {
            gallery.scrollBy({
                left: amount,
                behavior: 'smooth'
            });
        }
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

    useEffect(() => {
        fetchRoomById(id)
            .then(response => {
                setRoom(response.data);
                const firstImage = getAllRoomImages(response.data)[0];
                setMainImage(firstImage);
            })
            .catch(error => {
                console.error("Load room detail error", error);
            });
    }, [id]);

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
                            <h1 style={{ color: "#1E0E62" }}>{room.roomType}</h1>
                            <div className="room-meta mb-4">
                                <ul className="list">
                                    <li className="mb-2">
                                        <strong>Room Number:</strong> {room.roomNumber}
                                    </li>
                                    <li className="mb-2">
                                        <strong>Area:</strong> {room.roomArea} m²
                                    </li>
                                    <li className="mb-2">
                                        <strong>Capacity:</strong> {room.roomCapacity} people
                                    </li>
                                    <li className="mb-2">
                                        <strong>Price:</strong> <span className="font-weight-bold">${room.roomPrice}/night</span>
                                    </li>
                                    <li className="mb-2">
                                        <strong>Description:</strong> {room.description}
                                    </li>
                                </ul>
                            </div>
                            <div className="amenities-section">
                                <h3 style={{ color: "#484848" }}>Offered Amenities</h3>
                                {room.amenities ? (
                                    room.amenities.split(",").map((amenity, index) => {
                                        const cleanAmenity = amenity.trim();
                                        const icon = amenityIcons[cleanAmenity] || "✅";
                                        return (
                                            <div key={index} className="amenity-item d-flex align-items-center gap-2 mb-2">
                                                <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                                                <h5 className="amenity-title mb-0">{cleanAmenity}</h5>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No amenities listed.</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <Link className="btn btn-lg"
                                to={`/confirmBooking/${room.id}`}>
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
            <Footer />
        </div>
    );
};

export default RoomDetail;
