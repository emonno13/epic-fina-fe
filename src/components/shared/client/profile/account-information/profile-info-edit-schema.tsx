/* eslint-disable @next/next/no-img-element */

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { InputPhoneNumberSchemaItem } from '@components/shared/input-with-rule';
import { ArrowDownSmallIcon } from '@icons';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { ORGANIZATION_TYPES } from '@types/organization';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useState } from 'react';

import './styles.module.scss';

export const ProfileInfoEditSchema = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Row gutter={isMobile ? [0, 0] : [40, 40]}>
            <Col
              {...{ xs: 24, sm: 24, md: 16, lg: 16 }}
              className="profile-info-edit-left"
            >
              <div className="profile-title">
                {t('profile.accountInformation')}
              </div>
              <HSubForm schema={InfoAccountSchema} />

              <div className="profile-title">
                {t('profile.billingInformation')}
              </div>
              <HSubForm schema={InfoBillingSchema} />
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
              <div className="profile-title">
                {t('profile.accountIdentifier')}
              </div>
              <HSubForm schema={AccountIdentifierSchema} />
            </Col>
          </Row>
        );
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
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
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
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      label: t('Bank branch', { vn: 'Chi nhánh' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Execute partner', { vn: 'Nhập vào tên chi nhánh' }),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['banks', 0, 'bankAccount'],
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      label: t('Bank account', { vn: 'Số tài khoản' }),
      rules: [
        {
          pattern: /^[0-9]*$/,
          message: t('Bank account is not valid', {
            vn: 'Không đúng định dạng số tài khoản',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the bank account', {
          vn: 'Nhập vào số tài khoản',
        }),
      },
    }),
  ];
};

export const AccountIdentifierSchema = () => {
  const { t } = useHTranslation('common');

  const disabledDate = (current) => {
    return current > moment().subtract('1', 'day').endOf('day');
  };

  return [
    createSchemaItem({
      Component: HInput,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      rowProps: { gutter: [8, 6] },
      label: 'CMND/CCCD',
      rules: [
        {
          pattern: /^[0-9]*$/,
          message: t('CMND/CCCD is not valid', {
            vn: 'Không đúng định dạng CMND/CCCD',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      label: t('Ngày cấp'),
      componentProps: {
        modernLabel: true,
        disabledDate: disabledDate,
        placeholder: t('Supply date', { vn: 'Nhập ngày cấp' }),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: ['identification', 'placeOfIssue'],
      colProps: { xs: 24, sm: 24, md: 24, lg: 24 },
      label: t('placeOfIssue', { vn: 'Nơi cấp' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      componentProps: {
        label: 'Chụp mặt trước, mặt sau CMND/CCCD',
        className: 'profile-title-black',
        uppercaseLabel: false,
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'frontPhoto'],
      colProps: { xs: 12, sm: 12, md: 12 },
      componentProps: {
        useImageCrop: false,
        label: t('Front photo', { vn: 'Ảnh mặt trước' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-front.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'backSidePhoto'],
      colProps: { xs: 12, sm: 12, md: 12 },
      componentProps: {
        useImageCrop: false,
        label: t('Backside photo', { vn: 'Ảnh mặt sau' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/cccd-back.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: CustomComponentHUploadImage,
      name: ['identification', 'portrait'],
      colProps: { xs: 12, sm: 12, md: 12 },
      componentProps: {
        useImageCrop: false,
        label: t('Portrait', { vn: 'Ảnh chân dung' }),
        buttonUpload: (
          <div className="profile-info-edit-btn-upload">
            <img src={'/assets/images/portrait.svg'} alt={'fina'} />
          </div>
        ),
      },
    }),
  ];
};

export const InfoAccountSchema = () => {
  const { t } = useHTranslation('common');
  const [stateId, setStateId] = useState();
  const [districtId, setDistrictId] = useState();

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
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter full name', { vn: 'Nhập vào họ và tên' }),
      },
    }),
    createSchemaItem({
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
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
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      componentProps: {
        modernLabel: true,
      },
    }),
    EmailSchemaDetail(),
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      label: t('Tỉnh / TP trực thuộc TW'),
      colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
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

export const EmailSchemaDetail = (itemProps = {}) => {
  const { t } = useHTranslation('admin-common');
  return createHDynamicSchemaFormItems({
    name: 'emails',
    required: true,
    colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
    className: 'm-b-0i',
    ...itemProps,
    componentProps: {
      hiddenMinus: true,
      hiddenPlus: true,
      schemaItems: [
        createSchemaItem({
          Component: HInput,
          label: t('Địa chỉ Email'),
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
            modernLabel: true,
            placeholder: t('Enter the phone email', { vn: 'Nhập vào email' }),
          },
        }),
      ],
    },
  });
};

const CustomComponentHUploadImage = (props) => {
  return (
    <div className="profile-info-edit-upload">
      <HUploadImage {...props} />
      <p>{props.label}</p>
    </div>
  );
};
