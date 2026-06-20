import { Router, Request, Response, NextFunction } from 'express'
import * as workoutController from '../controllers/workoutController'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  workoutController.listWorkouts(req, res, next)
)
router.post('/', (req: Request, res: Response, next: NextFunction) =>
  workoutController.createWorkout(req, res, next)
)
router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  workoutController.getWorkout(req, res, next)
)
router.put('/:id', (req: Request, res: Response, next: NextFunction) =>
  workoutController.updateWorkout(req, res, next)
)
router.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
  workoutController.deleteWorkout(req, res, next)
)

export default router
