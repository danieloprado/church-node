import * as eventService from '../../services/event';
import { NextFunction, Request, Response } from 'express';

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await eventService.remove(req.params.id, req.user);
    res.send();
  } catch (err) {
    next(err);
  }
}