import { useState, useEffect } from "react";

export default function AdminHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulasi mengambil data dari API (bisa diganti dengan API backend)
    const fetchHistory = async () => {
      const fakeData = [
        { id: 1, action: "Admin A menambahkan berita baru", timestamp: "2025-02-01 10:00" },
        { id: 2, action: "Admin B menghapus acara", timestamp: "2025-02-01 12:30" },
        { id: 3, action: "Admin C memperbarui berita", timestamp: "2025-02-02 08:15" },
      ];
      setHistory(fakeData);
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    alert("Logging out...");
    // Implementasi logout (hapus token, redirect, dll.)
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
                  <p className="text-sm text-gray-500">{item.timestamp}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
