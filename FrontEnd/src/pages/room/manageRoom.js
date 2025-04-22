import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { fetchRooms, deleteRoom } from "../../services/roomService";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";

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
        <h1 className="text-center mb-4">Manage Rooms</h1>

        <div className="d-flex justify-content-between mb-4">
          <div>
            <Link to="/addRoom" className="add-room d-flex align-items-center gap-2">
              <i className="bi bi-plus-circle"></i> Add Room
            </Link>
          </div>

          <div className="search-box">
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
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
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
                    <td className="text-center">
                      <Link
                        to={`/updateRoom/${room.id}`}
                        className="action-btn"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <Link
                        className="action-btn"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </Link>
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
        <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  );
};

export default ManageRoom;
