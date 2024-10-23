import IframeVideo from './components/about-us/iframe-video';
import FinaPartner from './components/about-us/partner';
import VisionAndMissionFina from './components/about-us/vision-and-mission';
import WhatIsFina from './components/about-us/what-is-fina';

import './about-us.module.scss';

const RecruitAboutUs = () => {
  return (
    <div>
      <WhatIsFina />
      <IframeVideo />
      {/*<DevelopmentProcess />*/}
      <VisionAndMissionFina />
      <FinaPartner />
    </div>
  );
};

export default RecruitAboutUs;
