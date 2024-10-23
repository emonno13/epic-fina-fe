import { _clientRoutes } from '@components/features/_client-routes';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { LightlyClientLayout } from '@layouts/admin/lightly/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch } from 'react-router-dom';

const View = (_props: any) => {
  const routes: any[] = [..._clientRoutes()];
  return (
    <BrowserRouter key={RouteUtils.getAdminBasePathFromRoute()}>
      <Switch>{renderRoutes(routes)}</Switch>
    </BrowserRouter>
  );
};

View.Layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-menu',
        'admin-common',
        'admin-crm',
        'common',
      ])),
    },
  };
};

export default View;
