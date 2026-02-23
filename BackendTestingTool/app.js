
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import endpointRoutes from './routes/endpoints.js';
import testRoutes from './routes/test.js';

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/test', testRoutes);

// Auth & protected routes
app.use('/api/auth', authRoutes);
app.use('/api/endpoints', endpointRoutes);

// Simple root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API Health Monitor Backend is running' });
});

export default app;