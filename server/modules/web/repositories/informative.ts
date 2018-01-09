import { IInformative } from '../../../interfaces/informative';
import { Informative } from '../../../models/informative';

export async function list(churchId: number): Promise<Informative[]> {
  return await Informative.query().where({ churchId });
}

export async function findById(id: number): Promise<Informative> {
  return await Informative.query().where({ id }).first();
}

export async function insert(informative: IInformative): Promise<Informative> {
  return await Informative.query().insert(informative);
}

export async function update(informative: IInformative): Promise<Informative> {
  return await Informative.query().updateAndFetchById(informative.id, informative);
}

export async function remove(id: number): Promise<void> {
  await Informative.query().delete().where({ id });
}