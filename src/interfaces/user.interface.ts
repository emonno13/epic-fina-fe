export interface IUser {
  _id: string;
  email: string;
  full_name: string;
  dob: string | null;
  is_verified: boolean;
  role?: string;
  company?: {
    name: string;
    _id: string;
  };
}
