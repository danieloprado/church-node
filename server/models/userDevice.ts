import { Model } from 'objection';

import { IUserDevice } from '../interfaces/userDevice';
import { User } from './user';

export class UserDevice extends Model implements IUserDevice {
  public deviceId: string;
  public userId: number;
  public application: string;
  public name: string;
  public currentToken: string;
  public notificationToken?: string;

  public user: User;

  static get tableName(): string {
    return 'UserDevice';
  }

  static get relationMappings(): any {
    return {

      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'UserDevice.userId'
        }
      }

    };
  }
}