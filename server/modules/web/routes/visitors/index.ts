import { Router } from 'express';

import { enQuizPurpose, enQuizQuestionType } from '../../../../interfaces/quiz';
import { Quiz } from '../../../../models/quiz';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Quiz.query();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/create', async (req, res, next) => {
  try {
    const result = await Quiz.query().insert({
      purpose: enQuizPurpose.welcomeCard,
      churchId: 1,
      version: 1,
      questions: [{
        id: '1',
        title: 'Escolha',
        description: '',
        type: enQuizQuestionType.chooseOne,
        required: true,
        options: [{
          title: 'Primero',
          description: 'teste'
        }, {
          title: 'Segundo'
        }],
        enableOtherOption: true
      }, {
        id: '2',
        title: 'string',
        description: '',
        type: enQuizQuestionType.text,
        required: false,
        enableOtherOption: false
      }]
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});