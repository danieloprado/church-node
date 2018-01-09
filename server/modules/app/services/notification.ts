import { IUserToken } from '../../../interfaces/userToken';
import * as userRepository from '../repositories/user';

export async function register(notificationToken: string, deviceId: string, aplication: string, user: IUserToken): Promise<void> {
  const device = await userRepository.getDevice(user.id, deviceId, aplication);
  if (!device) return;

  device.notificationToken = notificationToken;
  await userRepository.updateDevice(device);
}