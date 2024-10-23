import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { HInput } from '../common-form-elements/h-input';

const InputPhoneNumberSchemaItem = (props: HFormItemProps = {}) => {
  const { componentProps = {}, ...schemaItemProps } = props;
  const { t } = useHTranslation('admin-common');
  return createSchemaItem({
    Component: HInput,
    name: ['tels', 0, 'tel'],
    label: t('Tels', { vn: 'Số điện thoại' }),
    colProps: { xs: 24, sm: 24, md: 24 },
    ...schemaItemProps,
    rules: [
      {
        required: true,
        message: t('Phone is required', { vn: 'Vui lòng nhập số điện thoại' }),
      },
      {
        pattern: /^0[0-9]{9}$/gm,
        message: t('Your phone is not valid', {
          vn: 'Không đúng định dạng số điện thoại',
        }),
      },
    ],
    componentProps: {
      normalize: (value, prevVal, prevVals) => value.trim(),
      placeholder: t('Enter the phone number', { vn: 'Nhập số điện thoại' }),
      modernLabel: true,
      ...componentProps,
    },
  });
};

const InputFullNameSchemaItem = (props: HFormItemProps = {}) => {
  const { componentProps = {}, ...schemaItemProps } = props;
  const { t } = useHTranslation('admin-common');

  return createSchemaItem({
    Component: HInput,
    label: t('Full name', { vn: 'Họ và tên' }),
    colProps: { span: 24 },
    name: 'fullName',
    rules: [
      {
        required: true,
        message: t('Full name is required', { vn: 'Xin vui lòng nhập họ tên' }),
      },
    ],
    ...schemaItemProps,
    componentProps: {
      modernLabel: true,
      placeholder: t('Enter your full name', { vn: 'Nhập họ và tên' }),
      ...componentProps,
    },
  });
};

const InputEmailSchemaItem = (props: HFormItemProps = {}) => {
  const { componentProps = {}, ...schemaItemProps } = props;
  const { t } = useHTranslation('admin-common');

  return createSchemaItem({
    Component: HInput,
    label: 'Email',
    colProps: { span: 24 },
    name: 'email',
    rules: [
      {
        required: true,
        message: t('Email is required', { vn: 'Xin vui lòng nhập email' }),
      },
      {
        type: 'email',
        message: t('Your email is not valid', {
          vn: 'Không đúng định dạng email',
        }),
      },
    ],
    ...schemaItemProps,
    componentProps: {
      modernLabel: true,
      placeholder: t('Enter your email', { vn: 'Nhập email' }),
      ...componentProps,
    },
  });
};

const CMNDSchemaItem = (props: HFormItemProps = {}) => {
  const { componentProps = {}, ...schemaItemProps } = props;
  const { t } = useHTranslation('admin-common');
  return createSchemaItem({
    Component: HInput,
    name: 'idNumber',
    colProps: props?.colProps || { xs: 24, sm: 24, md: 24 },
    rowProps: { gutter: { xs: 24, md: 24 } },
    label: 'CMND/CCCD',
    rules: [
      {
        required: true,
        message: t('Please enter id number', {
          vn: 'Vui lòng nhập số căn cước công dân',
        }),
      },
      {
        pattern: /^[0-9]*$/,
        message: t('CMND/CCCD is not valid', {
          vn: 'Không đúng định dạng CMND/CCCD',
        }),
      },
    ],
    ...schemaItemProps,
    componentProps: {
      modernLabel: true,
      placeholder: t('Enter ID Number', { vn: 'Nhập CMND/CCCD' }),
      ...componentProps,
    },
  });
};

export {
  CMNDSchemaItem,
  InputEmailSchemaItem,
  InputFullNameSchemaItem,
  InputPhoneNumberSchemaItem,
};
