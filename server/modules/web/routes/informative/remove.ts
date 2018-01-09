import * as informativeService from '../../services/informative';
import { NextFunction, Request, Response } from 'express';

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await informativeService.remove(req.params.id, req.user);
    res.send();
  } catch (err) {
    next(err);
  }
}
