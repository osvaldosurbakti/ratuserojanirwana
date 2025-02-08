import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function NewsEvents() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Cek status login berdasarkan token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Token tidak valid:", error);
        localStorage.removeItem("token");
      }
    }

    // Fetch berita & acara dari server
    const fetchNewsEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/news-events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNewsEvents(data);
      } catch (error) {
        setErrorMessage("Gagal memuat berita & acara. Cek koneksi atau server!");
      }
    };

    fetchNewsEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      {/* Pesan error jika gagal fetch */}
      {errorMessage && (
        <div className="bg-red-200 text-red-700 p-2 rounded-md text-center mt-4">
          {errorMessage}
        </div>
      )}
  
      {/* Main Content */}
      <main className="mt-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-4">News & Events</h3>
        <p className="text-center text-gray-600 text-lg">Stay updated with the latest news and events</p>
        {newsEvents.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">No News & Events available at the moment.</p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEvents.map((news) => (
              <li key={news._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">{news.title}</h4>
                <p className="text-gray-600 mb-4">{news.description}</p>
                <p className="text-gray-600 font-semibold mb-4">
                  {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                </p>
                {news.eventDate && (
                  <p className="text-sm text-gray-500 mb-4">
                    Date: {new Date(news.eventDate).toLocaleDateString()}
                  </p>
                )}
                {news.image && (
                  <img
                    src={`http://localhost:5001${news.image}`}
                    alt="Event"
                    className="mt-4 w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{new Date(news.createdAt).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
