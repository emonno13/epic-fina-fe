/* eslint-disable @next/next/no-img-element */
import { CloseIconLargeSvg } from '@icons';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth, useCurrentUser } from '@lib/providers/auth';
import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { IconEkycSuccess } from '@icons/rsvgs/ekyc-success';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';

import './styles.module.scss';

const ProfileInfoEkyc = ({ setIsShowEkyc }) => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const [initialValues, setInitialValues]: any = useState();
  const [formValue, setFormValue] = useState<any>();
  const { setCurrentUser } = useAuth();
  const [form] = useForm();
  const { push, locale } = useRouter();

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => {
          const initialValues = { ...response };
          setInitialValues(initialValues);
        },
      },
    );
  }, []);

  const handleSave = async () => {
    try {
      await form.validateFields();
      setFormValue(form.getFieldsValue());
      form?.submit();
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  if (!initialValues) return <></>;

  return (
    <>
      <h2 className="profile-info-modal-ekyc-title">
        {t('profile.verifyAccountInformation')}
      </h2>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
          method: 'put',
          form,
          initialValues,
          resetIfSuccess: false,
          schema: EkycProfileSchema,
          hideControlButton: true,
          onGotSuccess: () => {
            const userNew = {
              ...currentUser,
              idNumber: formValue?.idNumber,
              identification: { ...formValue?.identification },
            };
            setCurrentUser(userNew);
            Cookies.set('h2user', JSON.stringify(userNew));
            setIsShowEkyc(false);
            push(`/${locale}/profile/account-management/account-information`);
            Modal.success({
              className: 'profile-info-modal profile-info-modal-ekyc-success',
              title: '',
              width: 400,
              closeIcon: <CloseIconLargeSvg />,
              closable: true,
              content: (
                <>
                  <IconEkycSuccess />
                  <h2>{t('profile.accountVerificationSuccessful')}</h2>
                </>
              ),
            });
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

      <div className="profile-information-actions">
        <HButton type="primary" onClick={handleSave}>
          {t('profile.accountVerification')}
        </HButton>
      </div>
    </>
  );
};

export default ProfileInfoEkyc;

export const EkycProfileSchema = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  const disabledDate = (current) => {
    return current > moment().subtract('1', 'day').endOf('day');
  };

  return [
    createSchemaLabelItem({
      colProps: { span: 24 },
      componentProps: {
        label: t('profile.paperInformation'),
        className: 'profile-title-primary profile-title-primary-first',
        uppercaseLabel: false,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      rowProps: { gutter: [16, 6] },
      label: 'Số CMND/CCCD',
      rules: [
        {
          required: true,
          message: t('Id Number is required', {
            vn: 'Số CMND/CCCD là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      label: t('Ngày cấp'),
      rules: [
        {
          required: true,
          message: t('Date Range is required', { vn: 'Ngày cấp là bắt buộc' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        disabledDate: disabledDate,
        placeholder: t('Supply date', { vn: 'Nhập ngày cấp' }),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['identification', 'placeOfIssue'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      label: t('placeOfIssue', { vn: 'Nơi cấp' }),
      rules: [
        {
          required: true,
          message: t('Place of issue is required', {
            vn: 'Nơi cấp là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      componentProps: {
        label: t('profile.captureFrontAndBack'),
        className: 'profile-title-primary',
        uppercaseLabel: false,
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'frontPhoto'],
      colProps: { xs: 12, sm: 12, md: 12 },
      rules: [
        {
          required: true,
          message: t('Front photo is required', {
            vn: 'Ảnh mặt trước là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Front photo', { vn: 'Ảnh mặt trước' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-front.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'backSidePhoto'],
      colProps: { xs: 12, sm: 12, md: 12 },
      rules: [
        {
          required: true,
          message: t('Backside photo is required', {
            vn: 'Ảnh mặt sau là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Backside photo', { vn: 'Ảnh mặt sau' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-back.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      rendering: !isMobile,
      componentProps: {
        label: t('profile.takeAPortrait'),
        className: 'profile-title-primary',
        uppercaseLabel: false,
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'portrait'],
      colProps: { xs: 12, sm: 12, md: 12 },
      rules: [
        {
          required: true,
          message: t('Portrait is required', {
            vn: 'Ảnh chân dung là bắt buộc',
          }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        label: t('Portrait', { vn: 'Ảnh chân dung' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/portrait.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
  ];
};

const CustomComponentHUploadImage = (props) => {
  return (
    <div className="profile-info-edit-upload">
      <HUploadImage {...props} />
      <p className="text-center">{props.label}</p>
    </div>
  );
};
