import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const FinaAgentFooterFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'email',
      rules: [
        {
          required: true,
          message: t('Email is required', { vn: 'Xin vui lòng nhập email' }),
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
  ];
};

export const FinaAgentRegisterSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: Input,
      label: t('Full name', { vn: 'Họ và tên' }),
      colProps: { span: 24 },
      name: 'fullName',
      rules: [
        {
          required: true,
          message: t('Full name is required', {
            vn: 'Xin vui lòng nhập họ tên',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter your full name', { vn: 'Nhập họ và tên' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      label: 'Email',
      colProps: { span: 24 },
      name: 'email',
      rules: [
        {
          required: true,
          message: t('Email is required', { vn: 'Xin vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('Your email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter your email', { vn: 'Nhập email' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Phone', { vn: 'Số điện thoại' }),
      colProps: { span: 24 },
      name: 'phone',
      rules: [
        {
          required: true,
          message: t('Phone is required', {
            vn: 'Xin vui lòng nhập số điện thoại',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
        {
          validator: (_, value) =>
            !value.includes(' ')
              ? Promise.resolve()
              : Promise.reject(new Error('Không để dấu cách')),
        },
      ],
      componentProps: {
        normalize: (value, prevVal, prevVals) => value.trim(),
        placeholder: t('Enter your phone', { vn: 'Nhập số điện thoại' }),
      },
    }),
  ];
};
