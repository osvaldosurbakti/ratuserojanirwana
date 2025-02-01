async function fetchHistory() {
  const token = localStorage.getItem('token');
  const historyList = document.getElementById('historyList');

  try {
    const response = await fetch('http://localhost:5000/api/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const historyData = await response.json();
    historyList.innerHTML = '';

    historyData.forEach(entry => {
      const adminName = entry.adminId ? entry.adminId.name : 'Admin Tidak Diketahui';
      const adminEmail = entry.adminId ? entry.adminId.email : 'Email Tidak Diketahui';
      const newsEventTitle = entry.newsEventId ? entry.newsEventId.title : 'No Title Available'; 

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${adminName} (${adminEmail})</strong>
        melakukan <b>${entry.action}</b> pada event <b>${newsEventTitle}</b>
        pada <em>${new Date(entry.timestamp).toLocaleString()}</em>.
      `;
      historyList.appendChild(listItem);
    });

  } catch (error) {
    console.error('Error:', error);
    alert('Gagal memuat riwayat. Cek koneksi atau server!');
  }
}

// Panggil fetchHistory saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchHistory);
