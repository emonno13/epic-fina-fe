import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { useHTranslation } from '@lib/i18n';
import { Divider, Input, Radio } from 'antd';
import { useState } from 'react';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { SEARCH_MODES } from '../../../../../schema-form/features/search-form/schema';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { ORGANIZATION_TYPES } from '../../../../../types/organization';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';

export const PersonInformationDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const [stateId, setStateId] = useState();
  const [districtId, setDistrictId] = useState();
  const [orgPartner, setOrgPartner] = useState();
  const currentUser = useCurrentUser();
  const { form } = props;
  return [
    createSchemaItem({
      Component: Radio.Group,
      name: ['gender'],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Gender'),
      rules: [
        {
          required: true,
          message: t('Gender is required', { vn: 'Giới tính là bắt buộc' }),
        },
      ],
      className: 'form-person-information__gender',
      componentProps: {
        options: [
          { label: t('Male'), value: 'male' },
          { label: t('Female'), value: 'female' },
          { label: t('Other'), value: 'other' },
        ],
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('Email'),
      name: 'emails',
      required: true,
      rowProps: { gutter: { xs: 24, md: 12 } },
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        hiddenMinus: true,
        hiddenPlus: true,
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 24 },
            name: 'email',
            rules: [
              {
                required: true,
                type: 'email',
                message: t('The input is not valid E-mail!', {
                  vn: 'Email không đúng định dạng',
                }),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const emails: any[] = getFieldValue('emails');
                  const emailsDuplicate = emails.filter(
                    (item) => item?.email === value,
                  );
                  if (!!emailsDuplicate && emailsDuplicate.length > 1) {
                    return Promise.reject(
                      t(`Email ${value} is duplicate!`, {
                        vn: 'Email là bắt buộc',
                      }),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ],
            componentProps: {
              placeholder: t('Enter the phone email', { vn: 'Nhập vào email' }),
            },
          }),
        ],
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('Tels', { vn: 'Số điện thoại' }),
      name: 'tels',
      required: true,
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        hiddenMinus: true,
        hiddenPlus: true,
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 24 },
            name: 'tel',
            rules: [
              {
                required: true,
                message: t('Phone is required', {
                  vn: 'Bắt buộc nhập số điện thoại',
                }),
              },
              {
                pattern: /^0[0-9]{9}$/gm,
                message: t('Your phone is not valid', {
                  vn: 'Không đúng định dạng số điện thoại',
                }),
              },
              {
                validator: (_, value) =>
                  !value.includes(' ')
                    ? Promise.resolve()
                    : Promise.reject(new Error('Không để dấu cách')),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const tels: any[] = getFieldValue('tels');
                  const telsDuplicate = tels.filter(
                    (item) => item?.tel === value,
                  );
                  if (!!telsDuplicate && telsDuplicate.length > 1) {
                    return Promise.reject(
                      t(`Phone number ${value} is duplicate!`, {
                        vn: 'Số điện thoại đã tồn tại trong hệ thống',
                      }),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ],
            componentProps: {
              normalize: (value, prevVal, prevVals) => value.trim(),
              placeholder: t('Enter the phone number', {
                vn: 'Nhập vào số điện thoại',
              }),
            },
          }),
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['banks', 0, 'bankAccount'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Bank account', { vn: 'Tài khoản ngân hàng' }),
      rules: [
        {
          required: true,
          message: t('Bank account', { vn: 'Tài khoản ngân hàng là bắt buộc' }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the bank account', {
          vn: 'Nhập vào tài khoản ngân hàng',
        }),
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      name: ['banks', 0, 'bankId'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Bank', { vn: 'Tên ngân hàng' }),
      rules: [
        {
          required: true,
          message: t('Bank name', { vn: 'Tên ngân hàng là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Choose the bank', { vn: 'Lựa chọn ngân hàng' }),
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
        onChangeSelected: (document) => {
          setOrgPartner(document?.id);
          setTimeout(() => {
            const banks = form?.getFieldValue(['banks']);
            banks[0] = { ...banks?.[0], name: document.name };
            form?.setFieldsValue({ banks });
          }, 0);
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['banks', 0, 'branchName'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Bank branch', { vn: 'Tên chi nhánh' }),
      componentProps: {
        placeholder: t('Execute partner', { vn: 'Nhập vào tên chi nhánh' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'banks',
      hidden: true,
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: 'Thông tin địa chỉ liên hệ',
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      label: t('Tỉnh / TP trực thuộc TW'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 12 } },
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
        hiddenValues: {
          type: 'state',
          'info.countryCode': 'VN',
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChangeSelected: async (document) => {
          setStateId(document?.id);
          form?.setFieldsValue({ stateName: document?.description });
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'districtId',
      label: t('Quận / Huyện'),
      rules: [{ required: true, message: 'Quận / Huyện là bắt buộc' }],
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: t('Chọn quận / huyện'),
        hiddenValues: {
          type: 'town_district',
          parentId: stateId,
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChangeSelected: async (document) => {
          setDistrictId(document?.id);
          form?.setFieldsValue({ districtName: document?.description });
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'subDistrictId',
      label: t('Phường / Xã'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 12 } },
      rules: [{ required: true, message: 'Phường / Xã là bắt buộc' }],
      componentProps: {
        placeholder: t('Chọn phường / xã'),
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
        onChangeSelected: async (document) => {
          setDistrictId(document?.id);
          form?.setFieldsValue({ subDistrictName: document?.description });
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: t('Address is require', { vn: 'Địa chỉ là bắt buộc' }),
        },
      ],
      label: t('Địa chỉ cụ thể'),
      name: 'address',
      componentProps: {
        placeholder: t('Nhập địa chỉ'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'stateName',
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      name: 'districtName',
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      name: 'subDistrictName',
      hidden: true,
    }),
  ];
};
