import * as lodash from 'lodash';
import * as userRepository from '../repositories/user';

import { ChurchUser } from '../../../models/churchUser';
import { IUser } from '../../../interfaces/user';
import { IUserToken } from '../../../interfaces/userToken';
import { ServiceError } from '../../../errors/service';
import { User } from '../../../models/user';

export async function save(model: IUser, currentUser: IUserToken): Promise<User> {
  delete model.id;

  const user = await userRepository.findById(currentUser.id);
  if (!user) throw new ServiceError('not-found');

  lodash.merge(user, model);

  return await userRepository.update(user);
}

export async function appOpened(currentUser: IUserToken): Promise<ChurchUser> {
  const user = await userRepository.findChurchUser(currentUser.id, currentUser.church.id);
  if (!user) throw new ServiceError('not-found');

  user.lastAppDateAccess = new Date();

  return await userRepository.updateChurchUser(user);
}