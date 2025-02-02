import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminNavbar from './components/AdminNavbar';
import SuperadminNavbar from './components/SuperadminNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import NewsEvent from './pages/NewsEvent';
import AdminDashboard from './pages/AdminDashboard';
import SuperadminDashboard from './pages/SuperadminDashboard';
import ControlAdmin from './pages/ControlAdmin';
import History from './pages/History';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // User is logged in if token exists
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    setIsLoggedIn(false);  // Set the login status to false
    navigate('/login');  // Redirect to login page
  };

  const [data, setData] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
  console.log("🔗 VITE_API_URL:", import.meta.env.VITE_API_URL);

  useEffect(() => {
    console.log("🔗 API Call URL:", `${BASE_URL}/api/data`);

    axios.get(`${BASE_URL}`)
      .then(response => setData(response.data))
      .catch(error => console.error("❌ Error fetching data:", error));
  }, [BASE_URL]);

  return (
    <div>
      {isLoggedIn ? (
        role === "superadmin" ? (
          <SuperadminNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        ) : (
          <AdminNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        )
      ) : (
        <Navbar />
      )}
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newsevent" element={<NewsEvent />} />
        <Route path="/controladmin" element={<ControlAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/superadmindashboard" element={<SuperadminDashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
