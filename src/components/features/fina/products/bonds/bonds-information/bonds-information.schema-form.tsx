import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { createOrganizationSuggestionElement } from '@components/shared/common-form-elements/select';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { HRadioGroup } from '@components/shared/common/h-radio-group';
import { useIsNewDocument } from '@schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Switch } from 'antd';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { HSubForm } from '../../../../../../schema-form/h-form';
import { HDatePicker } from '../../../../../shared/common-form-elements/date-picker';
import { AllowedPreSale, AllowedStatus } from '../constant';

export const BondsInformationSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useTranslation('admin-common');
  const { form } = props;
  const info = 'info';
  const isNewDocument = useIsNewDocument();
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Product information'),
        titleTooltip: t('Product information'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'sku',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('product.sku'),
      rules: [{ required: true, message: t('product.productSkuIsRequired') }],
      componentProps: {
        placeholder: t('product.enterTheSku'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'productCodeOfTheInvestor',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('product.productCodeOfTheInvestor'),
      rules: [{ required: true, message: t('product.productCodeIsRequired') }],
      componentProps: {
        placeholder: t('product.enterTheCodeOfTheInvestor'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('product.name'),
      rules: [{ required: true, message: t('product.nameIsRequired') }],
      componentProps: {
        placeholder: t('product.enterTheName'),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [{ required: true, message: t('product.slugIsRequired') }],
      componentProps: {
        placeholder: t('product.enterTheSlug'),
      },
    }),
    createOrganizationSuggestionElement({
      name: 'orgId',
      label: t('Organizations', {
        en: 'Organization',
        vn: 'Tổ chức',
      }),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [{ required: true, message: t('product.organizationIsRequired') }],
      componentProps: {
        searchWhenHidenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('product.releaseDate'),
      name: [info, 'releaseDate'],
      rules: [
        { required: true, message: t('product.releaseDateIsRequired') },
        ({ getFieldsValue }) => ({
          validator(rule, value) {
            if (
              getFieldsValue()?.info?.maturityDate &&
              value &&
              moment(getFieldsValue()?.info?.maturityDate).isBefore(
                moment(value),
              )
            ) {
              return Promise.reject(
                t('Ngày đáo hạn nhỏ hơn ngày phát hành', {
                  vn: 'Maturity date is smaller than issue date',
                }),
              );
            }

            return Promise.resolve();
          },
        }),
      ],
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('product.releaseDate'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('product.maturityDate'),
      name: [info, 'maturityDate'],
      rules: [
        { required: true, message: t('product.maturityDateIsRequired') },
        ({ getFieldsValue }) => ({
          validator(rule, value) {
            if (
              getFieldsValue()?.info?.releaseDate &&
              value &&
              moment(getFieldsValue()?.info?.releaseDate).isAfter(moment(value))
            ) {
              return Promise.reject(
                t('Ngày đáo hạn nhỏ hơn ngày phát hành', {
                  vn: 'Maturity date is smaller than issue date',
                }),
              );
            }

            return Promise.resolve();
          },
        }),
      ],
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('product.maturityDate'),
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('product.allowedPreSale'),
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: AllowedPreSale,
      },
      name: [info, 'allowedPreSale'],
    }),
    createSchemaItem({
      Component: MandatoryOwnershipPeriod,
      colProps: { xs: 24, sm: 24, md: 12 },
      name: [info, 'allowedPreSale'],
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isOutstanding',
      colProps: { span: 24 },
      label: t('Trái phiếu nổi bật', { en: 'Outstanding bonds' }),
      valuePropName: 'checked',
      initialValue: false,
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('product.status'),
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: AllowedStatus(t),
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: Input.TextArea,
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Description', { vn: 'Ghi chú' }),
      name: 'description',
      componentProps: {
        rows: 4,
      },
    }),
  ];
};

export const MandatoryOwnershipPeriod = ({ value }) => {
  const { t } = useTranslation('admin-common');
  if (!value) {
    return [];
  }
  return (
    <HSubForm
      schema={() => [
        createSchemaItem({
          Component: Input,
          name: ['info', 'mandatoryOwnershipPeriod'],
          colProps: { xs: 24, sm: 24, md: 24 },
          label: t('Thời gian sở hữu bắt buộc', {
            en: 'Mandatory Ownership Period',
          }),
          rules: [
            {
              required: true,
              message: t('product.mandatoryOwnershipPeriodIsRequired'),
            },
          ],
          componentProps: {
            placeholder: t('Nhập thời gian sở hữu bắt buộc', {
              en: 'Enter the mandatory Ownership Period',
            }),
          },
        }),
      ]}
    />
  );
};
