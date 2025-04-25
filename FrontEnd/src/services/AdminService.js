import api from "./ApiInstance";

export const fetchDashboardStats = () => api.get("/admin/dashboard/stats");
export const fetchMonthlyRevenue = () => api.get("/admin/dashboard/monthly-revenue");
export const fetchMonthlyBookings = () => api.get("/admin/dashboard/monthly-bookings");
export const fetchTopRooms = () => api.get("/admin/dashboard/top-rooms");