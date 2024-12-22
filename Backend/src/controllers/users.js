// controllers/users.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Admin limit check
    if (role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount >= 3) {
        return res.status(400).json({ message: 'Admin limit reached (max 3 admins).' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.status(200).json({ message: 'Login successful.', token, user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let activeTokens = new Set(); // Place this somewhere in your code (global or module-scoped)

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    if (activeTokens.has(token)) {
      return res.status(401).json({ message: 'Token is invalid or expired.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB to ensure they still exist and are valid
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User no longer exists.' });
    }

    res.status(200).json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid or expired token.' });
  }
};


export const logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'No token provided for logout.' });
  }

  activeTokens.add(token); // Mark token as invalid
  res.status(200).json({ message: 'Logout successful.' });
};