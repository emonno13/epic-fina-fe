import { Input, InputNumber, Radio } from 'antd';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { LOAN_PRODUCT_SERVICE_CLASSIFICATION } from '../../utils';

export const ProductDetailInformationLoan = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const info = 'info';
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Maximum loan'),
        titleTooltip: t('Maximum loan'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'maxRate'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Maximum loan rate (%)'),
      componentProps: {
        placeholder: t('', {
          en: 'Enter the maximum loan rate',
          vn: 'Nhập lãi suất cho vay tối đa',
        }),
        style: { width: '100%' },
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'maxTime'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Maximum loan period (year)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('', {
          en: 'Enter the maximum loan period',
          vn: 'Nhập thời gian cho vay tối đa',
        }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'maxMoney'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Maximum loan amount (đ)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('', {
          en: 'Enter the maximum loan amount',
          vn: 'Nhập số tiền vay tối đa',
        }),
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Minimum loan'),
        titleTooltip: t('Minimum loan'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'minTime'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Minimum loan period (month)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('', {
          en: 'Enter the minimum loan period',
          vn: 'Nhập thời gian cho vay tối thiểu',
        }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'minMoney'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Minimum loan amount (đ)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('', {
          en: 'Enter the Minimum loan amount',
          vn: 'Nhập số tiền vay tối thiểu',
        }),
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Types of service fees'),
        titleTooltip: t('Types of service fees'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [info, 'earlyRepaymentFee'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Early repayment fee'),
      componentProps: {
        placeholder: t('', {
          en: 'Enter Early repayment fee',
          vn: 'Nhập Phí trả nợ trước hạn',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [info, 'otherFees'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Other fees'),
      componentProps: {
        placeholder: t('', {
          en: 'Enter the other fees',
          vn: 'Nhập các khoản phí khác',
        }),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Service classification'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: [info, 'typeService'],
      componentProps: {
        options: [
          {
            label: t('Basic'),
            value: LOAN_PRODUCT_SERVICE_CLASSIFICATION.BASIC,
          },
          {
            label: t('Advanced'),
            value: LOAN_PRODUCT_SERVICE_CLASSIFICATION.ADVANCED,
          },
          {
            label: t('Other'),
            value: LOAN_PRODUCT_SERVICE_CLASSIFICATION.OTHER,
          },
        ],
      },
    }),
  ];
};
