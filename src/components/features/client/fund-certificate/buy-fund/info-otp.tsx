import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { useMioEkyc } from '../hooks';

interface InfoOtpProps {
  callback?: (response?: any) => void;
  transactionDaftId?: string;
}

export const InfoOtp = ({ callback, transactionDaftId }: InfoOtpProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/me'),
        onGotSuccess: form?.setFieldsValue,
      },
    );
  }, []);

  return (
    <div>
      <h2 className="m-b-20">Xác nhận thông tin</h2>
      <HForm
        {...{
          form,
          onGotSuccess: (response) => {
            if (callback) {
              callback(response);
            }
          },
          schema: FormSchemaInfoOtp,
          onDataReadyToSubmit: (document) => ({
            ...document,
            transactionId: transactionDaftId,
          }),
          transport: { form },
          endpoint: endpoints.endpointWithApiDomain(
            '/transactions-partner-logs/send-otp-buy-fund',
          ),
          method: 'POST',
          summitButtonStyleFull: true,
          submitButtonLabel: 'Tiếp theo',
          submitButtonClassName: 'm-l-0 w-full',
        }}
      />
    </div>
  );
};

export default InfoOtp;

export const FormSchemaInfoOtp = ({ transport }) => {
  const { t } = useHTranslation('common');
  const form = transport?.form;
  const mioEkyc = useMioEkyc();

  useEffect(() => {
    form.setFieldsValue({ phone: mioEkyc?.phone });
  }, [mioEkyc]);

  return [
    createSchemaItem({
      Component: Input,
      colProps: { span: 24 },
      name: 'phone',
      rules: [
        {
          required: true,
          message: t('Phone is required', {
            vn: 'Bắt buộc nhập số điện thoại',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      componentProps: {
        normalize: (value, prevVal, prevVals) => value.trim(),
        disabled: true,
        placeholder: t('Enter the phone number', {
          vn: 'Nhập vào số điện thoại',
        }),
      },
    }),
  ];
};
