import { QueryBuilder, Transaction } from 'objection';

import { IEvent } from '../../../interfaces/event';
import { IEventDate } from '../../../interfaces/eventDate';
import { Event } from '../../../models/event';
import { EventDate } from '../../../models/eventDate';

export async function list(churchId: number, beginDate: Date, endDate: Date): Promise<Event[]> {
  const subquery = EventDate.query()
    .select('EventDate.eventId')
    .where('beginDate', '>=', beginDate)
    .andWhere(query => {
      query.where(query => {
        query.whereNull('endDate').andWhere('beginDate', '<=', endDate);
      }).orWhere(query => {
        query.whereNotNull('endDate').where('endDate', '<=', endDate);
      });
    });

  return await Event.query()
    .eager('dates(onlyBetween)', {
      onlyBetween<EventDate>(builder: QueryBuilder<EventDate>): void {
        builder.where('beginDate', '>=', beginDate).andWhere(query => {
          query.where(query => {
            query.whereNull('endDate').andWhere('beginDate', '<=', endDate);
          }).orWhere(query => {
            query.whereNotNull('endDate').where('endDate', '<=', endDate);
          });
        });
      }
    })
    .select('Event.*')
    .where({ churchId })
    .whereIn('Event.id', subquery);

}

export async function findById(id: number, transaction: Transaction = null): Promise<Event> {
  return await Event.query(transaction).eager('[dates, quiz]').where({ id }).first();
}

export async function insert(event: IEvent, transaction: Transaction): Promise<Event> {
  const result = await Event.query(transaction).insert(<Event>event);
  result.dates = await insertEventDate(result.id, event.dates, transaction);

  return result;
}

export async function update(event: IEvent, transaction: Transaction): Promise<Event> {
  const result = await Event.query(transaction).updateAndFetchById(event.id, <Event>event);

  await EventDate.query(transaction).delete().where({ eventId: event.id });
  result.dates = await insertEventDate(result.id, event.dates, transaction);

  return result;
}

export async function remove(id: number): Promise<void> {
  await Event.query().delete().where({ id });
}

async function insertEventDate(eventId: number, dates: IEventDate[], transaction: Transaction): Promise<EventDate[]> {
  const result: EventDate[] = [];

  for (let date of dates) {
    date.eventId = eventId;

    const eventDate = await EventDate.query(transaction).insert(date).returning('*');
    result.push(eventDate);
  }

  return result;
}