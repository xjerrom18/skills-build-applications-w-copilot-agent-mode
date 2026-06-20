import Session from '../models/Session'
import { Types } from 'mongoose'

export function list() {
  return Session.find().sort({ startAt: -1 }).exec()
}

export function create(data: any) {
  return Session.create(data)
}

export function getById(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  return Session.findById(id).exec()
}

export function update(id: string, data: any) {
  if (!Types.ObjectId.isValid(id)) return null
  return Session.findByIdAndUpdate(id, data, { new: true }).exec()
}

export function remove(id: string) {
  if (!Types.ObjectId.isValid(id)) return Promise.resolve()
  return Session.findByIdAndDelete(id).exec()
}
