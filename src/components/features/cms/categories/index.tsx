import { NewsCategoryDetailSchemaForm } from './detail-schema-form';
import { PositionTableSchema } from './search-result-table-schema';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

const NewsCategoryManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'news-categories',
        nodeName: 'news-categories',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: NewsCategoryDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={PositionTableSchema}/>
    </HFeature>
  );
};

export default NewsCategoryManagement;
