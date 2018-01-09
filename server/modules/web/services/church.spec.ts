import 'source-map-support/register';
import { IChurch } from '../../../interfaces/church';
import { IUserToken } from '../../../interfaces/userToken';
import { Church } from '../../../models/church';
import * as repository from '../repositories/church';
import * as service from './church';
import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as _ from 'lodash';

use(chaiAsPromise);

describe('web/services/church', () => {
  const church: IChurch = {
    id: 1,
    name: 'ICB Sorocaba 1',
    email: null,
    slug: 'icb-sorocaba',
    phone: '111111',
    address: 'R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200, Brasil',
    latitude: -23.5028451,
    longitude: -47.46187259999999,
    social: [{ name: 'facebook', url: 'http://facebook.com' }]
  };

  const userToken: IUserToken = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    roles: [],
    church
  };

  it('should update church information', () => {
    return expect(service.save(church, userToken)).to.be.fulfilled.then(() => {
      return expect(repository.findById(church.id)).to.be.fulfilled;
    }).then((churchDb: Church) => {
      expect(churchDb).to.contain.all.keys(church);
      expect(churchDb.social).to.be.instanceOf(Array);
      expect(churchDb.social).to.be.length(church.social.length);
    });
  });

  it('should change church id to prevent update another church', () => {
    const churchCopy = _.clone(church);
    churchCopy.id = 2;

    return expect(service.save(church, userToken)).to.be.fulfilled.then(() => {
      return expect(repository.findById(userToken.church.id)).to.be.fulfilled;
    }).then((churchDb: Church) => {
      expect(churchDb.id).to.be.not.equal(churchCopy.id);
      expect(churchDb.id).to.be.equal(userToken.church.id);
    });
  });
});