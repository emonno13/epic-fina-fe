import { GroupTableSchema } from './search-result-table-schema';
import { GroupDetailSchemaForm } from './detail-schema-form';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

const GroupManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'group',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: GroupDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={GroupTableSchema}/>
    </HFeature>
  );
};

export default GroupManagement;
