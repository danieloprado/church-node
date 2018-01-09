import { IChurchReport } from '../../../interfaces/churchReport';
import { ChurchReport } from '../../../models/churchReport';
import { ChurchReportType } from '../../../models/churchReportType';

export interface IQueryList {
  term: string;
  typeIds: number[];
  beginDate: Date;
  endDate: Date;
}

export async function findById(id: number): Promise<ChurchReport> {
  return await ChurchReport.query().where({ id }).first();
}

export async function list(churchId: number, params: IQueryList): Promise<ChurchReport[]> {
  let query = ChurchReport.query()
    .eager('type')
    .where({ churchId })
    .whereIn('typeId', params.typeIds)
    .andWhereBetween('date', [params.beginDate, params.endDate])
    .orderBy('date', 'desc');

  if (params.term) {
    query = query.where('title', 'ilike', `%${params.term}%`);
  }

  return await query;
}

export async function types(churchId: number): Promise<ChurchReportType[]> {
  return await ChurchReportType.query().where({ churchId });
}

export async function typeById(id: number): Promise<ChurchReportType> {
  return await ChurchReportType.query().where({ id }).first();
}

export async function insert(churchReport: IChurchReport): Promise<ChurchReport> {
  return await ChurchReport.query().insert(<any>churchReport).first();
}

export async function update(churchReport: IChurchReport): Promise<ChurchReport> {
  return await ChurchReport.query().updateAndFetchById(churchReport.id, <any>churchReport);
}

export async function remove(id: number): Promise<void> {
  await ChurchReport.query().delete().where({ id });
}