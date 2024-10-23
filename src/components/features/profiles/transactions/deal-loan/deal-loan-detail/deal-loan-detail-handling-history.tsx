import { newMappingStatusOfTask } from '@components/features/crm/tasks/utils';
import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import HCard from '@components/shared/common/h-card';
import { Empty, Tag, Timelfrom '@libm 'antd';
import classnames from 'classnames';
import { TASK_STATUSES_COLOfrom '@lib } from '@constants/crm/task';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { memo } from 'react';
import { useFetchCreatedByForHistory } from '../../hooks';

import './deal-loan-detail.module.scss';

const { Item } = Timeline;

interface DealLoanDetailHandlingHistoryProps {
  taskData: any;
  className?: string;
}

export const DealLoanDetailHandlingHistory = memo((props: DealLoanDetailHandlingHistoryProps) => {
  const { taskData = {}, className = '' } = props;
  const histories = useFetchCreatedByForHistory(taskData?.history);
	
  if (!histories?.length) return <div style={{ marginTop: '15%' }}><Empty /></div>;

  return (
    <div className="deal-loan-detail-handling-history">
      <Timeline mode={'left'} className={classnames('history-item m-t-20 m-l-20', className)}>
        {
          histories.map((history, index) => <Item key={`${history?.createdById}-${index}`}>
            <TaskHistoryItem history={history} />
          </Item>)
        }
      </Timeline>
    </div>
  );
});

const TaskHistoryItem = memo(({ history }: any) => {
  const { createdAt, status = '', statusAssign = '', message = '', createdBy } = history || {};
  const { t } = useHTranslation('admin-common');

  return <HCard title={ConverterUtils.fullDatetimeConverter(createdAt)}>
    <FiledViewer label={t('Status')} value={
      <Tag color={TASK_STATUSES_COLOR_MAPPING[status]}>
        {newMappingStatusOfTask({ t, status, statusAssign })}
      </Tag>} 
    />

    <FiledViewer label={t('Staff')} value={<PreViewUser user={createdBy} />}/>

    <FiledViewer label={t('Message', { vn: 'Tin nhắn' })} value={message} />
  </HCard>;
});
