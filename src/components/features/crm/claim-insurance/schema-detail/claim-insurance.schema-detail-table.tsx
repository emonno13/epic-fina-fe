import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { useTranslation } from 'react-i18next';
import { mappingLabelClaimInsurance } from '../utils';

export const ClaimInsuranceSchemaDetailTable = () => {
  const { t } = useTranslation('admin-common');

  return [
    // TableUtils.createColumnCreatedBy(),
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      key: 'code',
      width: 50,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Customer'),
      dataIndex: 'user',
      key: 'user',
      responsive: ['md'],
      render: (user) => {
        return <PreViewUser user={user} />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Staff'),
      dataIndex: 'assignee',
      key: 'assignee',
      responsive: ['md'],
      render: (assignee) => {
        if (!assignee) {
          return t('Not assigned yet');
        }
        return ConverterUtils.getFullNameUser(assignee);
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status', { vn: 'Trạng thái' }),
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: mappingLabelClaimInsurance,
    }),
    TableUtils.createColumnCreatedAt(),
    TableUtils.createTableColumnConfig({
      title: t('Last update'),
      dataIndex: 'updatedAt',
      responsive: ['md'],
      sortable: true,
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
