import { DocumentCategoryEditFormSchema } from './document-category-edit-form-schema';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';


export const EditForm = (props) => {
  return (
    <HDocumentModalPanel destroyOnClose={true} width={500}>
      <HFeatureForm {...{
        schema: DocumentCategoryEditFormSchema,
        hideSubmitAndContinueButton: true,
      }}/>
    </HDocumentModalPanel>
  );
};

