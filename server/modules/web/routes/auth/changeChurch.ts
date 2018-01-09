import * as authService from '../../services/auth';
import { NextFunction, Request, Response } from 'express';

export async function changeChurch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.body.churchId) {
      res.status(400).json('churchId is required');
      return;
    }

    const token = await authService.changeChurchUserToken(req.user, req.body.churchId);

    res.setHeader('X-Token', token);
    res.json(token);
  } catch (err) {
    next(err);
  }
}