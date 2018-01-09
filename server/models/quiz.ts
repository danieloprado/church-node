import { Model } from 'objection';

import { enQuizPurpose, IQuiz, IQuizQuestion } from '../interfaces/quiz';
import { Church } from './church';

export class Quiz extends Model implements IQuiz {
  public id: number;
  public purpose: enQuizPurpose;
  public churchId: number;
  public version: number;
  public questions: IQuizQuestion[];
  public createdDate: Date;
  public updatedDate: Date;

  public church: Church;

  static get tableName(): string {
    return 'Quiz';
  }

  static get relationMappings(): any {
    return {
      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'Quiz.churchId',
          to: 'Church.id'
        }
      }

    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    json.questions = JSON.stringify(json.questions || []);
    return json;
  }

  public $parseDatabaseJson(json: Quiz): any {
    json.createdDate = json.createdDate ? new Date(json.createdDate) : null;
    json.updatedDate = json.updatedDate ? new Date(json.updatedDate) : null;
    json.questions = typeof json.questions === 'string' ? JSON.parse(json.questions as any) : json.questions;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

}
