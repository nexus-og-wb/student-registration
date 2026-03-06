import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import studentRoutes from './routes/students.js'; // Ensure this path is correct

const app = express();

app.use(cors());
app.use(express.json());

// Move all student-related logic to this router
app.get('/', (req, res) => {
  res.send('Server is alive and running!');
});
app.use('/api/students', studentRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;