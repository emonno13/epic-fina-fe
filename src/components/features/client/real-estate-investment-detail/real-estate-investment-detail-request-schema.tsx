import {
  HInput,
  HInputNumber,
} from '@components/shared/common-form-elements/h-input';
import { InputPhoneNumberSchemaItem } from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';

export const RealEstateInvestmentDetailRequestSchema = () => {
  const { t } = useHTranslation('admin-common');

  const defaultSchema = [
    createSchemaItem({
      Component: HInput,
      label: t('FUND-NAME', {
        en: 'Full name',
        vn: 'Họ và tên',
      }),
      name: 'fullName',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter fullName', { vn: 'Vui lòng họ và tên' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter full name', { vn: 'Nhập họ và tên' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItem({
      Component: HInput,
      label: t('FUND-EMAIL', {
        en: 'Email',
        vn: 'Email',
      }),
      name: 'email',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter email', { vn: 'Vui lòng nhập email' }),
        },
        {
          type: 'email',
          message: t('Your email is not valid', {
            vn: 'Không đúng định dạng email',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter email', { vn: 'Nhập email' }),
        formatter: (value) => value.trim(),
      },
    }),
    InputPhoneNumberSchemaItem(),
    createSchemaItem({
      Component: HInputNumber,
      label: 'Số tiền cần vay',
      name: 'note',
      colProps: { span: 24 },
      rules: [{ required: true, message: 'Vui lòng nhập số tiền vay' }],
      componentProps: {
        placeholder: 'Nhập số tiền vay',
        modernLabel: true,
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
      },
    }),
  ];
  return defaultSchema;
};
