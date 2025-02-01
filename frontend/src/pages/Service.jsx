// src/pages/Service.jsx
import React from 'react';
import { Link } from "react-router-dom";


function Service() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-700">Our Premium Services</h2>
        <p className="mt-4 text-lg text-gray-500">
          Discover the services that make us the best in the industry. Tailored to meet your specific
          business needs.
        </p>
      </div>

      {/* Service Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Consulting</h3>
          <p className="text-lg text-black">
            Transform your business strategies with expert insights and solutions tailored to your needs.
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 text-black shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Project Management</h3>
          <p className="text-lg text-black">
            Streamline your projects with our professional management services ensuring success on time.
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-black shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Support Services</h3>
          <p className="text-lg text-black">
            Keep your business operations running smoothly with our reliable ongoing support.
          </p>
        </div>
      </div>

      {/* Section for Additional Information */}
      <div className="mt-16 bg-blue-300 rounded-lg p-8 shadow-md">
        <h3 className="text-3xl font-semibold text-center text-indigo-700">Why Choose Us?</h3>
        <p className="mt-4 text-lg text-center text-gray-600">
          Our unique approach combines innovation with expertise to ensure you achieve more, faster, and with less hassle.
        </p>
        <div className="flex justify-center mt-6">
        <Link to="/contact"
        className="text-white bg-blue-600 py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
    >
        Get In Touch
      </Link>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-semibold text-center text-gray-800">What Our Clients Say</h3>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-full sm:w-80 text-center">
            <p className="text-lg text-gray-600 italic">"Their consulting helped us optimize our processes and drive growth!"</p>
            <p className="mt-4 font-semibold text-indigo-600">Sarah Lee</p>
            <p className="text-sm text-gray-500">Founder, Tech Innovators</p>
          </div>
          <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-full sm:w-80 text-center">
            <p className="text-lg text-gray-600 italic">"Project management expertise from their team was key to finishing our project ahead of schedule."</p>
            <p className="mt-4 font-semibold text-indigo-600">Chris Martin</p>
            <p className="text-sm text-gray-500">PMO, Global Enterprises</p>
          </div>
          <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-full sm:w-80 text-center">
            <p className="text-lg text-gray-600 italic">"The support they provide is indispensable for the smooth operation of our business."</p>
            <p className="mt-4 font-semibold text-indigo-600">Emma Watson</p>
            <p className="text-sm text-gray-500">COO, Fast Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
