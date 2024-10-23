import { NewsModuleDetailSchemaForm } from './detail-schema-form';
import { NewsModuleTableSchema } from './search-result-table-schema';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';

const NewsModulesManagement = (props) => {

  return (
    <HFeature
      {...{
        featureId: 'news-modules',
        nodeName: 'news-modules',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentDrawerPanel>
        <HFeatureForm {...{
          schema: NewsModuleDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentDrawerPanel>
      <HTable schema={NewsModuleTableSchema}/>
    </HFeature>
  );
};

export default NewsModulesManagement;
