import { Checkbox, Col, InputNumber, Radio, Row } from 'antd';
import { useState } from 'react';

import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '../../../../../../schema-form/features/hooks';
import { HSubForm } from '../../../../../../schema-form/h-form';
import { PRODUCT_TYPES } from '../../../../../../types/organization';
import { HDatePicker } from '../../../../../shared/common-form-elements/date-picker';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import { createSchemaLabelItem } from '../../../../../shared/common/h-label/h-label-title';
import InsuranceCommissionSpendSchemaForm from '../../../products/insurances/insurances-commission-spend-schema-form';
import { resolveSubFormControlName } from '../loan-product/commission-receive/detail-schema-form';
import {
  COMMISSION_SETTING_STATUS_OPTIONS,
  COMMISSION_SETTING_STATUSES,
} from '../loan-product/constant';

import './detail-schema-form.module.scss';

export const InsuranceProductCommissionSettingSchemaForm = (
  subFormName = '',
  isProductDetail = false,
  disableAllControl = false,
) => {
  const { t } = useHTranslation('admin-common');
  const visibleControls: any[] = [];
  const insuranceDetail = useDocumentDetail();
  const updateInsurancesDetail = useSetDocumentDetail();
  const newInsurancesDetail = { ...insuranceDetail };

  const [disableCommissionReceive, setDisableCommissionReceive] =
    useState(false);
  const [disableCommissionSpend, setDisableCommissionSpend] = useState(false);

  if (
    !insuranceDetail[subFormName] ||
    !insuranceDetail[subFormName]?.insurancesSettingReceive
  ) {
    const commissionSettingReceive =
      insuranceDetail?.category?.commissionSettings?.find(
        (item: any) => item.type === 'insurances',
      );
    newInsurancesDetail[subFormName] ||= {};
    newInsurancesDetail[subFormName].insurancesSettingReceive =
      commissionSettingReceive?.insurancesSettingReceive || {};
  }

  if (
    !insuranceDetail[subFormName] ||
    !insuranceDetail[subFormName]?.insurancesSettingSpend
  ) {
    const commissionSettingSpend =
      insuranceDetail?.category?.commissionSettings?.find(
        (item: any) => item.type === 'insurances',
      );
    newInsurancesDetail[subFormName] ||= {};
    newInsurancesDetail[subFormName].insurancesSettingSpend =
      commissionSettingSpend?.insurancesSettingSpend || {};
  }

  updateInsurancesDetail(newInsurancesDetail);

  if (!isProductDetail) {
    visibleControls.push(
      ...[
        createSchemaLabelItem({
          componentProps: {
            label: t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' }),
            titleTooltip: t('PRODUCT INFORMATION', {
              vn: 'Thông tin sản phẩm',
            }),
          },
        }),
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
              disableCommissionReceive ||
              insuranceDetail?.categoryId === 'default',
            placeholder: t('Enter the product category'),
            endpoint: 'categories/suggestion',
            hiddenValues: { type: PRODUCT_TYPES.insurance },
            optionsConverter: (document) => {
              document.label = `${document?.name} - ${document.code}`;
              return document;
            },
          },
        }),
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
            disabled: insuranceDetail?.categoryId === 'default',
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
            disabled: insuranceDetail?.categoryId === 'default',
            defaultValue: COMMISSION_SETTING_STATUSES.WAITING_FOR_APPROVAL,
            optionType: 'button',
            buttonStyle: 'solid',
            options: COMMISSION_SETTING_STATUS_OPTIONS,
          },
        }),
      ],
    );
  }

  return [
    ...visibleControls,
    createSchemaLabelItem({
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 5 },
      componentProps: {
        label: t('HOA HỒNG FINA NHẬN'),
        titleTooltip: t('HOA HỒNG FINA NHẬN'),
      },
    }),
    ...(isProductDetail
      ? [
          createSchemaItem({
            colProps: { span: 6 },
            Component: () => {
              return (
                <Checkbox
                  onChange={() =>
                    setDisableCommissionReceive(!disableCommissionReceive)
                  }
                  checked={disableCommissionReceive}
                >
                  {t('Áp dụng theo danh mục sản phẩm')}
                </Checkbox>
              );
            },
          }),
        ]
      : []),
    createSchemaItem({
      Component: InputNumber,
      name: resolveSubFormControlName(subFormName, [
        'insurancesSettingReceive',
        'percentCommission',
      ]),
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Phần trăm hoa hồng nhận'),
      rules: [
        {
          required: true,
          message: t('% Fina nhận được là bắt buộc'),
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
        disabled: disableCommissionReceive,
        style: { width: '100%' },
        rows: 6,
        placeholder: t('% FINA nhận được'),
      },
    }),
    createSchemaLabelItem({
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 5 },
      componentProps: {
        label: t('HOA HỒNG FINA TRẢ'),
        titleTooltip: t('HOA HỒNG FINA TRẢ'),
      },
    }),
    ...(isProductDetail
      ? [
          createSchemaItem({
            colProps: { span: 6 },
            Component: () => {
              return (
                <Checkbox
                  onChange={() =>
                    setDisableCommissionSpend(!disableCommissionSpend)
                  }
                  checked={disableCommissionSpend}
                >
                  {t('Áp dụng theo danh mục sản phẩm')}
                </Checkbox>
              );
            },
          }),
        ]
      : []),
    createSchemaItem({
      Component: () => {
        return (
          <Row gutter={24}>
            <Col md={12} lg={12}>
              <HSubForm
                schema={() => [
                  createSchemaItem({
                    Component: () => {
                      return <h3>{t('Áp dụng cho đại lý')}</h3>;
                    },
                  }),
                  createSchemaItem({
                    Component: InputNumber,
                    name: resolveSubFormControlName(subFormName, [
                      'insurancesSettingSpend',
                      'agency',
                      'percentCommission',
                    ]),
                    colProps: { xs: 24, sm: 24, md: 24 },
                    rowProps: { gutter: { xs: 24, md: 24 } },
                    label: t('Phần trăm chi trả (%)'),
                    rules: [
                      {
                        type: 'number',
                        max: 100,
                        message: t('Max is 100', {
                          vn: 'Giá trị lớn nhất là 100',
                        }),
                      },
                      {
                        type: 'number',
                        min: 0,
                        message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
                      },
                    ],
                    componentProps: {
                      disabled: disableCommissionSpend,
                      style: { width: '100%' },
                      placeholder: '%',
                    },
                  }),
                ]}
              />
            </Col>
            <Col md={12} lg={12}>
              <HSubForm
                schema={() =>
                  InsuranceCommissionSpendSchemaForm({
                    title: t('Áp dụng cho cá nhân'),
                    subFormName,
                    controlName: 'insurancesSettingSpend',
                    disableAllControl: disableCommissionSpend,
                  })
                }
              />
            </Col>
          </Row>
        );
      },
    }),
  ];
};
