/* eslint-disable @next/next/no-img-element */
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import VerifyAccountProfile from '../verify-account';

export const VIEW_TYPE_REFERRER = {
  GRID: 'GRID',
  LIST: 'LIST',
};

export const AvatarDefault =
  'https://storage.googleapis.com/image-fina/upload/fina/default-avatar1673428048272svg';

export const ReferrersSchema = () => {
  const { t } = useHTranslation('common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Full name', { vn: 'Tên User' }),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (value, user) => {
        return (
          <div className="view-user-name">
            <img src={user?.avatar || AvatarDefault} alt="avatar" />
            <b>{value}</b>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('ID'),
      dataIndex: 'code',
      key: 'code',
      render: (code) => {
        return <span className="view-user-code">{code}</span>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('profile.accountOpeningDate'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('profile.referrerMore'),
      dataIndex: 'children',
      key: 'children',
      render: (value) => value?.length || 0 + ` ${t('profile.customer')}`,
    }),
    TableUtils.createTableColumnConfig({
      title: t('profile.accountVerification'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, document) => <VerifyAccountProfile user={document} />,
    }),
  ];
};
