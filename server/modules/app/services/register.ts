import { Transaction, transaction } from 'objection';

import { ISocialUserInfo } from '../../../interfaces/socialUserInfo';
import { IUserSocial } from '../../../interfaces/userSocial';
import { User } from '../../../models/user';
import * as logService from '../../../services/log';
import * as uploadService from '../../../services/upload';
import * as userRepository from '../repositories/user';

export async function register(socialUser: ISocialUserInfo, churchSlug: string): Promise<User> {
  let avatarPath: string = null;

  return await transaction(User.knex(), async transaction => {
    let user = await userRepository.findBySocial(socialUser.id, socialUser.provider, transaction);

    if (!user) {
      user = await registerByEmail(socialUser, churchSlug, transaction);
    }

    if ((!user.avatar || user.avatar.startsWith('http')) && socialUser.avatar) {
      user.avatar = null; //remove old implementation
      avatarPath = socialUser.avatar = await uploadService.move(socialUser.avatar);
    }

    await updateUserInfo(socialUser, user, transaction);

    return user;
  }).catch(err => {
    if (avatarPath) {
      uploadService.remove(avatarPath).catch(err => logService.exception(err));
    }

    throw err;
  });
}

async function registerByEmail(socialUser: ISocialUserInfo, churchSlug: string, transaction: Transaction): Promise<User> {
  let user;

  if (socialUser.email) {
    user = await userRepository.findByEmail(socialUser.email, transaction);
  }

  if (!user) {
    user = await userRepository.insert({
      firstName: socialUser.firstName,
      lastName: socialUser.lastName,
      email: socialUser.email,
      birthday: socialUser.birthday
    }, churchSlug, transaction);
  }

  user.socials = user.socials || [];
  user = await associateUserSocial(user, {
    userId: user.id,
    ref: socialUser.id,
    provider: socialUser.provider
  }, transaction);

  return user;
}

async function associateUserSocial(user: User, social: IUserSocial, transaction: Transaction): Promise<User> {
  let userSocial = user.socials.filter(s => s.provider === social.provider)[0];

  if (userSocial) {
    social = await userRepository.updateSocial(social, transaction);
    userSocial.ref = social.ref;
    return user;
  }

  social = await userRepository.insertSocial(social, transaction);
  user.socials.push(<any>social);

  return user;
}

async function updateUserInfo(socialUser: ISocialUserInfo, user: User, transaction: Transaction): Promise<User> {
  let hasChange = false;

  if (!user.avatar && socialUser.avatar && user.avatar !== socialUser.avatar) {
    hasChange = true;
    user.avatar = socialUser.avatar;
  }

  if (!user.birthday && socialUser.birthday && user.birthday !== socialUser.birthday) {
    hasChange = true;
    user.birthday = socialUser.birthday;
  }

  if (!user.gender && socialUser.gender && user.gender !== socialUser.gender) {
    hasChange = true;
    user.gender = socialUser.gender;
  }

  if (!user.marriedId && socialUser.married) {
    const userSignificantOther = await userRepository.findBySocial(socialUser.married, socialUser.provider, transaction);

    if (userSignificantOther) {
      hasChange = true;
      user.marriedId = userSignificantOther.id;
      userSignificantOther.marriedId = user.id;
      await userRepository.update(userSignificantOther, transaction);
    }
  }

  if (hasChange) {
    user = await userRepository.update(user, transaction);
  }

  return user;
}