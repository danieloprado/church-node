import * as profileService from '../../services/profile';
import * as profileValidator from '../../validators/profile';
import * as userFormatter from '../../../../formatters/user';

import { NextFunction, Request, Response } from 'express';

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await profileValidator.validate(req.body);
    const profile = await profileService.save(model, req.user);
    res.json(userFormatter.toJson(profile, req.user.church.id));
  } catch (err) {
    next(err);
  }
}