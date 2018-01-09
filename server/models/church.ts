import * as settings from '../settings';

import { ChurchUser } from './churchUser';
import { IChurch } from '../interfaces/church';
import { Model } from 'objection';

export class Church extends Model implements IChurch {
  public id: number;
  public name: string;
  public slug: string;
  public email: string;
  public phone: string;
  public address: string;
  public latitude: number;
  public longitude: number;
  public social: { name: string, url: string }[];
  public users: ChurchUser[];

  static get tableName(): string {
    return 'Church';
  }

  static get relationMappings(): any {
    return {

      users: {
        relation: Model.HasManyRelation,
        modelClass: ChurchUser,
        join: {
          from: 'Church.id',
          to: 'ChurchUser.churchId'
        }
      }

    };
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    json.social = JSON.stringify(!json.social ? [] : json.social);
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    if (settings.isTest) {
      json.social = JSON.parse(json.social || '[]');
    }

    json.social = json.social || [];
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }
}
