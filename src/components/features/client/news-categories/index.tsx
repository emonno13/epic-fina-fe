/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';
import ClientNewsCategoriesFetching from './news-categories-fetching';

import './news-categories.module.scss';

const ClientNewsCategories = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-news-categories">
      <Head>
        <title>Danh mục tin tức</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_news_cover_title', {
            en: 'News',
            vn: 'Tin tức',
          }),
          // description: t('client_insurances_cover_desc', {
          // 	en:
          // 		'FINA\'s insurance products are insurance products related to Real Estate, People and Property in Real Estate.',
          // 	vn:
          // 		'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          // }),
          breadCrumbRoutes: [
            {
              path: '/tin-tuc',
              breadcrumbName: t('News', { vn: 'Tin tức' }),
            },
            {
              path: '/danh-muc-tin-tuc',
              breadcrumbName: t('News categories', { vn: 'Danh mục tin tức' }),
            },
          ],
        }}
      />
      <div className="max-w-1100 m-auto">
        <ClientNewsCategoriesFetching />
      </div>
    </div>
  );
};

export default ClientNewsCategories;
