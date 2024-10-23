import { ALMA_CUSTOM_HEAD_TAGS } from '@components/features/client/alma-landing/constants';
import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';

export const AppUtils = {
  getCustomAppProps: async (appContext) => {
    const customAppProps: any = {
      customHeadTags: [],
    };
    const router = appContext?.router || {};
    if (router?.route === '/tin-tuc/[slug]') {
      const newsDetail = await AppUtils.fetchNewsDetail(appContext);
      customAppProps.newsDetail = newsDetail;
      customAppProps.customHeadTags =
        AppUtils.getNewsDetailCustomHeadtags(newsDetail);
    }
    if (router?.route === '/alma-landing-page') {
      customAppProps.customHeadTags = ALMA_CUSTOM_HEAD_TAGS;
    }

    return customAppProps;
  },
  fetchNewsDetail: (appContext) => {
    const slug = appContext?.router?.query?.slug;
    const newsDetailParams = { include: ['category', 'newHashtags'] };
    const filterSearchParams = encodeURIComponent(
      JSON.stringify(newsDetailParams),
    );

    return doRequest(
      {
        url: `${endpoints.endpointWithApiDomain('/news/public/by-slug')}/${slug}?filter=${filterSearchParams}`,
      },
      'get',
    );
  },
  getNewsDetailCustomHeadtags: (newsDetail: any = {}) => [
    {
      key: 'PAGE_TITLE',
      tag: 'title',
      children: newsDetail?.title,
    },
    {
      key: 'META_TITLE',
      tag: 'meta',
      props: {
        name: 'title',
        content: newsDetail?.title,
      },
    },
    {
      key: 'META_DESCRIPTION',
      tag: 'meta',
      props: {
        name: 'description',
        content: newsDetail?.description,
      },
    },
    {
      key: 'META_OG_URL',
      tag: 'meta',
      props: {
        property: 'og:url',
        content: `/tin-tuc/${newsDetail?.slug}`,
      },
    },
    {
      key: 'META_OG_TITLE',
      tag: 'meta',
      props: {
        property: 'og:title',
        content: newsDetail?.title,
      },
    },
    {
      key: 'META_OG_DESCRIPTION',
      tag: 'meta',
      props: {
        property: 'og:description',
        content: newsDetail?.description,
      },
    },
    {
      key: 'META_OG_IMAGE',
      tag: 'meta',
      props: {
        property: 'og:image',
        content: newsDetail?.image,
      },
    },
    {
      key: 'META_OG_TYPE',
      tag: 'meta',
      props: {
        property: 'og:type',
        content: 'article',
      },
    },
  ],
  getFinaPage: () => {
    if (typeof window !== 'undefined') {
      return location?.host?.includes('fina.com.vn');
    }
  },
};
