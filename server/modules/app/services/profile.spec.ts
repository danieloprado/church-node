import 'source-map-support/register';
import { IUser } from '../../../interfaces/user';
import { IUserToken } from '../../../interfaces/userToken';
import { ChurchUser } from '../../../models/churchUser';
import { User } from '../../../models/user';
import * as service from './profile';
import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

use(chaiAsPromise);

describe('app/services/profile', () => {
  const userToken: IUserToken = {
    id: 1,
    email: 'danielprado.ad@gmail.com',
    firstName: 'test',
    lastName: 'test',
    roles: [],
    church: {
      id: 1,
      name: 'ICB Sorocaba',
      slug: 'icb-sorocaba'
    }
  };

  const user: IUser = {
    email: 'danielprado.ad@gmail.com',
    firstName: 'test',
    lastName: 'test',
    gender: null
  };

  it('should update user profile', () => {
    return expect(service.save(user, userToken)).to.be.eventually.fulfilled.then((user: User) => {
      expect(user).to.be.not.undefined;
      expect(user.firstName).to.be.equal(user.firstName);
      expect(user.lastName).to.be.equal(user.lastName);
      expect(user.email).to.be.equal(user.email);
      expect(user.gender).to.be.equal(user.gender);
    });
  });

  it('should update user last app date access', () => {
    const date = new Date();
    return expect(service.appOpened(userToken)).to.be.eventually.fulfilled.then((user: ChurchUser) => {
      expect(user).to.be.not.undefined;
      expect(user.lastAppDateAccess.getTime()).to.be.greaterThan(date.getTime());
    });
  });

});