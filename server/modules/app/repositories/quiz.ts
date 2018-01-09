import { Transaction } from 'objection';

import { IQuizAnswer } from '../../../interfaces/quizAnswer';
import { QuizAnswer } from '../../../models/quizAnswer';

export async function findAnswer(id: number, transaction?: Transaction): Promise<QuizAnswer> {
  return QuizAnswer.query(transaction).findById(id);
}

export async function insertAnswer(model: IQuizAnswer, transaction?: Transaction): Promise<QuizAnswer> {
  return await QuizAnswer.query(transaction).insert(model);
}

export async function updateAnswer(model: IQuizAnswer, transaction?: Transaction): Promise<QuizAnswer> {
  return await QuizAnswer.query(transaction).updateAndFetchById(model.id, model);
}