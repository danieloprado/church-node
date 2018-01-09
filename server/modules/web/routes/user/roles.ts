import { listPublicRoles } from '../../../../interfaces/churchUser';
import { NextFunction, Request, Response } from 'express';

export function roles(req: Request, res: Response, next: NextFunction): void {
  res.json(listPublicRoles());
}