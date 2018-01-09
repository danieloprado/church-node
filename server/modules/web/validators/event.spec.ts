import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';

import { validate } from './event';

use(chaiAsPromise);

describe('web/validators/event', () => {
  const event = {
    title: 'test',
    dates: [{ beginDate: new Date() }]
  };

  it('should return valid for a minimun object', () => {
    return expect(validate(event)).to.eventually.be.fulfilled;
  });

  it('should return valid for a full object', () => {
    const model = {
      id: 1,
      description: 'ok',
      featured: true,
      featuredText: 'olá',
      image: {
        filename: 'ola',
        base64: 's'
      },
      ...event
    };
    return expect(validate(model)).to.eventually.fulfilled;
  });

  it('should return invalid for a empty object', () => {
    const model = {};
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
    });
  });

  it('should return invalid when id is less than 1', () => {
    const model = { id: 0, ...event };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('id');
      expect(data.message[0].type).to.equal('number.min');
    });
  });

  it('should return invalid when title is empty', () => {
    const model = { dates: [{ beginDate: new Date() }] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when title length is less than 3', () => {
    const model = { ...event, title: 't' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when title length is greater than 100', () => {
    const model = { ...event, title: new Array(102).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('title');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when description length is greater than 1000', () => {
    const model = { ...event, description: new Array(1002).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('description');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when dates is not present', () => {
    const model = { title: 'test' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when dates is empty', () => {
    const model = { ...event, dates: <any>[] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates');
      expect(data.message[0].type).to.equal('array.min');
    });
  });

  it('should return invalid when beginDate is empty', () => {
    const model = { ...event, dates: <any>[{}] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates.0.beginDate');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when beginDate is not a valid date', () => {
    const model = { ...event, dates: [{ beginDate: 'test' }] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates.0.beginDate');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when endDate is not a valid date', () => {
    const model = { ...event, dates: [{ beginDate: new Date(), endDate: 'test' }] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates.0.endDate');
      expect(data.message[0].type).to.equal('date.base');
    });
  });

  it('should return invalid when endDate is before beginDate', () => {
    const model = { ...event, dates: [{ beginDate: new Date(), endDate: new Date(Date.now() - 1000) }] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('dates.0.endDate');
      expect(data.message[0].type).to.equal('date.min');
    });
  });

  it('should return invalid when featured is not a boolean', () => {
    const model = { ...event, featured: 'teste' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('featured');
      expect(data.message[0].type).to.equal('boolean.base');
    });
  });

  it('should return invalid when featuredText length is less than 3', () => {
    const model = { ...event, featuredText: 't' };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('featuredText');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when featuredText length is greater than 200', () => {
    const model = { ...event, featuredText: new Array(202).join('a') };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('featuredText');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when image is not a string or an valid json', () => {
    const model = { ...event, image: [1] };
    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(2);
      expect(data.message[0].path).to.equal('image');
      expect(data.message[0].type).to.equal('string.base');
      expect(data.message[1].path).to.equal('image');
      expect(data.message[1].type).to.equal('object.base');
    });
  });

});