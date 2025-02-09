import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './context/ScrollToTop';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  const [data, setData] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then(response => setData(response.data))
      .catch(error => console.error("❌ Error fetching data:", error));
  }, [BASE_URL]);

  return (
    <div>
      <Navbar />
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newsevent" element={<NewsEvent />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/controladmin"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <ControlAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmindashboard"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperadminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;