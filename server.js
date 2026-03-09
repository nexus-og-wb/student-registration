import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import studentRoutes from './routes/students.js';

const app = express();

// CORS — allow your Netlify frontend (set FRONTEND_URL on Render)
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(o => o.trim())
  : ['http://localhost:3000'];

app.use(cors({
  origin(origin, callback) {
    // allow server-to-server / curl (no origin) + listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Health-check (Render uses this to verify the service is alive)
app.get('/', (req, res) => {
  res.send('Server is alive and running!');
});

app.use('/api/students', studentRoutes);

// Always bind — Render sets PORT automatically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;