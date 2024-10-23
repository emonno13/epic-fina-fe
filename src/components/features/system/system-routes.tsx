import dynamic from 'next/dynamic';

import { RouteUtils } from '../../shared/layout/router-contaner/utils';

export const GreetingFileManagement = dynamic(
  () => import('@components/features/system/greeting-files'),
  { ssr: false },
);

export const GroupManagement = dynamic(
  () => import('@components/features/system/groups'),
  { ssr: false },
);

export const QueueManagement = dynamic(
  () => import('@components/features/system/queues'),
  { ssr: false },
);

export const ScenarioIvrTreeManagement = dynamic(
  () => import('@components/features/system/scenario-ivr-tree'),
  { ssr: false },
);

export const HotlineManagement = dynamic(
  () => import('@components/features/system/hotline'),
  { ssr: false },
);

export const systemRoutes = () => [
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/system/greeting-files'),
    component: GreetingFileManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/system/groups'),
    component: GroupManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/system/queues'),
    component: QueueManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/system/scenario-ivr-tree'),
    component: ScenarioIvrTreeManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/system/hotline'),
    component: HotlineManagement,
  },
];
