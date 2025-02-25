import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/dbConfig.js'
import UserRoutes from './Routes/userRoutes.js'

dotenv.config()
const app = express()

connectDB()
const port = process.env.PORT || 3004

const allowedOrigins = [
  "https://www.verbofly.life",
  "https://verbofly.life",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user/', UserRoutes)

app.get('/', (req, res) => {
  console.log('api conneting')

  res.send('hai ')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server connected at port ${port}`)
});
