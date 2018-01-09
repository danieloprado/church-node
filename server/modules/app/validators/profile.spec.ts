import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { validate } from './profile';

use(chaiAsPromise);

describe('app/validators/profile', () => {
  const data = {
    firstName: 'Daniel',
    lastName: 'Prado',
    email: 'email@test.com',
    gender: 'm',
    birthday: new Date(),
    zipcode: '11111111',
    address: 'Rua José Alves',
    neighborhood: 'Vila Sésamo',
    city: 'Sorocaba',
    state: 'SP',
    number: '254',
    complement: 'apt 04'
  };

  it('should return valid for a minimun object', () => {
    const model = { firstName: data.firstName, email: data.email };
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = data;
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return invalid when firstName is empty', () => {
    const model = lodash.clone(data);
    delete model.firstName;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('firstName');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when firstName length is less than 3', () => {
    const model = lodash.clone(data);
    model.firstName = 'te';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('firstName');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when firstName length is greather than 50', () => {
    const model = lodash.clone(data);
    model.firstName = new Array(52).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('firstName');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when lastName length is greather than 50', () => {
    const model = lodash.clone(data);
    model.lastName = new Array(52).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('lastName');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when email is invalid', () => {
    const model = lodash.clone(data);
    model.email = 'invalid email address';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('email');
      expect(data.message[0].type).to.equal('string.email');
    });
  });

  it('should return invalid when email length is greather than 150', () => {
    const model = lodash.clone(data);
    model.email = new Array(152).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'email' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return valid when gender is null', () => {
    const model = lodash.clone(data);
    model.gender = null;

    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return invalid when gender is invalid', () => {
    const model = lodash.clone(data);
    model.gender = 'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message[0].path).to.equal('gender');
      expect(data.message[0].type).to.equal('any.allowOnly');
    });
  });

  it('should return valid when birthday is null', () => {
    const model = lodash.clone(data);
    model.birthday = null;

    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return invalid when birthday is invalid', () => {
    const model = lodash.clone(data);
    model.birthday = <any>'a';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message[0].path).to.equal('birthday');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when zipcode length is letters', () => {
    const model = lodash.clone(data);
    model.zipcode = 'asb';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'zipcode' && m.type == 'string.zipcode')).to.be.true;
    });
  });

  it('should return invalid when zipcode length is less than 8', () => {
    const model = lodash.clone(data);
    model.zipcode = '123';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'zipcode' && m.type == 'string.zipcode')).to.be.true;
    });
  });

  it('should return invalid when zipcode length is greather than 8', () => {
    const model = lodash.clone(data);
    model.zipcode = new Array(10).join('1');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'zipcode' && m.type == 'string.zipcode')).to.be.true;
    });
  });

  it('should return invalid when address length is greather than 150', () => {
    const model = lodash.clone(data);
    model.address = new Array(152).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'address' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when neighborhood length is greather than 100', () => {
    const model = lodash.clone(data);
    model.neighborhood = new Array(102).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'neighborhood' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when city length is greather than 100', () => {
    const model = lodash.clone(data);
    model.city = new Array(102).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'city' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when state length is greather than 150', () => {
    const model = lodash.clone(data);
    model.state = new Array(4).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'state' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when number length is greather than 10', () => {
    const model = lodash.clone(data);
    model.number = new Array(12).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'number' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when complement length is greather than 10', () => {
    const model = lodash.clone(data);
    model.complement = new Array(12).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'complement' && m.type == 'string.max')).to.be.true;
    });
  });

});