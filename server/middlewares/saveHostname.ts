import { Request, Response, NextFunction } from 'express';
import * as urlService from '../services/url';

export function saveHostname(req: Request, res: Response, next: NextFunction): void {
  urlService.setHostName(`${req.protocol}://${req.get('host')}`);
  next();
}