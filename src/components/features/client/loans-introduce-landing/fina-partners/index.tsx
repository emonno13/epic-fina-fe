/* eslint-disable @next/next/no-img-element */
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import Marquee from 'react-fast-marquee';
import { FINA_BANKS, FINA_PARTNERS } from '../constants';

import './fina-partners.module.scss';

const FinaPartners = () => {
  return (
    <div id="fina-partners" className="fina-partners">
      <HScrollAnimation>
        <div className="loans-introduce-container">
          <h2 className="fina-partners-title">
            Đối Tác Của <span className="text-loans-hightlight">FINA</span>
          </h2>

          <div className="fina-partners-desktop">
            <MarqueeComponent data={FINA_BANKS} direction="left" />
          </div>

          <div className="fina-partners-mobile">
            <MarqueeComponent
              data={FINA_BANKS.slice(0, FINA_BANKS.length / 2)}
              direction="left"
              className="fina-partners-mobile-first"
            />
            <MarqueeComponent
              data={FINA_BANKS.slice(FINA_BANKS.length / 2, FINA_BANKS.length)}
              direction="left"
            />
          </div>

          <div className="fina-partners-spacing"></div>

          <div className="fina-partners-desktop">
            <MarqueeComponent data={FINA_PARTNERS} direction="right" />
          </div>

          <div className="fina-partners-mobile">
            <MarqueeComponent
              data={FINA_PARTNERS.slice(0, FINA_PARTNERS.length / 2)}
              direction="right"
              className="fina-partners-mobile-first"
            />
            <MarqueeComponent
              data={FINA_PARTNERS.slice(
                FINA_PARTNERS.length / 2,
                FINA_PARTNERS.length,
              )}
              direction="right"
            />
          </div>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default FinaPartners;

const MarqueeComponent = ({ direction, className = '', data }) => {
  return (
    <Marquee speed={50} direction={direction} className={className} delay={2}>
      {data?.map((partner) => (
        <div key={partner} className="fina-partner-item">
          <img src={`/assets/images/${partner}`} alt={partner} />
        </div>
      ))}
    </Marquee>
  );
};
