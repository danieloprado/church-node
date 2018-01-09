import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { IChuchReportValidatorResult, validate } from './churchReport';

use(chaiAsPromise);

describe('app/validators/churchReport', () => {
  const data: IChuchReportValidatorResult = {
    id: 1,
    title: 'Titulo Report',
    date: new Date,
    totalMembers: 10,
    totalNewVisitors: 2,
    totalFrequentVisitors: 2,
    totalKids: 5,
    typeId: 1
  };

  it('should return valid for a minimun object', () => {
    const model = lodash.clone(data);
    delete model.id;
    return expect(validate(data)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = lodash.clone(data);
    return expect(validate(model)).to.eventually.be.fulfilled;
  });

  it('should return invalid when id is less than 1', () => {
    const model = lodash.clone(data);
    model.id = 0;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('id');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when title is empty', () => {
    const model = lodash.clone(data);
    delete model.title;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when title is less than 3', () => {
    const model = lodash.clone(data);
    model.title = 'aa';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when title is greater than 100', () => {
    const model = lodash.clone(data);
    model.title = new Array(102).join('a');
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when date is empty', () => {
    const model = lodash.clone(data);
    delete model.date;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('date');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when date is not a Date', () => {
    const model = lodash.clone(data);
    model.date = <any>'abc';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('date');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when totalMembers is empty', () => {
    const model = lodash.clone(data);
    delete model.totalMembers;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalMembers');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when totalMembers is not a number', () => {
    const model = lodash.clone(data);
    model.totalMembers = <any>'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalMembers');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when totalMembers is less than 0', () => {
    const model = lodash.clone(data);
    model.totalMembers = -1;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalMembers');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when totalNewVisitors is empty', () => {
    const model = lodash.clone(data);
    delete model.totalNewVisitors;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalNewVisitors');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when totalNewVisitors is not a number', () => {
    const model = lodash.clone(data);
    model.totalNewVisitors = <any>'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalNewVisitors');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when totalNewVisitors is less than 0', () => {
    const model = lodash.clone(data);
    model.totalNewVisitors = -1;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalNewVisitors');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when totalFrequentVisitors is empty', () => {
    const model = lodash.clone(data);
    delete model.totalFrequentVisitors;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalFrequentVisitors');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when totalFrequentVisitors is not a number', () => {
    const model = lodash.clone(data);
    model.totalFrequentVisitors = <any>'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalFrequentVisitors');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when totalFrequentVisitors is less than 0', () => {
    const model = lodash.clone(data);
    model.totalFrequentVisitors = -1;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalFrequentVisitors');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when totalKids is empty', () => {
    const model = lodash.clone(data);
    delete model.totalKids;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalKids');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when totalKids is not a number', () => {
    const model = lodash.clone(data);
    model.totalKids = <any>'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalKids');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when totalKids is less than 0', () => {
    const model = lodash.clone(data);
    model.totalKids = -1;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('totalKids');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when typeId is empty', () => {
    const model = lodash.clone(data);
    delete model.typeId;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeId');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when typeId is not a number', () => {
    const model = lodash.clone(data);
    model.typeId = <any>'a';
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeId');
      expect(data.message[0].type).to.equal('number.base');
    });
  });

  it('should return invalid when typeId is less than 0', () => {
    const model = lodash.clone(data);
    model.typeId = -1;
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('typeId');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

});