import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons
import { Link } from "react-router-dom";


function Contact() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8 mb-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Contact Information
      </h2>

      {/* Deskripsi Singkat */}
      <p className="text-lg text-center text-gray-700 mb-6 px-4">
        We're here to help! Feel free to reach out to us using any of the methods below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Address Section */}
        <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
          <FaMapMarkerAlt className="text-blue-600 text-3xl" />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Address</h3>
            <p className="text-gray-600 text-sm">123 Business Street, Medan</p>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
          <FaPhoneAlt className="text-blue-600 text-3xl" />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
            <p className="text-gray-600 text-sm">+62 812 3456 7890</p>
          </div>
        </div>

        {/* Email Section */}
        <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
          <FaEnvelope className="text-blue-600 text-3xl" />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Email</h3>
            <p className="text-gray-600 text-sm">info@ratuserojanirwana.com</p>
          </div>
        </div>
      </div>

      {/* Jam Operasional */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Operating Hours</h3>
        <p className="text-md text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="text-md text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
        <p className="text-md text-gray-600">Sunday: Closed</p>
      </div>

      {/* Separator */}
      <div className="my-8 border-t-2 border-blue-600 opacity-40"></div>

      {/* Social Media Section */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6 text-2xl text-blue-600">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Contact Us Button */}
      <div className="text-center mt-8">
        <Link
          to="/contact"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:scale-105 hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

export default Contact;
