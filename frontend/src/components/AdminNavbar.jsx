import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <ul>
                <li><Link to="/admindashboard">Dashboard</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/settings">Settings</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;