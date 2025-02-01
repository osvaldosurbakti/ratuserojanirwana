document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    // Menyimpan token ke localStorage setelah login berhasil
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role); // Role bisa berupa 'superadmin' atau 'admin'

    alert('Login berhasil!');
    if (data.role === 'admin') {
      window.location.href = 'admin.html';
    } else if (data.role === 'superadmin') {
      window.location.href = 'superadmin.html';
    }
  } else {
    document.getElementById('errorMessage').innerText = data.message || 'Login gagal!';
  }
});
