import React from 'react';
import { TaskAssignTableSchema } from './task-assign.table-schema';
import { TaskAssignDetailSchema } from './task-assign.detail-schema';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm from '../../../../schema-form/features/search-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

export const TaskAssignManagement = (props: any) => {
  return (
    <HFeature
      {...{
        featureId: 'task-assigns',
        nodeName: 'task-assigns',
        documentIdName: 'taskAssignDocument',
      }}>
      <HSearchForm {...{ withRelations: ['user', 'task'] }}/>
      <HDocumentModalPanel {...{ width: '30%', hideSubmitAndContinueButton: true }}>
        <HFeatureForm {...{
          schema: TaskAssignDetailSchema,
          initialValue: { status: 'confirmed' },
          onDataReadyToSubmit: (document) => {
            return { status: 'confirmed' };
          },
        }}/>
      </HDocumentModalPanel>
      <HTable schema={TaskAssignTableSchema}/>
    </HFeature>
  );
};

export default TaskAssignManagement;
