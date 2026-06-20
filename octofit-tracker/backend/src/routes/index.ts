import { Router } from 'express'
import workouts from './workouts'
import sessions from './sessions'
import metrics from './metrics'

const router = Router()

router.use('/workouts', workouts)
router.use('/sessions', sessions)
router.use('/metrics', metrics)

export default router
