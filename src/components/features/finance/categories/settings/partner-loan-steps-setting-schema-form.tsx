import { InputNumber } from 'antd';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { createSchemaLabelItem } from '../../../../shared/common/h-label/h-label-title';

const PARTNER_DEAL_STATUS_OPTION_SETTING = [
  {
    label: 'Wait processing',
    key: 'waitProcessing',
  },
  {
    label: 'Receive',
    key: 'received',
  },
  {
    label: 'Appraisal in progress',
    key: 'appraisalProgress',
  },
  {
    label: 'Lend approval',
    key: 'lendApproval',
  },
];

export const PartnerLoanStepsSettingSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  const settings: any[] = [];

  for (const setting of PARTNER_DEAL_STATUS_OPTION_SETTING) {
    settings.push(
      createSchemaItem({
        Component: InputNumber,
        name: ['settings', 'partner', setting.key],
        colProps: { xs: 24, sm: 24, md: 20 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        label: t(setting.label),
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
          style: { width: '100%' },
        },
      }),
    );
  }

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('LUỒNG XỬ LÝ CỦA ĐỐI TÁC'),
        titleTooltip: t('LUỒNG XỬ LÝ CỦA ĐỐI TÁC'),
      },
    }),
    ...settings,
  ];
};
