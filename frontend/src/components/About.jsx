import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="container mx-auto px-6 py-12 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">
        About Us
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8 leading-relaxed">
        Ratu Seroja Nirwana is a leading company in the industry, dedicated to providing the best services and solutions to our clients. 
        With years of experience, we are committed to delivering excellence in every project we handle.
      </p>
      <div className="text-center">
        <Link 
          to="/about" // Update to the correct route if needed
          className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Learn More About Us
        </Link>
      </div>
    </section>
  );
}

export default About;
