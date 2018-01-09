import 'datejs';

import { QueryBuilder } from 'objection';

import { Event } from '../../../models/event';
import { EventDate } from '../../../models/eventDate';

export async function listFuture(slug: string, maxDate: Date = null): Promise<Event[]> {
  const beginDate = new Date().clearTime();

  const subquery = EventDate.query()
    .select('EventDate.eventId')
    .where('beginDate', '>=', beginDate)
    .andWhere(query => {
      query.where(query => {
        query.whereNull('endDate').andWhere('beginDate', '<=', maxDate);
      }).orWhere(query => {
        query.whereNotNull('endDate').where('endDate', '<=', maxDate);
      });
    });

  return await Event.query()
    .eager('[dates(onlyBetween), quiz]', {
      onlyBetween<EventDate>(builder: QueryBuilder<EventDate>): void {
        builder.where('beginDate', '>=', beginDate).andWhere(query => {
          query.where(query => {
            query.whereNull('endDate').andWhere('beginDate', '<=', maxDate);
          }).orWhere(query => {
            query.whereNotNull('endDate').where('endDate', '<=', maxDate);
          });
        });
      }
    })
    .select('Event.*')
    .join('Church', 'Event.churchId', 'Church.id')
    .where('Church.slug', '=', slug)
    .whereIn('Event.id', subquery);
}