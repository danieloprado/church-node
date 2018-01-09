import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as _ from 'lodash';

import { validate } from './register';

use(chaiAsPromise);

describe('app/validators/register', () => {
  const data = {
    accessToken: 'accessToken',
    deviceId: 'deviceId',
    application: 'application',
    name: 'name',
    provider: 'facebook',
    notificationToken: 'a680e84f-334b-4556-b797-0070ad78f45d'
  };

  it('should return valid for a minimum object', () => {
    const model = _.clone(data);
    delete model.notificationToken;
    return expect(validate(data)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    return expect(validate(data)).to.eventually.be.fulfilled;
  });

  it('should return invalid when accessToken is empty', () => {
    const model = _.clone(data);
    delete model.accessToken;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('accessToken');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when deviceId is empty', () => {
    const model = _.clone(data);
    delete model.deviceId;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('deviceId');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when application is empty', () => {
    const model = _.clone(data);
    delete model.application;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('application');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when name is empty', () => {
    const model = _.clone(data);
    delete model.name;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('name');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when provider is empty', () => {
    const model = _.clone(data);
    delete model.provider;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('provider');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

});