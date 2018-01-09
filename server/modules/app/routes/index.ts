import { Router } from 'express';

import { autoRenewToken } from '../middlewares/renewToken';
import { church } from './church';
import { router as cuhrchReportsRouter } from './churchReport';
import { events } from './events';
import { router as informativeRouter } from './informative';
import { router as profileRouter } from './profile/index';
import { router as quizRouter } from './quiz';
import { router as registerRouter } from './register';

export const router = Router({ mergeParams: true });

router.use(autoRenewToken);

router.get('/info', church);
router.get('/events', events);

router.use('/informatives', informativeRouter);
router.use('/church-report', cuhrchReportsRouter);
router.use('/profile', profileRouter);
router.use('/register', registerRouter);
router.use('/quiz', quizRouter);