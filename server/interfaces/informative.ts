export interface IInformative {
  id: number;
  title: string;
  date: Date;
  message: string;
  creatorId?: number;
  churchId?: number;
  typeId: number;
}

export enum enInformativeType {
  church = 1,
  cell = 2
}