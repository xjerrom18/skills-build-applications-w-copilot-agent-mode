import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User'
import Workout from '../models/Workout'
import Session from '../models/Session'
import Metric from '../models/Metric'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

async function main() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to', MONGO_URI)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Workout.deleteMany({}),
    Session.deleteMany({}),
    Metric.deleteMany({})
  ])
  console.log('Cleared existing collections')

  // Create sample users
  const users = await User.create([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ])

  // Create sample workouts
  const workouts = await Workout.create([
    { name: 'Morning Run', description: '5km easy run', difficulty: 'easy' },
    { name: 'HIIT Blast', description: 'High intensity interval training', difficulty: 'hard' }
  ])

  // Create sample sessions
  const sessions = await Session.create([
    {
      user: users[0]._id,
      workout: workouts[0]._id,
      startAt: new Date(Date.now() - 1000 * 60 * 60),
      endAt: new Date(),
      notes: 'Felt great, steady pace.'
    },
    {
      user: users[1]._id,
      workout: workouts[1]._id,
      startAt: new Date(Date.now() - 1000 * 60 * 30),
      notes: 'Intense session, lots of sweat.'
    }
  ])

  // Create sample metrics
  const metrics = await Metric.create([
    { session: sessions[0]._id, type: 'distance_km', value: 5, unit: 'km' },
    { session: sessions[0]._id, type: 'calories', value: 320, unit: 'kcal' },
    { session: sessions[1]._id, type: 'duration_min', value: 30, unit: 'min' }
  ])

  console.log('Seed complete:', {
    users: users.length,
    workouts: workouts.length,
    sessions: sessions.length,
    metrics: metrics.length
  })

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

main().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
