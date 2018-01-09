import * as mailService from './mail';
import * as tokenService from '../../../services/token';
import * as userRepository from '../repositories/user';

import { ChurchUser } from '../../../models/churchUser';
import { IResetPasswordToken } from '../../../interfaces/resetPasswordToken';
import { ISocialUserInfo } from '../../../interfaces/socialUserInfo';
import { IUserSocial } from '../../../interfaces/userSocial';
import { IUserToken } from '../../../interfaces/userToken';
import { User } from '../../../models/user';
import { enTokenType } from '../../../services/token';

export async function login(email: string, password: string): Promise<string> {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('user-not-found');

    await user.checkPassword(password);
    return await generateToken(user);
  } catch (err) {
    if (err.message === 'bcript-invalid') throw new Error('invalid-password');
    throw err;
  }
}

export async function loginBySocial(socialUser: ISocialUserInfo): Promise<string> {
  let user = await userRepository.findBySocial(socialUser.id, socialUser.provider);

  if (!user && socialUser.email) {
    user = await userSocialByEmail(socialUser);
  }

  if (!user) throw new Error('user-not-found');
  return await generateToken(user);
}

export async function changeChurchUserToken(userToken: IUserToken, churchId: number): Promise<string> {
  const user = await userRepository.findById(userToken.id);
  return await generateToken(user, churchId);
}

export async function changePassword(userToken: IUserToken, oldPassword: string, newPassword: string): Promise<User> {
  try {
    const user = await userRepository.findById(userToken.id);
    await user.checkPassword(oldPassword);

    user.setPassword(newPassword);
    return await userRepository.update(user);
  } catch (err) {
    if (err.message === 'bcript-invalid') throw new Error('invalid-password');
    throw err;
  }
}

export async function sendResetPassword(email: string): Promise<void> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('user-not-found');

  const token = await tokenService.resetPassword(user);
  await mailService.sendResetPassword(user, token);
}

export async function resetPassword(token: string, newPassword: string): Promise<User> {
  const info = await tokenService.verify<IResetPasswordToken>(token, enTokenType.resetPassword);
  const user = await userRepository.findById(info.id);

  if (!user) throw new Error('user-not-found');
  user.setPassword(newPassword);

  return await userRepository.update(user);
}

async function userSocialByEmail(socialUser: ISocialUserInfo): Promise<User> {
  const user = await userRepository.findByEmail(socialUser.email);

  if (user) {
    await associateUserSocial(user, {
      userId: user.id,
      ref: socialUser.id,
      provider: socialUser.provider
    });
  }

  return user;
}

async function associateUserSocial(user: User, social: IUserSocial): Promise<User> {
  let userSocial = user.socials.filter(s => s.provider === social.provider)[0];

  if (userSocial) {
    social = await userRepository.updateSocial(social);
    userSocial.ref = social.ref;
    return user;
  }

  social = await userRepository.insertSocial(social);
  user.socials.push(<any>social);

  return user;
}

async function generateToken(user: User, churchId: number = null): Promise<string> {
  let churchUser: ChurchUser;

  if (churchId) {
    churchUser = user.churches.filter(c => c.roles.length > 0 && c.churchId === churchId)[0];
  } else {
    churchUser = user.churches.filter(c => c.roles.length > 0)[0];
  }

  if (!churchUser) throw new Error('user-no-access');

  return await tokenService.userToken(user, churchUser);
}