import { useState } from 'react';

import { InputNumber } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
} from '../../../../../schema-form/h-types';
import { usePublicEnvironment } from '../../../../../system/hooks';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { resolveSubFormControlName } from '../../commission/settings/loan-product/commission-receive/detail-schema-form';

const InsuranceCommissionSpendSchemaForm = (props: any): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { subFormName = '', controlName, disableAllControl = false } = props;
  const levelConfig =
    +usePublicEnvironment('MAX_LEVEL_RECEIVE_COMMISSION') || 1;
  const insuranceDetail = useDocumentDetail() || {};

  const [level, setLevel] = useState(
    (insuranceDetail[subFormName] &&
      insuranceDetail[subFormName][controlName || 'commissionSettingSpend']
        ?.personal?.level) ||
      insuranceDetail[controlName || 'commissionSettingSpend']?.personal
        ?.level ||
      1,
  );

  const levels: any[] = [];

  for (let i = 1; i <= level; i++) {
    levels.push(
      createSchemaItem({
        Component: InputNumber,
        name: resolveSubFormControlName(subFormName, [
          controlName || 'commissionSettingSpend',
          'personal',
          `collaborator${i}`,
        ]),
        colProps: { xs: 24, sm: 24, md: 24 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        label: i === 1 ? t('CTV bán báo hiểm(%)') : t(`Quản lý cấp ${i}(%)`),
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
    );
  }

  return [
    createSchemaItem({
      Component: () => {
        return <h3>{t('Áp dụng cho cá nhân')}</h3>;
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'rateShareCollaborators',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Phần trăm cho người giới thiệu (%)'),
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
    createSchemaItem({
      Component: InputNumber,
      name: resolveSubFormControlName(subFormName, [
        controlName || 'commissionSettingSpend',
        'personal',
        'percentCommission',
      ]),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Phần trăm chi trả (%)'),
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
    createSchemaItem({
      Component: HSelect,
      name: resolveSubFormControlName(subFormName, [
        controlName || 'commissionSettingSpend',
        'personal',
        'level',
      ]),
      label: t('Số Level CTV nhận tiền'),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        disabled: disableAllControl,
        defaultValue: level,
        optionValues: () => {
          const options: any = [];

          for (let i = 1; i <= levelConfig; i++) {
            options.push({
              value: i,
              label: i,
            });
          }

          return options;
        },
        onChangeSelected: (level) => {
          setLevel(level.value);
        },
      },
    }),
    ...levels,
  ];
};

export default InsuranceCommissionSpendSchemaForm;
