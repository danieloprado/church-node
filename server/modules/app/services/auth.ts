import * as uuidGenerator from 'uuid';

import { ServiceError } from '../../../errors/service';
import { IRefreshToken } from '../../../interfaces/refreshToken';
import { IUserDevice } from '../../../interfaces/userDevice';
import { IUserToken } from '../../../interfaces/userToken';
import { User } from '../../../models/user';
import { UserDevice } from '../../../models/userDevice';
import * as tokenService from '../../../services/token';
import * as userRepository from '../repositories/user';

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export async function generateTokens(
  user: User,
  churchSlug: string,
  device: {
    deviceId: string,
    application: string,
    name: string,
    notificationToken?: string;
  }
): Promise<ILoginResult> {
  if (!user) throw new Error('user-not-found');

  const churchUser = user.churches.filter(c => c.church.slug === churchSlug)[0];
  if (!churchUser) throw new Error('church-not-found');

  const token = uuidGenerator();
  const [accessToken, refreshToken] = await Promise.all([
    tokenService.userToken(user, churchUser, true),
    tokenService.refreshToken(user.id, device.deviceId, device.application, token)
  ]);

  await saveDevice({
    deviceId: device.deviceId,
    application: device.application,
    name: device.name,
    notificationToken: device.notificationToken,
    currentToken: token,
    userId: user.id,
  });

  return { accessToken, refreshToken };
}

export async function generateAccessToken(refreshToken: string, churchSlug: string): Promise<string> {
  const token = await tokenService.verify<IRefreshToken>(refreshToken, tokenService.enTokenType.refreshToken);
  const device = await userRepository.getDevice(token.userId, token.deviceId, token.application);

  if (!device) throw new ServiceError('device-not-found');
  if (device.currentToken !== token.uuid) throw new ServiceError('token-changed');

  const churchUser = device.user.churches.filter(c => c.church.slug === churchSlug)[0];
  if (!churchUser) throw new ServiceError('church-not-found');

  return await tokenService.userToken(device.user, churchUser, true);
}

export async function logout(user: IUserToken, deviceId: string, application: string): Promise<void> {
  await userRepository.removeDevice(user.id, deviceId, application);
}

async function saveDevice(model: IUserDevice): Promise<UserDevice> {
  const device = await userRepository.getDevice(model.userId, model.deviceId, model.application);

  if (device) {
    return await userRepository.updateDevice(model);
  }

  return await userRepository.insertDevice(model);
}