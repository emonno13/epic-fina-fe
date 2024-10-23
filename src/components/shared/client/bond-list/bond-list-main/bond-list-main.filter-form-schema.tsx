import { HInput } from '@components/shared/common-form-elements/h-input';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { InputNumber, Slider } from 'antd';

import { ArrowDownSmallIcon } from '@icons';
import { TypeOfProfit } from '../constants';

export const ClientBondListMainFilterFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const defaultSchema = [
    createSchemaItem({
      Component: HInput,
      label: t('BONUS NAME', { vn: 'TÊN TRÁI PHIẾU' }),
      name: 'name',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Enter the bond name', { vn: 'Nhập tên trái phiếu' }),
      },
    }),
    createOrganizationSuggestionElement({
      label: t('NAME OF SMALL ISSUANCE ORGANIZATION', {
        vn: 'TÊN TỔ CHỨC PHÁT HÀNH',
      }),
      name: 'orgId',
      colProps: { span: 24 },
      componentProps: {
        endpoint: 'organizations/public/suggestion',
        searchWhenHidenValueChange: true,
        placeholder: t('Enter the issuer name', {
          vn: 'Nhập tên tổ chức phát hành',
        }),
        suffixIcon: <ArrowDownSmallIcon />,
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      label: t('BOND PAR VALUE', {
        en: 'BOND PAR VALUE',
        vn: 'MỆNH GIÁ TRÁI PHIẾU',
      }),
      name: 'info.parValueShares',
      colProps: { span: 24 },
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the denomination to buy', {
          vn: 'Nhập mệnh giá cần mua',
        }),
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
        min: 0,
      },
    }),
    createSchemaItem({
      Component: Slider,
      label: t('INTEREST', {
        en: 'INTEREST',
        vn: 'LÃI SUẤT',
      }),
      name: 'info.interestRate.rate',
      colProps: { span: 24 },
      componentProps: {
        min: 0,
        max: 100,
        step: 0.1,
        range: true,
        defaultValue: [0, 100],
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('ERROR GET TYPE', { vn: 'KIỂU NHẬN LÃI' }),
      name: 'info.typeOfProfit',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Choose the type of interest received', {
          vn: 'Chọn kiểu nhận lãi',
        }),
        suffixIcon: <ArrowDownSmallIcon />,
        options: TypeOfProfit(t),
      },
    }),
  ];

  return defaultSchema;
};
