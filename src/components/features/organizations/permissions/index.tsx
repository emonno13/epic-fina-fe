import { DetailSchemaForm } from './detail-schema-form';
import { PermissionTableSchema } from './search-result-table-schema';
import HSearchForm from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels/drawer';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

const PermissionManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'permission',
        nodeName: 'permissions',
      }}>
      <HSearchForm />
      <HDocumentDrawerPanel>
        <HFeatureForm {...{
          schema: DetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentDrawerPanel>
      <HTable schema={PermissionTableSchema}/>
    </HFeature>
  );
};

export default PermissionManagement;
