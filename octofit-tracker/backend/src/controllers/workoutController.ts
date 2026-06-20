import { Request, Response, NextFunction } from 'express'
import * as workoutService from '../services/workoutService'

export async function listWorkouts(_req: Request, res: Response, next: NextFunction) {
  try {
    const workouts = await workoutService.list()
    res.json(workouts)
  } catch (err) {
    next(err)
  }
}

export async function createWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body
    const created = await workoutService.create(data)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function getWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const item = await workoutService.getById(id)
    if (!item) return res.status(404).json({ message: 'Workout not found' })
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function updateWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const data = req.body
    const updated = await workoutService.update(id, data)
    if (!updated) return res.status(404).json({ message: 'Workout not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export async function deleteWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    await workoutService.remove(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
