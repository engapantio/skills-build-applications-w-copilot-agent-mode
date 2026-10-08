import { Router } from 'express';
import UserModel from '../models/user.js';
import { createResourceRouter } from './resource.js';

const router = Router();
router.use('/', createResourceRouter(UserModel));

export default router;
