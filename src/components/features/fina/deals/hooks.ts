import { AnyObject } from '@components/shared/atom/type';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useMemo, useState } from 'react';

export function useGetDealData(objectId: string, filter?: AnyObject) {
  const [dealData, setDealData] = useState<AnyObject>({});

  useEffect(() => {
    if (!objectId) {
      return;
    }

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/deals/${objectId}/public`),
        hiddenValues: { filter },
        onGotSuccess: (response) => {
          setDealData(response || {});
        },
      },
    );
  }, []);

  return useMemo(() => dealData, [dealData]);
}
