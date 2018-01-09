import { enQuizPurpose, enQuizQuestionType } from '../../../interfaces/quiz';
import { joi, validateAsPromise } from '../../../services/Joi.config';

const types = [
  enQuizQuestionType.text,
  enQuizQuestionType.email,
  enQuizQuestionType.phone,
  enQuizQuestionType.date,
  enQuizQuestionType.zipcode,
  enQuizQuestionType.number,
  enQuizQuestionType.boolean,
  enQuizQuestionType.chooseOne,
  enQuizQuestionType.multiple,
  enQuizQuestionType.list
];

const typeWithoutOptions = [
  enQuizQuestionType.text,
  enQuizQuestionType.email,
  enQuizQuestionType.phone,
  enQuizQuestionType.date,
  enQuizQuestionType.zipcode,
  enQuizQuestionType.number,
  enQuizQuestionType.boolean,
  enQuizQuestionType.list
];

const purposes = [
  enQuizPurpose.welcomeCard,
  enQuizPurpose.event
];

export const schema = joi.object().keys({
  id: joi.number().min(1),
  version: joi.number().min(1),
  purpose: joi.string().valid(purposes),
  questions: joi.array().items(joi.object().keys({
    title: joi.string().trim().required().max(250).min(3),
    description: joi.string().trim().allow(null).max(1000),
    type: joi.string().trim().required().valid(types),
    required: joi.boolean().default(false),
    options: joi.any().when('type', {
      is: joi.string().valid(typeWithoutOptions),
      then: joi.any().empty().allow(null),
      otherwise: joi.array().items(joi.object().keys({
        title: joi.string().trim().required().max(250).min(3),
        description: joi.string().trim().allow(null).max(1000)
      })).min(1).required()
    }),
    enableOtherOption: joi.any().when('type', {
      is: joi.string().valid(typeWithoutOptions),
      then: joi.boolean().default(false).valid(false),
      otherwise: joi.boolean().default(false)
    })
  }))
});

export function validate(model: any): Promise<{ email: string, password: string }> {
  return validateAsPromise<any>(model, schema);
}