import * as lodash from 'lodash';
import { Transaction } from 'objection';

import { IQuiz } from '../../../interfaces/quiz';
import { Quiz } from '../../../models/quiz';
import * as quizRepository from '../repositories/quiz';

export async function save(model: IQuiz, transaction?: Transaction): Promise<Quiz> {
  if (!model.id) return await _create(model, transaction);
  return await _update(model, transaction);
}

async function _create(model: IQuiz, transaction?: Transaction): Promise<Quiz> {
  model.version = 1;
  return quizRepository.insert(model, transaction);
}

async function _update(model: IQuiz, transaction?: Transaction): Promise<Quiz> {
  model.version++;
  const quiz = await quizRepository.find(model.id);

  if (lodash.isEqual(quiz.questions, model.questions)) {
    return quiz;
  }

  return quizRepository.update(model, transaction);
}