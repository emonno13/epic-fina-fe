import { InputNumber } from 'antd';
import moment from 'moment';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../../schema-form/h-types';
import { createHDynamicSchemaFormItems } from '../../../../../../shared/common-form-elements/h-dynamic-form-items';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';
import { useHTranslation } from '../../../../../../../lib/i18n';

export const HistoriesDisbursementSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };
  return ([
    createHDynamicSchemaFormItems({
      name: 'historiesDisbursement',
      required: true,
      colProps: { span: 24 },
      componentProps: {
        colMinus: 2,
        colPlus: 2,
        schemaItems: [
          createSchemaItem({
            Component: InputNumber,
            colProps: { xs: 24, sm: 24, md: 10 },
            rowProps: { gutter: { xs: 8, md: 24 } },
            name: 'disbursedAmount',
            className: 'm-r-5',
            label: t('Disbursed Amount'),
            rules:[{ required: true, message: t('Disbursed Amount is required', { vn: 'Số tiền giải ngân là bắt buộc' }) }],
            componentProps: {
              formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: value => value.replace(/(,*)/g, ''),
              style: { width: '100%' },
              min: 1,
              placeholder: t('Disbursed Amount'),
            },
          }),
          createSchemaItem({
            Component: HDatePicker,
            name: 'paymentDate',
            label: t('Approval Date'),
            colProps: { xs: 24, sm: 24, md: 10 },
            componentProps: {
              style: { width: '100%' },
              showTime: true,
              format: 'DD/MM/YYYY',
              defaultValue: moment(),
              placeholder: t('Approval Date'),
            },
          }),
        ],
      },
    }),
  ]);
};