import { Form } from 'antd';
import { useEffect } from 'react';

import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormHiddenAble } from '../../../../../schema-form/features/search-form';
import { DashboardTaskTrackingTableSchema } from './dashboard-task-tracking-table-schema';

export const DashboardTaskTracking = ({
  hiddenValues,
  featureId = '',
  ...props
}) => {
  const [searchForm] = Form.useForm();

  // Reason why we are using this one, because of when we switch tab, the form is not auto submit
  useEffect(() => {
    searchForm.submit();
  }, [featureId]);

  return (
    <HFeature
      {...{
        featureId: featureId || 'tasksTracking',
        nodeName: 'tasks',
        documentIdName: 'tasksTrackingId',
        useQueryParams: false,
        searchForm,
      }}
    >
      <HSearchFormHiddenAble
        withRelations={['assignee', 'user']}
        resetIfSuccess={false}
        layout="horizontal"
        hiddenFields={hiddenValues}
      />
      <HTable
        schema={() => DashboardTaskTrackingTableSchema({ featureId })}
        pagination={{ filter: { limit: 5 } }}
      />
    </HFeature>
  );
};
