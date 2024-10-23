import FinaPortalHome from './fina-portal-home';
import { FinaPortalInputInfoCustom } from './fina-portal-input-info-custom';
import { FinaPortalProvider } from './fina-portal-context';
import FinaPortalOnPhone from './fina-portal-on-phone';
import FinaPortalCounselling from './fina-portal-counselling';
import FinaPortalBorrowerIntroduction from './fina-portal-borrower-introduction';
import FinaPortalFormSuccess from './fina-portal-form-success';

import './styles.module.scss';

const FinaPortalPage = ({ banners }) => {
  return (
    <div className="fina-portal-page">
      <FinaPortalProvider {...{ banners }}>
        <FinaPortalHome/>
        <FinaPortalOnPhone/>
        <FinaPortalCounselling/>
        <FinaPortalBorrowerIntroduction/>
        <FinaPortalFormSuccess/>
        <FinaPortalInputInfoCustom/>
      </FinaPortalProvider>
    </div>
  );
};

export default FinaPortalPage;
