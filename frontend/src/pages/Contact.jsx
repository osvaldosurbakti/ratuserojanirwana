import React, { useState } from 'react';


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-900 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">Contact Us</h2>
        <p className="text-lg text-center max-w-2xl mx-auto text-gray-700 mb-12">
          We’d love to hear from you! Reach out to us through the form below or use the contact information provided. Let’s stay connected.
        </p>
          {/* Contact Information */}
          <div className="bg-gray-300 shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Our Contact Info</h3>
            <p className="mb-4 text-gray-600">
              If you have any questions or need assistance, feel free to contact us directly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <p className="text-gray-600">123 Business Street, Jakarta</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">
                  <i className="fas fa-phone"></i>
                </span>
                <p className="text-gray-600">+62 812 3456 7890</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">
                  <i className="fas fa-envelope"></i>
                </span>
                <p className="text-gray-600">info@ratuserojanirwana.com</p>
              </div>
            </div>

            <div className="mt-6">
              <iframe
                className="w-full h-48 rounded-lg shadow-sm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19861.67699420494!2d106.8271537!3d-6.1751107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjYuMyJTIDEwNsKwNDknMzguMiJF!5e0!3m2!1sen!2sid!4v1612324039928!5m2!1sen!2sid"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Contact;
