import { Request, Response, NextFunction } from 'express'
import * as metricLogic from '../logic/metricLogic'

export async function listMetrics(_req: Request, res: Response, next: NextFunction) {
  try {
    const metrics = await metricLogic.list()
    res.json(metrics)
  } catch (err) {
    next(err)
  }
}

export async function createMetric(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body
    const created = await metricLogic.create(data)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function getMetric(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const item = await metricLogic.getById(id)
    if (!item) return res.status(404).json({ message: 'Metric not found' })
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function updateMetric(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const data = req.body
    const updated = await metricLogic.update(id, data)
    if (!updated) return res.status(404).json({ message: 'Metric not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export async function deleteMetric(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    await metricLogic.remove(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
