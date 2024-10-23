import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { SettingSchemaForm } from './setting-schema';

import '../styles.module.scss';

const ProfileSettingNotification = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => setInitialValues(response?.settings),
      },
    );
  }, []);

  const handleSubmit = () => form.submit();

  if (!initialValues) {
    return <></>;
  }

  return (
    <div className="profile-setting-notification">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">
          {t('profile.notification')}
        </h2>

        <div className="profile-setting-notification-form">
          <HForm
            {...{
              endpoint: endpoints.endpointWithApiDomain(
                `/config-setting/${currentUser?.id}`,
              ),
              method: 'post',
              resetIfSuccess: false,
              form,
              initialValues,
              hideSubmitAndContinueButton: true,
              hideControlButton: true,
              schema: SettingSchemaForm,
              layout: 'horizontal',
            }}
          />
          <HButton
            type="primary"
            onClick={handleSubmit}
            className="btn-setting-notification"
            block
          >
            {t('profile.settingNotification')}
          </HButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingNotification;
