// Fetching the list of admins
async function fetchAdmins() {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/admins', {
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
    console.error('Failed to fetch admins');
  }
}

// Displaying admins on the page
function displayAdmins(admins) {
  const adminList = document.getElementById('adminList');
  adminList.innerHTML = '';  // Clear previous list

  admins.forEach(admin => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>Name: ${admin.name}, Username: ${admin.username}, Email: ${admin.email}</span>
        <button onclick="editAdmin('${admin._id}')">Edit</button>
        <button onclick="deleteAdmin('${admin._id}')">Delete</button>
      `;
      adminList.appendChild(listItem);
  });
}

// Add new admin
document.getElementById('addAdminForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, username, password, email }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Admin added successfully');
    fetchAdmins();  // Refresh the list of admins
  } else {
    alert('Failed to add admin');
  }
});

// Edit admin
async function editAdmin(adminId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:5000/api/admin/${adminId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const admin = await response.json();

  if (response.ok) {
      // Show the edit form and populate it with the admin's details
      document.getElementById('addAdminForm').style.display = 'none';
      document.getElementById('editAdminForm').style.display = 'block';

      document.getElementById('editName').value = admin.name;
      document.getElementById('editUsername').value = admin.username;
      document.getElementById('editEmail').value = admin.email;

      document.getElementById('editAdminForm').onsubmit = async (e) => {
          e.preventDefault();

          const updatedName = document.getElementById('editName').value;
          const updatedUsername = document.getElementById('editUsername').value;
          const updatedEmail = document.getElementById('editEmail').value;

          const updateResponse = await fetch(`http://localhost:5000/api/admin/${adminId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: updatedName, username: updatedUsername, email: updatedEmail }),
          });

          if (updateResponse.ok) {
              alert('Admin updated successfully');
              fetchAdmins();  // Refresh admin list
              document.getElementById('addAdminForm').style.display = 'block';  // Show add form
              document.getElementById('editAdminForm').style.display = 'none';  // Hide edit form
          } else {
              alert('Failed to update admin');
          }
      };
  }
}

// Delete admin
async function deleteAdmin(adminId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:5000/api/admin/${adminId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
      alert('Admin deleted successfully');
      fetchAdmins();  // Refresh the admin list
  } else {
      alert('Failed to delete admin');
  }
}

// Load the list of admins when the page first loads
document.addEventListener('DOMContentLoaded', fetchAdmins);
