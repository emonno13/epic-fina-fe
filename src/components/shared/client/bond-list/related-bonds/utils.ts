import { useEffect, useState } from 'react';
import { FormUtils, RelationUtils } from '../../../../../schema-form/utils/form-utils';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { PRODUCT_TYPE } from '../../../../../types/organization';

export const useFetchRelatedBonds = ({ orgId, productId }) => {
  const [bonds, setBonds] = useState<any>({});
  useEffect(() => {
    if (!orgId || !productId) {
      setBonds({ data: [], total: 0 });
      return;
    }
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/products/public'),
      hiddenValues: {
        filter: {
          where: {
            orgId,
            type: PRODUCT_TYPE.BONDS,
            id: { neq: productId },
          },
          include: [
            RelationUtils.entity('org', ['id', 'name']),
          ],
        },
        limit: 10000,
      },
      onGotSuccess: setBonds,
    });
  }, [orgId, productId]);
  return bonds;
};
