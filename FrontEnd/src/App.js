import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './pages/Home';
import BrowseRoom from "./pages/room/BrowseRoom";
import RoomDetail from "./pages/room/RoomDetail";
import AddRoom from "./pages/room/AddNewRoom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import PrivacySettings from './pages/profile/PrivacySettings';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ManageRoom from "./pages/room/ManageRoom";
import UpdateRoom from './pages/room/UpdateRoom';
import MyBooking from "./pages/booking/MyBooking";
import ConfirmBooking from "./pages/booking/ConfirmBooking";
import AdminBooking from "./pages/booking/AdminBooking";
import AdminHistory from './pages/booking/AdminHistory';
import UserHistory from './pages/booking/UserHistory';
import BookingDetail from './pages/booking/BookingDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browseRooms" element={<BrowseRoom />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/updateRoom/:id" element={<UpdateRoom />} />
        <Route path="/manageRooms" element={<ManageRoom />} />
        <Route path="/adminHistory" element={<AdminHistory />} /> 
        <Route path="/userHistory" element={<UserHistory />} />
        <Route path="/booking/:bookingId" element={<BookingDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/member/home" element={<Profile />} />
        <Route path="/member/edit-profile" element={<EditProfile />} />
        <Route path="/member/privacy" element={<PrivacySettings />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/myBooking" element={<MyBooking />} />
        <Route path="/confirmBooking/:roomId" element={<ConfirmBooking />} />
        <Route path="/adminBooking" element={<AdminBooking />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;