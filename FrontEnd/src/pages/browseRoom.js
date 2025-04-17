import React, { useEffect, useState } from "react";
import { fetchRooms } from "../services/roomService";
import { getRoomThumbnail } from "../utils/imageUtils";
import Header from "../components/header";
const BrowseRoom = () => {
    const [rooms, setRoom] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 2;
    useEffect(() => {
        fetchRooms()
            .then(response => {
                setRoom(response.data);
            }).catch((err) => console.error("load data err", err))
    }, []);
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="my-4 text-center">Browse Rooms</h1>
                <div className="row">
                    {currentRooms.map((room) =>
                        <div className="col-md-3 my-4" key={room.id}>
                            <div className="room-cardb ">
                                <img src={getRoomThumbnail(room)}
                                    alt={`Room ${room.roomNumber}`}
                                    className="room-img" />
                                <div className="content">
                                    <h3 typeof="text">{room.roomType}</h3>
                                    <p > {room.description}</p>
                                    <div className="room-features flex justify-between w-full gap-4">
                                        <div className="flex flex-1  items-center p-2 text-center  border rounded-md">
                                            <i className="fas fa-user-friends "></i>
                                            <span className="text-xs"> {room.roomCapacity} Guests</span>
                                        </div>

                                        <div className="flex flex-1  items-center p-2 text-center  border rounded-md"
                                            style={{ width: '100px' }}>
                                            <i className="fas fa-ruler-combined mb-2 text-lg"></i>
                                            <span className="text-xs  font-medium"> {room.roomArea} m²</span>
                                        </div>
                                    </div>

                                    <div className="price">${room.roomPrice}</div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <button to={`/rooms/${room.id}`} className="btn" style={{ backgroundColor: "#edeaea", color: "#a5a5a5", }}>Details</button>
                                        <button className="btn">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )}
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center my-4 gap-2">

                {[...Array(totalPages).keys()].map(number => (
                    <span
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '36px',
                            color: currentPage === number + 1 ? '#794b31' : '#ccc',
                            margin: '0 5px',
                        }}
                    >
                        &bull;
                    </span>
                ))}
            </div>

        </div>

    )
}
export default BrowseRoom;