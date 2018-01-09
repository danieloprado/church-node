export interface ISocialUserInfo {
  id: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  birthday?: Date;
  married?: string;
  gender?: string;
  provider: 'facebook' | 'google';
}