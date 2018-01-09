import { joi, validateAsPromise } from '../../../services/Joi.config';

export interface IChuchReportValidatorResult {
  id?: number;
  title: string;
  date: Date;
  totalMembers: number;
  totalNewVisitors: number;
  totalFrequentVisitors: number;
  totalKids: number;
  typeId: number;
}

const schema = joi.object().keys({
  id: joi.number().integer().min(1),
  title: joi.string().trim().required().min(3).max(100),
  date: joi.date().required(),
  totalMembers: joi.number().min(0).integer().required(),
  totalNewVisitors: joi.number().min(0).integer().required(),
  totalFrequentVisitors: joi.number().min(0).integer().required(),
  totalKids: joi.number().min(0).integer().required(),
  typeId: joi.number().min(0).required().integer()
});

export function validate(model: any): Promise<IChuchReportValidatorResult> {
  return validateAsPromise<IChuchReportValidatorResult>(model, schema);
}