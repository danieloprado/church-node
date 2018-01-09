import { Church } from './church';
import { IInformative } from '../interfaces/informative';
import { Model } from 'objection';
import { User } from './user';

export class Informative extends Model implements IInformative {
  public id: number;
  public title: string;
  public date: Date;
  public message: string;
  public creatorId: number;
  public churchId: number;
  public typeId: number;

  static get tableName(): string {
    return 'Informative';
  }

  static get relationMappings(): any {
    return {

      creator: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'avatar'),
        join: {
          from: 'Informative.creatorId',
          to: 'User.id'
        }
      },

      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'Informative.churchId',
          to: 'Church.id'
        }
      }

    };
  }

  public $parseDatabaseJson(json: Informative): any {
    json.date = json.date ? new Date(json.date) : null;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

}
