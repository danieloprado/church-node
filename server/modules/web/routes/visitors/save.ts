import * as informativeService from '../../services/informative';
import * as informativeValidator from '../../validators/informative';

import { NextFunction, Request, Response } from 'express';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await informativeValidator.validate(req.body);
    const informative = await informativeService.save(model, req.user);
    res.json(informative);
  } catch (err) {
    next(err);
  }
}