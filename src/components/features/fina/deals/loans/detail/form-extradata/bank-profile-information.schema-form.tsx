import { Input, InputNumber } from 'antd';
import moment from 'moment';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../../schema-form/h-types';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { HDatePicker } from '../../../../../../shared/common-form-elements/date-picker';

export const BankProfileInformationSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const info = 'info';
  return ([
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'approvalAmount'],
      label: t('Approval Amount'),
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [{
        required: true,
        message: t('Loan is required', { vn: 'Số tiền phê duyệt là bắt buộc' }),
      }],
      componentProps: {
        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: value => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: t('Approval Amount'),
        min: 1,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: [info, 'approvalDate'],
      label: t('Approval Date'),
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        defaultValue: moment(),
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Approval Date'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [info, 'codeBankProfile'],
      label: `${t('Code Bank Profile', { vn: 'Mã hồ sơ vay phía ngân hàng' })}`,
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: `${t('Mã hồ sơ vay phía ngân hàng')}`,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [info, 'codeBankCustomer'],
      label: `${t('Code Customer Profile', { vn: 'Mã khách hàng phía ngân hàng' })}`,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: `${t('Mã khách hàng phía ngân hàng')}`,
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'borrowTime'],
      hidden: true,
    }),
  ]);
};