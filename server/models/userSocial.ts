import { IUserSocial } from '../interfaces/userSocial';
import { User } from './user';
import { Model } from 'objection';

export class UserSocial extends Model implements IUserSocial {
  public userId: number;
  public ref: string;
  public provider: string;

  public user: User;

  static get tableName(): string {
    return 'UserSocial';
  }

  static get relationMappings(): any {
    return {

      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'UserSocial.userId',
          to: 'User.id'
        }
      }

    };
  }

}