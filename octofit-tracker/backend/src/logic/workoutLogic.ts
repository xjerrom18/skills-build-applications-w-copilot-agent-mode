import * as workoutService from '../services/workoutService'
import User from '../models/User'

// Business logic layer for workouts

export async function list() {
  // Currently simple passthrough; place for pagination, filtering, permissions
  return workoutService.list()
}

export async function create(data: any) {
  // Basic validation
  if (!data || !data.name) {
    const err: any = new Error('Workout name is required')
    err.status = 400
    throw err
  }

  // Example business rule: normalize name
  data.name = String(data.name).trim()

  // Could enforce ownership, pricing, or other domain rules here
  return workoutService.create(data)
}

export async function getById(id: string) {
  return workoutService.getById(id)
}

export async function update(id: string, data: any) {
  // Disallow changing owner field via update (example)
  if (data.owner) delete data.owner
  return workoutService.update(id, data)
}

export async function remove(id: string) {
  // Additional domain checks could go here (e.g., prevent deletion if sessions exist)
  return workoutService.remove(id)
}
