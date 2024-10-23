import { DocumentEditFormSchema } from './document-edit-form-schema';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
const initialValues = {
  isRequired: true,
};

export const EditForm = (props) => {
  return (
    <HDocumentModalPanel destroyOnClose={true} width={550}>
      <HFeatureForm {...{
        initialValues,
        schema: DocumentEditFormSchema,
        hideSubmitAndContinueButton: true,
      }}/>
    </HDocumentModalPanel>
  );
};

