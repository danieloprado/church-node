import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

import { ServiceError } from '../../../errors/service';
import { IChurchReport } from '../../../interfaces/churchReport';
import { IUserToken } from '../../../interfaces/userToken';
import { ChurchReport } from '../../../models/churchReport';
import * as service from './churchReport';

use(chaiAsPromise);

describe('app/services/churchReport', () => {
  const userToken: IUserToken = {
    id: 1,
    email: 'danielprado.ad@gmail.com',
    firstName: 'test',
    lastName: 'test',
    church: {
      id: 1,
      slug: 'test',
      name: 'test'
    },
    roles: []
  };

  it('should create a church report', () => {
    const model: IChurchReport = {
      title: 'Report test',
      date: new Date,
      totalMembers: 1,
      totalNewVisitors: 2,
      totalFrequentVisitors: 3,
      totalKids: 4,
      creatorId: 1,
      churchId: 1,
      typeId: 1,
    };

    return expect(service.save(userToken, model)).to.be.fulfilled.then((result: ChurchReport) => {
      expect(result).to.instanceof(ChurchReport);
      expect(result.id).to.be.not.equal(model.id);
      expect(result.title).to.be.equal(model.title);
      expect(result.date.getTime()).to.be.equal(model.date.getTime());
      expect(result.totalMembers).to.be.equal(model.totalMembers);
      expect(result.totalNewVisitors).to.be.equal(model.totalNewVisitors);
      expect(result.totalKids).to.be.equal(model.totalKids);
      expect(result.creatorId).to.be.equal(model.creatorId);
      expect(result.churchId).to.be.equal(model.churchId);
      expect(result.typeId).to.be.equal(model.typeId);
    });
  });

  it('should update a church report', () => {
    const model: IChurchReport = {
      id: 1,
      title: 'Report test 1',
      date: new Date,
      totalMembers: 2,
      totalNewVisitors: 3,
      totalFrequentVisitors: 4,
      totalKids: 5,
      creatorId: 1,
      churchId: 1,
      typeId: 2,
    };

    return expect(service.save(userToken, model)).to.be.fulfilled.then((result: ChurchReport) => {
      expect(result).to.instanceof(ChurchReport);
      expect(result.id).to.be.equal(model.id);
      expect(result.title).to.be.equal(model.title);
      expect(result.date.getTime()).to.be.equal(model.date.getTime());
      expect(result.totalMembers).to.be.equal(model.totalMembers);
      expect(result.totalNewVisitors).to.be.equal(model.totalNewVisitors);
      expect(result.totalKids).to.be.equal(model.totalKids);
      expect(result.creatorId).to.be.equal(model.creatorId);
      expect(result.churchId).to.be.equal(model.churchId);
      // expect(result.typeId).to.be.equal(model.typeId);
    });
  });

  it('should update a church report and ignore a diferent user and church from token', () => {
    const model: IChurchReport = {
      id: 1,
      title: 'Report test 1',
      date: new Date,
      totalMembers: 2,
      totalNewVisitors: 3,
      totalFrequentVisitors: 4,
      totalKids: 5,
      creatorId: 2,
      churchId: 2,
      typeId: 2,
    };

    return expect(service.save(userToken, model)).to.be.fulfilled.then((result: ChurchReport) => {
      expect(result.creatorId).to.be.equal(userToken.id);
      expect(result.churchId).to.be.equal(userToken.church.id);
    });
  });

  it('should return not found if church report not exists', () => {
    return expect(service.remove(9999, userToken)).to.be.rejected.then((err: ServiceError) => {
      expect(err).to.be.a.instanceOf(ServiceError);
      expect(err.message).to.be.equals('not-found');
    });
  });

  it('should return access denied if user is not in same church', () => {
    return expect(service.remove(1, { ...userToken, church: { id: 99 } } as any)).to.be.rejected.then((err: ServiceError) => {
      expect(err).to.be.a.instanceOf(ServiceError);
      expect(err.message).to.be.equals('access-denied');
    });
  });

  it('should delete the church report', () => {
    return expect(service.remove(1, userToken)).to.be.fulfilled;
  });

});