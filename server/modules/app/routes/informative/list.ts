import * as informativeRepository from '../../repositories/informative';

import { NextFunction, Request, Response } from 'express';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const informatives = await informativeRepository.list(req.params.church, 10);
    res.json(informatives);
  } catch (err) {
    next(err);
  }
}