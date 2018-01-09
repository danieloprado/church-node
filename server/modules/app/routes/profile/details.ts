import * as userFormatter from '../../../../formatters/user';
import * as userRepository from '../../repositories/user';

import { NextFunction, Request, Response } from 'express';

export async function details(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await userRepository.findById(req.user.id);

    if (!profile) {
      res.status(404).json('not-found');
      return;
    }

    res.json(userFormatter.toJson(profile, req.user.id));
  } catch (err) {
    next(err);
  }
}