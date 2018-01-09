import { IUser } from '../../../interfaces/user';
import { send } from '../../../services/mail';
import * as urlService from '../../../services/url';
import * as _ from 'lodash';

export async function sendUserCreate(user: IUser, password: string): Promise<void> {
  const data = _.clone(user);
  data.password = password;

  return await send(user.email, 'Bem Vindo!', 'user-create', data);
}

export async function sendResetPassword(user: IUser, token: string): Promise<void> {
  const data: any = _.clone(user);
  data.url = urlService.resetPassword(token);

  return await send(user.email, 'Recuperar Acesso', 'user-reset-password', data);
}