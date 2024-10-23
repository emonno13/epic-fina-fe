import { DocumentCategoryResultTableSchema } from './document-category-result-table-schema';
import { EditForm } from './edit-form';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../schema-form/features';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'documentCategories',
        nodeName: 'document-categories',
      }}
    >
      <HSearchFormWithCreateButton />
      <EditForm />
      <HTable schema={DocumentCategoryResultTableSchema}/>
    </HFeature>
  );
};