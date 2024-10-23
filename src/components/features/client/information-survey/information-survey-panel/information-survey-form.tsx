import { useCurrentUser, useIsAuthenticated } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { ROOT_TASK } from 'constants/crm/task';
import { TASK_PRODUCT_TYPES } from '../../../crm/tasks/utils';
import { InformationSurveyFormSchema } from './form-schema';

export const InformationSurveyForm = (props: HFormProps) => {
  const { onDataReadyToSubmit } = props;
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  return (
    <div className="information-survey-form">
      <HForm
        {...{
          ...props,
          nodeName: 'tasks/public',
          method: 'post',
          schema: InformationSurveyFormSchema,
          showSuccessMessage: false,
          removeControlActions: true,
          onDataReadyToSubmit: (values) => {
            let newValues = { ...values };

            if (onDataReadyToSubmit) {
              newValues = {
                ...newValues,
                ...onDataReadyToSubmit(values),
              };
            }
            if (isAuthenticated) {
              newValues.sourceId = currentUser?.id;
            }
            return {
              ...newValues,
              productType: TASK_PRODUCT_TYPES.loan,
              page: location.href,
              rootTask: ROOT_TASK.WEB,
            };
          },
        }}
      />
    </div>
  );
};
