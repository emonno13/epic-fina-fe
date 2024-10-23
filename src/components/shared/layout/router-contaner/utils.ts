import { DEFAULT_PAGE_SIZE } from '@components/shared/common/configuration/constant';
import Router from 'next/router';
import { matchRoutes } from 'react-router-config';
import { FormDataUtils } from '../../../../lib/networks/http/form-data-utils';

export const RouteUtils = {
  adminPrefix: ['/admin', '/my'],
  buildRouteWithI18n: (routePath) => {
    const locales = Router.locales || [];
    return [`/(${locales.join('|')})${routePath}`, routePath];
  },
  getParams: ({ match }) => {
    return match?.params || {};
  },
  getSubRoutes: ({ route }) => {
    return route?.routes;
  },
  getCurrentAdminPath: () => {
    const basePath = RouteUtils.getBasePath();
    return [basePath, ...RouteUtils.getAdminFeatureNames()].join('/');
  },
  getAdminFeatureNames: (): string[] => {
    const query = Router.query;
    const featureNames: any = query.featureNames || [];
    return typeof featureNames === 'string' ? [featureNames] : featureNames;
  },

  getBasePath: () => {
    const asPath = Router.router?.asPath;
    if (!asPath) {
      return '/admin';
    }
    const paths = asPath.split('/');
    if (paths.length === 1) {
      return paths[0] || '/admin';
    }

    // "/my/dashboard".split("/") ==> ["", "my", "dashboard"]
    return `/${!paths[0] ? paths[1] : paths[0]}`;
  },
  getAllAdminKeyAndPathsFromRoute: () => {
    let path = RouteUtils.getBasePath();
    const featureNames = RouteUtils.getAdminFeatureNames();
    const result = {
      //{admin: "/admin"}
      [path.substring(1, path.length)]: path,
    };
    if (!featureNames.length) {
      return result;
    }
    RouteUtils.getAdminFeatureNames().map((feature) => {
      path = `${path}/${feature}`;
      result[feature] = path;
    });
    return result;
  },
  getAdminBasePathFromRoute: () => {
    let url = RouteUtils.getBasePath();
    RouteUtils.getAdminFeatureNames().map((path) => (url = `${url}/${path}`));
    return url;
  },

  getPaginationFromUrl: (initAsDefault = false): any => {
    const query = Router.query;
    if (initAsDefault) {
      return {
        page: 1,
        filter: {
          limit: DEFAULT_PAGE_SIZE,
          skip: 0,
        },
      };
    }
    return {
      page: parseInt(`${query.page ?? '1'}`),
      filter: {
        limit: query['filter[limit]'] || DEFAULT_PAGE_SIZE,
        skip: query['filter[skip]'] || 0,
      },
    };
  },
  //order: `${columnKey} ${order}` order from ant: descend" | "ascend"
  getSorterFromUrl: () => {
    const query = Router.query;
    const orderParam: any = query['filter[order]'] || 'updatedAt DESC';
    const orderDetails = `${orderParam}`.split(' ');
    return {
      columnKey: orderDetails[0],
      order: orderDetails[1],
    };
  },
  getQueryUri: (extraQuery = {}, removeOriginalQuery = false) => {
    const extraQueryFormData =
      FormDataUtils.convertObjectUriParamsObject(extraQuery);
    if (removeOriginalQuery) {
      return FormDataUtils.convertObjectToUri(extraQueryFormData);
    }
    const query = Router?.query || {};
    const allParams = { ...query, ...extraQueryFormData };
    return FormDataUtils.convertObjectToUri(allParams);
  },
  redirect: async (url = '') => {
    const { locale, locales = [], push } = Router;
    const allCountries = locales.join('|');
    const routeRegex = new RegExp(`[\\/]?(${allCountries})?(.*)`);
    const paths: string[] = url.match(routeRegex) as string[];
    let currentPath = new RegExp('^/').test('/') ? paths[2] : `/${paths[2]}`;
    currentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    await push(`/${locale}${currentPath}`, undefined, {
      shallow: true,
      locale,
    });
  },
  redirectToDocumentDetail: (
    documentId,
    documentIdName = 'documentId',
    params: any = {},
  ) => {
    const adminPath = RouteUtils.getAdminBasePathFromRoute();
    const query = Router?.query || {};
    const allParams = { ...query, ...params, [documentIdName]: documentId };
    const paramUri = FormDataUtils.convertObjectToUri(allParams);
    RouteUtils.redirect(`${adminPath}?${paramUri}`);
  },
  getRouteId: (documentIdName = 'documentId', ignoreNewId = true): any => {
    const documentId = Router.query[documentIdName];
    if (!ignoreNewId && documentId == 'new') {
      return null;
    }
    return Router.query[documentIdName];
  },
  isValidRoute: ({ location, route }) => {
    const branches = matchRoutes(route.routes, location.pathname);
    if (!branches || branches.length === 0) {
      return false;
    }
    return true;
  },
  setDefaultPagination: async () => {
    const query = {
      ...Router.query,
      'filter[skip]': 0,
      page: 1,
    };
    const pathname = Router.pathname;
    await Router.push({ pathname, query });
  },
  generatePathWithLocale: (routePath) => {
    const locales = Router.locales || ['vn'];
    return `/${locales[0]}${routePath}`;
  },
};
