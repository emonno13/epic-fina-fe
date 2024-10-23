import React from 'react';
import { VehiclesDetailSchemaForm } from './detail-schema-form';
import { PositionTableSchema } from './search-result-table-schema';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'vehicles',
        nodeName: 'vehicles',
      }}>
      <HSearchFormWithCreateButton withRelations={['org', 'vehicleCategory', 'vehicleType']}/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: VehiclesDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={PositionTableSchema}/>
    </HFeature>
  );
};

