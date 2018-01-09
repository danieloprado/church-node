import { IChurchUser } from './churchUser';

export interface IChurch {
  id: number;
  slug: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  social?: { name: string, url: string }[];

  users?: IChurchUser[];
}