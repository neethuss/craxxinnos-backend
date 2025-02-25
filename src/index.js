import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/dbConfig.js';
import UserRoutes from './Routes/userRoutes.js';

dotenv.config();
const app = express();
connectDB();
const port = process.env.PORT || 3004;

const allowedOrigins = [
  "https://www.verbofly.life",
  "https://verbofly.life",
  "https://api.verbofly.life", 
  "http://localhost:3000"
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  }

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user/', UserRoutes);

app.get('/', (req, res) => {
  console.log('API Connecting');
  res.send('Hello from API!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server connected at port ${port}`);
});
