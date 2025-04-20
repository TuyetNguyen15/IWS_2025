import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { fetchRooms,deleteRoom } from "../../services/roomService";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination"; 

const ManageRoom = () => {
    const [roomList, setRoomList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 2; 

    useEffect(() => {
        fetchRooms()
            .then((response) => {
                setRoomList(response.data);
            })
            .catch((err) => console.error("Error loading rooms", err));
    }, []);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = roomList.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(roomList.length / roomsPerPage);

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
    
    return (
        <div className="app-wrapper d-flex flex-column min-vh-100">
            <Header />
            <div className=" container  py-4 flex-grow-1">
                <h1 className="text-center mb-4">Manage Rooms</h1>

                <div className="d-flex justify-content-between mb-4">
                    <div className="">
                        <Link to="/addRoom" className="add-room d-flex align-items-center gap-2">
                            <i className="bi bi-plus-circle"></i> Add Room
                        </Link>
                    </div>


                    <div className="search-box">
                        <form>
                            <div className="input-group" style={{ width: "400px" }}>
                                <input type="text" name="search" className="form-control" placeholder="Search by ID" />
                                <button className="btn " type="submit">
                                <i class="bi bi-search"></i> Search
                                </button>
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
                                                <i class="bi bi-pencil-square"></i> Edit
                                            </Link>
                                            <Link className="action-btn"   onClick={() => handleDeleteRoom(room.id)}>
                                            <i class="bi bi-trash-fill"></i>  Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No rooms found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />

            </div>
        </div>
    );
};

export default ManageRoom;
