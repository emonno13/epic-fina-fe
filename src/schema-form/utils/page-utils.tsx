import { doInternalRequest, doRequest } from '@lib/networks/http';
import { union } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  FormUtils,
  getFilterSearchFieldWithRelations,
  getFilterWithRelations,
} from './form-utils';

export interface PageQueryProps {
  params?: Record<string, any>;
  nodeName?: string;
  endpoint?: string;
  documentId?: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  withRelations?: any[];
  headers?: Record<string, any>;
  isInternalRequest?: boolean;
  req?: any;
  locale: string | any;
}

export interface PageGetServerSideProps extends Omit<PageQueryProps, 'method'> {
  locale: string | any;
  localeNamespaces?: string[];
  dataNamespace?: string;
  preview?: string;
  params?: Record<string, any>;
  nodeName?: string;
  endpoint?: string;
  documentId?: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  withRelations?: any[];
  headers?: Record<string, any>;
  isInternalRequest?: boolean;
  req?: any;
}

export const PageUtils = {
  fetchData: async ({
    params = {},
    nodeName = '',
    endpoint = '',
    documentId = '',
    withRelations = [],
    method = 'get',
    headers = {},
    isInternalRequest = false,
    req = {},
    locale,
  }: PageQueryProps) => {
    const filterParams: any = params.filter || {};
    filterParams.where = filterParams.where ?? {};
    const requestHeaders: any = {
      ...headers,
      locale,
    };
    const { values, relations } = getFilterSearchFieldWithRelations(params);
    const requestRelations = getFilterWithRelations(withRelations, relations);
    if (requestRelations.length > 0) {
      filterParams.include = filterParams.include ?? [];
      filterParams.include = [...filterParams.include, ...requestRelations];
    }
    if (!values._q || !values._q.trim()) {
      delete values._q;
    }
    filterParams.where = { ...filterParams.where, ...values?.filter?.where };
    const urlEndpoint = FormUtils.getNodeEndpoint({
      documentId,
      nodeName,
      endpoint,
    });
    if (req.cookies && isInternalRequest) {
      return doInternalRequest(
        {
          headers: {
            ...requestHeaders,
            cookies: req.cookies,
          },
          url: `${urlEndpoint}?filter=${encodeURIComponent(JSON.stringify(filterParams))}`,
        },
        method,
      );
    }
    return doRequest(
      {
        headers: requestHeaders,
        url: `${urlEndpoint}?filter=${encodeURIComponent(JSON.stringify(filterParams))}`,
      },
      method,
    );
  },
  getServerSideProps: async ({
    locale,
    nodeName = '',
    endpoint = '',
    documentId = '',
    params = {},
    withRelations = [],
    localeNamespaces = [
      'common',
      'admin-common',
      'admin-crm',
      'admin-menu',
      'calculator-toolkit',
      'mobile',
      'recruit',
      'second-page',
    ],
    dataNamespace = 'pageData',
    headers = {},
    isInternalRequest = false,
    req = {},
  }: PageGetServerSideProps): Promise<{
    [property: string]: any;
  }> => {
    const defaultLocaleNamespaces = [
      'common',
      'admin-common',
      'admin-crm',
      'admin-menu',
      'calculator-toolkit',
      'mobile',
      'recruit',
      'second-page',
    ];
    const mergedLocaleNamespaces = union(
      localeNamespaces,
      defaultLocaleNamespaces,
    );
    const serverSideTranslationsProps = await serverSideTranslations(
      locale,
      mergedLocaleNamespaces,
    );
    try {
      let response = {};
      if (nodeName || endpoint) {
        response = await PageUtils.fetchData({
          params,
          nodeName,
          endpoint,
          documentId,
          withRelations,
          headers,
          isInternalRequest,
          req,
          locale,
        });
      }
      return {
        ...serverSideTranslationsProps,
        [dataNamespace]: response,
      };
    } catch (error) {
      console.log('error server side props', error);
      return {
        ...serverSideTranslationsProps,
      };
    }
  },
};
