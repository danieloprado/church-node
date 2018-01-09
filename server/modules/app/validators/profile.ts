import { IUser } from '../../../interfaces/user';
import { joi, validateAsPromise } from '../../../services/Joi.config';

const schema = joi.object().keys({
  firstName: joi.string().required().min(3).max(50),
  lastName: joi.string().max(50),
  email: joi.string().email().allow(null).max(150),
  gender: joi.string().valid(null).valid('f').valid('m'),
  birthday: joi.date().allow(null),
  zipcode: joi.string().zipcode().allow(null),
  address: joi.string().max(150).allow(null),
  neighborhood: joi.string().max(100).allow(null),
  city: joi.string().max(100).allow(null),
  state: joi.string().max(2).allow(null),
  number: joi.string().max(10).allow(null),
  complement: joi.string().max(10).allow(null)
});

export function validate(model: any): Promise<IUser> {
  return validateAsPromise<IUser>(model, schema);
}