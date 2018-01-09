import * as lodash from 'lodash';
import * as mail from './mail';
import * as userRepository from '../repositories/user';

import { IUser } from '../../../interfaces/user';
import { IUserToken } from '../../../interfaces/userToken';
import { ServiceError } from '../../../errors/service';
import { User } from '../../../models/user';
import { enRoles } from '../../../interfaces/churchUser';

export async function save(model: IUser, currentUser: IUserToken, roles: enRoles[] = []): Promise<User> {
  if (roles.length > 0) {
    roles.push(enRoles.webAdmin);
  }

  if (model.email) {
    model.id = await userRepository.getIdByEmail(model.email);
  }

  if (model.id) return await update(model, currentUser, roles);
  return await create(model, currentUser, roles);
}

export async function remove(userId: number, currentUser: IUserToken): Promise<void> {
  const user = await userRepository.findById(userId);

  if (user.id === currentUser.id) {
    throw new ServiceError('not-allowed-remove-current-user');
  }

  if (user.isSysAdmin(currentUser.church.id)) {
    throw new ServiceError('not-allowed-sysAdmin');
  }

  return await userRepository.removeChurchUser({ userId, churchId: currentUser.church.id, roles: [] });
}

export async function becomeMember(userId: number, currentUser: IUserToken): Promise<User> {
  const user = await userRepository.findById(userId);
  if (!user) throw new ServiceError('not-found');

  const churchUser = user.churches.find(c => c.churchId === currentUser.id);
  if (!churchUser) throw new ServiceError('not-found');

  if (churchUser.isMember) return user;

  churchUser.isMember = true;
  await userRepository.updateChurchUser(churchUser);

  return user;
}

async function create(model: IUser, currentUser: IUserToken, roles: enRoles[] = []): Promise<User> {
  const { password, hash } = await User.generatePassword();
  model.password = hash;

  const user = await userRepository.insert(model, currentUser.church.id, roles);

  if (roles.length && user.email) {
    await mail.sendUserCreate(user, password);
  }

  return user;
}

async function update(model: IUser, currentUser: IUserToken, roles: enRoles[]): Promise<User> {
  const user = await userRepository.findById(model.id);
  if (!user) throw new ServiceError('not-found');

  lodash.merge(user, model);

  if (user.isSysAdmin(currentUser.church.id)) {
    return await userRepository.update(user);
  }

  return await userRepository.update(user, currentUser.church.id, roles);
}