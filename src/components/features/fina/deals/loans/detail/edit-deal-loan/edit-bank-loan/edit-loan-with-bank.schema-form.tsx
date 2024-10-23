import { useHTranslation } from '@lib/i18n';
import { Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { ConverterUtils } from '../../../../../../../../lib/converter';
import { SEARCH_MODES } from '../../../../../../../../schema-form/features/search-form/schema';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../../../schema-form/h-types';
import {
  ORGANIZATION_TYPES,
  USER_TYPES,
} from '../../../../../../../../types/organization';
import { HDatePicker } from '../../../../../../../shared/common-form-elements/date-picker';
import { SelectUtils } from '../../../../../../../shared/common-form-elements/select/Utils';
import { createSchemaLabelItem } from '../../../../../../../shared/common/h-label/h-label-title';

export const EditLoanDetailWithBankSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { initialValues, form } = props;
  const { t } = useHTranslation('admin-common');
  const info = 'info';
  const [orgExecutePartner, setOrgExecutePartner] = useState();
  useEffect(() => {
    setOrgExecutePartner(initialValues?.executePartnerId);
    form?.setFieldsValue({
      partnerCodeName: initialValues?.partner
        ? `${initialValues?.partner?.code || ''} - ${initialValues?.partner?.name || ''}`
        : initialValues?.partnerCodeName,
    });
  }, []);
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Execute partner'),
        titleTooltip: t('Bank supervisor'),
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Execute partner'),
      name: 'executePartnerId',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Execute partner'),
        mode: 'single',
        endpoint: 'organizations/suggestion',
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          toppedOrgId: initialValues?.partnerId,
        },
        searchWhenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
        onChangeSelected: (document) => {
          form?.setFieldsValue({
            partnerCodeName: document
              ? `${document?.code || ''} - ${document?.name || ''}`
              : `${document?.label}`,
          });
          setOrgExecutePartner(document?.id);
        },
        onClear: () => {
          setTimeout(() => {
            form?.setFieldsValue({ executePartnerId: '' });
          }, 0);
        },
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Bank information', { vn: 'Thông tin ngân hàng' }),
        titleTooltip: t('Bank information', { vn: 'Thông tin ngân hàng' }),
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Financial staff'),
      name: 'partnerStaffId',
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: t('Financial staff'),
        mode: 'single',
        endpoint: 'users/suggestion',
        hiddenValues: {
          type: USER_TYPES.teller,
          toppedOrgId: orgExecutePartner
            ? orgExecutePartner
            : initialValues?.partnerId,
          searchingRule: SEARCH_MODES.MULTIPLE,
        },
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = ConverterUtils.getFullNameUser(document);
          return document;
        },
        onChangeSelected: (user) => {
          form?.setFieldsValue({ executePartnerId: user.orgId });
        },
        onClear: () => {
          setTimeout(() => {
            form?.setFieldsValue({ partnerStaffId: '' });
          }, 0);
        },
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'approvalAmount'],
      label: t('Approval Amount'),
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: t('Approval Amount'),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: [info, 'approvalDate'],
      label: t('Approval Date'),
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        placeholder: t('Approval Date'),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [info, 'borrowTime'],
      label: t('Borrow time (month)', { vn: 'Thời gian vay (tháng)' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Borrow time (month)', { vn: 'Thời gian vay (tháng)' }),
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
      Component: Input,
      name: 'partnerCodeName',
      hidden: true,
    }),
  ];
};
