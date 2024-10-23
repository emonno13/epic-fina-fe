import AlmaCamRanhResort from './cam-ranh-resort';
import AlmaCondition from './condition';
import AlmaFaq from './faq';
import AlmaHeroBanner from './hero-banner';
import AlmaOtherOffers from './other-offers';
import AlmaRegisterNow from './register-now';
import AlmaReviews from './reviews';
import AlmaService from './service';
import AlmaSpecialOffer from './special-offer';

import './alma-landing.module.scss';

const ClientAlmaLanding = () => {
  return (
    <div className="client-alma-landing">
      <AlmaHeroBanner />
      <AlmaSpecialOffer />
      <AlmaCondition />
      <AlmaCamRanhResort />
      <AlmaService />
      <AlmaRegisterNow />
      <AlmaReviews />
      <AlmaFaq />
      <AlmaOtherOffers />
    </div>
  );
};

export default ClientAlmaLanding;
