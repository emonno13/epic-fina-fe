import { ButtonProps } from 'antd';

export type Dimension = number | string;
export interface IFormControl {
  name: string;
}

export interface IIdentityUser {
  _id: string;
  role: string;
  is_verified: boolean;
  full_name: string;
  email: string;
  dob: string;
  referral_code: string;
  company: any;
  is_first_login?: boolean;
  workspaces?: string;
  phone?: string;
  address?: string;
  credit_balance?: {
    credit_balance?: number;
    loaded?: number;
    used?: number;
    remaining?: number;
  };
}

export interface FormTemplateProps {
  formId?: string;
  okBtnText?: string;
  hideActionBtn?: boolean;
  loading?: boolean;
  cancelBtnText?: string;
  saveButtonProps?: ButtonProps;
  hideCancel?: boolean;
  onCancel?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
