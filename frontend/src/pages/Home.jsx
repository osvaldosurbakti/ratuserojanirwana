// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ServiceSection from '../components/ServiceSection';
import Contact from '../components/Contact';  // Import the Contact component

function Home() {
  return (
    <div className="bg-gray-100 font-sans text-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-12">
        <About />
      </section>

      {/* Service Section */}
      <section id="services" className="py-12">
        <ServiceSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <Contact />  {/* Add the Contact component here */}
      </section>
    </div>
  );
}

export default Home;
