import { Router } from 'express';
import WorkoutModel from '../models/workout.js';
import { createResourceRouter } from './resource.js';

const router = Router();
router.use('/', createResourceRouter(WorkoutModel));

export default router;
