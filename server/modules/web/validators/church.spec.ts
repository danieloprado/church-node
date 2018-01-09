import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as _ from 'lodash';

import { validate } from './church';

use(chaiAsPromise);

describe('web/validators/church', () => {
  const data = {
    name: 'ICB Sorocaba',
    email: 'contato@icbsorocaba.com',
    phone: '1533426043',
    address: 'R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200, Brasil',
    latitude: -23.5028451,
    longitude: -47.46187259999999,
    social: [
      { name: 'facebook', url: 'http://facebook.com' },
      { name: 'google', url: 'http://google.com' }
    ]
  };

  it('should return valid for a minimun object', () => {
    const model = { name: data.name };
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = data;
    return expect(validate(model)).to.eventually.fulfilled;
  });

  it('should return invalid for a empty object', () => {
    const model = {};
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
    });
  });

  it('should return invalid when name is empty', () => {
    const model = {};
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('name');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when name length is less than 3', () => {
    const model = { name: 'te' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('name');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when name length is greather than 100', () => {
    const model = { name: new Array(102).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('name');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when email is invalid', () => {
    const model = { name: data.name, email: 'invalid email address' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('email');
      expect(data.message[0].type).to.equal('string.email');
    });
  });

  it('should return invalid when email length is greather than 150', () => {
    const model = { name: data.name, email: new Array(152).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'email' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return invalid when phone is invalid', () => {
    const model = { name: data.name, phone: 'invalid phone' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('phone');
      expect(data.message[0].type).to.equal('string.phone');
    });
  });

  it('should return invalid when phone length is greather than 20', () => {
    const model = { name: data.name, phone: new Array(22).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message.some(m => m.path == 'phone' && m.type == 'string.max')).to.be.true;
    });
  });

  it('should return valid when phone is BRA local', () => {
    const model = { name: data.name, phone: '1530195629' };
    return expect(validate(model)).to.eventually.fulfilled;
  });

  it('should return valid when phone is BRA mobile', () => {
    const model = { name: data.name, phone: '15991629356' };
    return expect(validate(model)).to.eventually.fulfilled;
  });

  it('should return invalid when latitude is not a number', () => {
    const model = { name: data.name, latitude: 'a', longitude: data.longitude };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('latitude');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when longitude is not a number', () => {
    const model = { name: data.name, latitude: data.longitude, longitude: 'a' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('longitude');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when latitude is null and longitude is set', () => {
    const model = { name: data.name, longitude: data.longitude };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].type).to.equal('object.and');
    });
  });

  it('should return invalid when longitude is null and latitude is set', () => {
    const model = { name: data.name, latitude: data.latitude };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].type).to.equal('object.and');
    });
  });

  it('should return invalid when the first social has no name', () => {
    const model = _.cloneDeep(data);
    delete model.social[0].name;

    return expect(validate(model)).to.eventually.be.rejected.then((data: any) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('social.0.name');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when the first social has no url', () => {
    const model = _.cloneDeep(data);
    delete model.social[0].url;

    return expect(validate(model)).to.eventually.be.rejected.then((data: any) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('social.0.url');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return valid but remove the first social url because url is not valid', () => {
    const model = _.cloneDeep(data);
    model.social[0].url = 'invalid';

    return expect(validate(model)).to.eventually.be.rejected.then((data: any) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('social.0.url');
      expect(data.message[0].type).to.equal('string.uri');
    });
  });

});