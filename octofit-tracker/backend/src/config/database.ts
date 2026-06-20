import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'
const mongooseOptions: mongoose.ConnectOptions = {
  // Use mongoose defaults; place options here if you need to customize
}

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose
  return mongoose.connect(MONGO_URI, mongooseOptions)
}

export async function disconnectDb() {
  if (mongoose.connection.readyState === 0) return
  return mongoose.disconnect()
}

export default mongoose
