import express from 'express';
import { protect } from '../middleware/auth.js'; // Authentication middleware
import { authorize } from '../middleware/authMiddleware.js'; // Authorization middleware for roles
import User from '../models/User.js'; // User model
import { createAdmin } from '../controllers/userController.js'; // Controller for creating admin

const router = express.Router();

// Route to create a new admin (only accessible by superadmin)
router.post('/admin', protect, authorize('superadmin'), createAdmin);

// Route to fetch all admins (only accessible by superadmin)
router.get('/admins', protect, authorize('superadmin'), async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'An error occurred while fetching admins' });
  }
});

// Route to fetch a specific admin by ID (only accessible by superadmin)
router.get('/admin/:id', protect, authorize('superadmin'), async (req, res) => {
  try {
    const admin = await User.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ message: 'An error occurred while fetching the admin' });
  }
});

// Route to update an admin by ID (only accessible by superadmin)
router.put('/admin/:id', protect, authorize('superadmin'), async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      { name, username, email },
      { new: true }
    ).select('-password');
    
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'An error occurred while updating the admin' });
  }
});

// Route to delete an admin by ID (only accessible by superadmin)
router.delete('/admin/:id', protect, authorize('superadmin'), async (req, res) => {
  try {
    const deletedAdmin = await User.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin successfully deleted' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'An error occurred while deleting the admin' });
  }
});

export default router;
