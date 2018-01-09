import { toJson } from '../../../../formatters/user';
import * as userRepository from '../../repositories/user';
import { NextFunction, Request, Response } from 'express';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await userRepository.list(req.user.church.id);
    const result = users.map(user => toJson(user, req.user.church.id));

    res.json(result);
  } catch (err) {
    next(err);
  }
}