import { PositionDetailSchemaForm } from './detail-schema-form';
import { PositionTableSchema } from './search-result-table-schema';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

const PositionManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'position',
        nodeName: 'positions',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: PositionDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={PositionTableSchema}/>
    </HFeature>
  );
};

export default PositionManagement;
