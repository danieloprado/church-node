import { NextFunction, Request, Response } from 'express';

import * as socialService from '../../../../services/social';
import * as authService from '../../services/auth';
import * as registerService from '../../services/register';
import * as registerValidator from '../../validators/register';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const churchSlug = req.params.church;
    const model = await registerValidator.validate(req.body);
    const socialUser = await socialService.getUserInfo(model.provider, model.accessToken);

    const user = await registerService.register(socialUser, churchSlug);
    const result = await authService.generateTokens(user, churchSlug, model);

    res.json(result);
  } catch (err) {
    if (err.name === 'invalid-social' || err.message === 'invalid-social') {
      res.status(400).json(err.message);
      return;
    }

    next(err);
  }
}