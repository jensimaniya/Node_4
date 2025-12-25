import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import connectDB from './src/database/db.js'

//config env
env.config({
  path: './.env'
})

// MiddleWares
const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}))

app.use(express.json())

//MongoDb connection
connectDB();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
})