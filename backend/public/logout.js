// Fungsi logout
function logout() {
  // Menghapus token dan role dari localStorage
  localStorage.removeItem('token'); // Hapus token
  localStorage.removeItem('role');  // Hapus role pengguna

  // Arahkan pengguna ke halaman login setelah logout
  window.location.href = 'login.html';  // Redirect ke halaman login
}

// Menambahkan event listener pada tombol logout setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});
