import { Model } from 'objection';

import { IQuizAnswer, IQuizAnswerItem } from '../interfaces/quizAnswer';

export class QuizAnswer extends Model implements IQuizAnswer {
  public id: number;
  public quizId: number;
  public quizVersion: number;
  public answers: IQuizAnswerItem[];
  public createdBy?: number;
  public createdDate: Date;
  public updatedDate: Date;

  static get tableName(): string {
    return 'QuizAnswer';
  }

  static get relationMappings(): any {
    return {};
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    json.answers = JSON.stringify(json.answers || []);
    return json;
  }

  public $parseDatabaseJson(json: QuizAnswer): any {
    json.createdDate = json.createdDate ? new Date(json.createdDate) : null;
    json.updatedDate = json.updatedDate ? new Date(json.updatedDate) : null;
    json.answers = typeof json.answers === 'string' ? JSON.parse(json.answers as any) : json.answers;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

}
