import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Home from "./components/Home";
import Bookings from "./components/Bookings";
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      <Routes>
        <Route path="/" element={<Home user={user} setShowLogin={setShowLogin} />} />
        <Route path="/bookings" element={<Bookings user={user} />} />
      </Routes>
      {showLogin && <LoginModal setShowLogin={setShowLogin} setUser={setUser} />}
      {showRegister && <RegisterModal setShowRegister={setShowRegister} setUser={setUser} />}
    </BrowserRouter>
  );
}