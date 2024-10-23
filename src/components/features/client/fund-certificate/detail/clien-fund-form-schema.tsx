import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  createSchemaItemWithNewLabel,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const ClientFundFormSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  const defaultSchema = [
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('FUND-NAME', {
        en: 'Full name',
        vn: 'Họ và tên',
      }),
      name: 'fullName',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter fullName', { vn: 'Vui lòng họ và tên' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter full name', { vn: 'Nhập họ và tên' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('FUND-EMAIL', {
        en: 'Email',
        vn: 'Email',
      }),
      name: 'email',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter email', { vn: 'Vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('Your email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter email', { vn: 'Nhập email' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('FUND-PHONE', {
        en: 'phone',
        vn: 'Số điện thoại',
      }),
      name: 'phone',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter phone', {
            vn: 'Vui lòng nhập số điện thoại',
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
        placeholder: t('Enter phone', { vn: 'Nhập số điện thoại' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'note',
      colProps: { span: 24 },
      label: t('Note', { vn: 'Ghi chú' }),
      componentProps: {
        className: 'fund-schema-note-input',
      },
    }),
  ];
  return defaultSchema;
};
