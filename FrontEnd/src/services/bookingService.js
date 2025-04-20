// src/services/bookingService.js

import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Customer Create New Booking
export const createBooking = (bookingData) => {
  return axios.post(`${API_URL}/bookings`, bookingData);
};

// Customer Get Own Bookings
export const getCustomerBookings = (email) => {
  return axios.get(`${API_URL}/customer/bookings`, { params: { email } });
};

// Customer Cancel a Booking
export const cancelBooking = (id) => {
  return axios.put(`${API_URL}/customer/bookings/${id}/cancel`);
};

// Customer Delete a Booking
export const deleteBooking = (id) => {
  return axios.delete(`${API_URL}/customer/bookings/${id}`);
};
