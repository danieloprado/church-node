import { IChurchUser, enRoles } from '../interfaces/churchUser';

import { Church } from './church';
import { Model } from 'objection';
import { User } from './user';

export class ChurchUser extends Model implements IChurchUser {
  public userId: number;
  public churchId: number;
  public roles: enRoles[];
  public lastAppDateAccess?: Date;
  public isMember: boolean;

  public church: Church;
  public user: User;

  static get tableName(): string {
    return 'ChurchUser';
  }

  static get relationMappings(): any {
    return {

      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'ChurchUser.userId',
          to: 'User.id'
        }
      },
      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'ChurchUser.churchId',
          to: 'Church.id'
        }
      }

    };
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    json.roles = json.roles && json.roles.length ? json.roles.join(',') : null;
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    json.roles = json.roles ? json.roles.split(',') : [];
    json.lastAppDateAccess = json.lastAppDateAccess ? new Date(json.lastAppDateAccess) : null;
    json.isMember = !!json.isMember;

    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

}
