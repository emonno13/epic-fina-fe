import { cloneDeep, isArray, isEmpty, merge } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import SeoTags, { SeoTagsProps } from '../seo-tags';
import { DEFAULT_SEO_TAGS, SeoTagsKey } from '../seo-tags/constants';

type AppSeoTagsProps = {
  seoTags?: SeoTagsProps;
};

const AppSeoTags = (props: AppSeoTagsProps) => {
  const { seoTags = {} } = props;
  const router = useRouter();
  const { query, asPath } = router;

  const [seoLandingPage, setSeoLandingPage] = useState<any>();

  const path = useMemo(() => {
    const featureNames = query.featureNames;
    const basePath = asPath.split('?')[0];
    if (!featureNames || isEmpty(featureNames)) return basePath;

    const arrFeatureNames = isArray(featureNames)
      ? featureNames
      : [featureNames];

    return arrFeatureNames.reduce(
      (previousValue, currentValue) => previousValue + '/' + currentValue,
      '',
    );
  }, [query, asPath]);

  useEffect(() => {
    if (!path) {
      setSeoLandingPage(undefined);
      return;
    }

    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/seo-landing-pages/by-path'),
        hiddenValues: {
          filter: {
            where: { path },
          },
        },
        onGotSuccess: setSeoLandingPage,
        onGotError: () => {
          setSeoLandingPage(undefined);
        },
      },
    );
  }, [path]);

  const mergedSeoTags = useMemo(() => {
    const cloneDefaultSeoTags = cloneDeep(DEFAULT_SEO_TAGS);
    return merge(cloneDefaultSeoTags, seoLandingPage?.seo || seoTags);
  }, [seoTags, seoLandingPage]);

  return (
    <SeoTags {...mergedSeoTags}>
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_API_SERVER}
        key={SeoTagsKey.META_OG_URL}
      />
    </SeoTags>
  );
};

export default AppSeoTags;
