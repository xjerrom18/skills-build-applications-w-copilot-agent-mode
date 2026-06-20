import { Router, Request, Response, NextFunction } from 'express'
import * as sessionController from '../controllers/sessionController'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  sessionController.listSessions(req, res, next)
)
router.post('/', (req: Request, res: Response, next: NextFunction) =>
  sessionController.createSession(req, res, next)
)
router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  sessionController.getSession(req, res, next)
)
router.put('/:id', (req: Request, res: Response, next: NextFunction) =>
  sessionController.updateSession(req, res, next)
)
router.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
  sessionController.deleteSession(req, res, next)
)

export default router
