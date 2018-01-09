import * as churchRepository from '../../repositories/church';
import { NextFunction, Request, Response } from 'express';

export async function current(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const church = await churchRepository.findById(req.user.church.id);
    res.json(church);
  } catch (err) {
    next(err);
  }
}