import { Request, Response, NextFunction } from 'express'
import * as sessionLogic from '../logic/sessionLogic'

export async function listSessions(_req: Request, res: Response, next: NextFunction) {
  try {
    const sessions = await sessionLogic.list()
    res.json(sessions)
  } catch (err) {
    next(err)
  }
}

export async function createSession(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body
    const created = await sessionLogic.create(data)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function getSession(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    const item = await sessionLogic.getById(id)
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
    const updated = await sessionLogic.update(id, data)
    if (!updated) return res.status(404).json({ message: 'Session not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export async function deleteSession(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id
    await sessionLogic.remove(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
