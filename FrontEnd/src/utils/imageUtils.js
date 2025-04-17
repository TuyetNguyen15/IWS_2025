

const BASE_URL = "http://localhost:8080";
export const getRoomThumbnail = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return "/assets/images/no-image-available.png";
  }
  return `${BASE_URL}/${room.images[0].imageUrl}`;
};
export const getAllRoomImages = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return ["/assets/images/no-image-available.png"];
  }
  return room.images.map((img) => `${BASE_URL}/${img.imageUrl}`);
};
