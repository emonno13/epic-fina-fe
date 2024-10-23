import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@lib/utils/mobile';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { AppIntroductionData } from './constants';

import './app-introduction.module.scss';

const AppIntroductionStatPanel = ({ data, description }) => {
  return (
    <div className="app-introduction-stat-panel">
      <h2 className="app-introduction-stat-panel-data">{data}</h2>
      <p className="app-introduction-stat-panel-description">{description}</p>
    </div>
  );
};

const AppIntroduction = () => {
  const { t } = useHTranslation('common');
  const data = AppIntroductionData(t);
  const isMobile = useIsMobile();
  return (
    <div className="app-introduction">
      <div className="app-introduction-container max-w-1100 m-auto">
        <h2 className="app-introduction-title">
          {t('Find a solution - buy a home now!', {
            vn: 'Tìm ra giải pháp - mua ngay được nhà!',
          })}
        </h2>
        <p className="app-introduction-desc">
          {t(
            'FINA provides an optimal solution to help customers own a home quickly, access and compare home loan packages with attractive interest rates, support registration, complete paperwork completely free of charge.',
            {
              vn: 'FINA cung cấp giải pháp tối ưu giúp khách hàng sở hữu nhà nhanh chóng, tiếp cận và so sánh các gói vay mua nhà với lãi suất hấp dẫn, hỗ trợ đăng ký, hoàn thiện thủ tục giấy tờ hoàn toàn miễn phí.',
            },
          )}
        </p>
        <div className="app-introduction-content">
          <div className="app-introduction-links-container">
            <p className="app-introduction-download">
              {t('Download the app now', { vn: 'Tải app ngay' })}
            </p>
            <div className="app-introduction-links">
              <Link href={GOOGLE_PLAY_LINK} passHref>
                <div className="app-introduction-links__download">
                  <Image
                    src={'/assets/images/download-on-google-play.png'}
                    alt="download on google play"
                    layout="responsive"
                    width={150}
                    height={50}
                  />
                </div>
              </Link>
              <Link href={APP_STORE_LINK} passHref>
                <div className="app-introduction-links__download">
                  <Image
                    src={'/assets/images/download-on-app-store.png'}
                    alt="download on app store"
                    layout="responsive"
                    width={150}
                    height={50}
                  />
                </div>
              </Link>
            </div>
          </div>
          <Row gutter={isMobile ? [16, 24] : [30, 30]}>
            {data.map((item, index) => (
              <Col
                key={`app-introduction-stat-${index}`}
                {...{ xs: 12, sm: 12, md: 12, lg: 6 }}
              >
                <AppIntroductionStatPanel {...item} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="app-introduction-phone-image">
          <Image
            src="/assets/images/app-introduction-iphone-in-hand.png"
            alt="phone on hand"
            width={715}
            height={500}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default AppIntroduction;
