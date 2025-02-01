import express from 'express';
import { loginUser } from '../controllers/authController.js'; // Correct import

const router = express.Router();

// Route POST untuk login
router.post('/login', loginUser); // Ensure it's POST, not GET

export default router;
