import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { fetchRooms, deleteRoom } from "../../services/roomService";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import "../../components/styles.css";

const ManageRoom = () => {
  const [roomList, setRoomList] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 2;

  useEffect(() => {
    fetchRooms()
      .then((response) => {
        setRoomList(response.data);
        setFilteredRooms(response.data);
      })
      .catch((err) => console.error("Error loading rooms", err));
  }, []);

  useEffect(() => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = roomList.filter((room) =>
      Object.values(room)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
    setFilteredRooms(filtered);
    setCurrentPage(1);
  }, [searchKeyword, roomList]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(id);
        alert("Room deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete room!");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <div className="container py-4 flex-grow-1">

        {/* Tiêu đề căn giữa */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">Manage Rooms</h1>
        </div>

        {/* Tìm kiếm & Thêm phòng */}
        <div className="d-flex justify-content-between mb-4">
          <Link to="/addRoom" className="add-room d-flex align-items-center gap-2">
            <i className="bi bi-plus-circle"></i> Add Room
          </Link>

          <form onSubmit={handleSearchSubmit}>
            <div className="input-group" style={{ width: "400px" }}>
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search by anything..."
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>

        {/* Bảng hiển thị phòng */}
        <div className="table-responsive">
          <table className="table table-bordered text-center table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.length > 0 ? (
                currentRooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>${room.roomPrice}</td>
                    <td>
                      <Link to={`/updateRoom/${room.id}`} className="action-btn me-3">
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <span className="action-btn" onClick={() => handleDeleteRoom(room.id)}>
                        <i className="bi bi-trash-fill"></i> Delete
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No rooms found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ManageRoom;
