import { Model } from 'objection';
import * as generatePassword from 'password-generator';

import { enRoles } from '../interfaces/churchUser';
import { IUser } from '../interfaces/user';
import * as bcrypt from '../services/bcrypt';
import { ChurchUser } from './churchUser';
import { UserDevice } from './userDevice';
import { UserSocial } from './userSocial';

export class User extends Model implements IUser {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public avatar: string;
  public gender: string;
  public birthday: Date;
  public zipcode?: string;
  public address?: string;
  public neighborhood?: string;
  public city?: string;
  public state?: string;
  public number?: string;
  public complement?: string;
  public marriedId: number;

  public married?: User;
  public socials?: UserSocial[];
  public churches?: ChurchUser[];
  public devices?: UserDevice[];

  public createdDate: Date;
  public updatedDate: Date;

  static get tableName(): string {
    return 'User';
  }

  static get relationMappings(): any {
    return {

      married: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName'),
        join: {
          from: 'User.marriedId',
          to: 'User.id'
        }
      },

      churches: {
        relation: Model.HasManyRelation,
        modelClass: ChurchUser,
        join: {
          from: 'User.id',
          to: 'ChurchUser.userId'
        }
      },

      socials: {
        relation: Model.HasManyRelation,
        modelClass: UserSocial,
        join: {
          from: 'User.id',
          to: 'UserSocial.userId'
        }
      },

      devices: {
        relation: Model.HasManyRelation,
        modelClass: UserDevice,
        join: {
          from: 'User.id',
          to: 'UserDevice.userId'
        }
      },

    };
  }

  public static generatePassword(): Promise<{ password: string, hash: string }> {
    const password = generatePassword(6);
    return bcrypt.hash(password).then(hash => {
      return { password, hash };
    });
  }

  public setPassword(password: string): Promise<void> {
    return bcrypt.hash(password).then(hash => {
      this.password = hash;
    });
  }

  public checkPassword(password: string): Promise<void> {
    return bcrypt.compare(this.password, password);
  }

  public isSysAdmin(churchId: number): boolean {
    return this.churches.some(c => {
      return c.churchId == churchId && c.roles.includes(enRoles.sysAdmin);
    });
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $parseDatabaseJson(json: User): any {
    json.birthday = json.birthday ? new Date(json.birthday) : null;
    json.createdDate = json.createdDate ? new Date(json.createdDate) : null;
    json.updatedDate = json.updatedDate ? new Date(json.updatedDate) : null;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }
}