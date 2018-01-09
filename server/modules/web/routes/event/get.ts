import * as eventRepository from '../../repositories/event';
import { NextFunction, Request, Response } from 'express';

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event = await eventRepository.findById(req.params.id);

    if (!event) {
      res.status(404).send();
      return;
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
}