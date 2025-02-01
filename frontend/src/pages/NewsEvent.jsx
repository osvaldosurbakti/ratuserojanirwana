import { useState, useEffect } from "react";

export default function NewsEvents() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);

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

    // Fetch data berita & acara (simulasi)
    const fetchNewsEvents = async () => {
      const fakeData = [
        { id: 1, title: "Event A", description: "Deskripsi acara A" },
        { id: 2, title: "Event B", description: "Deskripsi acara B" },
      ];
      setNewsEvents(fakeData);
    };

    fetchNewsEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-center space-x-4">
        {userRole === "admin" && <a href="/admin" className="hover:underline">Admin Dashboard</a>}
        {userRole === "superadmin" && <a href="/superadmin" className="hover:underline">Superadmin Dashboard</a>}
        {userRole ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <a href="/login" className="hover:underline">Login</a>
        )}
      </nav>

      {/* Main Content */}
      <main className="mt-6">
        <h3 className="text-2xl font-semibold text-center">Berita & Acara</h3>
        {newsEvents.length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada berita & acara.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {newsEvents.map((news) => (
              <li key={news.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">{news.title}</h4>
                <p className="text-gray-600">{news.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
