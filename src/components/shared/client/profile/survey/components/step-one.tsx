import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { StepOneSurveySchema } from './step-one-schema';

const StepOneSurvey = (props) => {
  const { form } = props;
  const currentUser: any = useCurrentUser();
  const { t } = useHTranslation('admin-common');
  if (!currentUser) return <></>;

  return (
    <div>
      <HForm
        {...{
          method: 'post',
          form: form,
          hideControlButton: true,
          schema: () => StepOneSurveySchema(),
        }}
      />
    </div>
  );
};

export default StepOneSurvey;
