// Update UI based on authentication status
function updateUI() {
  const userLinks = document.getElementById('userLinks');
  const navbar = document.getElementById('navbar');
  const token = localStorage.getItem('token');
  const adminLink = document.getElementById('adminLink');
  const superadminLink = document.getElementById('superadminLink');

  if (token) {
    const user = decodeToken(token);
    if (user) {
      const role = user.role;
      
    
      // Show navbar links based on role
      if (role === 'admin') {
        navbar.style.display = 'block'; // Show Admin navbar
        adminLink.style.display = 'inline'; // Show Admin Dashboard link
      } else if (role === 'superadmin') {
        navbar.style.display = 'block'; // Show Superadmin navbar
        superadminLink.style.display = 'inline'; // Show Superadmin Dashboard link
      }
    }
  } else {
    // Show Login button when not logged in
    const loginButton = document.createElement('a');
    loginButton.href = 'login.html';
    loginButton.innerHTML = '<button>Login</button>';

    userLinks.innerHTML = ''; // Clear previous links
    userLinks.appendChild(loginButton);

    navbar.style.display = 'none'; // Hide navbar if not logged in
  }
}

// Decode token and extract role
function decodeToken(token) {
  try {
    const decoded = jwt_decode(token);
    return decoded; // Assuming the decoded token contains user role
  } catch (error) {
    return null;
  }
}

// Fetch the list of news & events from the server
async function fetchNewsEvents() {
  try {
    const response = await fetch('http://localhost:5000/api/news-events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newsEvents = await response.json(); // Mengambil data dalam bentuk JSON

    // Mendapatkan elemen list untuk menampilkan data
    const newsEventList = document.getElementById('newsEventList');
    newsEventList.innerHTML = ''; // Menghapus daftar lama

    // Menambahkan item berita dan acara ke list
    newsEvents.forEach(newsEvent => {
      const listItem = document.createElement('li');
      listItem.innerHTML = ` 
        <strong>${newsEvent.title}</strong><br>
        <em>Kategori: ${newsEvent.category}</em><br>
        <p>${newsEvent.description}</p>
        ${newsEvent.eventDate ? `<p>Tanggal: ${new Date(newsEvent.eventDate).toLocaleDateString()}</p>` : ''}
        ${newsEvent.image ? `<img src="${newsEvent.image}" alt="Event Image" />` : ''}
      `;
      newsEventList.appendChild(listItem);
    });

  } catch (error) {
    // Menampilkan pesan error jika gagal mengambil data
    showErrorMessage('Gagal memuat berita & acara. Cek koneksi atau server!');
  }
}

// Function to display error messages on UI
function showErrorMessage(message) {
  const errorMessageDiv = document.getElementById('errorMessage');
  errorMessageDiv.style.display = 'block';
  errorMessageDiv.textContent = message;
}

// Fetch news events when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateUI(); // Update UI based on login status
  fetchNewsEvents(); // Fetch and display news & events
});
