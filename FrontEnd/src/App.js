import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/home";
import BrowseRoom from "./pages/browseRoom"; // import page BrowseRoom

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browseRooms" element={<BrowseRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
