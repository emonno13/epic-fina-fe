import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { STEP } from '../constanst';
import { OtpFormModal } from '../otp-identifier';
import { PersonInformationDetailSchemaForm } from './detail-person-infomation-schema-form';

export const PersonInformationSchemaForm = ({
  setCurrentStep,
  initialValues,
  setInitialValues,
}) => {
  const { t } = useTranslation('admin-common');
  const [form] = useForm();
  const currentUser = useCurrentUser();
  const [showModalOtp, setShowModalOtp] = useState(false);
  if (!initialValues) {
    return null;
  }
  return (
    <div className={'form-person-information'}>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
          method: 'put',
          hiddenValues: { hasVerifyOtp: false, steps: STEP.PERSON_INFORMATION },
          form,
          initialValues,
          resetIfSuccess: false,
          summitButtonStyleFull: true,
          submitButtonLabel: t('Tiếp tục'),
          hideSubmitAndContinueButton: true,
          hideControlButton: true,
          showSuccessMessage: true,
          onGotSuccess: () => {
            setCurrentStep(1);
            setInitialValues({
              ...initialValues,
              emails: form?.getFieldsValue(['emails'])?.emails,
              tels: form?.getFieldsValue(['tels'])?.tels,
              address: form?.getFieldsValue(['address'])?.address,
              bankAccount: form?.getFieldsValue(['banks'])?.banksbanks?.[0]
                ?.bankAccount,
              bankName: form?.getFieldsValue(['banks'])?.banksbanks?.[0]?.name,
            });
          },
          schema: PersonInformationDetailSchemaForm,
        }}
      />
      <Button
        style={{ width: '100%' }}
        type="primary"
        size="large"
        onClick={async () => {
          await form.validateFields();
          form?.submit();
        }}
      >
        {t('Tiếp tục')}
      </Button>
      <OtpFormModal
        {...{
          className: 'form-person-information-otp',
          type: 'Emails',
          showModalOtp: showModalOtp,
          telOrEmail: form?.getFieldsValue(['emails'])?.emails?.[0]?.['email'],
          onGotSuccess: () => {
            form?.submit();
            setShowModalOtp(false);
          },
          handleCancel: () => {
            setShowModalOtp(false);
          },
        }}
      />
    </div>
  );
};
