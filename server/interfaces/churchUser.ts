import { IChurch } from './church';
import { IUser } from './user';

export interface IChurchUser {
  userId: number;
  churchId: number;
  roles: enRoles[];
  lastAppDateAccess?: Date;
  isMember?: boolean;

  church?: IChurch;
  user?: IUser;
}

export enum enRoles {
  sysAdmin = 'sysAdmin',
  webAdmin = 'webAdmin',
  admin = 'admin',
  contentManager = 'contentManager',
  churchReport = 'churchReport',
  peopleManager = 'peopleManager'
}

export function listPublicRoles(): enRoles[] {
  return [enRoles.admin, enRoles.contentManager, enRoles.churchReport, enRoles.peopleManager];
}