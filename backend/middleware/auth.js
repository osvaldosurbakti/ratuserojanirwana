import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware untuk proteksi rute dengan JWT
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if the token is present in the request headers and starts with "Bearer "
    if (!token || !token.startsWith('Bearer ')) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token from the "Bearer <token>"
    token = token.split(' ')[1];
    console.log("✅ Token received:", token);

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token ID:", decoded.userId);

    // Find the user based on the decoded user ID
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      console.log("⛔ User not found in database!");
      return res.status(403).json({ message: "Unauthorized: User not found" });
    }

    // Log the authenticated user (excluding the password)
    console.log("✅ Authenticated User:", req.user);
    
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If any error occurs, handle it by returning a 403 response
    console.error("❌ Authentication error:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};
