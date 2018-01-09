import * as lodash from 'lodash';
import * as repository from '../../repositories/churchReport';
import * as validator from '../../validators/churchReportQuery';

import { NextFunction, Request, Response } from 'express';

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.query.typeIds = lodash.flatten([req.query.typeIds]);
    const model = await validator.validate(req.query);

    model.beginDate = new Date(model.beginDate).clearTime();
    model.endDate = new Date(model.endDate).at('23:59:59');

    const result = await repository.list(req.user.church.id, model);
    res.json(result);
  } catch (err) {
    next(err);
  }
}