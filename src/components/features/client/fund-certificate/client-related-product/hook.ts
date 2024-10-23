import { endpoints } from '@lib/networks/endpoints';
import { FormUtils, RelationUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

export const useFetchRelatedProducts = (product: {
  orgId: string;
  id: string;
  type: string;
}) => {
  const { orgId, id, type } = product;
  const [products, setProducts] = useState<any>({});
  useEffect(() => {
    if (!orgId || !id || !type) {
      setProducts({ data: [], total: 0 });
      return;
    }
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/products/public'),
        hiddenValues: {
          filter: {
            where: {
              orgId,
              type,
              id: { neq: id },
              status: 'active',
            },
            include: [
              RelationUtils.entity('org', [
                'id',
                'name',
                'description',
                'image',
                'backgroundColor',
              ]),
              'productDetails',
              {
                relation: 'productDetails',
                scope: {
                  include: [{ relation: 'fees' }],
                },
              },
            ],
          },
          limit: 10000,
        },
        onGotSuccess: setProducts,
      },
    );
  }, [orgId, id, type]);
  return products;
};
