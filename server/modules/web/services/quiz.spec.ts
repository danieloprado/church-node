import 'datejs';
import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as lodash from 'lodash';

import { enQuizPurpose, enQuizQuestionType, IQuiz } from '../../../interfaces/quiz';
import { Quiz } from '../../../models/quiz';
import * as service from './quiz';

use(chaiAsPromise);

describe('web/services/quiz', () => {
  const quiz: IQuiz = {
    id: null,
    purpose: enQuizPurpose.welcomeCard,
    churchId: 1,
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
  };

  it('should create a new quiz when id is not present', () => {
    return expect(service.save(quiz)).to.be.fulfilled.then((result: Quiz) => {
      quiz.id = result.id;

      expect(result).to.be.an.instanceOf(Quiz);
      expect(result.id).to.be.greaterThan(0);
      expect(result.churchId).to.be.equal(quiz.churchId);
      expect(result.version).to.be.equal(1);
      expect(JSON.stringify(result.questions)).to.be.equal(JSON.stringify(quiz.questions));
    });
  });

  it('should update a new quiz when id is present and not change version if questions are same', () => {
    return expect(service.save(lodash.cloneDeep(quiz))).to.be.fulfilled.then((result: Quiz) => {
      expect(result).to.be.an.instanceOf(Quiz);
      expect(result.id).to.be.equal(quiz.id);
      expect(result.churchId).to.be.equal(quiz.churchId);
      expect(JSON.stringify(result.questions)).to.be.equal(JSON.stringify(quiz.questions));
      expect(result.version).to.be.equal(result.version);
    });
  });

  it('should update a new quiz when id is present and change version if questions not are same', () => {
    quiz.questions.pop();
    return expect(service.save(quiz)).to.be.fulfilled.then((result: Quiz) => {
      expect(result).to.be.an.instanceOf(Quiz);
      expect(result.id).to.be.equal(quiz.id);
      expect(result.churchId).to.be.equal(quiz.churchId);
      expect(result.version).to.be.equal(2);
      expect(JSON.stringify(result.questions)).to.be.equal(JSON.stringify(quiz.questions));
    });
  });

});