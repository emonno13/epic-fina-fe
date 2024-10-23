import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NewsListItem } from '../news-list';
import FeaturedNewsCarousel from './featured-news.carousel';

import './featured-news.module.scss';

const FeaturedNews = ({ data }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<any[]>([]);
  const { t } = useHTranslation('admin-common');
  const { query } = useRouter();

  const fetchNews = async () => {
    setLoading(true);

    if (data) {
      await FormUtils.submitForm(
        {},
        {
          nodeName: 'news/public',
          isSearchForm: true,
          withRelations: ['category'],
          hiddenValues: {
            filter: {
              limit: 12,
              skip: 0,
              where: {
                categoryId: data?.categoryId,
                isActive: true,
                id: { nin: [data?.id] || [] },
              },
            },
          },
          onGotSuccess: (response) => setNews(response?.data),
        },
      );
    } else {
      await FormUtils.submitForm(
        {
          request: {
            numberOutstanding: 6,
            numberNew: 6,
          },
        },
        {
          endpoint: endpoints.endpointWithApiDomain('/news/news-random'),
          method: 'get',
          onGotSuccess: (response) => setNews(response?.data),
        },
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [query]);

  if (news?.length === 0) return null;

  return (
    <div className="featured-news">
      <div className="max-w-1100 m-auto">
        <div className="featured-news__title">
          <span>
            {data
              ? t('Related news', {
                  vn: 'Bài viết liên quan',
                  en: 'Related news',
                })
              : t('featured_news_title', {
                  vn: 'Tin tức nổi bật',
                  en: 'Featured news',
                })}
          </span>
        </div>
        <Spin spinning={loading}>
          <FeaturedNewsCarousel>
            {news?.map((newsData, index) => (
              <NewsListItem
                key={`featured-news-item-${index}-${newsData?.id}`}
                {...{ newsData }}
              />
            ))}
          </FeaturedNewsCarousel>
        </Spin>
      </div>
    </div>
  );
};

export default FeaturedNews;
