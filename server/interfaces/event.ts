import { IEventDate } from './eventDate';
import { IQuiz } from './quiz';

export interface IEvent {
  id: number;
  churchId?: number;
  title: string;
  description: string;
  dates: IEventDate[];

  featured: boolean;
  featuredText?: string;
  image?: string;
  quizId?: number;

  enableQuiz: boolean;
  quiz?: IQuiz;
}