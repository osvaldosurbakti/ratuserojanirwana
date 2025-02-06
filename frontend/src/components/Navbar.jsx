import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout(); // Memanggil fungsi logout dari context
    navigate("/login"); // Redirect ke halaman login setelah logout
  };

  const renderNavLinks = () => {
    const commonLinks = [
      { to: "/", text: "Home" },
      { to: "/about", text: "About" },
      { to: "/newsevent", text: "News & Event" },
      { to: "/service", text: "Service" },
      { to: "/contact", text: "Contact" },
    ];

    const adminLinks = [{ to: "/admindashboard", text: "Dashboard" }];
    const superadminLinks = [
      { to: "/superadmindashboard", text: "Superadmin Dashboard" },
      { to: "/controladmin", text: "Control Admin" },
    ];

    let links = [...commonLinks];
    if (user?.role === "admin") {
      links = [...links, ...adminLinks];
    } else if (user?.role === "superadmin") {
      links = [...links, ...superadminLinks];
    }

    return links.map((link, index) => (
      <li key={index}>
        <Link
          to={link.to}
          className="hover:text-yellow-400 transition duration-300"
          onClick={handleCloseMenu}
        >
          {link.text}
        </Link>
      </li>
    ));
  };

  return (
    <>
      <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-wide">
            <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
              Ratu Seroja Nirwana
            </Link>
          </h1>

          <ul className="hidden md:flex space-x-8 font-medium">
            {renderNavLinks()}
            {user ? (
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
            )}
          </ul>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={handleCloseMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-blue-700 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 shadow-lg`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold">
            <Link to="/" onClick={handleCloseMenu}>
              Ratu Seroja Nirwana
            </Link>
          </h1>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="mt-6 space-y-6 px-6 font-medium">
          {renderNavLinks()}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-lg bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleCloseMenu}
                className="block text-lg bg-green-500 px-4 py-2 rounded-md text-center hover:bg-green-700 transition"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
