import { joi, validateAsPromise } from '../../../services/Joi.config';

const schema = joi.object().keys({
  email: joi.string().trim().email().required()
});

export function validate(model: any): Promise<{ email: string }> {
  return validateAsPromise<any>(model, schema);
}