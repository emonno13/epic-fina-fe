import { EmailSchemaDetail } from '@components/features/profiles/user-information/user-information-schema.-form';
import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { InputPhoneNumberSchemaItem } from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { ArrowDownSmallIcon } from 'icons';
import moment from 'moment';
import { useState } from 'react';
import { ORGANIZATION_TYPES } from 'types/organization';

export const InfoAccountSchema = () => {
  const { t } = useHTranslation('common');

  const disabledDate = (current) => {
    return current > moment().subtract('1', 'day').endOf('day');
  };

  return [
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      label: t('Full name ', { vn: 'Họ và tên' }),
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Họ và tên là bắt buộc' }),
        },
      ],
      rowProps: { gutter: [24, 6] },
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter full name', { vn: 'Nhập vào họ và tên' }),
      },
    }),
    createSchemaItem({
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      Component: () => (
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: HDatePicker,
              name: 'birthday',
              label: t('Year of birth', { vn: 'Ngày sinh' }),
              rules: [
                {
                  required: true,
                  message: t('Birthday is required', {
                    vn: 'Ngày sinh là bắt buộc',
                  }),
                },
              ],
              colProps: { xs: 12, sm: 12, md: 12, lg: 12 },
              rowProps: { gutter: [12, 12] },
              className: 'm-b-0i',
              componentProps: {
                modernLabel: true,
                disabledDate: disabledDate,
                placeholder: t('Year of birth', { vn: 'Ngày sinh' }),
                format: 'DD/MM/YYYY',
              },
            }),
            createSchemaItem({
              Component: HSelect,
              name: 'gender',
              label: t('Giới tính'),
              rules: [
                {
                  required: true,
                  message: t('Gender is required', {
                    vn: 'Giới tính là bắt buộc',
                  }),
                },
              ],
              colProps: { xs: 12, sm: 12, md: 12, lg: 12 },
              className: 'm-b-0i',
              componentProps: {
                modernLabel: true,
                suffixIcon: <ArrowDownSmallIcon />,
                placeholder: t('Gender', { vn: 'Giới tính' }),
                options: [
                  { label: t('Male', { vn: 'Nam' }), value: 'male' },
                  { label: t('Female', { vn: 'Nữ' }), value: 'female' },
                  { label: t('Other', { vn: 'Khác' }), value: 'other' },
                ],
              },
            }),
          ]}
        />
      ),
    }),
    InputPhoneNumberSchemaItem({
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      componentProps: {
        modernLabel: true,
      },
    }),
    EmailSchemaDetail({ colProps: { xs: 24, sm: 24, md: 24, lg: 24 } }),
  ];
};

export const InfoAddressSchema = () => {
  const { t } = useHTranslation('common');
  const [stateId, setStateId] = useState();
  const [districtId, setDistrictId] = useState();

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      label: t('Tỉnh / TP trực thuộc TW'),
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      rowProps: { gutter: [12, 6] },
      rules: [
        {
          required: true,
          message: t('Tỉnh / TP trực thuộc TW', {
            vn: 'Tỉnh / TP trực thuộc TW là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Chọn Tỉnh / TP trực thuộc TW'),
        suffixIcon: <ArrowDownSmallIcon />,
        hiddenValues: {
          type: 'state',
          'info.countryCode': 'VN',
        },
        nameSubForm: 'stateName',
        setValueSubForm: (document) => {
          return document?.description;
        },
        modernLabel: true,
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenValueChange: true,
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChangeSelected: async (document) => setStateId(document?.id),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'districtId',
      label: t('Quận / Huyện'),
      rules: [{ required: true, message: 'Quận / Huyện là bắt buộc' }],
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      componentProps: {
        suffixIcon: <ArrowDownSmallIcon />,
        searchWhenValueChange: true,
        placeholder: t('Chọn quận / huyện'),
        hiddenValues: {
          type: 'town_district',
          parentId: stateId,
        },
        nameSubForm: 'districtName',
        setValueSubForm: (document) => {
          return document?.description;
        },
        showSearch: true,
        allowClear: true,
        modernLabel: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChangeSelected: async (document) => setDistrictId(document?.id),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'subDistrictId',
      label: t('Phường / Xã'),
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      rules: [{ required: true, message: 'Phường / Xã là bắt buộc' }],
      componentProps: {
        modernLabel: true,
        suffixIcon: <ArrowDownSmallIcon />,
        searchWhenValueChange: true,
        placeholder: t('Chọn phường / xã'),
        nameSubForm: 'subDistrictName',
        setValueSubForm: (document) => {
          return document?.description;
        },
        hiddenValues: {
          type: 'sub_district',
          parentId: districtId,
        },
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        onChangeSelected: async (document) => setDistrictId(document?.id),
      },
    }),
    createSchemaItem({
      Component: HInput,
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      rules: [
        {
          required: true,
          message: t('Address is require', { vn: 'Địa chỉ là bắt buộc' }),
        },
      ],
      label: t('Địa chỉ cụ thể'),
      name: 'address',
      componentProps: {
        modernLabel: true,
        placeholder: t('Nhập địa chỉ'),
      },
    }),
  ];
};

export const InfoBillingSchema = () => {
  const currentUser: any = useCurrentUser();
  const { t } = useHTranslation('common');

  return [
    SelectUtils.createOrganizationSuggestionElement({
      name: ['banks', 0, 'bankId'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 8 },
      rowProps: { gutter: [24, 6] },
      label: t('Bank', { vn: 'Ngân hàng' }),
      componentProps: {
        placeholder: t('Choose the bank', { vn: 'Chọn ngân hàng' }),
        mode: 'single',
        modernLabel: true,
        nameSubForm: 'bankName',
        setValueSubForm: (document) => {
          return document?.name;
        },
        suffixIcon: <ArrowDownSmallIcon />,
        endpoint: 'organizations/public/suggestion',
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          searchingRule: SEARCH_MODES.MULTIPLE,
          parentOrgId: currentUser?.rootOrgId,
        },
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['banks', 0, 'branchName'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 8 },
      label: t('Bank branch', { vn: 'Chi nhánh' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Execute partner', { vn: 'Nhập vào tên chi nhánh' }),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['banks', 0, 'bankAccount'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 8 },
      label: t('Bank account', { vn: 'Số tài khoản' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the bank account', {
          vn: 'Nhập vào số tài khoản',
        }),
      },
    }),
  ];
};
