import { Link, useNavigate } from "react-router-dom";

const SuperAdminNavbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Superadmin Panel</div>
      <ul className="flex gap-4">
        <li><Link to="/superadmindashboard">Dashboard</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Service</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/newsevent">News & Event</Link></li>
        <li><Link to="/controladmin">Control Admin</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <button onClick={() => navigate("/login")} className="bg-green-500 px-3 py-1 rounded">Login</button>
        )}
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
