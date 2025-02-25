import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/dbConfig.js'
import UserRoutes from './Routes/userRoutes.js'

dotenv.config()
const app = express()

connectDB()
const port = process.env.PORT || 3004


app.use(cors({
  origin: ["https://www.verbofly.life", "https://verbofly.life", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user/', UserRoutes)

app.get('/', (req, res) => {
  console.log('api conneting')

  res.send('hai ')
})

app.listen(port, ()=>{
  console.log(`Server connected at port ${port}`)
})