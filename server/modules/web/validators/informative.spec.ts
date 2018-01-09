import 'source-map-support/register';

import * as _ from 'lodash';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';

import { expect, use } from 'chai';

import { validate } from './informative';

use(chaiAsPromise);

describe('web/validators/informative', () => {
  const data = {
    id: 1,
    title: 'Test',
    date: <any>new Date(),
    message: 'Message',
    typeId: 1
  };

  it('should return valid for a minimun object', () => {
    const model = { title: data.title, date: data.date, message: data.message, typeId: data.typeId };
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = data;
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return invalid when id is less than 1', () => {
    const model = _.clone(data);
    model.id = 0;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('id');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when title is empty', () => {
    const model = _.clone(data);
    delete model.title;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when title length is less than 3', () => {
    const model = _.clone(data);
    model.title = 'te';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when title length is greather than 100', () => {
    const model = _.clone(data);
    model.title = new Array(102).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when date is empty', () => {
    const model = _.clone(data);
    delete model.date;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('date');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when date is not a valid date', () => {
    const model = _.clone(data);
    model.date = 'invalid';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('date');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when message is empty', () => {
    const model = _.clone(data);
    delete model.message;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('message');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when message length is less than 3', () => {
    const model = _.clone(data);
    model.message = 'te';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('message');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when typeId less than 1', () => {
    const model = _.clone(data);
    model.typeId = 0;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeId');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

});