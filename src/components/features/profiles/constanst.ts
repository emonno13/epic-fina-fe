import {
  AimOutlined,
  AlignRightOutlined,
  AntCloudOutlined,
  CopyFilled,
  DatabaseFilled, LayoutFilled, SettingFilled, SnippetsFilled, StarFilled, UserOutlined,
} from '@ant-design/icons';
import { TFunction } from 'next-i18next';
import { USER_TYPES } from '../../../types/organization';

export const BASE_PATH_PROFILE_SCREEN = '/admin/profiles';

export const PROFILE_SCREEN = {
  INFORMATION: 'information',
  CHANGE_PASSWORD: 'change-password',
  DOCUMENT: 'document',
  ORGANIZATION: 'organization',
  SETTING: 'setting',
  PROFESSIONAL: 'professional',
  RATE: 'rate',
  CONTRACT: 'contract',
  SURVEY: 'survey',
  TRANSACTION: 'transaction',
  REFERRER: 'referrer',
  TRANSACTIONS: 'transactions',
  KYC: 'KYC',
  LINK_INFORMATION: 'linkInformation',
  INVEST_TRANSACTION: 'investTransaction',
  HISTORY_TRANSACTION: 'history_transaction',
};

export const CommonMenus = (t: TFunction) => [
  { label: t('Quản lý hồ sơ', { vn: 'Quản lý hồ sơ' }), key: PROFILE_SCREEN.TRANSACTION, icon: DatabaseFilled },
  { label: t('Quản lý tài sản đầu tư', { vn: 'Quản lý tài sản đầu tư' }), key: PROFILE_SCREEN.INVEST_TRANSACTION, icon: DatabaseFilled },
  { label: t('Transactions', { vn: 'Giao dịch của tôi' }), key: PROFILE_SCREEN.HISTORY_TRANSACTION, icon: DatabaseFilled },
  { label: t('My document', { vn: 'Tài liệu của tôi' }), key: PROFILE_SCREEN.DOCUMENT, icon: CopyFilled },
];

export const UserMenu = {
  [USER_TYPES.staff]: (t: TFunction) => [
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.teller]: (t: TFunction) => [
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.seller]: (t: TFunction) => [
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.collaborator]: (t: TFunction) => [
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.customer]: (t: TFunction) => [
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
};

export const UserMenuMapping = {
  [USER_TYPES.staff]: (t: TFunction) => [
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Rate', { vn: 'Đánh giá' }), key: 'rate', icon: StarFilled },
    { label: t('investment transaction', { vn: 'Tài sản' }), key: 'invest', icon: DatabaseFilled },
    { label: t('Transaction', { vn: 'Giao dịch của tôi' }), key: 'transaction', icon: DatabaseFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
    { label: t('Referrer', { vn: 'Người giới thiệu' }), key: 'referrer', icon: AimOutlined },
    { label: 'KYC', key: 'KYC', icon: AimOutlined },
  ],
  [USER_TYPES.teller]: (t: TFunction) => [
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
    { label: t('Referrer', { vn: 'Người giới thiệu' }), key: 'referrer', icon: AimOutlined },
    { label: 'KYC', key: 'KYC', icon: AimOutlined },
  ],
  [USER_TYPES.seller]: (t: TFunction) => [
    { label: t('Professional information', { vn: 'Thông tin nghiệp vụ' }), key: 'professional', icon: SettingFilled },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
    { label: t('Referrer', { vn: 'Người giới thiệu' }), key: 'referrer', icon: AimOutlined },
    { label: 'KYC', key: 'KYC', icon: AimOutlined },
  ],
  [USER_TYPES.collaborator]: (t: TFunction) => [
    { label: t('Contract', { vn: 'Hợp đồng cộng tác viên' }), key: 'contract', icon: SnippetsFilled },
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Transaction', { vn: 'Giao dịch của tôi' }), key: 'transaction', icon: DatabaseFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
    { label: t('Referrer', { vn: 'Người giới thiệu' }), key: 'referrer', icon: AimOutlined },
    { label: t('Referrer', { vn: 'Giao dịch của tôi' }), key: 'transactions', icon: AlignRightOutlined },
    { label: 'KYC', key: 'KYC', icon: AimOutlined },
  ],
  [USER_TYPES.customer]: (t: TFunction) => [
    { label: t('Contract', { vn: 'Hợp đồng cộng tác viên' }), key: 'contract', icon: SnippetsFilled },
    { label: t('Transaction', { vn: 'Giao dịch của tôi' }), key: 'transaction', icon: DatabaseFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
    { label: t('Referrer', { vn: 'Người giới thiệu' }), key: 'referrer', icon: AimOutlined },
    { label: t('My transactions', { vn: 'Giao dịch của tôi' }), key: 'transactions', icon: AlignRightOutlined },
    { label: 'KYC', key: 'KYC', icon: AimOutlined },
  ],
};

export const UserMenuMappingSetting = {
  [USER_TYPES.staff]: (t: TFunction) => [
    { label: t('Personal information', { vn: 'Thông tin cá nhân' }), key: 'information', icon: UserOutlined },
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Rate', { vn: 'Đánh giá' }), key: 'rate', icon: StarFilled },
    { label: t('Thay đổi pass word', { vn: 'Thay đổi pass word' }), key: PROFILE_SCREEN.CHANGE_PASSWORD, icon: CopyFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.teller]: (t: TFunction) => [
    { label: t('Personal information', { vn: 'Thông tin cá nhân' }), key: 'information', icon: UserOutlined },
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Thay đổi pass word', { vn: 'Thay đổi pass word' }), key: PROFILE_SCREEN.CHANGE_PASSWORD, icon: CopyFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.seller]: (t: TFunction) => [
    { label: t('Personal information', { vn: 'Thông tin cá nhân' }), key: 'information', icon: UserOutlined },
    { label: t('Professional information', { vn: 'Thông tin nghiệp vụ' }), key: 'professional', icon: SettingFilled },
    { label: t('Organizational structure', { vn: 'Cơ cấu tổ chức' }), key: 'organization', icon: LayoutFilled },
    { label: t('Thay đổi pass word', { vn: 'Thay đổi pass word' }), key: PROFILE_SCREEN.CHANGE_PASSWORD, icon: CopyFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.collaborator]: (t: TFunction) => [
    { label: t('Personal information', { vn: 'Thông tin cá nhân' }), key: 'information', icon: UserOutlined },
    { label: t('Contract', { vn: 'Hợp đồng cộng tác viên' }), key: 'contract', icon: SnippetsFilled },
    { label: t('Professional information', { vn: 'Thông tin nâng cao' }), key: 'professional', icon: AntCloudOutlined },
    { label: t('Thay đổi pass word', { vn: 'Thay đổi pass word' }), key: PROFILE_SCREEN.CHANGE_PASSWORD, icon: CopyFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
  [USER_TYPES.customer]: (t: TFunction) => [
    { label: t('Personal information', { vn: 'Thông tin cá nhân' }), key: 'information', icon: UserOutlined },
    { label: t('Contract', { vn: 'Hợp đồng cộng tác viên' }), key: 'contract', icon: SnippetsFilled },
    { label: t('Thay đổi pass word', { vn: 'Thay đổi pass word' }), key: PROFILE_SCREEN.CHANGE_PASSWORD, icon: CopyFilled },
    { label: t('Settings', { vn: 'Cài đặt' }), key: 'setting', icon: SettingFilled },
  ],
};

export const getMenuDisplayByUserType = (type: string, t: TFunction) => {
  const menuByUserType: any = UserMenuMapping[type];
  const resulf = [...CommonMenus(t)];

  if (type) {
    resulf.push(...menuByUserType(t));
  }

  return resulf;
};

export const getMenuDisplayByUserTypeConfig = (type: string, t: TFunction) => {
  const menuByUserType: any = UserMenu[type];
  const resulf: any = [...CommonMenus(t)];

  if (type) {
    resulf.push(...menuByUserType(t));
  }

  return resulf;
};

export const getMenuDisplayByUserTypeSetting = (type: string, t: TFunction) => {
  const resulf: any = [];
  const menuByUserTypeSetting: any = UserMenuMappingSetting[type];

  if (type) {
    resulf.push(...menuByUserTypeSetting(t));
  }

  return resulf;
};

export const EXPERTISE = {
  CREDIT: 'credit',
  INSURANCE: 'insurance',
  REAL_ESTATE: 'real_estate',
};

export const getLabelExpertise = (t: TFunction) => [
  { label: t(EXPERTISE.CREDIT, { vn: 'Tín dụng' }), value: EXPERTISE.CREDIT },
  { label: t(EXPERTISE.INSURANCE, { vn: 'Bảo hiểm' }), value: EXPERTISE.INSURANCE },
  { label: t(EXPERTISE.REAL_ESTATE, { vn: 'Bất động sản' }), value: EXPERTISE.REAL_ESTATE },
];

export const statusCodeKycWithMio = {
  PHONE_IS_EXISTS: 40026,
  EMAIL_IS_EXISTS: 40025,
  ID_NUMBER_IS_EXISTS: 40035,
};
