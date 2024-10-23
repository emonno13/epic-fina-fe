import ClientNewsDetail from '@components/features/client/news-detail';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { PageUtils } from '@schema-form/utils/page-utils';
import { isArray } from 'lodash';
import { GetServerSidePropsContext } from 'next';

const NewsDetailPage = ({ newsDetail }) => {
  return <ClientNewsDetail {...{ newsData: newsDetail || {} }} />;
};

NewsDetailPage.Layout = LightlyClientLayout;

export const getServerSideProps = async ({
  locale,
  query,
  resolvedUrl,
}: GetServerSidePropsContext) => {
  const { slug } = query;
  const props = await PageUtils.getServerSideProps({
    locale,
    nodeName: 'news/public/by-slug',
    documentId: isArray(slug) ? slug[0] : slug,
    dataNamespace: 'newsDetail',
  });
  const seoTags = props?.newsDetail?.seo;

  return {
    props: {
      ...props,
      seoTags: seoTags,
      resolvedUrl,
    },
  };
};

export default NewsDetailPage;
