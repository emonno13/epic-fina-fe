import React from 'react';
import { Form } from 'antd';
import { AddingProgress } from './adding-progress';
import { ProgressTemplateDetailSchemaForm } from './detail-schema-form';
import { ProgressTemplateDetailsViewer } from './progress-template-detail/progress-template-details-viewer';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';

export const ProductProgressViewer = () => {
  const productProgress = useDocumentDetail();
  const [searchFormProductProgressDetail] = Form.useForm();
  const addingProgress = productProgress?.id ?
    <AddingProgress  {...{ searchForm: searchFormProductProgressDetail }}/> : <span/>;
  const productProgressDetailResult = productProgress?.id ?
    <ProgressTemplateDetailsViewer {...{ searchForm: searchFormProductProgressDetail }}/> : <span/>;
  return (
    <div>
      {addingProgress}
      <HFeatureForm {...{
        schema: ProgressTemplateDetailSchemaForm,
        hideSubmitAndContinueButton: true,
      }}/>
      {productProgressDetailResult}
    </div>
  );
};