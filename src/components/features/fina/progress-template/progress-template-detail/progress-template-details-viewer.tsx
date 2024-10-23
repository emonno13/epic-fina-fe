import React from 'react';
import { ProgressTemplateDetailsTableSchema } from './progress-template-details.table-schema';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks/document-detail-hooks';
import { HFeature, HTable } from '../../../../../schema-form/features';
import HSearchForm from '../../../../../schema-form/features/search-form';

export const ProgressTemplateDetailsViewer = ({ searchForm }) => {
  const progressTemplate = useDocumentDetail();
  return (
    <HFeature {...{
      featureId: 'progress-template-details',
      nodeName: 'progress-template-details',
      documentIdName: 'progressTemplateDetailId',
      useQueryParams: false,
      searchForm,
    }}>
      <HSearchForm {...{
        schema: () => [],
        className: 'display-none',
        isSearchForm: false,
        hiddenFields: { progressTemplateId: progressTemplate?.id },
        hiddenValues: {
          filter: {
            order: [
              'order asc',
            ],
          },
        },
        withRelations: ['progress'],
      }}/>
      <HTable {...{
        schema: () => ProgressTemplateDetailsTableSchema(),
        pagination: false,
      }}/>
    </HFeature>
  );
};