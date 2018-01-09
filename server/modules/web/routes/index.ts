import * as errors from '../../../middlewares/errors';

import { Router } from 'express';
import { authRequired } from '../../../middlewares/authRequired';
import { router as authRouter } from './auth';
import { autoRenewToken } from '../middlewares/renewToken';
import { router as churchReportRouter } from './churchReport';
import { router as churchRouter } from './church';
import { router as dashboardRouter } from './dashboard';
import { enRoles } from '../../../interfaces/churchUser';
import { router as eventRouter } from './event';
import { router as informativeRouter } from './informative';
import { router as userRouter } from './user';
import { router as visitorsRouter } from './visitors';

export const router = Router();

router.use('/auth', authRouter);
router.use('/visitors', visitorsRouter);

router.use(autoRenewToken);
router.use(authRequired(enRoles.webAdmin));

router.use('/dashboard', dashboardRouter);
router.use('/church', churchRouter);
router.use('/event', eventRouter);
router.use('/informative', informativeRouter);
router.use('/user', userRouter);
router.use('/church-report', churchReportRouter);

router.use(errors.notFound);