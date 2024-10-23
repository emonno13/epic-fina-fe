import { _adminRoutes } from '@components/features/_admin-routes';
import { LightlyAdminLayout } from '@layouts/admin/lightly';
import { MobileUtils } from '@lib/utils/mobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch } from 'react-router-dom';
import { RouteUtils } from '../../components/shared/layout/router-contaner/utils';
import withAuth from '../../hocs/with-authentication/withAuth';

const ViewComponent = (_props: any) => {
  const adminRoutes: any[] = [..._adminRoutes()];

  return (
    <BrowserRouter key={RouteUtils.getAdminBasePathFromRoute()}>
      <Switch>{renderRoutes(adminRoutes)}</Switch>
    </BrowserRouter>
  );
};

const View: any = MobileUtils.checkIsWebView()
  ? ViewComponent
  : withAuth(ViewComponent);
View.Layout = LightlyAdminLayout;

export const getServerSideProps = async ({ locale, ...props }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-menu',
        'admin-common',
        'admin-crm',
        'common',
        'recruit',
      ])),
    },
  };
};

export default View;
