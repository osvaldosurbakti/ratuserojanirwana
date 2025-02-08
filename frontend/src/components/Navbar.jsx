import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Render common navigation links
  const renderNavLinks = () => {
    const commonLinks = [
      { to: "/", text: "Home" },
      { to: "/about", text: "About" },
      { to: "/newsevent", text: "News & Event" },
      { to: "/service", text: "Service" },
      { to: "/contact", text: "Contact" },
    ];

    return commonLinks.map((link, index) => (
      <li key={index}>
        <Link
          to={link.to}
          className="hover:text-yellow-400 transition-colors duration-300"
          onClick={handleCloseMenu}
        >
          {link.text}
        </Link>
      </li>
    ));
  };

  // Render admin/superadmin dashboard links
  const renderAdminLinks = () => {
    if (user?.role === "admin") {
      return (
        <li>
          <Link
            to="/admindashboard"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setDropdownOpen(false)}
          >
            Admin Dashboard
          </Link>
        </li>
      );
    }

    if (user?.role === "superadmin") {
      return (
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300 focus:outline-none"
          >
            <span>Dashboard</span>
            <FaChevronDown className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-56">
              <li>
                <Link
                  to="/superadmindashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Superadmin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/controladmin"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Control Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/admindashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Manage News & Events
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  History Admin
                </Link>
              </li>
            </ul>
          )}
        </li>
      );
    }

    return null;
  };

  // Render authentication buttons
  const renderAuthButtons = () => {
    return user ? (
      <li>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </li>
    ) : (
      <li>
        <Link
          to="/login"
          className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-700 transition"
        >
          Login
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold tracking-wide">
            <Link to="/" className="hover:text-yellow-400 transition duration-300">
              Ratu Seroja Nirwana
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 font-medium items-center">
            {renderNavLinks()}
            {renderAdminLinks()}
            {renderAuthButtons()}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none z-50 fixed top-5 right-5"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseMenu}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          >
            <FaTimes />
          </button>

          {/* Mobile Links */}
          <ul className="mt-12 space-y-4 text-lg font-medium px-6">
            {renderNavLinks()}
            {user && (
              <div className="border-t border-gray-500 pt-4">
                {user.role === "admin" && (
                  <Link to="/admindashboard" className="block hover:text-yellow-400" onClick={handleCloseMenu}>
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "superadmin" && (
                  <>
                    <Link to="/superadmindashboard" className="block hover:text-yellow-400" onClick={handleCloseMenu}>
                      Superadmin Dashboard
                    </Link>
                    <Link to="/history" className="block hover:text-yellow-400" onClick={handleCloseMenu}>
                      History
                    </Link>
                    <Link to="/admindashboard" className="block hover:text-yellow-400" onClick={handleCloseMenu}>
                      Manage News & Events
                    </Link>
                    <Link to="/controladmin" className="block hover:text-yellow-400" onClick={handleCloseMenu}>
                      Control Admin
                    </Link>
                  </>
                )}
              </div>
            )}
            {renderAuthButtons()}
          </ul>
        </div>
      </nav>

      {/* Overlay for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={handleCloseMenu}
        />
      )}
    </>
  );
}

export default Navbar;