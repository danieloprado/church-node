import { joi, validateAsPromise } from '../../../services/Joi.config';

import { IInformative } from '../../../interfaces/informative';

const schema = joi.object().keys({
  id: joi.number().integer().min(1),
  title: joi.string().trim().required().min(3).max(100),
  date: joi.date().required(),
  message: joi.string().trim().required().min(3),
  typeId: joi.number().required().integer().min(1)
});

export function validate(model: any): Promise<IInformative> {
  return validateAsPromise<IInformative>(model, schema);
}