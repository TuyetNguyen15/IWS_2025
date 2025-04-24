const BASE_URL = "http://localhost:8080";

export const getRoomThumbnail = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return "/assets/images/rooms/01.jpg"; 
  }

  const firstImage = room.images[0];
  if (firstImage.imageData) {
    return `data:image/jpeg;base64,${firstImage.imageData}`;
  }


  if (firstImage.imageUrl) {
    return `${BASE_URL}/${firstImage.imageUrl}`;
  }

  return "/assets/images/rooms/01.jpg";
};


export const getAllRoomImages = (room) => {
  if (!room || !room.images || room.images.length === 0) {
    return ["/assets/images/rooms/02.jpg"]; 
  }

  return room.images.map((img) => {
    if (img.imageData) {
      return `data:image/jpeg;base64,${img.imageData}`;
    }
    if (img.imageUrl) {
      return `${BASE_URL}/${img.imageUrl}`;
    }
    return "/assets/images/rooms/02.jpg"; 
  });
};
