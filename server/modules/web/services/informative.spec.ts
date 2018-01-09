import 'source-map-support/register';
import 'datejs';

import * as _ from 'lodash';
import * as chaiAsPromise from 'chai-as-promised';
import * as service from './informative';

import { expect, use } from 'chai';

import { IInformative } from '../../../interfaces/informative';
import { IUserToken } from '../../../interfaces/userToken';
import { Informative } from '../../../models/informative';

use(chaiAsPromise);

describe('web/services/informative', () => {
  const data: IInformative = {
    id: 1,
    title: 'Title',
    date: new Date(),
    message: 'Message',
    typeId: 1,
  };

  const userToken: IUserToken = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    roles: [],
    church: { id: 1, name: 'ICB Sorocaba', slug: 'icb-sorocaba' }
  };

  it('should create a new informative when id is not present', () => {
    const model = _.clone(data);
    delete model.id;
    return expect(service.save(model, userToken)).to.be.fulfilled.then((result: Informative) => {
      expect(result).to.be.an.instanceOf(Informative);
      expect(result.id).to.be.equal(1);
      expect(result.creatorId).to.be.equal(userToken.id);
      expect(result.churchId).to.be.equal(userToken.church.id);
    });
  });

  it('should update an informative when id is present', () => {
    const model = _.clone(data);
    model.title = 'Title 2';
    model.message = 'Message 2';
    model.date = new Date().addDays(3);
    model.typeId = 2;
    return expect(service.save(model, userToken)).to.be.fulfilled.then((result: Informative) => {
      expect(result).to.be.an.instanceOf(Informative);
      expect(result.id).to.be.equal(1);
      expect(result.creatorId).to.be.equal(userToken.id);
      expect(result.churchId).to.be.equal(userToken.church.id);
      expect(result.title).to.be.equal(model.title);
      expect(result.message).to.be.equal(model.message);
      expect(result.date.toISOString()).to.be.equal(model.date.toISOString());
      expect(result.typeId).to.be.equal(model.typeId);
    });
  });

  it('should not allow update an informative from another church', () => {
    const model = _.clone(data);
    const token = _.cloneDeep(userToken);
    token.church.id = 2;
    return expect(service.save(model, token)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('access-denied');
    });
  });

  it('should not allow remove an informative from another church', () => {
    const token = _.cloneDeep(userToken);
    token.church.id = 2;
    return expect(service.remove(data.id, token)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('access-denied');
    });
  });

  it('should throw not found when pass an invalid informative id', () => {
    return expect(service.remove(0, userToken)).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('not-found');
    });
  });

  it('should remove an informative', () => {
    return expect(service.remove(data.id, userToken)).to.be.fulfilled;
  });

});