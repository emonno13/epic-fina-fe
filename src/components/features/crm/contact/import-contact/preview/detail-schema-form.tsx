import { createHDynamicSchemaFormItems } from '@components/shared//common-form-elements/h-dynamic-form-items';
import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { createSchemaItem } from '@schema-form/h-types';
import { Input, Radio } from 'antd';
import { useTranslation } from 'next-i18next';

export const DetailSchemaForm = () => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'firstName',
      colProps: { span: 4 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'First Name:',
    }),
    createSchemaItem({
      Component: Input,
      name: 'lastName',
      colProps: { span: 4 },
      label: 'Last Name:',
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'birthday',
      colProps: { span: 4 },
      label: 'Year of birth',
      componentProps: {
        style: { width: '100%' },
        placeholder: 'Year of birth',
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'gender',
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Gender',
      componentProps: {
        options: [
          { label: t('Male'), value: 'male' },
          { label: t('Female'), value: 'female' },
          { label: t('Other'), value: 'other' },
        ],
      },
    }),
    createHDynamicSchemaFormItems({
      label: 'Phones',
      name: 'tels',
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 5 },
            name: 'tel',
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
              placeholder: 'Enter the phone number',
            },
          }),
        ],
      },
    }),
    createHDynamicSchemaFormItems({
      label: 'Emails',
      name: 'emails',
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 5 },
            name: 'email',
            componentProps: {
              placeholder: 'Enter the phone number',
            },
          }),
        ],
      },
    }),
    createHDynamicSchemaFormItems({
      label: 'Addresses',
      name: 'addresses',
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 16 },
            name: 'address',
            componentProps: {
              placeholder: 'Enter the phone number',
            },
          }),
        ],
      },
    }),
  ];
};
