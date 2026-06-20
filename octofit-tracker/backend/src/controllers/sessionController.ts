import { Request, Response, NextFunction } from 'express'
import * as sessionService from '../services/sessionService'

export async function listSessions(_req: Request, res: Response, next: NextFunction) {
  try {
    const sessions = await sessionService.list()
    res.json(sessions)
  } catch (err) {
    next(err)
  }
}

export async function createSession(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body
    const created = await sessionService.create(data)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function getSession(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const item = await sessionService.getById(id)
    if (!item) return res.status(404).json({ message: 'Session not found' })
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function updateSession(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const data = req.body
    const updated = await sessionService.update(id, data)
    if (!updated) return res.status(404).json({ message: 'Session not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export async function deleteSession(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    await sessionService.remove(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
