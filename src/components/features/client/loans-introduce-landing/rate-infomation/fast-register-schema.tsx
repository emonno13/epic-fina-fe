import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { Input, Select } from 'antd';
import { ArrowDownSmallIcon } from 'icons';
import { useState } from 'react';

const FastRegisterSchema = () => {
  const { t } = useHTranslation('common');
  const [consultingNeeds, setConsultingNeeds] = useState('');

  return [
    createSchemaItem({
      Component: Input,
      label: t('Full name', { vn: 'Họ và tên' }),
      colProps: { span: 24 },
      name: 'customerName',
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
      Component: Select,
      label: 'Bạn muốn nhận tư vấn về ',
      colProps: { span: 24 },
      name: 'consultingNeeds',
      rules: [
        {
          required: true,
          message: t('Consulting needs is required', {
            vn: 'Xin vui lòng nhập nhu cầu tư vấn',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter your consulting needs', {
          vn: 'Nhập nhu cầu tư vấn',
        }),
        onChange: (value) => setConsultingNeeds(value),
        suffixIcon: <ArrowDownSmallIcon />,
        options: [
          { label: 'Học trước trả sau', value: 'Học trước trả sau' },
          { label: 'Tài chính An cư', value: 'Tài chính An cư' },
          { label: 'Sản phẩm Bảo hiểm', value: 'Sản phẩm Bảo hiểm' },
          { label: 'Sản phẩm Thế chấp', value: 'Sản phẩm Thế chấp' },
          { label: 'Sản phẩm Tín chấp', value: 'Sản phẩm Tín chấp' },
          { label: 'Sản phẩm Đầu tư', value: 'Sản phẩm Đầu tư' },
          { label: 'Khác', value: 'other' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      rendering: consultingNeeds === 'other',
      label: t('Other', { vn: 'Khác' }),
      colProps: { span: 24 },
      name: 'other',
      rules: [
        {
          required: true,
          message: t('Please enter information', {
            vn: 'Xin vui lòng nhập thông tin',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter information', { vn: 'Nhập thông tin' }),
      },
    }),
  ];
};

export default FastRegisterSchema;
