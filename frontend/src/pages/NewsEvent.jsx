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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Pesan error jika gagal fetch */}
      {errorMessage && (
        <div className="bg-red-200 text-red-700 p-2 rounded-md text-center mt-4">
          {errorMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="mt-6">
        <h3 className="text-2xl font-semibold text-center">News & Events</h3>
        {newsEvents.length === 0 ? (
          <p className="text-center text-gray-600">No News & Events.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {newsEvents.map((news) => (
              <li key={news._id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">{news.title}</h4>
                <p className="text-gray-600">{news.description}</p>
                <p className="text-gray-600">{news.category.charAt(0).toUpperCase() + news.category.slice(1)}</p>
                {news.eventDate && <p className="text-sm text-gray-500">Tanggal: {new Date(news.eventDate).toLocaleDateString()}</p>}
                {news.image && <img src={`http://localhost:5001${news.image}`} alt="Event" className="mt-2 w-full h-40 object-cover rounded-md" />
              }
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
