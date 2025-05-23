import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import { fetchRooms, searchRooms } from "../../services/RoomService"; 
import { getRoomThumbnail } from "../../utils/ImageUtils";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

const BrowseRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const roomsPerPage = 2;

  useEffect(() => {
    const searchParams = location.state;

    if (searchParams && searchParams.checkInDate && searchParams.checkOutDate) {
      searchRooms(searchParams.checkInDate, searchParams.checkOutDate, searchParams.roomType)
        .then((response) => {
          setRooms(response.data);
          setFilteredRooms(response.data);
          setCurrentPage(1);
        })
        .catch((error) => console.error("Search error:", error));
    } else {
      fetchRooms()
        .then((response) => {
          setRooms(response.data);
          setFilteredRooms(response.data);
          setCurrentPage(1);
        })
        .catch((error) => console.error("Load rooms error:", error));
    }
  }, [location.state]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSearchResults = (results) => {
    setFilteredRooms(results);
    setCurrentPage(1);
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100 fade-page">
      <Header />
      <SearchBox onSearchResults={handleSearchResults} />
      <div className="container my-4 flex-grow-1">
        <h1 className="text-center mb-4">Browse Rooms</h1>
        <div className="row">
          {currentRooms.length > 0 ? (
            currentRooms.map((room) => (
              <div className="col-md-3 my-4" key={room.id}>
                <div className="room-cardb">
                  <img
                    src={getRoomThumbnail(room)}
                    alt={`Room ${room.roomNumber}`}
                    className="room-img"
                  />
                  <div className="content">
                    <Link to={`/rooms/${room.id}`} className="h4 text-decoration-none">{room.roomType}</Link>
                    <p>{room.description}</p>
                    <div className="room-features flex justify-between w-full gap-4">
                      <div className="flex flex-1 items-center p-2 text-center border rounded-md">
                        <i className="fas fa-user-friends"></i>
                        <span className="text-xs">{room.roomCapacity} Guests</span>
                      </div>
                      <div
                        className="flex flex-1 items-center p-2 text-center border rounded-md"
                        style={{ width: "100px" }}
                      >
                        <i className="fas fa-ruler-combined mb-2 text-lg"></i>
                        <span className="text-xs font-medium">{room.roomArea} m²</span>
                      </div>
                    </div>
                    <div className="price">${room.roomPrice}</div>
                    <div className="text-center mt-2">
<<<<<<< HEAD
                      {isUser && (
                        <Link to={`/confirmBooking/${room.id}`} className="btn w-100">
                          Book Now
                        </Link>
                      )}
=======
                      <Link
                        to={`/confirmBooking/${room.id}`}
                        className="btn w-100"
                        title="Proceed to book this room"
                      >
                        Book Now
                      </Link>
>>>>>>> 64c944bcdd9b209401ac0aeb3426ae3f819f2e2c
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              <h5>No rooms found.</h5>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseRoom;
