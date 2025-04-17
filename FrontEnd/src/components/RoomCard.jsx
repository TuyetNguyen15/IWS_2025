import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img src={room.photoUrl} alt={room.roomNumber} />
      <div className="room-info">
        <h3>{room.roomType}</h3>
        <p>Số phòng: {room.roomNumber}</p>
        <p>Giá: ${room.roomPrice}/đêm</p>
        <p>Diện tích: {room.roomArea}m²</p>
        <Link to={`/rooms/${room.id}`} className="btn-view-detail">
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;