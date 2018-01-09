import 'datejs';
import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as _ from 'lodash';

import { IEvent } from '../../../interfaces/event';
import { enQuizPurpose, enQuizQuestionType } from '../../../interfaces/quiz';
import { IUserToken } from '../../../interfaces/userToken';
import { Event } from '../../../models/event';
import * as service from './event';

use(chaiAsPromise);

describe('web/services/event', () => {
  const data: IEvent = {
    id: 1,
    title: 'Title',
    description: 'Description',
    dates: [{
      eventId: 1,
      beginDate: new Date(),
      endDate: new Date()
    }],
    featured: true,
    featuredText: 'Olá',
    image: 'iamge',
    enableQuiz: true,
    quiz: {
      purpose: enQuizPurpose.event,
      churchId: 1,
      version: 1,
      questions: [{
        id: '1',
        title: 'Escolha 1',
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
    }
  };

  const userToken: IUserToken = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    roles: [],
    church: { id: 1, name: 'ICB Sorocaba', slug: 'icb-sorocaba' }
  };

  it('should create a new event when id is not present', () => {
    const model = _.cloneDeep(data);
    delete model.id;
    return expect(service.save(model, userToken)).to.be.fulfilled.then((result: Event) => {
      expect(result).to.be.an.instanceOf(Event);
      expect(result.id).to.be.equal(1);
      expect(result.churchId).to.be.equal(userToken.church.id);
      expect(result.title).to.be.equal(model.title);
      expect(result.description).to.be.equal(model.description);
      expect(result.featured).to.be.equal(model.featured);
      expect(result.featuredText).to.be.equal(model.featuredText);
      expect(result.image).to.be.equal(model.image);
      expect(result.dates[0].beginDate.toISOString()).to.be.equal(model.dates[0].beginDate.toISOString());
      expect(result.dates[0].endDate.toISOString()).to.be.equal(model.dates[0].endDate.toISOString());
      expect(result.quizId).to.be.greaterThan(0);
      expect(result.quiz).to.be.an('object');
    });
  });

  it('should update an event when id is present', () => {
    const model = _.cloneDeep(data);
    model.title = 'Description 2';
    model.description = 'Message 2';
    model.featured = false;
    model.featuredText = null;
    model.image = null;
    model.quizId = null;
    model.dates[0].beginDate = new Date().addDays(3);
    model.dates[0].endDate = new Date().addDays(3);
    return expect(service.save(model, userToken)).to.be.fulfilled.then((result: Event) => {
      expect(result).to.be.an.instanceOf(Event);
      expect(result.id).to.be.equal(1);
      expect(result.churchId).to.be.equal(userToken.church.id);
      expect(result.title).to.be.equal(model.title);
      expect(result.description).to.be.equal(model.description);
      expect(result.featured).to.be.equal(model.featured);
      expect(result.featuredText).to.be.equal(model.featuredText);
      expect(result.image).to.be.equal(model.image);
      expect(result.quizId).to.be.equal(model.quizId);
      expect(result.dates[0].beginDate.toISOString()).to.be.equal(model.dates[0].beginDate.toISOString());
      expect(result.dates[0].endDate.toISOString()).to.be.equal(model.dates[0].endDate.toISOString());
      expect(result.quizId).to.be.greaterThan(0);
      expect(result.quiz).to.be.an('object');
    });
  });

  it('should not allow update an event from another church', () => {
    const model = _.cloneDeep(data);
    const token = _.cloneDeep(userToken);
    token.church.id = 2;
    return expect(service.save(model, token)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('access-denied');
    });
  });

  it('should not allow remove an event from another church', () => {
    const token = _.cloneDeep(userToken);
    token.church.id = 2;
    return expect(service.remove(data.id, token)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('access-denied');
    });
  });

  it('should throw not found when pass an invalid event id', () => {
    return expect(service.remove(0, userToken)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('not-found');
    });
  });

  it('should remove an event', () => {
    return expect(service.remove(data.id, userToken)).to.be.fulfilled;
  });

});