import { enTokenType } from '../services/token';
import { IUserToken } from '../interfaces/userToken';
import { Request, Response, NextFunction } from 'express';
import * as tokenService from '../services/token';

export async function bindUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.get('Authorization');
    if (!token) throw '';
    req.user = await tokenService.verify<IUserToken>(token.split(' ')[1], enTokenType.userToken);
  } finally {
    next();
  }
}
