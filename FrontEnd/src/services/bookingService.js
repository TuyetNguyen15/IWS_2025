// src/services/bookingService.js

import axios from "axios";

const API_URL = "http://localhost:8080/api";

// ✅ Tạo axios instance có bật gửi cookie session
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ---------------------- CUSTOMER API ----------------------

// Customer: Create New Booking
export const createBooking = (bookingData) => {
  return axiosInstance.post(`/bookings`, bookingData);
};

// Customer: Get Own Bookings
export const getCustomerBookings = (email) => {
  return axiosInstance.get(`/customer/bookings`, { params: { email } });
};

// Customer: Cancel a Booking
export const cancelBooking = (id) => {
  return axiosInstance.put(`/customer/bookings/${id}/cancel`);
};

// Customer: Delete a Booking
export const deleteBooking = (id) => {
  return axiosInstance.delete(`/customer/bookings/${id}`);
};

// ---------------------- ADMIN API ----------------------

// Admin: Get All Bookings
export const getAllBookings = () => {
  return axiosInstance.get(`/admin/bookings`);
};

// Admin: Update Booking Status (Confirm / Cancel) 🚀 CHỈNH Ở ĐÂY
export const updateBookingStatus = (id, status) => {
  return axiosInstance.put(`/admin/bookings/${id}/status?status=${status}`);
};

// Admin: Delete a Booking
export const deleteAdminBooking = (id) => {
  return axiosInstance.delete(`/admin/bookings/${id}`);
};
