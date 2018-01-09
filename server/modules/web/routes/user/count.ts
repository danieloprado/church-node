import * as userRepository from '../../repositories/user';

import { NextFunction, Request, Response } from 'express';

export async function count(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const count = await userRepository.count(req.user.church.id);
    res.json(count);
  } catch (err) {
    next(err);
  }
}