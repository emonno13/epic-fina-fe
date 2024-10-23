import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import { Empty } from 'antd';
import { memo } from 'react';
import { isEmpty } from 'underscore';
import { TASK_STATUS_FOR_TELLER } from '../../constants';

interface DealLoanDetailResponseProps {
  taskData?: any;
}

export const DealLoanDetailResponse = memo(
  (props: DealLoanDetailResponseProps) => {
    const { taskData } = props;
    const bankFeedbacks = taskData?.bankFeedbacks?.filter(
      (bankFeedback) =>
        bankFeedback?.responseStatus !==
        TASK_STATUS_FOR_TELLER?.WAITING_TO_RECEIVE,
    );
    const tableSchemaDetail = useDealLoanDetailResponseTableSchemaDetail();

    if (isEmpty(bankFeedbacks))
      return (
        <div style={{ marginTop: '15%' }}>
          <Empty />
        </div>
      );

    return (
      <HTable schema={() => tableSchemaDetail} dataSource={bankFeedbacks} />
    );
  },
);

const useDealLoanDetailResponseTableSchemaDetail = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Organization'),
      key: 'org',
      render: (document) =>
        `${document?.user?.org?.name} - ${document?.user?.org?.code}`,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      key: 'responseStatus',
      dataIndex: 'responseStatus',
      render: (responseStatus) => responseStatus,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Updated at'),
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
  ];
};
