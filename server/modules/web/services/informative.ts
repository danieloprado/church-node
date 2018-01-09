import { IInformative } from '../../../interfaces/informative';
import { IUserToken } from '../../../interfaces/userToken';
import { Informative } from '../../../models/informative';
import * as informativeRepository from '../repositories/informative';

export async function save(model: IInformative, user: IUserToken): Promise<Informative> {
  if (model.id) return await _update(model, user);
  return await _create(model, user);
}

async function _create(model: IInformative, user: IUserToken): Promise<Informative> {
  model.creatorId = user.id;
  model.churchId = user.church.id;
  return await informativeRepository.insert(model);
}

async function _update(model: IInformative, user: IUserToken): Promise<Informative> {
  const informative = await informativeRepository.findById(model.id);

  if (!informative) throw new Error('not-found');
  if (informative.churchId !== user.church.id) throw new Error('access-denied');

  return await informativeRepository.update(model);
}

export async function remove(id: number, user: IUserToken): Promise<void> {
  const informative = await informativeRepository.findById(id);

  if (!informative) throw new Error('not-found');
  if (informative.churchId !== user.church.id) throw new Error('access-denied');

  await informativeRepository.remove(id);
}