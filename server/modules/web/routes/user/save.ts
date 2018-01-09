import * as userService from '../../services/user';
import * as userValidator from '../../validators/user';

import { NextFunction, Request, Response } from 'express';

import { toJson } from '../../../../formatters/user';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await userValidator.validate(req.body);
    const user = await userService.save(model.user, req.user, model.roles);
    res.json(toJson(user, req.user.church.id));
  } catch (err) {
    next(err);
  }
}