import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import * as errors from './middlewares/errors';
import { router as appRouter } from './modules/app/routes';
import { router as contentRouter } from './modules/content/routes';
import { router as webRouter } from './modules/web/routes';
import * as notificationService from './services/notification';

export const router = Router();

router.use('/web', webRouter);
router.use('/app/:church', appRouter);
router.use('/content', contentRouter);

router.get('/test-error', (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Test'));
});

router.get('/test-user', (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
});

router.get('/test-notification', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any = await notificationService.sendByUser(1, 'Teste', 'Apenas um teste', {
      action: 'open-informative',
      data: { id: 46 }
    });

    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

router.use(errors.notFound);