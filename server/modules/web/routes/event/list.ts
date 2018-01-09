import 'datejs';
import * as eventRepository from '../../repositories/event';
import { NextFunction, Request, Response } from 'express';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { beginDate, endDate } = req.query;

    if (!beginDate || !endDate) {
      res.status(400).json({ message: 'begin and end are required' });
      return;
    }

    beginDate = new Date(beginDate).clearTime();
    endDate = new Date(endDate).at('23:59:59');
    const events = await eventRepository.list(req.user.church.id, beginDate, endDate);
    res.json(events);
  } catch (err) {
    next(err);
  }
}