import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { ReasonCloseTaskDetailSchema } from './reason-close-task-detail-schema';
import { ReasonCloseTaskTableSchema } from './reason-close-task-table-schema';

const ReasonCloseTask = () => {
  return (
    <HFeature
      {...{
        featureId: 'reason-close-tasks',
        nodeName: 'reason-close-tasks',
      }}
    >
      <HSearchFormWithCreateButton withRelations={['createdBy']} />
      <HDocumentModalPanel
        destroyOnClose={true}
        hideSubmitAndContinueButton={true}
        width={850}
      >
        <HFeatureForm schema={ReasonCloseTaskDetailSchema} />
      </HDocumentModalPanel>
      <HTable schema={ReasonCloseTaskTableSchema} />
    </HFeature>
  );
};

export default ReasonCloseTask;
