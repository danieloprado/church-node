import { joi, validateAsPromise } from '../../../services/Joi.config';

const schema = joi.object().keys({
  userId: joi.number().min(1).required()
});

export function validate(model: any): Promise<{ userId: number }> {
  return validateAsPromise<any>(model, schema);
}