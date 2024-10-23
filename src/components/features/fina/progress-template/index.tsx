import React from 'react';
import { ProductProgressTableSchema } from './progress-template.table-schema';
import { ProductProgressViewer } from './progres-template-viewer';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { useDetailTitleDefault } from '../../../../schema-form/features/hooks/document-detail-hooks';
import { CMUDPanel } from '../../../../schema-form/features/panels/create-model-update-drawer-panel';

export default () => {
  const defaultTitleWithModel = useDetailTitleDefault();
  return (
    <HFeature
      {...{
        featureId: 'progress-template',
        nodeName: 'progress-template',
      }}>
      <HSearchFormWithCreateButton/>
      <CMUDPanel title={defaultTitleWithModel('Product Progress')} width={650}>
        <ProductProgressViewer/>
      </CMUDPanel>
      <HTable schema={ProductProgressTableSchema}/>
    </HFeature>
  );
};

