import { useHTranslation } from '@lib/i18n';
import { InputNumber, Radio } from 'antd';

import { createSchemaItem } from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HSubForm } from '../../../../../../../schema-form/h-form';
import {
  ORGANIZATION_TYPES,
  PRODUCT_TYPES,
} from '../../../../../../../types/organization';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';
import { createHDynamicSchemaFormItems } from '../../../../../../shared/common-form-elements/h-dynamic-form-items';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../../../shared/common-form-elements/select/Utils';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { resolveSubFormControlName } from '../commission-receive/detail-schema-form';
import {
  COMMISSION_SETTING_STATUS_OPTIONS,
  COMMISSION_SETTING_STATUSES,
} from '../constant';

const CommissionSpendByRateSchemaForm = (props: any) => {
  const { t } = useHTranslation('admin-common');
  const { label, subFormName, subKey, disableAllControl } = props;
  return (
    <HSubForm
      schema={() => [
        createSchemaLabelItem({
          componentProps: {
            label,
            titleTooltip: label,
          },
        }),
        createSchemaItem({
          Component: InputNumber,
          name: resolveSubFormControlName(subFormName, [
            'formula',
            subKey,
            'spendMax',
          ]),
          colProps: { span: 24 },
          label: t('Mức chi tối đa'),
          rules: [
            {
              type: 'number',
              max: 100,
              message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
            },
            {
              type: 'number',
              min: 0,
              message: t('Min is 100', { vn: 'Giá trị nhỏ nhất là 0' }),
            },
          ],
          componentProps: {
            disabled: disableAllControl,
            style: { width: '100%' },
            placeholder: t('%'),
          },
        }),
        createSchemaItem({
          Component: InputNumber,
          name: resolveSubFormControlName(subFormName, [
            'formula',
            subKey,
            'source',
          ]),
          colProps: { span: 24 },
          label: t('Nguồn'),
          rules: [
            {
              type: 'number',
              max: 100,
              message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
            },
            {
              type: 'number',
              min: 0,
              message: t('Min is 100', { vn: 'Giá trị nhỏ nhất là 0' }),
            },
          ],
          componentProps: {
            disabled: disableAllControl,
            style: { width: '100%' },
            placeholder: t('%'),
          },
        }),
        createSchemaItem({
          Component: InputNumber,
          name: resolveSubFormControlName(subFormName, [
            'formula',
            subKey,
            'handlingStaff',
          ]),
          colProps: { span: 24 },
          label: t('Nhân viên xử lý'),
          rules: [
            {
              type: 'number',
              max: 100,
              message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
            },
            {
              type: 'number',
              min: 0,
              message: t('Min is 100', { vn: 'Giá trị nhỏ nhất là 0' }),
            },
          ],
          componentProps: {
            disabled: disableAllControl,
            style: { width: '100%' },
            placeholder: t('%'),
          },
        }),
        createHDynamicSchemaFormItems({
          name: resolveSubFormControlName(subFormName, [
            'formula',
            subKey,
            'receivers',
          ]),
          componentProps: {
            schemaItems: [
              SelectUtils.createPositionSelection(ORGANIZATION_TYPES.SUB_ORG, {
                rowProps: { gutter: { xs: 24, md: 24 } },
                colProps: { span: 10 },
                label: t('Vị trí'),
                name: 'position',
                componentProps: {
                  disabled: disableAllControl,
                  mode: 'single',
                  placeholder: t('Vị trí'),
                  nameSubForm: 'positionModel',
                  setValueSubForm: (positionModel) => {
                    return positionModel;
                  },
                },
              }),
              createSchemaItem({
                Component: InputNumber,
                colProps: { span: 10 },
                label: 'Phần trăm hoa hồng',
                name: 'commissionPercent',
                rules: [
                  {
                    type: 'number',
                    max: 100,
                    message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
                  },
                  {
                    type: 'number',
                    min: 0,
                    message: t('Min is 100', { vn: 'Giá trị nhỏ nhất là 0' }),
                  },
                ],
                componentProps: {
                  disabled: disableAllControl,
                  style: { width: '100%' },
                  placeholder: '%',
                },
              }),
            ],
            disabled: disableAllControl,
          },
        }),
      ]}
    />
  );
};

export const LoanProductCommissionSettingSpendSchemaForm = (
  subFormName = '',
  showCategory = true,
  disableAllControl = false,
) => {
  const { t } = useHTranslation('admin-common');
  const visibleControls: any[] = [];
  const commissionSetting = useDocumentDetail();

  if (showCategory) {
    visibleControls.push(
      createSchemaItem({
        Component: HSelect,
        label: t('Product category', {
          en: 'Product category',
          vn: 'Danh mục sản phẩm',
        }),
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 12 },
        name: resolveSubFormControlName(subFormName, 'categoryId'),
        rules: [
          {
            required: true,
            message: t('Product category is required'),
          },
        ],
        componentProps: {
          disabled:
            disableAllControl || commissionSetting?.categoryId === 'default',
          placeholder: t('Enter the product category'),
          endpoint: 'categories/suggestion',
          hiddenValues: { type: PRODUCT_TYPES.loan },
          optionsConverter: (document) => {
            document.label = `${document?.name} - ${document.code}`;
            return document;
          },
        },
      }),
    );
  }

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' }),
        titleTooltip: t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' }),
      },
    }),
    ...visibleControls,
    createSchemaItem({
      Component: HDatePicker,
      name: resolveSubFormControlName(subFormName, 'applyDate'),
      label: t('Apply date', { vn: 'Ngày áp dụng' }),
      rules: [
        {
          required: true,
          message: t('Apply date is required', {
            vn: 'Ngày áp dụng là bắt buộc',
          }),
        },
      ],
      colProps: { span: 12 },
      componentProps: {
        disabled:
          disableAllControl || commissionSetting?.categoryId === 'default',
        style: { width: '100%' },
        showToday: false,
        format: 'DD/MM/YYYY',
        placeholder: t('Apply date', { vn: 'Ngày áp dụng' }),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: resolveSubFormControlName(subFormName, 'status'),
      colProps: { span: 12 },
      label: t('Status'),
      initialValue: COMMISSION_SETTING_STATUSES.WAITING_FOR_APPROVAL,
      componentProps: {
        disabled:
          disableAllControl || commissionSetting?.categoryId === 'default',
        defaultValue: COMMISSION_SETTING_STATUSES.WAITING_FOR_APPROVAL,
        optionType: 'button',
        buttonStyle: 'solid',
        options: COMMISSION_SETTING_STATUS_OPTIONS,
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Công thức tính'),
        titleTooltip: t('Công thức tính'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: resolveSubFormControlName(subFormName, [
        'formula',
        'commissionRate',
      ]),
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Định mức'),
      rules: [
        {
          required: true,
          message: t('Định mức là bắt buộc'),
        },
        {
          type: 'number',
          max: 100,
          message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
        },
        {
          type: 'number',
          min: 0,
          message: t('Min is 100', { vn: 'Giá trị nhỏ nhất là 0' }),
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
      Component: CommissionSpendByRateSchemaForm,
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      componentProps: {
        subFormName,
        disableAllControl,
        subKey: 'greaterThanRateInfo',
        label: t('Phân bổ hạn mức (>= Định mức)'),
      },
    }),
    createSchemaItem({
      Component: CommissionSpendByRateSchemaForm,
      colProps: { span: 12 },
      componentProps: {
        subFormName,
        disableAllControl,
        subKey: 'lessThanRateInfo',
        label: t('Phân bổ hạn mức (< Định mức)'),
      },
    }),
  ];
};
