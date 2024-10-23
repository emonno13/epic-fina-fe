import { useHTranslation } from '@lib/i18n';
import { InputNumber, Radio } from 'antd';
import { useState } from 'react';

import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { METHOD_OPTIONS, METHODS } from '../constant';
import { resolveSubFormControlName } from './detail-schema-form';

export const LoanProductCommissionSettingFormulaFormSchema = (
  subFormName = '',
  disableAllControl = false,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const commissionSetting = useDocumentDetail();
  const defaultMethod = commissionSetting?.formula?.method || METHODS.PERCENT;
  const [currentMethod, setCurrentMethod] = useState(defaultMethod);

  let controlsByMethod: any[] = [];

  if (currentMethod === METHODS.PERCENT) {
    controlsByMethod = [
      createSchemaItem({
        Component: InputNumber,
        name: resolveSubFormControlName(subFormName, [
          'formula',
          'percentCommission',
        ]),
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 12 },
        label: t('Phân trăm tính'),
        rules: [
          {
            required: true,
            message: t('Phân trăm tính là bắt buộc'),
          },
          {
            type: 'number',
            max: 100,
            message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
          },
          {
            type: 'number',
            min: 0,
            message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
          },
        ],
        componentProps: {
          disabled: disableAllControl,
          style: { width: '100%' },
          rows: 6,
          placeholder: t('%'),
        },
      }),
      createSchemaItem({
        Component: InputNumber,
        name: resolveSubFormControlName(subFormName, [
          'formula',
          'maxCommission',
        ]),
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 12 },
        label: t('Hoa hồng tối đa'),
        rules: [
          {
            required: true,
            message: t('Max commission is required', {
              vn: 'Hoa hồng tối đa là bắt buộc',
            }),
          },
        ],
        componentProps: {
          min: 0,
          disabled: disableAllControl,
          formatter: (value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: (value) => value.replace(/(,*)/g, ''),
          rows: 6,
          style: { width: '100%' },
          placeholder: t('Hoa hồng tối đa (VND)'),
        },
      }),
    ];
  } else if (currentMethod === METHODS.FIXED) {
    controlsByMethod = [
      createSchemaItem({
        Component: InputNumber,
        name: resolveSubFormControlName(subFormName, [
          'formula',
          'fixCommission',
        ]),
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 12 },
        label: t('Hoa hồng nhận được'),
        rules: [
          {
            required: true,
            message: t('Hoa hồng nhận được là bắt buộc'),
          },
          {
            type: 'number',
            min: 0,
            message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
          },
        ],
        componentProps: {
          disabled: disableAllControl,
          style: { width: '100%' },
          formatter: (value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: (value) => value.replace(/(,*)/g, ''),
          rows: 6,
          placeholder: t('VND / 1 khoản vay'),
        },
      }),
    ];
  }

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Công thức tính'),
        titleTooltip: t('Công thức tính'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: resolveSubFormControlName(subFormName, ['formula', 'method']),
      colProps: { span: 12 },
      label: t('Method', { vn: 'Phương thức' }),
      rules: [
        {
          required: true,
          message: t('Method is required', { vn: 'Phương thức là bắt buộc' }),
        },
      ],
      initialValue: currentMethod,
      componentProps: {
        disabled: disableAllControl,
        defaultValue: currentMethod,
        optionValues: METHOD_OPTIONS,
        onChangeSelected: (method) => {
          setCurrentMethod(method.value);
        },
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: resolveSubFormControlName(subFormName, [
        'formula',
        'hasAccumulated',
      ]),
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'Áp dụng luỹ kế',
      initialValue: 'no',
      componentProps: {
        disabled: disableAllControl,
        defaultValue: 'no',
        options: [
          { label: t('Không'), value: 'no' },
          { label: t('Có'), value: 'yes' },
        ],
      },
    }),
    ...controlsByMethod,
  ];
};
