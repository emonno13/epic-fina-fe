import { useState } from 'react';

import { Checkbox, Divider, notification } from 'antd';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { useDocumentDetail, useSetDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HFeatureForm } from '../../../../../../../schema-form/features/forms/h-feature-form';
import { createSchemaItem } from '../../../../../../../schema-form/h-types';
import { LoanProductCommissionSettingReceiveSchemaForm } from '../../../../commission/settings/loan-product/commission-receive/detail-schema-form';
import { LoanProductCommissionSettingSpendSchemaForm } from '../../../../commission/settings/loan-product/commission-spend/detail-schema-form';

export const ProductDetailCommissionSetting = () => {
  const { t } = useHTranslation('admin-common');
  const productDetail = useDocumentDetail();
  const updateProductDetail = useSetDocumentDetail();
  const newProductDetail = { ...productDetail };
  const [disableCommissionReceive, setDisableCommissionReceive] = useState(!productDetail?.commissionSettingReceive);
  const [disableCommissionSpend, setDisableCommissionSpend] = useState(!productDetail?.commissionSettingSpend);

  // TODO: check why this method is not working in this scope
  const handleBeforeSubmit = (form: any) => {
    const formulaSetting = form.getFieldValue('formula');
    console.log('formulaSetting: ', formulaSetting);
    const greaterThanRateInfo: any = formulaSetting?.greaterThanRateInfo;
    const lessThanRateInfo: any = formulaSetting?.lessThanRateInfo;

    let totalPercentWithGreaterThanRate = (+greaterThanRateInfo?.source || 0) + (+greaterThanRateInfo?.handlingStaff || 0);
    let totalPercentWithLessThanRate = (+lessThanRateInfo?.source || 0) + (+lessThanRateInfo?.handlingStaff || 0);

    if (greaterThanRateInfo?.receivers?.length) {
      totalPercentWithGreaterThanRate += greaterThanRateInfo?.receivers
        ?.map(item => +item?.commissionPercent || 0)
        ?.reduce((accumulator, current) => {
          return accumulator + current;
        });
    }

    if (lessThanRateInfo?.receivers?.length) {
      totalPercentWithLessThanRate += lessThanRateInfo?.receivers
        ?.map(item => +item?.commissionPercent || 0)
        ?.reduce((accumulator, current) => {
          return accumulator + current;
        });
    }

    if (totalPercentWithGreaterThanRate > 100 || totalPercentWithLessThanRate > 100) {
      notification.error({ message: 'Tổng phần trăm chi cho các đối tượng không được lớn hơn 100%' });
      return false;
    }

    return true;
  };

  if (!productDetail?.commissionSettingReceive) {
    const commissionSettingReceive = productDetail?.category?.commissionSettings?.find((item: any) => item.type === 'receive');
    newProductDetail.commissionSettingReceive = commissionSettingReceive || {};
  }

  if (!productDetail?.commissionSettingSpend) {
    const commissionSettingSpend = productDetail?.category?.commissionSettings?.find((item: any) => item.type === 'spend');
    newProductDetail.commissionSettingSpend = commissionSettingSpend || {};
  }

  updateProductDetail(newProductDetail);

  return (
    <HFeatureForm {...{
      schema: () => [
        createSchemaItem({
          Component: Divider,
          componentProps: {
            orientation: 'center',
            children: (
              <>
                <span className={'m-r-10'}>{t('HOA HỒNG FINA NHẬN')}</span>
                <Checkbox onChange={() => setDisableCommissionReceive(!disableCommissionReceive)} checked={disableCommissionReceive}>
                  {t('Áp dụng theo danh mục sản phẩm')}
                </Checkbox>
              </>
            ),
          },
        }),
        ...LoanProductCommissionSettingReceiveSchemaForm('commissionSettingReceive', false, disableCommissionReceive),
        createSchemaItem({
          Component: Divider,
          componentProps: {
            orientation: 'center',
            children: (
              <>
                <span className={'m-r-10'}>{t('HOA HỒNG FINA TRẢ')}</span>
                <Checkbox onChange={() => setDisableCommissionSpend(!disableCommissionSpend)} checked={disableCommissionSpend}>
                  {t('Áp dụng theo danh mục sản phẩm')}
                </Checkbox>
              </>
            ),
          },
        }),
        ...LoanProductCommissionSettingSpendSchemaForm('commissionSettingSpend', false, disableCommissionSpend),
      ],
      hideSubmitAndContinueButton: true,
      beforeSubmit: handleBeforeSubmit,
      withRelations: ['createdBy', 'updatedBy'],
    }}/>
  );
};
