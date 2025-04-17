import axios from "axios";

export const fetchRooms = () => {
  return axios.get("http://localhost:8080/api/home");
};
