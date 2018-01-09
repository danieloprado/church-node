import 'source-map-support/register';

import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { expect, use } from 'chai';

import { IQueryList } from '../repositories/churchReport';
import { validate } from './churchReportQuery';

use(chaiAsPromise);

describe('web/validators/churchReportQuery', () => {
  const data: IQueryList = {
    term: 'teste',
    typeIds: [1, 2],
    beginDate: new Date,
    endDate: new Date,
  };

  it('should return valid for a minimun object', () => {
    const model = lodash.clone(data);
    delete model.term;
    return expect(validate(data)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = lodash.clone(data);
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should trim term', () => {
    const model = lodash.clone(data);
    model.term = ' teste ';

    return expect(validate(model)).to.eventually.be.fulfilled.then((result: IQueryList) => {
      expect(result.term).to.equal(model.term.trim());
    });
  });

  it('should return invalid when term is not a string', () => {
    const model = lodash.clone(data);
    model.term = <any>1;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('term');
      expect(data.message[0].type).to.equal('string.base');
    });
  });

  it('should return invalid when typeIds is not preset', () => {
    const model = lodash.clone(data);
    delete model.typeIds;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeIds');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when typeIds.length = 0', () => {
    const model = lodash.clone(data);
    model.typeIds = [];

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeIds');
      expect(data.message[0].type).to.equal('array.min');
    });
  });

  it('should return invalid when typeIds has a non-number value ', () => {
    const model = lodash.clone(data);
    model.typeIds = <any>['t'];

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeIds.0');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when typeIds has a value less than 1', () => {
    const model = lodash.clone(data);
    model.typeIds = [0];

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeIds.0');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when beginDate is not present', () => {
    const model = lodash.clone(data);
    delete model.beginDate;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(2);
      expect(data.message[0].path).to.equal('beginDate');
      expect(data.message[0].type).to.equal('any.required');
      expect(data.message[1].path).to.equal('endDate');
      expect(data.message[1].type).to.equal('date.ref');
    });
  });

  it('should return invalid when beginDate is not a date', () => {
    const model = lodash.clone(data);
    model.beginDate = <any>'b';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(2);
      expect(data.message[0].path).to.equal('beginDate');
      expect(data.message[0].type).to.equal('date.base');
      expect(data.message[1].path).to.equal('endDate');
      expect(data.message[1].type).to.equal('date.ref');
    });
  });

  it('should return invalid when endDate is not present', () => {
    const model = lodash.clone(data);
    delete model.endDate;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('endDate');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when endDate is not a date', () => {
    const model = lodash.clone(data);
    model.endDate = <any>'b';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('endDate');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when endDate is before beginDate', () => {
    const model = lodash.clone(data);
    model.endDate = new Date(2015, 1, 1);

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('endDate');
      expect(data.message[0].type).to.equal('date.min');
    });
  });
});