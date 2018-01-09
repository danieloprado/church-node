import { getEvents } from './event';
import { Router } from 'express';

export const router = Router();
router.get('/event', getEvents);