import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Admin Panel</div>
      <ul className="flex gap-4">
        <li><Link to="/admindashboard">Dashboard</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/newsevent ">News & Event</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/service">Service</Link></li>
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

export default AdminNavbar;
