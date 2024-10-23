import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { createSchemaItem } from '@schema-form/h-types';
import { Input } from 'antd';
import { useTranslation } from 'next-i18next';

export const DetailSchemaForm = () => {
  const { t } = useTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      rowProps: { gutter: { xs: 8, md: 16 } },
      name: 'name',
      colProps: { span: 8 },
      label: 'Name:',
      rules: [
        {
          required: true,
          message: t('Name is required', {
            vn: 'Xin vui lòng nhập họ và tên',
          }),
        },
      ],
    }),
    createSchemaItem({
      Component: Input,
      name: 'lastName',
      colProps: { span: 8 },
      label: 'Last Name:',
    }),
    createSchemaItem({
      Component: Input,
      name: 'firstName',
      colProps: { span: 8 },
      label: 'First Name:',
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'First Phone Number',
      name: 'mobile1',
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
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Second Phone Number',
      name: 'mobile2',
      rules: [
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
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Other Phone Number',
      name: 'mobileOther',
      rules: [
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
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Email',
      name: 'email1',
      componentProps: {
        placeholder: 'Enter the email',
      },
      rules: [
        {
          required: true,
          message: t('Email is required', {
            vn: 'Xin vui lòng nhập email',
          }),
        },
      ],
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Email 02',
      name: 'email2',
      componentProps: {
        placeholder: 'Enter the email 02',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Other Email',
      name: 'emailOther',
      componentProps: {
        placeholder: 'Enter the email 03',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Role',
      name: 'role',
      componentProps: {
        placeholder: 'Enter your role',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Address Country',
      name: 'addressCountry',
      componentProps: {
        placeholder: 'Enter your address country',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'State',
      name: 'state',
      componentProps: {
        placeholder: 'Enter your state',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'City',
      name: 'city',
      componentProps: {
        placeholder: 'Enter your city',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Street',
      name: 'street',
      componentProps: {
        placeholder: 'Enter your street',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Industry',
      name: 'industry',
      componentProps: {
        placeholder: 'Enter your industry',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Company',
      name: 'company',
      componentProps: {
        placeholder: 'Enter your company',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Department',
      name: 'department',
      componentProps: {
        placeholder: 'Enter your department',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Title',
      name: 'title',
      componentProps: {
        placeholder: 'Enter your title',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'birthday',
      colProps: { span: 8 },
      label: 'Year of birth',
      componentProps: {
        style: { width: '100%' },
        placeholder: 'Year of birth',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Personal ID Number',
      name: 'personalIdNumber',
      componentProps: {
        placeholder: 'Enter your Personal ID Number',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'personalIdIssueDate',
      colProps: { span: 8 },
      label: 'Personal ID Issue Date',
      componentProps: {
        style: { width: '100%' },
        placeholder: 'Enter your Personal ID Issue Date',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Transacted Products',
      name: 'transactedProducts',
      componentProps: {
        placeholder: 'Enter your Transacted Products',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Project Name',
      name: 'projectName',
      componentProps: {
        placeholder: 'Enter your Project Name',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Supplier Name',
      name: 'supplierName',
      componentProps: {
        placeholder: 'Enter your Supplier Name',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Lead Lifecycle Stage',
      name: 'leadLifecycleStage',
      componentProps: {
        placeholder: 'Enter your Lead Lifecycle Stage',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Data Source 1',
      name: 'dataSource1',
      componentProps: {
        placeholder: 'Enter your Data Source 1',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Data Source 2',
      name: 'dataSource2',
      componentProps: {
        placeholder: 'Enter your Data Source 2',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Tag 1',
      name: 'tag1',
      componentProps: {
        placeholder: 'Enter your Tag 1',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Tag 2',
      name: 'tag2',
      componentProps: {
        placeholder: 'Enter your Tag 2',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Tag 3',
      name: 'tag3',
      componentProps: {
        placeholder: 'Enter your Tag 3',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Tag 4',
      name: 'tag4',
      componentProps: {
        placeholder: 'Enter your Tag 4',
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 8 },
      label: 'Tag 5',
      name: 'tag5',
      componentProps: {
        placeholder: 'Enter your Tag 5',
      },
    }),
    // ///////
  ];
};
