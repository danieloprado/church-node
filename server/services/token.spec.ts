import 'source-map-support/register';

import * as _ from 'lodash';
import * as chaiAsPromise from 'chai-as-promised';
import * as service from './token';

import { IChurchUser, enRoles } from '../interfaces/churchUser';
import { expect, use } from 'chai';

import { IChurch } from '../interfaces/church';
import { IResetPasswordToken } from '../interfaces/resetPasswordToken';
import { IUser } from '../interfaces/user';
import { IUserToken } from '../interfaces/userToken';
import { enTokenType } from './token';

use(chaiAsPromise);

describe('services/token', () => {

  const church: IChurch = {
    id: 1,
    name: 'ICB Sorocaba 1',
    email: null,
    slug: 'icb-sorocaba',
    phone: '111111',
    address: 'R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200, Brasil',
    latitude: -23.5028451,
    longitude: -47.46187259999999
  };

  const user: IUser = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test'
  };

  const churchUser: IChurchUser = {
    userId: user.id,
    churchId: church.id,
    roles: [enRoles.admin],
    church
  };

  it('should generate a userToken without role', () => {
    const model = _.clone(churchUser);
    model.roles = [];

    return expect(service.userToken(user, model)).to.eventually.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.verify(token, enTokenType.userToken)).to.eventually.be.fulfilled;
    }).then((userToken: IUserToken) => {
      expect(userToken).to.contain.all.keys(user);
      expect(userToken.roles).to.be.an('array');
      expect(userToken.roles).to.be.empty;
    });
  });

  it('should generate a userToken with one role', () => {
    return expect(service.userToken(user, churchUser)).to.eventually.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.verify(token, enTokenType.userToken)).to.eventually.be.fulfilled;
    }).then((userToken: IUserToken) => {
      expect(userToken).to.contain.all.keys(user);
      expect(userToken.roles).to.be.an('array');
      expect(userToken.roles).to.have.length(1);
      expect(userToken.roles[0]).to.be.equal(churchUser.roles[0]);
    });
  });

  it('should generate a userToken with many roles', () => {
    const model = _.clone(churchUser);
    const roles = [enRoles.admin, enRoles.webAdmin, <any>'test'];
    model.roles = roles;

    return expect(service.userToken(user, model)).to.eventually.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.verify(token, enTokenType.userToken)).to.eventually.be.fulfilled;
    }).then((userToken: IUserToken) => {
      expect(userToken).to.contain.all.keys(user);
      expect(userToken.roles).to.be.an('array');
      expect(userToken.roles).to.have.length(roles.length);
      expect(userToken.roles[0]).to.be.equal(roles[0]);
      expect(userToken.roles[1]).to.be.equal(roles[1]);
      expect(userToken.roles[2]).to.be.equal(roles[2]);
    });
  });

  it('should verify method reject when send an invalid userToken', () => {
    return expect(service.verify('invalid', enTokenType.userToken)).to.be.rejected;
  });

  it('should verify method reject when type is different', () => {
    return expect(service.userToken(user, churchUser)).to.eventually.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.verify(token, enTokenType.resetPassword)).to.eventually.be.rejected;
    });
  });

  it('should generate a resetPassword token', () => {
    return expect(service.resetPassword(user)).to.eventually.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.verify(token, enTokenType.resetPassword)).to.eventually.be.fulfilled;
    }).then((token: IResetPasswordToken) => {
      expect(token.id).to.be.equal(user.id);
    });
  });

});