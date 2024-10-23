import React, { useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { useTranslation } from 'react-i18next';
import { Button, message } from 'antd';
import { ViewCardManager } from './view-card-manager';
import { HForm } from '../../../../../schema-form/h-form';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { STEP } from '../constanst';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { RouteUtils } from '../../../../shared/layout/router-contaner/utils';
import { USER_TYPES } from '../../../crm/tasks/constans';
import { OtpFormModal } from '../otp-identifier';

import '../../profiles.module.scss';

export const CardForm = ({ currentStep, setCurrentStep, initialValues }) => {
  const [form] = useForm();
  const currentUser = useCurrentUser();
  const { t } = useTranslation('admin-common');
  const [showModalOtp, setShowModalOtp] = useState(false);
  return (
    <div className={'form-person-information'}>
      <HForm {...{
        endpoint: endpoints.endpointWithApiDomain(`/users/sign-collaborator-contract/${currentUser.id}`),
        method: 'put',
        hiddenValues: { hasVerifyOtp: false, steps: STEP.CONTRACT },
        form,
        transport: {
          currentStep,
        },
        initialValues,
        summitButtonStyleFull: true,
        hideSubmitAndContinueButton: true,
        hideControlButton: true,
        showSuccessMessage: false,
        onDataReadyToSubmit: (document) => {
          document['identification'] = { ...document?.identification, idNumber: document.idNumber };
          return document;
        },
        onGotSuccess: () => {
          const content = 'Chúc mừng Quý khách đã ký hợp đồng CTV thành công. ' +
            'FINA sẽ gửi Bảo hiểm sức khỏe trị giá 50 triệu và Tài khoản ngân hàng số đẹp đến bạn qua email trong thời gian sớm nhất';
          const hide = message.success({
            content: <>
              <p>{content}</p>
              <Button onClick={async () => {
                await RouteUtils.redirect('/admin/profiles/contract');
              }}> Xem hợp đồng</Button></>,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });
          setTimeout(hide, 10000);
          setTimeout(async () => {
            await RouteUtils.redirect('/admin/profiles/contract');
          }, 10000);
        },
        schema: (props) => [
          createSchemaItem({
            Component: ViewCardManager,
            componentProps: { props, form, initialValues },
          })],
      }}
      />
      <OtpFormModal {...{
        className: 'form-person-information-otp',
        type: 'Tels',
        showModalOtp: showModalOtp,
        telOrEmail: initialValues?.tels?.[0]?.['tel'],
        onGotSuccess: () => {
          form?.submit();
          setShowModalOtp(false);
        },
        handleCancel: () => {
          setShowModalOtp(false);
        },
      }}/>

      <div className="flex">
        <Button 
          className={'flex-grow m-r-5'} 
          style={{ width: '48%' }} 
          danger 
          size="large"
          onClick={() => setCurrentStep(--currentStep)}
        >{t('Quay lại')}</Button>

        {currentStep === 1 && <Button 
          style={{ width: '48%' }} 
          type="primary" 
          size="large"
				  onClick={async () => {
				    await form.validateFields();
				    setCurrentStep(2);
				  }}
        >{t('Bước cuối: Hợp đồng CTV')}</Button>}

        {currentStep === 2 && <Button 
          style={{ width: '48%' }} 
          type="primary" 
          size="large"
				  disabled ={[USER_TYPES.staff, USER_TYPES.teller].includes(currentUser.type)}
				  onClick={async () => {
				    await form.validateFields();
				    form?.submit();
				  }}
        >{t('Tiếp tục')}</Button>}
      </div>
    </div>
  );
};
