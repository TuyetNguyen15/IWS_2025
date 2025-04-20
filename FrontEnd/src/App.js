import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import BrowseRoom from "./pages/room/browseRoom";
import RoomDetail from "./pages/room/roomDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
           <Route path="/browseRooms" element={<BrowseRoom />} />
           <Route path="/rooms/:id" element={<RoomDetail />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/member/home" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
