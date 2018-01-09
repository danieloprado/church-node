import { Church } from './church';
import { IChurchReportType } from '../interfaces/churchReportType';
import { Model } from 'objection';

export class ChurchReportType extends Model implements IChurchReportType {
  public id: number;
  public name: string;
  public churchId: number;

  public church?: Church;

  static get tableName(): string {
    return 'ChurchReportType';
  }

  static get relationMappings(): any {
    return {

      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'ChurchReportType.churchId',
          to: 'Church.id'
        }
      }

    };
  }

}
