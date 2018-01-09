import 'source-map-support/register';

import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';

import { expect, use } from 'chai';

import { validate } from './userBecomeMember';

use(chaiAsPromise);

describe('web/validators/userBecomeMember', () => {

  it('should return valid for a full object', () => {
    return expect(validate({ userId: 1 })).to.eventually.be.fulfilled;
  });

  it('should return invalid when userId is not present', () => {
    return expect(validate({})).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('userId');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when userId is less than 1', () => {
    return expect(validate({ userId: 0 })).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('userId');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

});