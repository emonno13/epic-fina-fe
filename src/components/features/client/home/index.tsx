import ClientHomeWhyChooseUs from './client-home.why-choose-us';
import ClientHomePartner from './client-home.partner';
import ClientHomeFeaturedProducts from './client-home-featured-products';
import ClientHomeUnderBanner from './client-home.under-banner';
import ClientHomeBanner from './client-home-banner';
import ClientHomeNews from './client-home-news';
import ClientHomeMission from './client-home-mission';
import AppIntroduction from './app-introduction';
import ClientOurAchievements from './client-our-achievements';

import './clien-home.module.scss';

const ClientHome = ({ banners = [] }) => {
  return (
    <div>
      <ClientHomeBanner {...{ banners }} />
      <ClientHomeUnderBanner />
      <ClientHomeFeaturedProducts />
      <ClientHomeWhyChooseUs />
      <AppIntroduction />
      <ClientHomeMission />
      <ClientHomePartner />
      <ClientOurAchievements />
      <ClientHomeNews />
    </div>
  );
};

export default ClientHome;
