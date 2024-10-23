import { Input, Switch } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { CreateSchemaItemTabIVRHotline } from '../common';

export const HotlineDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: Switch,
      name: 'enableIvr',
      colProps: { span: 24 },
      label: t('Enable IVR', { vn: 'Bật IVR' }),
      valuePropName: 'checked',
    }),
    createSchemaItem({
      Component: Input,
      name: 'hotline',
      colProps: { span: 24 },
      label: t('Hotline number', { vn: 'Số hotline' }),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            t('Hotline number', { vn: 'Số hotline' }),
          ),
        },
      ],
      componentProps: {
        placeholder: t('Hotline number', { vn: 'Số hotline' }),
      },
    }),
    createSchemaItem({
      Component: CreateSchemaItemTabIVRHotline,
      name: 'typeIVr',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            t('Hotline number', { vn: 'Số hotline' }),
          ),
        },
      ],
      componentProps: {
        placeholder: t('Hotline number', { vn: 'Số hotline' }),
        type: 'card',
      },
    }),
  ];
};
