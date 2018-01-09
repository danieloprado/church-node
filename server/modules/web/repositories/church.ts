import { Church } from '../../../models/church';
import { IChurch } from '../../../interfaces/church';
import { QueryBuilder } from 'objection';

export async function findById(id: number): Promise<Church> {
  return await Church.query().where({ id }).first();
}

export async function findByUser(userId: number): Promise<Church[]> {
  return await Church.query()
    .eager('users(onlyCurrent)', {
      onlyCurrent<User>(builder: QueryBuilder<User>): void {
        builder.where({ userId });
      }
    })
    .select('Church.*')
    .join('ChurchUser', 'Church.id', 'ChurchUser.churchId')
    .where('ChurchUser.userId', '=', userId);
}

export async function update(church: IChurch): Promise<Church> {
  return await Church.query().updateAndFetchById(church.id, <Church>church);
}