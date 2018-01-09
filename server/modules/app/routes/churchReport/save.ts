import * as service from '../../services/churchReport';
import * as validator from '../../validators/churchReport';

import { NextFunction, Request, Response } from 'express';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await validator.validate(req.body);
    const result = await service.save(req.user, model);
    res.json(result);
  } catch (err) {
    next(err);
  }
}