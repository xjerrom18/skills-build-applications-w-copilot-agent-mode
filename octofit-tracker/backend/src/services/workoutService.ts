import Workout from '../models/Workout'
import { Types } from 'mongoose'

export function list() {
  return Workout.find().sort({ createdAt: -1 }).exec()
}

export function create(data: any) {
  return Workout.create(data)
}

export function getById(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  return Workout.findById(id).exec()
}

export function update(id: string, data: any) {
  if (!Types.ObjectId.isValid(id)) return null
  return Workout.findByIdAndUpdate(id, data, { new: true }).exec()
}

export function remove(id: string) {
  if (!Types.ObjectId.isValid(id)) return Promise.resolve()
  return Workout.findByIdAndDelete(id).exec()
}
