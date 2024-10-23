import React, { FC, ReactElement } from 'react';
import { ConfigurationsPropertiesTableSchema } from './configurations-properties..table-chema';
import { ConfigurationPropertiesDetailSchema } from './configurations-properties-detail-schema';
import HSearchForm from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels/drawer';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { endpoints } from '../../../../lib/networks/endpoints';

const ConfigurationPropertiesManagement: FC = (props: any): ReactElement => {
  return (
    <div>
      <HFeature
        {...{
          featureId: 'configuration-properties',
          nodeName: 'configurations',
        }}>
        <HSearchForm {...{
          endpoint: endpoints.endpointWithApiDomain('/systems/envs/properties'),
        }}/>
        <HDocumentDrawerPanel {...{
          destroyOnClose: true,
          hideSubmitAndContinueButton: true,
        }}>
          <HFeatureForm {...{
            schema: ConfigurationPropertiesDetailSchema,
            hideSubmitAndContinueButton: true,
          }}/>
        </HDocumentDrawerPanel>
        <HTable schema={ConfigurationsPropertiesTableSchema}/>
      </HFeature>
    </div>
  );
};
export default ConfigurationPropertiesManagement;
