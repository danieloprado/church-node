import { joi, validateAsPromise } from '../../../services/Joi.config';

interface ILogoutValidatorResult {
  deviceId: string;
  application: string;
}

const schema = joi.object({
  deviceId: joi.string().required(),
  application: joi.string().required()
});

export function validate(model: any): Promise<ILogoutValidatorResult> {
  return validateAsPromise<ILogoutValidatorResult>(model, schema);
}