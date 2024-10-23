import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import HTabs from '@components/shared/common/h-tabs';
import { Tabs } from 'antd';
import classnames from 'classnames';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } ffrom '@libproviders/auth';
import { TableUtils } fromfrom '@lible-utils';
import { memo, useEffefrom '@lib 'react';
import { HFeature } from '@schema-form/features';
import { useSetDocumentDetailWithoutVisible, useTableSourceData } from '@schema-form/features/hooks/table-hooks';
import HSearchForm from '@schema-form/features/search-form';
import { RelationUtils } from '../../../../../schema-form/utils/form-utils';
import GeneralInformationOfTask from '../common/general-information-of-task';
import TableWithGridMode from '../common/table-with-grid-mode';
import { DEAL_LOAN_MANAGEMENT_TABS } from '../constants';
import { DealLoanManagementDetail } from './deal-loan-management-detail';

const { TabPane } = Tabs;

const DealLoanManagement = memo(() => {
  const currentUser = useCurrentUser();
	
  return (
    <HTabs type="button">
      <TabPane key={DEAL_LOAN_MANAGEMENT_TABS.SELF.key} tab={DEAL_LOAN_MANAGEMENT_TABS.SELF.tab}>
        <TaskManagement featureId={`general-information-task-${DEAL_LOAN_MANAGEMENT_TABS.SELF.key}`} userId={currentUser.id} />
      </TabPane>
      <TabPane key={DEAL_LOAN_MANAGEMENT_TABS.RELATED.key} tab={DEAL_LOAN_MANAGEMENT_TABS.RELATED.tab}>
        <TaskManagement featureId={`general-information-task-${DEAL_LOAN_MANAGEMENT_TABS.RELATED.key}`} whereCondition={{ userId: { neq: currentUser.id } }} />
      </TabPane>
    </HTabs>
  );
});

export default DealLoanManagement;

interface TaskManagementProps {
  userId?: string;
  featureId?: string;
  whereCondition?: any;
}

const TaskManagement = memo((props: TaskManagementProps) => {
  const { 
    userId, 
    featureId = 'general-information-task-and-deal',
    whereCondition,
  } = props;
  const { t } = useHTranslation('admin-common');
  const whereConditions = { userId, type: TASK_TYPE.counselling, ...whereCondition };
  const tableSchemaDetail = useDealLoanManagementTableDetailSchema(featureId);
  const dataSource = useTableSourceData(featureId);
  const setDocumentDetailWithoutVisible = useSetDocumentDetailWithoutVisible(featureId);

  useEffect(() => {
    setDocumentDetailWithoutVisible(dataSource?.[0] || {});
  }, [dataSource]);

  return (
    <HFeature {...{
      featureId,
      nodeName: 'tasks',
    }}>
      <HSearchForm
        withRelations={[
          RelationUtils.entity('user', RelationUtils.fieldsInUserRelation()),
          RelationUtils.entity('source', RelationUtils.fieldsInUserRelation()),
          RelationUtils.entity('assignee', RelationUtils.fieldsInUserRelation()),
        ]}
        hiddenValues= {{ filter: { where: { ...whereConditions } } }}
        placeholder={t('Enter information about: code, customer, source, staff FINA', { vn: 'Nhập thông tin về: mã, khách hàng, nguồn, nhân viên xử lý' })}
      />
      <TableWithGridMode tableSchemaDetail={() => tableSchemaDetail} >
        <DealLoanManagementDetail />
      </TableWithGridMode>
    </HFeature>
  );
});

const useDealLoanManagementTableDetailSchema = (featureId) => {
  const { t } = useHTranslation('admin-common');
  const setDocumentDetailWithoutVisible = useSetDocumentDetailWithoutVisible(featureId);

  const handleViewDetail = (taskData) => {
    setDocumentDetailWithoutVisible(taskData);
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Profile information'),
      className: classnames('deal-loan-management__short-table'),
      render: taskData => {
        return <GeneralInformationOfTask onClick={() => handleViewDetail(taskData)} taskData={taskData} />;
      },
    }),
  ];
};
