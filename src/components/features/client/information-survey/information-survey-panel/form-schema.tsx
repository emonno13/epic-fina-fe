import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const InformationSurveyFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: Input,
      label: t('Full name', { vn: 'Họ và tên' }),
      componentProps: {
        placeholder: t('Full name', { vn: 'Họ và tên' }),
      },
      name: 'customerName',
      rules: [
        {
          required: true,
          message: t('Full name is required!', { vn: 'Cần nhập họ và tên!' }),
        },
      ],
    }),
    createSchemaItem({
      Component: Input,
      label: t('Phone number', { vn: 'Số điện thoại' }),
      componentProps: {
        normalize: (value, prevVal, prevVals) => value.trim(),
        placeholder: t('Phone number', { vn: 'Số điện thoại' }),
      },
      name: 'phone',
      rules: [
        {
          required: true,
          message: t('Phone number is required!', {
            vn: 'Cần nhập số điện thoại!',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Phone is not valid!', {
            vn: 'Số điện thoại không hợp lệ!',
          }),
        },
        {
          validator: (_, value) =>
            !value.includes(' ')
              ? Promise.resolve()
              : Promise.reject(new Error('Không để dấu cách')),
        },
      ],
    }),
    createSchemaItem({
      Component: Input,
      label: 'Email',
      componentProps: {
        placeholder: 'Email',
      },
      name: 'email',
      rules: [
        {
          type: 'email',
          message: t('Email is not valid!', { vn: 'Email không hợp lệ!' }),
        },
      ],
    }),
    createSchemaItem({
      Component: Input.TextArea,
      label: t('Note', { vn: 'Ghi chú' }),
      name: 'note',
      componentProps: {
        placeholder: t('Note', { vn: 'Ghi chú' }),
      },
    }),
  ];
};
