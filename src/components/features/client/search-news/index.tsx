import NewsList from '@components/shared/client/news-list';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Empty, Pagination, Spin } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import './search-news.module.scss';

const ClientSearchNews = () => {
  const { t } = useHTranslation('common');
  const [news, setNews] = useState<any>({ data: [], total: 0 });
  const { query, push, locale } = useRouter();
  const [loading, setLoading] = useState(false);

  const getNew = async (page, where) => {
    setLoading(true);

    await FormUtils.submitForm(
      {},
      {
        nodeName: 'news/public',
        isSearchForm: true,
        hiddenValues: {
          isActive: true,
          filter: {
            limit: 12,
            skip: (Number(page || 1) - 1) * 12,
            where: where,
          },
        },
        onGotSuccess: (response) => setNews(response),
      },
    );

    setLoading(false);
  };

  const fetchData = useCallback(
    async (query) => {
      const { keyword, page, idHashtag } = query;
      if (keyword) {
        if (idHashtag) {
          FormUtils.submitForm(
            {},
            {
              nodeName: 'news-hashtags/public',
              isSearchForm: true,
              hiddenValues: {
                filter: {
                  limit: 1000000,
                  skip: (Number(page || 1) - 1) * 12,
                  where: { hashtagId: { inq: [idHashtag] } },
                },
              },
              onGotSuccess: (response) => {
                getNew(page, {
                  id: { inq: response?.map((el) => el?.newsId) || [] },
                });
              },
            },
          );
        } else {
          getNew(page, { _q: keyword });
        }
      }
    },
    [query],
  );

  const onPaginationChange = async (page) => {
    await push(
      `/${locale}/tim-kiem-tin-tuc?keyword=${query?.keyword}&page=${page}`,
    );
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  if (loading) return <Spin />;

  return (
    <div className="client-search-news">
      <Head>
        <title>Tin tức</title>
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

      <div className="max-w-1100 m-auto">
        <div className="client-search-news-header">
          <h2>
            Kết quả cho
            {query?.idHashtag ? ` #${query?.keyword}` : ` "${query?.keyword}"`}
          </h2>
          <p>
            Có <span>{news?.total}</span> kết quả liên quan
          </p>
        </div>

        {news?.total > 0 ? (
          <>
            <NewsList {...{ data: news.data || [] }} />
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
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ClientSearchNews;
