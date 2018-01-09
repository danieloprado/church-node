import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as _ from 'lodash';

import { ISocialUserInfo } from '../../../interfaces/socialUserInfo';
import { User } from '../../../models/user';
import * as service from './register';

use(chaiAsPromise);

describe('app/services/register', () => {
  const churchSlug = 'icb-sorocaba';
  const socialUser: ISocialUserInfo = {
    id: '123',
    provider: 'facebook',
    firstName: 'Daniel',
    lastName: 'Prado',
    email: 'danielprado.ad@gmail.com',
    avatar: null,
    birthday: new Date(),
    married: null,
    gender: 'm'
  };

  it('should create a new user when social ref and email is not taken', () => {
    const model = _.clone(socialUser);
    model.id = Date.now().toString();
    model.email = `email-${Date.now()}@gmail.com`;
    return expect(service.register(model, churchSlug)).to.be.fulfilled.then((user: User) => {
      expect(user).to.be.instanceOf(User);
      expect(user.email).to.be.equal(model.email);
      expect(user.avatar).to.be.equal(model.avatar);
      expect(user.gender).to.be.equal(model.gender);
      expect(user.birthday).to.be.instanceOf(Date);
      expect(user.birthday.toISOString()).to.be.equal(model.birthday.toISOString());
      expect(user.socials).to.be.instanceOf(Array);
      expect(user.socials).to.be.have.length(1);
      expect(user.socials[0].ref).to.be.equal(model.id);
      expect(user.socials[0].provider).to.be.equal(model.provider);
      expect(user.socials[0].userId).to.be.equal(user.id);
    });
  });

  it('should associate social to a already created user', () => {
    const model = _.clone(socialUser);
    return expect(service.register(model, churchSlug)).to.be.fulfilled.then((user: User) => {
      expect(user).to.be.instanceOf(User);
      expect(user.id).to.be.equal(1);
      expect(user.email).to.be.equal(model.email);
      expect(user.avatar).to.be.equal(model.avatar);
      expect(user.socials).to.be.instanceOf(Array);
      expect(user.socials).to.be.have.length(1);
      expect(user.socials[0].ref).to.be.equal(model.id);
      expect(user.socials[0].provider).to.be.equal(model.provider);
      expect(user.socials[0].userId).to.be.equal(user.id);
    });
  });

  it('should return user when social ref is already taken', () => {
    const model = _.clone(socialUser);
    return expect(service.register(model, churchSlug)).to.be.fulfilled.then((user: User) => {
      expect(user).to.be.instanceOf(User);
      expect(user.id).to.be.equal(1);
      expect(user.email).to.be.equal(model.email);
      expect(user.socials).to.be.instanceOf(Array);
      expect(user.socials).to.be.have.length(1);
      expect(user.socials[0].ref).to.be.equal(model.id);
      expect(user.socials[0].provider).to.be.equal(model.provider);
      expect(user.socials[0].userId).to.be.equal(user.id);
    });
  });

  it('should update social ref when email is equal', () => {
    const model = _.clone(socialUser);
    model.id = Date.now().toString();
    return expect(service.register(model, churchSlug)).to.be.fulfilled.then((user: User) => {
      expect(user).to.be.instanceOf(User);
      expect(user.id).to.be.equal(1);
      expect(user.email).to.be.equal(model.email);
      expect(user.socials).to.be.instanceOf(Array);
      expect(user.socials).to.be.have.length(1);
      expect(user.socials[0].ref).to.be.equal(model.id);
      expect(user.socials[0].provider).to.be.equal(model.provider);
      expect(user.socials[0].userId).to.be.equal(user.id);
    });
  });

});