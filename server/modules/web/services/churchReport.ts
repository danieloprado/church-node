import * as repository from '../repositories/churchReport';

import { ChurchReport } from '../../../models/churchReport';
import { IChurchReport } from '../../../interfaces/churchReport';
import { IUserToken } from '../../../interfaces/userToken';
import { ServiceError } from '../../../errors/service';

export async function save(user: IUserToken, model: IChurchReport): Promise<ChurchReport> {
  model.creatorId = user.id;
  model.churchId = user.church.id;

  model.total =
    model.totalMembers + model.totalNewVisitors +
    model.totalFrequentVisitors + model.totalKids;

  const report = !model.id ?
    await repository.insert(model) :
    await repository.update(model);

  report.type = await repository.typeById(report.typeId);
  return report;
}

export async function remove(id: number, user: IUserToken): Promise<void> {
  const report = await repository.findById(id);

  if (!report) throw new ServiceError('not-found');
  if (report.churchId !== user.church.id) throw new ServiceError('access-denied');

  await repository.remove(id);
}