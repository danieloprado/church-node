import { IChurch } from '../../../interfaces/church';
import { IUserToken } from '../../../interfaces/userToken';
import { Church } from '../../../models/church';
import * as churchRepository from '../repositories/church';

export async function save(model: IChurch, user: IUserToken): Promise<Church> {
  model.id = user.church.id;
  return await churchRepository.update(model);
}
