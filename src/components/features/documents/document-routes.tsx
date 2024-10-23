import dynamic from 'next/dynamic';

import { RouteUtils } from '../../shared/layout/router-contaner/utils';

export const  DocumentCategoryPage = dynamic(
  () => import('components/features/documents/category'),
  { ssr: false },
);

export const  DocumentPage = dynamic(
  () => import('components/features/documents/management'),
  { ssr: false },
);

export const  TemplatePage = dynamic(
  () => import('components/features/documents/templates'),
  { ssr: false },
);

export const documentRoutes = () => [
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/documents/category'),
    component: DocumentCategoryPage,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/documents/management'),
    component: DocumentPage,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/documents/templates'),
    component: TemplatePage,
  },
];