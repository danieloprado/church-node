import { Event } from './event';
import { IEventDate } from '../interfaces/eventDate';
import { Model } from 'objection';

export class EventDate extends Model implements IEventDate {
  public eventId: number;
  public beginDate: Date;
  public endDate: Date;

  public event: Event;

  static get tableName(): string {
    return 'EventDate';
  }

  static get relationMappings(): any {
    return {

      event: {
        relation: Model.HasOneRelation,
        modelClass: Event,
        join: {
          from: 'EventDate.eventId',
          to: 'Event.id'
        }
      }

    };
  }

  public $parseDatabaseJson(json: EventDate): any {
    json.beginDate = json.beginDate ? new Date(json.beginDate) : null;
    json.endDate = json.endDate ? new Date(json.endDate) : null;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

}