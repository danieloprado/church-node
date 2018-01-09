import { IChurchReport } from '../../../interfaces/churchReport';
import { ChurchReport } from '../../../models/churchReport';
import { ChurchReportType } from '../../../models/churchReportType';

export async function list(churchId: number): Promise<ChurchReport[]> {
  return await ChurchReport.query()
    .eager('type')
    .where({ churchId })
    .orderBy('date', 'desc')
    .limit(10);
}

export async function findById(id: number): Promise<ChurchReport> {
  return await ChurchReport.query()
    .eager('type')
    .where({ id })
    .first();
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