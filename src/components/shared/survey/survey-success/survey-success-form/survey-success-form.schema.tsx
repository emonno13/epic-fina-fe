import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';

export const SurveySuccessFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'fullName'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Họ và tên'),
      rules: [
        {
          required: true,
          message: t('Full name is required', {
            vn: 'Họ và tên bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Người mua'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'email'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: 'Email',
      rules: [
        {
          type: 'email',
          required: true,
          message: t('Email is required'),
        },
      ],
      componentProps: {
        placeholder: t('Email'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'tel'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Tel', { vn: 'Số điện thoại' }),
      rules: [
        {
          required: true,
          message: t('Tel is required'),
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
        placeholder: t('Tel', { vn: 'Số điện thoại' }),
      },
    }),
    // createSchemaItem({
    // 	Component: HSelect,
    // 	name: 'productType',
    // 	colProps: { xs: 24, sm: 24, md: 6 },
    // 	label: t('Product type'),
    // 	rules: [
    // 		{
    // 			required: true,
    // 			message: t('Product type is required'),
    // 		},
    // 	],
    // 	componentProps: {
    // 		options: PRODUCT_TYPES_OPTIONS,
    // 	},
    // }),
  ];
};
