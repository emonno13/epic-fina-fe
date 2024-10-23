import { useHTranslation } from '@lib/i18n';
import { useIsAuthenticated } from '@lib/providers/auth';
import ProductsMenuContentInsuranceHeader from '../product-menu-content-insurance-header';
import PersonalInsuranceListAuthen from './personal-insurance-list.authen';
import PersonalInsuranceListNotAuthen from './personal-insurance-list.not-authen';

import './personal-insurance-list.module.scss';

const PersonalInsuranceList = () => {
  const isAuthenticated = useIsAuthenticated();
  const { t } = useHTranslation('mobile-home');

  return (
    <>
      <ProductsMenuContentInsuranceHeader
        {...{
          title: t('Your insurances', {
            en: 'Your insurances',
            vn: 'Bảo hiểm của bạn',
          }),
        }}
      />
      {!isAuthenticated && <PersonalInsuranceListNotAuthen />}
      {isAuthenticated && <PersonalInsuranceListAuthen />}
    </>
  );
};

export default PersonalInsuranceList;
