import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { HUploadImages } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { InputNumber } from 'antd';
import { useTranslation } from 'next-i18next';
import { HSubForm } from '../../../../../../schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { HInput } from '../../../../../shared/common-form-elements/h-input';
import {
  ConditionsOfPurchase,
  TYPE_OF_PROFIT,
  TypeOfProfit,
} from '../constant';

export const PriceAndDateSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const info = 'info';
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('product.priceAndDate'),
        titleTooltip: t('product.priceAndDate'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'parValueShares'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('product.parValueShares'),
      rules: [
        {
          required: true,
          message: t('product.parValueSharesIsRequired'),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        placeholder: t('product.parValueShares'),
        min: 0,
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'totalReleaseVolume'],
      colProps: { span: 12 },
      label: t('product.totalReleaseVolume'),
      rules: [
        {
          required: true,
          message: t('Nhập khổi lượng phát hành', {
            en: 'Enter release volume',
          }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        placeholder: t('product.totalReleaseVolume'),
        min: 0,
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'maximumPurchaseVolume'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('product.maximumPurchaseVolume'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('product.maximumPurchaseVolume'),
        min: 0,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      // className: 'm-b-0',
      name: [info, 'typeOfProfit'],
      label: t('product.typeOfProfit'),
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t(''),
        },
      ],
      componentProps: {
        allowClear: false,
        optionValues: TypeOfProfit(t),
        placeholder: t('product.typeOfProfit'),
      },
    }),
    createSchemaItem({
      Component: InterestPeriod,
      label: '',
      colProps: { xs: 24, sm: 24, md: 12 },
      name: [info, 'typeOfProfit'],
    }),
    createSchemaItem({
      Component: InputNumber,
      name: ['info', 'bondMaturity'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Kỳ hạn trái phiếu (tháng)'),
      rules: [{ required: true, message: t('Kỳ hạn trái phiếu là bắt buộc') }],
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Kỳ hạn trái phiếu'),
        min: 0,
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('product.interestRate'),
      name: [info, 'interestRate'],
      required: true,
      rules: [
        {
          required: true,
          message: t('product.interestRateIsRequired'),
        },
      ],
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: InputNumber,
            colProps: { span: 8 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            name: 'time',
            required: true,
            rules: [
              {
                required: true,
                message: t('Nhập thời gian'),
              },
            ],
            componentProps: {
              style: { width: '100%' },
              placeholder: t('product.time'),
              min: 0,
            },
          }),
          createSchemaItem({
            Component: InputNumber,
            name: 'rate',
            colProps: { span: 8 },
            required: true,
            rules: [
              {
                required: true,
                message: t('Nhập lãi suất', { vn: 'Enter the Interest' }),
              },
            ],
            componentProps: {
              style: { width: '100%' },
              placeholder: t('product.rate'),
              min: 0,
            },
          }),
        ],
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('product.otherInformation'),
        titleTooltip: t('product.otherInformation'),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: [info, 'tax'],
      colProps: { span: 12 },
      label: t('product.tax'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('product.tax'),
        min: 0,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      // className: 'm-b-0',
      name: [info, 'conditionsOfPurchase'],
      colProps: { span: 12 },
      label: t('product.conditionsOfPurchase'),
      componentProps: {
        allowClear: false,
        placeholder: t('product.conditionsOfPurchase'),
        optionValues: ConditionsOfPurchase(t),
      },
    }),
    createSchemaItem({
      Component: HUploadImages,
      name: [info, 'document'],
      label: t('product.legalInformation'),
      colProps: { xs: 24, sm: 24, md: 24 },
      componentProps: {
        style: { width: '100%' },
        placeholder: t('product.legalInformation'),
      },
    }),
  ];
};

const InterestPeriod = ({ value }) => {
  const { t } = useTranslation('admin-common');
  if (value === TYPE_OF_PROFIT.PERIODIC) {
    return (
      <HSubForm
        schema={() => [
          createSchemaItem({
            Component: InputNumber,
            className: 'm-b-0',
            name: ['info', 'interestPeriod'],
            colProps: { xs: 24, sm: 24, md: 24 },
            label: t('Kỳ hạn nhận lãi (tháng)'),
            rules: [
              { required: true, message: t('Kỳ hạn nhận lãi là bắt buộc') },
            ],
            componentProps: {
              style: { width: '100%' },
              placeholder: t('Kỳ hạn nhận lãi'),
              min: 0,
            },
          }),
        ]}
      />
    );
  }
  return [];
};
