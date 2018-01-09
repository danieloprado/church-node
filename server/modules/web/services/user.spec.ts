import 'source-map-support/register';

import * as _ from 'lodash';
import * as chaiAsPromise from 'chai-as-promised';
import * as service from './user';

import { expect, use } from 'chai';

import { IChurch } from '../../../interfaces/church';
import { IUser } from '../../../interfaces/user';
import { IUserToken } from '../../../interfaces/userToken';
import { ServiceError } from '../../../errors/service';
import { User } from '../../../models/user';
import { enRoles } from '../../../interfaces/churchUser';

use(chaiAsPromise);

describe('web/services/user', () => {

  const church: IChurch = {
    id: 1,
    name: 'ICB Sorocaba 1',
    email: null,
    slug: 'icb-sorocaba',
    phone: '111111',
    address: 'R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200, Brasil',
    latitude: -23.5028451,
    longitude: -47.46187259999999,
    social: <any>[]
  };

  const userToken: IUserToken = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    roles: [],
    church
  };

  const user: IUser = {
    id: 2,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test'
  };

  it('should create a new user without any aditional role', () => {
    const model = _.clone(user);
    delete model.id;

    return expect(service.save(model, userToken)).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.password).to.be.not.undefined;
      expect(user.password).to.be.not.null;
      expect(user.password).to.be.string;
      expect(user.createdDate).to.be.instanceof(Date);
      expect(user.createdDate.getTime()).not.to.be.NaN;
      expect(user.password[0]).to.equal('$');
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches).to.have.length(1);
      expect(user.churches[0].userId).to.be.equal(user.id);
      expect(user.churches[0].churchId).to.be.equal(church.id);
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches[0].roles).to.have.length(0);
    });
  });

  it('should create a new user with admin roles', () => {
    const model = _.clone(user);
    delete model.id;
    model.email = 'admin@email.com';

    return expect(service.save(model, userToken, [enRoles.admin])).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.password).to.be.not.undefined;
      expect(user.password).to.be.not.null;
      expect(user.password).to.be.string;
      expect(user.createdDate).to.be.instanceof(Date);
      expect(user.createdDate.getTime()).not.to.be.NaN;
      expect(user.password[0]).to.equal('$');
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches).to.have.length(1);
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches[0].userId).to.be.equal(user.id);
      expect(user.churches[0].churchId).to.be.equal(church.id);
      expect(user.churches[0].roles).to.be.not.empty;
      expect(user.churches[0].roles[0]).to.be.equal(enRoles.admin);
      expect(user.churches[0].roles[1]).to.be.equal(enRoles.webAdmin);
    });
  });

  it('should update roles to admin', () => {
    return expect(service.save(user, userToken, [enRoles.admin])).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches).to.have.length(1);
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches[0].userId).to.be.equal(user.id);
      expect(user.churches[0].churchId).to.be.equal(church.id);
      expect(user.churches[0].roles).to.have.length(2);
      expect(user.churches[0].roles[0]).to.be.equal(enRoles.admin);
      expect(user.churches[0].roles[1]).to.be.equal(enRoles.webAdmin);
    });
  });

  it('should update roles to empty', () => {
    return expect(service.save(user, userToken)).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches).to.have.length(1);
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches[0].userId).to.be.equal(user.id);
      expect(user.churches[0].churchId).to.be.equal(church.id);
      expect(user.churches[0].roles).to.have.length(0);
    });
  });

  it('should allow to update churchUser sysAdmin but not change the role', () => {
    const model = _.clone(user);
    model.email = 'danielprado.ad@gmail.com';

    return expect(service.save(model, userToken, [enRoles.admin])).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches).to.have.length(1);
      expect(user.churches).to.be.instanceof(Array);
      expect(user.churches[0].userId).to.be.equal(user.id);
      expect(user.churches[0].churchId).to.be.equal(church.id);
      expect(user.churches[0].roles.some((r: string) => r === enRoles.sysAdmin)).to.be.true;
    });
  });

  it('should allow to a user become a member', () => {
    return expect(service.becomeMember(user.id, userToken)).to.be.eventually.fulfilled.then((result: User) => {
      expect(result).to.be.not.undefined;
      expect(result.churches).to.be.instanceof(Array);
      expect(result.churches).to.have.length(1);
      expect(result.churches).to.be.instanceof(Array);
      expect(result.churches[0].userId).to.be.equal(result.id);
      expect(result.churches[0].churchId).to.be.equal(church.id);
      expect(result.churches[0].isMember).to.be.true;
    });
  });

  it('should allow remove a user', () => {
    return expect(service.remove(user.id, userToken)).to.be.eventually.fulfilled;
  });

  it('should not allow remove an sysAdmin user', () => {
    const model = _.clone(user);
    delete model.id;
    model.email += new Date().getTime();

    return expect(service.save(model, userToken, [enRoles.sysAdmin])).to.be.eventually.fulfilled.then((user: User) => {
      return expect(service.remove(user.id, userToken)).to.be.eventually.rejected.then((err: Error) => {
        expect(err instanceof ServiceError).to.be.true;
        expect(err.message).to.be.equal('not-allowed-sysAdmin');
      });
    });
  });

  it('should not allow remove the current user', () => {
    return expect(service.remove(userToken.id, userToken)).to.be.eventually.rejected.then((err: Error) => {
      expect(err instanceof ServiceError).to.be.true;
      expect(err.message).to.be.equal('not-allowed-remove-current-user');
    });
  });
});