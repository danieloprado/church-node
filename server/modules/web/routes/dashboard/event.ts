import 'datejs';
import * as eventRepository from '../../repositories/event';
import { NextFunction, Request, Response } from 'express';

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const now = new Date();
    const maxDate = new Date().addDays(7);

    const events = await eventRepository.list(req.user.church.id, now, maxDate);
    res.json(events);
  } catch (err) {
    next(err);
  }
}