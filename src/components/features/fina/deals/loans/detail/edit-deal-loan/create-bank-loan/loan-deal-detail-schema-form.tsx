import { useTranslation } from 'next-i18next';
import { Input, InputNumber, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../../../schema-form/h-types';
import { HSelect } from '../../../../../../../shared/common-form-elements/select';
import { useHTranslation } from '../../../../../../../../lib/i18n';
import { ItemViewer } from '../../../../../../../shared/common/configuration/item-viewer';
import { LOAN_STATUSES_COLOR_MAPPING, LOAN_STATUSES_LABEL_MAPPING } from '../../../../../products/utils';
import { ProductDetailSchemaForm } from '../../../../../products/loans/tab-applied-banks/product-detail-schema-form';
import { HDatePicker } from '../../../../../../../shared/common-form-elements/date-picker';
import { SelectUtils } from '../../../../../../../shared/common-form-elements/select/Utils';
import { ORGANIZATION_TYPES } from '../../../../../../../../types/organization';
import { HSubForm } from '../../../../../../../../schema-form/h-form';


export const LoanDealDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const {
    dealLoan,
    form,
  } = transport;

  const listProductDetailPartnerIgnore = dealLoan?.dealDetails?.map(el => {
    return el?.productDetailPartnerId;
  });

  const [productDetail, setProductDetail] = useState();
  return ([
    createSchemaItem({
      Component: HSelect,
      // @ts-ignore
      label: <Tooltip title={<ViewProductLoanByPartners {...productDetail}/>} color={'#ffffff'}>{t('Loan partner', { vn: 'Thông tin ngân hàng' })} {
        <QuestionCircleTwoTone/>}</Tooltip>,
      name: 'productDetailPartnerId',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      rules: [{
        required: true,
        message: t('Loan is required', { vn: 'Ngân hàng là bắt buộc' }),
      }],
      componentProps: {
        placeholder: t('Loan partner', { vn: 'Thông tin ngân hàng' }),
        endpoint: 'product-details/suggestion',
        showSearch: true,
        hiddenValues: { productId: dealLoan?.product?.id, _id: { nin: listProductDetailPartnerIgnore } },
        withRelations: ['org'],
        optionsConverter: (document) => {
          document.label = `${document?.org?.code || ''}  ${document?.org?.name || ''}  LOAN: ${document?.name}  ${document.code}`;
          return document;
        },
        onChangeSelected: (document) => {
          form?.setFieldsValue({ partnerCodeName: document?.org ? `${document?.org?.code || ''} - ${document?.org?.name || ''}` : `${document?.label}` });
          form?.setFieldsValue({ partnerId: document?.orgId });
          setProductDetail(document);
        },
        newItemOption: {
          formProps: {
            documentId: undefined,
            schema: ProductDetailSchemaForm,
            nodeName: 'product-details',
            hiddenValues: { productId: dealLoan?.product?.id },
          },
          modalProps: {
            width: '80%',
            style: { top: '8px' },
          },
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'partnerCodeName',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Label partner', { vn: 'Tên ngân hàng' }),
      componentProps: {
        placeholder: t('Label partner', { vn: 'Nhập vào tên ngân hàng' }),
      },
    }),
    createSchemaItem({
      Component: ExecutePartner,
      name: 'partnerId',
      colProps: { xs: 24, sm: 24, md: 8 },
      rowProps: { gutter: { xs: 8, md: 24 } },
    }),
    createSchemaItem({
      Component: InputNumber,
      label: `${t('Approval Amount')} đ`,
      colProps: { xs: 24, sm: 24, md: 8 },
      name: ['info', 'approvalAmount'],
      componentProps: {
        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: value => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder:`${t('Approval Amount')} đ`,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      colProps: { xs: 24, sm: 24, md: 8 },
      label: t('Approval Date'),
      name: ['info', 'approvalDate'],
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Approval Date'),
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { xs: 24, sm: 24 },
      name: 'categoryType',
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      colProps: { xs: 24, sm: 24 },
      name: 'productCategory',
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      colProps: { xs: 24, sm: 24 },
      name: 'partnerId',
      hidden: true,
    }),
  ]);
};

const ViewProductLoanByPartners = (data) => {
  const { t } = useTranslation('admin-common');
  if (data) {
    return (
      <div>
        <ItemViewer {...{ label: t('Loan code'), value: data?.code, labelClassName: 'm-b-0i' }}/>
        <ItemViewer {...{ label: t('Loan name'), value: data?.name, labelClassName: 'm-b-0i' }}/>
        <ItemViewer {...{
          label: t('Maximum loan rate (%)'),
          value: data?.info?.maxRate,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Maximum loan period (year)'),
          value: data?.info?.maxTime,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Maximum loan amount (đ)'),
          value: data?.info?.maxMoney,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Status'),
          value: <Tag
            color={LOAN_STATUSES_COLOR_MAPPING[data.status]}>{t(LOAN_STATUSES_LABEL_MAPPING[data.status])}</Tag>,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Minimum loan period (month)'),
          value: data?.info?.minTime,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Minimum loan amount (đ)'),
          value: data?.info?.otherFees,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Offer period (month)'),
          value: data?.info?.preferentialTime,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Preferential interest rate (%)'),
          value: data?.info?.preferentialRate,
          labelClassName: 'm-b-0i',
        }}/>
        <ItemViewer {...{
          label: t('Interest rate after incentives (%)'),
          value: data?.info?.afterPreferentialRate,
          labelClassName: 'm-b-0i',
        }}/>
      </div>
    );
  }
  return (<span/>);
};

const ExecutePartner = ({ value }) => {
  const { t } = useHTranslation('admin-common');
  return (
    <HSubForm
      schema={() => ([
        SelectUtils.createOrganizationSuggestionElement({
          label: t('Execute partner'),
          name: 'executePartnerId',
          componentProps: {
            placeholder: t('Execute partner'),
            mode: 'single',
            endpoint: value ? 'organizations/suggestion' : null,
            hiddenValues: value ? { type: ORGANIZATION_TYPES.BANK, toppedOrgId:value } : {},
            searchWhenHidenValueChange: !!value,
            optionsConverter: (document) => {
              document.label = `${document?.code || ''}  ${document?.name || ''}`;
              return document;
            },
          },
        }),
      ])}
    />
  );
};
