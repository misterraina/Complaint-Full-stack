import express from 'express';
import complaintsRoutes from './routes/complaints.js';
import userRoutes from './routes/users.js';
import cors from 'cors'; // Import cors

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'https://complaint-full-stack-xg4y.vercel.app', // Allow requests from your frontend
  credentials: true, // Allow cookies to be sent
}));

// Routes
app.use('/complaints', complaintsRoutes);
app.use('/users', userRoutes);
app.use('/', (req, res) => {
  res.send('hello world');
});
export default app;
