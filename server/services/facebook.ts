import * as fb from 'fb';
import * as logService from './log';
import * as settings from '../settings';
import * as urlService from './url';

import { ISocialUserInfo } from '../interfaces/socialUserInfo';

const fields = `id,name,picture.type(large),email,birthday,relationship_status,significant_other,gender`;

export async function getUserInfo(accessToken: string): Promise<ISocialUserInfo> {
  return new Promise<ISocialUserInfo>((resolve, reject) => {
    (<any>fb).setAccessToken(accessToken);

    fb.api(`/me?fields=${fields}`, (response: any) => {
      if (!response || response.error) return reject(apiError(response));

      const name = response.name.split(' ');
      resolve({
        id: response.id,
        firstName: name[0],
        lastName: name[1] || null,
        avatar: getAvatar(response),
        email: response.email,
        birthday: getBirthday(response.birthday),
        married: getMarried(response),
        gender: response.gender ? response.gender === 'male' ? 'm' : 'f' : null,
        provider: 'facebook'
      });
    });
  });
}

export async function loginUrl(): Promise<string> {
  return (<any>fb).getLoginUrl({
    client_id: settings.facebook.appId,
    client_secret: settings.facebook.appSecret,
    redirect_uri: urlService.facebookCallback()
  });
}

export async function getAccessToken(code: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fb.api('oauth/access_token', {
      client_id: settings.facebook.appId,
      client_secret: settings.facebook.appSecret,
      redirect_uri: urlService.facebookCallback(),
      scope: settings.facebook.scopes.join(','),
      code
    }, (response: any) => {
      if (!response || response.error) return reject(apiError(response));
      resolve(response.access_token);
    });
  });
}

function getBirthday(birthday: string): Date {
  try {
    if (!birthday) return null;

    const parts = birthday.split('/');
    if (parts.length < 2) return null;

    const date = new Date(Number(parts[2] || 0), Number(parts[0]) - 1, Number(parts[1]));
    if (isNaN(date.getTime())) return null;

    if (date.getFullYear() < 1900) {
      date.setFullYear(1900);
    }

    return date;
  } catch (err) {
    logService.exception(err);
    return null;
  }
}

function getMarried(response: any): string {
  if (response.relationship_status !== 'Married') return;
  return response.significant_other ? response.significant_other.id : null;
}

function getAvatar(response: any): string {
  if (!response.picture || !response.picture.data || response.picture.data.is_silhouette) {
    return null;
  }

  return response.picture.data.url;
}

function apiError(response: any): Error {
  if (!response) {
    return new Error('facebook-no-reponse');
  }

  const error = new Error(response.error.message);
  error.name = 'facebook-error';
  (<any>error).full = response.error;

  return error;
}