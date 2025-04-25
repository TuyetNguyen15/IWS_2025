import axios from "axios";

// Create axios instance with base URL and credentials
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
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

// Forgot Password APIs
export const requestPasswordReset = (email) => {
  return api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
};

export const resetPassword = (token, newPassword) => {
  return api.post(`/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`);
};


//Profile API
export const checkAuth = () => api.get("/member/home");
export const updateProfile = (formData) => {
return api.put("/member/edit-profile", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
};

//Privacy API
export const updatePrivacySettings = (data) => {
  return api.put("/member/privacy", data);
};

// Admin Dashboard APIs
export const fetchDashboardStats = () => api.get("/admin/dashboard/stats");
export const fetchMonthlyRevenue = () => api.get("/admin/dashboard/monthly-revenue");
export const fetchMonthlyBookings = () => api.get("/admin/dashboard/monthly-bookings");
export const fetchTopRooms = () => api.get("/admin/dashboard/top-rooms");


// Rooms API (update your existing roomService.js)
export const fetchRooms = () => api.get("/rooms");
export const fetchRoomById = (id) => api.get(`/rooms/${id}`);

export const checkRoomNumberExists = (roomNumber) => {
  return api.get("/rooms/checkRoomNumber", {
      params: { roomNumber },
  }).then(response => response.data)
    .catch(error => {
      console.error("Error checking room number:", error);
      return false;
    });
};

export const createRoom = (roomData, images) => {
  const formData = new FormData();
  formData.append("room", new Blob([JSON.stringify(roomData)], { type: "application/json" }));

  images.forEach(file => {
      formData.append("images", file);
  });

  return api.post("/rooms", formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
};
export const updateRoom = (id, formData) => {
  return api.put(`/rooms/${id}`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
};
// delete room
export const deleteRoom = (id) => {
  return api.delete(`/rooms/${id}`);
};

export const searchRooms = (checkInDate, checkOutDate, roomType) => {
  return api.get("/rooms/search", {
    params: {
      checkInDate,
      checkOutDate,
      roomType: roomType || null,
    },
  });
};

// review
export const submitReview = (reviewData) => {
  return api.post("/reviews", reviewData);
};
export const fetchReviewsByRoomId = (roomId) => {
  return api.get(`/reviews/room/${roomId}`); 
};
export const fetchAverageRating = (roomId) => {
  return api.get(`/reviews/room/${roomId}/average`);
};