import * as urlService from '../services/url';

import { IUser } from '../interfaces/user';
import { enRoles } from '../interfaces/churchUser';

export interface IUserFormatted {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  fullName: string;
  fullAddress: string;
  avatar?: string;
  gender?: string;
  birthday?: Date;
  zipcode?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  number?: string;
  complement?: string;

  createdDate: Date;
  updatedDate: Date;
  roles: string[];
}

export function toJson(user: IUser, churchId: number): IUserFormatted {
  if (!user) return;

  const churchUser = user.churches.filter(c => c.churchId === churchId)[0];
  delete user.churches;
  delete user.password;

  (<any>user).fullName = getFullName(user);
  (<any>user).fullAddress = getFullAddress(user);
  (<any>user).roles = [];

  if (user.married) {
    (<any>user.married).fullName = getFullName(user.married);
  }

  if (user.avatar && !user.avatar.startsWith('http')) {
    user.avatar = urlService.content(user.avatar);
  }

  if (churchUser) {
    (<any>user).lastAppDateAccess = churchUser.lastAppDateAccess;
    (<any>user).isMember = churchUser.isMember;

    if (churchUser.roles) {
      (<any>user).roles = churchUser.roles.filter(r => r != enRoles.webAdmin);
    }
  }

  return <IUserFormatted>user;
}

function getFullName(user: IUser): string {
  return `${user.firstName} ${user.lastName || ''}`.trim();
}

function getFullAddress(user: IUser): string {
  const zipcode = user.zipcode ? ', ' + formatZipcode(user.zipcode) : '';
  const city = user.city && user.state ? `${user.city}/${user.state}` : '';
  let neighborhood = user.neighborhood ? user.neighborhood + ' - ' : '';

  if (!user.address) {
    return `${neighborhood}${city}${zipcode}`.trim();
  }

  // tslint:disable-next-line:variable-name
  const number = (user.number ? ', ' + user.number + ' ' + (user.complement || '') : '').trim();
  neighborhood = neighborhood ? `, ` + neighborhood : '';

  return `${user.address}${number}${neighborhood}${city}${zipcode}`.trim();
}

function formatZipcode(zipcode: string): string {
  return `${zipcode.substr(0, 5)}-${zipcode.substr(5, 3)}`;
}