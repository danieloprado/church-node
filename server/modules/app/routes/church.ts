import * as churchRepository from '../repositories/church';
import { NextFunction, Request, Response } from 'express';

export async function church(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await churchRepository.find(req.params.church);
    res.json(result);
  } catch (err) {
    next(err);
  }
}