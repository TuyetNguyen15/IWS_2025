import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/home";
import MyBooking from "./pages/myBooking"; // <-- thêm dòng này

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooking" element={<MyBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
