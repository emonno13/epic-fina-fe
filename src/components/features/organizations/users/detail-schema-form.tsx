import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { useHTranslation } from '@lib/i18n';
import { useRefferalLink } from '@lib/providers/auth';
import { CommentUtils } from '@lib/utils/comment';
import { useDocumentDetail } from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Button, Input, Radio, Switch } from 'antd';
import { useEffect, useState } from 'react';
import {
  getUserTypeOptions,
  ORGANIZATION_TYPES,
  USER_TYPES,
} from '../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';
import {
  getListTitleOfStaff,
  getUserMaritalStatusOptions,
  TITLE_OF_STAFF,
} from './constants';
import { GroupAddressFormSchema } from './group-address-form-schema';
import { getProfileHref } from './utils';

export const UserDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const userDetail = useDocumentDetail();
  const [profileHref, setProfileHref] = useState<string>('');
  const [userTypeSelected, setTypeUserSelected] = useState<string>('');
  const [currentUserType, setCurrentUserType] = useState<string>('');

  const { transport = { orgType: ORGANIZATION_TYPES.SUB_ORG }, form } = props;
  const { currentUser, type } = transport;
  const schema: any[] = [];
  const staffUserItemSchema: any[] = [];
  const id = userDetail?.id || '';
  const fullName = userDetail?.fullName || '';
  const refferalLink = useRefferalLink(userDetail);
  useEffect(() => {
    setCurrentUserType(userDetail?.type || type || userTypeSelected);
  }, [userDetail, type, userTypeSelected]);

  const handleSetProfileHref = (e) => {
    const fullName = e?.target?.value.trim();
    if (!fullName) return;
    const href = getProfileHref(fullName, id);
    form?.setFieldsValue({
      profileHref: href,
    });
  };
  useEffect(() => {
    const href = getProfileHref(fullName, id);
    setProfileHref(href);
  }, [fullName, id]);
  const handleCopyProfileHref = () => {
    CommentUtils.copyToClipboard(
      profileHref,
      t('Successfully copied profile href to clipboard', {
        vn: 'Đã copy link hồ sơ vào clipboard',
      }),
    );
  };

  schema.push(
    ...[
      createOrganizationSuggestionElement(
        { name: 'orgId', label: t('Organization'), colProps: { span: 8 } },
        {
          type: props.hiddenFields?.orgType,
          toppedOrgId: props.hiddenFields?.orgId,
        },
      ),
      createSchemaItem({
        Component: Input,
        name: 'referralCode',
        colProps: { span: 8 },
        label: t('Referral code'),
        componentProps: {
          disabled:
            !!props?.initialValues?.id && !!props?.initialValues?.referralCode,
        },
      }),
    ],
  );

  if (!props?.hiddenFields?.type) {
    schema.push(
      createSchemaItem({
        Component: HSelect,
        label: t('User Type', { vn: 'Loại người dùng' }),
        colProps: { span: 8 },
        name: 'type',
        rules: [
          {
            message: t('User type is required', {
              vn: 'Loại người dùng là bắt buộc',
            }),
          },
        ],
        componentProps: {
          placeholder: t('Select a user type', {
            vn: 'Nhập vào loại người dùng',
          }),
          options: getUserTypeOptions(t),
          onChange: setTypeUserSelected,
        },
      }),
    );
  }
  if (currentUser.type === USER_TYPES.staff) {
    staffUserItemSchema.push(
      ...[
        createSchemaItem({
          Component: HSelect,
          name: 'title',
          colProps: { span: 8 },
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
          colProps: { span: 8 },
          label: t('Public Information', { vn: 'Công khai thông tin' }),
          valuePropName: 'checked',
          initialValue: false,
        }),
        createSchemaItem({
          Component: Input,
          name: 'profileHref',
          colProps: { span: 8 },
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
        createSchemaItem({
          Component: Input,
          colProps: { span: 8 },
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
          Component: HSelect,
          name: 'stringeeAgentId',
          label: t('Stringee Agent', { vn: 'Tư vấn viên' }),
          colProps: { span: 8 },
          componentProps: {
            showSearch: true,
            allowClear: true,
            endpoint: 'stringee-agents/suggestion',
            placeholder: t('Select A Stringee Agent', {
              vn: 'Lựa chọn tư vấn viên',
            }),
            optionFilterProp: 'children',
            optionsConverter: (stringeeAgent) => ({
              value: stringeeAgent.id,
              label: `${stringeeAgent.phoneNumber} - ${stringeeAgent.name}`,
            }),
          },
        }),
        createSchemaItem({
          Component: Switch,
          name: 'isAgent',
          colProps: { span: 8 },
          label: t('Is agent', { vn: 'Có thể thực hiện cuộc gọi' }),
          className: 'setting-layout',
          valuePropName: 'checked',
        }),
      ],
    );
  }

  const controlsForStaffUserForm: any[] = [];
  if (type === USER_TYPES.staff) {
    controlsForStaffUserForm.push(
      SelectUtils.createProductSuggestionElement({
        label: t('Các sản phẩm phụ trách'),
        name: 'productInCharge',
        rowProps: { gutter: { xs: 24, md: 24 } },
        colProps: { span: 16 },
        componentProps: {
          placeholder: t('Các sản phẩm phụ trách'),
          mode: 'tags',
          hiddenValues: {
            status: 'approved',
          },
        },
      }),
    );
  }

  schema.push(
    ...[
      createSchemaItem({
        Component: Input,
        name: 'fullName',
        colProps: { span: 8 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        label: t('Full name', { vn: 'Họ và tên' }),
        rules: [{ required: true, message: 'Full name is required' }],
        className: 'capitalize',
        componentProps: {
          placeholder: t('Enter the full name', { vn: 'Nguyễn Trần Văn Anh' }),
          onChange: handleSetProfileHref,
        },
      }),
      createSchemaItem({
        Component: HDatePicker,
        name: 'birthday',
        colProps: { span: 8 },
        label: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
        componentProps: {
          style: { width: '100%' },
          placeholder: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
          format: 'DD/MM/YYYY',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'idNumber',
        rowProps: { gutter: { xs: 8, md: 16 } },
        colProps: { span: 8 },
        label: t('ID number', { vn: 'CMT/CCCD' }),
        componentProps: {
          style: { width: '100%' },
          placeholder: t('Enter ID number', { vn: 'Nhập CMT/CCCD' }),
        },
      }),
      createSchemaItem({
        Component: Radio.Group,
        name: 'gender',
        colProps: { span: 8 },
        label: t('Gender'),
        componentProps: {
          options: [
            { label: t('Male'), value: 'male' },
            { label: t('Female'), value: 'female' },
            { label: t('Other'), value: 'other' },
          ],
        },
      }),
      createSchemaItem({
        Component: HSelect,
        label: t('Marital status', { vn: 'Tình trạng hôn nhân' }),
        colProps: { span: 8 },
        name: 'maritalStatus',
        componentProps: {
          placeholder: t('Martial status', { vn: 'Tình trạng hôn nhân' }),
          options: getUserMaritalStatusOptions(t),
        },
      }),
      SelectUtils.createPositionSelection(transport.orgType, {
        colProps: { span: 8 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        label: t('Position', { vn: 'Vị trí' }),
        initialValue: transport?.position,
        componentProps: {
          mode: 'tags',
        },
      }),
      ...staffUserItemSchema,
      ...controlsForStaffUserForm,
      ...telsDynamicSchemaForm(props),
      ...emailsDynamicSchemaForm(props),
      ...GroupAddressFormSchema(),
    ],
  );

  return schema;
};

export const telsDynamicSchemaForm = (props: HFormProps, required = true) => [
  createHDynamicSchemaFormItems({
    label: 'Số điện thoại',
    name: 'tels',
    componentProps: {
      schemaItems: [
        createSchemaItem({
          Component: Input,
          colProps: { span: 5 },
          name: 'tel',
          rules: [
            { required, message: 'Phone is required' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const tels: any[] = getFieldValue('tels');
                const telsDuplicate = tels.filter(
                  (item) => item?.tel === value,
                );
                if (!!telsDuplicate && telsDuplicate.length > 1) {
                  return Promise.reject(`Phone number ${value} is duplicate!`);
                }
                return Promise.resolve();
              },
            }),
          ],
          componentProps: {
            placeholder: 'Nhập vào số điện thoại',
          },
        }),
      ],
    },
  }),
];

export const emailsDynamicSchemaForm = (props: HFormProps, required = true) => [
  createHDynamicSchemaFormItems({
    label: 'Emails',
    name: 'emails',
    componentProps: {
      schemaItems: [
        createSchemaItem({
          Component: Input,
          colProps: { span: 5 },
          name: 'email',
          rules: [
            {
              required,
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const emails: any[] = getFieldValue('emails');
                const emailsDuplicate = emails.filter(
                  (item) => item?.email === value,
                );
                if (!!emailsDuplicate && emailsDuplicate.length > 1) {
                  return Promise.reject(`Email ${value} is duplicate!`);
                }
                return Promise.resolve();
              },
            }),
          ],
          componentProps: {
            placeholder: 'Nhập vào email',
          },
        }),
      ],
    },
  }),
];
