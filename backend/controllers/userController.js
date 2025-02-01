// controllers/userController.js
import bcrypt from 'bcryptjs'
import User from '../models/User.js';

export const createAdmin = async (req, res) => {
  const { name, username, email, password } = req.body;
  
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username atau email sudah digunakan' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newAdmin = new User({
      name,
      username,
      email,
      password: passwordHash, // Make sure to hash the password before saving!
      role: 'admin',
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Failed to create admin' });
  }
};
