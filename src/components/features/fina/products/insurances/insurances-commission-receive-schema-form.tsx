import { InputNumber } from 'antd';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { createSchemaLabelItem } from '../../../../shared/common/h-label/h-label-title';

const InsuranceCommissionReceiveSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('HOA HỒNG NHẬN TỪ ĐỐI TÁC'),
        titleTooltip: t('HOA HỒNG NHẬN TỪ ĐỐI TÁC'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: ['commissionSettingReceive', 'percentCommission'],
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Phần trăm hoa hồng nhận(%)'),
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
        placeholder: '%',
      },
    }),
  ];
};

export default InsuranceCommissionReceiveSchemaForm;
