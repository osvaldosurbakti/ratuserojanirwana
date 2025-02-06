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

          <ul className="hidden md:flex space-x-6 font-medium items-center">
            {renderNavLinks()}

            {user && (user.role === "admin" || user.role === "superadmin") && (
              <li className="relative group">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
                >
                  <span>Dashboard</span>
                  <FaChevronDown className="transition transform group-hover:rotate-180" />
                </button>
                {dropdownOpen && (
                  <ul className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48">
                    {user.role === "admin" && (
                      <li>
                        <Link
                          to="/admindashboard"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    {user.role === "superadmin" && (
                      <>
                        <li>
                          <Link
                            to="/superadmindashboard"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Superadmin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/controladmin"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Control Admin
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/history"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            History Admin
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            )}

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
    </>
  );
}

export default Navbar;
