import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

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
            <li><Link to="/" className="hover:text-yellow-400 transition duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition duration-300">About</Link></li>
            <li><Link to="/newsevent" className="hover:text-yellow-400 transition duration-300">News & Event</Link></li>
            <li><Link to="/service" className="hover:text-yellow-400 transition duration-300">Service</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition duration-300">Contact</Link></li>
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
          <li>
            <Link
              to="/"
              onClick={handleCloseMenu}
              className="block text-lg hover:text-yellow-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={handleCloseMenu}
              className="block text-lg hover:text-yellow-400 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/service"
              onClick={handleCloseMenu}
              className="block text-lg hover:text-yellow-400 transition duration-300"
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              to="/newsevent"
              onClick={handleCloseMenu}
              className="block text-lg hover:text-yellow-400 transition duration-300"
            >
              News & Event
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={handleCloseMenu}
              className="block text-lg hover:text-yellow-400 transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
