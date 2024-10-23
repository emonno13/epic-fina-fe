import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import {
  HInput,
  HInputNumber,
} from '@components/shared/common-form-elements/h-input';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem } from '@schema-form/h-types';
import { useContext } from 'react';
import { debounce } from 'underscore';
import { SellActionContext } from './context';
import { loadRedemptionFeeEstimation } from './utils';

export const FormSellFundSchema = (props) => {
  const { form, sellMin, holdingVolume } = props?.transport ?? {};
  const { t } = useHTranslation('common');
  const { setVolume, setFee, product, productProgram, setLoading } =
    useContext(SellActionContext);

  const handleVolumeChange = async (value) => {
    if (value < sellMin) return;
    if (value > holdingVolume) return;
    setVolume(value);

    setLoading(true);
    const fee = await loadRedemptionFeeEstimation(
      value,
      product?.id,
      productProgram?.id,
    );
    form?.setFieldsValue({
      valueCCQ: ConverterUtils.formatNumber(
        ((product?.navCurrent ?? 0) * value).toFixed(0),
      ),
    });
    setFee(fee);
    setLoading(false);
  };

  return [
    createSchemaItem({
      Component: HInputNumber,
      name: 'volume',
      label: t('Quantity of FC to sell', { vn: 'Số lượng CCQ cần bán' }),
      rules: [
        {
          required: true,
          message: t('Please enter quantity', { vn: 'Vui lòng nhập số lượng' }),
        },
        {
          validator: (rule, value) => {
            if (value < sellMin)
              return Promise.reject(
                t(`The number of assets is not less than ${sellMin}`, {
                  vn: `Số lượng tài sản không dưới ${sellMin}`,
                }),
              );
            if (value > holdingVolume)
              return Promise.reject(
                t(`The number of assets is not greater than ${holdingVolume}`, {
                  vn: `Số lượng tài sản không lớn hơn ${holdingVolume}`,
                }),
              );
            return Promise.resolve();
          },
        },
      ],
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 8, md: 12 } },
      componentProps: {
        decimalNumber: 9,
        modernLabel: true,
        style: { width: '100%' },
        placeholder: t(`The number of assets is not less than ${sellMin}`, {
          vn: `Số lượng tài sản không dưới ${sellMin}`,
        }),
        onChange: debounce(handleVolumeChange, 700),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'navCurrent',
      label: t('NAV most recent period', { vn: 'NAV kỳ gần nhất' }),
      colProps: { xs: 24, md: 12 },
      componentProps: {
        modernLabel: true,
        placeholder: t('NAV most recent period', { vn: 'NAV kỳ gần nhất' }),
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'matchingSession',
      label: t('Matching session', { vn: 'Phiên khớp lệnh' }),
      colProps: { xs: 24, md: 12 },
      componentProps: {
        modernLabel: true,
        placeholder: t('Matching session', { vn: 'Phiên khớp lệnh' }),
        disabled: true,
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'valueCCQ',
      colProps: { xs: 24, md: 24 },
      label: t('Corresponding value', { vn: 'Giá trị tương ứng' }),
      componentProps: {
        modernLabel: true,
        placeholder: t('Corresponding value', { vn: 'Giá trị tương ứng' }),
        disabled: true,
      },
    }),
  ];
};
