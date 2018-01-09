import { IQuizAnswer } from '../../../interfaces/quizAnswer';
import { IUserToken } from '../../../interfaces/userToken';
import * as quizRepository from '../repositories/quiz';

export async function saveAnswer(model: IQuizAnswer, currentUser: IUserToken): Promise<IQuizAnswer> {
  if (currentUser) {
    model.createdBy = currentUser.id;
  }

  if (!model.id) return await _createAnswer(model);
  return await _updateAnswer(model);
}

async function _createAnswer(model: IQuizAnswer): Promise<IQuizAnswer> {
  return quizRepository.insertAnswer(model);
}

async function _updateAnswer(model: IQuizAnswer): Promise<IQuizAnswer> {
  return quizRepository.updateAnswer(model);
}