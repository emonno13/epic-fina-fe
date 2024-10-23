import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { InputNumber } from 'antd';
import moment from 'moment';

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';

const ForControlDisbursementEditSchemaForm = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: InputNumber,
      colProps: { xs: 24, sm: 24, md: 10 },
      rowProps: { gutter: { xs: 8, md: 24 } },
      name: 'amount',
      className: 'm-r-5',
      label: t('Disbursed Amount'),
      rules: [
        {
          required: true,
          message: t('Disbursed Amount is required', {
            vn: 'Số tiền giải ngân là bắt buộc',
          }),
        },
      ],
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
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
  ];
};

export const ForControlDisbursementDetailView = () => {
  const forControlDisbursement = useDocumentDetail();
  return (
    <HDocumentModalPanel width={850}>
      <HFeatureForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            `/transactions/update-transaction-deal${forControlDisbursement ? `/${forControlDisbursement.id}` : ''}`,
          ),
          schema: ForControlDisbursementEditSchemaForm,
        }}
      />
    </HDocumentModalPanel>
  );
};
