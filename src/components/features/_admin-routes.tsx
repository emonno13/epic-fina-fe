import { TaskManager } from '@components/features/crm/tasks';
import { UserStaffManagement } from '@components/features/organizations/users';
import { TASK_TYPES } from 'constants/crm/task';
import dynamic from 'next/dynamic';
import { RouteContainer } from '../../components/shared/layout/router-contaner';
import { RouteUtils } from '../../components/shared/layout/router-contaner/utils';
import { ORGANIZATION_TYPES } from '../../types/organization';
import { cmsRoutes } from './cms/cms-routes';
import { crmRoutes } from './crm/crm-routes';
import { documentRoutes } from './documents/document-routes';
import { finaRoutes } from './fina/fina-routes';
import { mobileAppRoutes } from './mobile-app/mobile-app-routes';
import { profilesManagement } from './profiles/profile-routes';
import { systemRoutes } from './system/system-routes';

export const UserManagement = dynamic(
  () => import('components/features/organizations/users'),
  { ssr: false },
);

export const OrganizationManagement = dynamic(
  () => import('components/features/organizations'),
  { ssr: false },
);

export const PositionManagement = dynamic(
  () => import('components/features/organizations/positions'),
  { ssr: false },
);

export const PermissionManagement = dynamic(
  () => import('components/features/organizations/permissions'),
  { ssr: false },
);

export const CategoryManagement = dynamic(
  () => import('components/features/finance/categories'),
  { ssr: false },
);

export const RoleManagement = dynamic(
  () => import('components/features/organizations/roles'),
  { ssr: false },
);
export const ContactUsManagement = dynamic(
  () => import('components/features/recruit/recruit-contact-us'),
  { ssr: false },
);
export const CvManagement = dynamic(
  () => import('components/features/recruit/recruit-curriculum-vitae'),
  { ssr: false },
);
export const JobsManagement = dynamic(
  () => import('components/features/recruit/recruit-jobs'),
  { ssr: false },
);

export const ConfigurationManagement = dynamic(
  () => import('components/features/system/configurations'),
  { ssr: false },
);

export const ConfigurationPropertiesManagement = dynamic(
  () => import('components/features/system/configurations-properties'),
  { ssr: false },
);

export const Dashboard = dynamic(
  () => import('components/features/admin/dashboard'),
  { ssr: false },
);

export const LocationManagement = dynamic(
  () => import('components/features/organizations/location'),
  { ssr: false },
);

export const GroupManagement = dynamic(
  () => import('components/features/organizations/groups'),
  { ssr: false },
);

export const TaskManagement = dynamic(
  () => import('components/features/crm/tasks'),
  { ssr: false },
);

export const TaskAssignManagement = dynamic(
  () => import('components/features/crm/task-assign'),
  { ssr: false },
);

export const RealEstateTaskManagement = dynamic(
  () => import('components/features/crm/tasks/real-estate'),
  { ssr: false },
);

export const ReasonCloseTask = dynamic(
  () => import('components/features/crm/tasks/reason-close'),
  { ssr: false },
);

export const ImportUsersData = dynamic(
  () => import('components/features/crm/import-users'),
  { ssr: false },
);

export const MessageTemplate = dynamic(
  () => import('components/features/template-notification'),
  { ssr: false },
);

export const StatusManagement = dynamic(
  () => import('components/features/status'),
  { ssr: false },
);

export const RequestBackStatusOfTask = dynamic(
  () => import('components/features/crm/tasks/request-back-status-of-task'),
  { ssr: false },
);

export const ConfigAutoAssignTask = dynamic(
  () => import('components/features/crm/tasks/config-auto-assign'),
  { ssr: false },
);

export const Otp = dynamic(
  () => import('components/features/crm/sms-message'),
  { ssr: false },
);

export const PartnerRegisteredCalculationToolkit = dynamic(
  () =>
    import('components/features/crm/partner-registered-calculation-toolkit'),
  { ssr: false },
);

export const SendEmailFINAManagement = dynamic(
  () => import('components/features/crm/email-fina'),
  { ssr: false },
);

export const CallLogs = dynamic(
  () => import('components/features/crm/call-logs'),
  { ssr: false },
);

export const UsersGroupManagement = dynamic(
  () => import('components/features/organizations/users-group'),
  { ssr: false },
);

export const _adminRoutes = () => {
  return [
    {
      path: '/',
      exact: true,
      component: RouteContainer,
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/admin/dashboard'),
      component: Dashboard,
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/admin/call-logs'),
      component: CallLogs,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/organizations'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.SUB_ORG}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations/users'),
          component: UserStaffManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations/positions'),
          component: PositionManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/organizations/permissions',
          ),
          component: PermissionManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations/roles'),
          component: RoleManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/organizations/configurations',
          ),
          component: ConfigurationManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/organizations/configurations/properties',
          ),
          component: ConfigurationPropertiesManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations/locations'),
          component: LocationManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/organizations/groups'),
          component: GroupManagement,
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n(
            '/admin/organizations/users-group',
          ),
          component: UsersGroupManagement,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/partners'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners'),
          component: (props) => (
            <OrganizationManagement type={ORGANIZATION_TYPES.BANK} {...props} />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/banks'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.BANK}
              position={'CONTACT_PERSON'}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/insurances'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.INSURANCE}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/real-estates'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.REAL_ESTATE}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/car-companies'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.CAR_COMPANY}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/hospitals'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.HOSPITAL}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/real-estate'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.REAL_ESTATE}
              {...props}
            />
          ),
        },
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/partners/others'),
          component: (props) => (
            <OrganizationManagement
              type={ORGANIZATION_TYPES.OTHERS}
              {...props}
            />
          ),
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/categories'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/categories'),
          component: CategoryManagement,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/users'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/users'),
          component: UserManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/users/import'),
          component: ImportUsersData,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/users/:type'),
          component: UserManagement,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/management/manufactors'),
      component: (props) => (
        <OrganizationManagement
          type={ORGANIZATION_TYPES.MANUFACTOR}
          {...props}
        />
      ),
      exact: true,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/crm'),
      component: RouteContainer,
      routes: crmRoutes(),
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/tasks'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/order'),
          component: TaskAssignManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/task'),
          component: TaskManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/real-estate'),
          component: RealEstateTaskManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/call'),
          component: (props) => (
            <TaskManager
              {...{ featureId: 'task-call', type: TASK_TYPES.CALL }}
              {...props}
            />
          ),
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/deal-processing'),
          component: (props) => (
            <TaskManager
              {...{
                featureId: 'task-deal_processing_task',
                type: TASK_TYPES.DEAL_PROCESSING_TASK,
              }}
              {...props}
            />
          ),
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/tasks/reason-close'),
          component: ReasonCloseTask,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/tasks/request-back-status',
          ),
          component: RequestBackStatusOfTask,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(
            '/admin/tasks/config-auto-assign-task',
          ),
          component: ConfigAutoAssignTask,
          exact: true,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/recruit'),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n('/admin/recruit/jobs'),
          component: JobsManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/recruit/cv'),
          component: CvManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n('/admin/recruit/contact-us'),
          component: ContactUsManagement,
          exact: true,
        },
      ],
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/admin/send-email-fina'),
      component: SendEmailFINAManagement,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/documents'),
      component: RouteContainer,
      routes: documentRoutes(),
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n('/admin/otp'),
      component: Otp,
    },
    {
      exact: true,
      path: RouteUtils.buildRouteWithI18n(
        '/admin/partner-registered-calculation-toolkit',
      ),
      component: PartnerRegisteredCalculationToolkit,
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/template'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/template/all'),
          component: MessageTemplate,
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/statuses'),
      component: RouteContainer,
      routes: [
        {
          exact: true,
          path: RouteUtils.buildRouteWithI18n('/admin/statuses'),
          component: (props) => (
            <StatusManagement
              {...{
                models: ['User', 'Document', 'Task', 'Project', 'Deal'],
                ...props,
              }}
            />
          ),
        },
      ],
    },
    {
      path: RouteUtils.buildRouteWithI18n('/admin/system'),
      component: RouteContainer,
      routes: systemRoutes(),
    },
    ...finaRoutes(),
    ...cmsRoutes(),
    ...profilesManagement(),
    ...mobileAppRoutes(),
  ];
};
