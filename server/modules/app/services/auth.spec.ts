import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

import { User } from '../../../models/user';
import * as userRepository from '../repositories/user';
import { ILoginResult } from './auth';
import * as service from './auth';

use(chaiAsPromise);

describe('app/services/auth', () => {
  const device = {
    deviceId: '1',
    application: 'test-app',
    name: 'test-console'
  };

  it('should insert divice and return tokens', () => {
    return expect(userRepository.findByEmail('danielprado.ad@gmail.com')).to.be.fulfilled.then((user: User) => {
      return expect(service.generateTokens(user, 'icb-sorocaba', device)).to.be.fulfilled;
    }).then((tokens: ILoginResult) => {
      expect(tokens.accessToken).to.be.not.empty;
      expect(tokens.refreshToken).to.be.not.empty;
    });
  });

  it('should update divice and return tokens', () => {
    return expect(userRepository.findByEmail('danielprado.ad@gmail.com')).to.be.fulfilled.then((user: User) => {
      return expect(service.generateTokens(user, 'icb-sorocaba', device)).to.be.fulfilled;
    }).then((tokens: ILoginResult) => {
      expect(tokens.accessToken).to.be.not.empty;
      expect(tokens.refreshToken).to.be.not.empty;
    });
  });

  it('should generate a new access token', () => {
    return expect(userRepository.findByEmail('danielprado.ad@gmail.com')).to.be.fulfilled.then((user: User) => {
      return expect(service.generateTokens(user, 'icb-sorocaba', device)).to.be.fulfilled;
    }).then((tokens: ILoginResult) => {
      return expect(service.generateAccessToken(tokens.refreshToken, 'icb-sorocaba')).to.be.fulfilled;
    }).then((accessToken: string) => {
      expect(accessToken).to.not.be.empty;
    });
  });

});