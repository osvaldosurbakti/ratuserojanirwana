document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika tidak ada token, arahkan ke login
    window.location.href = 'login.html';
    return;
  }

  // Verifikasi token dengan permintaan API (opsional, tetapi lebih aman)
  fetch('http://localhost:5000/api/verify-token', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        // Jika token tidak valid, hapus token dan arahkan ke login
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Jika ada error, anggap token tidak valid
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
});
  // Menampilkan daftar admin
async function fetchAdmins() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5000/api/users/admins', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const admins = await response.json();
    displayAdmins(admins);
  } else {
    console.error('Gagal mengambil daftar admin');
  }
}

// Menampilkan admin di halaman
function displayAdmins(admins) {
  const adminList = document.getElementById('adminList');
  adminList.innerHTML = '';  // Clear sebelumnya

  admins.forEach(admin => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>Nama: ${admin.name}, Username: ${admin.username}, Email: ${admin.email}</span>
      <button onclick="editAdmin(${admin._id})">Edit</button>
      <button onclick="deleteAdmin(${admin._id})">Hapus</button>
    `;
    adminList.appendChild(listItem);
  });
}

// Menambahkan admin baru
document.getElementById('addAdminForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/users/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, username, password, email }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Admin berhasil ditambahkan');
    fetchAdmins();  // Refresh daftar admin
  } else {
    alert('Gagal menambahkan admin');
  }
});

// Edit admin
async function editAdmin(adminId) {
  // Ambil data admin berdasarkan adminId dan tampilkan di form (bisa melalui modal atau form edit)
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:5000/api/users/admin/${adminId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const admin = await response.json();

  if (response.ok) {
    // Isi form dengan data admin yang dipilih
    document.getElementById('name').value = admin.name;
    document.getElementById('username').value = admin.username;
    document.getElementById('email').value = admin.email;
    
    // Ubah tombol submit untuk melakukan update
    document.getElementById('addAdminForm').onsubmit = async (e) => {
      e.preventDefault();

      const updatedName = document.getElementById('name').value;
      const updatedUsername = document.getElementById('username').value;
      const updatedEmail = document.getElementById('email').value;

      const updateResponse = await fetch(`http://localhost:5000/api/users/admin/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedName, username: updatedUsername, email: updatedEmail }),
      });

      if (updateResponse.ok) {
        alert('Admin berhasil diperbarui');
        fetchAdmins();  // Refresh daftar admin
      } else {
        alert('Gagal memperbarui admin');
      }
    };
  }
}

// Hapus admin
async function deleteAdmin(adminId) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`http://localhost:5000/api/users/admin/${adminId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    alert('Admin berhasil dihapus');
    fetchAdmins();  // Refresh daftar admin
  } else {
    alert('Gagal menghapus admin');
  }
}

// Load daftar admin saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', fetchAdmins);

// Cek token di halaman admin atau superadmin
function checkAuth() {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika token tidak ada, arahkan pengguna ke halaman login
    window.location.href = 'login.html';
  } else {
    // Jika token ada, lanjutkan akses
    const user = decodeToken(token); 
    // Lakukan sesuatu dengan data user, misalnya menampilkan dashboard
  }
}

document.getElementById('load-history').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/history');
    const historyData = await response.json();

    if (response.ok) {
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      
      historyData.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `
          <p>Action: ${item.action}</p>
          <p>Entity: ${item.entity}</p>
          <p>Admin: ${item.admin.name}</p>
          <p>Timestamp: ${new Date(item.timestamp).toLocaleString()}</p>
        `;
        historyList.appendChild(historyItem);
      });
    } else {
      alert('Gagal memuat history');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// Deklarasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', checkAuth);

 