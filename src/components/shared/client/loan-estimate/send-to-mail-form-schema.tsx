import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const SendToMailFormSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      name: 'fullName',
      Component: Input,
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Bạn cần nhập họ và tên' }),
        },
        {
          pattern: /^[^\s]+(\s+[^\s]+)*$/,
          message: t('Full name is not valid', { vn: 'Tên không hợp lệ' }),
        },
      ],
      componentProps: {
        placeholder: t('Full name', { vn: 'Họ và tên' }),
      },
    }),
    createSchemaItem({
      name: 'email',
      Component: Input,
      rules: [
        {
          required: true,
          message: t('Email is required', { vn: 'Bạn cần nhập email' }),
        },
        {
          type: 'email',
          message: t('Email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: 'Email',
      },
    }),
    createSchemaItem({
      name: 'phone',
      Component: Input,
      rules: [
        {
          required: true,
          message: t('Phone is required', { vn: 'Bạn cần nhập số điện thoại' }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Phone is not valid', {
            vn: 'Số điện thoại không hợp lệ',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Phone', { vn: 'Số điện thoại' }),
      },
    }),
  ];
};
