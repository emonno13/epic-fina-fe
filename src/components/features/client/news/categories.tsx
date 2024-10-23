/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { rgbDataURL } from '@components/shared/atom/rgb';
import NewsList from '@components/shared/client/news-list';
import { Link } from '@components/shared/link';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row, Tabs } from 'antd';
import { ArrowRightIcon } from 'icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MAX_ITEM_NEWS, MAX_ITEM_RENDER } from './constants';
import NewsCustomItemLeft from './news-custom-item-left';

import './news.module.scss';

const { TabPane } = Tabs;

const NewsCategories = () => {
  return (
    <div className="news-categories">
      <NewsCategoriesFetching />
    </div>
  );
};

export default NewsCategories;

const NewsCategoriesFetching = () => {
  return (
    <HFeature
      {...{
        featureId: 'homeNewsCategory',
        nodeName: 'news/check-category-news',
      }}
    >
      <HSearchFormHiddenAble />
      <NewsCategoriesList />
    </HFeature>
  );
};

const NewsCategoriesList = () => {
  const { t } = useHTranslation('common');

  const newsCategories = useTableSourceData() || [];
  const [categoryActive, setCategoryActive] = useState('');
  const [dataNews, setDataNews] = useState<any>({ data: [], total: 0 });

  const operations = {
    left: <span className="news-categories-title">Danh mục</span>,
    right: (
      <Link href={`/danh-muc-tin-tuc?categoryId=${categoryActive}`}>
        <div className={'news-categories-title-right'}>
          {t('See all', { vn: 'Xem tất cả' })}
          <ArrowRightIcon />
        </div>
      </Link>
    ),
  };

  const handleFetchNewsByCategory = () => {
    FormUtils.submitForm(
      {},
      {
        nodeName: 'news/public',
        isSearchForm: true,
        hiddenValues: {
          filter: {
            limit: MAX_ITEM_NEWS,
            skip: 0,
            where: {
              categoryId: categoryActive,
              isActive: true,
            },
          },
        },
        onGotSuccess: (response) => setDataNews(response),
      },
    );
  };

  useEffect(() => {
    setCategoryActive(newsCategories?.length > 0 ? newsCategories[0]?.id : '');
  }, [newsCategories]);

  useEffect(() => {
    handleFetchNewsByCategory();
  }, [categoryActive]);

  return (
    <Tabs tabBarExtraContent={operations} onChange={setCategoryActive}>
      {newsCategories?.map((dataNew) => (
        <TabPane tab={dataNew?.name} key={dataNew?.id}>
          <NewsCategoryList dataNews={dataNews?.data} />
        </TabPane>
      ))}
    </Tabs>
  );
};

const NewsCategoryList = ({ dataNews }) => {
  const isMobile = useIsMobile();
  let dataNewsTop = [];
  let dataNewsBottom = [];

  if (dataNews?.length >= MAX_ITEM_RENDER) {
    dataNewsTop = dataNews.slice(0, MAX_ITEM_RENDER);
    dataNewsBottom = dataNews.slice(MAX_ITEM_RENDER, dataNews?.length);
  }

  return (
    <div className="news-categories-list">
      {dataNews.length >= MAX_ITEM_RENDER && (
        <>
          <Row gutter={[16, 16]} className="news-categories-list-row">
            <Col {...{ xs: 24, sm: 24, md: 12 }}>
              <NewsCustomItemLeft newsData={dataNewsTop[0]} />
            </Col>
            <Col
              {...{ xs: 24, sm: 24, md: 12 }}
              className="news-categories-list-item-right"
            >
              {dataNewsTop.slice(1, MAX_ITEM_RENDER).map((el: any) => (
                <a
                  href={`/tin-tuc/${el?.slug}`}
                  key={el?.id}
                  target="_blank"
                  rel="noreferrer"
                  className="news-categories-list-item-link"
                >
                  <div className="news-categories-list-item">
                    {/* <img src={el?.image} alt={el?.title} /> */}
                    <div className="news-categories-list-item-image">
                      <Image
                        placeholder="blur"
                        blurDataURL={rgbDataURL(220, 220, 220)}
                        src={el?.image}
                        width={isMobile ? 112 : 200}
                        height={isMobile ? 84 : 150}
                        alt={el?.title}
                        layout="responsive"
                      />
                    </div>
                    <div className="news-categories-list-item-right-wrapper">
                      <h1
                        className="news-categories-list-item-title"
                        dangerouslySetInnerHTML={{ __html: el?.title }}
                      />
                      <p className="news-categories-list-item-author">
                        {el?.author} .
                        {ConverterUtils.dateConverterToString(el?.createdAt)}
                      </p>
                      <p
                        className="news-categories-list-item-desc"
                        dangerouslySetInnerHTML={{ __html: el?.description }}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </Col>
          </Row>

          <NewsList data={dataNewsBottom} />
        </>
      )}
      {dataNews.length < MAX_ITEM_RENDER && <NewsList data={dataNews} />}
    </div>
  );
};
