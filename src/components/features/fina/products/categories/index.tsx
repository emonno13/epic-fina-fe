import { CategoryDetailSchemaFormShort } from './detail-schema-form';
import { CategoriesTableSchema } from './search-result-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'documentTemplates',
        nodeName: 'document-templates',
      }}>
      <HSearchFormWithCreateButton/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: CategoryDetailSchemaFormShort,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>
      <HTable schema={CategoriesTableSchema}/>
    </HFeature>
  );
};