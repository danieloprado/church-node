import * as informativeRepository from '../../repositories/informative';

import { NextFunction, Request, Response } from 'express';

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const informative = await informativeRepository.findById(req.params.id);

    if (!informative) {
      res.status(404).send();
      return;
    }

    res.json(informative);
  } catch (err) {
    next(err);
  }
}