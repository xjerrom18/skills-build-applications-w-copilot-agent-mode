import Metric from '../models/Metric'
import { Types } from 'mongoose'

export function list() {
  return Metric.find().sort({ recordedAt: -1 }).exec()
}

export function create(data: any) {
  return Metric.create(data)
}

export function getById(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  return Metric.findById(id).exec()
}

export function update(id: string, data: any) {
  if (!Types.ObjectId.isValid(id)) return null
  return Metric.findByIdAndUpdate(id, data, { new: true }).exec()
}

export function remove(id: string) {
  if (!Types.ObjectId.isValid(id)) return Promise.resolve()
  return Metric.findByIdAndDelete(id).exec()
}
