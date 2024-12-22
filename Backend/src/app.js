import express from 'express';
import complaintsRoutes from './routes/complaints.js';
import userRoutes from './routes/users.js';
import cors from 'cors'; // Import cors

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true, // Allow cookies to be sent
}));

// Routes
app.use('/complaints', complaintsRoutes);
app.use('/users', userRoutes);

export default app;
