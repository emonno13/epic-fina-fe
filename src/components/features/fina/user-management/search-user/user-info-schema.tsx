import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const UserInfoSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      label: t('Customer name', { vn: 'Tên khách hàng' }),
      name: 'fullName',
      Component: Input,
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      label: t('Phone number', { vn: 'Số điện thoại' }),
      name: 'phone',
      Component: Input,
      rules: [
        {
          required: true,
          message: t('Phone is required', {
            vn: 'Vui lòng nhập số điện thoại',
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
        disabled: true,
      },
    }),
    createSchemaItem({
      label: 'Email',
      name: 'email',
      Component: Input,
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      label: t('Customer id', { vn: 'CMT/CCCD' }),
      name: 'identityOrTaxNo',
      Component: Input,
      componentProps: {
        disabled: true,
      },
    }),
  ];
};
