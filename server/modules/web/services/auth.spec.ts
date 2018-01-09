import 'source-map-support/register';

import * as _ from 'lodash';
import * as chaiAsPromise from 'chai-as-promised';
import * as service from './auth';
import * as tokenService from '../../../services/token';

import { expect, use } from 'chai';

import { IChurchUser } from '../../../interfaces/churchUser';
import { IUserToken } from '../../../interfaces/userToken';
import { User } from '../../../models/user';

use(chaiAsPromise);

describe('web/services/auth', () => {
  const data = {
    email: 'danielprado.ad@gmail.com',
    password: 'senha@123'
  };

  const userToken: IUserToken = {
    id: 1,
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    roles: []
  };

  const churchUser: IChurchUser = {
    userId: userToken.id,
    churchId: 1,
    roles: [],
    church: {
      id: 1,
      name: 'ICB Sorocaba',
      slug: 'icb-sorocaba'
    }
  };

  it('should return token for a valid user when try to login', () => {
    return expect(service.login(data.email, data.password)).to.be.eventually.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
    });
  });

  it('should throw user-not-found when email is invalid when try to login', () => {
    return expect(service.login('nothing@email.com', data.password)).to.be.eventually.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('user-not-found');
    });
  });

  it('should throw invalid-password when password is invalid when try to login', () => {
    return expect(service.login(data.email, '123')).to.be.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('invalid-password');
    });
  });

  it('should throw invalid-password when password is invalid when try to change password', () => {
    return expect(service.changePassword(userToken, '123', '456')).to.be.eventually.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('invalid-password');
    });
  });

  it('should return successfully when try to change password', () => {
    return expect(service.changePassword(userToken, data.password, '123456')).to.be.eventually.fulfilled
      .then((user: User) => {
        return expect(user.checkPassword('123456')).to.be.fulfilled;
      });
  });

  it('should return successfully when try to send reset password email', () => {
    return expect(service.sendResetPassword(data.email)).to.be.eventually.fulfilled;
  });

  it('should throw user-not-found when when try to send reset password email and email is invalid', () => {
    return expect(service.sendResetPassword('invalid')).to.be.eventually.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('user-not-found');
    });
  });

  it('should return successfully when try to reset password', () => {
    const newPassword = 'senha@123';
    return expect(tokenService.resetPassword(userToken)).to.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.resetPassword(token, newPassword)).to.be.eventually.fulfilled;
    }).then((user: any) => {
      expect(user).to.be.an.instanceOf(User);
      expect(user.checkPassword(newPassword)).to.be.fulfilled;
    });
  });

  it('should throw user-not-found when try to reset password and userId is invalid', () => {
    const newPassword = 'senha@123';
    const model = _.cloneDeep(userToken);
    model.id = 0;

    return expect(tokenService.resetPassword(model)).to.be.fulfilled.then((token: any) => {
      expect(token).to.be.a('string');
      return expect(service.resetPassword(token, newPassword)).to.be.eventually.rejected;
    }).then((error: any) => {
      expect(error.message).to.be.equal('user-not-found');
    });
  });

  it('should throw token-type-not-match when try to reset password and token is invalid', () => {
    const newPassword = 'senha@123';
    return expect(tokenService.userToken(userToken, churchUser)).to.be.fulfilled.then((token: string) => {
      expect(token).to.be.a('string');
      return expect(service.resetPassword(token, newPassword)).to.be.eventually.rejected;
    }).then((error: any) => {
      expect(error.message).to.be.equal('token-type-not-match');
    });
  });

  it('should throw token-invalid when try to reset password and token is invalid', () => {
    const newPassword = 'senha@123';
    return expect(service.resetPassword('token', newPassword)).to.be.eventually.rejected.then((error: Error) => {
      expect(error.message).to.be.equal('token-invalid');
    });
  });

});