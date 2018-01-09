import { joi, validateAsPromise } from '../../../services/Joi.config';

const schema = joi.object().keys({
  notificationToken: joi.string().required(),
  deviceId: joi.string().required(),
  application: joi.string().required()
});

export function validate(model: any): Promise<{
  notificationToken: string,
  deviceId: string,
  application: string
}> {
  return validateAsPromise(model, schema);
}