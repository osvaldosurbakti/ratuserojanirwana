import React from "react";

export default function SuperadminDashboard() {
  const handleLogout = () => {
    alert("Logging out...");
    // Implementasi logout di sini (misal, hapus token, redirect, dll.)
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Superadmin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Selamat Datang di Dashboard Superadmin</h2>
          <p className="mb-4">Anda memiliki akses penuh untuk mengelola sistem ini.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Manage Admin */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Kontrol Admin</h3>
              <p className="text-gray-600">Akses ke manajemen admin dan kontrol lainnya.</p>
              <a href="/controladmin" className="text-blue-600 hover:underline">Manage Admin</a>
            </div>

            {/* Manage News & Events */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Manajemen Berita & Acara</h3>
              <p className="text-gray-600">Kelola berita dan acara yang ada di sistem.</p>
              <a href="/admin" className="text-blue-600 hover:underline">Manage News & Events</a>
            </div>

            {/* View History */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">History Aksi Admin</h3>
              <p className="text-gray-600">Lihat semua riwayat aksi admin di sistem.</p>
              <a href="/history" className="text-blue-600 hover:underline">View History</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
