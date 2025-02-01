import { useState, useEffect } from "react";

export default function ControlAdmin() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", username: "", password: "", email: "" });
  const [editAdmin, setEditAdmin] = useState(null);

  useEffect(() => {
    // Simulasi data admin dari API
    const fetchAdmins = async () => {
      const fakeData = [
        { id: 1, name: "Admin A", username: "adminA", email: "adminA@example.com" },
        { id: 2, name: "Admin B", username: "adminB", email: "adminB@example.com" },
      ];
      setAdmins(fakeData);
    };

    fetchAdmins();
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newEntry = { ...newAdmin, id: admins.length + 1 };
    setAdmins([...admins, newEntry]);
    setNewAdmin({ name: "", username: "", password: "", email: "" });
  };

  const handleEditClick = (admin) => {
    setEditAdmin(admin);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAdmins(admins.map((admin) => (admin.id === editAdmin.id ? editAdmin : admin)));
    setEditAdmin(null);
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm("Yakin ingin menghapus admin ini?")) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Implementasi logout (hapus token, redirect, dll.)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Control Admin</h1>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        {/* Daftar Admin */}
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Daftar Admin</h2>
          {admins.length === 0 ? (
            <p className="text-gray-600">Belum ada admin.</p>
          ) : (
            <ul className="space-y-4">
              {admins.map((admin) => (
                <li key={admin.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(admin)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Form Tambah Admin */}
        <section className="bg-white p-6 shadow-md rounded-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4">Tambah Admin Baru</h2>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Admin"
              className="w-full p-2 border rounded-md"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded-md"
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              Tambah Admin
            </button>
          </form>
        </section>

        {/* Form Edit Admin */}
        {editAdmin && (
          <section className="bg-white p-6 shadow-md rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Admin</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                required
              />
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={editAdmin.username}
                onChange={(e) => setEditAdmin({ ...editAdmin, username: e.target.value })}
                required
              />
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                required
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                Update Admin
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
