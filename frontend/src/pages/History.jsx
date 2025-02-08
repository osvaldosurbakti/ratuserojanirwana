import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trash, Edit } from "lucide-react";

export default function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5001/api/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const historyData = await response.json();
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history:", error);
        alert("Gagal memuat riwayat. Cek koneksi atau server!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout berhasil!");
    navigate("/login");
  };

  const filteredHistory = history.filter((item) =>
    item.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center rounded-md shadow-lg">
        <h1 className="text-xl font-bold">Riwayat Aksi Admin</h1>
      </header>

      {/* Search Input */}
      <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Cari aksi..."
          className="p-2 w-full sm:w-1/2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <main className="mt-6">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Admin</h2>

          {isLoading ? (
            <p className="text-gray-600 text-center">Memuat data...</p>
          ) : filteredHistory.length === 0 ? (
            <p className="text-gray-600 text-center">
              Belum ada riwayat aksi.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((item, index) => (
                <li
                  key={item.id || index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                >
                  <p
                    className={`font-semibold flex items-center ${
                      item.action === "DELETE"
                        ? "text-red-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.action === "DELETE" ? (
                      <Trash className="mr-2" />
                    ) : (
                      <Edit className="mr-2" />
                    )}
                    {item.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(item.timestamp), "dd MMM yyyy, HH:mm")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Admin:{" "}
                    {item.adminId?.name || item.adminId?.username || "Unknown Admin"}{" "}
                    ({item.adminId?.email || "No Email"})
                  </p>
                  <p className="text-sm text-gray-500">
                    Event: {item.newsEventId?.title || "No Title Available"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
