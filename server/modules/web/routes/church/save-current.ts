import * as churchService from '../../services/church';
import * as churchValidator from '../../validators/church';
import { NextFunction, Request, Response } from 'express';

export async function saveCurrent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await churchValidator.validate(req.body);
    const church = await churchService.save(model, req.user);
    res.json(church);
  } catch (err) {
    next(err);
  }
}