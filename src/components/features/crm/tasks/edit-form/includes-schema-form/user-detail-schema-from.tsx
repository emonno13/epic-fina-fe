import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Radio } from 'antd';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import {
  getOrganizationTypeOptions,
  getUserTypeOptions,
  ORGANIZATION_TYPES,
  USER_TYPES,
} from '../../../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../../../shared/common-form-elements/select';

export const UserDetailShortSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'fullName',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 24 } },
      label: t('Full name', { vn: 'Họ và tên' }),
      rules: [{ required: true, message: 'Full name is required' }],
      className: 'capitalize',
      componentProps: {
        placeholder: t('Enter the full name', { vn: 'Nguyễn Trần Văn Anh' }),
      },
    }),
    ...telsDynamicSchemaForm(props, false),
    ...emailsDynamicSchemaForm(props, false),
  ];
};

export const UserDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const [typeOrg, setTypeOrg] = useState(ORGANIZATION_TYPES.SUB_ORG);
  return [
    createSchemaItem({
      Component: Radio.Group,
      label: t('Type Organization'),
      colProps: { span: 24 },
      name: 'typeOrg',
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        optionType: 'button',
        defaultValue: ORGANIZATION_TYPES.SUB_ORG,
        options: getOrganizationTypeOptions(t),
        onChange: (document) => {
          setTypeOrg(document.target.value);
        },
      },
    }),
    createOrganizationSuggestionElement(
      {
        name: 'orgId',
        label: 'Organization',
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        componentProps: {
          searchWhenHidenValueChange: true,
        },
      },
      { type: typeOrg },
    ),
    createSchemaItem({
      Component: HSelect,
      label: 'User Type',
      colProps: { span: 12 },
      name: 'type',
      rules: [
        {
          message: 'User type is required',
        },
      ],
      componentProps: {
        placeholder: 'Select a user type',
        defaultValue: USER_TYPES.customer,
        options: getUserTypeOptions(t),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'fullName',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 24 } },
      label: t('Full name', { vn: 'Họ và tên' }),
      rules: [{ required: true, message: 'Full name is required' }],
      className: 'capitalize',
      componentProps: {
        placeholder: t('Enter the full name', { vn: 'Nguyễn Trần Văn Anh' }),
      },
    }),
    ...telsDynamicSchemaForm(props),
    ...emailsDynamicSchemaForm(props),
  ];
};

export const telsDynamicSchemaForm = (props: HFormProps, isRequired = true) => [
  createHDynamicSchemaFormItems({
    label: 'Phones',
    name: 'tels',
    required: true,
    componentProps: {
      schemaItems: [
        createSchemaItem({
          Component: Input,
          colProps: { span: 12 },
          name: 'tel',
          rules: [
            { required: true, message: 'Phone is required' },
            {
              pattern: /^0[0-9]{9}$/gm,
              message: 'Không đúng định dạng số điện thoại',
            },
            {
              validator: (_, value) =>
                !value.includes(' ')
                  ? Promise.resolve()
                  : Promise.reject(new Error('Không để dấu cách')),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const tels: any[] = getFieldValue('tels');
                const telsDuplicate = tels.filter(
                  (item) => item?.tel === value,
                );
                if (!!telsDuplicate && telsDuplicate.length > 1) {
                  return Promise.reject(`Phone number ${value} is duplicate!`);
                }
                return Promise.resolve();
              },
            }),
          ],
          componentProps: {
            normalize: (value, prevVal, prevVals) => value.trim(),
            placeholder: 'Enter the phone number',
          },
        }),
      ],
    },
  }),
];

export const emailsDynamicSchemaForm = (
  props: HFormProps,
  isRequired = true,
) => [
  createHDynamicSchemaFormItems({
    label: 'Emails',
    name: 'emails',
    required: true,
    componentProps: {
      schemaItems: [
        createSchemaItem({
          Component: Input,
          colProps: { span: 12 },
          name: 'email',
          rules: [
            {
              required: true,
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const emails: any[] = getFieldValue('emails');
                const emailsDuplicate = emails.filter(
                  (item) => item?.email === value,
                );
                if (!!emailsDuplicate && emailsDuplicate.length > 1) {
                  return Promise.reject(`Email ${value} is duplicate!`);
                }
                return Promise.resolve();
              },
            }),
          ],
          componentProps: {
            placeholder: 'Enter the phone number',
          },
        }),
      ],
    },
  }),
];
