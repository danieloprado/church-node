import { IEvent } from '../interfaces/event';
import * as urlService from '../services/url';

export function toJson(event: IEvent): IEvent {
  if (!event) return;

  if (event.image && !event.image.startsWith('http')) {
    event.image = urlService.content(event.image);
  }

  return event;
}