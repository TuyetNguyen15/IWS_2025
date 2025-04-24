import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRooms } from "../services/roomService"; 
const SearchBox = ({ redirect = false, onSearchResults }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState("");
  
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (redirect) {
      navigate("/browseRooms", {
        state: {
          checkInDate,
          checkOutDate,
          roomType,
        },
      });
    } else {
      try {
        const response = await searchRooms(checkInDate, checkOutDate, roomType);
        onSearchResults(response.data);
      } catch (error) {
        console.error("Error searching rooms:", error);
        alert("An error occurred while searching for rooms.");
      }
    }
  };
  
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.inputsRow}>
          <div style={styles.field}>
            <label style={styles.label}>Check-in Date:</label>
            <input
              type="date"
              value={checkInDate}
              min={today}
              onChange={(e) => setCheckInDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Check-out Date:</label>
            <input
              type="date"
              value={checkOutDate}
              min={today}
              onChange={(e) => setCheckOutDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Room Type:</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a room types</option>
              <option value="Standard Room">Standard Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Superior Room">Superior Room</option>
                  <option value="Family Room">Family Room</option>
                  <option value="Couple Simple Room">Couple Simple Room</option>
            </select>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
   
    marginBottom: "20px",
  },
  container: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "900px",
  },
  inputsRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "150px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
    fontSize: "14px",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "10px 40px",
    backgroundColor: "#5c3d0d", 
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    height: "45px",
  },
};

export default SearchBox;