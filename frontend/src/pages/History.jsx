import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch history data when the component is mounted
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5001/api/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const historyData = await response.json();
        setHistory(historyData);
      } catch (error) {
        console.error('Error fetching history:', error);
        alert('Gagal memuat riwayat. Cek koneksi atau server!');
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    alert("Logging out...");
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Riwayat Aksi Admin</h1>
        <nav className="space-x-4">
          <a href="/superadmin" className="hover:underline">Kembali ke Dashboard</a>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Admin</h2>

          {history.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat aksi.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="font-semibold">{item.action}</p>
                  <p className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    Admin: {item.admin.name || item.admin.username} ({item.admin.email})
                  </p>
                  <p className="text-sm text-gray-500">Event: {item.newsEvent.title || 'No Title Available'}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
