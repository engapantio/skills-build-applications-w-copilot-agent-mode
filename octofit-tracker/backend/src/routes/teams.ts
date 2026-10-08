import { Router } from 'express';
import { TeamModel } from '../models/team.js';
import { createResourceRouter } from './resource.js';

const router = Router();
router.use('/', createResourceRouter(TeamModel));

export default router;
