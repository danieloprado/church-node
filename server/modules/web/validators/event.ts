import { IEventDate } from '../../../interfaces/eventDate';
import { IQuiz } from '../../../interfaces/quiz';
import { joi, validateAsPromise } from '../../../services/Joi.config';
import { schema as quizSchema } from './quiz';

export interface IEventValidatorResult {
  id: number;
  churchId?: number;
  title: string;
  description: string;
  dates: IEventDate[];

  featured: boolean;
  featuredText?: string;
  quizId?: number;

  enableQuiz: boolean;
  quiz?: IQuiz;
  image?: string | { filename: string; base64: string };
}

const schema = joi.object().keys({
  id: joi.number().integer().min(1),
  title: joi.string().trim().required().min(3).max(100),
  description: joi.string().trim().max(1000).allow(null),
  dates: joi.array().required().min(1).items(joi.object().keys({
    beginDate: joi.date().required(),
    endDate: joi.date().allow(null).min(joi.ref('beginDate'))
  })),
  featured: joi.boolean().default(false),
  featuredText: joi.string().trim().allow(null).min(3).max(200),
  quiz: quizSchema.allow(null),
  image: joi.alternatives([joi.string(), joi.object({
    filename: joi.string().required(),
    base64: joi.string().required()
  })]).allow(null),
});

export function validate(model: any): Promise<IEventValidatorResult> {
  return validateAsPromise(model, schema);
}