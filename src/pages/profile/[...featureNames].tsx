import { _clientPortalRoutes } from '@components/features/_client-routes';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LightlyClientLayoutProfile } from '../../layouts/admin/lightly/client';

const ProfilePage = () => {
  const routes: any[] = [..._clientPortalRoutes()];

  return (
    <BrowserRouter key={RouteUtils.getAdminBasePathFromRoute()}>
      <Switch>{renderRoutes(routes)}</Switch>
    </BrowserRouter>
  );
};

ProfilePage.Layout = LightlyClientLayoutProfile;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'second-page',
        'admin-common',
      ])),
    },
  };
};

export default ProfilePage;
