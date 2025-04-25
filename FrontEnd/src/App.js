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
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div className="fade-page"><Home /></div>} />
        <Route path="/browseRooms" element={<div className="fade-page"><BrowseRoom /></div>} />
        <Route path="/rooms/:id" element={<div className="fade-page"><RoomDetail /></div>} />
        <Route path="/addroom" element={<div className="fade-page"><AddRoom /></div>} />
        <Route path="/updateRoom/:id" element={<div className="fade-page"><UpdateRoom /></div>} />
        <Route path="/manageRooms" element={<div className="fade-page"><ManageRoom /></div>} />
        <Route path="/adminHistory" element={<div className="fade-page"><AdminHistory /></div>} /> 
        <Route path="/userHistory" element={<div className="fade-page"><UserHistory /></div>} />
        <Route path="/booking/:bookingId" element={<div className="fade-page"><BookingDetail /></div>} />
        <Route path="/login" element={<div className="fade-page"><Login /></div>} />
        <Route path="/register" element={<div className="fade-page"><Register /></div>} />
        <Route path="/forgot-password" element={<div className="fade-page"><ForgotPassword /></div>} />
        <Route path="/reset-password" element={<div className="fade-page"><ResetPassword /></div>} />
        <Route path="/member/home" element={<div className="fade-page"><Profile /></div>} />
        <Route path="/member/edit-profile" element={<div className="fade-page"><EditProfile /></div>} />
        <Route path="/member/privacy" element={<div className="fade-page"><PrivacySettings /></div>} />
        <Route path="/admin/dashboard" element={<div className="fade-page"><AdminDashboard /></div>} />
        <Route path="/myBooking" element={<div className="fade-page"><MyBooking /></div>} />
        <Route path="/confirmBooking/:roomId" element={<div className="fade-page"><ConfirmBooking /></div>} />
        <Route path="/adminBooking" element={<div className="fade-page"><AdminBooking /></div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
