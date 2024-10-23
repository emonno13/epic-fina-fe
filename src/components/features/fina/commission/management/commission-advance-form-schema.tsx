import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { HDatePicker } from '../../../../shared/common-form-elements/date-picker';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../../shared/common-form-elements/select';
import {
  COMMISSION_REASON_SPEND_OPTIONS,
  COMMISSION_STATUS_OPTIONS,
  COMMISSION_STATUSES,
} from '../settings/loan-product/constant';

export const CommissionAdvanceFormSchema = (props: any): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { type, applyFor } = props;
  let commissionStatuses = COMMISSION_STATUS_OPTIONS.filter(
    (item) => item.value !== COMMISSION_STATUSES.PAID,
  );

  let org = createOrganizationSuggestionElement({
    label: t('Partner'),
    name: 'orgId',
    colProps: { span: 6 },
    componentProps: {
      placeholder: t('Search by Partner'),
      hiddenValues: {
        type: type === 'loan' ? 'bank' : 'insurance',
      },
    },
  });

  if (applyFor === 'spend') {
    org = createSchemaItem({
      Component: HSelect,
      label: t('Lý do chi trả'),
      name: 'transactionType',
      colProps: { span: 6 },
      componentProps: {
        modernLabel: true,
        placeholder: t('Search by status'),
        optionValues: COMMISSION_REASON_SPEND_OPTIONS,
      },
    });

    commissionStatuses = COMMISSION_STATUS_OPTIONS;
  }

  return [
    createSchemaItem({
      Component: HDatePicker,
      name: 'from',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 6 },
      label: t('Từ ngày'),
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Từ ngày'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'to',
      colProps: { span: 6 },
      label: t('Đến ngày'),
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Đến ngày'),
      },
    }),
    org,
    createSchemaItem({
      Component: HSelect,
      label: t('Status'),
      name: 'status',
      colProps: { span: 6 },
      componentProps: {
        modernLabel: true,
        placeholder: t('Search by status'),
        optionValues: commissionStatuses,
      },
    }),
  ];
};
