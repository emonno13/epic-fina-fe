import dynamic from 'next/dynamic';

import { RouteUtils } from '../../shared/layout/router-contaner/utils';
import { RouteContainer } from '../../shared/layout/router-contaner';

export const NewsCategoryManagement = dynamic(
  () => import('components/features/cms/categories'),
  { ssr: false },
);

export const NewsManagement = dynamic(
  () => import('components/features/cms/news'),
  { ssr: false },
);

export const NewsModulesManagement = dynamic(
  () => import('components/features/cms/modules'),
  { ssr: false },
);

export const cmsRoutes = () => {
  return [
    {
      path: RouteUtils.buildRouteWithI18n('/admin/cms'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/cms/categories'),
          component: NewsCategoryManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/cms/news'),
          component: NewsManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/cms/modules'),
          component: NewsModulesManagement,
          exact: true,
        },
      ],
    },
  ];
};