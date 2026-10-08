import { Router } from 'express';
import { ActivityModel } from '../models/activity.js';
import { createResourceRouter } from './resource.js';

const router = Router();
router.use('/', createResourceRouter(ActivityModel));

export default router;
