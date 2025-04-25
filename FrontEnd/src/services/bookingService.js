import api from "./ApiInstance"; // dùng chung API instance đã config

// ---------------------- CUSTOMER API ----------------------

// Customer: Create New Booking
export const createBooking = (bookingData) => {
  return api.post(`/bookings`, bookingData);
};

// Customer: Get Own Bookings
export const getCustomerBookings = (userName) => {
  return api.get(`/customer/bookings`, { params: { userName } });
};

// Customer: Cancel a Booking
export const cancelBooking = (id) => {
  return api.put(`/customer/bookings/${id}/cancel`);
};

// Customer: Delete a Booking
export const deleteBooking = (id) => {
  return api.delete(`/customer/bookings/${id}`);
};

// ---------------------- ADMIN API ----------------------

// Admin: Get All Bookings
export const getAllBookings = () => {
  return api.get(`/admin/bookings`);
};

// Admin: Update Booking Status (Confirm / Cancel)
export const updateBookingStatus = (id, status) => {
  return api.put(`/admin/bookings/${id}/status?status=${status}`);
};

// Admin: Delete a Booking
export const deleteAdminBooking = (id) => {
  return api.delete(`/admin/bookings/${id}`);
};