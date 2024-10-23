import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items/insurance-version';
import { USER_RELATIONSHIP } from '@components/shared/user/constants';
import { DropDownSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  createSchemaItemWithNewLabel,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Divider, Input, Select, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { checkAge } from '../constants';

export const TYPE = {
  staff: 'staff',
  relative: 'relative',
};

const disabledDate = (current) => current && current >= moment().endOf('day');

export const StaffSchemaForm = () => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItemWithNewLabel({
      Component: Input,
      name: ['staffInfo', 'fullName'],
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 8, md: 8 } },
      required: true,
      rules: [
        {
          required: true,
          message: t('Full name is required', {
            vn: 'Xin vui lòng nhập họ và tên',
          }),
        },
      ],
      label: t('Họ và tên', { vn: 'Họ và tên' }),
      componentProps: {
        placeholder: t('Họ và tên', { vn: 'Nhập họ và tên' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HDatePicker,
      name: ['staffInfo', 'dateOfBirth'],
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Date of birth is required', {
            vn: 'Xin vui lòng nhập ngày sinh',
          }),
        },
        {
          validator(_, value) {
            const currentDate = new Date();
            if (value > currentDate) {
              return Promise.reject(
                t('Ngày sinh phải nhỏ hơn ngày hiện tại', {
                  vn: 'Date of birth must be less than current date',
                }),
              );
            }
            return Promise.resolve();
          },
        },
      ],
      label: t('Ngày sinh', { vn: 'Ngày sinh' }),
      componentProps: {
        placeholder: t('Ngày sinh', { vn: 'Nhập ngày sinh' }),
        style: { width: '100%' },
        disabledDate,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Select,
      name: ['staffInfo', 'gender'],
      required: true,
      rules: [
        {
          required: true,
          message: t('Gender is required', {
            vn: 'Xin vui lòng nhập giới tính',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Giới tính', { vn: 'Giới tính' }),
      componentProps: {
        placeholder: t('Giới tính', { vn: 'Chọn giới tính' }),
        suffixIcon: <DropDownSvg />,
        options: [
          { label: 'Nam', value: 'male' },
          { label: 'Nữ', value: 'female' },
          { label: 'Khác', value: 'other' },
        ],
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: ['staffInfo', 'idNumber'],
      colProps: { xs: 24, sm: 24, md: 24 },
      required: true,
      label: t('CMND/CCCD/Hộ chiếu', { vn: 'Số CMND / CCCD / Hộ chiếu' }),
      rules: [
        {
          required: true,
          message: t('Id number is required', {
            vn: 'Xin vui lòng nhập CMND/CCCD/Hộ chiếu',
          }),
        },
      ],
      componentProps: {
        placeholder: t('CMND/CCCD/Hộ chiếu', {
          vn: 'Nhập số CMND / CCCD / Hộ chiếu',
        }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HDatePicker,
      name: ['staffInfo', 'dateOfIdentifyCard'],
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Date of creating your indentify card', {
            vn: 'Xin vui lòng nhập ngày cấp',
          }),
        },
      ],
      label: t('Ngày cấp định danh', { vn: 'Ngày cấp' }),
      componentProps: {
        placeholder: t('Ngày cấp định danh', { vn: 'DD/MM/YYYY' }),
        style: { width: '100%' },
        disabledDate,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: ['staffInfo', 'whereOfIdentifyCard'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Nơi cấp định danh', { vn: 'Nơi cấp' }),
      rules: [
        {
          required: true,
          message: t('Vui lòng nhập nơi cấp', {
            vn: 'Vui lòng nhập nơi cấp',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Nhập nơi cấp', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: ['staffInfo', 'tel'],
      rules: [
        {
          required: true,
          message: t('Phone number is required', {
            vn: 'Xin vui lòng nhập số điện thoại',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Số điện thoại', { vn: 'Số điện thoại' }),
      componentProps: {
        placeholder: t('Số điện thoại', { vn: 'Nhập số điện thoại' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'company',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Công ty', { vn: 'Công ty' }),
      componentProps: {
        placeholder: t('Công ty', { vn: 'Nhập tên công ty' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'level',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Chức vụ', { vn: 'Chức vụ' }),
      componentProps: {
        placeholder: t('Chức vụ', { vn: 'Nhập tên chức vụ' }),
      },
    }),
  ];
};

export const OPTIONS_RELATIONSHIP = [
  { label: 'Bố', value: USER_RELATIONSHIP.FATHER },
  { label: 'Mẹ', value: USER_RELATIONSHIP.MOTHER },
  { label: 'Vợ', value: USER_RELATIONSHIP.WIFE },
  { label: 'Chồng', value: USER_RELATIONSHIP.HUSBAND },
  { label: 'Con', value: USER_RELATIONSHIP.CHILD },
  { label: 'Anh / chị / em', value: USER_RELATIONSHIP.SIBLINGS },
  { label: 'Khác', value: USER_RELATIONSHIP.OTHER },
];

export const InfoBeneficiaryListSchemaForm = (props) => {
  const { t } = useHTranslation('common');
  const { transport } = props;
  const { packages } = transport;

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Typography.Text className="info-beneficiary__info-section-title">
            Chọn bảo hiểm
          </Typography.Text>
        );
      },
      colProps: { span: 24 },
      isNewRow: true,
    }),
    createSchemaItemWithNewLabel({
      Component: Select,
      name: 'employeeBuy',
      colProps: { xs: 24, sm: 24, md: 24 },
      required: true,
      rules: [
        {
          required: true,
          message: t('employeeBuy is required', {
            vn: 'Xin vui lòng nhập loại bảo hiểm',
          }),
        },
      ],
      label: t('Loại bảo hiểm', { vn: 'Loại bảo hiểm' }),
      componentProps: {
        placeholder: t('Loại bảo hiểm', { vn: 'Loại bảo hiểm' }),
        suffixIcon: <DropDownSvg />,
        options: [
          { label: 'Nhân viên', value: 'staff' },
          { label: 'Người thân', value: 'relative' },
        ],
      },
    }),
    createSchemaItem({
      Component: (data) => SelectPackage({ data, packages }),
      name: 'employeeBuy',
      className: 'mb-0',
    }),
    createHDynamicSchemaFormItems({
      name: 'subCustomers',
      componentProps: {
        schemaItems: InfoBeneficiarySchemaForm(props),
      },
    }),
  ];
};

export const InfoBeneficiarySchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  const { transport } = props;
  const { packages } = transport;

  return [
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'fullName',
      colProps: { xs: 24, sm: 24, md: 24 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Xin vui lòng nhập' }),
        },
      ],
      label: t('Họ và tên', { vn: 'Họ và tên' }),
      componentProps: {
        label: t('Họ và tên', { vn: 'Họ và tên' }),
        placeholder: t('Họ và tên', { vn: 'Họ và tên' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HDatePicker,
      name: 'dateOfBirth',
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      dependencies: ['employeeBuy'],
      rules: [
        {
          required: true,
          message: t('Date of birth is required', { vn: 'Xin vui lòng nhập' }),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              getFieldValue('employeeBuy') === 'staff' &&
              (checkAge(value) < 18 || checkAge(value) > 70)
            ) {
              return Promise.reject('Độ tuổi hợp lệ từ 18 - 70 tuổi');
            }

            if (
              getFieldValue('employeeBuy') === 'relative' &&
              (checkAge(value) < 1 || checkAge(value) > 70)
            ) {
              return Promise.reject('Độ tuổi hợp lệ từ 1 - 70 tuổi');
            }

            return Promise.resolve();
          },
        }),
      ],
      label: t('Ngày sinh', { vn: 'Ngày sinh' }),
      componentProps: {
        placeholder: t('Ngày sinh', { vn: 'Ngày sinh' }),
        style: { width: '100%' },
        disabledDate,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Select,
      name: 'gender',
      required: true,
      rules: [
        {
          required: true,
          message: t('Gender is required', { vn: 'Xin vui lòng nhập' }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Giới tính', { vn: 'Giới tính' }),
      componentProps: {
        placeholder: t('Giới tính', { vn: 'Giới tính' }),
        suffixIcon: <DropDownSvg />,
        options: [
          { label: 'Nam', value: 'male' },
          { label: 'Nữ', value: 'female' },
          { label: 'Khác', value: 'other' },
        ],
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('CMND/CCCD/Hộ chiếu', { vn: 'Số CMND / CCCD / Hộ chiếu' }),
      componentProps: {
        placeholder: t('CMND/CCCD/Hộ chiếu', {
          vn: 'Nhập số CMND / CCCD / Hộ chiếu',
        }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HDatePicker,
      name: 'dateOfIdentifyCard',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Ngày cấp định danh', { vn: 'Ngày cấp' }),
      componentProps: {
        placeholder: t('Ngày cấp định danh', { vn: 'DD/MM/YYYY' }),
        style: { width: '100%' },
        disabledDate,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'whereOfIdentifyCard',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Nơi cấp định danh', { vn: 'Nơi cấp' }),
      componentProps: {
        placeholder: t('Nhập nơi cấp', { vn: 'Nhập nơi cấp' }),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Input,
      name: 'tel',
      required: true,
      rules: [
        {
          required: true,
          message: t('Phone number is required', {
            vn: 'Xin vui lòng nhập',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Số điện thoại', { vn: 'Số điện thoại' }),
      componentProps: {
        placeholder: t('Số điện thoại', { vn: 'Số điện thoại' }),
      },
    }),
    // createSchemaItemWithNewLabel({
    //   Component: Input,
    //   name: 'email',
    //   colProps: { xs: 24, sm: 24, md: 24 },
    //   label: t('Email', { vn: 'Email' }),
    //   rules: [
    //     {
    //       type: 'email',
    //       message: t('Email is not valid', {
    //         vn: 'Không đúng định dạng email',
    //       }),
    //     },
    //   ],
    //   componentProps: {
    //     placeholder: t('Email', { vn: 'Email' }),
    //   },
    // }),
    createSchemaItemWithNewLabel({
      Component: Select,
      name: 'relationship',
      required: true,
      rules: [
        {
          required: true,
          message: t('Relationship is required', {
            vn: 'Xin vui lòng nhập',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Quan hệ chủ hợp đồng', { vn: 'Quan hệ chủ hợp đồng' }),
      componentProps: {
        placeholder: t('Quan hệ chủ hợp đồng (Bố, mẹ, con cái)', {
          vn: 'Quan hệ chủ hợp đồng (Bố, mẹ, con cái)',
        }),
        suffixIcon: <DropDownSvg />,
        options: OPTIONS_RELATIONSHIP,
      },
    }),
    createSchemaItemWithNewLabel({
      Component: Divider,
      colProps: { span: 24 },
      isNewRow: true,
      rowProps: {
        gutter: { xs: 24, md: 24 },
        className: 'info-beneficiary-container',
      },
      componentProps: {
        className: 'm-b-0 m-t-0 info-beneficiary__divider',
      },
    }),
  ];
};

const SelectPackage = ({ data, packages }) => {
  const { t } = useHTranslation('common');

  return (
    <HSubForm
      schema={() => [
        createSchemaItemWithNewLabel({
          Component: (props) => {
            const [value, setValue] = useState(props?.value);

            useEffect(() => {
              // setValue(props?.value);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            return (
              <Select
                disabled={!data?.value}
                {...props}
                // value={value}
                // onChange={e => setValue(e)}
                options={
                  data?.value === TYPE?.staff
                    ? packages.listPackageStaff
                    : packages.listPackageRelative
                }
              />
            );
          },
          name: 'package',
          rules: [
            {
              required: true,
              message: t('Package is required', {
                vn: 'Xin vui lòng nhập gói bảo hiểm',
              }),
            },
          ],
          colProps: { xs: 24, sm: 24, md: 24 },
          required: true,
          label: t('Gói bảo hiểm', { vn: 'Gói bảo hiểm' }),
          dependencies: ['employeeBuy'],
          componentProps: {
            suffixIcon: <DropDownSvg />,
            dependencies: ['employeeBuy'],
            placeholder: t('Gói bảo hiểm', { vn: 'Gói bảo hiểm' }),
          },
        }),
      ]}
    />
  );
};
