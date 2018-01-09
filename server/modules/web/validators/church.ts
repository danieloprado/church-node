import { IChurch } from '../../../interfaces/church';
import { joi, validateAsPromise } from '../../../services/Joi.config';

const socialSchema = joi.object().keys({
  name: joi.string().trim().required(),
  url: joi.string().trim().uri().required()
});

const schema = joi.object().keys({
  name: joi.string().trim().min(3).max(100).required(),
  email: joi.string().trim().email().max(150).allow(null),
  phone: joi.string().trim().max(20).phone().allow(null),
  address: joi.string().trim().max(100).allow(null),
  latitude: joi.number().allow(null),
  longitude: joi.number().allow(null),
  social: joi.array().items(socialSchema)
}).and('latitude', 'longitude');

export function validate(model: any): Promise<IChurch> {
  return validateAsPromise<IChurch>(model, schema);
}