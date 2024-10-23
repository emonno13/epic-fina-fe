import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import NewsCategories from './categories';
import ClientNewsBanner from './news-banner';
import NewsFeatured from './news-featured';

import './news.module.scss';

const ClientNews = () => {
  const { t } = useHTranslation('common');
  const [news, setNews] = useState<any>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { query, push, locale } = useRouter();
  const fetchData = useCallback(async (query) => {
    const { page } = query;
    setLoading(true);
    await FormUtils.submitForm(
      {},
      {
        nodeName: 'news/public',
        isSearchForm: true,
        hiddenValues: {
          filter: {
            limit: 12,
            skip: (Number(page || 1) - 1) * 12,
            where: {
              isActive: true,
            },
          },
        },
        onGotSuccess: (response) => {
          setNews(response);
        },
      },
    );
    setLoading(false);
  }, []);
  const onPaginationChange = async (page) => {
    await push(`/${locale}/tin-tuc?page=${page}`);
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div className="client-news">
      <Head>
        <title>Blog</title>
      </Head>
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
          ],
        }}
      />

      <ClientNewsBanner />

      <div className="max-w-1100 m-auto">
        <NewsFeatured />
        <NewsCategories />
      </div>
      {/* <div className="max-w-1100 m-auto client-news__list">
        <Spin spinning={loading}>
          <NewsList {...{ data: news.data || [] }} />
        </Spin>
        <Pagination
          {...{
            className: 'client-news__list__pagination',
            current: Number(query.page || 1),
            pageSize: 12,
            total: news.total,
            onChange: onPaginationChange,
            showSizeChanger: false,
          }}
        />
      </div> */}
    </div>
  );
};

export default ClientNews;
