import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
  HInput,
  HInputReferral,
} from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';

export const PhoneFormSchema = () => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'telOrEmail',
      label: t('Email', { vn: 'Email' }),
      rules: [
        {
          required: true,
          message: t('Please enter Email', { vn: 'Vui lòng nhập Email' }),
        },
      ],
      rowProps: {
        gutter: [
          { xs: 24, sm: 24, md: 36, lg: 36 },
          { xs: 24, sm: 24, md: 36, lg: 36 },
        ],
      },
      className: 'm-b-0 p-b-0',
      componentProps: {
        placeholder: t('Email', { vn: 'Email' }),
        autoComplete: 'false',
        className: 'fina-form__input-control',
        modernLabel: true,
      },
    }),
    ...ReferralSchema(),
  ];
};

export const ReferralSchema = (defaultReferralCode = '') => {
  const { t } = useHTranslation('common');
  const { query } = useRouter();

  const isFinishStep = useMemo(() => query?.finish === '', [query]);
  const refCodeInQuery = useMemo(() => query?.refCode, [query]);
  const disableRefCodeField = useMemo(
    () =>
      (isFinishStep && refCodeInQuery) ||
      (refCodeInQuery && defaultReferralCode),
    [isFinishStep, refCodeInQuery, defaultReferralCode],
  );

  return [
    createSchemaItem({
      Component: HInputReferral,
      name: 'referralCode',
      initialValue: query?.refCode || defaultReferralCode,
      label: t('Referral code', { vn: 'Mã giới thiệu(nếu có)' }),
      className: 'referral-code',
      componentProps: {
        placeholder: t('Mã giới thiệu'),
        autoComplete: 'false',
        className: 'fina-form__input-control',
        disabled: disableRefCodeField,
        defaultValue: query?.refCode || defaultReferralCode,
        deleteWhiteSpace: true,
        modernLabel: true,
      },
    }),
  ];
};
