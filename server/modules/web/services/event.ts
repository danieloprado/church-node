import { transaction, Transaction } from 'objection';

import { IEvent } from '../../../interfaces/event';
import { enQuizPurpose } from '../../../interfaces/quiz';
import { IUserToken } from '../../../interfaces/userToken';
import { Event } from '../../../models/event';
import * as uploadService from '../../../services/upload';
import * as eventRepository from '../repositories/event';
import { IEventValidatorResult } from '../validators/event';
import * as quizService from './quiz';

export async function save(model: IEventValidatorResult, user: IUserToken): Promise<Event> {
  let createdImage: string = null, removeOldImage: string = null;

  try {
    const result = await transaction(Event.knex(), async transaction => {
      let quiz;

      if (model.quiz) {
        model.quiz.churchId = user.church.id;
        model.quiz.purpose = enQuizPurpose.event;

        quiz = await quizService.save(model.quiz, transaction);
        model.quizId = quiz.id;
      }

      if (model.image && typeof model.image === 'object' && model.image.base64) {
        createdImage = model.image = await uploadService.save(model.image.filename, model.image.base64);
      }

      if (!model.id) {
        const event = await _create(model as any, user, transaction);
        event.quiz = quiz;

        return event;
      }
      const { oldImage, event } = await _update(model as any, user, transaction);
      removeOldImage = oldImage;
      event.quiz = quiz;

      return event;
    });

    if (removeOldImage) uploadService.remove(removeOldImage);
    return result;

  } catch (err) {
    if (createdImage) uploadService.remove(createdImage);
    throw err;
  }

}

async function _create(model: IEvent, user: IUserToken, transaction: Transaction): Promise<Event> {
  model.churchId = user.church.id;
  return await eventRepository.insert(model, transaction);
}

async function _update(model: IEvent, user: IUserToken, transaction: Transaction): Promise<{ oldImage: string, event: Event }> {
  const event = await eventRepository.findById(model.id, transaction);

  if (!event) throw new Error('not-found');
  if (event.churchId !== user.church.id) throw new Error('access-denied');

  const result = await eventRepository.update(model, transaction);
  return {
    oldImage: event.image !== model.image ? event.image : null,
    event: result
  };
}

export async function remove(id: number, user: IUserToken): Promise<void> {
  const event = await eventRepository.findById(id);

  if (!event) throw new Error('not-found');
  if (event.churchId !== user.church.id) throw new Error('access-denied');

  await eventRepository.remove(id);
}