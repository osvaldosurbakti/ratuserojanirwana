// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      {/* Main Footer Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Ratu Seroja Nirwana</h2>
          <p className="text-sm max-w-md">
            Delivering excellence and trusted solutions for your business.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-6 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-4 text-center">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-yellow-300 transition duration-300">
                Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 md:mt-0 flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-yellow-300 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-yellow-300 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-yellow-300 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-700 py-4">
        <p className="text-center text-sm">
          &copy; 2025 Ratu Seroja Nirwana. All rights reserved.

        </p>
      </div>
    </footer>
  );
}

export default Footer;
