import { useState } from "react";
import { checkRoomNumberExists, createRoom } from "../../services/RoomService"; // Import API service
import Header from "../../components/header";

function AddRoom() {
    const [roomData, setRoomData] = useState({
        roomNumber: "",
        roomType: "",
        roomPrice: "",
        status: "Available",
        description: "",
        roomArea: "",
        roomCapacity: "",
        amenities: "",
    });
    const [roomNumberError, setRoomNumberError] = useState("");
    const [isCheckingRoomNumber, setIsCheckingRoomNumber] = useState(false);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setRoomData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "roomNumber") {
            if (value.trim() === "") {
                setRoomNumberError("Room number is required.");
                return;
            }

            setIsCheckingRoomNumber(true);
            const exists = await checkRoomNumberExists(value.trim());
            if (exists) {
                setRoomNumberError("Room number already exists!");
            } else {
                setRoomNumberError("");
            }
            setIsCheckingRoomNumber(false);
        }
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...newFiles]);

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        let amenities = roomData.amenities ? roomData.amenities.split(",") : [];

        if (checked) {
            amenities.push(value);
        } else {
            amenities = amenities.filter(item => item.trim() !== value.trim());
        }

        setRoomData((prevData) => ({
            ...prevData,
            amenities: amenities.join(","),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createRoom(roomData, images);
            console.log("Room added successfully:", response.data);
            alert("Room and images added successfully!");

            // Reset form
            setRoomData({
                roomNumber: "",
                roomType: "",
                roomPrice: "",
                status: "Available",
                description: "",
                roomArea: "",
                roomCapacity: "",
                amenities: "",
            });
            setImages([]);
            setPreviewImages([]);
        } catch (error) {
            console.error("Error adding room:", error);
            alert("Failed to add room and images!");
        }
    };

    return (
        <div className="">
            <Header/>
        <div className="container py-5">
            
            <div className="room-form-container bg-white p-4 rounded shadow-sm">
                <h2 className="form-title text-center mb-4">Add New Room</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Basic Information */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Room Type</label>
                            <select
                                className="form-select"
                                name="roomType"
                                value={roomData.roomType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select room type</option>
                                <option value="Standard Room">Standard Room</option>
                                <option value="Deluxe Room">Deluxe Room</option>
                                <option value="Superior Room">Superior Room</option>
                                <option value="Family Room">Family Room</option>
                                <option value="Couple Simple Room">Couple Simple Room</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Room Number</label>
                            <input
                                type="text"
                                className={`form-control ${roomNumberError ? "is-invalid" : ""}`}
                                name="roomNumber"
                                value={roomData.roomNumber}
                                onChange={handleChange}
                                required
                            />
                            {roomNumberError && (
                                <div className="invalid-feedback">{roomNumberError}</div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Price per night (USD)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="roomPrice"
                                value={roomData.roomPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Area (m²)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="roomArea"
                                value={roomData.roomArea}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Capacity */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                name="roomCapacity"
                                value={roomData.roomCapacity}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-3">
                        <label className="form-label">Upload Images</label>
                        <div
                            className="image-upload-container p-3 mb-3"
                            style={{
                                border: "2px dashed #ddd",
                                borderRadius: "5px",
                                textAlign: "center",
                                cursor: "pointer"
                            }}
                            onClick={() => document.getElementById("roomImages").click()}
                        >
                            <i className="bi bi-cloud-arrow-up" style={{ fontSize: "2rem", color: "#583101" }}></i>
                            <p className="mt-2">Click to upload images or drag and drop</p>
                            <input
                                type="file"
                                id="roomImages"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {previewImages.map((src, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={src}
                                        alt="preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                            margin: "5px",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewImages(pre => pre.filter((_, i) => i !== index));
                                            setImages(pre => pre.filter((_, i) => i !== index));
                                        }}
                                        style={{
                                            position: "absolute",
                                            top: "2px",
                                            right: "2px",
                                            background: "#583101",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            textAlign: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Amenities */}
                    <div className="mb-3">
                        <label className="form-label">Amenities</label>
                        <input
                            type="text"
                            className="form-control"
                            name="amenities"
                            value={roomData.amenities}
                            onChange={handleChange}
                            placeholder="Enter amenities separated by commas"
                        />
                        <small className="text-muted">Or select from common amenities below:</small>
                        <div className="amenities-checkbox d-flex flex-wrap mt-2 gap-2">
                            {["WiFi", "TV", "Air Conditioning", "Minibar", "View", "Bathtub"].map((item) => (
                                <div className="form-check" key={item} style={{ flex: "0 0 calc(33.333% - 10px)" }}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item}
                                        id={item}
                                        onChange={handleAmenityChange}
                                    />
                                    <label className="form-check-label" htmlFor={item}>
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={roomData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <a href="/manageRooms" className="btn btn-outline-custom btn-outline-secondary">
                            Cancel
                        </a>
                        <button
                            type="submit"
                            className="btn btn-custom"
                            disabled={roomNumberError !== "" || isCheckingRoomNumber}
                        >
                            {isCheckingRoomNumber ? "Checking..." : "Add Room"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AddRoom;
