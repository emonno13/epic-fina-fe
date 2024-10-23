import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export const useFetchNavPublicHistoryByProductId = (
  productId?: string,
  filter: any = {},
) => {
  const [navs, setNavs] = useState<any[]>([]);
  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/navs/public'),
        onGotSuccess: (response) => {
          setNavs(response?.data || []);
        },
        onGotError: () => setNavs([]),
        hiddenValues: {
          filter: {
            skip: 0,
            limit: 20,
            order: ['navDate DESC'],
            ...filter,
            where: {
              ...(filter?.where || {}),
              productId,
            },
          },
        },
      },
    );
  }, [productId]);
  return navs;
};

export const fetchNavsPublicByProductId = async (
  productId: string,
  filter: any,
) => {
  if (!productId) return [];
  const filterWithProductId = {
    ...filter,
    where: {
      ...(filter?.where || {}),
      productId,
    },
  };
  const navs = await doRequest(
    {
      url: `${endpoints.endpointWithApiDomain('/navs/public')}?filter=${JSON.stringify(filterWithProductId)}`,
    },
    'get',
  );
  return navs;
};
