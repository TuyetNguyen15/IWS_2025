const BASE_URL = "http://localhost:8080";

/**
 * Get thumbnail for a room
 * Prioritize base64 imageData if available
 */
export const getRoomThumbnail = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return "/assets/images/rooms/01.jpg"; // fallback ảnh mặc định
  }

  const firstImage = room.images[0];
  
  // Nếu có imageData base64 thì ưu tiên
  if (firstImage.imageData) {
    return `data:image/jpeg;base64,${firstImage.imageData}`;
  }

  // Nếu chỉ có imageUrl thì load từ server
  if (firstImage.imageUrl) {
    return `${BASE_URL}/${firstImage.imageUrl}`;
  }

  return "/assets/images/rooms/01.jpg";
};

/**
 * Get all images for a room
 * Prioritize base64 imageData if available
 */
export const getAllRoomImages = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return ["/assets/images/rooms/02.jpg"]; // fallback nếu không có ảnh
  }

  return room.images.map((img) => {
    if (img.imageData) {
      return `data:image/jpeg;base64,${img.imageData}`;
    }
    if (img.imageUrl) {
      return `${BASE_URL}/${img.imageUrl}`;
    }
    return "/assets/images/rooms/02.jpg"; // fallback nếu 1 ảnh nào đó bị lỗi
  });
};
