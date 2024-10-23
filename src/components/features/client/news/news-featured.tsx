import HCarousel from '@components/shared/common/h-carousel';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row } from 'antd';
import { IconArrowLeft } from 'icons/rsvgs/arrow-left';
import { IconArrowRight } from 'icons/rsvgs/arrow-right';
import { useEffect, useState } from 'react';
import { ITEM_SLIDE, NUMBER_NEW, NUMBER_OUTSTANDING } from './constants';
import NewsSlideItem from './news-slide-item';

import './news.module.scss';

const NewsFeatured = () => {
  const { t } = useHTranslation('common');
  const [dataNewsFeatured, setDataNewsFeatured] = useState<any>([]);

  const handleFetchNewsFeatured = () => {
    FormUtils.submitForm(
      {
        request: {
          numberOutstanding: NUMBER_OUTSTANDING,
          numberNew: NUMBER_NEW,
        },
      },
      {
        endpoint: endpoints.endpointWithApiDomain('/news/news-random'),
        method: 'get',
        onGotSuccess: (response) => setDataNewsFeatured(response?.data),
      },
    );
  };

  useEffect(() => {
    handleFetchNewsFeatured();
  }, []);

  const dataNewsFeaturedConvert = [
    dataNewsFeatured.slice(0, ITEM_SLIDE),
    dataNewsFeatured.slice(ITEM_SLIDE, ITEM_SLIDE * 2),
    dataNewsFeatured.slice(ITEM_SLIDE * 2, ITEM_SLIDE * 3),
  ];

  return (
    <div className="client-news-featured">
      <h2 className="client-news-featured-title">
        <span>{t('Featured news', { vn: 'Tin nổi bật' })}</span>
        {/* <span>
          {t('Stay up to date with the hottest news on real estate market trends, insurance, domestic and foreign loans.', { vn: 'Luôn cập nhật những tin tức nóng hổi nhất về xu thế thị trường bất động sản, bảo hiểm, các khoản vay trong và ngoài nước.' })}
        </span> */}
      </h2>

      <HCarousel
        {...{
          autoplay: false,
          speed: 300,
          slidesToShow: 1,
          arrows: true,
          prevArrow: (
            <span>
              <IconArrowLeft />
            </span>
          ),
          nextArrow: (
            <span>
              <IconArrowRight />
            </span>
          ),
        }}
        className="client-news-featured-carousel"
      >
        {dataNewsFeaturedConvert?.map(
          (newsData, index) =>
            newsData.length > 0 && (
              <NewsFeaturedSlideItem {...{ newsData }} key={index} />
            ),
        )}
      </HCarousel>
    </div>
  );
};

export default NewsFeatured;

const NewsFeaturedSlideItem = ({ newsData }) => {
  const isMobile = useIsMobile();

  return (
    <div className="news-featured-slide-item">
      <Row gutter={isMobile ? [12, 12] : [16, 16]}>
        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <NewsSlideItem newsData={newsData[0]} position={0} />
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <Row gutter={[16, 16]}>
            {newsData.slice(1, 5).map((data) => (
              <Col {...{ xs: 12, sm: 12, md: 12 }} key={data.id}>
                <NewsSlideItem newsData={data} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
