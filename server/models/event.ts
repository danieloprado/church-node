import { Model } from 'objection';

import { IEvent } from '../interfaces/event';
import { Church } from './church';
import { EventDate } from './eventDate';
import { Quiz } from './quiz';

export class Event extends Model implements IEvent {
  public id: number;
  public churchId: number;
  public title: string;
  public description: string;

  public featured: boolean;
  public featuredText?: string;
  public image?: string;

  public enableQuiz: boolean;
  public quizId?: number;

  public dates: EventDate[];
  public quiz?: Quiz;

  static get tableName(): string {
    return 'Event';
  }

  static get relationMappings(): any {
    return {

      dates: {
        relation: Model.HasManyRelation,
        modelClass: EventDate,
        join: {
          from: 'Event.id',
          to: 'EventDate.eventId'
        }
      },

      church: {
        relation: Model.HasOneRelation,
        modelClass: Church,
        filter: (query: any) => query.select('id', 'name', 'slug'),
        join: {
          from: 'Event.churchId',
          to: 'Church.id'
        }
      },

      quiz: {
        relation: Model.HasOneRelation,
        modelClass: Quiz,
        join: {
          from: 'Event.quizId',
          to: 'Quiz.id'
        }
      }

    };
  }

  public $parseDatabaseJson(json: Event): any {
    json.featured = !!json.featured;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }
}