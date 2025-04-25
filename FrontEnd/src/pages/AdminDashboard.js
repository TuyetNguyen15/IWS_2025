import React, { useEffect, useState } from "react";
import { 
  fetchDashboardStats, 
  fetchMonthlyRevenue, 
  fetchMonthlyBookings, 
  fetchTopRooms, 
  checkAuth
} from "../services/roomService";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid
} from "recharts";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [topRooms, setTopRooms] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const pastelColors = ["#ffd699", "#c2f0c2", "#c9e4f6", "#e0ccff", "#f8d9e7", "#fff6b3", "#b3e5ff", "#d6f5d6"];

  useEffect(() => {
    checkAuth().then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  useEffect(() => {
    fetchDashboardStats().then(res => setStats(res.data));
    fetchMonthlyRevenue().then(res => setMonthlyRevenue(formatChartData(res.data)));
    fetchMonthlyBookings().then(res => setMonthlyBookings(formatChartData(res.data)));
    fetchTopRooms().then(res => setTopRooms(res.data));
  }, []);

  const formatChartData = (data) => Object.entries(data).map(([month, value]) => ({ month, value }));

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="container-fluid flex-grow-1 d-flex px-0">
        {/* Sidebar */}
        <aside className="admin-sidebar d-flex flex-column">
        <div className="text-center mb-4">
          {userInfo?.avatar ? (
            <img
              src={
                userInfo.avatar.startsWith("/images/")
                  ? `http://localhost:8080${userInfo.avatar}`
                  : userInfo.avatar
              }
              alt="Admin Avatar"
              className="rounded-circle"
              style={{ width: 120, height: 120, objectFit: "cover", border: "2px solid white" }}
            />
          ) : (
            <div className="rounded-circle bg-white d-flex justify-content-center align-items-center" style={{ width: 80, height: 80 }}>
              <i className="bi bi-person text-dark fs-3"></i>
            </div>
          )}
          <h6 className="text-white mt-2">{userInfo?.fullName || "Admin"}</h6>
        </div>
          <nav className="nav flex-column">
            <a className="nav-link text-white" href="/member/edit-profile"><i className="bi bi-pencil-square me-2"></i>Edit Profile</a>
            <a className="nav-link text-white" href="/member/privacy"><i className="bi bi-shield-lock-fill me-2"></i>Privacy</a>
            <a className="nav-link text-white" href="/admin/promotions"><i className="bi bi-megaphone-fill me-2"></i>Promotions</a>
            <a className="nav-link text-white" href="/admin/reports"><i className="bi bi-file-earmark-bar-graph me-2"></i>Sale Reports</a>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="p-4 flex-grow-1">
          {/* Stats Row */}
          <div className="row mb-4">
          {[
            { label: "Total Rooms", value: stats.totalRooms, className: "pastel-purple" },
            { label: "Today's Bookings", value: stats.bookingsToday, className: "pastel-yellow" },
            { label: "Total Users", value: stats.totalUsers, className: "pastel-orange" },
            { label: "Occupancy Rate", value: stats.occupancyRate?.toFixed(2) + "%", className: "pastel-green" }
          ].map((item, i) => (
            <div className="col-md-3 mb-3" key={i}>
              <div className={`rounded shadow-sm text-center p-3 ${item.className}`}>
                <h6 className="mb-1">{item.label}</h6>
                <h4 className="fw-bold">{item.value}</h4>
              </div>
            </div>
          ))}
          </div>

          {/* Revenue + Top Rooms Row */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="bg-white p-3 shadow-sm rounded">
                <h5>📈 Monthly Revenue</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyRevenue}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {monthlyRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pastelColors[index % pastelColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white p-3 shadow-sm rounded h-100">
                <h5>🔥 Top 5 Hot Rooms</h5>
                <ol className="list-group list-group-numbered">
                  {topRooms.map((room, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {room.roomNumber}
                      <span className="badge bg-primary rounded-pill">{room.bookings}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Monthly Bookings Line Chart */}
          <div className="row">
            <div className="col-12">
              <div className="bg-white p-3 shadow-sm rounded">
                <h5>📊 Monthly Bookings</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyBookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={pastelColors[3]}
                      strokeWidth={3}
                      dot={{ stroke: pastelColors[5], strokeWidth: 2, r: 5, fill: "#fff" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;