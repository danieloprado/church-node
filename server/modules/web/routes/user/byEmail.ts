import { toJson } from '../../../../formatters/user';
import * as userRepository from '../../repositories/user';
import { NextFunction, Request, Response } from 'express';

export async function byEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await userRepository.findByEmail(req.params.email);

    if (!user) {
      res.status(404).send();
      return;
    }

    if (user.isSysAdmin(req.user.church.id)) {
      res.status(409).send();
      return;
    }

    res.json(toJson(user, req.user.church.id));
  } catch (err) {
    next(err);
  }
}