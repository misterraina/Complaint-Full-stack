// controllers/complaints.js
import Complaint from '../models/Complaints.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Update this based on your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const userId = req.user.id;

    const complaint = new Complaint({ title, description, category, priority, userId });
    await complaint.save();
    // Send email notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Complaint Submitted',
      text: `Complaint Details:\nTitle: ${complaint.title}\nCategory: ${complaint.category}\nPriority: ${complaint.priority}\nDescription: ${complaint.description}`
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const { role, id } = req.user;

    let complaints;
    if (role === 'admin') {
      complaints = await Complaint.find(); // Admin sees all complaints
    } else {
      complaints = await Complaint.find({ userId: id }); // User sees their complaints only
    }

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Complaint
export const updateComplaint = async (req, res) => {
  try {
    const { id: complaintId } = req.params;
    const { role, id: userId } = req.user;
    const updates = req.body;

       // Send email notification on status update
    if (updates.status) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'Complaint Status Updated',
        text: `The status of complaint titled "${updatedComplaint.title}" has been updated to "${updatedComplaint.status}".`
      });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    if (role !== 'admin' && complaint.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this complaint.' });
    }

    Object.assign(complaint, updates);
    await complaint.save();

    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { id: complaintId } = req.params;
    const { role, id: userId } = req.user;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    if (role !== 'admin' && complaint.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this complaint.' });
    }

    await Complaint.findByIdAndDelete(complaintId);
    res.status(200).json({ message: 'Complaint deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
