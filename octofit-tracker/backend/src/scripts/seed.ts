/**
 * Seed script for OctoFit Tracker database
 *
 * Purpose:
 * - Connects to MongoDB (MONGO_URI) and populates the `octofit` database with
 *   sample Users, Workouts, Sessions, and Metrics for local development.
 *
 * How to run:
 * 1. cd octofit-tracker/backend
 * 2. npm install
 * 3. cp .env.example .env   # optional; edit MONGO_URI if needed
 * 4. npm run seed
 *
 * Notes:
 * - The script clears the User, Workout, Session, and Metric collections before
 *   inserting seed data. Use with caution against production databases.
 * - Default MONGO_URI: mongodb://localhost:27017/octofit
 */

import { connectDb, disconnectDb } from '../config/database'
import User from '../models/User'
import Workout from '../models/Workout'
import Session from '../models/Session'
import Metric from '../models/Metric'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

async function main() {
  await connectDb()
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

  await disconnectDb()
  console.log('Disconnected from MongoDB')
}

main().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
