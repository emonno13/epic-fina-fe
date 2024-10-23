import { Radio } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { PRODUCT_TYPES } from '../../../../../../../types/organization';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import {
  COMMISSION_SETTING_STATUS_OPTIONS,
  COMMISSION_SETTING_STATUSES,
} from '../constant';
import { LoanProductCommissionSettingFormulaFormSchema } from './formula-schema-form';

export const resolveSubFormControlName = (
  subFormName: any,
  controlName: any,
): any => {
  if (subFormName) {
    return Array.isArray(controlName)
      ? [subFormName, ...controlName]
      : [subFormName, controlName];
  }

  return controlName;
};

export const LoanProductCommissionSettingReceiveSchemaForm = (
  subFormName = '',
  showCategory = true,
  disableAllControl = false,
): HFormItemProps[] => {
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
        colProps: { xs: 24, sm: 24, md: 12 },
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
      rowProps: showCategory ? { gutter: { xs: 24, md: 24 } } : undefined,
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
    ...LoanProductCommissionSettingFormulaFormSchema(
      subFormName,
      disableAllControl,
    ),
  ];
};
