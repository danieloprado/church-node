import { Church } from '../../../models/church';

export async function find(slug: string): Promise<Church> {
  return await Church.query().where({ slug }).first();
}
