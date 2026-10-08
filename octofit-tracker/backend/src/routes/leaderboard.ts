import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard.js';
import { createResourceRouter } from './resource.js';

const router = Router();
router.get('/', async (_request, response) => {
  const entries = await LeaderboardModel.find().sort({ score: -1 }).lean();
  response.json(entries);
});
router.use('/', createResourceRouter(LeaderboardModel));

export default router;
