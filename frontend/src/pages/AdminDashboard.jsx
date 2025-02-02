import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    category: "news",
    eventDate: "",
    image: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const fetchNewsEvents = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/news-events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setNewsEvents(data);
    } catch (error) {
      console.error("Error fetching news events:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (editMode && !formData._id) {
      console.error("Error: ID is missing in edit mode!");
      return;
    }
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
  
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:5001/api/news-events/${formData._id}`
      : "http://localhost:5001/api/news-events";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!response.ok) throw new Error("Failed to submit");
  
      fetchNewsEvents();
      setFormData({ _id: null, title: "", description: "", category: "news", eventDate: "", image: null });
      setPreviewImage(null);
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleEdit = (item) => {
    setFormData({
      ...item,
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split("T")[0] : "", // Ubah format tanggal
    });
    setPreviewImage(item.image);
    setEditMode(true);
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`http://localhost:5001/api/news-events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete");
      fetchNewsEvents();
    } catch (error) {
      console.error("Error deleting news event:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl">Admin Dashboard</h1>
      </header>

      <main className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          {editMode ? "Edit News & Event" : "Tambah News & Event"}
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md mb-3"
          />

          <label className="block font-medium">Description:</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md mb-3"
          />

          <label className="block font-medium">Category:</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md mb-3"
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>

          <label className="block font-medium">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md mb-3"
          />

          <label className="block font-medium">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md mb-3"
          />

          {previewImage && <img src={previewImage} alt="Preview" className="max-w-xs rounded-md mb-3" />}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            {editMode ? "Update" : "Submit"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mt-8">Daftar News & Event</h2>
        <ul className="mt-4">
          {newsEvents.map((item) => (
            <li key={item._id} className="bg-gray-100 p-4 rounded-md shadow-md mb-3 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                {item.eventDate && <p className="text-sm">Event Date: {item.eventDate}</p>}
                {item.image && <img src={item.image} alt="Event" className="max-w-xs mt-2 rounded-md" />}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
