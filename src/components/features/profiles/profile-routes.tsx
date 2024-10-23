import dynamic from 'next/dynamic';
import { BASE_PATH_PROFILE_SCREEN } from './constanst';
import { RouteUtils } from '../../shared/layout/router-contaner/utils';
import { RouteContainer } from '../../shared/layout/router-contaner';


export const UserDashboardProfile = dynamic(
  () => import('components/features/profiles/dashboard'),
  { ssr: false },
);
export const DocumentManagement = dynamic(
  () => import('components/features/profiles/profile-document'),
  { ssr: false },
);
export const ChangePassword = dynamic(
  () => import('components/features/profiles/change-password'),
  { ssr: false },
);

export const Dashboard = dynamic(
  () => import('components/features/admin/dashboard'),
  { ssr: false },
);


export const AccountIdentifier = dynamic(
  () => import('components/features/profiles/account-identifier'),
  { ssr: false },
);

export const CollaboratorContract = dynamic(
  () => import('components/features/profiles/collaborator-contract'),
  { ssr: false },
);

export const EditInformation = dynamic(
  () => import('components/features/profiles/edit-information'),
  { ssr: false },
);

export const ProfilesManager = dynamic(
  () => import('components/features/profiles/index'),
  { ssr: false },
);

export const profilesManagement = () => {
  return [
    {
      path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}`),
      component: RouteContainer,
      routes: [
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}`),
          component: ProfilesManager,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}/documents`),
          component: DocumentManagement,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}/change-password`),
          component: ChangePassword,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}/account-identifier`),
          component: AccountIdentifier,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}/contract`),
          component: CollaboratorContract,
          exact: true,
        },
        {
          path: RouteUtils.buildRouteWithI18n(`${BASE_PATH_PROFILE_SCREEN}/edit-information`),
          component: EditInformation,
          exact: true,
        },
      ],
    },
  ];
};
