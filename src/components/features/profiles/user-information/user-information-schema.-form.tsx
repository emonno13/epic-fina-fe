import {
  getListTitleOfStaff,
  TITLE_OF_STAFF,
} from '@components/features/organizations/users/constants';
import { getProfileHref } from '@components/features/organizations/users/utils';
import { InputPhoneNumberSchemaItem } from '@components/shared/input-with-rule';
import { CommentUtils } from '@lib/utils/comment';
import { Button, Divider, Input, Radio, Switch } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import {
  useCurrentUser,
  useRefferalLink,
} from '../../../../lib/providers/auth';
import { SEARCH_MODES } from '../../../../schema-form/features/search-form/schema';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import { ORGANIZATION_TYPES, USER_TYPES } from '../../../../types/organization';
import { HDatePicker } from '../../../shared/common-form-elements/date-picker';
import { createHDynamicSchemaFormItems } from '../../../shared/common-form-elements/h-dynamic-form-items';
import { HUploadImage } from '../../../shared/common-form-elements/h-upload';
import { HSelect } from '../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';

export const UserInformationDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { form } = props;
  const { t } = useHTranslation('admin-common');
  const { id = '' } = useCurrentUser();
  const fullName = form?.getFieldValue('fullName') || '';
  const currentUser = useCurrentUser();
  const [stateId, setStateId] = useState();
  const [districtId, setDistrictId] = useState();
  const [profileHref, setProfileHref] = useState<string>('');
  const refferalLink = useRefferalLink();

  const handleSetProfileHref = (e) => {
    const fullName = e?.target?.value.trim();
    if (!fullName) return;
    const href = getProfileHref(fullName, id);
    form?.setFieldsValue({
      profileHref: href,
    });
  };

  const handleCopyProfileHref = () => {
    const href = profileHref;
    CommentUtils.copyToClipboard(
      href,
      t('Successfully copied profile href to clipboard', {
        vn: 'Đã copy link hồ sơ vào clipboard',
      }),
    );
  };

  useEffect(() => {
    const href = getProfileHref(fullName, id);
    setProfileHref(href);
    form?.setFieldsValue({
      profileHref: href,
    });
  }, [fullName, id]);

  const schema: any[] = [
    createSchemaItem({
      Component: HUploadImage,
      name: 'avatar',
      className: 'user-information_form-content-avatar',
      colProps: { span: 24 },
      componentProps: {
        buttonUpload: (
          <div className={'user-information_form-content-avatar-upload'}>
            <img src="/assets/images/photo.png" alt="" />
          </div>
        ),
        onChange: (document) => {
          if (!document) {
            form?.setFieldsValue({ avatar: '' });
            return;
          }
          form?.setFieldsValue({ avatar: document.url });
        },
        useImageCrop: false,
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'gender',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Gender'),
      rules: [
        {
          required: true,
          message: t('Gender is required', { vn: 'Giới tính là bắt buộc' }),
        },
      ],
      className: 'user-information_form-content-gender',
      componentProps: {
        options: [
          { label: t('Male'), value: 'male' },
          { label: t('Female'), value: 'female' },
          { label: t('Other'), value: 'other' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'fullName',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Full name ', { vn: 'Họ và tên' }),
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Họ và tên là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter full name', { vn: 'Nhập vào họ và tên' }),
        onChange: handleSetProfileHref,
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
      ],
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
        showToday: false,
        format: 'DD/MM/YYYY',
      },
    }),
  ];
  if (currentUser.type === USER_TYPES.staff) {
    schema.push(
      ...[
        createSchemaItem({
          Component: Input,
          name: 'profileHref',
          colProps: { xs: 24, sm: 24, md: 12 },
          rowProps: { gutter: { xs: 24, md: 24 } },
          label: t('Profile url', { vn: 'Đường dẫn hồ sơ' }),
          initialValue: profileHref,
          componentProps: {
            disabled: true,
            suffix: (
              <Button
                size={'small'}
                type={'primary'}
                onClick={handleCopyProfileHref}
              >
                Copy
              </Button>
            ),
          },
        }),
        createSchemaItem({
          Component: HSelect,
          name: 'title',
          colProps: { span: 12 },
          label: t('Staff title', { vn: 'Chức danh nhân viên' }),
          initialValue: TITLE_OF_STAFF.FINANCIAL_EXPERT,
          componentProps: {
            placeholder: t('Select a title of staff', {
              vn: 'Chọn một chức danh của nhân viên',
            }),
            options: getListTitleOfStaff(t),
          },
        }),
        createSchemaItem({
          Component: Switch,
          name: 'isPublicInformation',
          colProps: { span: 12 },
          label: t('Public Information', { vn: 'Công khai thông tin' }),
          valuePropName: 'checked',
          initialValue: false,
        }),
      ],
    );
  }

  return [
    ...schema,
    createSchemaItem({
      Component: Input,
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Referral Link', { vn: 'Link giới thiệu' }),
      componentProps: {
        suffix: (
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              CommentUtils.copyToClipboard(
                refferalLink,
                t('Successfully copied referral link', {
                  vn: 'Đã copy link giới thiệu',
                }),
              );
            }}
          >
            Copy
          </Button>
        ),
        defaultValue: refferalLink,
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Identification information', {
          vn: 'Thông tin định danh',
        }),
        className: 'm-b-0 m-t-0',
      },
    }),
    EmailSchemaDetail(),
    InputPhoneNumberSchemaItem({
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        modernLabel: false,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'profileHref',
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Profile url', { vn: 'Đường dẫn hồ sơ' }),
      initialValue: profileHref,
      componentProps: {
        suffix: (
          <Button
            size={'small'}
            type={'primary'}
            onClick={handleCopyProfileHref}
          >
            Copy
          </Button>
        ),
      },
    }),
    ...IdentificationSchemaDetail(),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Billing Information', { vn: 'Thông tin thanh toán' }),
        className: 'm-b-0 m-t-0',
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      name: ['banks', 0, 'bankId'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Bank', { vn: 'Ngân hàng' }),
      componentProps: {
        placeholder: t('Choose the bank', { vn: 'Chọn ngân hàng' }),
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
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['banks', 0, 'branchName'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Bank branch', { vn: 'Chi nhánh' }),
      componentProps: {
        placeholder: t('Execute partner', { vn: 'Nhập vào tên chi nhánh' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['banks', 0, 'bankAccount'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Bank account', { vn: 'Số tài khoản' }),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter the bank account', {
          vn: 'Nhập vào số tài khoản',
        }),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Contact Information', { vn: 'Thông tin liên hệ' }),
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
        searchWhenValueChange: true,
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
        searchWhenValueChange: true,
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
        searchWhenValueChange: true,
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

export const EmailSchemaDetail = (itemProps = {}) => {
  const { t } = useHTranslation('admin-common');
  return createHDynamicSchemaFormItems({
    label: t('Email'),
    name: 'emails',
    required: true,
    rowProps: { gutter: { xs: 24, md: 12 } },
    colProps: { xs: 24, sm: 24, md: 12 },
    ...itemProps,
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
  });
};

export const TelSchemaDetail = (itemProps = {}, isDisable = false) => {
  const { t } = useHTranslation('admin-common');
  return createHDynamicSchemaFormItems({
    label: t('Tels', { vn: 'Số điện thoại' }),
    name: 'tels',
    required: true,
    colProps: { xs: 24, sm: 24, md: 12 },
    ...itemProps,
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
            disabled: isDisable,
            placeholder: t('Enter the phone number', {
              vn: 'Nhập vào số điện thoại',
            }),
          },
        }),
      ],
    },
  });
};

export const IdentificationSchemaDetail = ({
  idNumberItemProps = {},
  issuedOnItemProps = {},
  placeOfIssueItemProps = {},
  frontPhotoItemProps = {},
  backSidePhotoItemProps = {},
}: any = {}) => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'CMND/CCCD',
      ...idNumberItemProps,
      componentProps: {
        placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: ['identification', 'issuedOn'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Ngày cấp'),
      ...issuedOnItemProps,
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
        ...(issuedOnItemProps?.rules || []),
      ],
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Supply date', { vn: 'Nhập ngày cấp' }),
        showToday: false,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['identification', 'placeOfIssue'],
      colProps: { span: 12 },
      label: t('placeOfIssue', { vn: 'Nơi cấp' }),
      ...placeOfIssueItemProps,
      componentProps: {
        placeholder: t('Enter place Of Issue', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: ['identification', 'frontPhoto'],
      label: t('Front photo', { vn: 'Ảnh mặt trước' }),
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 12 },
      ...frontPhotoItemProps,
      componentProps: {
        placeholder: '--------',
        style: { width: '100%' },
        useImageCrop: false,
        buttonUpload: (
          <div className={'user-information_form-default-image'}>
            <img src={'/assets/images/cccc_front.jpg'} alt={'fina'} />
            Mặt trước
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: ['identification', 'backSidePhoto'],
      label: t('Backside photo', { vn: 'Ảnh mặt sau' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      ...backSidePhotoItemProps,
      componentProps: {
        style: { width: '100%' },
        useImageCrop: false,
        buttonUpload: (
          <div className={'user-information_form-default-image'}>
            <img src={'/assets/images/cccc_back.jpg'} alt={'fina'} />
            Mặt sau
          </div>
        ),
      },
    }),
  ];
};
