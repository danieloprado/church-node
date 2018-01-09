import { toJson } from '../../../../formatters/church';
import * as churchRepository from '../../repositories/church';
import { NextFunction, Request, Response } from 'express';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const churchs = await churchRepository.findByUser(req.user.id);
    res.json(churchs.map(c => toJson(c, req.user.id)));
  } catch (err) {
    next(err);
  }
}