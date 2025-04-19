import axios from "axios";

// Create axios instance with base URL and credentials
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true, // Important for session cookies
    headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle CSRF if needed
api.interceptors.request.use((config) => {
  // You can add CSRF token here if your backend requires it
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (redirect to login)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (credentials) => {
    // Sử dụng FormData thay vì JSON để phù hợp với Spring Security mặc định
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
  
    return api.post('/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  };
export const logout = () => api.post("/logout");
export const register = (userData) => api.post("/auth/register", userData);
export const checkAuth = () => api.get("/member/home");

// Rooms API (update your existing roomService.js)
export const fetchRooms = () => api.get("/rooms");
export const fetchRoomById = (id) => api.get(`/rooms/${id}`);