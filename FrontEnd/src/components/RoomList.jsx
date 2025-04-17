import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, title }) => {
  return (
    <section className="room-section">
      <h2>{title}</h2>
      <div className="room-list">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default RoomList;