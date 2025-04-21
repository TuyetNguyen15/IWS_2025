import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './pages/home';
import BrowseRoom from "./pages/room/browseRoom";
import RoomDetail from "./pages/room/roomDetail";
import AddRoom from "./pages/room/addNewRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ManageRoom from "./pages/room/manageRoom";
import UpdateRoom from './pages/room/updateRoom';
import MyBooking from "./pages/myBooking";
import ConfirmBooking from "./pages/room/confirmBooking";
import AdminBooking from "./pages/adminBooking"; // đã thêm

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member/home" element={<Profile />} />
        <Route path="/myBooking" element={<MyBooking />} />
        <Route path="/confirmBooking/:roomId" element={<ConfirmBooking />} />
        <Route path="/adminBooking" element={<AdminBooking />} /> {/* ✅ chính xác */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
