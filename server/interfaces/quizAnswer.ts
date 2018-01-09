import { IQuizQuestion } from './quiz';

export interface IQuizAnswerItem extends IQuizQuestion {
  answer: string;
}

export interface IQuizAnswer {
  id: number;
  quizId: number;
  quizVersion: number;
  answers: IQuizAnswerItem[];

  createdBy?: number;

  createdDate?: Date;
  updatedDate?: Date;
}