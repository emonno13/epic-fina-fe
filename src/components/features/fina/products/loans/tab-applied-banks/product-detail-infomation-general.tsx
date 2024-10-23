import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useHTranslation } from '@lib/i18n';
import { ORGANIZATION_TYPES } from '@types/organization';
import { Input, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import { ValidationMessages } from '../../../../../../lib/validation-message';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '../../../../../../schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { createOrganizationSuggestionElement } from '../../../../../shared/common-form-elements/select';
import { createSchemaLabelItem } from '../../../../../shared/common/h-label/h-label-title';
import { HRadioGroup } from '../../../../../shared/common/h-radio-group';
import { LOAN_STATUSES_OPTIONS } from '../../utils';

export const ProductDetailInfoLoan = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const documentDetail = useDocumentDetail();
  const isNewDocument = props.transport?.isNewDocument || useIsNewDocument();
  const info = 'info';
  const { locale } = useRouter();
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Loan package information'),
        titleTooltip: t('Loan package information'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rendering: !isNewDocument,
      label: t('Code'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Loan code'),
        },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Enter the loan code'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { xs: 24, sm: 24, md: isNewDocument ? 24 : 12 },
      label: t('Loan name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('Loan name')),
        },
      ],
      componentProps: {
        placeholder: t('Enter the loan name'),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: () => (
        <ClickableOpacity
          onClick={() => {
            window.open(
              `${window.location.origin}/${locale}/admin/products/loans?documentId=${documentDetail?.product?.id}`,
              '_blank',
            );
          }}
          className="p-r-10"
          tooltip={documentDetail?.product?.name}
        >
          <a>{documentDetail?.product?.name}</a>
        </ClickableOpacity>
      ),
      label: t('Sản phẩm vay'),
    }),
    createOrganizationSuggestionElement({
      name: 'orgId',
      label: t('Financial Organization'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            t('Financial Organization'),
          ),
        },
      ],
      componentProps: {
        searchWhenHidenValueChange: true,
        hiddenValues: { type: ORGANIZATION_TYPES.BANK },
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Slug') },
      ],
      componentProps: {
        placeholder: t('Enter slug'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'applyFrom',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Time application (Start time)'),
      rules: [
        {
          required: true,
          message: t('Time application is required'),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY HH:mm:ss',
        placeholder: t('Time application (Start time)'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'applyTo',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Time application (End time)'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY HH:mm:ss',
        placeholder: t('Time application (End time)'),
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Status'),
      name: 'status',
      colProps: { span: 24 },
      componentProps: {
        optionType: 'button',
        options: LOAN_STATUSES_OPTIONS.map((item) => ({
          label: t(item.label),
          value: item.value,
        })),
        style: { marginRight: 5 },
        size: 'large',
        buttonStyle: 'solid',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'outstandingAdvantages',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Outstanding advantage'),
      componentProps: {
        placeholder: t('Outstanding advantage'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'advantages',
      label: t('Advantages'),
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        rows: 4,
        placeholder: t('Advantages'),
      },
    }),

    createSchemaLabelItem({
      componentProps: {
        label: t('Terms and interest rate'),
        titleTooltip: t('Terms and interest rate'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'preferentialTime'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Offer period (month)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the Offer period'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'preferentialRate'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Preferential interest rate (%)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the preferential interest rate'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'afterPreferentialRate'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Interest rate after incentives (%)'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the interest rate after incentives'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'preferentialReference'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Reference interest rate'),
      rowProps: { gutter: { xs: 16, md: 24 } },
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the reference interest rate'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'amplitude'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Amplitude %'),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the Amplitude'),
      },
    }),
  ];
};
