import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        alert("Login berhasil!");

        if (data.role === "admin") {
          navigate("/admindashboard");
        } else if (data.role === "superadmin") {
          navigate("/superadmindashboard");
        }
      } else {
        setErrorMessage(data.message || "Login gagal!");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Login</h1>
      </header>
      <main className="bg-white p-6 rounded-lg shadow-md w-80">
        <form onSubmit={handleSubmit} className="space-y-4" id="loginForm">
          <div>
            <label htmlFor="username" className="block font-medium">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
