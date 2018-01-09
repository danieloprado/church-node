import { joi, validateAsPromise } from '../../../services/Joi.config';

import { IQueryList } from '../repositories/churchReport';

const schema = joi.object().keys({
  term: joi.string().trim().allow(null).trim(),
  typeIds: joi.array().items(joi.number().min(1)).min(1).required(),
  beginDate: joi.date().required(),
  endDate: joi.date().required().min(joi.ref('beginDate'))
});

export function validate(model: any): Promise<IQueryList> {
  return validateAsPromise<IQueryList>(model, schema);
}