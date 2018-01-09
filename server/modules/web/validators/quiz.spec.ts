import 'source-map-support/register';

import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { enQuizQuestionType } from '../../../interfaces/quiz';
import { validate } from './quiz';

use(chaiAsPromise);

describe('web/validators/quiz', () => {
  const data = {
    questions: [{
      title: 'Escolha',
      description: 'olá',
      type: enQuizQuestionType.chooseOne,
      required: true,
      options: [{
        title: 'Primero',
        description: 'teste'
      }, {
        title: 'Segundo',
        description: undefined
      }],
      enableOtherOption: true
    }, {
      title: 'string',
      description: null,
      options: null,
      type: enQuizQuestionType.text,
      required: false,
      enableOtherOption: false
    }]
  };

  it('should return valid for a full object', () => {
    return expect(validate(data)).to.eventually.be.fulfilled;
  });

  it('should return invalid when a question title is not present', () => {
    const model = lodash.cloneDeep(data);
    delete model.questions[0].title;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.title');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when a question title is empty', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].title = '';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.title');
      expect(data.message[0].type).to.equal('string.base');
    });
  });

  it('should return invalid when a question title is less than 3 catacteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].title = '12';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.title');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when a question title is greater than 250 catacteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].title = new Array(252).join('a');

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.title');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when a question description is greater than 1000 catacteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].description = new Array(1002).join('b');

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.description');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when a question type is not present', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].enableOtherOption = false;
    delete model.questions[0].type;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.type');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when a question type is not a enQuizQuestionType', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = <any>'here';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.type');
      expect(data.message[0].type).to.equal('any.allowOnly');
    });
  });

  it('should return invalid when a question required is not a boolean', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].required = <any>'here';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.required');
      expect(data.message[0].type).to.equal('boolean.base');
    });
  });

  it('should return invalid when a question options is not present for a non text type', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    delete model.questions[0].options;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when a question options is empty for a non text type', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    model.questions[0].options = [];

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options');
      expect(data.message[0].type).to.equal('array.min');
    });
  });

  it('should return invalid when a question option title is not present', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    delete model.questions[0].options[0].title;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options.0.title');
      expect(data.message[0].type).to.equal('any.required');
    });
  });

  it('should return invalid when a question option title is empty', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    model.questions[0].options[0].title = '';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options.0.title');
      expect(data.message[0].type).to.equal('string.base');
    });
  });

  it('should return invalid when a question option title is less then 3 caracteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    model.questions[0].options[0].title = '12';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options.0.title');
      expect(data.message[0].type).to.equal('string.min');
    });
  });

  it('should return invalid when a question option title is greater then 250 caracteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    model.questions[0].options[0].title = new Array(252).join('a');

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options.0.title');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when a question option title is description then 1000 caracteres', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.chooseOne;
    model.questions[0].options[0].description = new Array(1002).join('a');

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.options.0.description');
      expect(data.message[0].type).to.equal('string.max');
    });
  });

  it('should return invalid when a question enableOtherOption is not a boolean', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].enableOtherOption = <any>'hi';

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.enableOtherOption');
      expect(data.message[0].type).to.equal('boolean.base');
    });
  });

  it('should return invalid when a question enableOtherOption is true when type is a text', () => {
    const model = lodash.cloneDeep(data);
    model.questions[0].type = enQuizQuestionType.text;
    model.questions[0].enableOtherOption = true;

    return expect(validate(model)).to.eventually.be.rejected.then((data: joi.CustomValidationError) => {
      expect(data.validationError).to.be.true;
      expect(data.message).to.have.length(1);
      expect(data.message[0].path).to.equal('questions.0.enableOtherOption');
      expect(data.message[0].type).to.equal('any.allowOnly');
    });
  });

  // tslint:disable-next-line:max-file-line-count
});