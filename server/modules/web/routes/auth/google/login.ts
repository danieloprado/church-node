import * as googleService from '../../../../../services/google';
import { NextFunction, Request, Response } from 'express';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.redirect(await googleService.loginUrl());
  } catch (err) {
    next(err);
  }

}