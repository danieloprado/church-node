import { IChurch } from '../interfaces/church';

export interface IChurchFormatted extends IChurch {
  roles: string[];
}

export function toJson(church: IChurch, userId: number): IChurchFormatted {
  (<IChurchFormatted>church).roles = (church.users || [])
    .filter(c => c.userId === userId)
    .map(u => u.roles)[0] || [];

  delete church.users;
  return <IChurchFormatted>church;
}