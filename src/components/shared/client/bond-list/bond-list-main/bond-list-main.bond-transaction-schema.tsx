import { HInput } from '@components/shared/common-form-elements/h-input';
import { ReferralSchema } from '@components/shared/user/signup/phone-form/phone-form-schema';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import {
  createSchemaItem,
  createSchemaItemWithNewLabel,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Radio } from 'antd';
import { TYPE_ACTIONS } from '../constants';
import ClientInformationBonForm from './bond-list-main.bond-info';

export const ClientBondTransactionFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { transport } = props;
  const { currentUser } = useAuth();

  const defaultSchema = [
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('BOND-NAME', {
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
        placeholder: t('Enter full name', { vn: 'Nhập họ và tên' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('BOND-EMAIL', {
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
        placeholder: t('Enter email', { vn: 'Nhập email' }),
        formatter: (value) => value.trim(),
      },
    }),
    createSchemaItemWithNewLabel({
      Component: HInput,
      label: t('BOND-PHONE', {
        en: 'phone',
        vn: 'Số điện thoại',
      }),
      name: 'phone',
      colProps: { span: 24 },
      rules: [
        {
          required: true,
          message: t('Please enter phone', {
            vn: 'Vui lòng nhập số điện thoại',
          }),
        },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter phone', { vn: 'Nhập số điện thoại' }),
        formatter: (value) => value.trim(),
      },
    }),
    ...(transport?.type === TYPE_ACTIONS.BUY
      ? [
          createSchemaItem({
            Component: Radio.Group,
            label: t('BOND-PROESSIONAL-INVESTOR', {
              en: 'Professional Investor',
              vn: 'Nhà đầu tư chuyên nghiệp',
            }),
            rules: [{ required: true }],
            className: 'item-professional-investor',
            name: 'professionalInvestor',
            componentProps: {
              options: [
                { label: t('Yes', { vn: 'Có' }), value: 'yes' },
                { label: t('No', { vn: 'Không' }), value: 'no' },
              ],
            },
          }),
        ]
      : []),
    ...ReferralSchema(currentUser?.referralCode),
    ...(transport?.type === TYPE_ACTIONS.BUY
      ? [
          createSchemaItem({
            Component: ClientInformationBonForm,
            name: 'quantity',
            componentProps: {
              bond: transport.bond,
              controls: false,
            },
            rules: [
              { required: true, message: t('Enter quantity') },
              () => ({
                validator(rule, value) {
                  if (parseFloat(value) <= 0) {
                    return Promise.reject(
                      t('Nhập số lượng lớn hơn 0', {
                        vn: 'Enter a number greater than 0',
                      }),
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ],
            colProps: { span: 24 },
          }),
        ]
      : []),
    ...(transport?.type !== TYPE_ACTIONS.BUY
      ? [
          createSchemaItem({
            Component: Input.TextArea,
            name: 'note',
            colProps: { span: 24 },
            label: t('Note', { vn: 'Ghi chú' }),
            componentProps: {
              className: 'bond-schema-note-input',
            },
          }),
        ]
      : []),
  ];
  return defaultSchema;
};
