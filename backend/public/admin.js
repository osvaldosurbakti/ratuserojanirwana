document.addEventListener('DOMContentLoaded', function () {
  fetchNewsEvents(); // Load news events on page load

  // Menyesuaikan link berdasarkan role
  const userRole = localStorage.getItem('role');  // Dapatkan role pengguna
  const dashboardLink = document.getElementById('dashboardLink');

  if (userRole === 'superadmin') {
    dashboardLink.href = 'superadmin.html';  
    dashboardLink.textContent = 'Superadmin Dashboard';  
  } else if (userRole === 'admin') {
    dashboardLink.href = 'admin.html';  
    dashboardLink.textContent = 'Admin Dashboard';  
  } else {
    window.location.href = 'login.html';  
  }

  // Form submission handler for adding a news event
  const addForm = document.getElementById('addNewsEventForm');
  addForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const eventDate = document.getElementById('eventDate').value || new Date().toISOString().split('T')[0];
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('eventDate', eventDate || new Date().toISOString().split('T')[0]);
    if (image) {
      formData.append('image', image);
    }
    if (!eventDate) {
      alert('Event date is required');
      return;
    }
    

    const token = localStorage.getItem('token');
    const endpoint = 'http://localhost:5000/api/news-events';
    const method = 'POST';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      alert('Berita & Acara berhasil ditambahkan');
      addForm.reset();
      fetchNewsEvents(); // Refresh the list
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan berita & acara. Cek koneksi atau server!');
    }
  });

  // Form submission handler for editing a news event
  const editForm = document.getElementById('editNewsEventForm');
  editForm.addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const id = document.getElementById('editNewsEventId').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const category = document.getElementById('editCategory').value;
    const eventDate = document.getElementById('editEventDate').value || new Date().toISOString().split('T')[0];
    const image = document.getElementById('editImage').files[0];
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('eventDate', eventDate); // Always append eventDate
    if (image) {
      formData.append('image', image);
    }
  
    console.log([...formData.entries()]); // Debug payload
  
    const token = localStorage.getItem('token');
    const endpoint = `http://localhost:5000/api/news-events/${id}`;
    const method = 'PUT';
  
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      alert('Berita & Acara berhasil diperbarui');
      editForm.reset();
      fetchNewsEvents(); // Refresh the list
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memperbarui berita & acara. Cek koneksi atau server!');
    }
  });  
});

// Fetch and display the list of news & events
async function fetchNewsEvents() {
  const token = localStorage.getItem('token');
  const newsEventList = document.getElementById('newsEventList');

  try {
    const response = await fetch('http://localhost:5000/api/news-events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newsEvents = await response.json();
    newsEventList.innerHTML = '';

    newsEvents.forEach(newsEvent => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${newsEvent.title}</strong><br>
        <em>Kategori: ${newsEvent.category}</em><br>
        <p>${newsEvent.description}</p>
        ${newsEvent.eventDate ? `<p>Tanggal : ${new Date(newsEvent.eventDate).toLocaleDateString()}</p>` : ''}
        ${newsEvent.image ? `<img src="${newsEvent.image}" alt="Event Image" width="100" />` : ''}
        <button onclick="editNewsEvent('${newsEvent._id}')">Edit</button>
        <button onclick="deleteNewsEvent('${newsEvent._id}')">Delete</button>
      `;
      newsEventList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Gagal memuat berita & acara. Cek koneksi atau server!');
  }
}

// Load a specific news event for editing
function editNewsEvent(id) {
  const token = localStorage.getItem('token');
  const editForm = document.getElementById('editNewsEventForm');
  
  fetch(`http://localhost:5000/api/news-events/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then(newsEvent => {
    // Prepopulate the form fields
    document.getElementById('editNewsEventId').value = newsEvent._id;
    document.getElementById('editTitle').value = newsEvent.title;
    document.getElementById('editDescription').value = newsEvent.description;
    document.getElementById('editCategory').value = newsEvent.category;
    document.getElementById('editEventDate').value = newsEvent.eventDate
      ? new Date(newsEvent.eventDate).toISOString().split('T')[0]
      : ''; // Prepopulate date field
    
    // Display the image preview if it exists
    const imagePreview = document.getElementById('editImagePreview');
    if (newsEvent.image) {
      imagePreview.style.display = 'block'; // Show the image preview
      imagePreview.src = newsEvent.image;  // Set the preview image source
    } else {
      imagePreview.style.display = 'none'; // Hide the preview if no image exists
    }

    // Show the edit form
    editForm.style.display = 'block';  // Show the edit form
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Gagal memuat berita & acara untuk diedit.');
  });
}

// Delete a specific news event
async function deleteNewsEvent(id) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("❌ Token tidak ditemukan. Harap login ulang.");
    return;
  }

  if (!confirm('Apakah Anda yakin ingin menghapus berita/acara ini?')) {
    return;
  }

  console.log("🔄 Mengirim DELETE request ke:", `http://localhost:5000/api/news-events/${id}`);

  try {
    const response = await fetch(`http://localhost:5000/api/news-events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("✅ Response dari server:", result);

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    alert('Berita & Acara berhasil dihapus');
    fetchNewsEvents(); // Refresh list
  } catch (error) {
    console.error('❌ Error saat menghapus:', error);
    alert('Gagal menghapus berita & acara. Cek koneksi atau server!');
  }
}

