import axios from "axios";

const BASE_URL = "http://localhost:8080/api/rooms";
export const fetchRooms = () => axios.get(BASE_URL);
export const fetchRoomById = (id) => axios.get(`${BASE_URL}/${id}`);