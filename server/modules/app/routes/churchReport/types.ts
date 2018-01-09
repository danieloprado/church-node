import * as repository from '../../repositories/churchReport';
import { NextFunction, Request, Response } from 'express';

export async function types(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await repository.types(req.user.church.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}