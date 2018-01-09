import { joi, validateAsPromise } from '../../../services/Joi.config';

const schema = joi.object().keys({
  accessToken: joi.string().required(),
  deviceId: joi.string().required(),
  application: joi.string().required(),
  name: joi.string().required(),
  provider: joi.string().required().valid('facebook').valid('google'),
  notificationToken: joi.string().allow(null)
});

export function validate(model: any): Promise<{
  accessToken: string;
  deviceId: string;
  application: string;
  name: string;
  provider: 'facebook' | 'google';
  notificationToken?: string;
}> {
  return validateAsPromise<any>(model, schema);
}