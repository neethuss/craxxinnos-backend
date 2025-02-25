import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/dbConfig.js';
import UserRoutes from './Routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Set port
const port = process.env.PORT || 3004;

// Define allowed origins
const allowedOrigins = [
  "https://www.verbofly.life",
  "https://verbofly.life",
  "http://localhost:3000"
];

// Apply CORS middleware with proper configuration
app.use(cors({
  origin: function (origin, callback) {
    // For debugging
    console.log("Request origin:", origin);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Origin not allowed:", origin);
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Access-Control-Allow-Origin"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add explicit CORS headers for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(204).send();
  }
  
  next();
});

// Mount user routes
app.use('/user/', UserRoutes);

// Root route
app.get('/', (req, res) => {
  console.log('API Connecting');
  res.send('Hello from API!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server connected at port ${port}`);
});