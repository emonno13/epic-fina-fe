import FeaturedNews from '@components/shared/client/featured-news';
import NewsDetail from '@components/shared/client/news-detail';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import { Button, Col, Row } from 'antd';
import { CallContactIcon, FanpageContactIcon, MailContactIcon } from 'icons';
import { useEffect, useRef } from 'react';
import ClientNewsDetailMoreInfo from './new-detail-more-info';

import './news-detail.module.scss';

const ClientNewsDetail = ({ newsData = {} }: any) => {
  const { t } = useHTranslation('admin-common');
  const clientNewsDetail: any = useRef(null);

  useEffect(() => {
    clientNewsDetail?.current?.scrollIntoView();
  }, [newsData]);

  return (
    <div className="client-news-detail-wrapper" ref={clientNewsDetail}>
      <ClientPageCover
        {...{
          title: t('client_news_cover_title', {
            en: 'News',
            vn: 'Tin tức',
          }),
          breadCrumbRoutes: [
            {
              path: '/tin-tuc',
              breadcrumbName: t('News', { vn: 'Tin tức' }),
            },
            {
              path: `/danh-muc-tin-tuc?categoryId=${newsData?.categoryId}`,
              breadcrumbName: newsData?.category?.name,
            },
            {
              path: '',
              breadcrumbName: newsData?.title,
            },
          ],
        }}
      />
      <NewsDetail data={newsData} />

      {newsData?.urlSupportButton && newsData?.textSupportButton && (
        <>
          <div className="max-w-1100 m-auto">
            <p className="news-detail-desc">
              Mọi thắc mắc cần hỗ trợ, ban có thể liên hệ với chúng tôi qua{' '}
              <b>Hotline 08 5749 8668,</b> gửi mail đến{' '}
              <b>support@fina.com.vn</b> hoặc để lại lời nhắn qua{' '}
              <b>Fanpage Fina - Cố vấn tài chính của riêng bạn.</b>
            </p>
            <div className="btn-contact-now">
              <Button type="link" href={newsData?.urlSupportButton}>
                {newsData?.textSupportButton}
              </Button>
            </div>
          </div>
          <div className="news-detail-contact max-w-1100 m-auto">
            <Row className="news-detail-contact-row">
              <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
                <div className="news-detail-contact-item">
                  <CallContactIcon />
                  <a href={'tel:0857498668'} rel="noreferrer">
                    08 5749 8668
                  </a>
                </div>
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
                <div className="news-detail-contact-item">
                  <MailContactIcon />
                  <a
                    href={'mailto:support@fina.com.vn'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    support@fina.com.vn
                  </a>
                </div>
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
                <div className="news-detail-contact-item">
                  <FanpageContactIcon />
                  <a
                    href={'https://www.facebook.com/finavietnam'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    fb.com/finavietnam
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}

      <ClientNewsDetailMoreInfo />
      <FeaturedNews isRelatedNews data={newsData} />
    </div>
  );
};

export default ClientNewsDetail;
