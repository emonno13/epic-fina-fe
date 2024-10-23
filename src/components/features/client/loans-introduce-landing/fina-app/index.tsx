/* eslint-disable @next/next/no-img-element */
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { SpiralIconSvg } from '@icons';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@lib/utils/mobile';
import { Col, Row } from 'antd';
import { ACHIEVEMENTS } from '../constants';

import './fina-app.module.scss';

const FinaApp = () => {
  return (
    <div id="fina-app" className="fina-app">
      <HScrollAnimation>
        <div className="loans-introduce-container">
          <Row>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 8 }}>
              <div className="fina-app-img">
                <SpiralIconSvg className="icon-spiral" />
                <img src="/assets/images/fina-app.png" />
              </div>
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 12, lg: 16 }}>
              <div className="fina-app-content">
                <h2 className="fina-app-content-title">
                  Tìm ra giải pháp -{' '}
                  <span className="text-loans-hightlight">
                    Mua nhà được ngay
                  </span>
                </h2>
                <p className="fina-app-content-description">
                  FINA cung cấp giải pháp tối ưu giúp khách hàng sở hữu nhà
                  nhanh chóng, tiếp cận và so sánh các gói vay mua nhà với lãi
                  suất hấp dẫn, hỗ trợ đăng ký, hoàn thiện thủ tục giấy tờ hoàn
                  toàn miễn phí.
                </p>

                <div className="fina-app-content-download">
                  <p className="fina-app-content-download-title">
                    Tải App ngay
                  </p>
                  <div className="app-icon">
                    <a
                      {...{
                        className: 'app-icon-link',
                        target: '_blank',
                        rel: 'noopener',
                        href: APP_STORE_LINK,
                      }}
                    >
                      <img
                        src="/assets/images/client_footer_app_store_image.png"
                        height="45"
                      />
                    </a>

                    <a
                      {...{
                        className: 'app-icon-link',
                        target: '_blank',
                        rel: 'noopener',
                        href: GOOGLE_PLAY_LINK,
                      }}
                    >
                      <img
                        src="/assets/images/client_footer_chplay_image.png"
                        height="45"
                      />
                    </a>
                  </div>
                </div>

                <div className="fina-app-content-achievement">
                  <Row gutter={[24, 24]}>
                    {ACHIEVEMENTS?.map((el, index) => (
                      <Col {...{ xs: 12, sm: 12, md: 12, lg: 6 }} key={index}>
                        <div className="fina-app-content-achievement-item">
                          {el?.icon}
                          <h2>{el?.value}</h2>
                          <p>{el?.description}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default FinaApp;
