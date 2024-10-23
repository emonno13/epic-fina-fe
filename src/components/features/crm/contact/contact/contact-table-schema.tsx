import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';

import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';

export const ContactTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Full name'),
      dataIndex: 'fullName',
      key: 'fullName',
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email',
      dataIndex: 'emails',
      key: 'emails',
      sortable: true,
      render: (emails) => {
        if (Array.isArray(emails) && emails.length > 0) {
          return emails.map((item) => item?.email).join(', ');
        }
        return '';
      },
    }),
    {
      title: t('Call', { vn: 'Số điện thoại' }),
      dataIndex: 'tels',
      key: 'tels',
      width: '190px',
      render: (_, user) => {
        const tels = [...(user.tels || [])];
        return tels.map(
          (phoneData) =>
            phoneData?.tel && (
              <CallPhoneFcssSDKConvert
                {...{ phoneNumber: `${phoneData?.tel}`, userInfo: user }}
              />
            ),
        );
      },
    },
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
