import { Model, RelationMappings } from 'objection';

import { Church } from './church';
import { ChurchReportType } from './churchReportType';
import { IChurchReport } from '../interfaces/churchReport';
import { User } from './user';

export class ChurchReport extends Model implements IChurchReport {
  public id: number;
  public title: string;
  public date: Date;
  public totalMembers: number;
  public totalNewVisitors: number;
  public totalFrequentVisitors: number;
  public totalKids: number;
  public total: number;
  public creatorId?: number;
  public churchId?: number;
  public typeId: number;

  public type?: ChurchReportType;
  public creator?: User;
  public church?: Church;

  static get tableName(): string {
    return 'ChurchReport';
  }

  static get relationMappings(): RelationMappings {
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChurchReportType,
        filter: (query: any) => query.select('id', 'name'),
        join: {
          from: 'ChurchReport.typeId',
          to: 'ChurchReportType.id'
        }
      },
      creator: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'avatar'),
        join: {
          from: 'ChurchReport.creatorId',
          to: 'User.id'
        }
      },
      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'ChurchReport.churchId',
          to: 'Church.id'
        }
      }
    };
  }

  public $parseDatabaseJson(json: ChurchReport): any {
    json.date = json.date ? new Date(json.date) : null;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }
}
