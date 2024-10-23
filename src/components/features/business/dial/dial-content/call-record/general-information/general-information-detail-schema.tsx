import moment from 'moment';

import { useGenerateConcealContent } from '@lib/converter';
import { createSchemaItem } from '@schema-form/h-types';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';
import { HInput } from '../../../../../../shared/common-form-elements/h-input';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import { GENDER_OPTIONS, TYPES_OPTIONS } from '../constants';

export const GeneralInformationSchemaForm = (props: any) => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: ({ value }) => {
        const generateConcealContent = useGenerateConcealContent(value);
        return generateConcealContent();
      },
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('SĐT gọi đến'),
      name: ['tels', 0, 'tel'],
    }),
    createSchemaItem({
      Component: ({ value }) => {
        const generateConcealContent = useGenerateConcealContent(
          value,
          '****',
          (`${value}`.length || 4) - 4,
        );
        return generateConcealContent();
      },
      colProps: { span: 12 },
      name: ['emails', 0, 'email'],
      label: 'Email:',
    }),
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 12 },
      label: 'Họ tên:',
      componentProps: {
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'Phân loại',
      name: 'type',
      colProps: { span: 12 },
      componentProps: {
        modernLabel: true,
        options: TYPES_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'Giới tính',
      name: 'gender',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 12 },
      componentProps: {
        modernLabel: true,
        optionValues: GENDER_OPTIONS,
        optionsConverter: (document) => {
          return {
            ...document,
            label: t(`${document.gender}`),
          };
        },
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'yearOfBirth',
      colProps: { span: 12 },
      label: t('Year of birth', { vn: 'Ngày sinh' }),
      rules: [
        {
          validator(rule, value) {
            if (value && value > moment().subtract('1', 'day').endOf('day')) {
              return Promise.reject(
                t('Birthday', { vn: 'Ngày sinh không hợp lệ' }),
              );
            }
            return Promise.resolve();
          },
        },
      ],
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
        showToday: false,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'address',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: 'Đ/c thường trú',
      componentProps: {
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'idNumber',
      colProps: { span: 12 },
      label: 'CMND/CCCD',
      componentProps: {
        modernLabel: true,
      },
    }),
  ];
};
