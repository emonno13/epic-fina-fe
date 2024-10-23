import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { ConvertUtils } from '@lib/utils/convert';
import { Tag } from 'antd';
import { useHTranslation } from '../../../lib/i18n';

export const OrgTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
      render: (text) => (
        <a>{ConvertUtils.replaceWhiteSpaceAndUpperString(text)}</a>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Organization Name', { vn: 'Tên tổ chức' }),
      dataIndex: 'name',
      key: 'name',
      sortable: true,
      render: (_, org) => (
        <div>
          <div>{org.name}</div>
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email',
      dataIndex: 'contacts',
      key: 'contacts',
      render: ConverterUtils.showOrgEmail,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phone number', { vn: 'Số điện thoại' }),
      dataIndex: 'contacts',
      key: 'contacts',
      render: ConverterUtils.showOrgPhone,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Address'),
      dataIndex: 'addresses',
      key: 'addresses',
      render: ConverterUtils.showOrgAddress,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};

const renderGroup = (groups: any[] = []) => {
  return (
    groups?.map((group, index) => <Tag key={index}>{group?.name || ''}</Tag>) ||
    null
  );
};
