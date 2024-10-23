import { useHTranslation } from '@lib/i18n';
import { useIsAuthenticated } from '@lib/providers/auth';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { useMobile } from '../hooks/login-drawer-hooks';
import { MOBILE_TASK_TYPE } from './constants';

export const MobileCreateTaskChemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { taskExtraValues } = useMobile();
  const isAuthenticated = useIsAuthenticated();
  const disableCondition =
    isAuthenticated && taskExtraValues?.type === MOBILE_TASK_TYPE.WANT_TO_BUY;

  return [
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'fullName'],
      colProps: { span: 24 },
      label: t('Họ và tên người mua'),
      rules: [
        {
          required: !isAuthenticated,
          message: t('Full name is required', {
            vn: 'Họ và tên bắt buộc',
          }),
        },
      ],
      componentProps: {
        disabled: disableCondition,
        placeholder: t('Người mua'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'email'],
      colProps: { span: 24 },
      label: t('Email'),
      rules: [
        {
          type: 'email',
          required: !isAuthenticated,
          message: t('Email is required'),
        },
      ],
      componentProps: {
        disabled: disableCondition,
        placeholder: t('Email'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['customerInfo', 'tel'],
      colProps: { span: 24 },
      label: t('Tel', { vn: 'Số điện thoại' }),
      rules: [
        {
          required: !isAuthenticated,
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
        disabled: disableCondition,
        placeholder: t('Tel', { vn: 'Số điện thoại' }),
      },
    }),
    // createSchemaItem({
    // 	Component: HSelect,
    // 	name: 'productType',
    // 	colProps: { span: 24 },
    // 	label: t('Product type', {vn: 'Loại sản phẩm'}),
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
    createSchemaItem({
      Component: Input.TextArea,
      name: 'note',
      colProps: { span: 24 },
      label: t('Note', { vn: 'Ghi chú' }),
    }),
  ];
};
