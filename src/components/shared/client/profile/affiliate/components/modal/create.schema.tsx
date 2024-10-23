import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import {
  CMNDSchemaItem,
  InputPhoneNumberSchemaItem,
} from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Checkbox } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ORGANIZATION_TYPES } from 'types/organization';

export const KycUserInformationSchemaDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const disableField = transport?.disableField;
  return [
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Full name ', { vn: 'Họ và tên' }),
      rules: [
        {
          required: true,
          message: t('Please enter full name', {
            vn: 'Vui lòng nhập họ và tên',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter full name', { vn: 'Nhập họ và tên' }),
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'birthday',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Year of birth', { vn: 'Ngày sinh' }),
      rules: [
        {
          validator(rule, value) {
            if (value && value > moment().subtract('1', 'day').endOf('day')) {
              return Promise.reject(
                t('Birthday', { vn: 'Ngày sinh không hợp lệ' }),
              );
            }
            return Promise.resolve();
          },
        },
        { required: true, message: 'Vui lòng chọn ngày sinh' },
      ],
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t('Select year of birth', {
          vn: 'Chọn ngày tháng năm sinh',
        }),
        showToday: false,
        format: 'DD/MM/YYYY',
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'gender',
      colProps: { xs: 24, md: 12 },
      label: t('Gender', { vn: 'Giới tính' }),
      rules: [
        {
          required: true,
          message: t('Please select gender', { vn: 'Vui lòng chọn giới tính' }),
        },
      ],
      className: 'user-information_form-content-gender',
      componentProps: {
        modernLabel: true,
        options: [
          { label: t('Male', { vn: 'Nam' }), value: 'male' },
          { label: t('Female', { vn: 'Nữ' }), value: 'female' },
        ],
        placeholder: t('Select gender', { vn: 'Chọn giới tính' }),
        disabled: disableField,
      },
    }),
    InputPhoneNumberSchemaItem({
      componentProps: {
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['emails', 0, 'email'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Email'),
      rules: [
        {
          required: true,
          message: t('Please enter email', { vn: 'Vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('The input is not valid E-mail!', {
            vn: 'Email không đúng định dạng',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the email', { vn: 'Nhập email' }),
        disabled: disableField,
      },
    }),
  ];
};

export const KycUserInformationAddressSchemaDetail = (props) => {
  const { form, transport } = props;
  const disableField = transport?.disableField;
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t(
        'Select Provinces/Cities directly under the Central Government',
        { vn: 'Chọn Tỉnh / TP trực thuộc TW' },
      ),
      rules: [
        {
          required: true,
          message: t('Please select province/city', {
            vn: 'Vui lòng chọn tỉnh/thành phố',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t(
          'Select Provinces/Cities directly under the Central Government',
          { vn: 'Chọn Tỉnh / TP trực thuộc TW' },
        ),
        hiddenValues: {
          type: 'state',
          'info.countryCode': 'VN',
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        searchWhenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChange: () => {
          form?.setFieldsValue({
            districtId: undefined,
            subDistrictId: undefined,
          });
        },
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: ({ value: stateId }) => (
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: HSelect,
              name: 'districtId',
              label: t('Select district/district', { vn: 'Chọn quận / huyện' }),
              rules: [
                {
                  required: true,
                  message: t('Please select a county/district', {
                    vn: 'Vui lòng chọn quận/huyện',
                  }),
                },
              ],
              colProps: { xs: 24, sm: 24, md: 24 },
              componentProps: {
                modernLabel: true,
                placeholder: t('Select district/district', {
                  vn: 'Chọn quận / huyện',
                }),
                hiddenValues: {
                  type: 'town_district',
                  parentId: stateId,
                },
                showSearch: true,
                allowClear: true,
                endpoint: 'locations/public/suggestion',
                searchWhenHidenValueChange: true,
                searchWhenValueChange: true,
                optionsConverter: (document) => {
                  document.label = `${document?.description}`;
                  return document;
                },
                onChange: () =>
                  form?.setFieldsValue({ subDistrictId: undefined }),
                disabled: disableField,
              },
            }),
            createSchemaItem({
              className: 'm-b-0',
              Component: ({ value: districtId }) => (
                <HSubForm
                  schema={() => [
                    createSchemaItem({
                      Component: HSelect,
                      name: 'subDistrictId',
                      rules: [
                        {
                          required: true,
                          message: t('Please select ward/commune', {
                            vn: 'Vui lòng chọn phường/xã',
                          }),
                        },
                      ],
                      label: t('Select ward / commune', {
                        vn: 'Chọn phường / xã',
                      }),
                      className: 'm-b-0',
                      componentProps: {
                        modernLabel: true,
                        placeholder: t('Select ward / commune', {
                          vn: 'Chọn phường / xã',
                        }),
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
                        disabled: disableField,
                        searchWhenValueChange: true,
                      },
                    }),
                  ]}
                />
              ),
              name: 'districtId',
              colProps: { xs: 24, sm: 24, md: 24 },
              rules: [
                {
                  required: true,
                  message: t('Please select ward / commune', {
                    vn: 'Vui lòng chọn phường/xã',
                  }),
                },
              ],
            }),
          ]}
        />
      ),
      name: 'stateId',
      colProps: { xs: 24, sm: 24, md: 24 },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'address',
      colProps: { xs: 24, md: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter specific address', {
            vn: 'Vui lòng nhập địa chỉ cụ thể',
          }),
        },
      ],
      label: t('Specific address', { vn: 'Địa chỉ cụ thể' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Please enter specific address', {
          vn: 'Vui lòng nhập địa chỉ cụ thể',
        }),
        disabled: disableField,
      },
    }),
  ];
};

export const BankAccountSchemaDetail = (props) => {
  const { transport } = props;
  const disableField = transport?.disableField;
  const currentUser = useCurrentUser();
  const { t } = useHTranslation('common');
  return [
    createSchemaItem({
      Component: HSelect,
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: ['banks', 0, 'bankId'],
      label: t('Bank', { vn: 'Ngân hàng' }),
      rules: [
        {
          required: true,
          message: t('Please select bank', { vn: 'Vui lòng chọn ngân hàng' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Select bank', { vn: 'Chọn ngân hàng' }),
        mode: 'single',
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
        showSearch: true,
        allowClear: true,
        optionFilterProp: 'children',
        disabled: disableField,
        searchWhenHidenValueChange: true,
        searchWhenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: HInput,
      colProps: { span: 8 },
      name: ['banks', 0, 'bankAccountHolder'],
      label: t('Bank account holder name', { vn: 'Tên chủ tài khoản' }),
      rules: [
        {
          required: true,
          message: t('Please enter bank account holder name', {
            vn: 'Vui lòng nhập tên chủ tài khoản',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter bank account holder name', {
          vn: 'Nhập tên chủ tài khoản',
        }),
        valueConverter: (value) => value.toUpperCase(),
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      colProps: { span: 8 },
      name: ['banks', 0, 'bankAccount'],
      label: 'STK',
      rules: [
        {
          required: true,
          message: t('Please enter bank account number', {
            vn: 'Vui lòng nhập STK',
          }),
        },
        {
          pattern: /^[0-9]*$/,
          message: t('Bank account number is not valid', {
            vn: 'Không đúng định dạng STK',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter bank account number', { vn: 'Nhập STK' }),
        disabled: disableField,
      },
    }),
  ];
};

export const KycUserInformationCCCDSchemaDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const disableField = transport?.disableField;
  return [
    CMNDSchemaItem({
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      colProps: { span: 8 },
      label: t('Ngày cấp'),
      rules: [
        {
          validator(rule, value) {
            if (value && value > moment().subtract('1', 'day').endOf('day')) {
              return Promise.reject(
                t('Supply date', { vn: 'Ngày cấp không hợp lệ' }),
              );
            }
            return Promise.resolve();
          },
        },
        {
          required: true,
          message: t('Please enter issued on', {
            vn: 'Vui lòng nhập ngày cấp',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t('Supply date', { vn: 'Vui lòng nhập ngày cấp' }),
        showToday: false,
        format: 'DD/MM/YYYY',
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['identification', 'placeOfIssue'],
      colProps: { span: 8 },
      label: t('Place of issue', { vn: 'Nơi cấp' }),
      rules: [
        {
          required: true,
          message: t('Please enter place of issue', {
            vn: 'Vui lòng nhập nơi cấp',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
        disabled: disableField,
      },
    }),
  ];
};

export const KycUserConfirmUsa = (props) => {
  const { transport } = props;
  const { disableField, mioInfo } = transport;
  const { t } = useHTranslation('common');
  const [fatca1, setFatca1] = useState<string>();
  const [fatca2, setFatca2] = useState<string>();
  const [fatca3, setFatca3] = useState<string>();

  useEffect(() => {
    if (isEmpty(mioInfo)) return;
    const fatca = mioInfo?.fatca;
    setFatca1(fatca?.fatca1);
    setFatca2(fatca?.fatca2);
    setFatca3(fatca?.fatca3);
  }),
    [mioInfo];

  const options = [
    { label: t('Yes', { vn: 'Có' }), value: 'true' },
    { label: t('No', { vn: 'Không' }), value: 'false' },
  ];

  const handleChange = (checkedValue, setState) => {
    setState && setState(checkedValue[0]);
  };

  return [
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca1'],
      valuePropName: 'checked',
      label: (
        <span>
          1. Anh (chị) có phải là thường trú tại Hoa Kỳ không?
          <br />
          <span style={{ color: '#7F868D' }}>( Are you a U.S Resident?)</span>
        </span>
      ),
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca1),
        value: fatca1,
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca2'],
      valuePropName: 'checked',
      label: (
        <span>
          2. Anh (chị) có phải là công dân Hoa Kỳ không?
          <br />
          <span style={{ color: '#7F868D' }}>( Are you a U.S Citizen?)</span>
        </span>
      ),
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca2),
        value: fatca2,
        disabled: disableField,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: ['fatca', 'fatca3'],
      valuePropName: 'checked',
      label: (
        <span>
          3. Anh (chị) có đang sở hữu Thẻ Thường Trú Hoa Kỳ (Thẻ xanh) không?
          <br />
          <span style={{ color: '#7F868D' }}>
            ( Are you holidng a U.S Permanent Resident Card (Green card) ?)
          </span>
        </span>
      ),
      className: 'fatca-item m-b-0i',
      componentProps: {
        options,
        onChange: (checkedValue) => handleChange(checkedValue, setFatca3),
        value: fatca3,
        disabled: disableField,
      },
    }),
  ];
};
