import * as eventService from '../../services/event';
import * as eventValidator from '../../validators/event';
import { NextFunction, Request, Response } from 'express';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await eventValidator.validate(req.body);
    const event = await eventService.save(model, req.user);
    res.json(event);
  } catch (err) {
    next(err);
  }
}
