import {
  createOrganizationSuggestionElement,
  HSelect,
} from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { ORGANIZATION_TYPES, PRODUCT_TYPES } from 'types/organization';
import {
  getLoanPeriodOptions,
  getMoneyOptions,
  getPreferentialTimeOptions,
  loanLimitOptions,
} from '../constants';

export const ClientLoanListMainFilterFormSchema = (
  props: HFormProps,
  { advanceSearch },
  setCategoryId,
  categoryId,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const defaultSchema = [
    createSchemaItem({
      Component: HSelect,
      label: t('AMOUNT NEED TO LOAN', {
        vn: 'SỐ TIỀN CẦN VAY',
      }),
      name: 'amount',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Enter the amount you need to borrow', {
          vn: 'Nhập số tiền cần vay',
        }),
        options: getMoneyOptions(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Loan demand', {
        en: 'Loan demand',
        vn: 'Nhu cầu vay',
      }),
      name: 'categoryId',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Choose loan needs', { vn: 'Chọn nhu cầu vay' }),
        endpoint: 'categories/public/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.loan },
        defaultValue: categoryId,
        onChange: (e) => setCategoryId(e),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Loan period', {
        vn: 'Thời gian vay',
      }),
      name: 'loanPeriod',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Choose loan period', { vn: 'Chọn thời gian vay' }),
        options: getLoanPeriodOptions(t),
      },
    }),
    createOrganizationSuggestionElement({
      name: 'orgId',
      label: t('Filter by bank', {
        vn: 'Lọc theo ngân hàng',
      }),
      colProps: { span: 24 },
      componentProps: {
        endpoint: 'organizations/root-bank/public/suggestion',
        hiddenValues: { type: ORGANIZATION_TYPES.BANK },
        placeholder: t('Choose bank', { vn: 'Chọn ngân hàng' }),
        searchWhenHidenValueChange: true,
        optionsConverter: (bank) => {
          bank.label = `${bank.code} - ${bank?.name}`;
          return bank;
        },
      },
    }),
  ];
  const advanceSchema = [
    createSchemaItem({
      Component: HSelect,
      label: t('preferential time', {
        vn: 'thời gian ưu đãi',
      }),
      name: 'preferentialTime',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Choose preferential time', {
          vn: 'Chọn thời gian ưu đãi',
        }),
        options: getPreferentialTimeOptions(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('borrowing limit', {
        vn: 'Hạn mức vay',
      }),
      name: 'loanLimit',
      colProps: { span: 24 },
      componentProps: {
        placeholder: t('Choose borrowing limit', { vn: 'Chọn hạn mức vay' }),
        options: loanLimitOptions,
      },
    }),
  ];
  if (advanceSearch) {
    return [...defaultSchema, ...advanceSchema];
  }
  return defaultSchema;
};
