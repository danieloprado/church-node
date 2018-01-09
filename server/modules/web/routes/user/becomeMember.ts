import * as service from '../../services/user';
import * as validator from '../../validators/userBecomeMember';

import { NextFunction, Request, Response } from 'express';

import { toJson } from '../../../../formatters/user';

export async function becomeMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await validator.validate(req.body);
    const user = await service.becomeMember(model.userId, req.user);
    res.json(toJson(user, req.user.church.id));
  } catch (err) {
    next(err);
  }
}