import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  // Array of image paths
  const images = [
    '/images/kons1.jpeg', // Path from public folder
    '/images/kons2.jpeg',
    '/images/kons3.jpeg',
  ];

  // State untuk melacak indeks gambar yang sedang ditampilkan
  const [currentImage, setCurrentImage] = useState(0);

  // Ubah gambar setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Ganti gambar setiap 3000 ms = 3 detik

    // Bersihkan interval ketika komponen dibersihkan
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${images[currentImage]})`, // Menampilkan gambar sesuai indeks
      }}
    >
      {/* Gradient Overlay untuk membuat teks lebih terlihat */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Konten di tengah gambar */}
      <div className="text-center text-white relative z-10 px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Ratu Seroja Nirwana
        </h1>

        {/* Tombol yang mengarah ke /service */}
        <Link to="/service"
          className="bg-yellow-500 text-blue-900 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
        >
          Explore Our Services
        </Link>
      </div>
    </div>
  );
}

export default Hero;
