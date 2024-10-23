import { IIdentityUser } from './interfaces';

export interface ITopic {
  _id: string;
  slug: string;
  name: string;
  created_at: string;
  created_by: IIdentityUser;
}

export interface IQAndA {
  _id: string;
  created_at: string;
  created_by: IIdentityUser;
  question: string;
  answer: string;
  slug: string;
  title: string;
}
