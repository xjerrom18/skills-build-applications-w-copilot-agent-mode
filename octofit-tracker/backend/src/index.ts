import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const PORT = Number(process.env.PORT) || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use('/api', routes)

// Health endpoint remains
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT })
})

// Error handler (should be last middleware)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`)
})
