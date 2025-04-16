import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  // Gọi API khi component được mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/home") // Đảm bảo API này trả về đúng dữ liệu
      .then((res) => {
        console.log(res.data); // Kiểm tra dữ liệu trả về từ API
        setRooms(res.data);
      })
      .catch((err) => {
        console.error("Lỗi gọi API:", err);
      });
  }, []);

  return (
    <div>
      <h2>Danh sách phòng</h2>
      <ul>
        {rooms.length === 0 ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          rooms.map((room) => (
            <li key={room.id}>
              ID: {room.id} - Phòng: {room.roomNumber}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
