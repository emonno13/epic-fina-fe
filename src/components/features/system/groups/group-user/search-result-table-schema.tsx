import { TableUtils } from '@lib/table-utils';
import { mappingLabelAgentTypeCall } from '@types/agent-type-call';
import { ConverterUtils } from '../../../../../lib/converter';
import { useHTranslation } from '../../../../../lib/i18n';

export const GroupUserTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Full name', { vn: 'Tên' }),
      dataIndex: 'user',
      sortable: true,
      key: 'user',
      render: (user) => ConverterUtils.getFullNameUser(user) || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Organization', { vn: 'Tổ chức' }),
      dataIndex: 'org',
      key: 'org',
      render: (_, record) => ConverterUtils.showOrgConverter(record.user?.org),
    }),
    TableUtils.createTableColumnConfig({
      title: t('status', { vn: 'Trạng thái nhận cuộc gọi' }),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      converter: (status) => mappingLabelAgentTypeCall(status, t),
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
