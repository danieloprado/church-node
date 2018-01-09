import { NextFunction, Request, Response } from 'express';

import * as service from '../../services/churchReport';

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.remove(req.params.id, req.user);
    res.send();
  } catch (err) {
    next(err);
  }
}