import { Transaction } from 'objection';

import { IChurchUser } from '../../../interfaces/churchUser';
import { IUser } from '../../../interfaces/user';
import { IUserDevice } from '../../../interfaces/userDevice';
import { IUserSocial } from '../../../interfaces/userSocial';
import { Church } from '../../../models/church';
import { ChurchUser } from '../../../models/churchUser';
import { User } from '../../../models/user';
import { UserDevice } from '../../../models/userDevice';
import { UserSocial } from '../../../models/userSocial';

export async function findById(id: number): Promise<User> {
  return await User.query()
    .eager('[socials, churches.church]')
    .where({ id })
    .first();
}

export async function findBySocial(socialId: string, type: string, transaction: Transaction = null): Promise<User> {
  return await User.query(transaction)
    .eager('[socials, churches.church, married]')
    .select('User.*')
    .join('UserSocial', 'UserSocial.userId', 'User.id')
    .where('UserSocial.ref', '=', socialId)
    .andWhere('UserSocial.provider', '=', type)
    .first();
}

export async function findByEmail(email: string, transaction: Transaction = null): Promise<User> {
  return await User.query(transaction)
    .eager('[socials, churches.church]')
    .where({ email })
    .first();
}

export async function insert(model: IUser, churchSlug: string, transaction: Transaction): Promise<User> {
  const church: Church = await Church.query(transaction)
    .where('slug', '=', churchSlug)
    .first();

  const user = await User.query(transaction).insert(<User>model);
  const churchUser: ChurchUser = await ChurchUser.query(transaction).insert({
    userId: user.id,
    churchId: church.id,
    roles: []
  }).returning('*');

  churchUser.church = church;
  user.churches = [churchUser];

  return user;
}

export async function update(model: IUser, transaction: Transaction = null): Promise<User> {
  return await User.query(transaction).updateAndFetchById(model.id, <User>model);
}

export async function insertSocial(model: IUserSocial, transaction: Transaction = null): Promise<UserSocial> {
  return UserSocial.query(transaction).insert(model).returning('*').first();
}

export async function updateSocial(model: IUserSocial, transaction: Transaction = null): Promise<IUserSocial> {
  return await UserSocial.query(transaction)
    .patch(model)
    .where({ userId: model.userId, provider: model.provider })
    .then(() => model);
}

export async function byDevice(userId: number, deviceId: string, application: string): Promise<User> {
  return await User.query()
    .eager('[churches.church]')
    .select('User.*')
    .join('UserDevice', 'UserDevice.userId', 'User.id')
    .where('User.id', '=', userId)
    .andWhere('UserDevice.deviceId', '=', deviceId)
    .andWhere('UserDevice.application', '=', application)
    .first();
}

export async function getDevice(userId: number, deviceId: string, application: string): Promise<UserDevice> {
  return await UserDevice.query()
    .eager('user.churches.church')
    .where({ userId, deviceId, application })
    .first();
}

export async function insertDevice(model: IUserDevice): Promise<UserDevice> {
  return await UserDevice.query().insert(<UserDevice>model).returning('*').first();
}

export async function updateDevice(model: IUserDevice): Promise<UserDevice> {
  return await UserDevice.query()
    .patch(<UserDevice>model)
    .where({ userId: model.userId, deviceId: model.deviceId, application: model.application })
    .then(() => <any>model);
}

export async function removeDevice(userId: number, deviceId: string, application: string): Promise<void> {
  await UserDevice.query().delete().where({ userId, deviceId, application });
}

export async function findChurchUser(userId: number, churchId: number): Promise<ChurchUser> {
  return await ChurchUser.query().where({ userId, churchId }).first();
}

export async function updateChurchUser(model: IChurchUser): Promise<ChurchUser> {
  await ChurchUser.query().update(<any>model).where({ userId: model.userId, churchId: model.churchId });
  return <any>model;
}