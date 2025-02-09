import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginService } from "../services/authService";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService(formData); // Panggil service login
      login(data.token, data.role); // Simpan token dan role di context
      alert("Login berhasil!");

      // Redirect berdasarkan role
      if (data.role === "admin") {
        navigate("/admindashboard");
      } else if (data.role === "superadmin") {
        navigate("/superadmindashboard");
      } else {
        navigate("/"); // Redirect ke halaman utama
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-lg">
          Selamat Datang
        </h1>
        <p className="text-lg text-gray-600">Silakan login untuk melanjutkan</p>
      </header>
      <main className="bg-white p-8 rounded-xl shadow-lg w-96 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" id="loginForm">
          <div>
            <label htmlFor="username" className="block font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
