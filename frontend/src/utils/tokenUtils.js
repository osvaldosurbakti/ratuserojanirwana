// utils/tokenUtils.js
import { jwtDecode } from "jwt-decode";

export const checkTokenExpiry = (token) => {
  try {
    const decodedToken = jwtDecode(token); // Decode JWT token
    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
    return decodedToken.exp < currentTime; // Jika waktu token (exp) lebih kecil dari waktu saat ini, berarti expired
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Anggap token invalid jika ada error
  }
};
