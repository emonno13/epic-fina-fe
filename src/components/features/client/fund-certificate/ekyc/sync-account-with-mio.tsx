import { HInput } from '@components/shared/common-form-elements/h-input';
import { InputPhoneNumberSchemaItem } from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { FormInstance } from 'antd';
import { ReactNode } from 'react';

interface SyncAccountWithMioProps {
  callback?: (response?: any) => void;
  setPhone?: (value?: any) => void;
  header?: ReactNode;
  form?: FormInstance;
  disableField?: boolean;
}

export const SyncAccountWithMio = ({
  callback,
  setPhone = () => {},
  header,
  form,
  disableField = false,
}: SyncAccountWithMioProps) => {
  const { t } = useHTranslation('common');
  return (
    <div>
      {header || (
        <h2 className="m-b-20">
          {t('Account sync', { vn: 'Đồng bộ tài khoản' })}
        </h2>
      )}
      <HForm
        {...{
          form,
          method: 'POST',
          summitButtonStyleFull: true,
          schema: FormSchemaSyncAccountWithMio,
          submitButtonClassName: 'm-l-0 w-full',
          onGotSuccess: (response) => {
            if (callback) callback(response);
          },
          submitButtonLabel: t('Continue', { vn: 'Tiếp theo' }),
          endpoint: endpoints.endpointWithApiDomain(
            '/users/sync-existing-account-with-mio',
          ),
          useDefaultMessage: true,
          beforeSubmit: (form) => {
            const phone = form?.getFieldsValue()?.tels?.[0]?.tel;
            setPhone(phone);
            return true;
          },
          transport: {
            disableField,
          },
          hideControlButton: disableField,
        }}
      />
    </div>
  );
};

export default SyncAccountWithMio;

export const FormSchemaSyncAccountWithMio = (props: HFormProps) => {
  const { t } = useHTranslation('common');
  const { transport } = props;
  const disableField = transport.disableField;

  return [
    createSchemaItem({
      Component: HInput,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'CMND/CCCD',
      rules: [
        {
          required: true,
          message: t('Please enter id number', {
            vn: 'Vui lòng nhập số căn cước công dân',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
        disabled: disableField,
      },
    }),
    InputPhoneNumberSchemaItem({
      className: 'm-b-0i',
      componentProps: {
        disabled: disableField,
      },
    }),
  ];
};
