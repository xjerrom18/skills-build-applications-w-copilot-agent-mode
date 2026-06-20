import { Router, Request, Response, NextFunction } from 'express'
import * as metricController from '../controllers/metricController'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  metricController.listMetrics(req, res, next)
)
router.post('/', (req: Request, res: Response, next: NextFunction) =>
  metricController.createMetric(req, res, next)
)
router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  metricController.getMetric(req, res, next)
)
router.put('/:id', (req: Request, res: Response, next: NextFunction) =>
  metricController.updateMetric(req, res, next)
)
router.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
  metricController.deleteMetric(req, res, next)
)

export default router
