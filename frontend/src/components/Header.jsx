import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-center py-24 shadow-lg mt-16 relative">
      {/* Overlay untuk efek blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight text-shadow-md animate__animated animate__fadeIn animate__delay-1s">
          Welcome to <span className="text-yellow-400">Ratu Seroja Nirwana</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold opacity-80 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Your Trusted Partner in Excellence
        </p>

      </div>
    </header>
  );
}

export default Header;
