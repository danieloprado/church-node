import { IUser } from './user';

export interface IUserDevice {
  deviceId: string;
  userId: number;
  application: string;
  name: string;
  currentToken: string;
  notificationToken?: string;

  user?: IUser;
}