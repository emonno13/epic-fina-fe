import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import MobileInsuranceDetail from '../mobile-insurance-detail';
import MobileInsuranceList from './mobile-insurance-list';

export const PRODUCT_TAB_DATA = (t) => {
  const insuranceText = t('Insurance', {
    en: 'Insurance',
    vn: 'Bảo hiểm',
  });
  return [
    {
      type: PRODUCT_TYPE.INSURANCE,
      featureId: PRODUCT_TYPE.INSURANCE,
      tabName: insuranceText,
      drawerProps: {
        title: insuranceText,
      },
      detailComponent: <MobileInsuranceDetail />,
      listComponent: <MobileInsuranceList />,
    },
  ];
};
