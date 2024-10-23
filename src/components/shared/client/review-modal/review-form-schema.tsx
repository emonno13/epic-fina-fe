import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { useIsAuthenticated } from '@lib/providers/auth';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Divider, Input, Rate } from 'antd';
import { useMemo } from 'react';
import { getRateTooltips } from './constants';

const RateWithText = ({ value, onChange }) => {
  const { t } = useHTranslation('common');
  const rateToolTips = getRateTooltips(t);
  const text = useMemo(() => {
    return rateToolTips.find((_, index) => value === index + 1) || '';
  }, [value, rateToolTips]);
  return (
    <div className="review-form-rate-with-text">
      <Rate
        {...{
          value,
          onChange,
          tooltips: rateToolTips,
        }}
      />
      <p className="review-form-rate-with-text__label">{text}</p>
    </div>
  );
};

export const ReviewFormSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  const isAuthenticated = useIsAuthenticated();
  const defaultSchema = [
    createSchemaItem({
      Component: RateWithText,
      name: 'rate',
      rules: [
        {
          required: true,
          message: t('Rate is required!', { vn: 'Vui lòng chọn đánh giá!' }),
        },
      ],
      colProps: { span: 24 },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'message',
      label: t('Share your reviews', { vn: 'Chia sẻ đánh giá của bạn' }),
      componentProps: {
        placeholder: t('Write reviews', { vn: 'Viết đánh giá' }),
        autoSize: {
          minRows: 4,
          maxRows: 4,
        },
      },
    }),
  ];

  if (!isAuthenticated) {
    return [
      ...defaultSchema,
      createSchemaItem({
        Component: Divider,
      }),
      createSchemaLabelItem({
        componentProps: {
          label: t('Your information', { vn: 'Nhập thông tin của bạn' }),
          titleTooltip: t('Your information', { vn: 'Nhập thông tin của bạn' }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: ['metaData', 'fullName'],
        label: t('Full name', { vn: 'Họ và tên' }),
        rules: [
          {
            required: true,
            message: t('Full name is required!', {
              vn: 'Vui lòng nhập họ và tên!',
            }),
          },
        ],
        componentProps: {
          placeholder: t('Enter Full name', { vn: 'Nhập họ và tên' }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: ['metaData', 'email'],
        label: 'Email',
        rules: [
          {
            required: true,
            message: t('Email is required!', { vn: 'Vui lòng nhập email!' }),
          },
          {
            type: 'email',
            message: t('Email is not valid!', { vn: 'Sai định dạng email!' }),
          },
        ],
        componentProps: {
          placeholder: t('Enter email', { vn: 'Nhập email' }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: ['metaData', 'tel'],
        label: t('Phonenumber', { vn: 'Số điện thoại' }),
        rules: [
          {
            required: true,
            message: t('Phonenumbber is required!', {
              vn: 'Vui lòng nhập số điện thoại'!,
            }),
          },
        ],
        componentProps: {
          placeholder: t('Enter email', { vn: 'Nhập số điện thoại' }),
        },
      }),
    ];
  }
  return defaultSchema;
};
