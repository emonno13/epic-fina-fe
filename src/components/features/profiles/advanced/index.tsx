import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { requestInformationUser } from 'store/actions';
import { AdvancedInformationDetailSchemaForm } from './advanced-schem-form';

export const AdvancedInformation = (props) => {
  const { t } = useTranslation('admin-common');
  const currentUser = useCurrentUser();
  const user = props?.documentDetail || currentUser;
  const dispatch = useDispatch();
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState();
  const addonBefore = 'https://t.me/';
  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: user.id,
        callback: (response) => {
          setInitialValues(response);
        },
      }),
    );
  }, []);

  const handleSave = async () => {
    try {
      const user = await form.validateFields();
      const { advancedInformation = {} } = user;
      const usernameTelegram = advancedInformation?.linkTelegram;
      const isUrl = usernameTelegram && usernameTelegram.includes('http');
      const url = usernameTelegram
        ? `${addonBefore}${usernameTelegram}`
        : usernameTelegram;

      form.setFieldsValue({
        ...user,
        advancedInformation: {
          ...advancedInformation,
          linkTelegram: isUrl ? usernameTelegram : url,
        },
      });
      form?.submit();
    } catch (err) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  if (!initialValues) {
    return <></>;
  }
  return (
    <div className={'user-information_form'}>
      <div className={'user-information_form-content'}>
        <HForm
          {...{
            endpoint: endpoints.endpointWithApiDomain(`/users/${user.id}`),
            method: 'put',
            form,
            initialValues,
            resetIfSuccess: false,
            summitButtonStyleFull: true,
            submitButtonLabel: t('Tiếp tục'),
            hideSubmitAndContinueButton: true,
            hideControlButton: true,
            schema: AdvancedInformationDetailSchemaForm,
            useDefaultMessage: true,
          }}
        />
        <Button
          style={{ width: '100%' }}
          type="primary"
          size="large"
          onClick={handleSave}
        >
          {t('Save')}
        </Button>
      </div>
    </div>
  );
};
