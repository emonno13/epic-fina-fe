/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import ClientNewsCategoriesList from './client-news-categories-list';

import './news-categories.module.scss';

const ClientNewsCategoriesFetching = () => {
  return (
    <HFeature
      {...{
        featureId: 'homeNewsCategory',
        nodeName: 'news/check-category-news',
      }}
    >
      <HSearchFormHiddenAble />
      <ClientNewsCategoriesList />
    </HFeature>
  );
};

export default ClientNewsCategoriesFetching;
