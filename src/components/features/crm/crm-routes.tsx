import dynamic from 'next/dynamic';

import { RouteUtils } from '../../shared/layout/router-contaner/utils';

export const CallReport = dynamic(
  () => import('@components/features/crm/dashboard/call'),
  { ssr: false },
);

export const CallLogs = dynamic(
  () => import('@components/features/crm/call-logs'),
  { ssr: false },
);

export const TaskManagement = dynamic(
  () => import('@components/features/crm/tasks'),
  { ssr: false },
);

export const ImportData = dynamic(
  () => import('@components/features/crm/import-users'),
  { ssr: false },
);

export const ExternalEmailTemplateManagement = dynamic(
  () => import('@components/features/crm/ems/external-email-template'),
  { ssr: false },
);

export const CampaignManagement = dynamic(
  () => import('@components/features/crm/ems/campaign'),
  { ssr: false },
);

export const MessageManagement = dynamic(
  () => import('@components/features/crm/ems/message'),
  { ssr: false },
);

export const ReferenceSetTemplateManagement = dynamic(
  () => import('@components/features/crm/ems/reference-set-templates'),
  { ssr: false },
);

export const MessageWorkflow = dynamic(
  () => import('@components/features/crm/ems/message-workflow'),
  { ssr: false },
);

export const EventManagement = dynamic(
  () => import('@components/features/crm/ems/event'),
  { ssr: false },
);
export const EventMessageWorkflow = dynamic(
  () => import('@components/features/crm/ems/event-message-workflow'),
  { ssr: false },
);
export const Documentation = dynamic(
  () => import('@components/features/crm/docs/documentation'),
  { ssr: false },
);
export const CategogyDocumentation = dynamic(
  () => import('@components/features/crm/docs/category-documentation'),
  { ssr: false },
);

export const crmRoutes = () => [
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm'),
    component: CallReport,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/dashboard'),
    component: CallReport,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/call-logs'),
    component: CallLogs,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/tasks'),
    component: TaskManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/import-users'),
    component: ImportData,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/ems/templates'),
    component: ExternalEmailTemplateManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/ems/campaigns'),
    component: CampaignManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/ems/messages'),
    component: MessageManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n(
      '/admin/crm/ems/reference-set-templates',
    ),
    component: ReferenceSetTemplateManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/ems/message-workflows'),
    component: MessageWorkflow,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/ems/events'),
    component: EventManagement,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n(
      '/admin/crm/ems/event-message-workflows',
    ),
    component: EventMessageWorkflow,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/documentation'),
    component: Documentation,
  },
  {
    exact: true,
    path: RouteUtils.buildRouteWithI18n('/admin/crm/category-documentation'),
    component: CategogyDocumentation,
  },
];
