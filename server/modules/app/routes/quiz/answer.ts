import { NextFunction, Request, Response } from 'express';

import * as quizService from '../../services/quiz';

export async function answer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await quizService.saveAnswer(req.body, req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
}