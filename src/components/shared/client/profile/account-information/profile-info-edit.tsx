import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CloseIconLargeSvg, IconSaveSuccess } from 'icons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProfileInfoEditSchema } from './profile-info-edit-schema';

import './styles.module.scss';

const ProfileInfoEdit = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const { push, locale } = useRouter();
  const [formValue, setFormValue] = useState() as any;
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues]: any = useState();
  const [form] = useForm();

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => {
          const initialValues = {
            ...response,
            fullName: ConverterUtils.getFullNameUser(response),
          };
          setInitialValues(initialValues);
        },
      },
    );
  }, []);

  const redirectToDetailProfile = () =>
    push(`/${locale}/profile/account-management/account-information`);

  const handleSave = async () => {
    try {
      await form.validateFields();
      setFormValue(form.getFieldsValue());
      form?.submit();
      setLoading(true);
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  if (!initialValues) return <></>;

  return (
    <div className="profile-info-edit-wrapper">
      <div className="profile-el-wrapper">
        <div className="profile-info-edit">
          <HForm
            {...{
              endpoint: endpoints.endpointWithApiDomain(
                `/users/${currentUser.id}`,
              ),
              method: 'put',
              form,
              initialValues,
              resetIfSuccess: false,
              schema: ProfileInfoEditSchema,
              hideControlButton: true,
              onGotSuccess: () => {
                const userNew = {
                  ...currentUser,
                  emails: formValue.emails,
                  tels: formValue.tels,
                  fullName:
                    formValue.fullName ||
                    ConverterUtils.getFullNameUser(currentUser),
                  avatar: formValue.avatar ?? currentUser.avatar,
                  idNumber: formValue?.idNumber,
                  identification: { ...formValue?.identification },
                };
                setCurrentUser(userNew);
                Cookies.set('h2user', JSON.stringify(userNew));
                redirectToDetailProfile();
                Modal.success({
                  className: 'profile-info-modal',
                  title: '',
                  width: 390,
                  closeIcon: <CloseIconLargeSvg />,
                  closable: true,
                  content: (
                    <>
                      <IconSaveSuccess />
                      <h2>{t('profile.saveUpdateSuccessfully')}</h2>
                    </>
                  ),
                });

                setLoading(false);
              },
              onDataReadyToSubmit: (userDocument) => {
                const identification = userDocument?.identification || {};
                const {
                  issuedOn,
                  placeOfIssue,
                  frontPhoto,
                  backSidePhoto,
                  portrait,
                } = identification;

                return {
                  ...userDocument,
                  identification: {
                    issuedOn: issuedOn || null,
                    placeOfIssue: placeOfIssue || '',
                    frontPhoto: frontPhoto || null,
                    backSidePhoto: backSidePhoto || null,
                    portrait: portrait || null,
                  },
                };
              },
            }}
          />
        </div>
      </div>

      <div className="profile-information-actions">
        <HButton type="ghost" onClick={redirectToDetailProfile}>
          {t('profile.cancel')}
        </HButton>
        <HButton type="primary" onClick={handleSave} disabled={loading}>
          {t('profile.saveUpdate')}
        </HButton>
      </div>
    </div>
  );
};

export default ProfileInfoEdit;
