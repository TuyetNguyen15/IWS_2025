import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRoomById, updateRoom, checkRoomNumberExists } from "../../services/RoomService";
import Header from "../../components/header";
import { getAllRoomImages } from "../../utils/ImageUtils";

function UpdateRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [originalRoomNumber, setOriginalRoomNumber] = useState(""); // lưu phòng ban đầu
    const [roomNumberError, setRoomNumberError] = useState("");
    const [isCheckingRoomNumber, setIsCheckingRoomNumber] = useState(false);
    const [oldImages, setOldImages] = useState([]);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        async function loadRoom() {
            try {
                const res = await fetchRoomById(id);
                const room = res.data;
                setRoomData({
                    roomNumber: room.roomNumber,
                    roomType: room.roomType,
                    roomPrice: room.roomPrice,
                    status: room.status,
                    description: room.description,
                    roomArea: room.roomArea,
                    roomCapacity: room.roomCapacity,
                    amenities: room.amenities,
                });
                setOriginalRoomNumber(room.roomNumber);
                setOldImages(room.images || []);
            } catch (error) {
                console.error("Failed to load room", error);
            }
        }
        loadRoom();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoomNumberChange = async (e) => {
        const { value } = e.target;
        setRoomData(prev => ({ ...prev, roomNumber: value }));

        if (value.trim() === "") {
            setRoomNumberError("Room number is required.");
            return;
        }

        setIsCheckingRoomNumber(true);
        try {
            const exists = await checkRoomNumberExists(value.trim());
            if (exists && value.trim() !== originalRoomNumber) {
                setRoomNumberError("Room number already exists!");
            } else {
                setRoomNumberError("");
            }
        } catch (error) {
            console.error("Error checking room number:", error);
            setRoomNumberError("Failed to check room number");
        } finally {
            setIsCheckingRoomNumber(false);
        }
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages(prev => [...prev, ...newFiles]);
        const previews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...previews]);
    };
    const handleRemoveOldImage = (index) => {
        setOldImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("room", new Blob([JSON.stringify(roomData)], { type: "application/json" }));
        oldImages.forEach(img => formData.append("keepImageIds", img.id));
        images.forEach(file => formData.append("images", file));

        try {
            await updateRoom(id, formData);
            alert("Room updated successfully!");
            navigate("/browseRooms");
        } catch (error) {
            console.error("Error updating room", error);
            alert("Failed to update room");
        }
    };

    return (
        <div className="">
            <Header />
            <div className="container py-5">
                <div className="room-form-container bg-white p-4 rounded shadow-sm">
                    <h2 className="form-title text-center mb-4">Edit Room</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                    onChange={handleRoomNumberChange}
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
                        </div>

                        {/* Old images */}
                        <h5>Old Images:</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {getAllRoomImages({ images: oldImages }).map((src, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={src}
                                        alt={`old-${index}`}
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOldImage(index)}
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
                                            cursor: "pointer",
                                        }}
                                    >×</button>
                                </div>
                            ))}
                        </div>

                        {/* Upload new images */}
                        <h5 className="mt-4">Upload New Images:</h5>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {previewImages.map((src, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={src}
                                        alt="new"
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
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
                                            cursor: "pointer",
                                        }}
                                    >×</button>
                                </div>
                            ))}
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
                                {isCheckingRoomNumber ? "Checking..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateRoom;
