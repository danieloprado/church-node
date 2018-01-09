import { Transaction } from 'objection';

import { IQuiz } from '../../../interfaces/quiz';
import { Quiz } from '../../../models/quiz';

export async function find(id: number, transaction?: Transaction): Promise<Quiz> {
  return Quiz.query(transaction).findById(id);
}

export async function insert(quiz: IQuiz, transaction: Transaction): Promise<Quiz> {
  return await Quiz.query(transaction).insert(quiz);
}

export async function update(quiz: IQuiz, transaction: Transaction): Promise<Quiz> {
  return await Quiz.query(transaction).updateAndFetchById(quiz.id, quiz);
}