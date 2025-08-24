import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
