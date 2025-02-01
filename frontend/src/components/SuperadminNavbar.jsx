import React from 'react';
import { Link } from 'react-router-dom';
import './SuperadminNavbar.css';

const SuperadminNavbar = () => {
    return (
        <nav className="superadmin-navbar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default SuperadminNavbar;