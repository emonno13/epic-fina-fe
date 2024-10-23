import { RecruitJobEditSchema } from './recruit-job-edit-schema';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

interface Props {
  document?: any
}

export const CreateAndEditJob = ({ document }: Props) => {
  return (
    <HDocumentModalPanel>
      <HFeatureForm {...{
        schema: RecruitJobEditSchema,
        documentDetail: document,
      }}>
      </HFeatureForm>
    </HDocumentModalPanel>
  );
};
