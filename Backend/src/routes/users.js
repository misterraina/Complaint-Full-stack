import express from 'express';
import { registerUser, loginUser, verifyToken, logout } from '../controllers/users.js';

const router = express.Router();

// POST /users/register - Register User
router.post('/register', registerUser);

// POST /users/login - Login User
router.post('/login', loginUser);

// GET /users/verify-token - Verify Token
router.get('/verify-token', verifyToken);

// POST /users/logout - Logout User
router.post('/logout', logout);

export default router;
