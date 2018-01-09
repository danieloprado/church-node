import { IChurchUser, enRoles } from '../../../interfaces/churchUser';
import { Transaction, transaction } from 'objection';

import { ChurchUser } from '../../../models/churchUser';
import { IUser } from '../../../interfaces/user';
import { IUserSocial } from '../../../interfaces/userSocial';
import { User } from '../../../models/user';
import { UserSocial } from '../../../models/userSocial';

export async function list(churchId: number, role: string = null): Promise<User[]> {
  let query = User.query()
    .eager('[churches, married, socials]')
    .select('User.*')
    .join('ChurchUser', 'User.id', 'ChurchUser.userId')
    .andWhere('ChurchUser.churchId', '=', churchId);

  if (role) {
    query = query.whereNotNull('ChurchUser.roles').andWhere('ChurchUser.roles', 'like', `%${role}%`);
  }

  return await query;
}

export async function count(churchId: number): Promise<Number> {
  const result: any = await User.query()
    .count('User.id')
    .join('ChurchUser', 'User.id', 'ChurchUser.userId')
    .andWhere('ChurchUser.churchId', '=', churchId)
    .first();

  return Number(result.count);
}

export async function findById(id: number): Promise<User> {
  return await User.query().eager('[churches.church,socials]').where({ id }).first();
}

export async function findByEmail(email: string): Promise<User> {
  return await User.query().eager('[churches.church,socials]').where({ email }).first();
}

export async function getIdByEmail(email: string): Promise<number> {
  const user = await User.query().select('id').where({ email }).first();
  return (user || { id: undefined }).id;
}

export async function findBySocial(socialId: string, type: string): Promise<User> {
  return await User.query()
    .eager('[socials, churches.church, married]')
    .select('User.*')
    .join('UserSocial', 'UserSocial.userId', 'User.id')
    .where('UserSocial.ref', '=', socialId)
    .andWhere('UserSocial.provider', '=', type)
    .first();
}

export async function insert(model: IUser, churchId: number, roles: enRoles[]): Promise<User> {
  return await transaction(User.knex(), async transaction => {
    const user = await User.query(transaction).insert(<User>model);

    const churchUser = await ChurchUser
      .query(transaction)
      .insert({ userId: user.id, churchId, roles, isMember: true })
      .returning('*');

    user.churches = [churchUser];

    return user;
  });
}

export async function update(model: IUser, churchId: number = null, roles: enRoles[] = []): Promise<User> {
  return await transaction(User.knex(), async transaction => {
    const user = await User.query(transaction).updateAndFetchById(model.id, <User>model);

    if (churchId && roles) {
      const churchUser = { userId: user.id, churchId, roles };
      await ChurchUser
        .query(transaction)
        .patch(churchUser)
        .where({ userId: user.id, churchId, isMember: true });

      user.churches = <any>[churchUser];
    }

    return user;
  });
}

export async function remove(id: number, transaction: Transaction = null): Promise<void> {
  await User.query(transaction).del().where({ id });
}

export async function insertChurchUser(churchUser: IChurchUser): Promise<ChurchUser> {
  return await ChurchUser.query().insert(<ChurchUser>churchUser).returning('*');
}

export async function updateChurchUser(churchUser: IChurchUser): Promise<IChurchUser> {
  return await ChurchUser.query()
    .patch(<ChurchUser>churchUser)
    .where({ userId: churchUser.userId, churchId: churchUser.churchId })
    .then(() => churchUser);
}

export async function removeChurchUser(churchUser: IChurchUser, transaction: Transaction = null): Promise<void> {
  await ChurchUser.query(transaction).del().where({ userId: churchUser.userId, churchId: churchUser.churchId });
}

export async function insertSocial(model: IUserSocial): Promise<UserSocial> {
  return UserSocial.query().insert(model).returning('*').first();
}

export async function updateSocial(model: IUserSocial): Promise<IUserSocial> {
  return await UserSocial.query()
    .patch(model)
    .where({ userId: model.userId, provider: model.provider })
    .then(() => model);
}