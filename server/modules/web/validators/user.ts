import { enRoles, listPublicRoles } from '../../../interfaces/churchUser';
import { joi, validateAsPromise } from '../../../services/Joi.config';

import { IUser } from '../../../interfaces/user';

let roleSchema = joi.string().trim();

listPublicRoles().forEach(r => {
  roleSchema = roleSchema.valid(r);
});

const schema = joi.object().keys({
  id: joi.number().min(1),
  firstName: joi.string().trim().required().min(3).max(50),
  lastName: joi.string().trim().max(50),
  email: joi.string().trim().email().allow(null).max(150),
  gender: joi.string().trim().valid(null).valid('f').valid('m'),
  roles: joi.array().items(roleSchema).unique(),
  birthday: joi.date().allow(null),
  zipcode: joi.string().trim().zipcode().allow(null),
  address: joi.string().trim().max(150).allow(null),
  neighborhood: joi.string().trim().max(100).allow(null),
  city: joi.string().trim().max(100).allow(null),
  state: joi.string().trim().max(2).allow(null),
  number: joi.string().trim().max(10).allow(null),
  complement: joi.string().trim().max(10).allow(null)
});

export function validate(model: any): Promise<{ user: IUser, roles: enRoles[] }> {
  return validateAsPromise<any>(model, schema).then(user => {
    const roles = user.roles;
    delete user.roles;
    return { user, roles };
  });
}