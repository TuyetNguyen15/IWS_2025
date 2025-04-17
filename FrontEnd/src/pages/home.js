import React, { useEffect, useState } from "react";
import { fetchRooms } from "../services/roomService";
import Header from "../components/header";
import '../components/styles.css'; // Nhớ import đúng file CSS của bạn

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms()
      .then((res) => {
        const fixedFive = res.data.slice(0, 5); // 🚀 Chỉ lấy 5 phòng đầu tiên
        setRooms(fixedFive);
      })
      .catch((err) => console.error("Lỗi khi tải phòng:", err));
  }, []);

  return (
    <div className="bg-customer">
      <Header />

      <div className="container py-5">
        <h2 className="text-center text-uppercase text-secondary mb-4">Our Choice</h2>
        <h3 className="text-center text-primary mb-5">The best room just for you!</h3>

        {/* Layout bootstrap grid */}
        <div className="row g-3">
          {/* Bên trái: 4 ảnh nhỏ */}
          <div className="col-md-8">
            <div className="row g-3">
              {rooms.slice(0, 4).map((room) => (
                <div key={room.id} className="col-6">
                  <div className="card h-100 nav-item">
                    <div className="position-relative">
                      <img
                        src={`http://localhost:8080/${room.images[1]?.imageUrl}`}
                        alt={`Phòng ${room.roomNumber}`}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      {/* Giá overlay */}
                      <div className="position-absolute top-0 start-0 bg-dark bg-opacity-75 text-white px-2 py-1 small rounded">
                        ${room.roomPrice}/night
                      </div>
                    </div>
                    {/* Tên phòng */}
                    <div className="card-body p-2 text-center">
                      <h6 className="card-title mb-0">{room.roomType}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bên phải: 1 ảnh to */}
          {rooms[4] && (
            <div className="col-md-4">
              <div className="card h-100 nav-item">
                <div className="position-relative">
                  <img
                    src={`http://localhost:8080/${rooms[2].images[0]?.imageUrl}`}
                    alt={`Phòng ${rooms[4].roomNumber}`}
                    className="card-img-top"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  {/* Giá overlay */}
                  <div className="position-absolute top-0 start-0 bg-dark bg-opacity-75 text-white px-2 py-1 small rounded">
                    ${rooms[4].roomPrice}/night
                  </div>
                </div>
                {/* Tên phòng */}
                <div className="card-body p-2 text-center">
                  <h5 className="card-title mb-0">{rooms[4].roomType}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
