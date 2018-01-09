export interface IUserToken {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
  church?: {
    id: number;
    name: string;
    slug: string;
  };
}