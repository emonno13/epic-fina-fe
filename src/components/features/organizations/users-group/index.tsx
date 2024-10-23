import React from 'react';
import { UsersGroupTableSchema } from './users-group.table-schema';
import { UsersGroupDetailSchema } from './users-group.detail-schema';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

export const UsersGroupManagement = () => {

  return (
    <HFeature
      {...{
        featureId: 'users-group',
        nodeName: 'user-groups',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentModalPanel {...{ width: '60%' }}>
        <HFeatureForm {...{
          schema: UsersGroupDetailSchema,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={UsersGroupTableSchema}/>
    </HFeature>
  );
};

export default UsersGroupManagement;
