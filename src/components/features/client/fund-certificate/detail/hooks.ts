import { endpoints } from '@lib/networks/endpoints';
import { FormUtils, RelationUtils } from '@schema-form/utils/form-utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fundStoreName, setSelectProductProgram } from '../store';
import { kycWithMioStep } from './constants';

export const useFetchFundDetail = (slug: string) => {
  const [fund, setFund] = useState<any>({});
  useEffect(() => {
    if (!slug?.trim()) {
      setFund({});
      return;
    }
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/products/public/by-slug/${slug}`,
        ),
        hiddenValues: {
          filter: {
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
        },
        onGotSuccess: setFund,
      },
    );
  }, [slug]);
  return useMemo(() => fund, [fund]);
};

export const useStepKycWithMio = () => {
  const router = useRouter();
  const { query } = router;
  return query?.step || kycWithMioStep.ACCURACY;
};

export const useSetSelectedProductProgram = () => {
  const dispatch = useDispatch();
  return (payload) => {
    dispatch(setSelectProductProgram(payload));
  };
};

export const useSelectedProductProgram = () => {
  return useSelector((state) => state?.[fundStoreName]?.selectedProductProgram);
};
