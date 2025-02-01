import React from 'react';
import { Link } from "react-router-dom";


function About() {
  return (
    <div className="bg-gradient-to-r from-blue-100 font-sans text-gray-900 py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading Section */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-8 md:mb-12">
          About Us
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-8 sm:mb-12 text-gray-600">
          At Ratu Seroja Nirwana, we are committed to delivering innovative solutions that empower businesses to grow. 
          Our team of professionals brings expertise across various sectors, ensuring top-tier service and results.
        </p>

        {/* Team Section */}
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 mb-6 md:mb-8">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12 md:mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-50">
            <img
              src="../images/ceo.jpeg"
              alt="John Doe"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 transition duration-300 ease-in-out hover:grayscale"
            />
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">John Doe</h4>
            <p className="text-gray-500 text-sm sm:text-base">Chief Executive Officer</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-50">
            <img
              src="../images/ceo.jpeg"
              alt="Jane Smith"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 transition duration-300 ease-in-out hover:grayscale"
            />
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Jane Smith</h4>
            <p className="text-gray-500 text-sm sm:text-base">Chief Technology Officer</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-50">
            <img
              src="../images/ceo.jpeg"
              alt="Alice Johnson"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 transition duration-300 ease-in-out hover:grayscale"
            />
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Alice Johnson</h4>
            <p className="text-gray-500 text-sm sm:text-base">Chief Financial Officer</p>
          </div>
        </div>

        {/* Company Timeline Section */}
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 mb-6 md:mb-8">Our Journey</h3>
        <div className="space-y-8 sm:space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <div className="bg-blue-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-800 transition duration-500">
                <h4 className="text-lg sm:text-xl font-semibold">2020</h4>
                <p>We founded Ratu Seroja Nirwana to drive innovation in the business world.</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="bg-blue-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-800 transition duration-500">
                <h4 className="text-lg sm:text-xl font-semibold">2021</h4>
                <p>Our first major product launch, marking a new era for the company.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <div className="bg-blue-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-800 transition duration-500">
                <h4 className="text-lg sm:text-xl font-semibold">2022</h4>
                <p>We introduced new services to better cater to our client's needs.</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="bg-blue-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-blue-800 transition duration-500">
                <h4 className="text-lg sm:text-xl font-semibold">2023</h4>
                <p>We expanded our operations to international markets, growing rapidly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 mb-6 md:mb-8 mt-12">Contact Us</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-16 mb-12 md:mb-16">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-600">Email:</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-600 flex items-center justify-center gap-2">
              <i className="fas fa-envelope"></i>info@ratuserojanirwana.com
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-600">Phone:</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-600 flex items-center justify-center gap-2">
              <i className="fas fa-phone-alt"></i>(123) 456-7890
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-600">Address:</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-600 flex items-center justify-center gap-2">
              <i className="fas fa-map-marker-alt"></i>Jl. Example No.123, Medan, Indonesia
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center mt-12">
          <Link to="/contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            Contact Us Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
