import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Cookies from 'js-cookie';
import { ConverterUtils } from 'lib/converter';
import { endpoints } from 'lib/networks/endpoints';
import { useAuth, useCurrentUser } from 'lib/providers/auth';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { requestInformationUser } from 'store/actions';
import { USER_TYPES } from 'types/organization';
import { UserInformationDetailSchemaForm } from './user-information-schema.-form';

import './user-information.module.scss';

export const UserInformation = () => {
  const { t } = useTranslation('admin-common');
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState();
  const [formValue, setFormValue] = useState() as any;
  const { setCurrentUser } = useAuth();

  const handleSave = async () => {
    try {
      await form.validateFields();
      setFormValue(form.getFieldsValue());
      form?.submit();
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          const initialValues = {
            ...response,
            fullName: ConverterUtils.getFullNameUser(response),
          };
          setInitialValues(initialValues);
        },
      }),
    );
  }, []);

  if (!initialValues) {
    return <></>;
  }

  return (
    <div className={'user-information_form user-information_form-content'}>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
          method: 'put',
          form,
          initialValues,
          resetIfSuccess: false,
          schema: UserInformationDetailSchemaForm,
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
            };
            setCurrentUser(userNew);
            Cookies.set('h2user', JSON.stringify(userNew));
          },
          onDataReadyToSubmit: (userDocument) => {
            const identification = userDocument?.identification || {};
            const { issuedOn, placeOfIssue, frontPhoto, backSidePhoto } =
              identification;
            return {
              ...userDocument,
              identification: {
                issuedOn: issuedOn || null,
                placeOfIssue: placeOfIssue || '',
                frontPhoto: frontPhoto || null,
                backSidePhoto: backSidePhoto || null,
              },
            };
          },
          useDefaultMessage: true,
        }}
      />

      <div className="control-btn">
        <Button
          type="primary"
          size="large"
          onClick={handleSave}
          className="save-btn"
        >
          {t('Save')}
        </Button>
        <Button
          type="primary"
          size="large"
          disabled={[USER_TYPES.staff, USER_TYPES.teller].includes(
            currentUser.type,
          )}
          onClick={async () => {
            await handleSave();
            await RouteUtils.redirect('/admin/profiles/contract');
          }}
        >
          {t('Lưu và ký hợp đồng')}
        </Button>
      </div>
    </div>
  );
};
