import {
  RequestBackStatusOfTaskFormSchemaDetail,
} from './schemas-detail/request-back-status-of-task.form-schema-detail';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useHTranslation } from '../../../../../lib/i18n';

export const RequestBackStatusOfTaskDetail = () => {
  const { t } = useHTranslation('admin-common');
	
  return (
    <HDocumentDrawerPanel title={t('Request', { vn: 'Yêu cầu ' })}>
      <HFeatureForm {...{
        schema: RequestBackStatusOfTaskFormSchemaDetail,
        hideSubmitAndContinueButton: true,
        onDataReadyToSubmit: document => {
          const { statuses } = document;
          const newRequestObject = { ...document };

          const statusOfTask = statuses.split(' ')?.[0];
          const statusAssignOfTask = statuses.split(' ')?.[1];

          return { ...newRequestObject, statusOfTask, statusAssignOfTask, statuses: undefined };
        },
      }}/>
    </HDocumentDrawerPanel>
  );
};
