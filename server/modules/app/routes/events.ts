import 'datejs';

import { NextFunction, Request, Response } from 'express';

import * as eventFormatter from '../../../formatters/event';
import * as eventRepository from '../repositories/event';

export async function events(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const maxDate = Date.today().addMonths(6).at('23:59:59');
    const events = await eventRepository.listFuture(req.params.church, maxDate);
    res.json(events.map(e => eventFormatter.toJson(e)));
  } catch (err) {
    next(err);
  }
}