// routes/complaints.js
import express from 'express';
import { createComplaint, getComplaints, updateComplaint, deleteComplaint } from '../controllers/complaints.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create a complaint (Users)
router.post('/', authenticate, createComplaint);

// Get all complaints (Admins see all, Users see their own)
router.get('/', authenticate, getComplaints);

// Update a complaint (Admins can update all, Users can update their own)
router.put('/:id', authenticate, updateComplaint);

// Delete a complaint (Admins can delete all, Users can delete their own)
router.delete('/:id', authenticate, deleteComplaint);

export default router;