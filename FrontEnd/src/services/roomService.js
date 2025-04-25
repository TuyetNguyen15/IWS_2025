import api from "./ApiInstance";

export const fetchRooms = () => api.get("/rooms");
export const fetchRoomById = (id) => api.get(`/rooms/${id}`);
export const checkRoomNumberExists = (roomNumber) => {
  return api.get("/rooms/checkRoomNumber", {
    params: { roomNumber },
  }).then(response => response.data)
    .catch(error => {
      console.error("Error checking room number:", error);
      return false;
    });
};
export const createRoom = (roomData, images) => {
  const formData = new FormData();
  formData.append("room", new Blob([JSON.stringify(roomData)], { type: "application/json" }));
  images.forEach(file => {
    formData.append("images", file);
  });

  return api.post("/rooms", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateRoom = (id, formData) => api.put(`/rooms/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);
export const searchRooms = (checkInDate, checkOutDate, roomType) => {
  return api.get("/rooms/search", {
    params: { checkInDate, checkOutDate, roomType: roomType || null },
  });
};
export const submitReview = (reviewData) => api.post("/reviews", reviewData);
export const fetchReviewsByRoomId = (roomId) => api.get(`/reviews/room/${roomId}`);
export const fetchAverageRating = (roomId) => api.get(`/reviews/room/${roomId}/average`);