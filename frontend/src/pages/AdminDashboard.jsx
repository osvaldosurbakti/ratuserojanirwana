import { useState, useEffect, useRef } from "react";
import { getNewsEvents, createNewsEvent, updateNewsEvent, deleteNewsEvent } from "../services/newsEventsService";


export default function AdminDashboard() {
  const formRef = useRef(null); // Tambahkan ref untuk form
  const [newsEvents, setNewsEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNewsEvents, setFilteredNewsEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [formData, setFormData] = useState({
    _id: null,
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

useEffect(() => {
  const filtered = newsEvents.filter((event) => {
    const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? event.category === filterCategory : true;
    return matchesSearchTerm && matchesCategory;
  });
  setFilteredNewsEvents(filtered);
}, [searchTerm, filterCategory, newsEvents]);


const fetchNewsEvents = async () => {
  try {
    const data = await getNewsEvents(token);
    setNewsEvents(data);
  } catch (error) {
    console.error("Error fetching news events:", error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
  
    try {
      if (editMode) {
        const confirmUpdate = window.confirm("Apakah yakin ingin update?");
        if (!confirmUpdate) return;
  
        await updateNewsEvent(formData._id, form, token);
        alert("Perubahan berhasil disimpan!");
      } else {
        await createNewsEvent(form, token);
        alert("Data berhasil ditambahkan!");
      }
  
      // Refresh data dan reset form
      fetchNewsEvents();
      setFormData({
        _id: null,
        title: "",
        description: "",
        category: "news",
        eventDate: "",
        image: null,
      });
      setPreviewImage(null);
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split("T")[0] : "", // Format tanggal
    });
    setPreviewImage(`http://localhost:5001${item.image}`); // Tampilkan gambar pratinjau
    setEditMode(true); // Aktifkan mode edit
    formRef.current.scrollIntoView({
      behavior: "smooth", // Gulir dengan animasi
    });
  };
  

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Apakah yakin ingin menghapus?");
    if (!confirmDelete) return;
  
    try {
      await deleteNewsEvent(_id, token); // Fungsi ini menangani permintaan penghapusan.
      alert("Penghapusan berhasil!");
      fetchNewsEvents(); // Panggil fungsi untuk menyegarkan data setelah penghapusan.
    } catch (error) {
      console.error("Error deleting news/event:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header ref={formRef}className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 flex justify-between items-center rounded-md shadow-lg">
        <h1 className="text-2xl font-bold">Manage News & Events</h1>
      </header>
  
      <main className="mt-8">
        <h2 className="text-3xl font-semibold mb-6">
          {editMode ? "Edit News & Event" : "Tambah News & Event"}
        </h2>
  
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-lg">
          <label className="block font-medium mb-2 text-lg">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <label className="block font-medium mb-2 text-lg">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <label className="block font-medium mb-2 text-lg">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
  
          <label className="block font-medium mb-2 text-lg">Event Date:</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <label className="block font-medium mb-2 text-lg">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          {previewImage && (
            <img src={previewImage} alt="Preview" className="max-w-xs rounded-lg mb-4" />
          )}
  
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            {editMode ? "Update" : "Submit"}
          </button>
        </form>
  
        <h2 className="text-3xl font-semibold mt-12">Daftar News & Event</h2>
        <div className="mt-6 mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search news/events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
  
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
          >
            <option value="">All</option>
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
        </div>
  
        <ul className="space-y-4">
          {filteredNewsEvents.map((item) => (
            <li
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              
              <div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </p>
                {item.eventDate && (
                  <p className="text-sm text-gray-500">
                    Date: {new Date(item.eventDate).toLocaleDateString()}
                  </p>
                )}
                {item.image && (
                  <img
                    src={`http://localhost:5001${item.image}`}
                    alt="Event"
                    className="mt-2 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>
             
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
  
}
