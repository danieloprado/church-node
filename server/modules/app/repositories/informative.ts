import { Informative } from '../../../models/informative';

export async function findById(id: number): Promise<Informative> {
  return await Informative.query().where({ id }).first();
}

export async function list(slug: string, limit: number = null): Promise<Informative[]> {
  let query = Informative.query()
    .select('Informative.*')
    .join('Church', 'Informative.churchId', 'Church.id')
    .where('Church.slug', '=', slug)
    .andWhere('Informative.date', '<', new Date());

  if (limit) {
    query = query.limit(limit);
  }

  return await query.orderBy('Informative.date', 'desc');
}