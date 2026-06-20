import * as sessionService from '../services/sessionService'
import User from '../models/User'
import Workout from '../models/Workout'
import { Types } from 'mongoose'

// Business logic for sessions

export async function list() {
  return sessionService.list()
}

export async function create(data: any) {
  // Validate required fields
  if (!data || !data.user || !data.workout) {
    const err: any = new Error('Session requires user and workout references')
    err.status = 400
    throw err
  }

  // Validate ObjectId format
  if (!Types.ObjectId.isValid(data.user) || !Types.ObjectId.isValid(data.workout)) {
    const err: any = new Error('Invalid user or workout id')
    err.status = 400
    throw err
  }

  // Ensure referenced documents exist
  const [userExists, workoutExists] = await Promise.all([
    User.exists({ _id: data.user }),
    Workout.exists({ _id: data.workout })
  ])

  if (!userExists) {
    const err: any = new Error('Referenced user does not exist')
    err.status = 400
    throw err
  }
  if (!workoutExists) {
    const err: any = new Error('Referenced workout does not exist')
    err.status = 400
    throw err
  }

  // Business rule: set startAt to now if not provided
  if (!data.startAt) data.startAt = new Date()

  return sessionService.create(data)
}

export async function getById(id: string) {
  return sessionService.getById(id)
}

export async function update(id: string, data: any) {
  // Prevent arbitrary user/workout reassignment through session update in this rule
  if (data.user) delete data.user
  if (data.workout) delete data.workout
  return sessionService.update(id, data)
}

export async function remove(id: string) {
  return sessionService.remove(id)
}
