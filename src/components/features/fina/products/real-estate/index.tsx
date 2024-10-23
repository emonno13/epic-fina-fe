import { RealEstateDetailSchemaForm } from './view-detail-schema-form';
import { RealEstateProductTableSchema } from './search-result-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { PRODUCT_TYPE } from '../utils';

export default () => {
  const modelFilters = {
    filter: { where: { type: PRODUCT_TYPE.REAL_ESTATE } },
  };
  return (
    <HFeature
      {...{
        featureId: 'productRealEstate',
        nodeName: 'products',
      }}>
      <HSearchFormWithCreateButton withRelations={['org', 'category', 'project']} hiddenValues={modelFilters}/>
      <HDocumentDrawerPanel>
        <HFeatureForm {...{
          hiddenValues: { type: PRODUCT_TYPE.REAL_ESTATE },
          schema: RealEstateDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentDrawerPanel>
      <HTable schema={RealEstateProductTableSchema}/>
    </HFeature>
  );
};