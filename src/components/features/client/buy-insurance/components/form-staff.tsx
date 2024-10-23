import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { USER_RELATIONSHIP } from '@components/shared/user/constants';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { Input, Select } from 'antd';
import { HDatePicker } from '../../../../shared/common-form-elements/date-picker';

export const TYPE = {
  staff: 'staff',
  relative: 'relative',
};

export const StaffSchemaForm = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        label: 'THÔNG TIN CHỦ HỢP ĐỒNG',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'fullName'],
      colProps: { xs: 24, sm: 24, md: 12 },
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
        placeholder: t('Họ và tên', { vn: 'Họ và tên' }),
      },
    }),
    createSchemaItem({
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
        placeholder: t('Ngày sinh', { vn: 'Ngày sinh' }),
        style: { width: '100%' },
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'email'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Email', { vn: 'Email' }),
      rules: [
        {
          required: true,
          message: t('Email is required', { vn: 'Xin vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('Email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Email', { vn: 'Email' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['staffInfo', 'idNumber'],
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      label: t('CMND/CCCD/Hộ chiếu', { vn: 'CMND/CCCD/Hộ chiếu' }),
      rules: [
        {
          required: true,
          message: t('Id number is required', {
            vn: 'Xin vui lòng nhập CMND/CCCD/Hộ chiếu',
          }),
        },
      ],
      componentProps: {
        placeholder: t('CMND/CCCD/Hộ chiếu', { vn: 'CMND/CCCD/Hộ chiếu' }),
      },
    }),
    createSchemaItem({
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
        placeholder: t('Giới tính', { vn: 'Giới tính' }),
        options: [
          { label: 'Nam', value: 'male' },
          { label: 'Nữ', value: 'female' },
          { label: 'Khác', value: 'other' },
        ],
      },
    }),
    createSchemaItem({
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
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Số điện thoại', { vn: 'Số điện thoại' }),
      componentProps: {
        placeholder: t('Số điện thoại', { vn: 'Số điện thoại' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'company',
      rules: [
        {
          required: true,
          message: t('Company is required', {
            vn: 'Xin vui lòng nhập công ty',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Công ty', { vn: 'Công ty' }),
      componentProps: {
        placeholder: t('Công ty', { vn: 'Công ty' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'level',
      rules: [
        {
          required: true,
          message: t('Level is required', { vn: 'Xin vui lòng nhập chức vụ' }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Chức vụ', { vn: 'Chức vụ' }),
      componentProps: {
        placeholder: t('Chức vụ', { vn: 'Chức vụ' }),
      },
    }),
  ];
};

export const InfoCustomer = (t, data, changeTypePackage, form) => {
  return [
    createHDynamicSchemaFormItems({
      name: 'customers',
      componentProps: {
        colMinus: 2,
        schemaItems: InfoBeneficiarySchemaForm(
          t,
          data,
          changeTypePackage,
          form,
        ),
      },
    }),
  ];
};

export const InfoBeneficiarySchemaForm = (t, data, changeTypePackage, form) => {
  return [
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        label: 'THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'fullName',
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Full name is required', { vn: 'Xin vui lòng nhập' }),
        },
      ],
      label: t('Họ và tên', { vn: 'Họ và tên' }),
      componentProps: {
        placeholder: t('Họ và tên', { vn: 'Họ và tên' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'dateOfBirth',
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Date of birth is required', { vn: 'Xin vui lòng nhập' }),
        },
      ],
      label: t('Ngày sinh', { vn: 'Ngày sinh' }),
      componentProps: {
        placeholder: t('Ngày sinh', { vn: 'Ngày sinh' }),
        style: { width: '100%' },
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
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
        options: [
          { label: 'Nam', value: 'male' },
          { label: 'Nữ', value: 'female' },
          { label: 'Khác', value: 'other' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'idNumber',
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('Id number is required', { vn: 'Xin vui lòng nhập' }),
        },
      ],
      label: t('CMND/CCCD/Hộ chiếu', { vn: 'CMND/CCCD/Hộ chiếu' }),
      componentProps: {
        placeholder: t('CMND/CCCD/Hộ chiếu', { vn: 'CMND/CCCD/Hộ chiếu' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'tel',
      rules: [
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Số điện thoại', { vn: 'Số điện thoại' }),
      componentProps: {
        placeholder: t('Số điện thoại', { vn: 'Số điện thoại' }),
      },
    }),
    createSchemaItem({
      Component: (props) => {
        return (
          <Select
            {...props}
            onChange={(value) => changeTypePackage(value, props?.index)}
          />
        );
      },
      name: 'employeeBuy',
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      rules: [
        {
          required: true,
          message: t('employeeBuy is required', {
            vn: 'Xin vui lòng nhập loại bảo hiểm',
          }),
        },
      ],
      label: t('Mua bảo hiểm', { vn: 'Mua bảo hiểm' }),
      componentProps: {
        placeholder: t('Loại bảo hiểm', { vn: 'Loại bảo hiểm' }),
        options: [
          { label: 'Nhân viên', value: 'staff' },
          { label: 'Người thân', value: 'relative' },
        ],
      },
    }),
    createSchemaItem({
      Component: (props) => {
        return (
          <Select
            disabled={
              !form.getFieldValue('customers')[props?.index]?.employeeBuy
            }
            {...props}
            options={
              form.getFieldValue('customers')[props?.index]?.employeeBuy ===
              TYPE?.staff
                ? data.listPackageStaff
                : data.listPackageRelative
            }
          />
        );
      },
      name: 'package',
      rules: [
        {
          required: true,
          message: t('package is required', {
            vn: 'Xin vui lòng nhập gói bảo hiểm',
          }),
        },
      ],
      colProps: { xs: 24, sm: 24, md: 12 },
      required: true,
      label: t('Gói bảo hiểm', { vn: 'Gói bảo hiểm' }),
      componentProps: {
        placeholder: t('Gói bảo hiểm', { vn: 'Gói bảo hiểm' }),
      },
    }),
    createSchemaItem({
      Component: Select,
      name: 'relationship',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Quan hệ chủ hợp đồng', { vn: 'Quan hệ chủ hợp đồng' }),
      componentProps: {
        placeholder: t('Quan hệ chủ hợp đồng (Bố, mẹ, con cái)', {
          vn: 'Quan hệ chủ hợp đồng (Bố, mẹ, con cái)',
        }),
        options: [
          { label: 'Bố', value: USER_RELATIONSHIP.FATHER },
          { label: 'Mẹ', value: USER_RELATIONSHIP.MOTHER },
          { label: 'Vợ', value: USER_RELATIONSHIP.WIFE },
          { label: 'Chồng', value: USER_RELATIONSHIP.HUSBAND },
          { label: 'Con', value: USER_RELATIONSHIP.CHILD },
          { label: 'Anh / chị / em', value: USER_RELATIONSHIP.SIBLINGS },
          { label: 'Khác', value: USER_RELATIONSHIP.OTHER },
        ],
      },
    }),
    createSchemaItem({
      Component: Select,
      name: 'isInsuranceCard',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Lấy thẻ bảo hiểm y tế cứng', {
        vn: 'Lấy thẻ bảo hiểm y tế cứng',
      }),
      componentProps: {
        placeholder: t('Lấy thẻ cứng bảo hiểm', {
          vn: 'Lấy thẻ cứng bảo hiểm',
        }),
        options: [
          { label: 'Có', value: 'yes' },
          { label: 'Không', value: 'no' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'email',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Email', { vn: 'Email' }),
      rules: [
        {
          type: 'email',
          message: t('Email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Email', { vn: 'Email' }),
      },
    }),
  ];
};
